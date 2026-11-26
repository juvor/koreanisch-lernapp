/* Hangul-Bildschirmtastatur (2-Beolsik) mit Silbenbildung
   + optional: Laptop-Tastatur tippt in koreanischen Feldern direkt Hangul */
(function (g) {
  'use strict';
  const H = g.Hangul;
  const INIT = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const VOW = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const FIN = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const VCOMB = { 'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ', 'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ', 'ㅡㅣ': 'ㅢ' };
  const FCOMB = { 'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ', 'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ' };
  const invert = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, [...k]]));
  const VSPLIT = invert(VCOMB), FSPLIT = invert(FCOMB);
  const isVowel = j => VOW.includes(j);

  /* Ein Jamo an das letzte Zeichen anfügen → Ersatztext für dieses Zeichen */
  function addJamo(prev, j) {
    if (!prev) return j;
    if (H.isSyl(prev)) {
      const d = H.dec(prev), V = VOW[d.v], T = FIN[d.t];
      if (!isVowel(j)) {
        if (!T) { const ti = FIN.indexOf(j); return ti > 0 ? H.comp(d.l, d.v, ti) : prev + j; }
        const c = FCOMB[T + j];
        return c ? H.comp(d.l, d.v, FIN.indexOf(c)) : prev + j;
      }
      if (!T) { const c = VCOMB[V + j]; return c ? H.comp(d.l, VOW.indexOf(c), 0) : prev + j; }
      // Vokal nach Schlusskonsonant: Konsonant wandert in die neue Silbe (갑 + ㅏ → 가바)
      let keep = '', move = T;
      if (FSPLIT[T]) [keep, move] = FSPLIT[T];
      const li = INIT.indexOf(move);
      if (li < 0) return prev + j;
      return H.comp(d.l, d.v, keep ? FIN.indexOf(keep) : 0) + H.comp(li, VOW.indexOf(j), 0);
    }
    if (INIT.includes(prev) && isVowel(j)) return H.comp(INIT.indexOf(prev), VOW.indexOf(j), 0);
    if (isVowel(prev) && VCOMB[prev + j]) return VCOMB[prev + j];
    return prev + j;
  }
  /* Rücktaste innerhalb einer Silbe: 한 → 하 → ㅎ → '' */
  function backJamo(prev) {
    if (H.isSyl(prev)) {
      const d = H.dec(prev), T = FIN[d.t], V = VOW[d.v];
      if (T) return H.comp(d.l, d.v, FSPLIT[T] ? FIN.indexOf(FSPLIT[T][0]) : 0);
      if (VSPLIT[V]) return H.comp(d.l, VOW.indexOf(VSPLIT[V][0]), 0);
      return INIT[d.l];
    }
    if (VSPLIT[prev]) return VSPLIT[prev][0];
    return '';
  }
  // Zum Testen: ganze Jamo-Folge zusammensetzen
  function composeAll(jamos) { let s = ''; for (const j of jamos) s = s.slice(0, -1) + addJamo(s.slice(-1), j); return s; }

  /* ───────── Eingabe in ein Feld ───────── */
  let comp = null;     // { el, pos } – aktuelle Silbe wird noch zusammengesetzt
  let target = null;   // zuletzt fokussiertes koreanisches Feld
  const isKoField = el => el && el.tagName === 'INPUT' && el.classList.contains('ko-input') && !el.disabled;

  function setVal(el, val, caret) {
    el.value = val;
    try { el.setSelectionRange(caret, caret); } catch (e) { /* ignorieren */ }
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  function insertJamo(el, j) {
    const s = el.selectionStart == null ? el.value.length : el.selectionStart;
    const e = el.selectionEnd == null ? s : el.selectionEnd;
    const v = el.value;
    if (comp && comp.el === el && comp.pos === s && s === e && s > 0) {
      const rep = addJamo(v[s - 1], j);
      setVal(el, v.slice(0, s - 1) + rep + v.slice(e), s - 1 + rep.length);
      comp = { el, pos: s - 1 + rep.length };
    } else {
      setVal(el, v.slice(0, s) + j + v.slice(e), s + 1);
      comp = { el, pos: s + 1 };
    }
  }
  function insertText(el, t) {
    const s = el.selectionStart == null ? el.value.length : el.selectionStart;
    const e = el.selectionEnd == null ? s : el.selectionEnd;
    setVal(el, el.value.slice(0, s) + t + el.value.slice(e), s + t.length);
    comp = null;
  }
  function backspace(el) {
    const s = el.selectionStart == null ? el.value.length : el.selectionStart;
    const e = el.selectionEnd == null ? s : el.selectionEnd;
    const v = el.value;
    if (s !== e) { setVal(el, v.slice(0, s) + v.slice(e), s); comp = null; return; }
    if (s === 0) return;
    if (comp && comp.el === el && comp.pos === s) {
      const rep = backJamo(v[s - 1]);
      setVal(el, v.slice(0, s - 1) + rep + v.slice(s), s - 1 + rep.length);
      comp = rep ? { el, pos: s - 1 + rep.length } : null;
    } else { setVal(el, v.slice(0, s - 1) + v.slice(s), s - 1); comp = null; }
  }

  /* ───────── Physische Tastatur → Hangul (2-Beolsik, nach Tastenposition) ───────── */
  const CODE = {
    KeyQ: 'ㅂ', KeyW: 'ㅈ', KeyE: 'ㄷ', KeyR: 'ㄱ', KeyT: 'ㅅ', KeyY: 'ㅛ', KeyU: 'ㅕ', KeyI: 'ㅑ', KeyO: 'ㅐ', KeyP: 'ㅔ',
    KeyA: 'ㅁ', KeyS: 'ㄴ', KeyD: 'ㅇ', KeyF: 'ㄹ', KeyG: 'ㅎ', KeyH: 'ㅗ', KeyJ: 'ㅓ', KeyK: 'ㅏ', KeyL: 'ㅣ',
    KeyZ: 'ㅋ', KeyX: 'ㅌ', KeyC: 'ㅊ', KeyV: 'ㅍ', KeyB: 'ㅠ', KeyN: 'ㅜ', KeyM: 'ㅡ'
  };
  const SHIFT = { 'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㄱ': 'ㄲ', 'ㅅ': 'ㅆ', 'ㅐ': 'ㅒ', 'ㅔ': 'ㅖ' };
  // Beschriftung auf deutscher QWERTZ-Tastatur (Y und Z sind vertauscht)
  const DE_LABEL = Object.fromEntries(Object.keys(CODE).map(c => [c, c === 'KeyY' ? 'Z' : c === 'KeyZ' ? 'Y' : c.slice(3)]));
  const settings = () => (g.Core && g.Core.Store.state && g.Core.Store.state.settings.kbd) || { physical: true, auto: false };

  document.addEventListener('keydown', e => {
    const el = e.target;
    if (!isKoField(el) || e.ctrlKey || e.metaKey || e.altKey || e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Backspace' && comp && comp.el === el) { e.preventDefault(); backspace(el); return; }
    if (!settings().physical) return;
    const j = CODE[e.code];
    if (j) { e.preventDefault(); insertJamo(el, e.shiftKey && SHIFT[j] ? SHIFT[j] : j); return; }
    if (e.key === ' ' || e.key.length === 1 || e.key.startsWith('Arrow') || e.key === 'Home' || e.key === 'End') comp = null;
  }, true);
  document.addEventListener('pointerdown', e => { if (!e.target.closest('#osk')) comp = null; }, true);
  document.addEventListener('focusin', e => {
    if (isKoField(e.target)) {
      target = e.target;
      if (open) e.target.setAttribute('inputmode', 'none');
      else if (settings().auto) show(true);
    }
  });

  /* ───────── Bildschirmtastatur ───────── */
  const ROWS = [
    ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'],
    ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'],
    ['shift', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'back']
  ];
  let open = false, shift = false, panel = null, btn = null;

  function findTarget() {
    if (isKoField(target) && document.body.contains(target)) return target;
    const el = [...document.querySelectorAll('input.ko-input')].find(x => !x.disabled && x.offsetParent);
    return el || null;
  }
  function render() {
    const key = c => {
      if (c === 'shift') return `<button class="k k-wide ${shift ? 'on' : ''}" data-k="shift" title="Doppelkonsonanten ㄲ ㄸ ㅃ ㅆ ㅉ, ㅒ ㅖ">⇧</button>`;
      if (c === 'back') return `<button class="k k-wide" data-k="back" title="Löschen">⌫</button>`;
      const j = shift && SHIFT[CODE[c]] ? SHIFT[CODE[c]] : CODE[c];
      return `<button class="k ${isVowel(j) ? 'v' : ''}" data-k="${j}"><span>${j}</span><small>${DE_LABEL[c]}</small></button>`;
    };
    panel.innerHTML = ROWS.map(r => `<div class="k-row">${r.map(key).join('')}</div>`).join('') +
      `<div class="k-row"><button class="k k-wide" data-k="hide" title="Tastatur ausblenden">✕</button><button class="k" data-k="?">?</button>
       <button class="k k-space" data-k=" ">Leertaste</button><button class="k" data-k=".">.</button><button class="k k-wide k-enter" data-k="enter">⏎</button></div>`;
  }
  function press(k) {
    if (k === 'hide') return show(false);
    if (k === 'shift') { shift = !shift; render(); return; }
    const el = findTarget();
    if (!el) { g.UI && g.UI.toast('Kein koreanisches Eingabefeld auf dieser Seite.'); return; }
    if (k === 'enter') {
      comp = null;
      if (g.UI && g.UI.onEnter) g.UI.onEnter();
      else el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      return;
    }
    if (k === 'back') backspace(el);
    else if (k.length === 1 && (isVowel(k) || INIT.includes(k))) insertJamo(el, k);
    else insertText(el, k);
    if (shift && k !== 'back') { shift = false; render(); }
  }
  function show(on) {
    open = on;
    panel.classList.toggle('open', on);
    document.body.classList.toggle('osk-open', on);
    btn.classList.toggle('on', on);
    document.querySelectorAll('input.ko-input').forEach(i => on ? i.setAttribute('inputmode', 'none') : i.removeAttribute('inputmode'));
    if (on) { const el = findTarget(); if (el && document.activeElement !== el) el.focus({ preventScroll: true }); }
  }
  function init() {
    if (!document.getElementById('main')) return; // z. B. Testseite
    panel = document.createElement('div'); panel.id = 'osk'; render();
    btn = document.createElement('button'); btn.id = 'osk-btn'; btn.title = 'Koreanische Bildschirmtastatur'; btn.innerHTML = '⌨️<span class="ko">한</span>';
    document.body.append(panel, btn);
    // pointerdown verhindert, dass das Eingabefeld den Fokus verliert
    panel.addEventListener('pointerdown', e => { const b = e.target.closest('[data-k]'); e.preventDefault(); if (b) press(b.dataset.k); });
    btn.addEventListener('pointerdown', e => e.preventDefault());
    btn.addEventListener('click', () => show(!open));
    // neue Eingabefelder (nach Seitenwechsel) ebenfalls ohne System-Tastatur, wenn offen
    new MutationObserver(() => { if (open) document.querySelectorAll('input.ko-input:not([inputmode])').forEach(i => i.setAttribute('inputmode', 'none')); })
      .observe(document.getElementById('main'), { childList: true, subtree: true });
  }
  document.addEventListener('DOMContentLoaded', init);

  g.Keyboard = { addJamo, backJamo, composeAll, show: on => show(on), get open() { return open; } };
})(window);
