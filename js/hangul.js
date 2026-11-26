/* Hangul-Hilfsfunktionen: Silben zerlegen/zusammensetzen, Batchim, Partikel */
(function (g) {
  'use strict';
  const BASE = 0xAC00;
  const V = { A: 0, AE: 1, YA: 2, YAE: 3, EO: 4, E: 5, YEO: 6, YE: 7, O: 8, WA: 9, WAE: 10, OE: 11, YO: 12, U: 13, WO: 14, WE: 15, WI: 16, YU: 17, EU: 18, UI: 19, I: 20 };
  const T = { NONE: 0, G: 1, N: 4, D: 7, L: 8, M: 16, B: 17, S: 19, SS: 20, NG: 21, H: 27 };
  // Kompatibilitäts-Jamo -> Final-Index (für Endungen wie 'ㄹ 거예요')
  const JAMO_FINAL = { 'ㄴ': 4, 'ㄹ': 8, 'ㅁ': 16, 'ㅂ': 17, 'ㅆ': 20 };

  function isSyl(ch) {
    if (!ch) return false;
    const c = ch.charCodeAt(0);
    return c >= 0xAC00 && c <= 0xD7A3;
  }
  function dec(ch) {
    const c = ch.charCodeAt(0) - BASE;
    return { l: Math.floor(c / 588), v: Math.floor((c % 588) / 28), t: c % 28 };
  }
  function comp(l, v, t) {
    return String.fromCharCode(BASE + l * 588 + v * 28 + (t || 0));
  }
  function lastSyllable(word) {
    for (let i = word.length - 1; i >= 0; i--) {
      if (isSyl(word[i])) return word[i];
      if (/[0-9]/.test(word[i])) return word[i];
      if (/[a-zA-Z]/.test(word[i])) return null;
    }
    return null;
  }
  // Ziffern: wie werden sie sinokoreanisch gelesen?  0 영, 1 일, 2 이, 3 삼, 4 사, 5 오, 6 육, 7 칠, 8 팔, 9 구
  const DIGIT_FINAL = { '0': T.NG, '1': T.L, '2': 0, '3': T.M, '4': 0, '5': 0, '6': T.G, '7': T.L, '8': T.L, '9': 0 };
  function finalOf(word) {
    const s = lastSyllable(String(word).replace(/\(.*?\)/g, '').trim());
    if (!s) return 0;
    if (/[0-9]/.test(s)) return DIGIT_FINAL[s];
    return dec(s).t;
  }
  function hasBatchim(word) { return finalOf(word) !== 0; }

  const PARTICLES = {
    topic: { label: 'Thema (은/는)', forms: ['은', '는'] },
    subj: { label: 'Subjekt (이/가)', forms: ['이', '가'] },
    obj: { label: 'Objekt (을/를)', forms: ['을', '를'] },
    and: { label: 'und (과/와)', forms: ['과', '와'] },
    with: { label: 'mit/und (이랑/랑)', forms: ['이랑', '랑'] },
    dir: { label: 'Richtung/Mittel ((으)로)', forms: ['으로', '로'] },
    be: { label: 'sein (이에요/예요)', forms: ['이에요', '예요'] },
    notbe: { label: 'nicht sein (이/가 아니에요)', forms: ['이 아니에요', '가 아니에요'] }
  };
  function particle(noun, type) {
    const p = PARTICLES[type];
    const f = finalOf(noun);
    let form;
    if (type === 'dir') form = (f !== 0 && f !== T.L) ? '으로' : '로';
    else form = f !== 0 ? p.forms[0] : p.forms[1];
    if (type === 'notbe') return noun + form;
    return noun + form;
  }
  function wrongParticle(noun, type) {
    const p = PARTICLES[type];
    const right = particle(noun, type).slice(noun.length);
    const other = p.forms.find(x => x !== right);
    return noun + other;
  }

  g.Hangul = { V, T, JAMO_FINAL, isSyl, dec, comp, lastSyllable, finalOf, hasBatchim, PARTICLES, particle, wrongParticle };
})(typeof window !== 'undefined' ? window : globalThis);
