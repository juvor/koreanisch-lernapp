# Entwicklungsdokumentation – 한국어 Lernapp

> **Zweck:** Mit diesem Dokument lässt sich die App vollständig nachvollziehen, weiterentwickeln oder von Grund auf neu bauen.
> **Regel:** Bei jeder Änderung an der App wird dieses Dokument mit aktualisiert (Abschnitte + Änderungsprotokoll unten).

---

## 1. Ziel & Anforderungen der Nutzerin / des Nutzers

- Lernende mit Vorkenntnissen aus Lernkarten-Apps und Grammatik-Lehrbüchern für Anfänger. Sprache der App: Deutsch.
- **Komplett lokal und offline** – kein Server, keine Cloud, keine CDNs.
- **Vokabeln mit Phasen** wie in klassischen Lernkarten-Apps (Phase 1–6, falsch → zurück auf 1).
- **Grammatik**: Partikel („Deklination“), Zeiten, Unregelmäßigkeiten. Übungen werden in **einstellbarem Rhythmus** fällig:
  Sätze in beide Richtungen übersetzen, Fehler finden usw.
- **Themen** (Alltag, Essen …).
- **Audio** für Aussprache; Sprachabfrage nur „wenn verlässlich machbar“.
- **Import**: Nutzer liefert Vokabeln, Claude bringt sie ins Tabellenformat, App macht daraus Karten.
- Seit v2: **Bildschirmtastatur** (Laptop hat keine koreanische Tastatur), **iPad-Tauglichkeit**, **Personalisierung** (Farbe, Modus).

## 2. Grundsatzentscheidungen (und warum)

| Entscheidung | Grund |
|---|---|
| Reines HTML/CSS/Vanilla-JS, kein Build, kein Framework | Läuft per Doppelklick auf `index.html` (file://), nichts zu installieren |
| **Klassische `<script>`-Tags, KEINE ES-Module** | ES-Module werden bei file:// vom Browser blockiert (CORS) |
| Jede Datei hängt ein globales Objekt an `window` (`Hangul`, `Conj`, `Core`, `UI`, `Ex`, `Keyboard`, `Theme`, `App`) | Ersatz für Module; Reihenfolge in `index.html` ist wichtig |
| Daten in `localStorage` (Schlüssel `koreanisch-lernapp-v1`), Backup als JSON-Download | Offline, kein Server; Backup schützt vor Datenverlust |
| Audio über **Web Speech API** (`speechSynthesis`) mit lokaler Windows-/iOS-Stimme | Offline, kostenlos. Google-Translate-Audio bewusst NICHT (inoffizieller Endpunkt, braucht Internet, kann brechen) |
| Keine automatische Aussprachebewertung | Browser-Spracherkennung schickt Audio an Google/Microsoft → nicht offline. Stattdessen: aufnehmen & mit Original vergleichen (`MediaRecorder`) |
| Grammatik-Inhalte **selbst geschrieben**, nur die Reihenfolge an übliche Anfängerkurse angelehnt | Urheberrecht – keine Texte aus Lehrbüchern kopieren |
| Konjugation **regelbasiert berechnet** statt Tabellen | Unbegrenzt Übungen, auch für eigene Vokabeln |
| iPad als **PWA** (Service Worker + Manifest), einmal von https-Adresse laden | iPad-Safari kann lokale HTML-Dateien nicht mit JS ausführen; Service Worker braucht https/localhost |
| Physische Tastatur → Hangul per `e.code` (Tastenposition) | Funktioniert ohne Windows-IME und unabhängig von QWERTZ/QWERTY |

## 3. Dateistruktur

```
index.html              Gerüst: Navigation, <main id="main">, Script-Reihenfolge, PWA-Meta-Tags
manifest.webmanifest    PWA-Manifest (Name, Icons, standalone)
sw.js                   Service Worker: Offline-Cache. VERSION bei JEDER Dateiänderung erhöhen!
css/style.css           Gesamtes Design; Themes über :root[data-theme=…]; Schriftgrößen = calc(Npx * var(--scale))
icons/icon-*.png        App-Icons (180 Apple, 192/512 Manifest) – mit PIL + Malgun Gothic Bold erzeugt
js/theme.js             (im <head>) Modus/Akzent/Skalierung anwenden, bevor gerendert wird
js/hangul.js            Silben zerlegen/zusammensetzen, Batchim-Erkennung, Partikelwahl
js/conjugate.js         Konjugations-Engine + Formenliste FORMS + Klassen-Erklärungen
js/data/lexicon.js      Eingebaute Verben (mit Typ V/A, Unregelmäßigkeitsklasse, Flags) und Nomen
js/data/grammar.js      57 Grammatiklektionen (Level 1–3)
js/data/topics.js       10 Themen mit Alltagsphrasen
js/core.js              Store (localStorage), SRS (Phasen), Check (Antwortprüfung), Numbers, TTS, Recorder
js/ui.js                Audio-Knöpfe, Übungs-Runner, alle Übungstypen, Übungsgeneratoren
js/keyboard.js          Bildschirmtastatur + Hangul-Komposition + physische Tastatur-Umleitung
js/app.js               Alle Ansichten + Hash-Router + Start
js/memory.js            Memory-Spiel (gemeinsam mit Norwegisch-App), Sets: js/data/memory.js
js/dialogs.js           Dialog-Ansicht (gemeinsam mit Norwegisch-App), Inhalte: js/data/dialogs.js
vokabeln/               PRIVAT (gitignored): Vokabel-CSVs, Erzeugungsskripte, build_pakete.py, pakete.js, zu_pruefen.md
vorlage_vokabeln.csv    Import-Vorlage (UTF-8 mit BOM, Semikolon – Excel-freundlich)
tests/test.html         Selbsttests (Konjugation, Partikel, Klassen-Erkennung, Fehlerindex, Tastatur)
.claude/launch.json     Lokaler Testserver: python -m http.server 8765
ANLEITUNG.md            Bedienungsanleitung für die Nutzerin / den Nutzer
ENTWICKLUNG.md          Dieses Dokument
```

Script-Reihenfolge: `theme.js` (head) → `hangul` → `conjugate` → `data/*` → `core` → `ui` → `keyboard` → `vokabeln/pakete.js` (optional) → `app`.

## 4. Datenmodell (localStorage)

```js
{
  version: 1,
  vocab: [{ id, ko, de, topic, pos /* Nomen|Verb|Adjektiv|Ausdruck|Sonstiges */, note, exKo, exDe, cls? /* ''|ㅂ|ㄷ|ㅅ|르|ㅎ */, prio? /* 1–5, seit v6 */, created,
            srs: { de2ko: { phase /*0=neu..6*/, due /*'YYYY-MM-DD'*/, last }, ko2de: {…} } }],
  grammar: { [lessonId]: { active, phase, due, history: [{ d, p /*Prozent*/ }] } },
  settings: { vocabIntervals[6], grammarIntervals[6], directions, answerMode, newPerDay, grammarPerPoint, grammarPointsPerDay,
              autoplay, rate, voiceURI, typoTolerance, trainer:{…},
              ui: { theme /*auto|light|dark|sepia*/, accent /*#hex*/, scale /*0.9|1|1.15|1.3*/ },
              kbd: { physical /*Laptop tippt Hangul*/, auto /*Bildschirmtastatur automatisch*/ } },
  stats: { days: { 'YYYY-MM-DD': { vocab, vocabOk, grammar, grammarOk } }, newCount: { date, n } },
  importedPackages: { teil1: '<version>', … },   // seit v5
  lastBackup: 'YYYY-MM-DD'
}
```
Neue Einstellungen immer in `DEFAULT_SETTINGS` (core.js) ergänzen; verschachtelte Objekte in `Store.load()` einzeln mit Defaults mergen.

## 5. Kernlogik

### 5.1 Hangul (hangul.js)
- Silbe = `0xAC00 + (L*21 + V)*28 + T`. Vokal-Indizes `V`, Final-Indizes `T` als Konstanten.
- `finalOf(word)`: Batchim der letzten Hangul-Silbe; Ziffern nach sinokoreanischer Aussprache (1 일 → ㄹ …).
- `particle(noun, type)`: 은/는, 이/가, 을/를, 과/와, 이랑/랑, (으)로 (ㄹ-Batchim → 로!), 이에요/예요, 이/가 아니에요.

### 5.2 Konjugation (conjugate.js)
- Stamm = Verb ohne 다. Klasse explizit (`cls`) oder `guessClass()` mit Ausnahmelisten
  (z. B. 입다/좁다 regelmäßig, 듣다/걷다/묻다 ㄷ-unregelm., 낫다/짓다 ㅅ-unregelm., 좋다/넣다 regelmäßig).
- Drei Endungs-Familien:
  1. **아/어-Familie** `aeo(stem, cls)`: 하→해; Vokalverschmelzung (ㅗ→ㅘ, ㅜ→ㅝ, ㅣ→ㅕ, ㅚ→ㅙ, ㅏ/ㅓ/ㅐ/ㅔ/ㅕ verschmelzen); 으-Ausfall (Helligkeit der Vorsilbe); ㅂ→워 (돕/곱→와); ㄷ→ㄹ; ㅅ fällt; 르→ㄹ라/ㄹ러; ㅎ→ㅐ/ㅒ. Vergangenheit = ㅆ an letzte Silbe + 어요.
  2. **으-Familie** `eu(stem, cls, ending)`: Endung kann mit Batchim-Jamo beginnen (`'ㄹ 거예요'`, `'ㄴ'`). ㄹ-Stamm: kein 으, ㄹ fällt vor ㄴ/ㅅ/ㅂ. ㅂ→우, ㄷ→ㄹ+으, ㅅ fällt+으, ㅎ fällt ohne 으.
  3. **direkt am Stamm**: -고, -지만, -지 마세요, -기 전에 …; `formal` (-ㅂ니다/습니다, ㄹ fällt); `-는` (ㄹ fällt).
- `FORMS`: alle abfragbaren Formen mit `label`, `hint`, `f`; Flags `only:'V'` (nur Verben), `noNeg`, `action` (keine Zustandsverben wie 좋아하다/알다 – Lexikon-Flag `noAction`).
- Verneinung bei Nomen+하다 (`nounHa`): „공부 안 해요“.
- Level-3-Formen (seit v4): `seemNow/seemPast/seemFut` (것 같아요), `become` (nur Adjektive, `only:'A'`), `cameTo`, `geodeun`, `deora`, `intend`, `expYes/expNo`, `when`, `becauseGi`, `afterGo`, `notOnly`, `almost`, `tend`, `pretend`, `quote`, `asPast`, `tenikka`, `while`.
  Hilfsfunktionen: `modNow()` (Verb → -는, Adjektiv → -(으)ㄴ, 있다/없다 → -는) und `plainForm()` (Grundform der indirekten Rede: 간다, 먹는다, 산다, 바쁘다).
- Eigene Verben im Trainer (`Ex.userVerbs()`, seit v7): Steht das Wort im eingebauten Lexikon, werden `cls`, `noNeg`, `noAction`, `nounHa` übernommen; sonst Heuristik `nounHa` = Verb mit ≥ 2 Silben vor 하다, aber nicht -아/어하다 (좋아하다). `noNeg` auch für alle …있다/…없다. Der Wortpool enthält jedes Wort nur einmal (eigene Karte hat Vorrang).
- `only` kann `'V'` oder `'A'` sein; `allForms()` und `conjEx()` filtern danach (fehlender Typ = Verb).

### 5.3 Phasen-System (core.js → SRS)
- Phase 0 = neu (Tageslimit `newPerDay`). **Reihenfolge neuer Karten** (seit v6): `SRS.fresh()` sortiert stabil nach `prio` (1 = sehr häufig … 5 = selten, fehlend = 3); die Tagesportion wird danach gemischt. Richtig → Phase+1 (max. 6), fällig in `vocabIntervals[phase-1]` Tagen. Falsch → Phase 1, fällig morgen, in derselben Sitzung als „Wiederholung“ nochmal (ohne Phasen-Effekt).
- Beide Richtungen (`de2ko`, `ko2de`) haben getrennte Phasen.
- Grammatik: aktivierte Lektion hat Phase. Ergebnis einer Trainingsrunde: ≥80 % → Phase+1; 50–79 % → bleibt, morgen; <50 % → Phase 1. Nur vollständig bearbeitete Lektionen werden bewertet.
- Wertung wird erst beim „Weiter“ gespeichert → „Ich hatte doch recht“ kann sie vorher umdrehen.

### 5.4 Antwortprüfung (core.js → Check)
- Koreanisch: Leerzeichen/Satzzeichen/Klammern entfernen, exakter Vergleich gegen Alternativen (getrennt durch `, ; /`).
- Deutsch: klein, Umlaute → ae/oe/ue/ss, Artikel/„sich“/„zu“ am Anfang weg, Klammern weg; Levenshtein ≤1 ab 5 Zeichen = Tippfehler (abschaltbar).
- `diff()`: LCS-Zeichenvergleich, `<del>` zu viel / `<ins>` fehlt.

### 5.5 Übungen (ui.js)
- `runExercises({title, list | next, onFinish})`: generischer Runner, `api.result(ok, {overridable})`.
- Typen: `ko2de` (selbst bewerten), `de2ko` (getippt, Auto-Prüfung + Überschreiben), `dictation`, `order` (Satzbau), `error` (falsches Wort anklicken; Daten `[falsch, richtig, Wortindex, Hinweis]`), `choice` (Lückentext/Partikel, Tasten 1–n), `conj`, `number`.
- `grammarExercises(lesson, n)`: ~20 % Fehlersätze, bis 2 Lückensätze, ~35 % Drill (Konjugation/Partikel/Zahlen aus `drill`), Rest Satzübungen (jeder Satz nur einmal).
- Globales Enter: `UI.onEnter` (Ansicht setzt es; ignoriert IME-Komposition `isComposing`/229).

### 5.6 Bildschirmtastatur (keyboard.js)
- Layout 2-Beolsik; Beschriftung zusätzlich mit deutschem Tastenbuchstaben (Y/Z vertauscht).
- `addJamo(lastChar, jamo)`: Automat für Silbenbildung (Anlaut + Vokal, Vokal-Kombis ㅘㅙㅚㅝㅞㅟㅢ, Doppel-Batchim ㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄ, Batchim wandert bei folgendem Vokal: 갑+ㅏ → 가바, 닭+ㅣ → 달기). ㄸㅃㅉ können kein Batchim sein.
- `backJamo()`: Rücktaste zerlegt die gerade gebaute Silbe schrittweise (한→하→ㅎ).
- Kompositionszustand `comp = {el, pos}`: nur wenn Cursor genau hinter der zuletzt getippten Silbe steht, wird zusammengesetzt; Leertaste/Klick/Pfeile beenden.
- Ziel = zuletzt fokussiertes `input.ko-input`. Tasten nutzen `pointerdown` + `preventDefault`, damit der Fokus bleibt. Bei offener Tastatur `inputmode="none"` → iPad-Systemtastatur bleibt zu.
- Physische Tastatur: `keydown` (capture) in `.ko-input` → `CODE[e.code]` → Jamo; Shift → Doppelkonsonant. Wird übersprungen, wenn eine echte IME aktiv ist (`keyCode 229`).
- **Wichtig:** Alle koreanischen Eingabefelder brauchen die Klasse `ko-input`.

### 5.7 Darstellung (theme.js + CSS)
- `<html data-theme="auto|light|dark|sepia">`, CSS-Variablen pro Theme; „auto“ via `prefers-color-scheme`.
- Akzent: `--accent-base` per JS; `--accent`/`--accent-soft` per `color-mix()` abgeleitet (mit Fallback davor).
- Schriftgröße: `--scale`; alle `font-size` als `calc(Npx * var(--scale))`. Neue CSS-Regeln ebenso schreiben!

### 5.8 iPad / PWA
- `sw.js`: Cache-first + Aktualisierung im Hintergrund. Registrierung nur bei http(s) (nicht file://). Dateiliste `FILES` muss alle App-Dateien enthalten; **`VERSION` bei jeder Änderung erhöhen**.
- `navigator.storage.persist()`; Daten bleiben nur dauerhaft, wenn über Home-Bildschirm-Symbol gestartet.
- Touch: Eingabefelder ≥16px (sonst zoomt iOS), größere Tippflächen bei `pointer: coarse`, Safe-Area-Abstände, Hover-Effekte bei `hover: none` aus.
- Sync Laptop ↔ iPad nur über Backup-Datei (JSON).

## 6. Inhalte

- **Grammatik (39 Lektionen)**: Level 1: 이에요/예요, 이/가 아니에요, 은/는, 이/가, 을/를, Präsens, 있다/없다, 에/에서, Vergangenheit, Futur, 안/-지 않다, 못, -고 싶다, 하고/와/과/랑, Zahlen. Level 2: -고 있다, -(으)세요, -(으)ㄹ 수 있다, -아야 하다, -지 마세요, -(으)러, -아서, -(으)니까, -지만, -고, -(으)ㄹ까요, -(으)면, Attribute -는/-(으)ㄴ/-(으)ㄹ, 보다, (으)로, 에게/한테, 도/만, 부터/까지, formell, -아 주세요, -(으)ㄹ게요, -기 전에/-(으)ㄴ 후에, 반말. Level 3: Unregelmäßige Verben (Überblick), dazu seit v4 aus den Lernnotizen: -것 같다, -아/어지다, -게 되다, -거든요, -더라고요, -(으)려고 하다, -(으)ㄴ 적이 있다/없다, -(으)ㄹ 때, 때문에/-기 때문에, -고 나서, -뿐만 아니라, -(으)ㄹ 뻔하다, -는 편이다, -는 척하다, indirekte Rede (-다고/-(이)라고 해요, -대요), -대로, -(으)ㄹ 테니까, 동안/-는 동안.
- Format je Lektion: `{ id, level, title, summary, explain(HTML), drill, s:[[ko,de]], err:[[falsch,richtig,idx,hinweis]], ch:[[lücke,optionen,antwort,de]] }`.
  Beim Hinzufügen: `idx` = Index des falschen Worts nach Split an Leerzeichen (Test prüft Bereich).
- **Themen**: Alltag, Essen, Einkaufen, Unterwegs, Wetter, Arbeit, Freizeit, Gesundheit, Familie, Zeit. Vokabeln mit gleicher Thema-Spalte werden zugeordnet.

## 7. Import-Format für Vokabeln

`Koreanisch;Deutsch;Thema;Wortart;Notiz;Beispiel KO;Beispiel DE` – Tab, Semikolon oder Komma werden erkannt; Kopfzeile optional (Spalten werden dann per Namen zugeordnet); vertauschte KO/DE-Spalten werden erkannt.
**Import mit Aktualisierung** (Häkchen, Standard an): Gibt es genau eine Karte mit *exakt* demselben koreanischen Wort (`koKey`: nur Leerzeichen vereinheitlicht – seit v7, vorher wurden „-산“ und „산“ verwechselt) (oder dieselbe Kombination KO+DE), werden Bedeutung, Thema, Wortart, Notiz und Beispiele überschrieben – `srs` (Phasen) bleibt. So lässt sich eine korrigierte CSV erneut importieren, ohne doppelte Karten. Hat sich das koreanische Wort selbst geändert, entsteht eine neue Karte.
Wortart leer → automatisch: Leerzeichen/Satzzeichen → Ausdruck; endet auf 다 → Adjektiv falls „sein“ in der Übersetzung, sonst Verb; sonst Nomen.
**Wenn die Nutzerin/der Nutzer Vokabeln schickt:** in dieses Format bringen, Wortart Verb/Adjektiv immer explizit setzen, Unregelmäßigkeit ggf. in Notiz, als UTF-8-mit-BOM-CSV speichern.

**Vokabelpakete (seit v5):** `vokabeln/build_pakete.py` liest alle `meine_vokabeln_teil*.csv` und schreibt `vokabeln/pakete.js` (`window.VOKABEL_PAKETE = [{id, title, version, rows}]`). `index.html` lädt die Datei optional per `<script … onerror>` – das funktioniert auch bei file://. Die App zeigt auf Start- und Vokabelseite eine Karte „Deine Vokabelpakete“ (Status neu / aktualisiert / importiert ✓, Vergleich über `version` = Hash der Zeilen in `state.importedPackages`). Import immer im Aktualisierungsmodus.
**Nach JEDER Änderung an einer Vokabel-CSV `python -I vokabeln/build_pakete.py` ausführen**, sonst sieht die App die Änderung nicht. Die Nutzerin / der Nutzer muss nur noch auf „Importieren“ klicken – nie mehr Dateien auswählen.
`pakete.js` liegt im ignorierten Ordner `vokabeln/` → wird bei GitHub Pages nicht veröffentlicht; aufs iPad kommen die Vokabeln über das Backup.

**Häufigkeitsstufen (seit v6):** `vokabeln/prioritaet.py` enthält die Listen STUFE_1/2/4/5 (alles andere = 3); `build_pakete.py` setzt `prio` je Karte und sortiert die Zeilen danach. Mehrwort-Einträge werden automatisch als Ganzes erkannt. Das Skript meldet Einträge aus `prioritaet.py`, die in keiner CSV vorkommen (Tippfehler). Einschätzung nach Alltagshäufigkeit/Anfängerwortschatz (TOPIK I), keine Korpuszählung.
**Bei neuen Vokabelteilen:** neue Wörter in `prioritaet.py` einordnen (sonst Stufe 3), dann `build_pakete.py`. Alternativ hat die CSV eine 8. Spalte „Häufigkeit“ (1–5); die Listen in `prioritaet.py` haben Vorrang.
**Teil 4 = Grundwortschatz (von Claude zusammengestellt, nicht aus Notizen):** `make_vocab_teil4.py` enthält 673 Kandidaten mit Stufe; übernommen werden 500 – alle Stufe 1, die restlichen Plätze reihum über die Themen verteilt. Die 173 übrigen Kandidaten (alle Stufe 2: Speisen, Tiere, Sport, Adjektive wie 무섭다, 아름답다, Adverbien wie 갑자기, 특히) bilden **Teil 5** – erzeugt mit `--rest=meine_vokabeln_teil5.csv` beim Aufruf von `make_vocab_teil4.py`.
In der App: Spalte „Häufigkeit“ (★★★★★ = Stufe 1) in der Vokabelliste, Sortierung „Häufigste zuerst“, Stufe im Bearbeiten-Dialog änderbar, optionale CSV-Spalte „Häufigkeit“/„Priorität“ beim Import und Export; Import im Aktualisierungsmodus übernimmt `prio`.

**Bewährter Ablauf (Teil 1, 543 Karten aus eigenen Notizen):**
- Ablage im Ordner `vokabeln/` (per `.gitignore` von Git ausgeschlossen – persönliche Daten). Pro Lieferung eine Datei `meine_vokabeln_teilN.csv` + das Erzeugungsskript `make_vocab_teilN.py`. Im Skript ist jede Zeile `ko|de|Thema-Kürzel|Wortart-Kürzel|Notiz`.
- Tippfehler und falsche Bedeutungen korrigieren und in der Notiz **„Original: …“** vermerken. Unklare Einträge nicht raten, sondern in `vokabeln/zu_pruefen.md` sammeln.
- Doppelte zusammenführen. Grammatikendungen (-거든요, -더라고요 …) als Wortart „Ausdruck“ und Thema „Grammatik“.
- Themen-IDs exakt wie in `topics.js` (Alltag, Essen, Einkaufen, Unterwegs, Wetter, Arbeit, Freizeit, Gesundheit, Familie, Zeit). Zusätzlich verwendet: Natur & Tiere, Hanja-Wortfamilien, Friseur, Bank & Post, Grammatik, Haushalt, Farben & Beschreibung, Zahlen.
- Neue Teile gegen alle früheren Teile abgleichen (Skript bekommt die vorherigen CSVs als weitere Argumente und überspringt vorhandene koreanische Wörter). Persönliche Angaben aus Notizen (Namen von Lehrkräften, Unterrichtsdaten) nicht übernehmen.
- Bringt ein neuer Teil eine **zusätzliche Bedeutung** für ein schon vorhandenes Wort (z. B. 줄 = Kabel), die Karte im früheren Skript ergänzen und die frühere CSV neu erzeugen – die Nutzerin / der Nutzer importiert sie dann mit „aktualisieren“ erneut.
- Fehlt in der Notiz die Übersetzung, nur eindeutige Bedeutungen ergänzen und in `zu_pruefen.md` auflisten.
- **Unvollständige Verben** (갖다, 데리다) und **Ehrformen auf -시다** (계시다, 드시다) als „Sonstiges“ markieren, sonst erzeugt der Konjugationstrainer falsche Formen (갖아요, 계셔요). Formen in die Notiz schreiben.
- **Mehrdeutigkeit:** Ist das Original-Wort selbst ein echtes Wort mit anderer Bedeutung (바름 → 발음 oder 바람 = Wind; 분 = Person oder Zorn), nicht überschreiben, sondern beide Bedeutungen auf die Karte bzw. eine eigene Karte anlegen und in `zu_pruefen.md` aufführen (Wunsch der Nutzerin / des Nutzers).
- Kontrolle: CSV im Browser mit `App.parseTable` einlesen und alle Verben mit `Conj.conjugate(…, 'present'/'past')` durchsehen. Danach Import-Test und `Store.reset()`.

## 8. Testen

1. `.claude/launch.json` → Server „lernapp“ (Port 8765) starten.
2. `http://localhost:8765/tests/test.html` → muss „0 Fehler“ zeigen. Bei neuen Regeln Testfälle ergänzen.
3. App unter `http://localhost:8765/index.html` durchklicken; Konsole auf Fehler prüfen.
4. **Achtung:** Auf localhost registriert sich der Service Worker und liefert gecachte Dateien – auch per `fetch` geladene CSVs aus `vokabeln/` (Cache-first, `ignoreSearch`, ein `?x=`-Parameter hilft also nicht) → vor dem Testen neuer Änderungen
   im Browser `navigator.serviceWorker.getRegistrations()` → `unregister()` und `caches` leeren, oder `VERSION` erhöhen. Nach dem Test wieder abmelden.
5. iPad-Ansicht: Viewport 768×1024 (Tablet) prüfen.

## 9. Nachbau von Grund auf (Kurzfassung)

1. Ordnerstruktur wie in Abschnitt 3 anlegen.
2. `hangul.js` → `conjugate.js` schreiben und sofort mit `tests/test.html` absichern (≈80 bekannte Formen).
3. Lexikon, Grammatik, Themen als Daten.
4. `core.js` (Store, SRS, Check, Numbers, TTS, Recorder) → `ui.js` (Runner + Übungstypen) → `app.js` (Ansichten + Router).
5. `keyboard.js`, `theme.js`, CSS, PWA-Dateien.
6. Vorlage-CSV, ANLEITUNG.md, dieses Dokument.

## 9b. Veröffentlichung (GitHub Pages)

- Online: **https://juvor.github.io/koreanisch-lernapp/** – Repo `juvor/koreanisch-lernapp` (öffentlich, Branch `main`, Pages aus `/ (root)`). Norwegisch analog: `juvor/norwegisch-lernapp`.
- Commits mit der anonymen GitHub-noreply-Adresse (repo-lokal `git config`), nie mit privater E-Mail.
- Ausgeschlossen per `.gitignore`: `vokabeln/` (private Listen/Pakete), `.claude/`, Backups. `.nojekyll` verhindert Jekyll.
- **Update-Ablauf:** Änderung → `VERSION` in `sw.js` erhöhen → Tests → `git add -A && git commit` → `git push` → GitHub baut in 1–2 Min. neu (Status: `api.github.com/repos/juvor/REPO/actions/runs`). Nur nach Rückfrage bei der Nutzerin / dem Nutzer veröffentlichen.
- Prüfung nach dem Veröffentlichen: Seite laden, `navigator.serviceWorker.ready`, Cache-Name = neue VERSION.

## 10. Offene Ideen

- Lokale Spracherkennung (z. B. Whisper als lokales Programm) für automatische Aussprachebewertung.
- Automatische Synchronisation Laptop ↔ iPad (bräuchte Cloud oder Datei-Sync).
- Weitere Grammatik (Level 3+: -는데, -(으)ㄴ/는 것 같다, indirekte Rede …).
- Vorab erzeugte Audiodateien als Alternative zur Systemstimme.

## 10b. Ableger: Norwegisch-App
Seit 2026-11-26 gibt es unter einem Nachbarordner `Norwegisch-Lernapp` (Repo `norwegisch-lernapp`) eine eigenständige Norwegisch-Version (Bokmål) mit demselben Gerüst
(eigener Speicher `norwegisch-lernapp-v1`, eigene Doku `ENTWICKLUNG.md` dort). Verbesserungen an core/ui/app/theme/css gegebenenfalls in beide Apps übernehmen.
Testserver „norsk“ (Port 8766) ist auch in `.claude/launch.json` dieses Projekts eingetragen.

## 10c. Dialoge im Alltag (seit 2026-11-26)
- **Gemeinsamer Code** `js/dialogs.js` (identisch in Koreanisch- und Norwegisch-App – bei Änderungen in beide kopieren!), Inhalte in `js/data/dialogs.js`.
- Datenformat: `{ id, icon, title, place, topic, intro, roles: {A: [Name, Deutsch], B: [...]}, lines: [[Rolle, Zielsprache, Deutsch], …], words: [[Zielsprache, Deutsch, Wortart], …] }`.
- Ansichten: `#dialogs` (Übersicht, beste Rollenspiel-Quote), `#dialog/ID` (Chat-Ansicht mit Audio, Übersetzung ein/aus, ganzen Dialog abspielen).
  Rollenspiel und Üben laufen ohne eigene Adresse (gleiche URL) – Zurück-Knöpfe rufen daher `detail()` direkt auf, nicht `location.hash`.
- Zwei Sprecher: Rolle B bekommt eine zweite Stimme, falls vorhanden, sonst andere Tonhöhe (`speakLine`).
- Rollenspiel: Rolle und Modus wählbar (Schreiben mit Prüfung + „Ich hatte doch recht“, oder Sprechen mit Selbstbewertung); Ergebnis in `state.dialogs[id] = {best, last}`.
- Üben: `Ex.sentenceExercises` aus den Dialogsätzen (max. 10).
- Schlüsselwörter: nur Wörter übernehmen, deren Zielsprachen-Wort noch nicht als Karte existiert (kein Überschreiben), Thema = `topic` des Dialogs, Stufe 2.
- Router: `route()` ruft `DialogView.stop()` auf (Sprachausgabe beenden beim Seitenwechsel).
- Dialoge: Café, Restaurant, Supermarkt, U-Bahn, Post, Arzt, Apotheke, Hotel, Taxi.

## 10d. Memory (seit 2026-11-26)
- **Gemeinsamer Code** `js/memory.js` (identisch in beiden Apps – Änderungen in beide kopieren), Bildersets in `js/data/memory.js`:
  `{ id, icon, title, topic, pos, items: [[Emoji oder Farbe '#rrggbb', Zielsprache, Deutsch], …] }`. Farben werden als Farbfeld gezeigt.
- 8 Sets: Farben, Tiere, Möbel & Wohnung, Verkehrsmittel, Obst & Gemüse, Körper, Kleidung, Natur & Wetter (Norwegisch mit Artikel).
- Spielarten: `pic` (Bild ↔ Wort), `de` (Wort ↔ Deutsch), `audio` (🔊-Karte spricht das Wort ↔ Bild); 6/8/10 Paare; Vorlesen beim Aufdecken abschaltbar.
- Eigene Vokabeln: Themen mit ≥ 6 Karten, immer Wort ↔ Deutsch, Route `#memory/thema:NAME`.
- Zustand `state.memory = { opts: {mode, size, speak}, best: { 'set|modus|paare': {moves, time} } }`. Router `#memory`, `#memory/ID`; `route()` ruft `MemoryView.stop()` (Timer).
- Nach dem Spiel: Wörter (nur neue, exakt verglichen) als Karten übernehmen, Thema = Set-Thema, Stufe 2.

## 11. Änderungsprotokoll

| Datum | Version | Änderung |
|---|---|---|
| 2026-11-25 | v1 | Erstversion: Vokabeln mit Phasen + Import, 39 Grammatiklektionen mit eigenem Rhythmus, Trainer (Konjugation, Tabelle, Partikel, Zahlen), Themen, Audio (TTS + Aufnahme), Einstellungen, Backup. |
| 2026-11-25 | v2 | Bildschirmtastatur mit Silbenbildung + Laptop-Tastatur tippt Hangul; Personalisierung (Modus hell/dunkel/sepia/auto, Akzentfarbe, Schriftgröße); iPad: PWA (Manifest, Service Worker, Icons), Touch-Optimierung, schmale Bildschirme; Entwicklungsdoku. |
| 2026-11-25 | – | GitHub-Pages-Veröffentlichung vorbereitet (lokales Git-Repo, `.gitignore`, `.nojekyll`), auf Wunsch pausiert. |
| 2026-11-25 | v4 | 18 neue Level-3-Lektionen aus den Lernnotizen (insgesamt 57), 21 neue Konjugationsformen inkl. indirekter Rede, Trainer-Gruppe „Fortgeschritten“, Lexikon +4 Verben; Import kann vorhandene Karten aktualisieren (Lernstand bleibt); Tests auf 148 erweitert. Vokabeln Teil 1: mehrdeutige Korrekturen mit beiden Bedeutungen, Karte 바람 ergänzt (544 Karten). |
| 2026-11-26 | v12 | Datenschutz: persönliche Hinweise in Doku und Oberfläche neutral formuliert, `noindex` gegen Suchmaschinen; Repository-Verlauf auf eine saubere Version zurückgesetzt. |
| 2026-11-26 | v11 | Veröffentlicht auf GitHub Pages (https://juvor.github.io/koreanisch-lernapp/), anonyme Commit-Adresse, `.claude/` ausgeschlossen; Anleitung iPad/iPhone mit echter Adresse. |
| 2026-11-26 | v11 | `Check.alts()` ignoriert Klammerinhalte (wie Norwegisch no-v6). |
| 2026-11-26 | v10 | Stimme: gewählte Online-Stimme (Edge „… Online (Natural)“) fällt ohne Internet automatisch auf die Offline-Stimme zurück (`TTS.voice()`, `navigator.onLine`); Dialoge wählen die zweite Stimme nur aus nutzbaren Stimmen; Tipp in Einstellungen → Audio. |
| 2026-11-26 | v9 | Neue Funktion „🃏 Memory“: 8 Bildersets, 3 Spielarten (Bild ↔ Wort, Wort ↔ Deutsch, Hören ↔ Bild), 6/8/10 Paare, Bestwerte, eigene Vokabeln nach Thema, Wörter übernehmen; gemeinsamer Code mit der Norwegisch-App. |
| 2026-11-26 | v8 | Neue Funktion „💬 Dialoge“: 9 Alltagsdialoge (Café, Restaurant, Supermarkt, U-Bahn, Post, Arzt, Apotheke, Hotel, Taxi) mit Chat-Ansicht, Rollenspiel, Üben und Schlüsselwörtern; gemeinsamer Code mit der Norwegisch-App. |
| 2026-11-26 | – | Norwegisch-Version als eigenes Projekt (einem Nachbarordner `Norwegisch-Lernapp` (Repo `norwegisch-lernapp`)) abgeleitet; hier nur `.claude/launch.json` um Server „norsk“ ergänzt. Keine Änderung an dieser App. |
| 2026-11-26 | – | Vokabeln Teil 5: 173 weitere Grundwortschatz-Wörter (Stufe 2) aus den übrigen Kandidaten von Teil 4; insgesamt 1493 Karten. Keine Änderung am App-Code. |
| 2026-11-26 | v7 | Vokabeln Teil 4: 500 Wörter Grundwortschatz (447 × Stufe 1, 53 × Stufe 2), Paket-Skript liest Spalte „Häufigkeit“; Trainer übernimmt Lexikon-Angaben für eigene Verben (keine „안 알아요“, „공부 안 해요“), keine doppelten Verben im Pool; Import-Aktualisierung vergleicht das Wort exakt. |
| 2026-11-26 | v6 | Häufigkeitsstufen 1–5 für alle 820 Vokabeln (`vokabeln/prioritaet.py`); neue Karten werden nach Häufigkeit eingeführt; Sterne-Anzeige, Sortierung, Bearbeiten, CSV-Spalte „Häufigkeit“. |
| 2026-11-25 | v5 | Vokabelpakete: `build_pakete.py` erzeugt `vokabeln/pakete.js`; die App erkennt die Pakete und importiert sie per Klick (Start- und Vokabelseite, Status neu/aktualisiert/importiert). |
| 2026-11-25 | – | Vokabeln Teil 3 (124 Karten, „Story Time“ 1–11) in `vokabeln/meine_vokabeln_teil3.csv`; Teil 1: 줄 um „Schnur, Kabel“ ergänzt. Keine Änderung am App-Code. |
| 2026-11-25 | – | Vokabeln Teil 2 (152 Karten, Unterrichtsnotizen: Haushalt, Gesundheit, Natur, Farben, Zahlen) in `vokabeln/meine_vokabeln_teil2.csv`; Prüfliste ergänzt. Keine Änderung am App-Code. |
| 2026-11-25 | – | Vokabeln Teil 1 (543 Karten aus eigenen Notizen) in `vokabeln/meine_vokabeln_teil1.csv` aufbereitet; `vokabeln/` in `.gitignore`. Keine Änderung am App-Code. |
