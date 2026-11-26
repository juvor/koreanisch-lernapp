/* Memory-Bildersets Koreanisch: [Bild (Emoji) oder Farbe, Koreanisch, Deutsch]. Format siehe js/memory.js. */
(function (g) {
  'use strict';
  const list = [
    { id: 'farben', icon: '🎨', title: 'Farben', topic: 'Farben & Beschreibung', pos: 'Nomen', items: [
      ['#e53935', '빨간색', 'Rot'], ['#fb8c00', '주황색', 'Orange'], ['#fdd835', '노란색', 'Gelb'], ['#43a047', '초록색', 'Grün'],
      ['#1e5bd8', '파란색', 'Blau'], ['#8e24aa', '보라색', 'Lila'], ['#f48fb1', '분홍색', 'Rosa'], ['#6d4c41', '갈색', 'Braun'],
      ['#111111', '검은색', 'Schwarz'], ['#ffffff', '흰색', 'Weiß'], ['#9e9e9e', '회색', 'Grau'], ['#81d4fa', '하늘색', 'Hellblau']] },
    { id: 'tiere', icon: '🐾', title: 'Tiere', topic: 'Natur & Tiere', pos: 'Nomen', items: [
      ['🐶', '개', 'Hund'], ['🐱', '고양이', 'Katze'], ['🐦', '새', 'Vogel'], ['🐟', '물고기', 'Fisch'], ['🐴', '말', 'Pferd'], ['🐄', '소', 'Kuh'],
      ['🐷', '돼지', 'Schwein'], ['🐔', '닭', 'Huhn'], ['🐰', '토끼', 'Hase'], ['🐻', '곰', 'Bär'], ['🐯', '호랑이', 'Tiger'], ['🐒', '원숭이', 'Affe'],
      ['🐘', '코끼리', 'Elefant'], ['🐍', '뱀', 'Schlange'], ['🐭', '쥐', 'Maus'], ['🐑', '양', 'Schaf']] },
    { id: 'wohnung', icon: '🛋️', title: 'Möbel & Wohnung', topic: 'Haushalt', pos: 'Nomen', items: [
      ['🛏️', '침대', 'Bett'], ['🪑', '의자', 'Stuhl'], ['🛋️', '소파', 'Sofa'], ['🚪', '문', 'Tür'], ['🪟', '창문', 'Fenster'], ['🪞', '거울', 'Spiegel'],
      ['🕰️', '시계', 'Uhr'], ['💡', '전등', 'Lampe'], ['🛁', '욕조', 'Badewanne'], ['🚽', '변기', 'Toilette (Becken)'], ['📺', '텔레비전', 'Fernseher'],
      ['🚿', '샤워기', 'Dusche (Brause)'], ['🔑', '열쇠', 'Schlüssel'], ['🧺', '바구니', 'Korb']] },
    { id: 'verkehr', icon: '🚦', title: 'Verkehrsmittel', topic: 'Unterwegs', pos: 'Nomen', items: [
      ['🚗', '자동차', 'Auto'], ['🚌', '버스', 'Bus'], ['🚕', '택시', 'Taxi'], ['🚇', '지하철', 'U-Bahn'], ['🚆', '기차', 'Zug'], ['✈️', '비행기', 'Flugzeug'],
      ['🚢', '배', 'Schiff'], ['🚲', '자전거', 'Fahrrad'], ['🏍️', '오토바이', 'Motorrad'], ['🚚', '트럭', 'Lastwagen'], ['🚑', '구급차', 'Krankenwagen'],
      ['🚒', '소방차', 'Feuerwehrauto'], ['🚓', '경찰차', 'Polizeiauto'], ['🚁', '헬리콥터', 'Hubschrauber']] },
    { id: 'obst', icon: '🍎', title: 'Obst & Gemüse', topic: 'Essen', pos: 'Nomen', items: [
      ['🍎', '사과', 'Apfel'], ['🍌', '바나나', 'Banane'], ['🍇', '포도', 'Weintraube'], ['🍓', '딸기', 'Erdbeere'], ['🍉', '수박', 'Wassermelone'],
      ['🍑', '복숭아', 'Pfirsich'], ['🍋', '레몬', 'Zitrone'], ['🍊', '귤', 'Mandarine'], ['🥕', '당근', 'Karotte'], ['🥔', '감자', 'Kartoffel'],
      ['🍅', '토마토', 'Tomate'], ['🌽', '옥수수', 'Mais'], ['🍄', '버섯', 'Pilz'], ['🧅', '양파', 'Zwiebel']] },
    { id: 'koerper', icon: '🧍', title: 'Körper', topic: 'Gesundheit', pos: 'Nomen', items: [
      ['👁️', '눈', 'Auge'], ['👃', '코', 'Nase'], ['👄', '입', 'Mund'], ['👂', '귀', 'Ohr'], ['✋', '손', 'Hand'], ['🦶', '발', 'Fuß'],
      ['🦵', '다리', 'Bein'], ['💪', '팔', 'Arm'], ['🦷', '이', 'Zahn'], ['🦴', '뼈', 'Knochen'], ['🫀', '심장', 'Herz'], ['👅', '혀', 'Zunge']] },
    { id: 'kleidung', icon: '👕', title: 'Kleidung', topic: 'Einkaufen', pos: 'Nomen', items: [
      ['👕', '티셔츠', 'T-Shirt'], ['👖', '바지', 'Hose'], ['👗', '원피스', 'Kleid'], ['👟', '운동화', 'Turnschuhe'], ['🧢', '모자', 'Mütze, Kappe'],
      ['🧦', '양말', 'Socken'], ['🧤', '장갑', 'Handschuhe'], ['🧣', '목도리', 'Schal'], ['🧥', '코트', 'Mantel'], ['👓', '안경', 'Brille'],
      ['👜', '가방', 'Tasche'], ['☂️', '우산', 'Regenschirm']] },
    { id: 'natur', icon: '🌤️', title: 'Natur & Wetter', topic: 'Wetter', pos: 'Nomen', items: [
      ['☀️', '해', 'Sonne'], ['🌙', '달', 'Mond'], ['⭐', '별', 'Stern'], ['☁️', '구름', 'Wolke'], ['🌧️', '비', 'Regen'], ['❄️', '눈', 'Schnee'],
      ['💨', '바람', 'Wind'], ['🌈', '무지개', 'Regenbogen'], ['⚡', '번개', 'Blitz'], ['⛰️', '산', 'Berg'], ['🌊', '바다', 'Meer'], ['🌳', '나무', 'Baum'], ['🌸', '꽃', 'Blume']] }
  ];
  g.MemorySets = { list };
})(typeof window !== 'undefined' ? window : globalThis);
