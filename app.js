/* ============================================================
   جسر المدارس | Schools Bridge — App Logic
   ------------------------------------------------------------
   DATA ARCHITECTURE (ready for the official content):
   Drop official games/books/worksheets into SB.data below, e.g.
   SB.data.games.push({
     id:'word-match', title:'مطابقة الكلمات', tag:'مفردات',
     cat:'vocab',            // vocab | skills | fun
     desc:'وصّلي كل كلمة بصورتها الصحيحة',
     url:'https://…',        // official game URL
     thumb:'assets/games.jpg'
   });
   then call SB.renderAll() — everything updates automatically.
   ============================================================ */

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const SB = {
  data: {
    games: [
      { id:'game-comparisons',         title:'جزر المقارنات',          tag:'Comparative & Superlatives', cat:'grammar', icon:'islands',
        thumb:'assets/game-islands.jpg',
        url:'https://01a0cd6d-83ae-7de8-9b94-b5f56306d66f.arena.site/',
        play:null, launchUrl:null,
        desc:'جُزُرٌ تكبر خطوةً بعد خطوة — أتقني المقارنات وصيغة التفضيل لتصلي إلى القمة الذهبية.' },
      { id:'game-possessives',         title:'لغز الممتلكات المفقودة', tag:'Possessive Pronouns', cat:'grammar', icon:'keepsake',
        thumb:'assets/game-possessive.svg',
        url:'https://01a0cdea-8a42-7fa6-92bb-2afbd61f567b.arena.site/',
        desc:'جزيرةٌ فقدت متعلقاتها — أعيدي كلَّ غرضٍ إلى صاحبه بضمائر الملكية الصحيحة.' },
      { id:'game-conjunctions',        title:'الفندق السحري',          tag:'Conjunctions', cat:'grammar', icon:'chain',
        thumb:'assets/game-hotel.jpg',
        url:'https://01a0d3b3-4db8-735d-8140-4ef645996e9b.arena.site/',
        desc:'أبواب الفندق السحري لا تنفتح إلا بحلقات الوصل — اربطي الجمل بأدوات الربط المناسبة.' },
      { id:'game-present-simple',      title:'رحلتي',                  tag:'Present Simple', cat:'grammar', icon:'route',
        thumb:'assets/game-journey.jpg',
        url:'https://01a0ceba-9a08-7f62-a83d-4f0c4afacf84.arena.site/',
        desc:'يومُكِ الجميل يتكرر على الطريق — ثبّتي قاعدة المضارع البسيط لتكتمل رحلتك اليومية.' },
      { id:'game-wh-questions',        title:'الفضاء',                 tag:'WH Questions', cat:'grammar', icon:'planet',
        thumb:'assets/game-space.jpg',
        url:'https://01a0cf8a-dd7f-726a-85a1-6d0bf7cdc822.arena.site/',
        desc:'بين الكواكب تتلألأ علامات الاستفهام — نظّمي خريطتك النجمية بأسئلة WH الصحيحة.' },
      { id:'game-how-often',           title:'آلة العادات العجيبة',    tag:'How Often', cat:'grammar', icon:'clockgear',
        thumb:'assets/game-machine.jpg',
        url:'https://01a0d36b-360c-7a4c-bd76-57bbbeb1592c.arena.site/',
        desc:'آلةٌ عجيبة تسأل: كم مرة؟ — أديري تروسها بظروف التكرار الصحيحة لتعمل من جديد.' },
      { id:'game-gerund-infinitive',   title:'مدينة الألعاب',          tag:'Gerund & Infinitive', cat:'grammar', icon:'wheel',
        thumb:'assets/game-city.jpg',
        url:'https://01a0d237-d6d0-7d0a-8e1d-2e02f15400fc.arena.site/',
        desc:'مدينة ألعابٍ كاملة تنتظرك — اختاري المصدر أو الصيغة المصدرية لتتحرك كل لعبة.' },
      { id:'game-present-progressive', title:'مغامرة أعماق البحر',     tag:'Present Progressive', cat:'grammar', icon:'sub',
        thumb:'assets/game-ocean.jpg',
        url:'https://01a0cf28-0b25-7c62-a7fe-0e514dc0fb2c.arena.site/',
        desc:'انزلي إلى الأعماق حيث الأحداث تجري الآن — صِفي ما يحدث بزمن المضارع المستمر.' },
      { id:'game-subject-pronouns',    title:'رحلة تعليمية',           tag:'Subject Pronouns', cat:'grammar', icon:'bus',
        thumb:'assets/game-trip.jpg',
        url:'https://01a0cd8e-332c-7d5b-9fdb-dc1a4983ffb1.arena.site/',
        desc:'رحلة مدرسية ودّية — استبدلي الأسماء بضمائر الفاعل الصحيحة لتنطلق الحافلة في موعدها.' },
      { id:'game-past-simple',         title:'متحف الذكريات',          tag:'Past Simple', cat:'grammar', icon:'gallery',
        thumb:'assets/game-museum.svg',
        url:'https://01a0cec9-5fe8-7770-992a-8f2331d27673.arena.site/',
        desc:'متحفٌ تحرسه الذكريات — رتّبي اللحظات والمشاهد الماضية بقاعدة الماضي البسيط.' },
    ],
    vocabulary: [
      { id:'vocab-pick-1', title:'صورة وكلمة ١', tag:'Vocabulary 1 · Picture & Pick', cat:'vocabulary', icon:'pickframe',
        thumb:'assets/vocab-pick1.jpg',
        url:'https://01a0d8d6-3497-77ed-8524-4a776b824745.arena.site/',
        desc:'انظري إلى الصورة واختاري الكلمة الإنجليزية الصحيحة — المحطة الأولى في رحلة مفرداتك.' },
      { id:'vocab-pick-2', title:'صورة وكلمة ٢', tag:'Vocabulary 2 · Picture & Pick', cat:'vocabulary', icon:'galleryspot',
        thumb:'assets/vocab-pick2.jpg',
        url:'https://01a0d8f0-b3c6-7e59-8dbd-adfaf3aab041.arena.site/',
        desc:'تحدٍّ جديد بصورٍ جديدة — أربع كلمات أمامك، وواحدةٌ فقط تنتمي إلى الصورة.' },
      { id:'vocab-spell-3', title:'الحرف الناقص ٣', tag:'Vocabulary 3 · Picture & Pick', cat:'vocabulary', icon:'misstile',
        thumb:'assets/vocab-spell.jpg',
        url:'https://01a0d92a-90a9-7ee4-8467-4b9cd63fa847.arena.site/',
        desc:'انظري، فكّري، وأكملي — ضعي الحرف الناقص في مكانه لتكتمل الكلمة وتُفتح النجوم.' },
    ],
    books: [
      { id:'book-picnic', title:'Noura’s Colorful Picnic', cat:'reading', icon:'book',
        thumb:'assets/story-picnic.jpg',
        desc:'A sunny picnic day full of colors, fruit, and fun.',
        pages:[
          'It is a sunny day. Noura has a big basket for a picnic.',
          'She puts red apples, yellow bananas, and green juice in the basket.',
          'In the park, Noura sits on a blue mat and eats with her friend.',
          'The friends play and laugh. It is the best colorful day!'
        ],
        quiz:[
          { type:'mcq', q:'What does Noura put in the basket?', options:['Her books','Red apples','Her toys'], a:1 },
          { type:'tf', q:'Noura sits on a blue mat.', a:true },
          { type:'wh', q:'Where do the friends have the picnic?', options:['At school','In the park','At home'], a:1 },
          { type:'idea', q:'What is this story about?', options:['A rainy day','A fun picnic day','A school test'], a:1 },
          { type:'vocab', q:'The word “basket” means…', options:['a bag for carrying things','a kind of food','a big tree'], a:0 },
        ] },
      { id:'book-sea', title:'A Day at the Sea', cat:'reading', icon:'book',
        thumb:'assets/story-sea.jpg',
        desc:'A happy beach day with sand, shells, and blue water.',
        pages:[
          'Sara and her family go to the sea today. The water is blue and warm.',
          'Sara walks on the soft sand and finds a small pink shell.',
          'Dad makes a big sandcastle. Sara puts the shell on top of the castle.',
          'The sun goes down slowly. Sara is happy. What a lovely day!'
        ],
        quiz:[
          { type:'mcq', q:'What does Sara find on the sand?', options:['A small pink shell','A red ball','A blue boat'], a:0 },
          { type:'tf', q:'Dad makes a sandcastle.', a:true },
          { type:'wh', q:'Where does Sara put the shell?', options:['In her bag','On the castle','In the water'], a:1 },
          { type:'idea', q:'The story is about a lovely day…', options:['in the garden','at the sea','at the zoo'], a:1 },
          { type:'vocab', q:'The word “shell” means…', options:['a sand house','a sea treasure you can hold','a big fish'], a:1 },
        ] },
      { id:'book-kite', title:'The Little Pink Kite', cat:'reading', icon:'book',
        thumb:'assets/story-kite.jpg',
        desc:'A windy day and a little pink kite flying high.',
        pages:[
          'The wind blows softly on the green hills. It is kite day!',
          'Huda runs fast with her little pink kite. Up, up it goes!',
          'The kite dances in the sky like a happy bird.',
          'Huda smiles at her pink kite. “I did it!” she says.'
        ],
        quiz:[
          { type:'mcq', q:'What color is Huda’s kite?', options:['Blue','Pink','Green'], a:1 },
          { type:'tf', q:'The kite goes up into the sky.', a:true },
          { type:'wh', q:'Why is it a good day for a kite?', options:['The wind blows','It is raining','It is night'], a:0 },
          { type:'idea', q:'This story tells us to…', options:['give up quickly','keep trying and smile','stay inside'], a:1 },
          { type:'vocab', q:'The kite “dances” means it…', options:['moves happily in the air','sleeps on the hill','falls in the water'], a:0 },
        ] },
      { id:'book-friend', title:'My Friend Huda', cat:'reading', icon:'book',
        thumb:'assets/story-friend.jpg',
        desc:'Meet Huda — a kind friend, and a fun day together.',
        pages:[
          'Huda is my best friend. She lives next to my house.',
          'Every morning, Huda and I walk to school together.',
          'After school, we play on the swing and eat juicy oranges.',
          'A true friend is like a warm sun on a cold day.'
        ],
        quiz:[
          { type:'mcq', q:'Where does Huda live?', options:['Next to my house','Near the sea','In a castle'], a:0 },
          { type:'tf', q:'The friends walk to school in the evening.', a:false },
          { type:'wh', q:'What do the friends eat after school?', options:['Apples','Oranges','Cake'], a:1 },
          { type:'idea', q:'The story is about…', options:['a kind friendship','a boat trip','a new school'], a:0 },
          { type:'vocab', q:'“together” means…', options:['alone','with a friend','far away'], a:1 },
        ] },
      { id:'book-farm', title:'Morning on the Farm', cat:'reading', icon:'book',
        thumb:'assets/story-farm.jpg',
        desc:'A bright morning on the farm with animals all around.',
        pages:[
          'The sun wakes up over the little red barn. Good morning, farm!',
          'The soft sheep eat green grass near the wooden fence.',
          'A small yellow duck swims in the round pond. Quack, quack!',
          'Grandpa brings fresh milk. The farm is happy today.'
        ],
        quiz:[
          { type:'mcq', q:'What color is the barn?', options:['Green','Red','Blue'], a:1 },
          { type:'tf', q:'The duck swims in the pond.', a:true },
          { type:'wh', q:'Where do the sheep eat grass?', options:['In the barn','Near the fence','On the roof'], a:1 },
          { type:'idea', q:'This story is about…', options:['a busy farm morning','a night in the city','a day at school'], a:0 },
          { type:'vocab', q:'“pond” means…', options:['a small pool of water','a tall tree','a kind of bread'], a:0 },
        ] },
      { id:'book-garden', title:'Our School Garden', cat:'reading', icon:'book',
        thumb:'assets/story-garden.jpg',
        desc:'Our class plants pretty flowers in the school garden.',
        pages:[
          'Our class has a small garden at school. We plant tiny seeds.',
          'Every day, we water the seeds with a pink watering can.',
          'Little green plants come up to say hello. We are so happy!',
          'Colorful flowers open like stars. Our garden is beautiful.'
        ],
        quiz:[
          { type:'mcq', q:'What do the students plant?', options:['Tiny seeds','Big stones','Old toys'], a:0 },
          { type:'tf', q:'The students water the seeds every week only.', a:false },
          { type:'wh', q:'Why are the students happy?', options:['The plants grow','School is closed','It is raining'], a:0 },
          { type:'idea', q:'The story teaches us that plants need…', options:['seeds, water, and care','only sun at night','no water at all'], a:0 },
          { type:'vocab', q:'Flowers that “open like stars” look…', options:['small and dark','bright and beautiful','quick and tired'], a:1 },
        ] },
    ],
    worksheets: [
      { id:'sheet-1', n:'١', title:'كلمة لكل صورة', tag:'Picture Words',
        thumb:'assets/sheets/sheet-1-thumb.jpg', full:'assets/sheets/sheet-1.jpg',
        desc:'انظري إلى الصورة واختاري الكلمة الصحيحة — سبع صور ممتعة وكلمات جديدة.' },
      { id:'sheet-2', n:'٢', title:'الأزمنة — الصف الرابع', tag:'Grade 4 Grammar',
        thumb:'assets/sheets/sheet-2-thumb.jpg', full:'assets/sheets/sheet-2.jpg',
        desc:'تدرّبي على المضارع البسيط والمضارع المستمر: أكملي، اختاري، وكوّني السؤال.' },
      { id:'sheet-3', n:'٣', title:'ترتيب وتصنيف الكلمات', tag:'Word Skills',
        thumb:'assets/sheets/sheet-3-thumb.jpg', full:'assets/sheets/sheet-3.jpg',
        desc:'رتّبي الكلمات، اقرئي واكتبي، صنّفي رسميّ وغير رسميّ، وحوّلي الفعل إلى الماضي.' },
      { id:'sheet-4', n:'٤', title:'المساعدة في المنزل', tag:'Helping at Home',
        thumb:'assets/sheets/sheet-4-thumb.jpg', full:'assets/sheets/sheet-4.jpg',
        desc:'واصلي الجملة بالصورة الصحيحة، ضعي T أو F، ورتّبي كلمات السؤال.' },
    ],   // printable worksheets
  },
  stations: [
    { id:'st-checkpoint', n:'١', name:'محطة التحقق', en:'CHECKPOINT', icon:'compass',
      desc:'أولى محطات العبور — مراجعة شاملة لطيفة لقواعدنا ومفرداتنا قبل الانطلاق.',
      qs:[
        { t:'mcq', q:'She ___ her homework every day.', o:['do','does','doing','did'], a:1 },
        { t:'mcq', q:'This book belongs to Sara. It is ___.', o:['her','hers','she','herself'], a:1 },
        { t:'tf',  q:'“She don’t like coffee.”', a:false },
        { t:'mcq', q:'Listen! The baby ___ crying.', o:['is','are','am','be'], a:0 },
        { t:'mcq', q:'My father is tall. ___ is kind, too.', o:['He','Him','His','Her'], a:0 },
        { t:'mcq', q:'How often do you play basketball? — ___', o:['Twice a week','With my milk','In the bag','Very small'], a:0 },
        { t:'tf',  q:'“A cheetah is slower than a turtle.”', a:false },
        { t:'mcq', q:'The word “exciting” means…', o:['fun and full of energy','sleepy and quiet','old and broken','cold and wet'], a:0 },
      ] },
    { id:'st-progress', n:'٢', name:'محطة التقدّم', en:'PROGRESS STATION', icon:'gauge',
      desc:'محطة منتصف الجسر — أسئلة جديدة تعيد المهارات نفسها وتقيس نموّك خطوة بخطوة.',
      qs:[
        { t:'mcq', q:'Look! The girls ___ in the garden.', o:['play','plays','are playing','played'], a:2 },
        { t:'mcq', q:'Yesterday, we ___ a funny movie.', o:['watch','watches','watched','watching'], a:2 },
        { t:'tf',  q:'“She is watching TV right now.”', a:true },
        { t:'mcq', q:'My pencil is ___ than your pencil.', o:['long','longer','longest','more long'], a:1 },
        { t:'mcq', q:'I was hungry, ___ I made a sandwich.', o:['so','but','or','because'], a:0 },
        { t:'mcq', q:'___ do you live? — I live in Dammam.', o:['Who','Where','Why','When'], a:1 },
        { t:'tf',  q:'A “parent” means your mother or your father.', a:true },
        { t:'mcq', q:'I want ___ some milk, please.', o:['drink','drinking','to drink','drank'], a:2 },
      ] },
    { id:'st-mastery', n:'٣', name:'محطة التمكّن', en:'MASTERY STATION', icon:'medal',
      desc:'المحطة الأخيرة قبل القمة — تحقّق نهائي يجمع كل المهارات بثقة البطلة.',
      qs:[
        { t:'mcq', q:'Huda enjoys ___ books before bed.', o:['read','reads','reading','to reading'], a:2 },
        { t:'mcq', q:'Friday is the ___ day of the week!', o:['good','better','best','more good'], a:2 },
        { t:'tf',  q:'“We was very happy at the party.”', a:false },
        { t:'mcq', q:'___ bag is this? — It is Nour’s bag.', o:['Who','Whose','Where','Which'], a:1 },
        { t:'mcq', q:'___ do you go to the library? — Once a month.', o:['How often','How tall','How old','How far'], a:0 },
        { t:'mcq', q:'I like tea ___ I don’t like coffee.', o:['but','so','or','for'], a:0 },
        { t:'tf',  q:'To “sweep the floor” means to clean it with a broom.', a:true },
        { t:'mcq', q:'These books are not yours. They are ___.', o:['our','ours','we','us'], a:1 },
      ] },
  ],
  levels: [
    { id:'explore', name:'مستكشِفة', desc:'أكملتِ بطاقة العبور' },
    { id:'learn',   name:'متعلِّمة', desc:'أنهيتِ أول نشاط تعلّم' },
    { id:'apply',   name:'مُطبِّقة', desc:'أنجزتِ أول ورقة عمل' },
    { id:'dare',    name:'متحدِّية', desc:'اجتزتِ أول تحدٍّ' },
    { id:'master',  name:'متمكِّنة', desc:'عبرتِ الجسر كاملًا' },
  ],
  badges: [
    { id:'first-cross', name:'أول عبور',       desc:'بطاقة العبور جاهزة',      icon:'ticket' },
    { id:'explore',     name:'مستكشِفة',       desc:'بدأتِ الرحلة عبر الجسر',  icon:'compass' },
    { id:'learn',       name:'متعلِّمة',       desc:'أنهيتِ أول نشاط تعلّم',   icon:'spark' },
    { id:'vocab-star',  name:'نجمة المفردات', desc:'زررتِ عالم المفردات',     icon:'star' },
    { id:'reader',      name:'قارئة واعدة',   desc:'أنهيتِ أول قصة بفهمٍ جميل', icon:'book' },
    { id:'dare',        name:'متحدِّية',       desc:'تجاوزتِ أول محطة بتقييم 80٪+', icon:'flag' },
    { id:'master',      name:'متمكِّنة',       desc:'عبرتِ المحطات الثلاث بنجاح', icon:'medal' },
    { id:'full-bridge', name:'عبور الجسر الكامل', desc:'كل المحطات والقصص — خاتمة الرحلة', icon:'trophy' },
  ],
  pass: null,                       // { name, school }
  progress: { stars:0, done:[] },   // completed activity ids
  cert: { awards: [], current: null }, // earned certificates [{key,title,en,score}]

  /* ---------- persistence ---------- */
  load() {
    try { this.pass = JSON.parse(sessionStorage.getItem('sb_pass') || 'null'); } catch { this.pass = null; }
    try { this.progress = JSON.parse(localStorage.getItem('sb_progress') || '{"stars":0,"done":[]}'); } catch {}
    try { this.cert = JSON.parse(localStorage.getItem('sb_cert') || '{"awards":[],"current":null}'); } catch {}
    if (!this.cert || !Array.isArray(this.cert.awards)) this.cert = { awards: [], current: null };
  },
  savePass(p)   { this.pass = p; sessionStorage.setItem('sb_pass', JSON.stringify(p)); },
  saveProgress(){ localStorage.setItem('sb_progress', JSON.stringify(this.progress)); },
  saveCert()    { localStorage.setItem('sb_cert', JSON.stringify(this.cert)); },

  /* only issued at 80%+ — never below */
  issueCertificate(award) {
    if (!award || typeof award.score !== 'number' || award.score < 80) return false;
    const i = this.cert.awards.findIndex(a => a.key === award.key);
    if (i === -1) this.cert.awards.push(award);
    else if (award.score > this.cert.awards[i].score) this.cert.awards[i] = award;
    this.cert.current = award.key;
    this.saveCert();
    if (typeof renderCert === 'function') renderCert();
    return true;
  },
  useCertificate(key) {
    if (this.cert.awards.some(a => a.key === key)) { this.cert.current = key; this.saveCert(); }
  },
};

/* ---------- tiny inline icon set (medallions, always meaningful) ---------- */
const ICONS = {
  ticket :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M9 15h30v7a6 6 0 000 12v7H9v-7a6 6 0 000-12Z"/><path d="M24 19v10" stroke-dasharray="3 4"/></svg>',
  star   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M24 7l5 10.5L40 19l-8 8 2 11.5L24 33l-10 5.5L16 27l-8-8 11-1.5Z"/></svg>',
  book   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 13c-4-3.5-10-4-14-2.5V34c4-1.5 10-1 14 2.5 4-3.5 10-4 14-2.5V10.5C34 9 28 9.5 24 13Z"/><path d="M24 13v23.5"/></svg>',
  pencil :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M31 7l10 10L21 37l-12 3 3-12Z"/><path d="M27 11l10 10"/></svg>',
  flag   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 42V8"/><path d="M13 9h24l-5 7 5 7H13"/></svg>',
  trophy :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 8h18v7a9 9 0 01-18 0Z"/><path d="M15 11H8a7 7 0 008 9M33 11h7a7 7 0 01-8 9"/><path d="M24 24v5M17 38h14"/></svg>',
  compass:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="17"/><path d="M30 18l-4 8-8 4 4-8Z"/></svg>',
  gauge  :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 33a17 17 0 1130 0"/><path d="M24 33l8-10"/></svg>',
  medal  :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="19" r="10"/><path d="M18 27l-5 13 11-6 11 6-5-13"/></svg>',
  spark  :'<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 6l3.2 10L38 19.2 27.2 22.4 24 32l-3.2-9.6L10 19.2 20.8 16Z"/></svg>',
  bridge :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 30C13 17 35 17 42 30"/><path d="M4 32h40"/><path d="M15 32v-7.6M24 32V22.6M33 32v-7.6"/></svg>',
  check  :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 25l8 8 16-17"/></svg>',
  play   :'<svg viewBox="0 0 48 48" fill="currentColor"><path d="M18 12l20 12-20 12Z"/></svg>',
  /* adventure destination icons */
  islands :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 40h8v-6h9v-6h9v-6h10"/><path d="M36 22V8"/><path d="M36 9h8l-3 4 3 4h-8"/></svg>',
  keepsake:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="18" r="7"/><circle cx="15" cy="18" r="2.4"/><path d="M19 23l15 15M30 34l3.5-3.5M26 30l3.5-3.5"/><path d="M15 4c2.6 0 4.6 2 4.6 4.6S17.6 13.2 15 13.2 10.4 11.2 10.4 8.6 12.4 4 15 4Z" opacity=".45"/><path d="M40 8l1.4 4M40 8l-1.4 4M40 8h4M40 8h-4" stroke-linecap="round"/></svg>',
  chain   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="20" width="14" height="18" rx="3"/><path d="M12 20v-3a3 3 0 016 0v3"/><path d="M22 30a6 6 0 016-6h2a6 6 0 010 12h-2a6 6 0 01-6-6Z"/></svg>',
  route   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="36" cy="12" r="5"/><path d="M10 34c0-9 6-14 14-14s14 4 14 9-5 9-11 9-8-4-8-9" stroke-dasharray="1 6"/><path d="M17 20l-4 2.5L16 26"/></svg>',
  planet  :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="10"/><path d="M8 30c-3-1.5 4-8 16-12s24-5 26-3c1.6 1.6-4 7-14 10.6" /><path d="M38 6l1.5 3.6L43 11l-3.5 1.4L38 16l-1.5-3.6L33 11l3.5-1.4Z" fill="currentColor" stroke="none"/></svg>',
  clockgear:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="21" r="13"/><path d="M19 13v8l5.5 4"/><path d="M37 30v-3.2M37 37.2V34M41 33.5l2.8-1.6M32.9 28.5l2.7 1.6M41 28.5l2.8 1.6M32.9 33.5l2.7-1.6"/><circle cx="37" cy="31" r="3.4"/></svg>',
  wheel   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="21" r="13"/><path d="M24 8v26M11 21h26M15 12l18 18M33 12L15 30"/><circle cx="24" cy="21" r="2.4" fill="currentColor" stroke="none"/><circle cx="15" cy="10.5" r="2.6"/><circle cx="33" cy="10.5" r="2.6"/><circle cx="24" cy="35.5" r="2.6"/><path d="M16 44l8-10 8 10"/></svg>',
  sub     :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 28c0-5 7-9 16-9s16 4 16 9-7 9-16 9-16-4-16-9Z"/><path d="M24 19v-7h6"/><circle cx="19" cy="28" r="2.6"/><circle cx="28" cy="28" r="2.6"/><path d="M10 41c3-2.5 5 0 8 0s5-2.5 8 0 5 2.5 8 0" opacity=".7"/></svg>',
  bus     :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14h26a4 4 0 014 4v14H8V18a4 4 0 012-4Z"/><path d="M8 22h32M16 14v8M26 14v8"/><circle cx="14" cy="37" r="3"/><circle cx="34" cy="37" r="3"/><path d="M8 32v5h6M40 32v5h-6"/><path d="M40 14V6M40 7h6l-2 2.5 2 2.5h-6"/></svg>',
  gallery :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L24 7l18 11"/><path d="M9 18h30"/><path d="M13 18v15M24 18v15M35 18v15"/><path d="M8 38h32"/><circle cx="24" cy="25" r="3.4"/></svg>',
  /* vocabulary adventure icons */
  pickframe  :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="10" width="24" height="20" rx="3"/><path d="M9 24l6-6 5 5 4-4 5 5"/><circle cx="15.5" cy="16" r="2"/><circle cx="36" cy="34" r="8"/><path d="M32.5 34l2.4 2.4 4.6-5.2"/></svg>',
  galleryspot:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="12" width="17" height="14" rx="2.5"/><rect x="26" y="8" width="15" height="12" rx="2.5"/><path d="M11 22l4-4 3 3 3.5-3.5"/><circle cx="31" cy="30" r="6"/><path d="M35.5 34.5L41 40"/><path d="M41 26l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" stroke="none"/></svg>',
  misstile   :'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="26" width="9" height="9" rx="2"/><rect x="20" y="26" width="9" height="9" rx="2" stroke-dasharray="3.5 3.5"/><rect x="34" y="26" width="9" height="9" rx="2"/><path d="M13 22V17M13 17l-2.5 2.5M13 17l2.5 2.5"/><path d="M33 12l10-3-3 10-2-4z"/><path d="M40 9l-6.5 6.5"/></svg>',
};

/* ============================================================
   RENDERERS (reusable section engines)
   ============================================================ */

/* compact "official content on its way" strip — no empty placeholder cards */
function comingStrip(icon, title, sub) {
  return `
  <div class="coming-strip reveal is-in">
    <span class="cs-ico">${icon}</span>
    <b>${title}</b>
    <span>${sub}</span>
    <span class="cs-line"></span>
  </div>`;
}

function gameCard(g) {
  return `
  <article class="game-card reveal is-in">
    <img class="gc-thumb" src="${g.thumb || 'assets/games.jpg'}" alt="${g.title}" loading="lazy" decoding="async">
    <div class="gc-body">
      ${g.tag ? `<span class="gc-tag">${g.tag}</span>` : ''}
      <h3>${g.title}</h3>
      ${g.desc ? `<p>${g.desc}</p>` : ''}
      <a class="gc-btn ripple" href="${g.url}" target="_blank" rel="noopener">العبي الآن</a>
    </div>
  </article>`;
}

/* ============================================================
   ADVENTURE DESTINATIONS (ألعاب المغامرات)
   ============================================================ */
const STAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.7l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3 1.2-6.3L2.9 9.3l6.3-.8z"/></svg>';

SB.stars = function (id) {
  if (!SB.progress.gameStars) SB.progress.gameStars = {};
  return Math.min(3, SB.progress.gameStars[id] || 0);
};
SB.grantStars = function (id, n) {           // hook for the official games when their URLs arrive
  if (!SB.progress.gameStars) SB.progress.gameStars = {};
  SB.progress.gameStars[id] = Math.max(SB.stars(id), Math.min(3, n));
  SB.saveProgress();
};

function destCard(g) {
  const stars = SB.stars(g.id);
  const playCtrl = g.url
    ? `<span class="btn btn-play" aria-hidden="true">${ICONS.play}<span>ابدئي المغامرة</span></span>`
    : `<button type="button" class="btn btn-play ripple" data-play="${g.id}">${ICONS.play}<span>ابدئي المغامرة</span></button>`;
  const card = `
  <article class="dest reveal is-in" data-id="${g.id}">
    <figure class="dest-cover">
      <img src="${g.thumb}" alt="عالم لعبة ${g.title}" loading="lazy" decoding="async">
    </figure>
    <span class="dest-ico" aria-hidden="true">${ICONS[g.icon] || ICONS.spark}</span>
    <div class="dest-body">
      <h3 class="dest-title">${g.title}</h3>
      <span class="dest-sub" lang="en" dir="ltr">${g.tag}</span>
      <p class="dest-desc">${g.desc}</p>
    </div>
    <div class="dest-foot">
      <span class="dest-stars" role="img" aria-label="نجومك في هذه اللعبة ${stars} من 3">
        ${[0, 1, 2].map(i => `<span class="dst${i < stars ? ' on' : ''}">${STAR_SVG}</span>`).join('')}
      </span>
      ${playCtrl}
    </div>
  </article>`;
  /* connected games: the whole card is a NATIVE link — no JS needed */
  return g.url
    ? `<a class="dest-link" data-card="${g.id}" href="${g.url}" target="_blank" rel="noopener noreferrer">${card}</a>`
    : card;
}

/* reading library card — same premium identity, storybook flavor */
/* worksheet library card — paper-preview flavor on the same candy identity */
const SHEET_ICON = `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7h16l8 8v26a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><path d="M29 7v8h8"/><path d="M17 21h14M17 27h14M17 33h8"/></svg>`;
const PRINT_ICON = `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V8h20v10"/><path d="M14 34H8a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2h32a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M14 29h20v13H14z"/><circle cx="36" cy="24" r="1.4" fill="currentColor"/></svg>`;
const EYE_ICON = `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 24s7-11 20-11 20 11 20 11-7 11-20 11S4 24 4 24z"/><circle cx="24" cy="24" r="5.5"/></svg>`;

function sheetCard(w) {
  return `
  <article class="wsc reveal is-in" data-id="${w.id}">
    <button type="button" class="wsc-cover" data-view-sheet="${w.id}" aria-label="عرض ورقة العمل: ${w.title}">
      <img src="${w.thumb}" alt="معاينة ورقة عمل ${w.n} — ${w.title}" loading="lazy" decoding="async">
    </button>
    <span class="wsc-ico" aria-hidden="true">${SHEET_ICON}</span>
    <div class="wsc-body">
      <h3 class="wsc-title">${w.n} · ${w.title}</h3>
      <span class="wsc-sub" lang="en" dir="ltr">${w.tag}</span>
      <p class="wsc-desc">${w.desc}</p>
      <span class="wsc-meta">صفحة واحدة · A4 عمودي</span>
    </div>
    <div class="wsc-actions">
      <button type="button" class="btn btn-play ripple" data-view-sheet="${w.id}">
        ${EYE_ICON}<span>عرض ورقة العمل</span>
      </button>
      <button type="button" class="btn btn-ghost ws-print ripple" data-print-sheet="${w.id}">
        ${PRINT_ICON}<span>طباعة</span>
      </button>
    </div>
  </article>`;
}

function bookCard(b) {
  const stars = SB.stars(b.id);
  return `
  <article class="dest bk reveal is-in" data-id="${b.id}">
    <figure class="dest-cover">
      <img src="${b.thumb}" alt="${b.title} — book cover" loading="lazy" decoding="async">
    </figure>
    <span class="dest-ico" aria-hidden="true">${ICONS.book}</span>
    <div class="dest-body" lang="en" dir="ltr">
      <h3 class="dest-title">${b.title}</h3>
      <p class="dest-desc">${b.desc}</p>
      <span class="bk-meta">${b.pages.length} illustrated pages · ${b.quiz.length} questions</span>
    </div>
    <div class="dest-foot">
      <span class="dest-stars" role="img" aria-label="Your stars for this story: ${stars} of 3">
        ${[0, 1, 2].map(i => `<span class="dst${i < stars ? ' on' : ''}">${STAR_SVG}</span>`).join('')}
      </span>
      <button type="button" class="btn btn-play ripple" data-read="${b.id}" lang="en">
        ${ICONS.book}<span>Read the Story</span>
      </button>
    </div>
  </article>`;
}

const RENDER = {
  games() {
    const host = $('#gamesGrid'); if (!host) return;
    host.innerHTML = SB.data.games.length
      ? SB.data.games.map(destCard).join('')
      : comingStrip(ICONS.bridge, 'محطة المغامرات', 'الوجهات القادمة تُجهَّز');
    if (!host.dataset.bound) {
      host.dataset.bound = '1';
      host.addEventListener('click', e => {
        const b = e.target.closest('[data-play]'); if (!b) return;
        const g = SB.data.games.find(x => x.id === b.dataset.play); if (!g) return;
        if (g.play) { openPlayer(g); }                                 // in-site responsive player
        else if (g.url) {
          window.open(g.url, '_blank', 'noopener');                    // connected destination → new tab
          if (SB.stars(g.id) < 1) {                                    // visit counts toward progress
            SB.grantStars(g.id, 1);
            const card = document.querySelector(`.dest[data-id="${g.id}"]`);
            if (card && card.querySelectorAll('.dst')[0]) card.querySelectorAll('.dst')[0].classList.add('on');
          }
        }
        else { toast(`وجهة «${g.title}» تُجهَّز للانطلاق — رابط اللعبة الرسمي يصل هنا قريبًا`); }
      });
    }
  },
  vocabulary() {
    const host = $('#vocabGrid'); if (!host) return;
    host.innerHTML = SB.data.vocabulary.length
      ? SB.data.vocabulary.map(destCard).join('')
      : comingStrip(ICONS.spark, 'محطة ألعاب المفردات', 'ألعاب المفردات الرسمية في طريقها إليكِ');
    if (!host.dataset.bound) {
      host.dataset.bound = '1';
      host.addEventListener('click', e => {
        const link = e.target.closest('.dest-link');
        if (link) {
          const id = link.dataset.card;
          if (id && SB.stars(id) < 1) {
            SB.grantStars(id, 1);
            const s0 = link.querySelectorAll('.dst')[0];
            if (s0) s0.classList.add('on');
          }
          return;
        }
        const b = e.target.closest('[data-play]'); if (!b) return;
        const g = SB.data.vocabulary.find(x => x.id === b.dataset.play); if (!g) return;
        if (g.play) { openPlayer(g); }
        else if (g.url) { window.open(g.url, '_blank', 'noopener'); }
        else { toast(`وجهة «${g.title}» تُجهَّز للانطلاق — قريبًا`); }
      });
    }
  },

  books() {
    const host = $('#booksGrid'); if (!host) return;
    const list = SB.data.books;
    host.innerHTML = list.length
      ? list.map(bookCard).join('')
      : comingStrip(ICONS.book, 'Reading Station', 'Reading stories and questions are on the way');
    if (!host.dataset.bound) {
      host.dataset.bound = '1';
      host.addEventListener('click', e => {
        const b = e.target.closest('[data-read]');
        if (b) { openBook(b.dataset.read); }
      });
    }
  },
  worksheets() {
    const host = $('#sheetsGrid'); if (!host) return;
    const list = SB.data.worksheets;
    host.innerHTML = list.length
      ? list.map(sheetCard).join('')
      : comingStrip(ICONS.pencil, 'محطة أوراق العمل', 'أوراق العمل الرسمية قيد التجهيز');
    if (!host.dataset.bound) {
      host.dataset.bound = '1';
      host.addEventListener('click', e => {
        const v = e.target.closest('[data-view-sheet]');
        if (v) { openSheet(v.dataset.viewSheet); return; }
        const p = e.target.closest('[data-print-sheet]');
        if (p) { printSheet(p.dataset.printSheet); }
      });
    }
  },
  stations() {
    const host = $('#stations');
    host.innerHTML = SB.stations.map((s, i) => {
      const stars = SB.stars(s.id);
      return `
      <article class="sq-card reveal is-in" data-id="${s.id}" style="--sq-i:${i}">
        <span class="sq-line" aria-hidden="true">${s.n}</span>
        <div class="sq-head">
          <span class="sq-medal">${ICONS[s.icon]}</span>
          <div class="sq-names">
            <h3 class="sq-title">${s.name}</h3>
            <span class="sq-en" lang="en" dir="ltr">${s.en}</span>
          </div>
          <span class="dest-stars sq-stars" role="img" aria-label="نجومك في هذه المحطة ${stars} من 3">
            ${[0, 1, 2].map(k => `<span class="dst${k < stars ? ' on' : ''}">${STAR_SVG}</span>`).join('')}
          </span>
        </div>
        <p class="sq-desc">${s.desc}</p>
        <div class="sq-foot">
          <span class="sq-meta">${s.qs.length} أسئلة قصيرة · قواعد ومفردات</span>
          <button type="button" class="btn btn-play ripple sq-start" data-station="${s.id}">
            ${ICONS.play}<span>${stars ? 'أعيدي المحطة' : 'ابدئي المحطة'}</span>
          </button>
        </div>
      </article>`;
    }).join('');
    if (!host.dataset.bound) {
      host.dataset.bound = '1';
      host.addEventListener('click', e => {
        const b = e.target.closest('[data-station]');
        if (b) openStation(b.dataset.station);
      });
    }
  },
  badges() {
    const scores = SB.progress.scores || {};
    const stationTried  = SB.stations.some(st => (scores[st.id] || 0) > 0);
    const stationPassed = SB.stations.some(st => SB.stars(st.id) >= 3);
    const allStations   = SB.stations.every(st => SB.stars(st.id) >= 3);
    const anyActivity   = SB.progress.done.length > 0 || Object.keys(SB.progress.gameStars || {}).length > 0;
    const readABook     = SB.progress.done.some(t => t.startsWith('book-'));
    const vocabSeen = Object.keys(SB.progress.gameStars || {}).some(id => id.startsWith('vocab-'));
    const allBooks  = SB.data.books.every(b => SB.progress.done.includes('book-' + b.id));
    const unlocked = new Set();
    if (SB.pass)       { unlocked.add('first-cross'); unlocked.add('explore'); }
    if (anyActivity)   unlocked.add('learn');
    if (vocabSeen)     unlocked.add('vocab-star');
    if (readABook)     unlocked.add('reader');
    if (stationPassed) unlocked.add('dare');
    if (allStations)   unlocked.add('master');
    if (allStations && allBooks) unlocked.add('full-bridge');
    const host = $('#badges');
    host.innerHTML = SB.badges.map(b => `
      <div class="badge ${unlocked.has(b.id) ? 'is-on' : ''}">
        <span class="badge-med">${ICONS[b.icon]}</span>
        <b>${b.name}</b><span>${b.desc}</span>
      </div>`).join('');
    return unlocked.size;
  },
  levelsProgress() {
    const host = $('#progressList');
    host.innerHTML = SB.levels.map((lv, i) => {
      const done = i === 0 && !!SB.pass;
      return `
      <div class="prow ${done ? 'is-done' : ''}">
        <span class="pr-check">${ICONS.check}</span>
        <b>${lv.name}</b>
        <span>${done ? 'مكتملة' : lv.desc}</span>
      </div>`;
    }).join('');
  },
};

/* progress aggregates + ring */
function totalStars() {
  return Object.values(SB.progress.gameStars || {}).reduce((a, b) => a + (b | 0), 0);
}
function stationsPassed() {
  return SB.stations.filter(st => SB.stars(st.id) >= 3).length;
}
function booksDone() {
  return SB.progress.done.filter(t => t.startsWith('book-')).length;
}
function refreshProgress() {
  const badgeCount = RENDER.badges();
  const stars = totalStars();
  const stDone = stationsPassed();
  const bDone = booksDone();
  const gamesSeen = Object.keys(SB.progress.gameStars || {})
    .filter(id => id.startsWith('game-') || id.startsWith('vocab-')).length;

  /* overall learning progress: assessment stations + finished stories + earned badges */
  const possible = SB.stations.length + SB.data.books.length + SB.badges.length;
  const pct = Math.round(((stDone + bDone + badgeCount) / possible) * 100);

  const C = 2 * Math.PI * 54;
  const ring = $('#ringFill');
  if (ring) requestAnimationFrame(() => { ring.style.strokeDashoffset = C - (C * pct) / 100; });
  countUp($('#ringPct'), pct, '%');
  countUp($('#achStars'), stars);
  countUp($('#achActivities'), bDone + gamesSeen);
  countUp($('#achStations'), stDone);
  countUp($('#achCerts'), SB.cert.awards.length);
  countUp($('#statStars'), stars);
  countUp($('#statBadges'), badgeCount);
  countUp($('[data-count="5"]'), 5);
}

function countUp(el, to, suffix = '') {
  if (!el) return;
  const from = parseInt(el.dataset.v || '0', 10);
  if (from === to) { el.textContent = to + suffix; return; }
  const t0 = performance.now(), dur = 700;
  (function step(t) {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(from + (to - from) * e) + suffix;
    if (k < 1) requestAnimationFrame(step); else el.dataset.v = to;
  })(t0);
}

/* ============================================================
   PASS (بطاقة العبور) — session persistence + personalization
   ============================================================ */
function firstName(full) { return (full || '').trim().split(/\s+/)[0] || ''; }

function applyPassUI({ celebrate = false } = {}) {
  const form = $('#passForm'), done = $('#passDone');
  const has = !!SB.pass;

  form.hidden = has;
  done.hidden = !has;
  if (has) {
    $('[data-pass="name"]').textContent  = SB.pass.name;
    $('[data-pass="school"]').textContent = SB.pass.school;
  }

  /* launch status */
  const ls = $('#launchStatus'), lsText = $('#lsText');
  ls.classList.toggle('is-done', has);
  lsText.innerHTML = has
    ? `بطاقتك جاهزة يا <b>${firstName(SB.pass.name)}</b> — انطلقي عبر الجسر!`
    : 'عبّئي بطاقة العبور أولًا لنحفظ اسمك في الرحلة';
  $('#launchToPass').style.display = has ? 'none' : '';

  /* achievements greeting */
  $('#achGreeting').textContent = has
    ? `سماء إنجازك يا ${firstName(SB.pass.name)} — كل نجمة صنعتِها خطوةً بخطوة`
    : 'كل خطوة تعبرينها تصنع نجمة جديدة في سمائك';

  /* certificate */
  renderCert();
  renderAchJournal();

  RENDER.stations();
  RENDER.levelsProgress();
  refreshProgress();

  if (celebrate) {
    confettiBurst();
    toast(`تم ختم بطاقة العبور — أهلًا بكِ يا ${firstName(SB.pass.name)}!`);
  }
}

function initPassForm() {
  const form = $('#passForm');
  const nameI = $('#studentName'), schoolI = $('#schoolName');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameI.value.trim(), school = schoolI.value.trim();
    let ok = true;

    [[nameI, name], [schoolI, school]].forEach(([input, val]) => {
      const field = input.closest('.field');
      const err = field.querySelector('.f-error');
      field.classList.remove('is-error'); err.hidden = true;
      if (val.length < 2) {
        ok = false;
        field.classList.add('is-error'); err.hidden = false;
        setTimeout(() => field.classList.remove('is-error'), 1400);
      }
    });
    if (!ok) { toast('أكملي الحقول أولًا يا صغيرتي'); return; }

    SB.savePass({ name, school });
    applyPassUI({ celebrate: true });
  });

  $('#editPass').addEventListener('click', () => {
    nameI.value = SB.pass?.name || '';
    schoolI.value = SB.pass?.school || '';
    $('#passDone').hidden = true;
    $('#passForm').hidden = false;
    nameI.focus();
  });
}

/* ============================================================
   MICRO-INTERACTIONS
   ============================================================ */

/* ripple on .btn / .chip / .ripple */
document.addEventListener('click', e => {
  const el = e.target.closest('.btn, .chip, .ripple');
  if (!el) return;
  const r = el.getBoundingClientRect();
  const ink = document.createElement('span');
  ink.className = 'ripple-ink';
  const d = Math.max(r.width, r.height);
  ink.style.cssText = `width:${d}px;height:${d}px;top:${e.clientY - r.top - d/2}px;left:${e.clientX - r.left - d/2}px`;
  el.appendChild(ink);
  setTimeout(() => ink.remove(), 650);
});

/* reveal on scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => en.isIntersecting && en.target.classList.add('is-in'));
}, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach(el => io.observe(el));

/* dock active state */
(function dockSpy() {
  const links = $$('.dock-item');
  const map = new Map(links.map(l => [l.dataset.target, l]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(l => l.classList.remove('is-on'));
      map.get(en.target.id)?.classList.add('is-on');
    });
  }, { rootMargin: '-38% 0px -52% 0px' });
  ['hero','games','reading','assessment','achievements'].forEach(id => {
    const s = document.getElementById(id); s && spy.observe(s);
  });
})();

/* top menu — functional hamburger */
(function menu() {
  const btn = $('#menuBtn'), card = $('#menuCard');
  if (!btn || !card) return;
  const close = () => { card.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = card.hidden;
    card.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => { if (!card.hidden && !card.contains(e.target) && e.target !== btn) close(); });
  card.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* journey carousel — swipe (native) + arrows + dots + mouse drag */
(function carousel() {
  const row = $('#journeyRow'), wrap = $('#journeyDots');
  const prev = $('#jPrev'), next = $('#jNext');
  if (!row || !wrap) return;
  const cards = $$('.step-card', row);
  let index = 0;

  wrap.innerHTML = cards.map((_, i) =>
    `<button type="button" aria-label="البطاقة ${i + 1} من ${cards.length}"></button>`).join('');
  const dots = $$('button', wrap);

  /* exact snap-aligned rest positions — RTL-safe (offsetLeft is negative in RTL) */
  const snapTargets = () => {
    const rtl = getComputedStyle(row).direction === 'rtl';
    const cw = row.clientWidth, max = Math.max(0, row.scrollWidth - cw);
    return cards.map(el => {
      const s = el.offsetLeft + el.offsetWidth / 2 - cw / 2;
      return rtl ? Math.max(-max, Math.min(0, s)) : Math.max(0, Math.min(max, s));
    });
  };
  const nearest = () => {
    const t = snapTargets(), s = row.scrollLeft;
    let bi = index, bd = Infinity;
    t.forEach((x, i) => { const d = Math.abs(x - s); if (d < bd) { bd = d; bi = i; } });
    return bi;
  };
  let gliding = null;
  const go = (i, dur) => {
    index = Math.max(0, Math.min(cards.length - 1, i));
    const dest = snapTargets()[index];
    if (!dur) { row.scrollTo({ behavior: 'smooth', left: dest , top: 0 }); return; }
    if (gliding) cancelAnimationFrame(gliding);
    row.style.scrollSnapType = 'none';
    const sx = row.scrollLeft, dx = dest - sx, t0 = performance.now();
    const ease = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
    (function fr(now) {
      const k = Math.min(1, (now - t0) / dur);
      row.scrollLeft = sx + dx * ease(k);
      if (k < 1) { gliding = requestAnimationFrame(fr); }
      else { gliding = null; row.style.scrollSnapType = ''; row.scrollLeft = dest; }
    })(t0);
  };
  const paint = () => {
    dots.forEach((d, i) => d.classList.toggle('is-on', i === index));
    prev?.classList.toggle('is-off', index <= 0);
    next?.classList.toggle('is-off', index >= cards.length - 1);
  };

  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

  let raf;
  row.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { index = nearest(); paint(); });
  }, { passive: true });

  /* mouse drag for desktop, direction-aware in RTL */
  const rtl = getComputedStyle(row).direction === 'rtl';
  let down = false, startX = 0, startScroll = 0;
  row.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    down = true; startX = e.clientX; startScroll = row.scrollLeft;
    row.style.scrollSnapType = 'none';
  });
  row.addEventListener('pointermove', e => {
    if (!down) return;
    row.scrollLeft = startScroll + (rtl ? (e.clientX - startX) : (startX - e.clientX));
  });
  const release = () => { if (!down) return; down = false; row.style.scrollSnapType = ''; };
  row.addEventListener('pointerup', release);
  row.addEventListener('pointercancel', release);
  row.addEventListener('pointerleave', release);

  /* keep active card centered on load & resize */
  const center = () => { const i = index; go(i); };
  window.addEventListener('load', () => setTimeout(center, 80));
  window.addEventListener('resize', center);
  paint();
  SB.carouselJourney = { go, snapTargets, nearest, get index() { return index; }, row };
})();

/* filter chips return when the official games land */

/* toast */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* pastel confetti */
function confettiBurst() {
  const cv = $('#confetti'), ctx = cv.getContext('2d');
  const DPR = Math.min(2, devicePixelRatio || 1);
  cv.width = innerWidth * DPR; cv.height = innerHeight * DPR; ctx.scale(DPR, DPR);
  const colors = ['#8FCCF2','#F3AECC','#F6DC9C','#CBB9E6','#FFF3DE','#5FB2E8','#E98BB2'];
  const parts = Array.from({ length: 110 }, () => ({
    x: innerWidth / 2 + (Math.random() - .5) * 120,
    y: innerHeight * .38,
    vx: (Math.random() - .5) * 11, vy: -6 - Math.random() * 8,
    s: 5 + Math.random() * 7, r: Math.random() * Math.PI,
    vr: (Math.random() - .5) * .3,
    c: colors[Math.random() * colors.length | 0],
    shape: Math.random() < .3 ? 'star' : (Math.random() < .5 ? 'rect' : 'dot'),
    life: 1,
  }));
  let start;
  (function frame(t) {
    start ??= t;
    const k = (t - start) / 1000;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach(p => {
      p.vy += .24; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life = 1 - k / 2.4;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.c;
      if (p.shape === 'rect') ctx.fillRect(-p.s/2, -p.s/4, p.s, p.s/2);
      else if (p.shape === 'dot') { ctx.beginPath(); ctx.arc(0,0,p.s/2.4,0,7); ctx.fill(); }
      else star(ctx, p.s * .8);
      ctx.restore();
    });
    if (k < 2.4) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })(performance.now());
}
function star(ctx, r) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 ? r * .42 : r, a = (Math.PI / 4) * i - Math.PI / 2;
    ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * rad, Math.sin(a) * rad);
  }
  ctx.closePath(); ctx.fill();
}

/* certificate print */
$('#printCert')?.addEventListener('click', () => {
  if (!SB.pass) {
    toast('عبّئي بطاقة العبور أولًا لطباعة شهادتك باسمك');
    document.getElementById('gateway').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  if (!SB.cert.awards.length) {
    toast('أكملي نشاطًا بنسبة 80% أو أكثر أولًا لتُجهَّز شهادتك');
    document.getElementById('assessment').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.print();
});

/* subtle hero art tilt */
(function tilt() {
  const art = $('.hero-art'); if (!art || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  art.parentElement.addEventListener('pointermove', e => {
    const r = art.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    art.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
  art.parentElement.addEventListener('pointerleave', () => { art.style.transform = ''; art.style.transition = 'transform .5s ease'; setTimeout(()=>art.style.transition='',500); });
})();

/* ============================================================
   BOOT
   ============================================================ */
/* certificate ornament (declared before first render — TDZ-safe) */
const CERT_CORNER = `<svg viewBox="0 0 90 90" fill="none" aria-hidden="true"><path d="M6 84C6 40 40 6 84 6" stroke="currentColor" stroke-width="2.2"/><path d="M18 84C18 52 52 18 84 18" stroke="currentColor" stroke-width="1.1" opacity=".55"/><path d="M30 84C30 60 60 30 84 30" stroke="currentColor" stroke-width=".8" opacity=".35"/><circle cx="84" cy="6" r="2.6" fill="currentColor"/><circle cx="6" cy="84" r="2.6" fill="currentColor"/></svg>`;

SB.load();
SB.renderAll = function () {
  RENDER.games(); RENDER.vocabulary(); RENDER.books(); RENDER.worksheets();
  RENDER.stations(); RENDER.levelsProgress(); refreshProgress(); renderCert(); renderAchJournal();
};
SB.renderAll();
initPassForm();
applyPassUI();

/* expose for the official content drop-in */
window.SB = SB;

/* ============ in-site Game Player (same-origin, mobile-first) ============ */
let _player = null, _scrollY = 0;

function ensurePlayer() {
  if (_player) return _player;
  const wrap = document.createElement('div');
  wrap.id = 'gamePlayer';
  wrap.setAttribute('role', 'dialog');
  wrap.setAttribute('aria-modal', 'true');
  wrap.innerHTML = `
    <div class="gplayer-bar">
      <button type="button" class="gp-back" id="gpBack">
        <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10l14 14-14 14"/></svg>
        <span>عودة إلى الألعاب</span>
      </button>
      <span class="gp-title" id="gpTitle"></span>
      <span class="gp-actions">
        <a class="gp-ext" id="gpExt" href="#" target="_blank" rel="noopener" aria-label="فتح اللعبة في تبويب جديد">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10h18v18M38 10L18 30M14 14H8v24h24v-6"/></svg>
        </a>
        <button type="button" class="gp-close" id="gpClose" aria-label="إغلاق اللعبة">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M13 13l22 22M35 13L13 35"/></svg>
        </button>
      </span>
    </div>
    <div class="gp-loader" id="gpLoader" aria-hidden="true">
      <span class="gp-ring"></span><b id="gpLoadingText"></b>
    </div>
    <iframe class="gp-frame" id="gpFrame" title="نافذة اللعبة" allow="fullscreen; autoplay; gamepad" allowfullscreen referrerpolicy="no-referrer"></iframe>`;
  document.body.appendChild(wrap);
  $('#gpBack', wrap).addEventListener('click', closePlayer);
  $('#gpClose', wrap).addEventListener('click', closePlayer);
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && _player.classList.contains('open')) closePlayer(); });
  _player = wrap;
  return wrap;
}

function openPlayer(g) {
  if (!g.play) return;
  const wrap = ensurePlayer();
  $('#gpTitle').textContent = g.title;
  const ext = $('#gpExt');
  if (g.launchUrl) { ext.href = g.launchUrl; ext.hidden = false; } else { ext.hidden = true; }
  $('#gpLoadingText').textContent = `جاري فتح «${g.title}»…`;
  wrap.classList.add('open', 'loading');
  /* freeze the page in place — pixel-exact restore on close */
  _scrollY = window.scrollY;
  document.documentElement.classList.add('no-scroll');
  document.body.style.position = 'fixed';
  document.body.style.top = (-_scrollY) + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  const frame = $('#gpFrame');
  frame.onload = () => wrap.classList.remove('loading');
  frame.src = g.play;
  /* وجهة تمت زيارتها → أول نجمة في نظام التقدّم */
  if (SB.stars(g.id) < 1) {
    SB.grantStars(g.id, 1);
    const card = document.querySelector(`.dest[data-id="${g.id}"]`);
    if (card && card.querySelectorAll('.dst')[0]) card.querySelectorAll('.dst')[0].classList.add('on');
  }
}

function closePlayer() {
  if (!_player) return;
  const frame = $('#gpFrame');
  frame.onload = null;
  frame.src = 'about:blank';
  _player.classList.remove('open', 'loading');
  document.documentElement.classList.remove('no-scroll');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  const restore = () => { window.scrollTo(0, _scrollY); window.scrollTo({ top: _scrollY, behavior: 'instant' }); };
  restore();
  requestAnimationFrame(restore);
  setTimeout(restore, 60);
}

/* ====================== journey autoplay (جولة تلقائية هادئة) ====================== */
(function(){
  const row=$('#journeyRow'); if(!row) return;
  const api=()=> (window.SB && SB.carouselJourney) || null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const AUTO=3800;      /* pause on each card ≈3.8s */
  const DUR =820;       /* gentle glide between cards ≈820ms */
  const RESUME=6500;    /* resume after user interaction */
  let timer=null, resumeT=null, visible=true;

  function stop(){ if(timer){clearInterval(timer); timer=null;} }
  function start(){
    stop();
    if(reduced.matches||!visible||document.hidden) return;
    const c=api(); if(!c) return;
    const t=c.snapTargets(); if(t.length<2||Math.abs(t[t.length-1])<=2) return; /* nothing to scroll */
    timer=setInterval(stepGo, AUTO);
  }
  function stepGo(){
    const c=api(); if(!c) return;
    const t=c.snapTargets(); if(t.length<2) return;
    let nx=c.index+1; if(nx>=t.length) nx=0;   /* last → first, smooth loop */
    c.go(nx, DUR);
  }
  function pauseForUser(){ stop(); if(resumeT) clearTimeout(resumeT); resumeT=setTimeout(start, RESUME); }
  function planStart(t){ stop(); if(resumeT) clearTimeout(resumeT); resumeT=setTimeout(start, t); }

  ['pointerdown','touchstart','wheel'].forEach(ev=> row.addEventListener(ev, pauseForUser, {passive:true}));
  row.addEventListener('keydown', pauseForUser);
  ['#jPrev','#jNext','#journeyDots'].forEach(sel=>{
    const el=$(sel); el && el.addEventListener('click', pauseForUser);
  });
  document.addEventListener('visibilitychange',()=>{ document.hidden?stop():planStart(500); });
  if('IntersectionObserver' in window){
    new IntersectionObserver(en=>{
      const v=en[0].isIntersecting;
      if(v===visible) return;   /* ignore redundant callbacks (e.g. the initial one) */
      visible=v; v?planStart(500):stop();
    },{threshold:.3}).observe(row);
  }
  if(typeof reduced.addEventListener==='function'){
    reduced.addEventListener('change',()=>{ stop(); start(); });
  }
  window.addEventListener('resize',()=>{ planStart(900); });
  start();
})();

/* ============================================================
   MINI STORYBOOK READER (مكتبة القصص المصوّرة)
   opening-book experience → pages → comprehension quiz → score
   ============================================================ */
let _reader = null, _rBook = null, _rPage = 0, _rQ = 0, _rRight = 0, _rY = 0;

function ensureReader() {
  if (_reader) return _reader;
  const el = document.createElement('div');
  el.id = 'bookReader';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.innerHTML = `
    <div class="br-bar">
      <button type="button" class="gp-back br-close" id="brClose">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10l14 14-14 14"/></svg>
        <span lang="en">Back to the Library</span>
      </button>
      <span class="gp-title" id="brTitle"></span>
    </div>
    <div class="br-stage" id="brStage"></div>`;
  document.body.appendChild(el);
  $('#brClose', el).addEventListener('click', closeBook);
  window.addEventListener('keydown', e => {
    if (!_reader.classList.contains('open')) return;
    if (e.key === 'Escape') closeBook();
    if (_reader.dataset.mode === 'read') {
      if (e.key === 'ArrowLeft') readerNext();
      if (e.key === 'ArrowRight') readerPrev();
    }
  });
  _reader = el;
  return el;
}

function brSetMode(m) {
  _reader.dataset.mode = m;
  const stage = $('#brStage');
  stage.classList.remove('br-stage-swap-in');
  void stage.offsetWidth;
  stage.classList.add('br-stage-swap-in');
}

function openBook(id) {
  const b = SB.data.books.find(x => x.id === id); if (!b) return;
  const el = ensureReader();
  _rBook = b; _rPage = 0; _rQ = 0; _rRight = 0;
  $('#brTitle').textContent = b.title;
  _rY = window.scrollY;
  document.documentElement.classList.add('no-scroll');
  document.body.style.position = 'fixed';
  document.body.style.top = (-_rY) + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  el.classList.add('open');
  renderCover();
}

function renderCover() {
  brSetMode('cover');
  const b = _rBook;
  $('#brStage').innerHTML = `
    <div class="brk-book" id="brkBook">
      <div class="brk-pages" aria-hidden="true"></div>
      <figure class="brk-under" aria-hidden="true">
        <img src="${b.thumb}" alt="">
      </figure>
      <figure class="brk-front" id="brkFront" style="background-image:url('${b.thumb}')" role="img" aria-label="Open the book: ${b.title}">
        <figcaption class="brk-front-label">
          <b lang="en" dir="ltr">${b.title}</b>
        </figcaption>
      </figure>
    </div>
    <p class="br-cover-hint" lang="en" dir="ltr">${b.pages.length} illustrated pages · ${b.quiz.length} questions at the end</p>
    <button type="button" class="btn btn-play ripple br-open-btn" id="brOpen">
      ${ICONS.book}<span lang="en">Open the Book</span>
    </button>`;
  $('#brOpen').addEventListener('click', () => {
    const front = $('#brkFront');
    front.classList.add('brk-opening');
    const book = $('#brkBook');
    book.classList.add('brk-open');
    const opened = matchMedia('(prefers-reduced-motion: reduce)').matches ? 60 : 950;
    setTimeout(() => { _rPage = 0; renderPage(); }, opened);
  });
}

/* type badges for quiz questions */
const QTYPE = {
  mcq:'Multiple Choice', tf:'True or False', wh:'Who · Where · Why',
  idea:'Main Idea', vocab:'Vocabulary in Context',
};

function renderPage() {
  brSetMode('read');
  const b = _rBook, i = _rPage, n = b.pages.length;
  const last = i === n - 1;
  $('#brStage').innerHTML = `
    <div class="brb-spread" id="brbSpread">
      <figure class="brb-art">
        <img src="${b.thumb}" alt="${b.title} — story picture">
        <span class="brb-pagenum" dir="ltr">${i + 1} / ${n}</span>
      </figure>
      <div class="brb-leaf" id="brbLeaf">
        <div class="brb-textwrap" lang="en" dir="ltr">
          <p class="brb-text" id="brbText">${b.pages[i]}</p>
        </div>
        <div class="brb-reading-progress" aria-hidden="true">
          <span style="width:${((i + 1) / n) * 100}%"></span>
        </div>
      </div>
    </div>
    <div class="brb-controls">
      <button type="button" class="brb-nav" id="brbPrev" ${i === 0 ? 'disabled' : ''}>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M30 10L16 24l14 14"/></svg>
        <span lang="en">Previous</span>
      </button>
      <span class="brb-dots" aria-hidden="true">
        ${b.pages.map((_, d) => `<i class="${d === i ? 'on' : ''}"></i>`).join('')}
      </span>
      <button type="button" class="brb-nav next" id="brbNext">
        <span lang="en">${last ? 'Start the Quiz' : 'Next'}</span>
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10l14 14-14 14"/></svg>
      </button>
    </div>`;
  $('#brbNext').addEventListener('click', readerNext);
  $('#brbPrev').addEventListener('click', readerPrev);
  const leaf = $('#brbLeaf');
  leaf.classList.remove('brb-turn-next', 'brb-turn-prev');
  void leaf.offsetWidth;
  leaf.classList.add('brb-turn-next');
}

function _readerStep(toPage) {
  _rPage = Math.max(0, Math.min(_rBook.pages.length - 1, toPage));
  renderPage();
}
function readerNext() {
  if (_rPage < _rBook.pages.length - 1) { _readerStep(_rPage + 1); }
  else { renderQuiz(); }
}
function readerPrev() { if (_rPage > 0) _readerStep(_rPage - 1); }

function renderQuiz() {
  brSetMode('quiz');
  _rRight = 0; _rQ = 0;
  renderQuestion();
}

function renderQuestion() {
  const b = _rBook, q = b.quiz[_rQ], n = b.quiz.length, i = _rQ;
  const opts = q.type === 'tf'
    ? ['True', 'False']
    : q.options;
  const correctIdx = q.type === 'tf' ? (q.a ? 0 : 1) : q.a;
  $('#brStage').innerHTML = `
    <div class="qwrap">
      <div class="q-head">
        <span class="q-badge" lang="en">${QTYPE[q.type] || q.type}</span>
        <span class="q-count" lang="en" dir="ltr">Question ${i + 1} of ${n}</span>
      </div>
      <div class="brb-reading-progress q-progress" aria-hidden="true">
        <span style="width:${(i / n) * 100}%"></span>
      </div>
      <div class="q-card">
        <p class="q-text" lang="en" dir="ltr">${q.q}</p>
        <div class="q-opts">
          ${opts.map((o, k) => `<button type="button" class="q-opt${q.type === 'tf' ? ' tf' : ''}" data-k="${k}" lang="en" dir="ltr">${o}</button>`).join('')}
        </div>
      </div>
    </div>`;
  $$('.q-opt').forEach(btn => btn.addEventListener('click', () => {
    if (btn.classList.contains('picked')) return;
    const k = +btn.dataset.k;
    const okIdx = correctIdx;
    $$('.q-opt').forEach(x => {
      if (+x.dataset.k === okIdx) x.classList.add('ok');
      x.disabled = true;
    });
    btn.classList.add('picked');
    if (k === okIdx) { _rRight++; btn.classList.add('ok'); }
    else { btn.classList.add('no'); }
    const pause = matchMedia('(prefers-reduced-motion: reduce)').matches ? 350 : 850;
    setTimeout(() => {
      _rQ++;
      if (_rQ < b.quiz.length) renderQuestion();
      else renderResult();
    }, pause);
  }));
}

function renderResult() {
  brSetMode('result');
  const b = _rBook, n = b.quiz.length;
  const pct = Math.round((_rRight / n) * 100);
  const passed = pct >= 80;
  const stars = pct >= 80 ? 3 : (pct >= 60 ? 2 : (_rRight > 0 ? 1 : 0));
  SB.grantStars(b.id, stars);
  if (passed) SB.issueCertificate({ key:'book-' + b.id, title:`قصة «${b.title}»`, en:'Reading Story Quiz', score:pct });
  let doneTag = 'book-' + b.id;
  if (passed && !SB.progress.done.includes(doneTag)) {
    SB.progress.done.push(doneTag);
    SB.saveProgress();
    if (SB.pass) confettiBurst();
  }
  refreshBookStars(b.id, stars);
  refreshAchievementsUI();
  const R = 52, C = 2 * Math.PI * R;
  $('#brStage').innerHTML = `
    <div class="res-card">
      <div class="res-ring" role="img" aria-label="Your score: ${pct} percent">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="${R}" class="res-track"/>
          <circle cx="60" cy="60" r="${R}" class="res-fill ${passed ? 'pass' : ''}" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - _rRight / n)}"/>
        </svg>
        <b>${pct}<small>%</small></b>
      </div>
      <span class="res-stars" role="img" aria-label="You earned ${stars} stars">
        ${[0, 1, 2].map(i => `<span class="dst xl${i < stars ? ' on' : ''}">${STAR_SVG}</span>`).join('')}
      </span>
      <b class="res-title" lang="en">${passed ? 'Well done! Great understanding' : 'Good try — read the story again'}</b>
      <p class="res-sub">${passed
        ? `You answered ${_rRight} of ${n} questions correctly — you are ready for the next step`
        : `You answered ${_rRight} of ${n} questions correctly — read the story again and try once more`}</p>
      <div class="res-actions">
        ${passed ? `<button type="button" class="btn btn-play ripple" id="resCert">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="19" r="10"/><path d="M18 27l-5 13 11-6 11 6-5-13"/></svg>
          <span class="cta-stack"><span>احصلي على الشهادة</span><small class="cta-en" lang="en">GET YOUR CERTIFICATE</small></span>
        </button>` : ''}
        <button type="button" class="btn btn-ghost ripple br-secondary" id="resReread">
          ${ICONS.book}<span lang="en">${passed ? 'Read Another Story' : 'Read Again'}</span>
        </button>
        <button type="button" class="brb-nav br-secondary-btn" id="resExit" lang="en"><span>Back to the Library</span></button>
      </div>
    </div>`;
  if (passed) $('#resCert').addEventListener('click', () => {
    closeBook(true);
    const ach = $('#certCard') || document.getElementById('achievements');
    if (ach) ach.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      const cert = $('#certCard') || $('#printCert');
      if (cert) { cert.classList.add('attn'); setTimeout(() => cert.classList.remove('attn'), 2600); }
      toast('شهادتك جاهزة في لوحة الإنجاز — اطبعيها من هناك');
    }, 800);
  });
  $('#resReread').addEventListener('click', () => {
    if (passed) { closeBook(true); document.getElementById('reading').scrollIntoView({ behavior: 'smooth' }); }
    else { _rPage = 0; renderPage(); }
  });
  $('#resExit').addEventListener('click', closeBook);
}

function refreshBookStars(id, stars) {
  const card = document.querySelector(`#booksGrid .dest[data-id="${id}"]`);
  if (!card) return;
  card.querySelectorAll('.dst').forEach((s, i) => s.classList.toggle('on', i < stars));
  const wrap = card.querySelector('.dest-stars');
  if (wrap) wrap.setAttribute('aria-label', `Your stars for this story: ${stars} of 3`);
}

function closeBook(skipRestore) {
  if (!_reader) return;
  _reader.classList.remove('open');
  document.documentElement.classList.remove('no-scroll');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  const y = _rY;
  if (!skipRestore) {
    const restore = () => { window.scrollTo(0, y); window.scrollTo({ top: y, behavior: 'instant' }); };
    restore();
    requestAnimationFrame(restore);
    setTimeout(restore, 60);
  }
  _rBook = null;
}

/* ====================== worksheet viewer & print (منطقة أوراق العمل) ====================== */
let _sv = null, _svSheet = null, _svZoom = 0, _svY = 0;
const SV_ZOOM_STEPS = [100, 125, 150, 185, 225];

function ensureSheetViewer() {
  if (_sv) return _sv;
  const el = document.createElement('div');
  el.id = 'sheetViewer';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.innerHTML = `
    <div class="sv-bar">
      <button type="button" class="gp-back br-close" id="svClose">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10l14 14-14 14"/></svg>
        <span>عودة إلى المكتبة</span>
      </button>
      <span class="gp-title" id="svTitle"></span>
      <div class="sv-tools">
        <div class="sv-zoom" role="group" aria-label="أدوات التكبير">
          <button type="button" id="svZoomOut" aria-label="تصغير">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="22" r="13"/><path d="M31 31l10 10"/><path d="M16 22h12"/></svg>
          </button>
          <span id="svZoomPct" aria-live="polite">100%</span>
          <button type="button" id="svZoomIn" aria-label="تكبير">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="22" r="13"/><path d="M31 31l10 10"/><path d="M16 22h12M22 16v12"/></svg>
          </button>
        </div>
        <button type="button" class="btn ws-print ripple" id="svPrint">
          ${PRINT_ICON}<span>طباعة</span>
        </button>
      </div>
    </div>
    <div class="sv-stage" id="svStage">
      <figure class="sv-paper" id="svPaper"><img id="svImg" src="" alt=""></figure>
    </div>`;
  document.body.appendChild(el);
  $('#svClose', el).addEventListener('click', closeSheet);
  $('#svPrint', el).addEventListener('click', () => { if (_svSheet) printSheet(_svSheet.id); });
  $('#svZoomIn', el).addEventListener('click', () => svZoom(+1));
  $('#svZoomOut', el).addEventListener('click', () => svZoom(-1));
  window.addEventListener('keydown', e => {
    if (!_sv.classList.contains('open')) return;
    if (e.key === 'Escape') closeSheet();
    if (e.key === '+' || e.key === '=') svZoom(+1);
    if (e.key === '-') svZoom(-1);
  });
  _sv = el;
  return el;
}

function svZoomApply() {
  const pct = SV_ZOOM_STEPS[_svZoom];
  const stage = $('#svStage');
  const base = Math.min(900, stage.clientWidth - 28);
  $('#svPaper').style.width = Math.round(base * pct / 100) + 'px';
  $('#svZoomPct').textContent = pct + '٪';
  $('#svZoomOut').disabled = _svZoom === 0;
  $('#svZoomIn').disabled = _svZoom === SV_ZOOM_STEPS.length - 1;
}
function svZoom(d) {
  _svZoom = Math.min(SV_ZOOM_STEPS.length - 1, Math.max(0, _svZoom + d));
  svZoomApply();
}

function openSheet(id) {
  const w = SB.data.worksheets.find(x => x.id === id); if (!w) return;
  const el = ensureSheetViewer();
  _svSheet = w; _svZoom = 0;
  $('#svTitle').textContent = `ورقة ${w.n} · ${w.title}`;
  const img = $('#svImg');
  img.alt = `ورقة عمل ${w.n} — ${w.title}`;
  img.src = w.full;
  el.classList.add('open');
  _svY = window.scrollY;
  document.documentElement.classList.add('no-scroll');
  document.body.style.position = 'fixed';
  document.body.style.top = (-_svY) + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  requestAnimationFrame(svZoomApply);
}

function closeSheet() {
  if (!_sv) return;
  _sv.classList.remove('open');
  document.documentElement.classList.remove('no-scroll');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  const y = _svY;
  const restore = () => { window.scrollTo(0, y); window.scrollTo({ top: y, behavior: 'instant' }); };
  restore();
  requestAnimationFrame(restore);
  setTimeout(restore, 60);
  _svSheet = null;
}

/* clean A4 portrait print — worksheet only, no site UI (isolated hidden document) */
let _svPrintFrame = null;
function printSheet(id) {
  const w = SB.data.worksheets.find(x => x.id === id); if (!w) return;
  if (_svPrintFrame) _svPrintFrame.remove();
  const src = new URL(w.full, location.href).href;
  const f = document.createElement('iframe');
  f.style.cssText = 'position:fixed;width:0;height:0;border:0;inset-inline-end:0;bottom:0;visibility:hidden';
  f.setAttribute('aria-hidden', 'true');
  document.body.appendChild(f);
  _svPrintFrame = f;
  f.srcdoc = `<!doctype html><html dir="ltr"><head><meta charset="utf-8"><title>ورقة عمل ${w.n} — ${w.tag}</title>
<style>
@page{size:A4 portrait;margin:0}
html,body{margin:0;padding:0;background:#fff}
img{display:block;width:210mm;height:297mm;object-fit:contain;page-break-inside:avoid}
</style></head><body><img id="p" src="${src}" alt=""></body></html>`;
  f.addEventListener('load', () => {
    const win = f.contentWindow;
    const im = f.contentDocument.getElementById('p');
    let tries = 0;
    const go = () => {
      if (im.complete && im.naturalWidth > 0) {
        try {
          win.focus();
          win.print();
        } catch (err) { /* print unsupported in this host — frame stays harmless */ }
        try { window.focus(); } catch (err) { /* noop */ }
        setTimeout(() => { f.remove(); if (_svPrintFrame === f) _svPrintFrame = null; }, 30000);
      } else if (++tries < 50) {
        setTimeout(go, 100);
      } else { f.remove(); if (_svPrintFrame === f) _svPrintFrame = null; }
    };
    go();
  });
}

/* ====================== assessment stations (محطات التقييم) ====================== */
let _sq = null, _sqSt = null, _sqQ = 0, _sqRight = 0, _sqY = 0;

function ensureStation() {
  if (_sq) return _sq;
  const el = document.createElement('div');
  el.id = 'stationQuiz';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.innerHTML = `
    <div class="br-bar">
      <button type="button" class="gp-back br-close" id="sqClose">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10l14 14-14 14"/></svg>
        <span>عودة إلى المحطات</span>
      </button>
      <span class="gp-title" id="sqTitle"></span>
      <span class="sq-stage-pill" id="sqStagePill"></span>
    </div>
    <div class="br-stage" id="sqStage"></div>`;
  document.body.appendChild(el);
  $('#sqClose', el).addEventListener('click', () => closeStation());
  window.addEventListener('keydown', e => {
    if (!_sq || !_sq.classList.contains('open')) return;
    if (e.key === 'Escape') closeStation();
  });
  _sq = el;
  return el;
}

function openStation(id) {
  const st = SB.stations.find(x => x.id === id); if (!st) return;
  const el = ensureStation();
  _sqSt = st; _sqQ = 0; _sqRight = 0;
  $('#sqTitle').textContent = `${st.name} · `;
  $('#sqTitle').innerHTML = `${st.name} <span class="sq-title-en" lang="en" dir="ltr">${st.en}</span>`;
  $('#sqStagePill').textContent = `المحطة ${st.n} من ٣`;
  el.classList.add('open');
  _sqY = window.scrollY;
  document.documentElement.classList.add('no-scroll');
  document.body.style.position = 'fixed';
  document.body.style.top = (-_sqY) + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  sqRenderQ();
}

function closeStation(skipRestore) {
  if (!_sq) return;
  _sq.classList.remove('open');
  document.documentElement.classList.remove('no-scroll');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  const y = _sqY;
  if (!skipRestore) {
    const restore = () => { window.scrollTo(0, y); window.scrollTo({ top: y, behavior: 'instant' }); };
    restore();
    requestAnimationFrame(restore);
    setTimeout(restore, 60);
  }
  _sqSt = null;
}

function sqRenderQ() {
  const st = _sqSt, q = st.qs[_sqQ], n = st.qs.length, i = _sqQ;
  const typeName = q.t === 'tf' ? 'True or False' : 'Multiple Choice';
  const opts = q.t === 'tf' ? ['True', 'False'] : q.o;
  const correctIdx = q.t === 'tf' ? (q.a ? 0 : 1) : q.a;
  $('#sqStage').innerHTML = `
    <div class="qwrap">
      <div class="q-head">
        <span class="q-count" lang="en" dir="ltr">Question ${i + 1} of ${n}</span>
        <span class="q-badge" lang="en">${typeName}</span>
      </div>
      <div class="brb-reading-progress q-progress" aria-hidden="true">
        <span style="width:${(i / n) * 100}%"></span>
      </div>
      <div class="q-card">
        <p class="q-text" lang="en" dir="ltr">${q.q}</p>
        <div class="q-opts">
          ${opts.map((o, k) => `<button type="button" class="q-opt${q.t === 'tf' ? ' tf' : ''}" data-k="${k}" lang="en" dir="ltr">${o}</button>`).join('')}
        </div>
      </div>
    </div>`;
  $$('#sqStage .q-opt').forEach(btn => btn.addEventListener('click', () => {
    if (btn.classList.contains('picked')) return;
    const k = +btn.dataset.k;
    $$('#sqStage .q-opt').forEach(x => {
      if (+x.dataset.k === correctIdx) x.classList.add('ok');
      x.disabled = true;
    });
    btn.classList.add('picked');
    if (k === correctIdx) { _sqRight++; btn.classList.add('ok'); }
    else { btn.classList.add('no'); }
    const pause = matchMedia('(prefers-reduced-motion: reduce)').matches ? 350 : 900;
    setTimeout(() => {
      _sqQ++;
      if (_sqQ < st.qs.length) sqRenderQ();
      else {
        const bar = $('#sqStage .q-progress > span'); if (bar) bar.style.width = '100%';
        sqRenderResult();
      }
    }, pause);
  }));
}

function sqRenderResult() {
  const st = _sqSt, n = st.qs.length;
  const pct = Math.round((_sqRight / n) * 100);
  const passed = pct >= 80;
  const stars = pct >= 80 ? 3 : pct >= 60 ? 2 : pct > 0 ? 1 : 0;
  const name = SB.pass ? SB.pass.name : 'بطلة جسر المدارس';
  SB.grantStars(st.id, stars);
  SB.progress.scores = SB.progress.scores || {};
  SB.progress.scores[st.id] = Math.max(SB.progress.scores[st.id] || 0, pct);
  SB.saveProgress();
  if (passed) SB.issueCertificate({ key:st.id, title:`${st.name} · ${st.en}`, en:'Assessment Station', score:pct });
  RENDER.stations();
  refreshAchievementsUI();
  if (passed) {
    RENDER.badges();
    confettiBurst();
  }
  $('#sqStage').innerHTML = `
    <div class="res-card">
      <div class="res-ring" role="img" aria-label="Your score: ${pct} percent">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" class="res-track"/>
          <circle cx="60" cy="60" r="52" class="res-fill${passed ? ' pass' : ''}" style="stroke-dasharray:327;stroke-dashoffset:${327 * (1 - _sqRight / n)}"/>
        </svg>
        <b>${pct}<small>%</small></b>
      </div>
      <span class="res-stars" role="img" aria-label="You earned ${stars} stars">
        ${[0, 1, 2].map(k => `<span class="dst xl${k < stars ? ' on' : ''}">${STAR_SVG}</span>`).join('')}
      </span>
      <b class="sq-who">${name}</b>
      <span class="sq-station-name">${st.name} · <span lang="en" dir="ltr">${st.en}</span></span>
      <b class="res-title" lang="en">${passed ? 'Well done, star!' : 'Good try!'}</b>
      <p class="res-sub">${passed
        ? `أجبتِ على ${_sqRight} من ${n} إجابة صحيحة — عبرتِ المحطة بجدارة، والجسر تحت قدميكِ أقرب إلى الشهادة`
        : `أجبتِ على ${_sqRight} من ${n} إجابة صحيحة — راجعي الألعاب والقصص ثم عودي، أنتِ أقرب مما تظنين`}</p>
      <div class="res-actions">
        ${passed ? `<button type="button" class="btn btn-play ripple" id="sqCert">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="19" r="10"/><path d="M18 27l-5 13 11-6 11 6-5-13"/></svg>
          <span class="cta-stack"><span>احصلي على الشهادة</span><small class="cta-en" lang="en">GET YOUR CERTIFICATE</small></span>
        </button>` : `<button type="button" class="btn btn-play ripple" id="sqRetry">
          ${ICONS.play}<span>أعيدي المحاولة</span>
        </button>`}
        ${passed ? `<button type="button" class="btn btn-ghost ripple br-secondary" id="sqRetry">
          ${ICONS.play}<span>أعيدي المحاولة</span>
        </button>` : ''}
        <button type="button" class="brb-nav br-secondary-btn" id="sqExit" lang="en"><span>Back to the Stations</span></button>
      </div>
    </div>`;
  if (passed) $('#sqCert').addEventListener('click', () => {
    closeStation(true);
    const ach = $('#certCard') || document.getElementById('achievements');
    if (ach) ach.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      if (ach) { ach.classList.add('attn'); setTimeout(() => ach.classList.remove('attn'), 2600); }
      toast('شهادتك جاهزة في لوحة الإنجاز — اطبعيها من هناك');
    }, 800);
  });
  $('#sqRetry').addEventListener('click', () => { _sqQ = 0; _sqRight = 0; sqRenderQ(); });
  $('#sqExit').addEventListener('click', () => closeStation());
}

/* ====================== certificate system (نظام الشهادة) ====================== */

function renderCert() {
  const card = $('#certCard'); if (!card) return;
  const has = !!SB.pass;
  const award = SB.cert.awards.find(a => a.key === SB.cert.current)
    || SB.cert.awards[SB.cert.awards.length - 1] || null;
  const ready = has && !!award;
  const name = has ? SB.pass.name : 'ـــــــــــــــــــــــــــــــــــــــــــ';
  const school = has ? SB.pass.school : '';
  const activity = award ? award.title : 'أنشطة جسر المدارس التعليمية';
  const score = award ? award.score : 80;

  card.innerHTML = `
    <div class="crt-paper" lang="ar" dir="rtl">
      <span class="crt-corner c1" aria-hidden="true">${CERT_CORNER}</span>
      <span class="crt-corner c2" aria-hidden="true">${CERT_CORNER}</span>
      <span class="crt-corner c3" aria-hidden="true">${CERT_CORNER}</span>
      <span class="crt-corner c4" aria-hidden="true">${CERT_CORNER}</span>

      <div class="crt-head">
        <img class="crt-bridge" src="assets/bridge-cut.png" alt="جسر جسر المدارس الساتيني" loading="lazy" decoding="async">
        <div class="crt-brand">
          <b>جسر المدارس</b>
          <span>جسر يربط المعرفة بين المدارس ويحوّل التعلّم المشترك إلى تجربة ممتعة</span>
        </div>
        <span class="crt-emblem" aria-hidden="true">${ICONS.medal}</span>
      </div>
      <span class="crt-hair" aria-hidden="true"></span>

      <div class="crt-kind">
        <b>شهادة إنجاز</b>
        <span lang="en" dir="ltr">CERTIFICATE OF ACHIEVEMENT</span>
      </div>

      <p class="crt-give">
        <span class="crt-ar">تُمنح هذه الشهادة للطالبة:</span>
        <span class="crt-en" lang="en" dir="ltr">This certificate is proudly presented to:</span>
      </p>

      <div class="crt-name" id="certName">${name}</div>
      ${school ? `<div class="crt-school">من مدرسة <b id="certSchool">${school}</b></div>` : `<div class="crt-school" id="certSchool" hidden></div>`}

      <p class="crt-for">
        <span class="crt-ar">لاجتيازها بنجاح:</span>
        <span class="crt-en" lang="en" dir="ltr">For successfully completing:</span>
      </p>
      <div class="crt-act" id="certActivity">${activity}</div>

      <div class="crt-seal" id="certScore" role="img" aria-label="Score ${score} percent">
        <span class="crt-seal-ring" aria-hidden="true"></span>
        <b>${score}<small>٪</small></b>
        <span class="crt-seal-lbl">النتيجة · <span lang="en" dir="ltr">Score</span></span>
      </div>

      <div class="crt-foot">
        <span class="crt-hair s2" aria-hidden="true"></span>
        <p class="crt-partner">شراكة تعليمية بين <b>أ/ فاطمه العنزي</b> × <b>أ/ مريم المطيري</b></p>
      </div>
    </div>

    <div class="cert-lock" id="certLock" ${ready ? 'hidden' : ''}>
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="11" y="21" width="26" height="19" rx="5"/><path d="M17 21v-4a7 7 0 0114 0v4"/></svg>
      <p>${has ? 'أكملي نشاطًا بنسبة 80% أو أكثر لتحصلي على شهادتك' : 'عبّئي بطاقة العبور لتُجهَّز شهادتك باسمك'}</p>
      ${has ? '' : '<a class="btn btn-primary ripple" href="#gateway"><span>إلى بطاقة العبور</span></a>'}
    </div>`;

  const aw = $('#certAwards');
  if (aw) {
    aw.innerHTML = SB.cert.awards.length > 1
      ? `<span class="cert-aw-label">شهاداتك:</span>` + SB.cert.awards.map(a =>
          `<button type="button" class="cert-chip${a.key === (award && award.key) ? ' on' : ''}" data-cert="${a.key}">${a.title} · ${a.score}٪</button>`).join('')
      : '';
    if (!aw.dataset.bound) {
      aw.dataset.bound = '1';
      aw.addEventListener('click', e => {
        const c = e.target.closest('[data-cert]');
        if (!c) return;
        SB.useCertificate(c.dataset.cert);
        renderCert();
        const cc = $('#certCard');
        cc.classList.add('attn');
        setTimeout(() => cc.classList.remove('attn'), 1500);
        cc.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }
}

/* ====================== achievements journal (دفتر إنجازي) ====================== */
function refreshAchievementsUI() {
  refreshProgress();
  renderAchJournal();
}

function renderAchJournal() {
  /* ---------- student passport strip (from Bridge Gateway — never re-asked) ---------- */
  const passEl = $('#jrPass');
  if (passEl) {
    if (SB.pass) {
      const initial = (SB.pass.name || '').trim().charAt(0) || '؟';
      let today = '';
      try {
        today = new Intl.DateTimeFormat('ar', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
      } catch { today = ''; }
      passEl.innerHTML = `
        <span class="jrp-medal" aria-hidden="true">${initial}</span>
        <div class="jrp-copy">
          <span class="jrp-label">دفتر إنجاز الطالبة</span>
          <b class="jrp-name">${SB.pass.name}</b>
          <span class="jrp-school">${SB.pass.school ? 'مدرسة ' + SB.pass.school : ''}</span>
        </div>
        <span class="jrp-date">${today}</span>`;
    } else {
      passEl.innerHTML = `
        <span class="jrp-medal soft" aria-hidden="true">${ICONS.ticket}</span>
        <div class="jrp-copy">
          <span class="jrp-label">دفترك بانتظار اسمك</span>
          <b class="jrp-name">عبّئي بطاقة العبور لتوشّح سجلّات دفترك باسمك ومدرستك</b>
        </div>
        <a class="btn btn-ghost ripple jrp-cta" href="#gateway"><span>بطاقة العبور</span></a>`;
    }
  }

  /* ---------- assessment stations record ---------- */
  const host = $('#jrStations');
  if (!host) return;
  const scores = SB.progress.scores || {};
  host.innerHTML = SB.stations.map(st => {
    const score = scores[st.id] || 0;
    const passed = score >= 80;
    const tried = score > 0;
    const certAward = SB.cert.awards.find(a => a.key === st.id);
    const status = passed
      ? '<span class="jrs-chip ok">مكتملة</span>'
      : (tried ? '<span class="jrs-chip try">محاولة طيبة</span>'
               : '<span class="jrs-chip wait">لم تُكمل بعد</span>');
    const pctW = Math.min(100, score);
    return `
    <article class="jrs-row ${passed ? 'is-passed' : ''}" data-id="${st.id}">
      <span class="jrs-num">${st.n}</span>
      <div class="jrs-copy">
        <div class="jrs-names">
          <b>${st.name}</b>
          <span lang="en" dir="ltr">${st.en}</span>
        </div>
        <div class="jrs-meta">
          ${tried
            ? `<span class="jrs-bar" role="img" aria-label="أفضل نتيجة ${score}٪"><i style="width:${pctW}%"></i><em>${score}٪</em></span>`
            : '<span class="jrs-none">بانتظار أول عبور</span>'}
          ${status}
        </div>
      </div>
      <div class="jrs-side">
        ${passed && certAward
          ? `<button type="button" class="jrs-cert" data-ach-cert="${st.id}">
               ${ICONS.medal}<span>الشهادة مُحرزة</span>
             </button>
             <span class="jrs-cert-hint">اضغطي لعرض شهادتك</span>`
          : `<a class="jrs-start" href="#assessment">
               ${ICONS.play}<span>${tried ? 'أعيدي المحاولة' : 'ابدئي المحطة'}</span>
             </a>
             <span class="jrs-cert-hint">${tried ? 'تحتاجين 80٪ للشهادة' : 'الشهادة بانتظارك عند 80٪'}</span>`}
      </div>
    </article>`;
  }).join('');
  if (!host.dataset.bound) {
    host.dataset.bound = '1';
    host.addEventListener('click', e => {
      const c = e.target.closest('[data-ach-cert]');
      if (!c) return;
      SB.useCertificate(c.dataset.achCert);
      renderCert();
      const cc = $('#certCard');
      if (cc) cc.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        if (cc) { cc.classList.add('attn'); setTimeout(() => cc.classList.remove('attn'), 2600); }
        toast('هذه شهادتك لهذه المحطة — اطبعيها من هنا');
      }, 900);
    });
  }
}
