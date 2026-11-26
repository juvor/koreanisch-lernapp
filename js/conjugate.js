/* Konjugations-Engine für koreanische Verben und Adjektive
   Klassen: '' (regelmäßig), 'ㅂ', 'ㄷ', 'ㅅ', '르', 'ㅎ'  — ㄹ-Stämme, 으-Stämme und 하다 werden automatisch erkannt. */
(function (g) {
  'use strict';
  const H = g.Hangul;
  const { V, T } = H;

  function stemOf(verb) { return verb.endsWith('다') ? verb.slice(0, -1) : verb; }
  function last(s) { return H.dec(s[s.length - 1]); }
  function repLast(s, l, v, t) { return s.slice(0, -1) + H.comp(l, v, t); }
  function setFinal(s, t) { const d = last(s); return repLast(s, d.l, d.v, t); }
  function setVowel(s, v) { const d = last(s); return repLast(s, d.l, v, d.t); }
  function bright(v) { return v === V.A || v === V.O || v === V.YA; }

  // Ausnahmelisten für die automatische Klassenerkennung
  const B_REGULAR = ['입', '잡', '좁', '씹', '뽑', '업', '접', '집', '넓', '밟', '굽'];
  const D_IRREGULAR = ['듣', '걷', '묻', '싣', '깨닫', '붇', '긷', '알아듣'];
  const S_IRREGULAR = ['낫', '짓', '붓', '잇', '긋', '젓'];
  const H_REGULAR = ['좋', '놓', '넣', '낳', '닿', '쌓', '찧'];
  const REU_REGULAR = ['따르', '치르', '들르', '다다르', '우러르'];

  function guessClass(verb) {
    const s = stemOf(verb);
    if (!s || !H.isSyl(s[s.length - 1])) return '';
    if (s.endsWith('하')) return '';
    const d = last(s);
    const endsWith = list => list.some(x => s === x || s.endsWith(x));
    if (s.endsWith('르') && s.length >= 2) return endsWith(REU_REGULAR) ? '' : '르';
    if (d.t === T.B) return endsWith(B_REGULAR) ? '' : 'ㅂ';
    if (d.t === T.D) return endsWith(D_IRREGULAR) ? 'ㄷ' : '';
    if (d.t === T.S) return endsWith(S_IRREGULAR) ? 'ㅅ' : '';
    if (d.t === T.H) return endsWith(H_REGULAR) ? '' : 'ㅎ';
    return '';
  }

  // Beschreibung der Stamm-Art (auch für automatische Fälle)
  function stemType(verb, cls) {
    const s = stemOf(verb);
    if (cls) return cls;
    if (s.endsWith('하')) return '하';
    const d = last(s);
    if (d.t === T.L) return 'ㄹ';
    if (d.t === 0 && d.v === V.EU) return '으';
    return '';
  }

  /* Stamm + 아/어 (Grundlage für -아요, -았어요, -아서, -아야 …) */
  function aeo(s, cls) {
    if (s.endsWith('하')) return s.slice(0, -1) + '해';
    const d = last(s);
    switch (cls) {
      case 'ㅂ': {
        const base = setFinal(s, 0);
        return base + ((s === '돕' || s === '곱') ? '와' : '워');
      }
      case 'ㄷ': return setFinal(s, T.L) + (bright(d.v) ? '아' : '어');
      case 'ㅅ': return setFinal(s, 0) + (bright(d.v) ? '아' : '어');
      case '르': {
        const pre = s.slice(0, -1);
        const pd = last(pre);
        return setFinal(pre, T.L) + (bright(pd.v) ? '라' : '러');
      }
      case 'ㅎ': {
        const base = setFinal(s, 0);
        const bv = last(base).v;
        const nv = bv === V.YA ? V.YAE : (bv === V.A || bv === V.EO) ? V.AE : bv;
        return setVowel(base, nv);
      }
    }
    if (d.t !== 0) return s + (bright(d.v) ? '아' : '어');
    switch (d.v) {
      case V.A: case V.EO: case V.YEO: case V.AE: case V.E: case V.YAE: case V.YE: case V.WA: case V.WAE: case V.WE:
        return s;
      case V.O: return setVowel(s, V.WA);
      case V.U: return setVowel(s, V.WO);
      case V.I: return setVowel(s, V.YEO);
      case V.OE: return setVowel(s, V.WAE);
      case V.EU: {
        if (s.length === 1 || !H.isSyl(s[s.length - 2])) return setVowel(s, V.EO);
        const pv = H.dec(s[s.length - 2]).v;
        return setVowel(s, bright(pv) ? V.A : V.EO);
      }
      default: return s + '어';
    }
  }
  function pastBase(s, cls) { return setFinal(aeo(s, cls), T.SS); }

  /* Endungen mit optionalem 으: -(으)세요, -(으)면, -(으)ㄹ 거예요, -(으)ㄴ …
     ending: z. B. '세요', '면', '니까', '러', 'ㄹ 거예요', 'ㄴ' */
  function eu(s, cls, ending) {
    const first = ending[0];
    const jamo = H.JAMO_FINAL[first] !== undefined ? H.JAMO_FINAL[first] : null;
    const rest = jamo !== null ? ending.slice(1) : ending;
    const attachNoEu = base => jamo !== null ? setFinal(base, jamo) + rest : base + ending;
    const attachEu = base => jamo !== null ? base + H.comp(11, V.EU, jamo) + rest : base + '으' + ending;
    const d = last(s);
    if (s.endsWith('하')) return attachNoEu(s);
    switch (cls) {
      case 'ㅂ': return attachNoEu(setFinal(s, 0) + '우');
      case 'ㄷ': return attachEu(setFinal(s, T.L));
      case 'ㅅ': return attachEu(setFinal(s, 0));
      case 'ㅎ': return attachNoEu(setFinal(s, 0));
    }
    if (d.t === T.L) {
      if (jamo !== null) return jamo === T.L ? s + rest : setFinal(s, jamo) + rest;
      if (/^[니세시습]/.test(ending)) return setFinal(s, 0) + ending; // ㄹ fällt vor ㄴ, ㅅ weg
      return s + ending; // 면, 러 …
    }
    if (d.t === 0) return attachNoEu(s);
    return attachEu(s);
  }

  function formal(s) {
    if (s.endsWith('하')) return s.slice(0, -1) + '합니다';
    const d = last(s);
    if (d.t === 0 || d.t === T.L) return setFinal(s, T.B) + '니다';
    return s + '습니다';
  }
  function neun(s) {
    const d = last(s);
    if (d.t === T.L) return setFinal(s, 0) + '는';
    return s + '는';
  }
  function isItda(s) { return s.endsWith('있') || s.endsWith('없'); }
  // Attribut Gegenwart: Verb -는, Adjektiv -(으)ㄴ (있다/없다-Wörter -는)
  function modNow(s, c, e) { return (e && e.type === 'A') && !isItda(s) ? eu(s, c, 'ㄴ') : neun(s); }
  // Grundform für indirekte Rede: 간다, 먹는다, 산다, 바쁘다
  function plainForm(s, e) {
    if ((e && e.type === 'A') || isItda(s)) return s + '다';
    if (s.endsWith('하')) return s.slice(0, -1) + '한다';
    const d = last(s);
    if (d.t === 0 || d.t === T.L) return setFinal(s, T.N) + '다';
    return s + '는다';
  }

  /* Formen: f(stamm, klasse, eintrag) ; only: 'V' = nur Verben */
  const FORMS = {
    present: { label: 'Präsens (höflich)', hint: '-아요/어요', f: (s, c) => aeo(s, c) + '요' },
    past: { label: 'Vergangenheit (höflich)', hint: '-았어요/었어요', f: (s, c) => pastBase(s, c) + '어요' },
    future: { label: 'Futur (höflich)', hint: '-(으)ㄹ 거예요', f: (s, c) => eu(s, c, 'ㄹ 거예요') },
    formal: { label: 'Präsens (formell)', hint: '-ㅂ니다/습니다', f: (s) => formal(s) },
    formalPast: { label: 'Vergangenheit (formell)', hint: '-았습니다/었습니다', f: (s, c) => pastBase(s, c) + '습니다' },
    casual: { label: 'Präsens (반말)', hint: '-아/어', f: (s, c) => aeo(s, c) },
    casualPast: { label: 'Vergangenheit (반말)', hint: '-았어/었어', f: (s, c) => pastBase(s, c) + '어' },
    neg: { label: 'Verneinung mit 안', hint: '안 + Präsens', noNeg: true, f: (s, c, e) => (e && e.nounHa) ? s.slice(0, -1) + ' 안 해요' : '안 ' + aeo(s, c) + '요' },
    negJi: { label: 'Verneinung mit -지 않아요', hint: '-지 않아요', noNeg: true, f: (s) => s + '지 않아요' },
    honorific: { label: 'Höflich/Bitte -(으)세요', hint: '-(으)세요', f: (s, c) => eu(s, c, '세요') },
    progressive: { label: 'Verlaufsform', hint: '-고 있어요', only: 'V', f: (s) => s + '고 있어요' },
    want: { label: 'möchte …', hint: '-고 싶어요', only: 'V', f: (s) => s + '고 싶어요' },
    can: { label: 'kann …', hint: '-(으)ㄹ 수 있어요', only: 'V', f: (s, c) => eu(s, c, 'ㄹ 수 있어요') },
    must: { label: 'muss …', hint: '-아야/어야 해요', f: (s, c) => aeo(s, c) + '야 해요' },
    dont: { action: true, label: 'Bitte nicht …', hint: '-지 마세요', only: 'V', f: (s) => s + '지 마세요' },
    reo: { action: true, label: 'gehen, um zu …', hint: '-(으)러 가요', only: 'V', f: (s, c) => eu(s, c, '러 가요') },
    because: { label: 'weil / und dann', hint: '-아서/어서', f: (s, c) => aeo(s, c) + '서' },
    nikka: { label: 'weil (Begründung)', hint: '-(으)니까', f: (s, c) => eu(s, c, '니까') },
    but: { label: 'aber', hint: '-지만', f: (s) => s + '지만' },
    and: { label: 'und', hint: '-고', f: (s) => s + '고' },
    shallWe: { action: true, label: 'Sollen wir …?', hint: '-(으)ㄹ까요?', only: 'V', f: (s, c) => eu(s, c, 'ㄹ까요?') },
    if: { label: 'wenn/falls', hint: '-(으)면', f: (s, c) => eu(s, c, '면') },
    mod: { label: 'Attribut (vor Nomen, Präsens)', hint: 'V: -는 / A: -(으)ㄴ', f: (s, c, e) => (e && e.type === 'V') || isItda(s) ? neun(s) : eu(s, c, 'ㄴ') },
    modPast: { label: 'Attribut Vergangenheit', hint: '-(으)ㄴ', only: 'V', f: (s, c) => eu(s, c, 'ㄴ') },
    modFuture: { label: 'Attribut Zukunft', hint: '-(으)ㄹ', only: 'V', f: (s, c) => eu(s, c, 'ㄹ') },
    please: { action: true, label: 'Bitte tun Sie …', hint: '-아/어 주세요', only: 'V', f: (s, c) => aeo(s, c) + ' 주세요' },
    promise: { action: true, label: 'Ich werde … (Versprechen)', hint: '-(으)ㄹ게요', only: 'V', f: (s, c) => eu(s, c, 'ㄹ게요') },
    before: { label: 'bevor …', hint: '-기 전에', only: 'V', f: (s) => s + '기 전에' },
    after: { label: 'nachdem …', hint: '-(으)ㄴ 후에', only: 'V', f: (s, c) => eu(s, c, 'ㄴ 후에') },
    // ── Level 3 ──
    seemNow: { label: 'scheint / ich glaube (jetzt)', hint: '-는/-(으)ㄴ 것 같아요', f: (s, c, e) => modNow(s, c, e) + ' 것 같아요' },
    seemPast: { label: 'scheint passiert zu sein', hint: '-(으)ㄴ 것 같아요', only: 'V', f: (s, c) => eu(s, c, 'ㄴ 것 같아요') },
    seemFut: { label: 'wird wohl …', hint: '-(으)ㄹ 것 같아요', f: (s, c) => eu(s, c, 'ㄹ 것 같아요') },
    become: { label: '… geworden', hint: '-아/어졌어요', only: 'A', f: (s, c) => aeo(s, c) + '졌어요' },
    cameTo: { label: 'es ergab sich, dass …', hint: '-게 됐어요', only: 'V', f: (s) => s + '게 됐어요' },
    geodeun: { label: '… nämlich (Begründung)', hint: '-거든요', f: (s) => s + '거든요' },
    deora: { label: 'mir ist aufgefallen, dass …', hint: '-더라고요', f: (s) => s + '더라고요' },
    intend: { action: true, label: 'vorhaben', hint: '-(으)려고 해요', only: 'V', f: (s, c) => eu(s, c, '려고 해요') },
    expYes: { label: 'schon einmal getan', hint: '-(으)ㄴ 적이 있어요', only: 'V', f: (s, c) => eu(s, c, 'ㄴ 적이 있어요') },
    expNo: { label: 'noch nie getan', hint: '-(으)ㄴ 적이 없어요', only: 'V', f: (s, c) => eu(s, c, 'ㄴ 적이 없어요') },
    when: { label: 'wenn / als', hint: '-(으)ㄹ 때', f: (s, c) => eu(s, c, 'ㄹ 때') },
    becauseGi: { label: 'weil (betont)', hint: '-기 때문에', f: (s) => s + '기 때문에' },
    afterGo: { label: 'nachdem (abgeschlossen)', hint: '-고 나서', only: 'V', f: (s) => s + '고 나서' },
    notOnly: { label: 'nicht nur …', hint: '-(으)ㄹ 뿐만 아니라', f: (s, c) => eu(s, c, 'ㄹ 뿐만 아니라') },
    almost: { label: 'fast / beinahe', hint: '-(으)ㄹ 뻔했어요', only: 'V', f: (s, c) => eu(s, c, 'ㄹ 뻔했어요') },
    tend: { label: 'eher, neigt dazu', hint: '-는/-(으)ㄴ 편이에요', f: (s, c, e) => modNow(s, c, e) + ' 편이에요' },
    pretend: { label: 'so tun, als ob', hint: '-는/-(으)ㄴ 척해요', f: (s, c, e) => modNow(s, c, e) + ' 척해요' },
    quote: { label: 'indirekte Rede', hint: '-ㄴ다고/-다고 해요', f: (s, c, e) => plainForm(s, e) + '고 해요' },
    asPast: { label: 'so wie (getan)', hint: '-(으)ㄴ 대로', only: 'V', f: (s, c) => eu(s, c, 'ㄴ 대로') },
    tenikka: { label: 'da ich ja … / da … wohl', hint: '-(으)ㄹ 테니까', f: (s, c) => eu(s, c, 'ㄹ 테니까') },
    while: { label: 'während', hint: '-는 동안', only: 'V', f: (s) => neun(s) + ' 동안' }
  };

  function conjugate(entry, formKey) {
    const verb = typeof entry === 'string' ? entry : entry.ko;
    const e = typeof entry === 'string' ? { ko: entry } : entry;
    const s = stemOf(verb);
    const cls = e.cls !== undefined ? e.cls : guessClass(verb);
    return FORMS[formKey].f(s, cls, e);
  }

  function allForms(entry) {
    const out = [];
    for (const k in FORMS) {
      if (FORMS[k].only && FORMS[k].only !== (entry.type || 'V')) continue;
      out.push({ key: k, label: FORMS[k].label, hint: FORMS[k].hint, value: conjugate(entry, k) });
    }
    return out;
  }

  const CLASS_INFO = {
    '': 'Regelmäßig: Stammvokal ㅏ/ㅗ → -아요, sonst -어요. Vokale verschmelzen (오+아→와, 우+어→워, 이+어→여).',
    '하': '하다-Verb: 하 + 여 → 해 (해요, 했어요, 해서 …).',
    'ㄹ': 'ㄹ-Stamm: Bei Endungen mit ㄴ, ㅂ, ㅅ fällt das ㄹ weg (살다 → 사세요, 삽니다, 사는). Kein 으 (살면, 살 거예요).',
    '으': '으-Stamm: Das ㅡ fällt vor 아/어 weg. Vorherige Silbe mit ㅏ/ㅗ → 아, sonst 어 (바쁘다 → 바빠요, 쓰다 → 써요).',
    'ㅂ': 'ㅂ-unregelmäßig: Vor Vokal wird ㅂ zu 우 (춥다 → 추워요, 추우면). Ausnahme 돕다/곱다 → 도와요.',
    'ㄷ': 'ㄷ-unregelmäßig: Vor Vokal wird ㄷ zu ㄹ (듣다 → 들어요, 들으세요). Vor Konsonant bleibt ㄷ (듣고).',
    'ㅅ': 'ㅅ-unregelmäßig: Vor Vokal fällt ㅅ weg, ohne Verschmelzung (낫다 → 나아요, 나으면).',
    '르': '르-unregelmäßig: Vor 아/어 wird 르 zu ㄹ라/ㄹ러 (모르다 → 몰라요, 부르다 → 불러요).',
    'ㅎ': 'ㅎ-unregelmäßig: ㅎ fällt weg; vor 아/어 wird der Vokal zu ㅐ (그렇다 → 그래요, 하얗다 → 하얘요), vor 으 fällt 으 weg (그런, 그러면).'
  };

  g.Conj = { plainForm, stemOf, guessClass, stemType, aeo, eu, FORMS, conjugate, allForms, CLASS_INFO };
})(typeof window !== 'undefined' ? window : globalThis);
