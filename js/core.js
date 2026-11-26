/* Kern: Speicher, Phasen-System (SRS), Antwortprüfung, Zahlen, Audio */
(function (g) {
  'use strict';

  /* ───────── Hilfen ───────── */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const dateStr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const today = () => dateStr(new Date());
  function addDays(str, n) { const [y, m, d] = str.split('-').map(Number); return dateStr(new Date(y, m - 1, d + n)); }
  function daysBetween(a, b) { const [y1, m1, d1] = a.split('-').map(Number), [y2, m2, d2] = b.split('-').map(Number); return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / 864e5); }
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];

  /* ───────── Speicher ───────── */
  const KEY = 'koreanisch-lernapp-v1';
  const DEFAULT_SETTINGS = {
    vocabIntervals: [1, 3, 9, 29, 90, 180],   // Tage bis zur nächsten Abfrage nach Erreichen von Phase 1..6
    grammarIntervals: [1, 3, 7, 14, 30, 60],
    directions: 'both',          // both | de2ko | ko2de
    answerMode: 'type',          // type | flip
    newPerDay: 20,
    grammarPerPoint: 6,
    grammarPointsPerDay: 3,
    autoplay: true,
    rate: 0.85,
    voiceURI: '',
    typoTolerance: true,
    ui: { theme: 'auto', accent: '#2f5bd3', scale: 1 },     // Darstellung
    kbd: { physical: true, auto: false }                     // Tastatur
  };
  function defaultState() {
    return { version: 1, vocab: [], grammar: {}, settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), stats: { days: {}, newCount: { date: '', n: 0 } }, lastBackup: '' };
  }
  const Store = {
    state: null,
    load() {
      try {
        const raw = localStorage.getItem(KEY);
        const st = raw ? JSON.parse(raw) : defaultState();
        st.settings = Object.assign({}, DEFAULT_SETTINGS, st.settings || {});
        st.settings.ui = Object.assign({}, DEFAULT_SETTINGS.ui, st.settings.ui || {});
        st.settings.kbd = Object.assign({}, DEFAULT_SETTINGS.kbd, st.settings.kbd || {});
        st.stats = st.stats || { days: {}, newCount: { date: '', n: 0 } };
        st.grammar = st.grammar || {};
        st.vocab = st.vocab || [];
        this.state = st;
      } catch (e) {
        console.error(e);
        this.state = defaultState();
      }
      return this.state;
    },
    save() { localStorage.setItem(KEY, JSON.stringify(this.state)); },
    replace(st) { localStorage.setItem(KEY, JSON.stringify(st)); this.load(); },
    reset() { this.state = defaultState(); this.save(); },
    DEFAULT_SETTINGS
  };

  function logStat(kind, correct) {
    const d = today();
    const s = Store.state.stats.days[d] = Store.state.stats.days[d] || { vocab: 0, vocabOk: 0, grammar: 0, grammarOk: 0 };
    s[kind]++; if (correct) s[kind + 'Ok']++;
  }
  function streak() {
    const days = Store.state.stats.days; let n = 0; let d = today();
    if (!days[d]) d = addDays(d, -1);
    while (days[d]) { n++; d = addDays(d, -1); }
    return n;
  }

  /* ───────── Phasen (SRS) ───────── */
  const SRS = {
    dirs() { const d = Store.state.settings.directions; return d === 'both' ? ['de2ko', 'ko2de'] : [d]; },
    ensure(v) {
      v.srs = v.srs || {};
      for (const d of ['de2ko', 'ko2de']) if (!v.srs[d]) v.srs[d] = { phase: 0, due: '' };
      return v;
    },
    newLeft() {
      const nc = Store.state.stats.newCount;
      if (nc.date !== today()) { nc.date = today(); nc.n = 0; }
      return Math.max(0, Store.state.settings.newPerDay - nc.n);
    },
    due(filter) {
      const t = today(); const out = [];
      for (const v of Store.state.vocab) {
        if (filter && !filter(v)) continue;
        this.ensure(v);
        for (const d of this.dirs()) { const s = v.srs[d]; if (s.phase >= 1 && s.due <= t) out.push({ v, dir: d }); }
      }
      return out;
    },
    fresh(filter) {
      const out = [];
      for (const v of Store.state.vocab) {
        if (filter && !filter(v)) continue;
        this.ensure(v);
        for (const d of this.dirs()) if (v.srs[d].phase === 0) out.push({ v, dir: d });
      }
      // Wichtigste zuerst: Häufigkeitsstufe 1 (sehr häufig) … 5 (selten); ohne Angabe = 3. Sortierung ist stabil.
      return out.sort((a, b) => (a.v.prio || 3) - (b.v.prio || 3));
    },
    answer(v, dir, ok) {
      this.ensure(v);
      const s = v.srs[dir]; const ints = Store.state.settings.vocabIntervals;
      const before = s.phase;
      if (before === 0) { const nc = Store.state.stats.newCount; if (nc.date !== today()) { nc.date = today(); nc.n = 0; } nc.n++; }
      if (ok) { s.phase = Math.min(6, s.phase + 1); s.due = addDays(today(), ints[s.phase - 1] || 1); }
      else { s.phase = 1; s.due = addDays(today(), 1); }
      s.last = today();
      logStat('vocab', ok);
      Store.save();
      return { before, after: s.phase, due: s.due };
    },
    phaseCounts() {
      const c = [0, 0, 0, 0, 0, 0, 0];
      for (const v of Store.state.vocab) { this.ensure(v); for (const d of this.dirs()) c[v.srs[d].phase]++; }
      return c;
    },
    // Grammatik
    gDue() {
      const t = today();
      return Object.entries(Store.state.grammar).filter(([id, s]) => s.active && s.due <= t && g.Grammar.byId[id]).map(([id]) => id);
    },
    gActivate(id, on) {
      const gs = Store.state.grammar;
      if (on) gs[id] = Object.assign({ phase: 1, due: today(), history: [] }, gs[id] || {}, { active: true });
      else if (gs[id]) gs[id].active = false;
      Store.save();
    },
    gResult(id, pct) {
      const s = Store.state.grammar[id]; if (!s) return null;
      const ints = Store.state.settings.grammarIntervals; const before = s.phase;
      if (pct >= 0.8) { s.phase = Math.min(6, s.phase + 1); s.due = addDays(today(), ints[s.phase - 1] || 1); }
      else if (pct < 0.5) { s.phase = 1; s.due = addDays(today(), 1); }
      else { s.due = addDays(today(), 1); }
      s.history = (s.history || []).concat([{ d: today(), p: Math.round(pct * 100) }]).slice(-20);
      Store.save();
      return { before, after: s.phase, due: s.due };
    }
  };

  /* ───────── Antwortprüfung ───────── */
  const Check = {
    normKo(s) { return String(s || '').replace(/\(.*?\)/g, '').replace(/[\s.,!?~…·"'“”‘’\-:;]/g, ''); },
    normDe(s) {
      return String(s || '').toLowerCase().replace(/\(.*?\)|\[.*?\]/g, ' ')
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/[.,!?;:"'“”„‘’…]/g, ' ')
        .replace(/^\s*(der|die|das|ein|eine|einen|sich|zu|etw\.?|jdn\.?|jdm\.?|etwas)\s+/g, '')
        .replace(/\s+/g, ' ').trim();
    },
    // Alternativen (getrennt durch , ; / oder „oder“) – Klammerinhalte zählen nicht (z. B. Formen: „ei bok (boka, bøker, bøkene)“)
    alts(target) { return String(target).replace(/\(.*?\)/g, '').split(/[,;/]|\boder\b/).map(s => s.trim()).filter(Boolean); },
    lev(a, b) {
      const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
      let prev = Array.from({ length: n + 1 }, (_, i) => i);
      for (let i = 1; i <= m; i++) {
        const cur = [i];
        for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = cur;
      }
      return prev[n];
    },
    // Ergebnis: 'ok' | 'typo' | 'wrong'
    de(input, target) {
      const inp = this.normDe(input); if (!inp) return 'wrong';
      const cands = this.alts(target).map(x => this.normDe(x)).concat([this.normDe(target)]);
      if (cands.includes(inp)) return 'ok';
      if (Store.state.settings.typoTolerance && cands.some(c => c.length >= 5 && this.lev(c, inp) <= 1)) return 'typo';
      return 'wrong';
    },
    ko(input, target) {
      const inp = this.normKo(input); if (!inp) return 'wrong';
      const cands = this.alts(target).map(x => this.normKo(x)).concat([this.normKo(target)]);
      return cands.includes(inp) ? 'ok' : 'wrong';
    },
    // Zeichenweiser Vergleich -> HTML (fehlend = grün unterstrichen, zu viel = rot durchgestrichen)
    diff(input, target) {
      const a = [...String(input)], b = [...String(target)];
      const m = a.length, n = b.length;
      const L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      let i = 0, j = 0, out = '';
      while (i < m && j < n) {
        if (a[i] === b[j]) { out += esc(a[i]); i++; j++; }
        else if (L[i + 1][j] >= L[i][j + 1]) { out += '<del>' + esc(a[i]) + '</del>'; i++; }
        else { out += '<ins>' + esc(b[j]) + '</ins>'; j++; }
      }
      while (i < m) out += '<del>' + esc(a[i++]) + '</del>';
      while (j < n) out += '<ins>' + esc(b[j++]) + '</ins>';
      return out;
    }
  };

  /* ───────── Zahlen ───────── */
  const Numbers = (() => {
    const D = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const N1 = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
    const C1 = ['', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉'];
    const N10 = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'];
    function sino4(n) {
      let s = '';
      for (const [u, name] of [[1000, '천'], [100, '백'], [10, '십']]) { const q = Math.floor(n / u) % 10; if (q) s += (q === 1 ? '' : D[q]) + name; }
      return s + D[n % 10];
    }
    function sino(n) {
      if (n === 0) return '영';
      const man = Math.floor(n / 10000), rest = n % 10000; let s = '';
      if (man) s += (man === 1 ? '' : sino4(man)) + '만';
      if (rest) s += (s ? ' ' : '') + sino4(rest);
      return s;
    }
    function native(n, counter) {
      const t = Math.floor(n / 10), o = n % 10;
      if (counter && n === 20) return '스무';
      return N10[t] + (counter ? C1[o] : N1[o]);
    }
    const MONTHS_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const month = m => m === 6 ? '유월' : m === 10 ? '시월' : sino(m) + '월';
    const COUNTERS = [['개', 'Stück'], ['명', 'Personen'], ['잔', 'Tassen'], ['권', 'Bücher'], ['마리', 'Tiere'], ['병', 'Flaschen'], ['살', 'Jahre alt']];
    const r = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    function gen(kinds) {
      const kind = pick(kinds && kinds.length ? kinds : ['counter', 'money', 'time', 'date']);
      if (kind === 'counter') {
        const [c, de] = pick(COUNTERS); const n = c === '살' ? r(1, 59) : r(1, 25);
        return { kind, q: `${n} ${de}`, sub: `Zählwort ${c} · koreanische Zahlen`, answers: [native(n, true) + ' ' + c], hint: 'Zählwörter → koreanische Zahlen (한, 두, 세, 네, 스무 …)' };
      }
      if (kind === 'money') {
        const n = pick([r(1, 9) * 1000, r(1, 99) * 500, r(1, 50) * 1000, r(10, 300) * 100, r(1, 20) * 10000 + r(0, 9) * 1000]);
        return { kind, q: n.toLocaleString('de-DE') + ' Won', sub: 'Preis · sinokoreanische Zahlen', answers: [sino(n) + ' 원'], hint: 'Geld → sinokoreanisch; 10.000 = 만 (ohne 일)' };
      }
      if (kind === 'time') {
        const h = r(1, 12), m = pick([0, 0, 5, 10, 15, 20, 30, 30, 40, 45, 50]);
        const base = native(h, true) + ' 시';
        const answers = [m ? base + ' ' + sino(m) + ' 분' : base];
        if (m === 30) answers.push(base + ' 반');
        return { kind, q: `${h}:${pad(m)} Uhr`, sub: 'Uhrzeit · Stunden koreanisch, Minuten sino', answers, hint: '시 = koreanische Zahl, 분 = sinokoreanisch, 30 Min. = 반' };
      }
      const mo = r(1, 12), d = r(1, 31);
      return { kind: 'date', q: `${d}. ${MONTHS_DE[mo - 1]}`, sub: 'Datum · sinokoreanisch (월, 일)', answers: [month(mo) + ' ' + sino(d) + ' 일'], hint: 'Juni = 유월, Oktober = 시월' };
    }
    return { sino, native, gen, month };
  })();

  /* ───────── Audio: Sprachausgabe ───────── */
  const TTS = {
    voices: [],
    supported: typeof speechSynthesis !== 'undefined',
    init(cb) {
      if (!this.supported) return;
      const load = () => { this.voices = speechSynthesis.getVoices().filter(v => /^ko/i.test(v.lang)); cb && cb(); };
      load();
      speechSynthesis.onvoiceschanged = load;
    },
    voice() {
      const uri = Store.state.settings.voiceURI;
      let v = this.voices.find(x => x.voiceURI === uri);
      // Online-Stimmen (z. B. Edge „… Online (Natural)“) gehen ohne Internet nicht → dann automatisch die Offline-Stimme
      if (v && !v.localService && navigator.onLine === false) v = null;
      return v || this.voices.find(x => x.localService) || this.voices[0] || null;
    },
    speak(text, rate) {
      if (!this.supported) return;
      const clean = String(text).replace(/\(.*?\)/g, '').replace(/_+/g, ' ').trim();
      if (!clean) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = 'ko-KR';
      const v = this.voice(); if (v) u.voice = v;
      u.rate = rate || Store.state.settings.rate || 0.9;
      speechSynthesis.speak(u);
      return u;
    }
  };

  /* ───────── Audio: eigene Aufnahme (Nachsprechen) ───────── */
  const Recorder = {
    rec: null, chunks: [], urls: {}, current: null,
    supported: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && typeof MediaRecorder !== 'undefined'),
    async toggle(key, onState) {
      if (this.rec && this.rec.state === 'recording') { this.rec.stop(); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.chunks = []; this.current = key;
        this.rec = new MediaRecorder(stream);
        this.rec.ondataavailable = e => this.chunks.push(e.data);
        this.rec.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          if (this.urls[key]) URL.revokeObjectURL(this.urls[key]);
          this.urls[key] = URL.createObjectURL(new Blob(this.chunks, { type: this.rec.mimeType }));
          onState && onState('stopped');
        };
        this.rec.start();
        onState && onState('recording');
      } catch (e) {
        alert('Mikrofon nicht verfügbar: ' + e.message);
        onState && onState('error');
      }
    },
    play(key) { if (this.urls[key]) new Audio(this.urls[key]).play(); },
    has(key) { return !!this.urls[key]; }
  };

  g.Core = { esc, today, addDays, daysBetween, uid, shuffle, pick, Store, SRS, Check, Numbers, TTS, Recorder, logStat, streak };
})(typeof window !== 'undefined' ? window : globalThis);
