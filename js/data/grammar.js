/* Grammatikpunkte – eigene Erklärungen, Reihenfolge orientiert am Anfänger-Curriculum (Level 1–3).
   s   = Beispielsätze [Koreanisch, Deutsch]
   err = Fehlersätze [falsch, richtig, Index des falschen Wortes, Hinweis]
   ch  = Lückensätze [Satz mit ___, Optionen, richtige Option, Deutsch]
   drill = automatisch erzeugte Übungen (Konjugation / Partikel / Zahlen) */
(function (g) {
  'use strict';
  const P = [];
  const add = o => P.push(o);

  /* ───────────── LEVEL 1 ───────────── */
  add({
    id: 'ieyo', level: 1, title: '이에요 / 예요 – „sein“',
    summary: 'A ist B: Nomen + 이에요 (nach Konsonant) / 예요 (nach Vokal).',
    explain: `<p>Mit <b>이에요/예요</b> sagt man, dass etwas etwas <i>ist</i> („Ich bin Student“, „Das ist Wasser“). Es hängt direkt am Nomen.</p>
<table><tr><th>Nomen endet auf</th><th>Endung</th><th>Beispiel</th></tr>
<tr><td>Konsonant (Batchim)</td><td>이에요</td><td>학생<b>이에요</b></td></tr>
<tr><td>Vokal</td><td>예요</td><td>친구<b>예요</b></td></tr></table>
<p>Die Frage hat dieselbe Form – nur mit steigender Betonung: <span class="ko">학생이에요?</span></p>`,
    drill: { kind: 'particle', types: ['be'] },
    s: [['저는 학생이에요.', 'Ich bin Student(in).'], ['이거 물이에요.', 'Das ist Wasser.'], ['제 친구예요.', 'Das ist mein Freund / meine Freundin.'],
      ['이거 뭐예요?', 'Was ist das?'], ['저는 독일 사람이에요.', 'Ich bin Deutsche(r).'], ['여기는 우리 집이에요.', 'Hier ist unser Zuhause.']],
    err: [['저는 학생예요.', '저는 학생이에요.', 1, '학생 endet auf Konsonant (ㅇ) → 이에요.'],
      ['이거 커피이에요.', '이거 커피예요.', 1, '커피 endet auf Vokal → 예요.']]
  });

  add({
    id: 'anieyo', level: 1, title: '이/가 아니에요 – „nicht sein“',
    summary: 'Verneinung von 이에요: Nomen + 이/가 아니에요.',
    explain: `<p>Die Verneinung von 이에요/예요 ist <b>아니에요</b>. Davor steht das Nomen mit dem Subjektpartikel <b>이/가</b>.</p>
<table><tr><th>Nomen endet auf</th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Konsonant</td><td>이 아니에요</td><td>학생<b>이 아니에요</b></td></tr>
<tr><td>Vokal</td><td>가 아니에요</td><td>의사<b>가 아니에요</b></td></tr></table>`,
    drill: { kind: 'particle', types: ['notbe'] },
    s: [['저는 학생이 아니에요.', 'Ich bin kein Student.'], ['이거 제 가방이 아니에요.', 'Das ist nicht meine Tasche.'],
      ['그 사람은 의사가 아니에요.', 'Diese Person ist kein Arzt.'], ['이거 커피가 아니에요. 차예요.', 'Das ist kein Kaffee. Das ist Tee.'],
      ['오늘은 월요일이 아니에요.', 'Heute ist nicht Montag.']],
    err: [['저는 의사이 아니에요.', '저는 의사가 아니에요.', 1, '의사 endet auf Vokal → 가 아니에요.'],
      ['이거 책가 아니에요.', '이거 책이 아니에요.', 1, '책 endet auf Konsonant → 이 아니에요.']]
  });

  add({
    id: 'eunneun', level: 1, title: '은 / 는 – Themapartikel',
    summary: 'Markiert das Thema („was mich betrifft …“) und Kontraste.',
    explain: `<p><b>은/는</b> markiert das <b>Thema</b> des Satzes – worüber man spricht. Oft entspricht das dem deutschen Subjekt, betont aber „was X angeht …“ oder einen <b>Kontrast</b>.</p>
<table><tr><th>Nomen endet auf</th><th>Partikel</th><th>Beispiel</th></tr>
<tr><td>Konsonant</td><td>은</td><td>오늘<b>은</b></td></tr><tr><td>Vokal</td><td>는</td><td>저<b>는</b></td></tr></table>
<p>Tipp: Neue Information / „wer genau?“ → 이/가. Bekanntes Thema / Kontrast → 은/는.</p>`,
    drill: { kind: 'particle', types: ['topic'] },
    s: [['저는 한국어를 공부해요.', 'Ich lerne Koreanisch.'], ['오늘은 날씨가 좋아요.', 'Heute ist das Wetter gut.'],
      ['이름은 뭐예요?', 'Wie ist dein Name?'], ['동생은 회사원이에요.', 'Mein jüngeres Geschwister ist Angestellte(r).'],
      ['저는 커피를 좋아해요. 그런데 동생은 차를 좋아해요.', 'Ich mag Kaffee. Aber mein jüngeres Geschwister mag Tee.']],
    err: [['저은 학생이에요.', '저는 학생이에요.', 0, '저 endet auf Vokal → 는.'],
      ['오늘는 바빠요.', '오늘은 바빠요.', 0, '오늘 endet auf Konsonant → 은.']]
  });

  add({
    id: 'iga', level: 1, title: '이 / 가 – Subjektpartikel',
    summary: 'Markiert das Subjekt, besonders neue Information.',
    explain: `<p><b>이/가</b> markiert das grammatische Subjekt – besonders bei neuer Information, bei 있어요/없어요 und bei Adjektiven („<i>Das Wetter</i> ist gut“).</p>
<table><tr><th>Nomen endet auf</th><th>Partikel</th><th>Beispiel</th></tr>
<tr><td>Konsonant</td><td>이</td><td>시간<b>이</b></td></tr><tr><td>Vokal</td><td>가</td><td>날씨<b>가</b></td></tr></table>
<p><b>Sonderformen:</b> 저 + 가 → <b>제가</b>, 나 + 가 → <b>내가</b>, 너 + 가 → <b>네가</b>, 누구 + 가 → <b>누가</b>.</p>`,
    drill: { kind: 'particle', types: ['subj'] },
    s: [['날씨가 좋아요.', 'Das Wetter ist gut.'], ['누가 왔어요?', 'Wer ist gekommen?'], ['머리가 아파요.', 'Ich habe Kopfschmerzen.'],
      ['고양이가 귀여워요.', 'Die Katze ist süß.'], ['시간이 없어요.', 'Ich habe keine Zeit.'], ['사람이 많아요.', 'Es sind viele Leute da.']],
    err: [['비이 와요.', '비가 와요.', 0, '비 endet auf Vokal → 가.'],
      ['저가 할게요.', '제가 할게요.', 0, 'Sonderform: 저 + 가 → 제가.']]
  });

  add({
    id: 'eulreul', level: 1, title: '을 / 를 – Objektpartikel',
    summary: 'Markiert das direkte Objekt (Akkusativ).',
    explain: `<p><b>을/를</b> steht hinter dem direkten Objekt – dem „Wen oder Was?“ der Handlung. Im Gespräch wird es oft weggelassen.</p>
<table><tr><th>Nomen endet auf</th><th>Partikel</th><th>Beispiel</th></tr>
<tr><td>Konsonant</td><td>을</td><td>책<b>을</b> 읽어요</td></tr><tr><td>Vokal</td><td>를</td><td>커피<b>를</b> 마셔요</td></tr></table>
<p>Kurzformen: 뭐를 → <b>뭘</b>, 저를 → <b>절</b>, 나를 → <b>날</b>.</p>`,
    drill: { kind: 'particle', types: ['obj'] },
    s: [['저는 사과를 먹어요.', 'Ich esse einen Apfel.'], ['물을 마셔요.', 'Ich trinke Wasser.'], ['친구를 만나요.', 'Ich treffe einen Freund.'],
      ['책을 읽어요.', 'Ich lese ein Buch.'], ['음악을 들어요.', 'Ich höre Musik.'], ['한국어를 배워요.', 'Ich lerne Koreanisch.']],
    err: [['빵를 먹어요.', '빵을 먹어요.', 0, '빵 endet auf Konsonant → 을.'],
      ['영화을 봐요.', '영화를 봐요.', 0, '영화 endet auf Vokal → 를.']]
  });

  add({
    id: 'present', level: 1, title: 'Präsens -아요 / -어요',
    summary: 'Die höfliche Gegenwart – die wichtigste Grundform.',
    explain: `<p>Verbstamm = Grundform ohne <b>다</b>. Dann entscheidet der <b>letzte Vokal des Stamms</b>:</p>
<table><tr><th>Stamm</th><th>Endung</th><th>Beispiel</th></tr>
<tr><td>Vokal ㅏ oder ㅗ</td><td>-아요</td><td>살다 → 살<b>아요</b>, 좋다 → 좋<b>아요</b></td></tr>
<tr><td>alle anderen</td><td>-어요</td><td>먹다 → 먹<b>어요</b>, 읽다 → 읽<b>어요</b></td></tr>
<tr><td>하다</td><td>해요</td><td>공부하다 → 공부<b>해요</b></td></tr></table>
<p><b>Verschmelzungen</b> bei Stamm ohne Batchim: 가+아 → <b>가요</b>, 오+아 → <b>와요</b>, 배우+어 → <b>배워요</b>, 마시+어 → <b>마셔요</b>, 되+어 → <b>돼요</b>, 쓰+어 → <b>써요</b>.</p>
<p>Unregelmäßige Verben: siehe Lektion „Unregelmäßige Verben“.</p>`,
    drill: { kind: 'conj', forms: ['present'] },
    s: [['저는 매일 커피를 마셔요.', 'Ich trinke jeden Tag Kaffee.'], ['지금 집에 가요.', 'Ich gehe jetzt nach Hause.'],
      ['동생이 한국어를 배워요.', 'Mein jüngeres Geschwister lernt Koreanisch.'], ['이 김치는 정말 매워요.', 'Dieses Kimchi ist wirklich scharf.'],
      ['저는 서울에 살아요.', 'Ich wohne in Seoul.'], ['주말에 영화를 봐요.', 'Am Wochenende sehe ich einen Film.']],
    err: [['저는 밥을 먹아요.', '저는 밥을 먹어요.', 2, '먹 hat den Vokal ㅓ → -어요.'],
      ['내일 친구가 오아요.', '내일 친구가 와요.', 2, '오 + 아 verschmilzt zu 와.']]
  });

  add({
    id: 'itda', level: 1, title: '있어요 / 없어요 – haben, da sein',
    summary: '„Es gibt / ich habe“ und „es gibt nicht / ich habe nicht“.',
    explain: `<p><b>있다</b> = es gibt, haben, sich befinden. <b>없다</b> = es gibt nicht, nicht haben. Das, was man hat (oder nicht), bekommt <b>이/가</b>.</p>
<p>Die Verneinung von 있어요 ist immer <b>없어요</b> – nicht „안 있어요“.</p>
<p>Viele Adjektive sind damit gebaut: 재미<b>있어요</b> (interessant) ↔ 재미<b>없어요</b> (langweilig), 맛<b>있어요</b> (lecker) ↔ 맛<b>없어요</b>.</p>`,
    s: [['시간 있어요?', 'Hast du Zeit?'], ['저는 차가 없어요.', 'Ich habe kein Auto.'], ['화장실이 어디에 있어요?', 'Wo ist die Toilette?'],
      ['집에 고양이가 있어요.', 'Zu Hause gibt es eine Katze.'], ['이 영화는 재미있어요.', 'Dieser Film ist interessant.'], ['오늘은 수업이 없어요.', 'Heute habe ich keinen Unterricht.']],
    err: [['돈이 안 있어요.', '돈이 없어요.', 1, 'Die Verneinung von 있다 ist 없다, nicht 안 있다.'],
      ['시간가 없어요.', '시간이 없어요.', 0, '시간 endet auf Konsonant → 이.']],
    ch: [['저는 동생이 ___. (Ich habe kein jüngeres Geschwister.)', ['없어요', '있어요', '안 있어요'], '없어요'],
      ['이 책은 정말 재미___.', ['있어요', '없어요'], '있어요', 'Dieses Buch ist wirklich interessant.']]
  });

  add({
    id: 'eeseo', level: 1, title: '에 / 에서 – Ort, Zeit, Richtung',
    summary: '에 = wohin/wann/wo (sein). 에서 = wo etwas passiert.',
    explain: `<table><tr><th>Partikel</th><th>Gebrauch</th><th>Beispiel</th></tr>
<tr><td><b>에</b></td><td>Ziel / Richtung</td><td>학교<b>에</b> 가요</td></tr>
<tr><td><b>에</b></td><td>Zeitpunkt</td><td>세 시<b>에</b>, 주말<b>에</b></td></tr>
<tr><td><b>에</b></td><td>Ort bei 있다/없다</td><td>집<b>에</b> 있어요</td></tr>
<tr><td><b>에서</b></td><td>Ort einer Handlung</td><td>카페<b>에서</b> 공부해요</td></tr>
<tr><td><b>에서</b></td><td>„von … aus“</td><td>독일<b>에서</b> 왔어요</td></tr></table>
<p>Keine Unterscheidung nach Batchim. Bei 오늘, 내일, 어제, 지금 steht kein 에.</p>`,
    s: [['저는 학교에 가요.', 'Ich gehe zur Schule.'], ['도서관에서 공부해요.', 'Ich lerne in der Bibliothek.'], ['세 시에 만나요.', 'Wir treffen uns um drei Uhr.'],
      ['친구가 집에 있어요.', 'Mein Freund ist zu Hause.'], ['카페에서 커피를 마셔요.', 'Ich trinke Kaffee im Café.'], ['주말에 뭐 해요?', 'Was machst du am Wochenende?']],
    err: [['저는 회사에서 가요.', '저는 회사에 가요.', 1, 'Richtung/Ziel → 에.'],
      ['식당에 밥을 먹어요.', '식당에서 밥을 먹어요.', 0, 'Ort einer Handlung → 에서.']],
    ch: [['도서관___ 공부해요.', ['에', '에서'], '에서', 'Ich lerne in der Bibliothek.'], ['다섯 시___ 만나요.', ['에', '에서'], '에', 'Treffen wir uns um fünf.'],
      ['집___ 있어요.', ['에', '에서'], '에', 'Ich bin zu Hause.'], ['공원___ 산책해요.', ['에', '에서'], '에서', 'Ich gehe im Park spazieren.'],
      ['독일___ 왔어요.', ['에', '에서'], '에서', 'Ich komme aus Deutschland.']]
  });

  add({
    id: 'past', level: 1, title: 'Vergangenheit -았어요 / -었어요',
    summary: 'Höfliche Vergangenheit: 아/어-Form + ㅆ어요.',
    explain: `<p>Man bildet zuerst die 아/어-Form (wie beim Präsens) und hängt <b>ㅆ어요</b> an.</p>
<table><tr><th>Stamm</th><th>Endung</th><th>Beispiel</th></tr>
<tr><td>ㅏ / ㅗ</td><td>-았어요</td><td>가다 → <b>갔어요</b>, 보다 → <b>봤어요</b></td></tr>
<tr><td>andere</td><td>-었어요</td><td>먹다 → <b>먹었어요</b>, 마시다 → <b>마셨어요</b></td></tr>
<tr><td>하다</td><td>했어요</td><td>공부하다 → 공부<b>했어요</b></td></tr></table>
<p>Unregelmäßige: 듣다 → 들었어요, 춥다 → 추웠어요, 모르다 → 몰랐어요, 쓰다 → 썼어요.</p>`,
    drill: { kind: 'conj', forms: ['past'] },
    s: [['어제 친구를 만났어요.', 'Gestern habe ich einen Freund getroffen.'], ['아침에 빵을 먹었어요.', 'Morgens habe ich Brot gegessen.'],
      ['주말에 뭐 했어요?', 'Was hast du am Wochenende gemacht?'], ['날씨가 정말 추웠어요.', 'Das Wetter war wirklich kalt.'],
      ['작년에 한국에 갔어요.', 'Letztes Jahr bin ich nach Korea gefahren.'], ['노래를 불렀어요.', 'Ich habe ein Lied gesungen.']],
    err: [['어제 영화를 보았요.', '어제 영화를 봤어요.', 2, 'Vergangenheit: 봐 + ㅆ + 어요 → 봤어요.'],
      ['어제 학교에 가었어요.', '어제 학교에 갔어요.', 2, 'Stamm mit ㅏ → 았어요; 가 + 았 → 갔어요.']]
  });

  add({
    id: 'future', level: 1, title: 'Futur -(으)ㄹ 거예요',
    summary: 'Pläne und Vermutungen über die Zukunft.',
    explain: `<table><tr><th>Stamm</th><th>Endung</th><th>Beispiel</th></tr>
<tr><td>Vokal</td><td>-ㄹ 거예요</td><td>가다 → <b>갈 거예요</b></td></tr>
<tr><td>Konsonant</td><td>-을 거예요</td><td>먹다 → <b>먹을 거예요</b></td></tr>
<tr><td>ㄹ-Stamm</td><td>-ㄹ 거예요 (kein 으)</td><td>살다 → <b>살 거예요</b></td></tr></table>
<p>Unregelmäßige: 듣다 → 들을 거예요, 돕다 → 도울 거예요, 낫다 → 나을 거예요.</p>
<p>Bei Adjektiven/Wetter = Vermutung: 내일 추<b>울 거예요</b> (Morgen wird es wohl kalt).</p>`,
    drill: { kind: 'conj', forms: ['future'] },
    s: [['내일 비가 올 거예요.', 'Morgen wird es regnen.'], ['주말에 친구를 만날 거예요.', 'Am Wochenende werde ich einen Freund treffen.'],
      ['저녁에 뭐 먹을 거예요?', 'Was wirst du zu Abend essen?'], ['내년에 한국에 갈 거예요.', 'Nächstes Jahr werde ich nach Korea fahren.'],
      ['오늘은 집에서 쉴 거예요.', 'Heute werde ich mich zu Hause ausruhen.'], ['음악을 들을 거예요.', 'Ich werde Musik hören.']],
    err: [['내일 책을 읽를 거예요.', '내일 책을 읽을 거예요.', 2, 'Stamm auf Konsonant → -을 거예요.'],
      ['저는 서울에 살을 거예요.', '저는 서울에 살 거예요.', 2, 'ㄹ-Stamm: kein 으 → 살 거예요.']]
  });

  add({
    id: 'neg', level: 1, title: 'Verneinung 안 / -지 않아요',
    summary: '„nicht“: 안 vor dem Verb oder -지 않아요 am Stamm.',
    explain: `<p>Zwei gleichwertige Möglichkeiten (안 ist umgangssprachlicher):</p>
<table><tr><th>Form</th><th>Beispiel</th></tr>
<tr><td><b>안</b> + Verb</td><td><b>안</b> 먹어요, <b>안</b> 바빠요</td></tr>
<tr><td>Stamm + <b>지 않아요</b></td><td>먹<b>지 않아요</b>, 바쁘<b>지 않아요</b></td></tr></table>
<p><b>Achtung bei Nomen + 하다</b>: 안 steht vor 하다 → 공부 <b>안</b> 해요 (nicht 안 공부해요).<br>
Bei Adjektiven mit 하다 (피곤하다) steht 안 aber vorne: 안 피곤해요.</p>
<p>Sonderfälle: 있다 → 없다, 알다 → 모르다.</p>`,
    drill: { kind: 'conj', forms: ['neg', 'negJi'] },
    s: [['저는 고기를 안 먹어요.', 'Ich esse kein Fleisch.'], ['오늘은 안 바빠요.', 'Heute bin ich nicht beschäftigt.'],
      ['어제 운동 안 했어요.', 'Gestern habe ich keinen Sport gemacht.'], ['이 가방은 비싸지 않아요.', 'Diese Tasche ist nicht teuer.'],
      ['커피를 안 좋아해요.', 'Ich mag keinen Kaffee.']],
    err: [['저는 안 공부해요.', '저는 공부 안 해요.', 1, 'Nomen + 하다: 안 steht direkt vor 하다 → 공부 안 해요.'],
      ['오늘은 춥지 안아요.', '오늘은 춥지 않아요.', 1, 'Richtig geschrieben: 않아요 (mit ㄶ).']]
  });

  add({
    id: 'mot', level: 1, title: '못 / -지 못해요 – „nicht können“',
    summary: 'Unfähigkeit oder Unmöglichkeit.',
    explain: `<p><b>못</b> heißt „kann nicht / konnte nicht“ (trotz Wollen). 안 = will nicht / tut nicht, 못 = kann nicht.</p>
<table><tr><th>Form</th><th>Beispiel</th></tr>
<tr><td><b>못</b> + Verb</td><td><b>못</b> 가요 (ich kann nicht gehen)</td></tr>
<tr><td>Stamm + <b>지 못해요</b></td><td>가<b>지 못해요</b> (formeller)</td></tr></table>
<p>Nomen + 하다 → 수영 <b>못</b> 해요. Aussprache: 못 해요 klingt wie [모태요].</p>`,
    s: [['저는 수영을 못 해요.', 'Ich kann nicht schwimmen.'], ['어제 잠을 못 잤어요.', 'Gestern konnte ich nicht schlafen.'],
      ['매운 음식을 못 먹어요.', 'Ich kann kein scharfes Essen essen.'], ['시간이 없어서 못 가요.', 'Ich habe keine Zeit, deshalb kann ich nicht gehen.'],
      ['한국어를 잘 못 해요.', 'Ich kann nicht gut Koreanisch.']],
    err: [['저는 김치를 먹 못어요.', '저는 김치를 못 먹어요.', 2, '못 steht vor dem Verb: 못 먹어요.'],
      ['너무 시끄러워서 잠을 못 자았어요.', '너무 시끄러워서 잠을 못 잤어요.', 4, '자 + 았어요 verschmilzt zu 잤어요.']],
    ch: [['저는 운전을 ___ 해요. (Ich kann nicht Auto fahren.)', ['못', '안'], '못'],
      ['저는 고기를 ___ 먹어요. (Ich esse – aus Prinzip – kein Fleisch.)', ['안', '못'], '안']]
  });

  add({
    id: 'want', level: 1, title: '-고 싶어요 – „möchten“',
    summary: 'Wunsch: Verbstamm + 고 싶어요.',
    explain: `<p>Stamm + <b>고 싶어요</b> = „ich möchte …“. Keine Unterscheidung nach Batchim, auch unregelmäßige Verben bleiben regelmäßig (듣<b>고 싶어요</b>).</p>
<p>Für Wünsche <b>anderer Personen</b> sagt man <b>-고 싶어해요</b>: 친구가 가고 싶어해요.</p>
<p>Vergangenheit: 가고 싶<b>었어요</b> (ich wollte gehen).</p>`,
    drill: { kind: 'conj', forms: ['want'] },
    s: [['한국에 가고 싶어요.', 'Ich möchte nach Korea fahren.'], ['물을 마시고 싶어요.', 'Ich möchte Wasser trinken.'], ['뭐 먹고 싶어요?', 'Was möchtest du essen?'],
      ['오늘은 집에서 쉬고 싶어요.', 'Heute möchte ich mich zu Hause ausruhen.'], ['한국어를 잘하고 싶어요.', 'Ich möchte gut Koreanisch können.'],
      ['친구가 영화를 보고 싶어해요.', 'Mein Freund möchte einen Film sehen.']],
    err: [['커피를 마셔고 싶어요.', '커피를 마시고 싶어요.', 1, '-고 싶어요 kommt direkt an den Stamm: 마시고.'],
      ['내일 친구를 만나 싶어요.', '내일 친구를 만나고 싶어요.', 2, 'Es fehlt -고: 만나고 싶어요.']]
  });

  add({
    id: 'hago', level: 1, title: '하고 / 와·과 / (이)랑 – „und, mit“',
    summary: 'Nomen verbinden: und / mit / zusammen mit.',
    explain: `<table><tr><th>Partikel</th><th>Stil</th><th>nach Konsonant / Vokal</th></tr>
<tr><td><b>하고</b></td><td>neutral, gesprochen</td><td>immer 하고</td></tr>
<tr><td><b>과 / 와</b></td><td>schriftlich, formell</td><td>책<b>과</b> / 커피<b>와</b></td></tr>
<tr><td><b>이랑 / 랑</b></td><td>umgangssprachlich</td><td>동생<b>이랑</b> / 친구<b>랑</b></td></tr></table>
<p>Alle bedeuten „und“ zwischen Nomen oder „mit“ (oft mit 같이 = zusammen).</p>`,
    drill: { kind: 'particle', types: ['and', 'with'] },
    s: [['빵하고 우유를 샀어요.', 'Ich habe Brot und Milch gekauft.'], ['친구랑 영화를 봤어요.', 'Ich habe mit einem Freund einen Film gesehen.'],
      ['동생과 같이 살아요.', 'Ich wohne zusammen mit meinem jüngeren Geschwister.'], ['커피와 케이크를 주문했어요.', 'Ich habe Kaffee und Kuchen bestellt.'],
      ['엄마하고 전화했어요.', 'Ich habe mit Mama telefoniert.']],
    err: [['사과과 배를 샀어요.', '사과와 배를 샀어요.', 0, '사과 endet auf Vokal → 와.'],
      ['동생이랑 친구이랑 놀았어요.', '동생이랑 친구랑 놀았어요.', 1, '친구 endet auf Vokal → 랑.']]
  });

  add({
    id: 'numbers', level: 1, title: 'Zahlen – sinokoreanisch & koreanisch',
    summary: 'Zwei Zahlensysteme: 일, 이, 삼 … und 하나, 둘, 셋 …',
    explain: `<table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
<tr><td>sino</td><td>일</td><td>이</td><td>삼</td><td>사</td><td>오</td><td>육</td><td>칠</td><td>팔</td><td>구</td><td>십</td></tr>
<tr><td>koreanisch</td><td>하나</td><td>둘</td><td>셋</td><td>넷</td><td>다섯</td><td>여섯</td><td>일곱</td><td>여덟</td><td>아홉</td><td>열</td></tr></table>
<p><b>Sino</b> (일, 이, 삼): Geld (원), Minuten (분), Datum (년, 월, 일), Telefonnummern, Stockwerke (층). 100 = 백, 1.000 = 천, 10.000 = <b>만</b>.</p>
<p><b>Koreanisch</b> (하나, 둘): Zählen mit Zählwörtern (개, 명, 잔, 권, 마리, 병), Alter (살), Stunden (시). Bis 99: 스물 (20), 서른 (30), 마흔 (40), 쉰 (50) …</p>
<p>Vor Zählwörtern verkürzen sich: 하나 → <b>한</b>, 둘 → <b>두</b>, 셋 → <b>세</b>, 넷 → <b>네</b>, 스물 → <b>스무</b>.</p>
<p>Monate: Juni = <b>유월</b>, Oktober = <b>시월</b>.</p>`,
    drill: { kind: 'numbers' },
    s: [['사과 세 개 주세요.', 'Drei Äpfel, bitte.'], ['저는 스물다섯 살이에요.', 'Ich bin 25 Jahre alt.'], ['지금 몇 시예요?', 'Wie spät ist es jetzt?'],
      ['이거 얼마예요? 만 원이에요.', 'Wie viel kostet das? 10.000 Won.'], ['생일이 시월 삼 일이에요.', 'Mein Geburtstag ist am 3. Oktober.'],
      ['두 시 반에 만나요.', 'Wir treffen uns um halb drei.']],
    err: [['사과 삼 개 주세요.', '사과 세 개 주세요.', 1, '개 zählt mit koreanischen Zahlen: 세 개.'],
      ['저는 이십 살이에요.', '저는 스무 살이에요.', 1, 'Alter mit koreanischen Zahlen: 20 → 스무 살.']]
  });

  /* ───────────── LEVEL 2 ───────────── */
  add({
    id: 'progressive', level: 2, title: '-고 있어요 – Verlaufsform',
    summary: 'Gerade dabei sein, etwas zu tun.',
    explain: `<p>Stamm + <b>고 있어요</b> = „ich bin gerade dabei …“ bzw. „zurzeit …“. Wie bei -고 싶어요 bleibt der Stamm unverändert (auch bei Unregelmäßigen: 듣<b>고 있어요</b>).</p>
<p>Vergangenheit: 먹고 있<b>었어요</b> (ich war gerade am Essen).</p>`,
    drill: { kind: 'conj', forms: ['progressive'] },
    s: [['지금 밥을 먹고 있어요.', 'Ich esse gerade.'], ['뭐 하고 있어요?', 'Was machst du gerade?'], ['요즘 한국어를 배우고 있어요.', 'Zurzeit lerne ich Koreanisch.'],
      ['친구를 기다리고 있어요.', 'Ich warte auf einen Freund.'], ['비가 오고 있어요.', 'Es regnet gerade.']],
    err: [['지금 음악을 들고 있어요.', '지금 음악을 듣고 있어요.', 2, 'Vor -고 bleibt ㄷ erhalten: 듣고.'],
      ['지금 책을 읽어고 있어요.', '지금 책을 읽고 있어요.', 2, '-고 kommt direkt an den Stamm: 읽고.']]
  });

  add({
    id: 'seyo', level: 2, title: '-(으)세요 – höfliche Bitte & Ehrerbietung',
    summary: 'Höfliche Aufforderung oder respektvolle Frage.',
    explain: `<p>Stamm + <b>(으)세요</b> drückt Respekt gegenüber dem Gesprächspartner aus – als höfliche Bitte („Setzen Sie sich“) oder respektvolle Frage („Wo wohnen Sie?“).</p>
<table><tr><th>Stamm</th><th>Endung</th><th>Beispiel</th></tr>
<tr><td>Vokal</td><td>-세요</td><td>가다 → <b>가세요</b></td></tr>
<tr><td>Konsonant</td><td>-으세요</td><td>앉다 → <b>앉으세요</b></td></tr>
<tr><td>ㄹ-Stamm</td><td>ㄹ fällt weg</td><td>살다 → <b>사세요</b></td></tr></table>
<p>Sonderformen: 먹다/마시다 → <b>드세요</b>, 자다 → <b>주무세요</b>, 있다 (Person) → <b>계세요</b>.</p>`,
    drill: { kind: 'conj', forms: ['honorific'] },
    s: [['여기 앉으세요.', 'Setzen Sie sich bitte hierhin.'], ['안녕히 가세요.', 'Auf Wiedersehen (zu jemandem, der geht).'], ['이 책을 읽으세요.', 'Lesen Sie dieses Buch.'],
      ['어디에 사세요?', 'Wo wohnen Sie?'], ['내일 시간 있으세요?', 'Haben Sie morgen Zeit?'], ['음악을 들으세요.', 'Hören Sie Musik.']],
    err: [['여기에 앉세요.', '여기에 앉으세요.', 1, 'Stamm auf Konsonant → -으세요.'],
      ['서울에 살으세요?', '서울에 사세요?', 1, 'ㄹ-Stamm: ㄹ fällt vor ㅅ weg, kein 으 → 사세요.']]
  });

  add({
    id: 'can', level: 2, title: '-(으)ㄹ 수 있어요 / 없어요 – können',
    summary: 'Fähigkeit oder Möglichkeit.',
    explain: `<p>Stamm + <b>(으)ㄹ 수 있어요</b> = kann; <b>(으)ㄹ 수 없어요</b> = kann nicht.</p>
<table><tr><th>Stamm</th><th>Beispiel</th></tr>
<tr><td>Vokal</td><td>가다 → <b>갈 수 있어요</b></td></tr>
<tr><td>Konsonant</td><td>읽다 → <b>읽을 수 있어요</b></td></tr>
<tr><td>ㄹ-Stamm</td><td>만들다 → <b>만들 수 있어요</b></td></tr></table>
<p>Für erlernte Fähigkeiten sagt man auch: 수영<b>할 줄 알아요</b> (ich kann schwimmen).</p>`,
    drill: { kind: 'conj', forms: ['can'] },
    s: [['저는 한국어를 읽을 수 있어요.', 'Ich kann Koreanisch lesen.'], ['내일 올 수 있어요?', 'Kannst du morgen kommen?'], ['오늘은 갈 수 없어요.', 'Heute kann ich nicht gehen.'],
      ['여기서 사진을 찍을 수 있어요?', 'Kann man hier Fotos machen?'], ['김치를 만들 수 있어요.', 'Ich kann Kimchi machen.']],
    err: [['한국 노래를 부를을 수 있어요.', '한국 노래를 부를 수 있어요.', 2, 'Stamm 부르 endet auf Vokal → 부를 수.'],
      ['음악을 듣을 수 있어요.', '음악을 들을 수 있어요.', 1, 'ㄷ-unregelmäßig: vor 으 wird ㄷ zu ㄹ → 들을 수.']]
  });

  add({
    id: 'must', level: 2, title: '-아야 / -어야 해요 – müssen',
    summary: 'Pflicht oder Notwendigkeit.',
    explain: `<p>아/어-Form + <b>야 해요</b> (oder umgangssprachlich <b>야 돼요</b>) = „muss“.</p>
<p>가다 → 가<b>야 해요</b>, 먹다 → 먹어<b>야 해요</b>, 하다 → 해<b>야 해요</b>, 듣다 → 들어<b>야 해요</b>.</p>
<p>Vergangenheit: 가야 <b>했어요</b> (musste gehen).</p>`,
    drill: { kind: 'conj', forms: ['must'] },
    s: [['내일 일찍 일어나야 해요.', 'Morgen muss ich früh aufstehen.'], ['숙제를 해야 해요.', 'Ich muss Hausaufgaben machen.'], ['약을 먹어야 해요.', 'Ich muss Medizin nehmen.'],
      ['지금 가야 돼요.', 'Ich muss jetzt gehen.'], ['한국어를 매일 공부해야 해요.', 'Ich muss jeden Tag Koreanisch lernen.']],
    err: [['지금 가어야 해요.', '지금 가야 해요.', 1, '가 + 아 verschmilzt → 가야 해요.'],
      ['물을 많이 마시야 해요.', '물을 많이 마셔야 해요.', 2, '마시 + 어 → 마셔 → 마셔야 해요.']]
  });

  add({
    id: 'dont', level: 2, title: '-지 마세요 – „Bitte nicht …“',
    summary: 'Höfliches Verbot.',
    explain: `<p>Stamm + <b>지 마세요</b> = „Tun Sie das bitte nicht“. Der Stamm bleibt unverändert.</p>
<p>Umgangssprachlich (반말): Stamm + <b>지 마</b> → 걱정하지 마!</p>`,
    drill: { kind: 'conj', forms: ['dont'] },
    s: [['걱정하지 마세요.', 'Machen Sie sich keine Sorgen.'], ['여기서 담배를 피우지 마세요.', 'Rauchen Sie hier nicht.'], ['늦지 마세요.', 'Kommen Sie nicht zu spät.'],
      ['울지 마세요.', 'Weinen Sie nicht.'], ['사진을 찍지 마세요.', 'Machen Sie keine Fotos.']],
    err: [['여기에 앉으지 마세요.', '여기에 앉지 마세요.', 1, '-지 마세요 kommt direkt an den Stamm: 앉지.'],
      ['울어지 마세요.', '울지 마세요.', 0, '-지 kommt direkt an den Stamm: 울지 마세요.']]
  });

  add({
    id: 'reo', level: 2, title: '-(으)러 가요 – gehen, um zu …',
    summary: 'Zweck einer Bewegung (gehen/kommen).',
    explain: `<p>Stamm + <b>(으)러</b> + 가다/오다/다니다 = „gehen/kommen, um zu …“.</p>
<table><tr><th>Stamm</th><th>Beispiel</th></tr>
<tr><td>Vokal oder ㄹ</td><td>보다 → <b>보러</b> 가요, 놀다 → <b>놀러</b> 가요</td></tr>
<tr><td>Konsonant</td><td>먹다 → <b>먹으러</b> 가요</td></tr></table>`,
    drill: { kind: 'conj', forms: ['reo'] },
    s: [['밥 먹으러 가요.', 'Ich gehe essen.'], ['친구를 만나러 카페에 가요.', 'Ich gehe ins Café, um einen Freund zu treffen.'],
      ['한국어를 배우러 한국에 왔어요.', 'Ich bin nach Korea gekommen, um Koreanisch zu lernen.'], ['옷을 사러 시장에 갔어요.', 'Ich bin auf den Markt gegangen, um Kleidung zu kaufen.'],
      ['놀러 오세요!', 'Kommen Sie mal zu Besuch!']],
    err: [['책을 빌리으러 도서관에 가요.', '책을 빌리러 도서관에 가요.', 1, 'Stamm auf Vokal → -러.'],
      ['사진을 찍러 가요.', '사진을 찍으러 가요.', 1, 'Stamm auf Konsonant → -으러.']]
  });

  add({
    id: 'aseo', level: 2, title: '-아서 / -어서 – weil / und dann',
    summary: 'Grund oder zeitliche Abfolge.',
    explain: `<p>아/어-Form + <b>서</b> verbindet zwei Sätze:</p>
<ul><li><b>Grund</b>: 배가 고파<b>서</b> 먹었어요 (Weil ich Hunger hatte …)</li>
<li><b>Abfolge</b> (eng verbunden): 친구를 만나<b>서</b> 영화를 봤어요 (… getroffen und dann …)</li></ul>
<p><b>Wichtig:</b> Vor -아서 steht <b>nie</b> die Vergangenheit (nicht 바빴어서). Nicht mit Aufforderungen (-세요, -ㄹ까요) verwenden – dafür -(으)니까.</p>`,
    drill: { kind: 'conj', forms: ['because'] },
    s: [['배가 고파서 밥을 먹었어요.', 'Weil ich Hunger hatte, habe ich gegessen.'], ['시간이 없어서 못 갔어요.', 'Weil ich keine Zeit hatte, konnte ich nicht gehen.'],
      ['친구를 만나서 영화를 봤어요.', 'Ich habe einen Freund getroffen und (mit ihm) einen Film gesehen.'], ['비가 와서 집에 있었어요.', 'Weil es geregnet hat, war ich zu Hause.'],
      ['너무 피곤해서 일찍 잤어요.', 'Weil ich zu müde war, bin ich früh schlafen gegangen.']],
    err: [['어제 바빴어서 못 왔어요.', '어제 바빠서 못 왔어요.', 1, 'Keine Vergangenheit vor -아서: 바빠서.'],
      ['머리가 아퍼서 쉬었어요.', '머리가 아파서 쉬었어요.', 1, '아프다: vorherige Silbe hat ㅏ → 아파서.']]
  });

  add({
    id: 'nikka', level: 2, title: '-(으)니까 – weil, da',
    summary: 'Begründung, auch vor Bitten und Vorschlägen.',
    explain: `<p>Stamm + <b>(으)니까</b> = „weil / da“. Anders als -아서 kann danach eine <b>Aufforderung</b> oder ein <b>Vorschlag</b> folgen, und die Vergangenheit ist erlaubt (늦<b>었으니까</b>).</p>
<table><tr><th>Stamm</th><th>Beispiel</th></tr>
<tr><td>Vokal</td><td>바쁘다 → <b>바쁘니까</b></td></tr>
<tr><td>Konsonant</td><td>좋다 → <b>좋으니까</b></td></tr>
<tr><td>ㄹ-Stamm</td><td>살다 → <b>사니까</b></td></tr></table>`,
    drill: { kind: 'conj', forms: ['nikka'] },
    s: [['비가 오니까 우산을 가져가세요.', 'Es regnet, also nehmen Sie einen Regenschirm mit.'], ['늦었으니까 택시를 타요.', 'Weil es spät ist, nehmen wir ein Taxi.'],
      ['날씨가 좋으니까 산책할까요?', 'Das Wetter ist schön – wollen wir spazieren gehen?'], ['지금 바쁘니까 나중에 전화할게요.', 'Ich bin gerade beschäftigt, ich rufe später an.'],
      ['여기는 조용하니까 공부하기 좋아요.', 'Hier ist es ruhig, deshalb kann man gut lernen.']],
    err: [['날씨가 춥니까 집에 있어요.', '날씨가 추우니까 집에 있어요.', 1, 'ㅂ-unregelmäßig: 춥 + 으니까 → 추우니까.'],
      ['서울에 살으니까 자주 만나요.', '서울에 사니까 자주 만나요.', 1, 'ㄹ-Stamm: ㄹ fällt vor ㄴ weg → 사니까.']]
  });

  add({
    id: 'jiman', level: 2, title: '-지만 – aber',
    summary: 'Zwei Sätze mit „aber“ verbinden.',
    explain: `<p>Stamm + <b>지만</b> = „…, aber …“. Funktioniert mit allen Zeiten: 갔<b>지만</b>, 갈 거<b>지만</b>. Bei Nomen: 학생<b>이지만</b>.</p>`,
    drill: { kind: 'conj', forms: ['but'] },
    s: [['한국어는 어렵지만 재미있어요.', 'Koreanisch ist schwierig, aber es macht Spaß.'], ['이 식당은 비싸지만 맛있어요.', 'Dieses Restaurant ist teuer, aber lecker.'],
      ['피곤하지만 운동했어요.', 'Ich war müde, habe aber Sport gemacht.'], ['가고 싶지만 시간이 없어요.', 'Ich möchte gehen, aber ich habe keine Zeit.'], ['작지만 예뻐요.', 'Es ist klein, aber hübsch.']],
    err: [['어려워지만 재미있어요.', '어렵지만 재미있어요.', 0, '-지만 kommt direkt an den Stamm: 어렵지만.'],
      ['비싸요지만 좋아요.', '비싸지만 좋아요.', 0, '-지만 kommt an den Stamm, nicht an 비싸요.']]
  });

  add({
    id: 'go', level: 2, title: '-고 – und (Sätze verbinden)',
    summary: 'Aufzählen oder nacheinander tun.',
    explain: `<p>Stamm + <b>고</b> verbindet Sätze: Aufzählung („groß <b>und</b> sauber“) oder Reihenfolge („essen <b>und dann</b> …“). Der Stamm bleibt unverändert; die Zeit steht meist nur am Satzende.</p>`,
    drill: { kind: 'conj', forms: ['and'] },
    s: [['저는 밥을 먹고 커피를 마셨어요.', 'Ich habe gegessen und Kaffee getrunken.'], ['이 방은 넓고 깨끗해요.', 'Dieses Zimmer ist geräumig und sauber.'],
      ['숙제를 하고 잤어요.', 'Ich habe Hausaufgaben gemacht und dann geschlafen.'], ['형은 키가 크고 동생은 키가 작아요.', 'Der ältere Bruder ist groß und der jüngere klein.'],
      ['샤워하고 나갈게요.', 'Ich dusche und gehe dann raus.']],
    err: [['이 옷은 싸어고 예뻐요.', '이 옷은 싸고 예뻐요.', 2, '-고 kommt direkt an den Stamm: 싸고.'],
      ['음악을 들어고 공부해요.', '음악을 듣고 공부해요.', 1, 'Vor -고 bleibt ㄷ: 듣고.']]
  });

  add({
    id: 'lkkayo', level: 2, title: '-(으)ㄹ까요? – Sollen wir …?',
    summary: 'Vorschlag oder Frage nach Meinung.',
    explain: `<p>Stamm + <b>(으)ㄹ까요?</b> = „Sollen wir …?“ / „Soll ich …?“ / „Ob wohl …?“.</p>
<p>가다 → <b>갈까요?</b>, 먹다 → <b>먹을까요?</b>, 열다 → <b>열까요?</b>, 듣다 → <b>들을까요?</b></p>
<p>Antwort: 네, 같이 가요! / 좋아요!</p>`,
    drill: { kind: 'conj', forms: ['shallWe'] },
    s: [['같이 점심 먹을까요?', 'Wollen wir zusammen zu Mittag essen?'], ['커피 마실까요?', 'Sollen wir Kaffee trinken?'], ['몇 시에 만날까요?', 'Um wie viel Uhr sollen wir uns treffen?'],
      ['창문을 열까요?', 'Soll ich das Fenster öffnen?'], ['내일 비가 올까요?', 'Ob es morgen regnet?']],
    err: [['영화를 볼을까요?', '영화를 볼까요?', 1, 'Stamm auf Vokal → -ㄹ까요: 볼까요.'],
      ['음악을 듣을까요?', '음악을 들을까요?', 1, 'ㄷ-unregelmäßig → 들을까요.']]
  });

  add({
    id: 'myeon', level: 2, title: '-(으)면 – wenn, falls',
    summary: 'Bedingung.',
    explain: `<p>Stamm + <b>(으)면</b> = „wenn / falls“.</p>
<table><tr><th>Stamm</th><th>Beispiel</th></tr>
<tr><td>Vokal oder ㄹ</td><td>가다 → <b>가면</b>, 살다 → <b>살면</b></td></tr>
<tr><td>Konsonant</td><td>있다 → <b>있으면</b></td></tr>
<tr><td>ㅂ-unregelm.</td><td>덥다 → <b>더우면</b></td></tr></table>`,
    drill: { kind: 'conj', forms: ['if'] },
    s: [['시간이 있으면 같이 가요.', 'Wenn du Zeit hast, lass uns zusammen gehen.'], ['비가 오면 집에 있을 거예요.', 'Wenn es regnet, bleibe ich zu Hause.'],
      ['배가 고프면 이거 먹어요.', 'Wenn du Hunger hast, iss das hier.'], ['한국에 가면 김치찌개를 먹고 싶어요.', 'Wenn ich nach Korea fahre, möchte ich Kimchi-Eintopf essen.'],
      ['추우면 창문을 닫으세요.', 'Wenn Ihnen kalt ist, schließen Sie das Fenster.']],
    err: [['시간이 있면 전화하세요.', '시간이 있으면 전화하세요.', 1, 'Stamm auf Konsonant → -으면.'],
      ['날씨가 덥으면 수영해요.', '날씨가 더우면 수영해요.', 1, 'ㅂ-unregelmäßig: 덥 + 으면 → 더우면.']]
  });

  add({
    id: 'modifier', level: 2, title: 'Attribute -는 / -(으)ㄴ / -(으)ㄹ',
    summary: 'Nomen beschreiben: „das Buch, das ich lese“, „scharfes Essen“.',
    explain: `<p>Koreanische Relativsätze und Adjektive stehen <b>vor</b> dem Nomen.</p>
<table><tr><th></th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Adjektiv</td><td>-(으)ㄴ</td><td>크다 → <b>큰</b> 집, 작다 → <b>작은</b> 집, 맵다 → <b>매운</b> 음식</td></tr>
<tr><td>Verb (Gegenwart)</td><td>-는</td><td>읽다 → <b>읽는</b> 책, 살다 → <b>사는</b> 곳</td></tr>
<tr><td>Verb (Vergangenheit)</td><td>-(으)ㄴ</td><td>보다 → 어제 <b>본</b> 영화</td></tr>
<tr><td>Verb (Zukunft)</td><td>-(으)ㄹ</td><td>하다 → <b>할</b> 일</td></tr></table>
<p>있다/없다-Wörter nehmen -는: 맛있<b>는</b>, 재미있<b>는</b>.</p>`,
    drill: { kind: 'conj', forms: ['mod', 'modPast'] },
    s: [['저는 매운 음식을 좋아해요.', 'Ich mag scharfes Essen.'], ['지금 읽는 책이 재미있어요.', 'Das Buch, das ich gerade lese, ist interessant.'],
      ['어제 본 영화 제목이 뭐예요?', 'Wie heißt der Film, den du gestern gesehen hast?'], ['내일 할 일이 많아요.', 'Morgen habe ich viel zu tun.'],
      ['예쁜 꽃이 있어요.', 'Es gibt hübsche Blumen.'], ['맛있는 빵을 샀어요.', 'Ich habe leckeres Brot gekauft.']],
    err: [['맵는 음식을 못 먹어요.', '매운 음식을 못 먹어요.', 0, 'Adjektiv → -(으)ㄴ; ㅂ-unregelmäßig: 맵다 → 매운.'],
      ['서울에 살는 친구가 있어요.', '서울에 사는 친구가 있어요.', 1, 'ㄹ-Stamm: ㄹ fällt vor ㄴ weg → 사는.']]
  });

  add({
    id: 'boda', level: 2, title: '보다 (더) – Vergleich',
    summary: '„als“: A가 B보다 더 …',
    explain: `<p><b>보다</b> = „als“. Es steht hinter dem Nomen, mit dem verglichen wird. <b>더</b> (mehr) ist optional.</p>
<p>오늘이 어제<b>보다</b> (더) 추워요. = Heute ist es kälter als gestern.</p>
<p>Superlativ: <b>제일</b> / <b>가장</b> = am meisten: 제일 좋아해요.</p>`,
    s: [['오늘이 어제보다 더 추워요.', 'Heute ist es kälter als gestern.'], ['저는 커피보다 차를 더 좋아해요.', 'Ich mag Tee lieber als Kaffee.'],
      ['버스보다 지하철이 빨라요.', 'Die U-Bahn ist schneller als der Bus.'], ['형이 저보다 키가 커요.', 'Mein älterer Bruder ist größer als ich.'],
      ['제일 좋아하는 음식이 뭐예요?', 'Was ist dein Lieblingsessen?']],
    err: [['어제보다 오늘가 더 더워요.', '어제보다 오늘이 더 더워요.', 1, '오늘 endet auf Konsonant → 이.'],
      ['저는 차보다 커피을 더 좋아해요.', '저는 차보다 커피를 더 좋아해요.', 2, '커피 endet auf Vokal → 를.']],
    ch: [['버스___ 지하철이 빨라요.', ['보다', '도', '만'], '보다', 'Die U-Bahn ist schneller als der Bus.'],
      ['저는 여름보다 겨울을 ___ 좋아해요.', ['더', '제일', '만'], '더', 'Ich mag den Winter lieber als den Sommer.']]
  });

  add({
    id: 'euro', level: 2, title: '(으)로 – mit, nach, auf',
    summary: 'Mittel, Richtung, Sprache.',
    explain: `<p><b>(으)로</b> zeigt ein <b>Mittel</b> (mit dem Bus), eine <b>Richtung</b> (nach links) oder eine <b>Sprache</b> (auf Koreanisch).</p>
<table><tr><th>Nomen endet auf</th><th>Partikel</th><th>Beispiel</th></tr>
<tr><td>Vokal</td><td>로</td><td>버스<b>로</b></td></tr>
<tr><td>ㄹ</td><td>로</td><td>지하철<b>로</b></td></tr>
<tr><td>anderer Konsonant</td><td>으로</td><td>손<b>으로</b></td></tr></table>`,
    drill: { kind: 'particle', types: ['dir'] },
    s: [['지하철로 가요.', 'Ich fahre mit der U-Bahn.'], ['왼쪽으로 가세요.', 'Gehen Sie nach links.'], ['한국어로 말해 주세요.', 'Sprechen Sie bitte auf Koreanisch.'],
      ['연필로 쓰세요.', 'Schreiben Sie mit Bleistift.'], ['이 버스는 서울역으로 가요.', 'Dieser Bus fährt zum Bahnhof Seoul.']],
    err: [['버스으로 가요.', '버스로 가요.', 0, '버스 endet auf Vokal → 로.'],
      ['지하철으로 출근해요.', '지하철로 출근해요.', 0, 'Endung ㄹ → nur 로.']]
  });

  add({
    id: 'ege', level: 2, title: '에게 / 한테 – an, für (Personen)',
    summary: 'Empfänger bei Personen und Tieren (Dativ).',
    explain: `<p><b>에게</b> (schriftlich) / <b>한테</b> (gesprochen) markieren, <b>wem</b> man etwas gibt, schickt, sagt – nur bei <b>Personen und Tieren</b>. Bei Orten und Dingen steht <b>에</b>.</p>
<p>„Von jemandem“ bekommen: <b>에게서 / 한테서</b>.</p>`,
    s: [['친구에게 선물을 줬어요.', 'Ich habe meinem Freund ein Geschenk gegeben.'], ['엄마한테 전화했어요.', 'Ich habe Mama angerufen.'],
      ['동생한테 이메일을 보냈어요.', 'Ich habe meinem jüngeren Geschwister eine E-Mail geschickt.'], ['선생님한테서 책을 받았어요.', 'Ich habe vom Lehrer ein Buch bekommen.'],
      ['고양이한테 밥을 줬어요.', 'Ich habe der Katze Futter gegeben.']],
    err: [['친구에 편지를 썼어요.', '친구에게 편지를 썼어요.', 0, 'Bei Personen → 에게/한테.'],
      ['학교에게 가요.', '학교에 가요.', 0, 'Bei Orten → 에.']],
    ch: [['친구___ 선물을 줬어요.', ['에게', '에', '에서'], '에게', 'Ich habe meinem Freund ein Geschenk gegeben.'],
      ['꽃___ 물을 줬어요.', ['에', '에게'], '에', 'Ich habe die Blumen gegossen.'], ['언니___ 옷을 받았어요.', ['한테서', '한테', '에'], '한테서', 'Ich habe von meiner älteren Schwester Kleidung bekommen.']]
  });

  add({
    id: 'doman', level: 2, title: '도 / 만 – auch / nur',
    summary: 'Ersetzen 은/는, 이/가, 을/를.',
    explain: `<p><b>도</b> = auch, <b>만</b> = nur. Beide <b>ersetzen</b> die Partikel 은/는, 이/가, 을/를 (nicht 저는도!). Andere Partikel bleiben: 학교<b>에도</b>, 친구<b>한테만</b>.</p>`,
    s: [['저도 학생이에요.', 'Ich bin auch Student.'], ['커피도 마시고 차도 마셔요.', 'Ich trinke sowohl Kaffee als auch Tee.'], ['저는 물만 마셔요.', 'Ich trinke nur Wasser.'],
      ['오늘만 시간이 있어요.', 'Nur heute habe ich Zeit.'], ['동생도 한국어를 배워요.', 'Mein jüngeres Geschwister lernt auch Koreanisch.']],
    err: [['저는도 커피를 좋아해요.', '저도 커피를 좋아해요.', 0, '도 ersetzt 는: 저도.'],
      ['사과를만 먹었어요.', '사과만 먹었어요.', 0, '만 ersetzt 를: 사과만.']],
    ch: [['저___ 한국어를 공부해요. (Ich auch!)', ['도', '만', '는도'], '도'], ['물___ 주세요. (Nur Wasser, bitte.)', ['만', '도', '를만'], '만']]
  });

  add({
    id: 'buteo', level: 2, title: '부터 / 까지 – von … bis',
    summary: 'Zeitlich: 부터 … 까지. Örtlich: 에서 … 까지.',
    explain: `<table><tr><th></th><th>von</th><th>bis</th></tr>
<tr><td>Zeit</td><td><b>부터</b></td><td><b>까지</b></td></tr>
<tr><td>Ort</td><td><b>에서</b></td><td><b>까지</b></td></tr></table>
<p>아홉 시<b>부터</b> 여섯 시<b>까지</b> · 서울<b>에서</b> 부산<b>까지</b></p>`,
    s: [['아홉 시부터 여섯 시까지 일해요.', 'Ich arbeite von neun bis sechs Uhr.'], ['월요일부터 금요일까지 학교에 가요.', 'Von Montag bis Freitag gehe ich zur Schule.'],
      ['집에서 회사까지 얼마나 걸려요?', 'Wie lange dauert es von zu Hause bis zur Firma?'], ['서울에서 부산까지 기차로 가요.', 'Von Seoul nach Busan fahre ich mit dem Zug.'],
      ['내일부터 운동할 거예요.', 'Ab morgen werde ich Sport machen.']],
    err: [['집부터 학교까지 걸어가요.', '집에서 학교까지 걸어가요.', 0, 'Bei Orten: 에서 … 까지.'],
      ['세 시에서 다섯 시까지 공부해요.', '세 시부터 다섯 시까지 공부해요.', 1, 'Bei Zeit: 부터 … 까지.']]
  });

  add({
    id: 'formal', level: 2, title: 'Formell -ㅂ니다 / -습니다',
    summary: 'Sehr höflicher Stil (Nachrichten, Präsentationen, Service).',
    explain: `<table><tr><th>Stamm</th><th>Aussage</th><th>Frage</th></tr>
<tr><td>Vokal</td><td>-ㅂ니다: 갑니다</td><td>-ㅂ니까?: 갑니까?</td></tr>
<tr><td>Konsonant</td><td>-습니다: 먹습니다</td><td>-습니까?: 먹습니까?</td></tr>
<tr><td>ㄹ-Stamm</td><td>ㄹ fällt weg: 삽니다</td><td>삽니까?</td></tr></table>
<p>Vergangenheit: 갔<b>습니다</b>, 먹었<b>습니다</b>. Nomen: 학생<b>입니다</b>.</p>`,
    drill: { kind: 'conj', forms: ['formal', 'formalPast'] },
    s: [['감사합니다.', 'Vielen Dank.'], ['만나서 반갑습니다.', 'Freut mich, Sie kennenzulernen.'], ['저는 독일에서 왔습니다.', 'Ich komme aus Deutschland.'],
      ['회의는 세 시에 시작합니다.', 'Die Besprechung beginnt um drei Uhr.'], ['이 버스는 시청에 갑니까?', 'Fährt dieser Bus zum Rathaus?'], ['저는 서울에 삽니다.', 'Ich wohne in Seoul.']],
    err: [['저는 책을 읽읍니다.', '저는 책을 읽습니다.', 2, 'Stamm auf Konsonant → -습니다.'],
      ['서울에 살습니다.', '서울에 삽니다.', 1, 'ㄹ-Stamm: ㄹ fällt weg → 삽니다.']]
  });

  add({
    id: 'juseyo', level: 2, title: '-아 / -어 주세요 – Bitte tun Sie …',
    summary: 'Um einen Gefallen bitten.',
    explain: `<p>아/어-Form + <b>주세요</b> = „Bitte tun Sie (für mich) …“.</p>
<p>말하다 → 말<b>해 주세요</b>, 기다리다 → 기다<b>려 주세요</b>, 쓰다 → <b>써 주세요</b>, 돕다 → <b>도와주세요</b>.</p>
<p>Mit Nomen allein: 물 <b>주세요</b> (Wasser, bitte).</p>`,
    drill: { kind: 'conj', forms: ['please'] },
    s: [['물 좀 주세요.', 'Etwas Wasser, bitte.'], ['천천히 말해 주세요.', 'Sprechen Sie bitte langsam.'], ['사진 좀 찍어 주세요.', 'Machen Sie bitte ein Foto (von uns).'],
      ['문을 열어 주세요.', 'Öffnen Sie bitte die Tür.'], ['잠깐만 기다려 주세요.', 'Warten Sie bitte einen Moment.']],
    err: [['여기에 이름을 쓰어 주세요.', '여기에 이름을 써 주세요.', 2, '쓰 + 어 → 써.'],
      ['다시 한 번 말하어 주세요.', '다시 한 번 말해 주세요.', 3, '하 + 어 → 해.']]
  });

  add({
    id: 'lgeyo', level: 2, title: '-(으)ㄹ게요 – Ich werde … (Zusage)',
    summary: 'Versprechen / Ankündigung gegenüber dem Gegenüber.',
    explain: `<p>Stamm + <b>(으)ㄹ게요</b> = „Ich werde (für dich / jetzt) …“ – eine Zusage, nur für die 1. Person.</p>
<p>Unterschied zu -(으)ㄹ 거예요: 거예요 = Plan/Vorhersage; ㄹ게요 = Reaktion, Versprechen.</p>
<p>하다 → <b>할게요</b>, 먹다 → <b>먹을게요</b>, 열다 → <b>열게요</b>, 돕다 → <b>도울게요</b>.</p>`,
    drill: { kind: 'conj', forms: ['promise'] },
    s: [['내일 전화할게요.', 'Ich rufe dich morgen an.'], ['제가 할게요.', 'Ich mach das.'], ['여기서 기다릴게요.', 'Ich warte hier.'],
      ['먼저 갈게요.', 'Ich gehe schon mal.'], ['이거 먹을게요.', 'Ich nehme das hier.']],
    err: [['제가 도와을게요.', '제가 도울게요.', 1, 'ㅂ-unregelmäßig: 돕 + 을게요 → 도울게요.'],
      ['조금 이따가 문을 열을게요.', '조금 이따가 문을 열게요.', 3, 'ㄹ-Stamm: kein 으 → 열게요.']]
  });

  add({
    id: 'beforeafter', level: 2, title: '-기 전에 / -(으)ㄴ 후에 – vor / nach',
    summary: 'Bevor … / Nachdem …',
    explain: `<table><tr><th></th><th>Form</th><th>Beispiel</th></tr>
<tr><td>bevor</td><td>Stamm + <b>기 전에</b></td><td>자<b>기 전에</b></td></tr>
<tr><td>nachdem</td><td>Stamm + <b>(으)ㄴ 후에</b></td><td>먹<b>은 후에</b>, 끝<b>난 후에</b></td></tr></table>
<p>Mit Nomen: 수업 <b>전에</b>, 수업 <b>후에</b>. Statt 후에 hört man auch <b>다음에</b>.</p>`,
    drill: { kind: 'conj', forms: ['before', 'after'] },
    s: [['자기 전에 책을 읽어요.', 'Vor dem Schlafen lese ich ein Buch.'], ['밥을 먹기 전에 손을 씻으세요.', 'Waschen Sie sich vor dem Essen die Hände.'],
      ['수업이 끝난 후에 만나요.', 'Lass uns nach dem Unterricht treffen.'], ['일을 한 후에 운동해요.', 'Nach der Arbeit mache ich Sport.'],
      ['한국에 가기 전에 한국어를 배우고 싶어요.', 'Bevor ich nach Korea fahre, möchte ich Koreanisch lernen.']],
    err: [['자는 전에 이를 닦아요.', '자기 전에 이를 닦아요.', 0, 'bevor → Stamm + 기 전에.'],
      ['밥을 먹는 후에 커피를 마셔요.', '밥을 먹은 후에 커피를 마셔요.', 1, 'nachdem → Stamm + (으)ㄴ 후에.']]
  });

  add({
    id: 'banmal', level: 2, title: '반말 – Umgangssprache unter Freunden',
    summary: 'Informeller Stil: 요 weglassen.',
    explain: `<p>Unter engen Freunden / Jüngeren: einfach <b>요</b> weglassen.</p>
<table><tr><th>höflich</th><th>반말</th></tr>
<tr><td>가요</td><td><b>가</b></td></tr><tr><td>먹었어요</td><td><b>먹었어</b></td></tr>
<tr><td>학생이에요</td><td>학생<b>이야</b> / 친구<b>야</b></td></tr>
<tr><td>저, 제가</td><td><b>나, 내가</b></td></tr><tr><td>네 / 아니요</td><td><b>응 / 아니</b></td></tr></table>`,
    drill: { kind: 'conj', forms: ['casual', 'casualPast'] },
    s: [['뭐 해?', 'Was machst du?'], ['밥 먹었어?', 'Hast du gegessen?'], ['나 지금 바빠.', 'Ich bin gerade beschäftigt.'],
      ['내일 보자!', 'Bis morgen!'], ['고마워.', 'Danke.']],
    err: [['저 지금 바빠.', '나 지금 바빠.', 0, 'Im 반말 sagt man 나 statt 저.'],
      ['응, 나도 학생이에요.', '응, 나도 학생이야.', 2, 'Im 반말: 이에요 → 이야.']]
  });

  /* ───────────── LEVEL 3 ───────────── */
  add({
    id: 'irregular', level: 3, title: 'Unregelmäßige Verben – Überblick',
    summary: 'ㅂ, ㄷ, ㅅ, 르, ㅎ, ㄹ und 으 – alle Regeln auf einen Blick.',
    explain: `<table><tr><th>Typ</th><th>Regel</th><th>vor 아/어</th><th>vor 으</th><th>vor Konsonant</th></tr>
<tr><td><b>ㅂ</b></td><td>ㅂ → 우</td><td>춥다 → 추워요</td><td>추우면</td><td>춥고</td></tr>
<tr><td><b>ㄷ</b></td><td>ㄷ → ㄹ</td><td>듣다 → 들어요</td><td>들으면</td><td>듣고</td></tr>
<tr><td><b>ㅅ</b></td><td>ㅅ fällt weg</td><td>낫다 → 나아요</td><td>나으면</td><td>낫고</td></tr>
<tr><td><b>르</b></td><td>르 → ㄹ라/ㄹ러</td><td>모르다 → 몰라요</td><td>모르면</td><td>모르고</td></tr>
<tr><td><b>ㅎ</b></td><td>ㅎ fällt weg</td><td>그렇다 → 그래요</td><td>그러면</td><td>그렇고</td></tr>
<tr><td><b>ㄹ</b></td><td>ㄹ fällt vor ㄴ/ㅂ/ㅅ weg</td><td>살다 → 살아요</td><td>살면, 사세요</td><td>살고, 사는</td></tr>
<tr><td><b>으</b></td><td>ㅡ fällt vor 아/어 weg</td><td>바쁘다 → 바빠요</td><td>바쁘면</td><td>바쁘고</td></tr></table>
<p><b>Regelmäßige Ausnahmen</b> (sehen gleich aus, sind aber regelmäßig): 입다 → 입어요, 좁다 → 좁아요, 받다 → 받아요, 닫다 → 닫아요, 씻다 → 씻어요, 웃다 → 웃어요, 좋다 → 좋아요, 넣다 → 넣어요.</p>`,
    drill: { kind: 'conj', forms: ['present', 'past', 'future', 'if', 'honorific'], irregularOnly: true },
    s: [['이 노래를 들어 보세요.', 'Hören Sie sich dieses Lied an.'], ['오늘 너무 더워요.', 'Heute ist es zu heiß.'], ['길을 몰라요.', 'Ich kenne den Weg nicht.'],
      ['감기가 다 나았어요.', 'Die Erkältung ist ganz ausgeheilt.'], ['하늘이 정말 파래요.', 'Der Himmel ist wirklich blau.'], ['친구를 도와줬어요.', 'Ich habe meinem Freund geholfen.']],
    err: [['어제 많이 걷었어요.', '어제 많이 걸었어요.', 2, 'ㄷ-unregelmäßig: 걷 + 었어요 → 걸었어요.'],
      ['오늘은 날씨가 춥어요.', '오늘은 날씨가 추워요.', 2, 'ㅂ-unregelmäßig: 춥 + 어요 → 추워요.'],
      ['저는 그 사람을 모라요.', '저는 그 사람을 몰라요.', 3, '르-unregelmäßig: 모르 + 아요 → 몰라요.']]
  });

  /* ───────── LEVEL 3: aus den eigenen Lernnotizen ───────── */
  add({
    id: 'geotgatda', level: 3, title: '-것 같아요 – „ich glaube / scheint“',
    summary: 'Vermutung oder vorsichtige Meinung.',
    explain: `<p>Mit <b>것 같아요</b> vermutet man etwas oder macht eine Aussage weicher („ich glaube …“). Davor steht eine Attributform:</p>
<table><tr><th></th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Verb, jetzt</td><td>-는 것 같아요</td><td>비가 오<b>는 것 같아요</b> (es regnet wohl gerade)</td></tr>
<tr><td>Verb, vorbei</td><td>-(으)ㄴ 것 같아요</td><td>비가 <b>온 것 같아요</b> (es hat wohl geregnet)</td></tr>
<tr><td>Zukunft / Vermutung</td><td>-(으)ㄹ 것 같아요</td><td>비가 <b>올 것 같아요</b> (es wird wohl regnen)</td></tr>
<tr><td>Adjektiv</td><td>-(으)ㄴ 것 같아요</td><td>바<b>쁜 것 같아요</b></td></tr>
<tr><td>Nomen</td><td>-인 것 같아요</td><td>학생<b>인 것 같아요</b></td></tr></table>`,
    drill: { kind: 'conj', forms: ['seemNow', 'seemPast', 'seemFut'] },
    s: [['밖에 비가 오는 것 같아요.', 'Draußen regnet es anscheinend.'], ['내일 비가 올 것 같아요.', 'Ich glaube, morgen regnet es.'],
      ['그 사람은 학생인 것 같아요.', 'Diese Person ist wohl Student(in).'], ['이 옷이 좀 작은 것 같아요.', 'Ich glaube, diese Kleidung ist etwas klein.'],
      ['민수 씨가 벌써 집에 간 것 같아요.', 'Minsu ist wohl schon nach Hause gegangen.'], ['힘들 것 같아요.', 'Das wird wohl schwierig.']],
    err: [['밖에 비가 오은 것 같아요.', '밖에 비가 오는 것 같아요.', 2, 'Verb in der Gegenwart → -는 것 같아요.'],
      ['이 가방이 비싸는 것 같아요.', '이 가방이 비싼 것 같아요.', 2, 'Adjektiv → -(으)ㄴ 것 같아요.']]
  });

  add({
    id: 'eojida', level: 3, title: '-아/어지다 – „… werden“',
    summary: 'Zustandsänderung bei Adjektiven.',
    explain: `<p>Adjektiv in der 아/어-Form + <b>지다</b> = „… werden“. Meist in der Vergangenheit: <b>-아/어졌어요</b>.</p>
<p>따뜻하다 → 따뜻<b>해졌어요</b>, 춥다 → 추<b>워졌어요</b>, 예쁘다 → 예<b>뻐졌어요</b>, 빨갛다 → 빨<b>개졌어요</b>.</p>
<p>Laufende Veränderung: 점점 추워<b>져요</b> (es wird immer kälter).</p>`,
    drill: { kind: 'conj', forms: ['become'] },
    s: [['날씨가 따뜻해졌어요.', 'Das Wetter ist warm geworden.'], ['요즘 많이 추워졌어요.', 'In letzter Zeit ist es sehr kalt geworden.'],
      ['한국어가 점점 재미있어져요.', 'Koreanisch wird immer interessanter.'], ['얼굴이 빨개졌어요.', 'Das Gesicht ist rot geworden.'], ['방이 깨끗해졌어요.', 'Das Zimmer ist sauber geworden.']],
    err: [['날씨가 추어졌어요.', '날씨가 추워졌어요.', 1, 'ㅂ-unregelmäßig: 춥 → 추워 + 졌어요.'],
      ['방이 깨끗하졌어요.', '방이 깨끗해졌어요.', 1, '하 + 어 → 해 → 해졌어요.']]
  });

  add({
    id: 'gedoeda', level: 3, title: '-게 되다 – „es ergab sich, dass …“',
    summary: 'Veränderung ohne eigene Absicht, „schließlich“.',
    explain: `<p>Stamm + <b>게 되다</b>: Etwas passiert durch die Umstände, nicht aus eigener Entscheidung – „es kam so, dass …“, „schließlich …“. Meist in der Vergangenheit: <b>-게 됐어요</b>.</p>
<p>Mit Können: -(으)ㄹ 수 있<b>게 됐어요</b> = jetzt kann ich es.</p>`,
    drill: { kind: 'conj', forms: ['cameTo'] },
    s: [['한국 회사에서 일하게 됐어요.', 'Es hat sich ergeben, dass ich in einer koreanischen Firma arbeite.'], ['지난주에 영화를 보게 됐어요.', 'Letzte Woche habe ich dann doch einen Film geschaut.'],
      ['그 사람을 좋아하게 됐어요.', 'Ich habe angefangen, diese Person zu mögen.'], ['이제 한국어를 읽을 수 있게 됐어요.', 'Jetzt kann ich Koreanisch lesen.'],
      ['결국 그렇게 하게 될 거예요.', 'Am Ende wirst du es so machen.']],
    err: [['서울에 살게 돼었어요.', '서울에 살게 됐어요.', 2, '되 + 었어요 verschmilzt zu 됐어요.'],
      ['한국어를 배우어게 됐어요.', '한국어를 배우게 됐어요.', 1, '-게 kommt direkt an den Stamm: 배우게.']]
  });

  add({
    id: 'geodeunyo', level: 3, title: '-거든요 – „… nämlich“',
    summary: 'Begründung oder Hintergrund, den der andere nicht kennt.',
    explain: `<p>Stamm + <b>거든요</b> liefert einen Grund oder eine Hintergrundinfo, die der Gesprächspartner noch nicht kennt – wie „… nämlich“.</p>
<p>Vergangenheit: 바빴<b>거든요</b>. Nomen: 학생<b>이거든요</b> / 친구<b>거든요</b>.</p>
<p>Auch um ein Thema einzuleiten: 제가 어제 영화를 봤<b>거든요</b>. 그런데 … (Ich habe gestern einen Film gesehen, und …)</p>`,
    drill: { kind: 'conj', forms: ['geodeun'] },
    s: [['오늘은 못 가요. 일이 많거든요.', 'Heute kann ich nicht. Ich habe nämlich viel Arbeit.'], ['저는 김치를 잘 먹어요. 한국에서 살았거든요.', 'Ich esse gern Kimchi. Ich habe nämlich in Korea gelebt.'],
      ['이 카페 알아요? 커피가 정말 맛있거든요.', 'Kennst du dieses Café? Der Kaffee ist nämlich richtig lecker.'], ['내일 시험이 있거든요.', 'Ich habe nämlich morgen eine Prüfung.'],
      ['제가 요즘 바쁘거든요.', 'Ich bin zurzeit nämlich beschäftigt.']],
    err: [['어제 많이 바빴어거든요.', '어제 많이 바빴거든요.', 2, 'Vergangenheit: 바빴 + 거든요.'],
      ['제가 학생거든요.', '제가 학생이거든요.', 1, 'Nomen auf Konsonant + 이거든요.']]
  });

  add({
    id: 'deoragoyo', level: 3, title: '-더라고요 – „mir ist aufgefallen …“',
    summary: 'Von eigenen Beobachtungen erzählen.',
    explain: `<p>Stamm + <b>더라고요</b>: Man berichtet, was man selbst gesehen, gehört oder erlebt hat – oft mit leichter Überraschung („ich habe festgestellt, dass …“).</p>
<p>Gilt meist für andere Personen oder Dinge, nicht für die eigenen Handlungen. Eigene Gefühle gehen aber: 저는 좀 무섭<b>더라고요</b>.</p>`,
    drill: { kind: 'conj', forms: ['deora'] },
    s: [['그 영화 정말 재미있더라고요.', 'Der Film war richtig gut, fand ich.'], ['한국 사람들은 정말 빨리 걷더라고요.', 'Mir ist aufgefallen, dass Koreaner richtig schnell gehen.'],
      ['어제 가 보니까 사람이 많더라고요.', 'Als ich gestern hinging, waren viele Leute da.'], ['그 식당 음식이 좀 맵더라고요.', 'Das Essen in dem Restaurant war ziemlich scharf.'],
      ['민수 씨가 노래를 잘 부르더라고요.', 'Minsu singt richtig gut, wie ich gemerkt habe.']],
    err: [['날씨가 정말 춥워더라고요.', '날씨가 정말 춥더라고요.', 2, '-더라고요 kommt direkt an den Stamm: 춥더라고요.'],
      ['서울은 정말 크어더라고요.', '서울은 정말 크더라고요.', 2, '-더라고요 kommt direkt an den Stamm: 크더라고요.']]
  });

  add({
    id: 'ryeogo', level: 3, title: '-(으)려고 하다 – vorhaben',
    summary: 'Absicht, Plan; -(으)려고 = um zu.',
    explain: `<table><tr><th>Stamm</th><th>Beispiel</th></tr>
<tr><td>Vokal oder ㄹ</td><td>가다 → <b>가려고 해요</b>, 살다 → <b>살려고 해요</b></td></tr>
<tr><td>Konsonant</td><td>먹다 → <b>먹으려고 해요</b></td></tr>
<tr><td>unregelmäßig</td><td>듣다 → 들으려고, 돕다 → 도우려고</td></tr></table>
<p>Ohne 하다 heißt es „um zu“: 배우<b>려고</b> 책을 샀어요.</p>`,
    drill: { kind: 'conj', forms: ['intend'] },
    s: [['주말에 친구를 만나려고 해요.', 'Ich habe vor, am Wochenende einen Freund zu treffen.'], ['내년에 한국에 가려고 해요.', 'Ich habe vor, nächstes Jahr nach Korea zu fahren.'],
      ['오늘은 일찍 자려고 해요.', 'Heute will ich früh schlafen gehen.'], ['한국어를 배우려고 책을 샀어요.', 'Ich habe ein Buch gekauft, um Koreanisch zu lernen.'],
      ['점심에 비빔밥을 먹으려고 해요.', 'Zu Mittag will ich Bibimbap essen.']],
    err: [['저녁에 책을 읽려고 해요.', '저녁에 책을 읽으려고 해요.', 2, 'Stamm auf Konsonant → -으려고.'],
      ['서울에서 살으려고 해요.', '서울에서 살려고 해요.', 1, 'ㄹ-Stamm: kein 으 → 살려고.']]
  });

  add({
    id: 'jeok', level: 3, title: '-(으)ㄴ 적이 있다/없다 – Erfahrung',
    summary: '„schon einmal“ / „noch nie“.',
    explain: `<p>Vergangenheitsattribut -(으)ㄴ + <b>적이 있어요</b> = schon einmal getan; <b>적이 없어요</b> = noch nie getan.</p>
<p>Sehr oft mit -아/어 보다 (ausprobieren): 가 <b>본 적이 있어요?</b> = Warst du schon einmal dort?</p>`,
    drill: { kind: 'conj', forms: ['expYes', 'expNo'] },
    s: [['한국에 가 본 적이 있어요?', 'Warst du schon einmal in Korea?'], ['저는 김치를 만든 적이 없어요.', 'Ich habe noch nie Kimchi gemacht.'],
      ['그 영화를 본 적이 있어요.', 'Ich habe den Film schon einmal gesehen.'], ['이런 경험은 한 번도 한 적이 없어요.', 'So eine Erfahrung habe ich noch nie gemacht.'],
      ['한국 노래를 불러 본 적이 있어요.', 'Ich habe schon mal ein koreanisches Lied gesungen.']],
    err: [['저는 한국에 가는 적이 없어요.', '저는 한국에 간 적이 없어요.', 2, 'Erfahrung → Vergangenheitsattribut -(으)ㄴ: 간.'],
      ['그 사람을 만나은 적이 있어요.', '그 사람을 만난 적이 있어요.', 2, 'Stamm auf Vokal → -ㄴ: 만난.']]
  });

  add({
    id: 'ttae', level: 3, title: '-(으)ㄹ 때 – „wenn / als“',
    summary: 'Zeitpunkt einer Handlung.',
    explain: `<p>Stamm + <b>(으)ㄹ 때</b> = „wenn / während“. Für Abgeschlossenes in der Vergangenheit: <b>-았/었을 때</b> (만났<b>을 때</b> = als wir uns trafen).</p>
<p>갈 때, 먹을 때, 살 때 (ㄹ-Stamm), 들을 때 (ㄷ), 추울 때 (ㅂ). Mit Nomen: 학생 <b>때</b>, 방학 <b>때</b>.</p>`,
    drill: { kind: 'conj', forms: ['when'] },
    s: [['처음 만났을 때 정말 어색했어요.', 'Als wir uns zum ersten Mal trafen, war es richtig peinlich.'], ['밥 먹을 때 휴대폰을 보지 마세요.', 'Schau beim Essen nicht aufs Handy.'],
      ['모를 때는 물어보세요.', 'Wenn Sie etwas nicht wissen, fragen Sie.'], ['아플 때는 푹 쉬어야 해요.', 'Wenn man krank ist, muss man sich gut ausruhen.'],
      ['학생 때 서울에 살았어요.', 'Als Student(in) habe ich in Seoul gewohnt.']],
    err: [['집에 가을 때 전화하세요.', '집에 갈 때 전화하세요.', 1, 'Stamm auf Vokal → -ㄹ 때: 갈 때.'],
      ['음악을 듣을 때 행복해요.', '음악을 들을 때 행복해요.', 1, 'ㄷ-unregelmäßig: vor 으 wird ㄷ zu ㄹ.']]
  });

  add({
    id: 'ttaemune', level: 3, title: '때문에 / -기 때문에 – wegen, weil',
    summary: 'Grund (betont, eher schriftlich).',
    explain: `<p><b>Nomen + 때문에</b> = wegen (ohne Partikel dazwischen): 비 <b>때문에</b>.</p>
<p><b>Stamm + 기 때문에</b> = weil: 시간이 없<b>기 때문에</b>. Vergangenheit: 늦었<b>기 때문에</b>.</p>
<p>Wie -아서 nicht vor Aufforderungen oder Vorschlägen – dafür -(으)니까.</p>`,
    drill: { kind: 'conj', forms: ['becauseGi'] },
    s: [['비 때문에 못 갔어요.', 'Wegen des Regens konnte ich nicht gehen.'], ['일 때문에 늦었어요.', 'Ich bin wegen der Arbeit zu spät.'],
      ['시간이 없기 때문에 택시를 탔어요.', 'Weil ich keine Zeit hatte, habe ich ein Taxi genommen.'], ['너무 피곤하기 때문에 일찍 잘 거예요.', 'Weil ich so müde bin, gehe ich früh schlafen.'],
      ['감기 때문에 머리가 아파요.', 'Wegen der Erkältung habe ich Kopfschmerzen.']],
    err: [['시간이 없어서 때문에 못 가요.', '시간이 없기 때문에 못 가요.', 1, 'Stamm + 기 때문에: 없기 때문에.'],
      ['감기가 때문에 쉬었어요.', '감기 때문에 쉬었어요.', 0, 'Nomen + 때문에, ohne Partikel.']]
  });

  add({
    id: 'gonaseo', level: 3, title: '-고 나서 – nachdem',
    summary: 'Eine Handlung ist abgeschlossen, dann folgt die nächste.',
    explain: `<p>Stamm + <b>고 나서</b> = „nachdem (das erledigt ist)“. Keine Vergangenheit vor -고 나서; die Zeit steht am Satzende.</p>
<p>Ähnlich wie -(으)ㄴ 후에, aber betont stärker, dass die erste Handlung fertig ist.</p>`,
    drill: { kind: 'conj', forms: ['afterGo'] },
    s: [['밥을 먹고 나서 커피를 마셔요.', 'Nachdem ich gegessen habe, trinke ich Kaffee.'], ['숙제를 하고 나서 놀 거예요.', 'Nach den Hausaufgaben werde ich spielen.'],
      ['영화를 보고 나서 집에 갔어요.', 'Nach dem Film bin ich nach Hause gegangen.'], ['샤워하고 나서 잤어요.', 'Nach dem Duschen habe ich geschlafen.'],
      ['운동하고 나서 물을 많이 마셨어요.', 'Nach dem Sport habe ich viel Wasser getrunken.']],
    err: [['밥을 먹었고 나서 쉬었어요.', '밥을 먹고 나서 쉬었어요.', 1, 'Keine Vergangenheit vor -고 나서.'],
      ['음악을 들고 나서 잤어요.', '음악을 듣고 나서 잤어요.', 1, 'Vor -고 bleibt ㄷ: 듣고.']]
  });

  add({
    id: 'ppunman', level: 3, title: '-뿐만 아니라 – nicht nur … sondern auch',
    summary: 'Aufzählung mit Steigerung.',
    explain: `<p><b>Nomen + 뿐만 아니라</b>: 한국어<b>뿐만 아니라</b> 일본어<b>도</b> …</p>
<p><b>Stamm + (으)ㄹ 뿐만 아니라</b>: 싸다 → <b>쌀 뿐만 아니라</b>, 맛있다 → 맛있<b>을 뿐만 아니라</b>.</p>
<p>Im zweiten Teil steht oft <b>도</b> (auch).</p>`,
    drill: { kind: 'conj', forms: ['notOnly'] },
    s: [['이 식당은 쌀 뿐만 아니라 맛있어요.', 'Dieses Restaurant ist nicht nur billig, sondern auch lecker.'], ['그 사람은 노래뿐만 아니라 춤도 잘해요.', 'Diese Person kann nicht nur gut singen, sondern auch tanzen.'],
      ['한국어뿐만 아니라 일본어도 배워요.', 'Ich lerne nicht nur Koreanisch, sondern auch Japanisch.'], ['오늘은 추울 뿐만 아니라 바람도 많이 불어요.', 'Heute ist es nicht nur kalt, sondern auch sehr windig.']],
    err: [['이 옷은 싸는 뿐만 아니라 예뻐요.', '이 옷은 쌀 뿐만 아니라 예뻐요.', 2, 'Stamm + (으)ㄹ 뿐만 아니라: 쌀.'],
      ['커피뿐만 아니라 차를 마셔요.', '커피뿐만 아니라 차도 마셔요.', 2, 'Im zweiten Teil 도 (auch): 차도.']]
  });

  add({
    id: 'ppeon', level: 3, title: '-(으)ㄹ 뻔하다 – fast, beinahe',
    summary: 'Etwas wäre fast passiert.',
    explain: `<p>Stamm + <b>(으)ㄹ 뻔했어요</b> = „fast wäre …“ – es ist aber nicht passiert. Steht immer in der Vergangenheit.</p>
<p>믿다 → 믿<b>을 뻔했어요</b>, 늦다 → 늦<b>을 뻔했어요</b>, 넘어지다 → 넘어<b>질 뻔했어요</b>.</p>`,
    drill: { kind: 'conj', forms: ['almost'] },
    s: [['믿을 뻔했어요!', 'Fast hätte ich es geglaubt!'], ['버스를 놓칠 뻔했어요.', 'Fast hätte ich den Bus verpasst.'], ['넘어질 뻔했어요.', 'Ich wäre fast hingefallen.'],
      ['늦을 뻔했어요.', 'Ich wäre fast zu spät gekommen.'], ['큰일 날 뻔했어요.', 'Das wäre fast schiefgegangen.']],
    err: [['버스를 놓치을 뻔했어요.', '버스를 놓칠 뻔했어요.', 1, 'Stamm auf Vokal → -ㄹ 뻔했어요.'],
      ['어제 넘어질 뻔해요.', '어제 넘어질 뻔했어요.', 2, '뻔하다 steht immer in der Vergangenheit.']]
  });

  add({
    id: 'pyeon', level: 3, title: '-는/-(으)ㄴ 편이다 – eher, ziemlich',
    summary: 'Eine Neigung beschreiben, Aussagen abschwächen.',
    explain: `<p>Attributform + <b>편이에요</b> = „eher / ziemlich / neigt dazu“.</p>
<table><tr><th></th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Verb</td><td>-는 편이에요</td><td>일찍 일어나<b>는 편이에요</b></td></tr>
<tr><td>Adjektiv</td><td>-(으)ㄴ 편이에요</td><td>키가 <b>큰 편이에요</b></td></tr></table>`,
    drill: { kind: 'conj', forms: ['tend'] },
    s: [['저는 매운 음식을 잘 먹는 편이에요.', 'Ich esse eher gern scharf.'], ['이 동네는 조용한 편이에요.', 'Diese Gegend ist eher ruhig.'],
      ['동생은 키가 큰 편이에요.', 'Mein jüngeres Geschwister ist ziemlich groß.'], ['저는 일찍 일어나는 편이에요.', 'Ich stehe eher früh auf.'], ['한국어는 어려운 편이에요.', 'Koreanisch ist eher schwierig.']],
    err: [['이 가방은 비싸는 편이에요.', '이 가방은 비싼 편이에요.', 2, 'Adjektiv → -(으)ㄴ 편이에요.'],
      ['저는 자주 운동한 편이에요.', '저는 자주 운동하는 편이에요.', 2, 'Gewohnheit bei Verben → -는 편이에요.']]
  });

  add({
    id: 'cheok', level: 3, title: '-는 척하다 – so tun, als ob',
    summary: 'Etwas vortäuschen.',
    explain: `<p>Attributform + <b>척하다</b> = „so tun, als ob“.</p>
<p>Verb: 자<b>는 척</b>해요 (tut so, als schliefe er). Vergangenes: 못 들<b>은 척</b>했어요. Adjektiv: 아<b>픈 척</b>해요.</p>`,
    drill: { kind: 'conj', forms: ['pretend'] },
    s: [['동생이 자는 척했어요.', 'Mein jüngeres Geschwister hat so getan, als ob es schläft.'], ['모르는 척하지 마세요.', 'Tun Sie nicht so, als wüssten Sie es nicht.'],
      ['못 들은 척했어요.', 'Ich habe so getan, als hätte ich es nicht gehört.'], ['아픈 척하지 마!', 'Tu nicht so, als wärst du krank!'], ['그 사람은 항상 바쁜 척해요.', 'Diese Person tut immer so, als wäre sie beschäftigt.']],
    err: [['자은 척했어요.', '자는 척했어요.', 0, 'Verb in der Gegenwart → -는 척.'],
      ['아프는 척하지 마세요.', '아픈 척하지 마세요.', 0, 'Adjektiv → -(으)ㄴ 척.']]
  });

  add({
    id: 'quote', level: 3, title: 'Indirekte Rede -다고 해요 / -(이)라고 해요',
    summary: '„Er sagt, dass …“, „es heißt, …“ – und die Kurzform -대요.',
    explain: `<table><tr><th></th><th>Form</th><th>Kurzform</th><th>Beispiel</th></tr>
<tr><td>Verb (Vokal / ㄹ)</td><td>-ㄴ다고 해요</td><td>-ㄴ대요</td><td>간다고 해요 → <b>간대요</b></td></tr>
<tr><td>Verb (Konsonant)</td><td>-는다고 해요</td><td>-는대요</td><td>먹는다고 해요 → <b>먹는대요</b></td></tr>
<tr><td>Adjektiv, 있다/없다</td><td>-다고 해요</td><td>-대요</td><td>바쁘다고 해요 → <b>바쁘대요</b></td></tr>
<tr><td>Vergangenheit</td><td>-았/었다고 해요</td><td>-았/었대요</td><td><b>갔대요</b></td></tr>
<tr><td>Nomen</td><td>-(이)라고 해요</td><td>-(이)래요</td><td>학생<b>이래요</b>, 의사<b>래요</b></td></tr></table>
<p>Sich vorstellen: 저는 민수<b>라고 해요</b> = Ich heiße Minsu.</p>`,
    drill: { kind: 'conj', forms: ['quote'] },
    s: [['내일 비가 온다고 해요.', 'Es heißt, morgen regnet es.'], ['민수 씨가 바쁘대요.', 'Minsu sagt, er ist beschäftigt.'], ['저는 민수라고 해요.', 'Ich heiße Minsu.'],
      ['이 식당이 유명하대요.', 'Dieses Restaurant soll berühmt sein.'], ['그 사람은 의사래요.', 'Diese Person soll Arzt sein.'], ['친구가 한국에 간다고 했어요.', 'Mein Freund hat gesagt, dass er nach Korea fährt.']],
    err: [['내일 비가 오다고 해요.', '내일 비가 온다고 해요.', 2, 'Verb → -ㄴ다고 해요: 온다고.'],
      ['그 사람은 학생다고 해요.', '그 사람은 학생이라고 해요.', 2, 'Nomen → -(이)라고 해요.']]
  });

  add({
    id: 'daero', level: 3, title: '-대로 – so wie, gemäß',
    summary: '„Wie gesagt“, „nach Plan“, „wie du willst“.',
    explain: `<p><b>Nomen + 대로</b>: 계획<b>대로</b> (nach Plan), 마음<b>대로</b> (wie man will).</p>
<p><b>Verb + -(으)ㄴ 대로</b> (wie getan): 말한 <b>대로</b>, 배운 <b>대로</b>. <b>Verb + -는 대로</b> (wie man es tut / sobald): 하는 <b>대로</b>.</p>`,
    drill: { kind: 'conj', forms: ['asPast'] },
    s: [['제가 말한 대로 하세요.', 'Machen Sie es so, wie ich gesagt habe.'], ['계획대로 됐어요.', 'Es ist nach Plan gelaufen.'], ['마음대로 하세요.', 'Machen Sie, wie Sie wollen.'],
      ['배운 대로 해 보세요.', 'Versuchen Sie es so, wie Sie es gelernt haben.'], ['생각한 대로 맛있어요.', 'Es ist so lecker, wie ich dachte.']],
    err: [['계획데로 됐어요.', '계획대로 됐어요.', 0, 'Schreibweise: 대로 (mit ㅐ).'],
      ['배우은 대로 해 보세요.', '배운 대로 해 보세요.', 0, 'Stamm auf Vokal → -ㄴ 대로: 배운.']]
  });

  add({
    id: 'tenikka', level: 3, title: '-(으)ㄹ 테니까 – „da ich ja … / da … wohl“',
    summary: 'Eigene Absicht oder Vermutung als Grund für eine Bitte.',
    explain: `<p>Stamm + <b>(으)ㄹ 테니까</b>:</p>
<ul><li>1. Person = <b>Absicht</b>: 제가 청소<b>할 테니까</b> 쉬세요 (Ich putze, also ruh dich aus).</li>
<li>andere = <b>Vermutung</b>: 피곤<b>할 테니까</b> 일찍 자요 (Du bist sicher müde, …).</li></ul>
<p>Danach folgt meist eine Bitte oder ein Vorschlag.</p>`,
    drill: { kind: 'conj', forms: ['tenikka'] },
    s: [['제가 청소할 테니까 쉬세요.', 'Ich putze, ruh du dich aus.'], ['곧 갈 테니까 조금만 기다려 주세요.', 'Ich komme gleich, warten Sie bitte kurz.'],
      ['피곤할 테니까 일찍 자요.', 'Du bist sicher müde, geh früh schlafen.'], ['밖이 추울 테니까 따뜻하게 입으세요.', 'Draußen ist es sicher kalt, ziehen Sie sich warm an.'],
      ['제가 살 테니까 같이 먹어요.', 'Ich lade dich ein, lass uns zusammen essen.']],
    err: [['제가 요리하을 테니까 기다리세요.', '제가 요리할 테니까 기다리세요.', 1, 'Stamm auf Vokal → -ㄹ 테니까: 할.'],
      ['밖이 춥을 테니까 코트를 입으세요.', '밖이 추울 테니까 코트를 입으세요.', 1, 'ㅂ-unregelmäßig: 춥 → 추울.']]
  });

  add({
    id: 'donan', level: 3, title: '동안 / -는 동안 – während, lang',
    summary: 'Zeitdauer und Gleichzeitigkeit.',
    explain: `<p><b>Zeitangabe + 동안</b> = … lang: 세 시간 <b>동안</b> (drei Stunden lang), 방학 <b>동안</b> (während der Ferien).</p>
<p><b>Verb + 는 동안</b> = während: 기다리<b>는 동안</b>. ㄹ-Stamm: 사<b>는 동안</b>.</p>`,
    drill: { kind: 'conj', forms: ['while'] },
    s: [['세 시간 동안 공부했어요.', 'Ich habe drei Stunden lang gelernt.'], ['방학 동안 한국에 있었어요.', 'Während der Ferien war ich in Korea.'],
      ['제가 요리하는 동안 청소 좀 해 주세요.', 'Während ich koche, putz bitte ein bisschen.'], ['한국에 사는 동안 많이 배웠어요.', 'Während ich in Korea gelebt habe, habe ich viel gelernt.'],
      ['기다리는 동안 책을 읽었어요.', 'Während ich gewartet habe, habe ich ein Buch gelesen.']],
    err: [['제가 자은 동안 비가 왔어요.', '제가 자는 동안 비가 왔어요.', 1, 'Verb → -는 동안: 자는.'],
      ['서울에 살는 동안 행복했어요.', '서울에 사는 동안 행복했어요.', 1, 'ㄹ-Stamm: ㄹ fällt vor ㄴ weg → 사는.']]
  });

  g.Grammar = { points: P, byId: Object.fromEntries(P.map(p => [p.id, p])) };
})(typeof window !== 'undefined' ? window : globalThis);
