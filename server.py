#!/usr/bin/env python3
"""
Schools Bridge — static server + same-origin Game Player proxy.

Arena games block cross-origin iframes (X-Frame-Options: SAMEORIGIN), and the
inner game document (…?embed=true) requires a Referer from its own origin.
This server fetches the original, untouched game bytes with the proper Referer
and serves them on /play/<slug> from OUR origin — so the site can embed the
real game inside its modal player. Game content/questions/visuals are served
verbatim; nothing is modified. Responds 200 only; failures fall back to cache.
"""
import http.server, socketserver, urllib.request, os

PORT = 8080
ROOT = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(ROOT, '.cache-play')

UPSTREAMS = {
    'comparisons': (
        'https://01a0cd6d-83ae-7de8-9b94-b5f56306d66f.arena.site/?embed=true',
        'https://01a0cd6d-83ae-7de8-9b94-b5f56306d66f.arena.site/',
    ),
}

_mem = {}

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def log_message(self, *a):
        pass

    def do_GET(self):
        if self.path.startswith('/play/'):
            return self.serve_play()
        return super().do_GET()

    def serve_play(self):
        slug = self.path[len('/play/'):].split('?')[0].split('#')[0].strip('/')
        if slug not in UPSTREAMS:
            self.send_error(404, 'unknown game destination')
            return
        url, referer = UPSTREAMS[slug]
        data = _mem.get(slug)
        if data is None:
            os.makedirs(CACHE_DIR, exist_ok=True)
            cached = os.path.join(CACHE_DIR, slug + '.html')
            try:
                req = urllib.request.Request(url, headers={
                    'Referer': referer,
                    'User-Agent': 'Mozilla/5.0 (SchoolsBridge Player)',
                    'Accept': 'text/html,application/xhtml+xml',
                })
                with urllib.request.urlopen(req, timeout=15) as r:
                    data = r.read()
                _mem[slug] = data
                with open(cached, 'wb') as f:
                    f.write(data)
            except Exception as e:
                print('upstream fetch failed for %s: %s' % (slug, e))
                if os.path.exists(cached):
                    with open(cached, 'rb') as f:
                        data = f.read()
                    _mem[slug] = data
                else:
                    self.send_error(502, 'game upstream unavailable')
                    return
        if not data.startswith(b'<!doctype') and b'<html' not in data[:512].lower():
            self.send_error(502, 'unexpected upstream payload')
            return
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

class Server(socketserver.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    os.chdir(ROOT)
    print('Schools Bridge • player proxy ready →  http://0.0.0.0:%d' % PORT)
    Server(('0.0.0.0', PORT), Handler).serve_forever()
