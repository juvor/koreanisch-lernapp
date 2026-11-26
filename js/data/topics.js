/* Themen mit nützlichen Alltagsphrasen. Eigene Vokabeln mit passender "Thema"-Spalte erscheinen automatisch beim Thema. */
(function (g) {
  'use strict';
  const topics = [
    { id: 'Alltag', icon: '👋', title: 'Begrüßung & Alltag', phrases: [
      ['안녕하세요.', 'Hallo / Guten Tag.'], ['감사합니다.', 'Vielen Dank.'], ['죄송합니다.', 'Entschuldigung (formell).'],
      ['괜찮아요.', 'Schon gut. / Kein Problem.'], ['처음 뵙겠습니다.', 'Freut mich (beim ersten Treffen).'], ['잘 지냈어요?', 'Wie ist es dir ergangen?'],
      ['이름이 뭐예요?', 'Wie heißt du?'], ['다음에 봐요.', 'Bis zum nächsten Mal.'], ['잘 자요.', 'Schlaf gut.'], ['네, 알겠습니다.', 'Ja, verstanden.']] },
    { id: 'Essen', icon: '🍜', title: 'Essen & Restaurant', phrases: [
      ['메뉴판 좀 주세요.', 'Die Speisekarte, bitte.'], ['이거 하나 주세요.', 'Davon eins, bitte.'], ['너무 맵지 않게 해 주세요.', 'Bitte nicht zu scharf.'],
      ['물 좀 더 주세요.', 'Bitte noch etwas Wasser.'], ['계산해 주세요.', 'Die Rechnung, bitte.'], ['잘 먹겠습니다.', 'Guten Appetit (vor dem Essen).'],
      ['잘 먹었습니다.', 'Danke für das Essen (danach).'], ['정말 맛있어요.', 'Es ist wirklich lecker.'], ['포장해 주세요.', 'Zum Mitnehmen, bitte.'], ['배불러요.', 'Ich bin satt.']] },
    { id: 'Einkaufen', icon: '🛍️', title: 'Einkaufen', phrases: [
      ['이거 얼마예요?', 'Wie viel kostet das?'], ['좀 깎아 주세요.', 'Geben Sie mir bitte einen Rabatt.'], ['카드로 계산할게요.', 'Ich zahle mit Karte.'],
      ['다른 색깔 있어요?', 'Gibt es eine andere Farbe?'], ['입어 봐도 돼요?', 'Darf ich es anprobieren?'], ['봉투 필요하세요?', 'Brauchen Sie eine Tüte?'],
      ['그냥 구경하고 있어요.', 'Ich schaue mich nur um.'], ['영수증 주세요.', 'Die Quittung, bitte.'], ['너무 비싸요.', 'Das ist zu teuer.']] },
    { id: 'Unterwegs', icon: '🚇', title: 'Unterwegs & Verkehr', phrases: [
      ['지하철역이 어디에 있어요?', 'Wo ist die U-Bahn-Station?'], ['여기서 멀어요?', 'Ist es weit von hier?'], ['이 버스 명동에 가요?', 'Fährt dieser Bus nach Myeongdong?'],
      ['다음 역에서 내리세요.', 'Steigen Sie an der nächsten Station aus.'], ['왼쪽으로 가세요.', 'Gehen Sie nach links.'], ['쭉 가세요.', 'Gehen Sie geradeaus.'],
      ['택시를 타고 가요.', 'Ich fahre mit dem Taxi.'], ['공항까지 얼마나 걸려요?', 'Wie lange dauert es bis zum Flughafen?'], ['여기 세워 주세요.', 'Halten Sie bitte hier.']] },
    { id: 'Wetter', icon: '🌦️', title: 'Wetter & Jahreszeiten', phrases: [
      ['오늘 날씨 어때요?', 'Wie ist das Wetter heute?'], ['비가 와요.', 'Es regnet.'], ['눈이 와요.', 'Es schneit.'], ['날씨가 맑아요.', 'Das Wetter ist klar.'],
      ['너무 더워요.', 'Es ist zu heiß.'], ['바람이 많이 불어요.', 'Es ist sehr windig.'], ['우산 있어요?', 'Hast du einen Regenschirm?'], ['내일은 추울 거예요.', 'Morgen wird es kalt.'],
      ['저는 봄을 제일 좋아해요.', 'Ich mag den Frühling am liebsten.']] },
    { id: 'Arbeit', icon: '💼', title: 'Arbeit & Schule', phrases: [
      ['무슨 일을 하세요?', 'Was machen Sie beruflich?'], ['회사에 다녀요.', 'Ich arbeite in einer Firma.'], ['오늘 야근해요.', 'Heute mache ich Überstunden.'],
      ['회의가 있어요.', 'Ich habe eine Besprechung.'], ['숙제를 다 했어요.', 'Ich habe alle Hausaufgaben gemacht.'], ['시험이 언제예요?', 'Wann ist die Prüfung?'],
      ['퇴근했어요?', 'Hast du schon Feierabend?'], ['내일 휴가예요.', 'Morgen habe ich Urlaub.']] },
    { id: 'Freizeit', icon: '🎬', title: 'Freizeit & Hobbys', phrases: [
      ['취미가 뭐예요?', 'Was ist dein Hobby?'], ['주말에 뭐 했어요?', 'Was hast du am Wochenende gemacht?'], ['영화 보러 갈래요?', 'Willst du ins Kino gehen?'],
      ['저는 등산을 좋아해요.', 'Ich wandere gern.'], ['같이 운동할까요?', 'Sollen wir zusammen Sport machen?'], ['노래방에 가요.', 'Lass uns zum Karaoke gehen.'],
      ['요즘 드라마를 봐요.', 'Zurzeit schaue ich Dramen.'], ['사진 찍는 것을 좋아해요.', 'Ich fotografiere gern.']] },
    { id: 'Gesundheit', icon: '🏥', title: 'Gesundheit', phrases: [
      ['어디가 아파요?', 'Wo tut es weh?'], ['머리가 아파요.', 'Ich habe Kopfschmerzen.'], ['감기에 걸렸어요.', 'Ich habe mich erkältet.'], ['약국이 어디예요?', 'Wo ist die Apotheke?'],
      ['병원에 가야 해요.', 'Ich muss zum Arzt.'], ['열이 있어요.', 'Ich habe Fieber.'], ['푹 쉬세요.', 'Ruhen Sie sich gut aus.'], ['빨리 나으세요.', 'Gute Besserung.']] },
    { id: 'Familie', icon: '👨‍👩‍👧', title: 'Familie & Menschen', phrases: [
      ['가족이 몇 명이에요?', 'Wie viele Personen hat deine Familie?'], ['형제가 있어요?', 'Hast du Geschwister?'], ['언니가 한 명 있어요.', 'Ich habe eine ältere Schwester.'],
      ['부모님은 독일에 사세요.', 'Meine Eltern wohnen in Deutschland.'], ['결혼했어요?', 'Bist du verheiratet?'], ['할머니 댁에 가요.', 'Ich gehe zu Oma.'], ['아이가 있어요?', 'Hast du Kinder?']] },
    { id: 'Zeit', icon: '⏰', title: 'Zeit & Verabredungen', phrases: [
      ['지금 몇 시예요?', 'Wie spät ist es?'], ['언제 만날까요?', 'Wann sollen wir uns treffen?'], ['오늘 무슨 요일이에요?', 'Welcher Wochentag ist heute?'],
      ['내일 시간 있어요?', 'Hast du morgen Zeit?'], ['조금 늦을 것 같아요.', 'Ich werde mich wohl etwas verspäten.'], ['약속이 있어요.', 'Ich habe eine Verabredung.'],
      ['다음 주에 봐요.', 'Bis nächste Woche.'], ['벌써 열두 시예요.', 'Es ist schon zwölf Uhr.']] }
  ];
  g.Topics = { list: topics, byId: Object.fromEntries(topics.map(t => [t.id, t])) };
})(typeof window !== 'undefined' ? window : globalThis);
