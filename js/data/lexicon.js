/* Eingebaute Wörter für die Trainer (Konjugation, Partikel).
   Eigene Vokabeln aus der App werden zusätzlich verwendet. */
(function (g) {
  'use strict';
  // [Wort, Deutsch, Typ V/A, Klasse, Extras]
  const V = [
    ['가다', 'gehen', 'V'], ['오다', 'kommen', 'V'], ['보다', 'sehen', 'V'], ['먹다', 'essen', 'V'],
    ['마시다', 'trinken', 'V'], ['자다', 'schlafen', 'V'], ['하다', 'machen', 'V'],
    ['공부하다', 'lernen (studieren)', 'V', '', { nounHa: true }], ['일하다', 'arbeiten', 'V', '', { nounHa: true }],
    ['운동하다', 'Sport machen', 'V', '', { nounHa: true }], ['요리하다', 'kochen', 'V', '', { nounHa: true }],
    ['청소하다', 'putzen', 'V', '', { nounHa: true }], ['전화하다', 'telefonieren', 'V', '', { nounHa: true }],
    ['좋아하다', 'mögen', 'V', '', { noAction: true }], ['읽다', 'lesen', 'V'], ['쓰다', 'schreiben', 'V'], ['배우다', 'lernen', 'V'],
    ['가르치다', 'unterrichten', 'V'], ['만나다', 'treffen', 'V'], ['사다', 'kaufen', 'V'],
    ['팔다', 'verkaufen', 'V'], ['살다', 'wohnen, leben', 'V'], ['만들다', 'herstellen, machen', 'V'],
    ['놀다', 'spielen, sich vergnügen', 'V'], ['알다', 'wissen, kennen', 'V', '', { noNeg: true, noAction: true }], ['열다', 'öffnen', 'V'],
    ['듣다', 'hören', 'V', 'ㄷ'], ['걷다', 'zu Fuß gehen', 'V', 'ㄷ'], ['묻다', 'fragen', 'V', 'ㄷ'],
    ['돕다', 'helfen', 'V', 'ㅂ'], ['눕다', 'sich hinlegen', 'V', 'ㅂ'], ['굽다', 'backen, grillen', 'V', 'ㅂ'],
    ['짓다', 'bauen', 'V', 'ㅅ'], ['낫다', 'gesund werden', 'V', 'ㅅ'], ['붓다', 'gießen; anschwellen', 'V', 'ㅅ'],
    ['모르다', 'nicht wissen', 'V', '르', { noNeg: true, noAction: true }], ['부르다', 'singen; rufen', 'V', '르'],
    ['고르다', 'auswählen', 'V', '르'], ['기다리다', 'warten', 'V'], ['주다', 'geben', 'V'], ['받다', 'bekommen', 'V'],
    ['앉다', 'sich setzen', 'V'], ['입다', 'anziehen', 'V'], ['씻다', 'waschen', 'V'], ['웃다', 'lachen', 'V'],
    ['닫다', 'schließen', 'V'], ['타다', 'fahren (mit)', 'V'], ['되다', 'werden', 'V', '', { noAction: true }], ['쉬다', 'sich ausruhen', 'V'],
    ['보내다', 'schicken', 'V'], ['일어나다', 'aufstehen', 'V'], ['찍다', 'fotografieren', 'V'], ['울다', 'weinen', 'V'],
    ['끄다', 'ausschalten', 'V'], ['늦다', 'spät kommen', 'V'], ['믿다', 'glauben', 'V'], ['넘어지다', 'hinfallen', 'V'], ['놓치다', 'verpassen', 'V'], ['켜다', 'einschalten', 'V'], ['서다', 'stehen', 'V'], ['내리다', 'aussteigen', 'V'],
    ['좋다', 'gut sein', 'A'], ['크다', 'groß sein', 'A'], ['작다', 'klein sein', 'A'], ['바쁘다', 'beschäftigt sein', 'A'],
    ['예쁘다', 'hübsch sein', 'A'], ['아프다', 'krank sein, wehtun', 'A'], ['배고프다', 'hungrig sein', 'A'],
    ['슬프다', 'traurig sein', 'A'], ['기쁘다', 'froh sein', 'A'],
    ['덥다', 'heiß sein', 'A', 'ㅂ'], ['춥다', 'kalt sein', 'A', 'ㅂ'], ['맵다', 'scharf sein', 'A', 'ㅂ'],
    ['어렵다', 'schwierig sein', 'A', 'ㅂ'], ['쉽다', 'leicht sein', 'A', 'ㅂ'], ['귀엽다', 'süß/niedlich sein', 'A', 'ㅂ'],
    ['가깝다', 'nah sein', 'A', 'ㅂ'], ['맛있다', 'lecker sein', 'A', '', { noNeg: true }],
    ['재미있다', 'interessant/lustig sein', 'A', '', { noNeg: true }], ['많다', 'viel sein', 'A'],
    ['비싸다', 'teuer sein', 'A'], ['싸다', 'billig sein', 'A'], ['멀다', 'weit (entfernt) sein', 'A'],
    ['길다', 'lang sein', 'A'], ['빠르다', 'schnell sein', 'A', '르'], ['다르다', 'anders sein', 'A', '르'],
    ['그렇다', 'so sein', 'A', 'ㅎ'], ['빨갛다', 'rot sein', 'A', 'ㅎ'], ['파랗다', 'blau sein', 'A', 'ㅎ'],
    ['하얗다', 'weiß sein', 'A', 'ㅎ'], ['어떻다', 'wie sein', 'A', 'ㅎ'], ['피곤하다', 'müde sein', 'A'],
    ['조용하다', 'ruhig sein', 'A'], ['따뜻하다', 'warm sein', 'A'], ['깨끗하다', 'sauber sein', 'A'],
    ['괜찮다', 'in Ordnung sein', 'A'], ['넓다', 'breit/geräumig sein', 'A']
  ];
  const verbs = V.map(([ko, de, type, cls, extra]) => Object.assign({ ko, de, type, cls: cls || '' }, extra || {}));

  const N = [
    ['학생', 'Schüler/Student'], ['의사', 'Arzt'], ['친구', 'Freund(in)'], ['커피', 'Kaffee'], ['물', 'Wasser'],
    ['책', 'Buch'], ['사과', 'Apfel'], ['빵', 'Brot'], ['가방', 'Tasche'], ['집', 'Haus, Zuhause'],
    ['학교', 'Schule'], ['회사', 'Firma'], ['사람', 'Mensch'], ['영화', 'Film'], ['음악', 'Musik'],
    ['시간', 'Zeit'], ['돈', 'Geld'], ['차', 'Auto; Tee'], ['우유', 'Milch'], ['고양이', 'Katze'],
    ['강아지', 'Hündchen'], ['선생님', 'Lehrer(in)'], ['한국어', 'Koreanisch'], ['이름', 'Name'],
    ['지하철', 'U-Bahn'], ['버스', 'Bus'], ['연필', 'Bleistift'], ['바다', 'Meer'], ['산', 'Berg'],
    ['서울', 'Seoul'], ['독일', 'Deutschland'], ['김치', 'Kimchi'], ['비', 'Regen'], ['눈', 'Schnee; Auge'],
    ['날씨', 'Wetter'], ['오늘', 'heute'], ['공원', 'Park'], ['카페', 'Café'], ['식당', 'Restaurant'],
    ['동생', 'jüngeres Geschwister'], ['엄마', 'Mama'], ['아빠', 'Papa'], ['우산', 'Regenschirm'],
    ['휴대폰', 'Handy'], ['컴퓨터', 'Computer'], ['노래', 'Lied'], ['비행기', 'Flugzeug'], ['기차', 'Zug'],
    ['밥', 'Reis, Mahlzeit'], ['고기', 'Fleisch'], ['옷', 'Kleidung'], ['병원', 'Krankenhaus'], ['약', 'Medizin']
  ];
  const nouns = N.map(([ko, de]) => ({ ko, de }));

  g.Lexicon = { verbs, nouns };
})(typeof window !== 'undefined' ? window : globalThis);
