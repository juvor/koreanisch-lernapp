/* UI-Bausteine: Audio-Knöpfe, Übungs-Runner, Übungstypen, Übungsgeneratoren */
(function (g) {
  'use strict';
  const { esc, shuffle, pick, TTS, Recorder, Check, Numbers, Store } = g.Core;

  const UI = {
    onEnter: null,
    main() { return document.getElementById('main'); },
    speakBtn(text, cls) { return `<button class="icon-btn ${cls || ''}" data-speak="${esc(text)}" title="Anhören">🔊</button>`; },
    audio(text) {
      let h = this.speakBtn(text);
      h += `<button class="icon-btn slow" data-speak-slow="${esc(text)}" title="Langsam anhören">🐢</button>`;
      if (Recorder.supported) h += `<button class="icon-btn" data-rec="${esc(text)}" title="Nachsprechen: Aufnahme starten/stoppen">🎙️</button><button class="icon-btn ${Recorder.has(text) ? '' : 'hidden'}" data-play="${esc(text)}" title="Erst Original, dann deine Aufnahme">🔁</button>`;
      return `<span class="audio">${h}</span>`;
    },
    koLine(text, big) { return `<div class="ko-line"><span class="ko ${big ? 'big' : ''}">${esc(text)}</span>${this.audio(text)}</div>`; },
    toast(msg) {
      const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
      document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
    },
    phaseBadge(p) { return `<span class="phase p${p}">${p === 0 ? 'neu' : 'Phase ' + p}</span>`; }
  };

  /* Globale Klick- und Tastenbehandlung */
  document.addEventListener('click', e => {
    const sp = e.target.closest('[data-speak]');
    if (sp) { TTS.speak(sp.dataset.speak); return; }
    const sl = e.target.closest('[data-speak-slow]');
    if (sl) { TTS.speak(sl.dataset.speakSlow, 0.55); return; }
    const rc = e.target.closest('[data-rec]');
    if (rc) {
      const key = rc.dataset.rec;
      Recorder.toggle(key, st => {
        rc.classList.toggle('recording', st === 'recording');
        if (st === 'stopped') {
          document.querySelectorAll('[data-play]').forEach(b => { if (b.dataset.play === key) b.classList.remove('hidden'); });
          playCompare(key);
        }
      });
      return;
    }
    const pl = e.target.closest('[data-play]');
    if (pl) { playCompare(pl.dataset.play); return; }
  });
  function playCompare(key) {
    const u = TTS.speak(key);
    if (u) u.onend = () => setTimeout(() => Recorder.play(key), 300);
    else Recorder.play(key);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229 && UI.onEnter) {
      if (e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      const fn = UI.onEnter; fn();
    }
  });

  /* ───────── Übungsgeneratoren ───────── */
  /* Eigene Verben/Adjektive für die Trainer. Steht das Wort im eingebauten Lexikon, werden dessen Angaben übernommen
     (Unregelmäßigkeit, noNeg = keine 안-Verneinung wie bei 알다/있다, noAction, nounHa = „공부 안 해요“). */
  function userVerbs() {
    const seen = new Set();
    return Store.state.vocab.filter(v => (v.pos === 'Verb' || v.pos === 'Adjektiv') && /다$/.test(v.ko.trim()) && !/\s/.test(v.ko.trim()))
      .map(v => {
        const ko = v.ko.trim(), type = v.pos === 'Adjektiv' ? 'A' : 'V';
        const lex = g.Lexicon.verbs.find(x => x.ko === ko);
        const explicit = v.cls !== undefined && v.cls !== null && v.cls !== 'auto';
        const cls = explicit ? v.cls : lex ? lex.cls : g.Conj.guessClass(ko);
        // Nomen + 하다 (설명하다, 운동하다 …) → „설명 안 해요“; nicht bei 좋아하다/싫어하다
        const nounHa = lex ? !!lex.nounHa : type === 'V' && ko.length >= 4 && /하다$/.test(ko) && !/[아어]하다$/.test(ko);
        return { ko, de: v.de, type, cls, nounHa, noNeg: !!(lex && lex.noNeg) || /[있없]다$/.test(ko), noAction: !!(lex && lex.noAction), user: true };
      })
      .filter(v => !seen.has(v.ko) && seen.add(v.ko));
  }
  function userNouns() {
    return Store.state.vocab.filter(v => v.pos === 'Nomen' && /^[가-힣]{1,6}$/.test(v.ko.trim())).map(v => ({ ko: v.ko.trim(), de: v.de }));
  }
  function verbPool(opts) {
    opts = opts || {};
    const mine = userVerbs(), mineKo = new Set(mine.map(v => v.ko));
    let pool = opts.source === 'mine' ? mine : opts.source === 'builtin' ? g.Lexicon.verbs.slice() : g.Lexicon.verbs.filter(v => !mineKo.has(v.ko)).concat(mine);
    if (!pool.length) pool = g.Lexicon.verbs.slice();
    if (opts.irregularOnly) pool = pool.filter(v => { const t = g.Conj.stemType(v.ko, v.cls); return t && t !== '하'; });
    return pool;
  }
  function conjEx(forms, opts) {
    for (let tries = 0; tries < 50; tries++) {
      const form = pick(forms); const F = g.Conj.FORMS[form];
      let pool = verbPool(opts);
      if (F.only) pool = pool.filter(v => (v.type || 'V') === F.only);
      if (F.action) pool = pool.filter(v => !v.noAction);
      if (F.noNeg) pool = pool.filter(v => !v.noNeg && !/[있없]다$/.test(v.ko));
      if (!pool.length) continue;
      const verb = pick(pool);
      return { type: 'conj', verb, form, answer: g.Conj.conjugate(verb, form) };
    }
    return null;
  }
  function particleEx(types) {
    const nouns = g.Lexicon.nouns.concat(userNouns());
    const noun = pick(nouns); const type = pick(types);
    const right = g.Hangul.particle(noun.ko, type), wrong = g.Hangul.wrongParticle(noun.ko, type);
    return { type: 'choice', q: `${noun.ko} + ${g.Hangul.PARTICLES[type].label}`, de: noun.de, options: shuffle([right, wrong]), answer: right, full: right, isParticle: true };
  }
  function numberEx(kinds) { return Object.assign({ type: 'number' }, Numbers.gen(kinds)); }
  function drillEx(drill) {
    if (!drill) return null;
    if (drill.kind === 'conj') return conjEx(drill.forms, { irregularOnly: drill.irregularOnly });
    if (drill.kind === 'particle') return particleEx(drill.types);
    if (drill.kind === 'numbers') return numberEx();
    return null;
  }
  function sentenceExercises(list, withOrder) {
    const pool = [];
    for (const [ko, de] of list) {
      pool.push({ type: 'ko2de', ko, de });
      pool.push({ type: 'de2ko', ko, de });
      if (withOrder !== false && ko.trim().split(/\s+/).length >= 3) pool.push({ type: 'order', ko, de });
      if (TTS.voices.length) pool.push({ type: 'dictation', ko, de });
    }
    return pool;
  }
  function grammarExercises(p, n) {
    const out = [];
    const errs = shuffle((p.err || []).map(e => ({ type: 'error', wrong: e[0], right: e[1], idx: e[2], hint: e[3], gid: p.id })));
    const chs = shuffle((p.ch || []).map(c => ({ type: 'choice', q: c[0], options: shuffle(c[1]), answer: c[2], de: c[3] || '', gid: p.id })));
    out.push(...errs.slice(0, Math.max(1, Math.round(n * 0.2))));
    out.push(...chs.slice(0, 2));
    const drillN = p.drill ? Math.ceil(n * 0.35) : 0;
    for (let i = 0; i < drillN; i++) { const d = drillEx(p.drill); if (d) out.push(Object.assign(d, { gid: p.id })); }
    // Sätze: jede Übersetzung nur einmal pro Satz
    const used = new Set();
    for (const ex of shuffle(sentenceExercises(p.s || []))) {
      if (out.length >= n) break;
      if (used.has(ex.ko)) continue;
      used.add(ex.ko); out.push(Object.assign(ex, { gid: p.id }));
    }
    while (out.length < n && p.drill) { const d = drillEx(p.drill); if (!d) break; out.push(Object.assign(d, { gid: p.id })); }
    return shuffle(out.slice(0, n));
  }

  /* ───────── Übungs-Runner ─────────
     opts: { title, list?, next?(), infinite?, onFinish(results), backHash } */
  function runExercises(opts) {
    const host = UI.main();
    const results = [];
    let idx = 0;
    const list = opts.list || null;
    const total = list ? list.length : 0;
    function header() {
      const ok = results.filter(r => r.ok).length;
      const prog = list ? `<div class="progress"><div style="width:${Math.round(idx / total * 100)}%"></div></div><span class="muted">${Math.min(idx + 1, total)} / ${total}</span>`
        : `<span class="muted">${ok} von ${results.length} richtig</span>`;
      return `<div class="run-head"><h2>${esc(opts.title)}</h2><div class="run-prog">${prog}</div><button class="btn ghost small" id="run-quit">Beenden</button></div>`;
    }
    function finish() {
      UI.onEnter = null; document.onkeydown = null;
      if (opts.onFinish) opts.onFinish(results); else location.hash = opts.backHash || '#home';
    }
    function show() {
      document.onkeydown = null;
      const ex = list ? list[idx] : opts.next();
      if (!ex) return finish();
      host.innerHTML = header() + `<div class="card ex-card" id="ex"></div><div id="fb"></div>`;
      document.getElementById('run-quit').onclick = finish;
      const exEl = document.getElementById('ex'), fb = document.getElementById('fb');
      let rec = null;
      const api = {
        result(ok, o) {
          o = o || {};
          if (rec) return;
          rec = { ex, ok }; results.push(rec);
          const btns = [];
          if (!ok && o.overridable) btns.push(`<button class="btn ghost" id="ovr">Ich hatte doch recht</button>`);
          btns.push(`<button class="btn primary" id="nx">Weiter ⏎</button>`);
          fb.innerHTML = `<div class="actions">${btns.join('')}</div>`;
          const ovr = document.getElementById('ovr');
          if (ovr) ovr.onclick = () => { rec.ok = true; ovr.remove(); exEl.querySelectorAll('.verdict').forEach(v => { v.className = 'verdict ok'; v.textContent = '✓ Als richtig gewertet'; }); };
          document.getElementById('nx').onclick = next;
          UI.onEnter = next;
          document.getElementById('nx').focus();
        }
      };
      function next() { UI.onEnter = null; idx++; if (list && idx >= total) return finish(); show(); }
      EX[ex.type](ex, exEl, api);
    }
    show();
  }

  const verdict = (ok, txt) => `<div class="verdict ${ok ? 'ok' : 'bad'}">${ok ? '✓ ' + (txt || 'Richtig!') : '✗ ' + (txt || 'Leider falsch')}</div>`;
  function focusInput(el) { const i = el.querySelector('input'); if (i) setTimeout(() => i.focus(), 30); }

  /* ───────── Übungstypen ───────── */
  const EX = {
    ko2de(ex, el, api) {
      el.innerHTML = `<div class="ex-type">Übersetze ins Deutsche</div>${UI.koLine(ex.ko, true)}
        <input class="answer" placeholder="Deine Übersetzung (optional) …" autocomplete="off">
        <div class="actions"><button class="btn primary" id="show">Lösung zeigen ⏎</button></div><div id="sol"></div>`;
      if (Store.state.settings.autoplay) TTS.speak(ex.ko);
      const reveal = () => {
        UI.onEnter = null;
        const inp = el.querySelector('input').value.trim();
        const auto = inp ? Check.de(inp, ex.de) : null;
        el.querySelector('#show').remove();
        el.querySelector('#sol').innerHTML = `<div class="solution">${esc(ex.de)}</div>` + (auto === 'ok' ? verdict(true, 'Stimmt genau!') : '') +
          `<div class="actions"><span class="muted">Wie war's?</span><button class="btn good" id="r1">✓ Richtig</button><button class="btn bad" id="r0">✗ Falsch</button></div>`;
        el.querySelector('#r1').onclick = () => { el.querySelector('#sol .actions').remove(); api.result(true); };
        el.querySelector('#r0').onclick = () => { el.querySelector('#sol .actions').remove(); api.result(false); };
        if (auto === 'ok') { UI.onEnter = () => el.querySelector('#r1').click(); }
      };
      el.querySelector('#show').onclick = reveal; UI.onEnter = reveal; focusInput(el);
    },
    de2ko(ex, el, api) {
      el.innerHTML = `<div class="ex-type">Übersetze ins Koreanische</div><div class="prompt">${esc(ex.de)}</div>
        <input class="answer ko-input" placeholder="한국어로 …" autocomplete="off" lang="ko">
        <div class="actions"><button class="btn primary" id="chk">Prüfen ⏎</button></div><div id="sol"></div>`;
      koCheck(ex.ko, el, api, () => '');
    },
    dictation(ex, el, api) {
      el.innerHTML = `<div class="ex-type">Hördiktat – schreib, was du hörst</div>
        <div class="ko-line"><button class="btn" data-speak="${esc(ex.ko)}">🔊 Abspielen</button><button class="btn ghost" data-speak-slow="${esc(ex.ko)}">🐢 Langsam</button></div>
        <input class="answer ko-input" placeholder="한국어로 …" autocomplete="off" lang="ko">
        <div class="actions"><button class="btn primary" id="chk">Prüfen ⏎</button></div><div id="sol"></div>`;
      setTimeout(() => TTS.speak(ex.ko), 250);
      koCheck(ex.ko, el, api, () => `<div class="muted">${esc(ex.de)}</div>`);
    },
    order(ex, el, api) {
      const tokens = ex.ko.trim().split(/\s+/);
      let order = shuffle(tokens.map((t, i) => i));
      if (order.every((v, i) => v === i)) order = order.reverse();
      const chosen = [];
      el.innerHTML = `<div class="ex-type">Bring die Wörter in die richtige Reihenfolge</div><div class="prompt">${esc(ex.de)}</div>
        <div class="built" id="built"></div><div class="pool" id="pool"></div>
        <div class="actions"><button class="btn ghost" id="undo">↶ Zurück</button><button class="btn primary" id="chk">Prüfen ⏎</button></div><div id="sol"></div>`;
      const draw = () => {
        el.querySelector('#built').innerHTML = chosen.map((i, k) => `<button class="tok sel" data-k="${k}">${esc(tokens[i])}</button>`).join('') || '<span class="muted">Klicke unten auf die Wörter …</span>';
        el.querySelector('#pool').innerHTML = order.map(i => chosen.includes(i) ? `<span class="tok ghost">${esc(tokens[i])}</span>` : `<button class="tok" data-i="${i}">${esc(tokens[i])}</button>`).join('');
        el.querySelectorAll('#pool [data-i]').forEach(b => b.onclick = () => { chosen.push(+b.dataset.i); draw(); });
        el.querySelectorAll('#built [data-k]').forEach(b => b.onclick = () => { chosen.splice(+b.dataset.k, 1); draw(); });
      };
      draw();
      el.querySelector('#undo').onclick = () => { chosen.pop(); draw(); };
      const check = () => {
        if (chosen.length < tokens.length) { UI.toast('Bitte erst alle Wörter verwenden.'); return; }
        UI.onEnter = null;
        const built = chosen.map(i => tokens[i]).join(' ');
        const ok = Check.normKo(built) === Check.normKo(ex.ko);
        el.querySelector('.actions').remove();
        el.querySelector('#pool').remove();
        el.querySelector('#sol').innerHTML = verdict(ok) + UI.koLine(ex.ko);
        if (Store.state.settings.autoplay) TTS.speak(ex.ko);
        api.result(ok, { overridable: !ok });
      };
      el.querySelector('#chk').onclick = check; UI.onEnter = check;
    },
    error(ex, el, api) {
      const tokens = ex.wrong.trim().split(/\s+/);
      el.innerHTML = `<div class="ex-type">Fehler finden – klicke auf das falsche Wort</div>
        <div class="tokens">${tokens.map((t, i) => `<button class="tok big" data-i="${i}">${esc(t)}</button>`).join('')}</div><div id="sol"></div>`;
      UI.onEnter = null;
      el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; const ok = i === ex.idx;
        el.querySelectorAll('[data-i]').forEach(x => { x.disabled = true; if (+x.dataset.i === ex.idx) x.classList.add('err'); });
        if (!ok) b.classList.add('wrongpick');
        el.querySelector('#sol').innerHTML = verdict(ok, ok ? 'Gefunden!' : 'Das war nicht der Fehler') +
          `<div class="label">Richtig:</div>${UI.koLine(ex.right)}<div class="hint">💡 ${esc(ex.hint)}</div>`;
        if (Store.state.settings.autoplay) TTS.speak(ex.right);
        api.result(ok);
      });
    },
    choice(ex, el, api) {
      const q = esc(ex.q).replace(/_{2,}/, '<span class="gap">___</span>');
      el.innerHTML = `<div class="ex-type">${ex.isParticle ? 'Welche Form ist richtig?' : 'Lückentext – wähle die richtige Option'}</div>
        <div class="prompt ko">${q}</div>${ex.de ? `<div class="muted">${esc(ex.de)}</div>` : ''}
        <div class="choices">${ex.options.map((o, i) => `<button class="btn choice" data-o="${esc(o)}">${i + 1}. ${esc(o)}</button>`).join('')}</div><div id="sol"></div>`;
      const choose = o => {
        if (el.dataset.done) return; el.dataset.done = 1; UI.onEnter = null; document.onkeydown = null;
        const ok = o === ex.answer;
        el.querySelectorAll('[data-o]').forEach(b => { b.disabled = true; if (b.dataset.o === ex.answer) b.classList.add('good'); else if (b.dataset.o === o) b.classList.add('bad'); });
        const full = ex.full || ex.q.replace(/\s*\(.*?\)\s*$/, '').replace(/_{2,}/, ex.answer);
        el.querySelector('#sol').innerHTML = verdict(ok) + UI.koLine(full);
        if (Store.state.settings.autoplay) TTS.speak(full);
        api.result(ok);
      };
      el.querySelectorAll('[data-o]').forEach(b => b.onclick = () => choose(b.dataset.o));
      document.onkeydown = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= ex.options.length && !e.target.closest('input')) choose(ex.options[n - 1]); };
    },
    conj(ex, el, api) {
      const F = g.Conj.FORMS[ex.form];
      el.innerHTML = `<div class="ex-type">Konjugiere</div>
        <div class="prompt"><span class="ko big">${esc(ex.verb.ko)}</span> <span class="muted">(${esc(ex.verb.de)})</span></div>
        <div class="form-ask">→ <b>${esc(F.label)}</b> <span class="muted">${esc(F.hint)}</span></div>
        <input class="answer ko-input" placeholder="한국어로 …" autocomplete="off" lang="ko">
        <div class="actions"><button class="btn primary" id="chk">Prüfen ⏎</button></div><div id="sol"></div>`;
      koCheck(ex.answer, el, api, () => {
        const t = g.Conj.stemType(ex.verb.ko, ex.verb.cls);
        return `<div class="hint">💡 ${esc(g.Conj.CLASS_INFO[t] || g.Conj.CLASS_INFO[''])}</div>`;
      });
    },
    number(ex, el, api) {
      el.innerHTML = `<div class="ex-type">Zahlen – schreib es auf Koreanisch</div>
        <div class="prompt big">${esc(ex.q)}</div><div class="muted">${esc(ex.sub)}</div>
        <input class="answer ko-input" placeholder="한국어로 …" autocomplete="off" lang="ko">
        <div class="actions"><button class="btn primary" id="chk">Prüfen ⏎</button></div><div id="sol"></div>`;
      koCheck(ex.answers.join(' / '), el, api, () => `<div class="hint">💡 ${esc(ex.hint)}</div>`);
    }
  };

  // Gemeinsame Prüfung für koreanische Eingaben
  function koCheck(target, el, api, extra) {
    const check = () => {
      const inp = el.querySelector('input').value.trim();
      if (!inp) { UI.toast('Bitte eine Antwort eingeben.'); return; }
      UI.onEnter = null;
      const ok = Check.ko(inp, target) === 'ok';
      const first = Check.alts(target)[0] || target;
      el.querySelector('.actions').remove();
      el.querySelector('input').disabled = true;
      el.querySelector('#sol').innerHTML = verdict(ok) +
        (ok ? '' : `<div class="label">Deine Antwort im Vergleich:</div><div class="diff ko">${Check.diff(inp, first)}</div><div class="label">Richtig:</div>`) +
        UI.koLine(target.includes(' / ') ? target : first) + (extra ? extra(ok) : '');
      if (Store.state.settings.autoplay) TTS.speak(first);
      api.result(ok, { overridable: !ok });
    };
    el.querySelector('#chk').onclick = check; UI.onEnter = check; focusInput(el);
  }

  g.UI = UI;
  g.Ex = { runExercises, grammarExercises, sentenceExercises, drillEx, conjEx, particleEx, numberEx, verbPool, userVerbs, EX, verdict };
})(window);
