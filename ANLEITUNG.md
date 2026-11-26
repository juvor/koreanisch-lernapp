# 한국어 Lernapp – Anleitung

## Starten
**Doppelklick auf `index.html`** (öffnet sich in Edge oder Chrome). Kein Internet, keine Installation nötig.
Tipp: Als Lesezeichen speichern oder eine Verknüpfung auf den Desktop legen.

> ⚠️ Deine Daten (Vokabeln, Phasen, Fortschritt) liegen im Speicher des Browsers.
> Nutze immer **denselben Browser** und mache unter *Einstellungen → Sicherung* regelmäßig ein **Backup**.
> Wenn du den Ordner verschiebst oder den Browser-Verlauf inkl. „Websitedaten“ löschst, brauchst du das Backup.

## Einmalig einrichten
1. **Koreanische Stimme** (für die Aussprache, offline):
   Windows-Einstellungen → Zeit und Sprache → Sprache und Region → Sprache hinzufügen → **한국어** → „Sprachausgabe“ anhaken → installieren → Browser neu starten.
   **Andere Stimme?** Unter *Einstellungen → Audio* wählen. Stimmen mit „(online!)“ (Edge) klingen natürlicher, brauchen aber Internet – offline nimmt die App automatisch die Offline-Stimme.
   Der Download kann eine Weile dauern. Fortschritt: *Einstellungen → Zeit und Sprache → Sprache und Region* (unter Koreanisch) bzw. *Windows Update*.
   Danach den Browser **komplett** schließen (alle Fenster) und neu öffnen. In der App unter *Einstellungen → Audio* „▶ Stimme testen“.
2. **Koreanische Tastatur: nicht nötig.** In koreanischen Eingabefeldern tippt deine normale Laptop-Tastatur automatisch Hangul
   (Standard-Belegung 2-Beolsik, z. B. `G K S` → 한). Die Belegung steht unter *Einstellungen → Koreanische Tastatur*.
   Oder du nutzt die **Bildschirmtastatur**: Knopf **⌨️ 한** unten rechts. Silben werden automatisch gebaut (ㅎ + ㅏ + ㄴ → 한).
   Doppelkonsonanten (ㄲ ㄸ ㅃ ㅆ ㅉ) und ㅒ ㅖ über **⇧**.

## Deine Vokabeln aus den Notizen (Vokabelpakete)
Die Listen, die du Claude schickst, werden zu **Vokabelpaketen** im Ordner `vokabeln/`. Beim Öffnen der App erscheint auf der Startseite
**„📦 Deine Vokabelpakete“** → **„Alle importieren“** klicken – fertig. Wurde ein Paket später korrigiert, steht dort „aktualisiert“:
erneut klicken, dein Lernstand bleibt erhalten. Die Übersicht findest du auch unter *Vokabeln verwalten*.

**Häufigkeit:** Jede Vokabel hat eine Stufe von ★★★★★ (sehr häufig, Grundwortschatz) bis ★ (selten). Neue Karten kommen in dieser
Reihenfolge dran – die wichtigsten zuerst. Ändern kannst du die Stufe über ✏️ in der Vokabelliste; dort gibt es auch die Sortierung „Häufigste zuerst“.

## Vokabeln importieren
*Vokabeln verwalten → Tabelle importieren.* Zeilen aus Excel einfach hineinkopieren oder eine CSV-Datei wählen.
Vorlage: `vorlage_vokabeln.csv` (mit Excel öffnen, ausfüllen, als CSV speichern).

| Koreanisch | Deutsch | Thema | Wortart | Notiz | Beispiel KO | Beispiel DE |
|---|---|---|---|---|---|---|
| 듣다 | hören | Freizeit | Verb | | 음악을 들어요. | Ich höre Musik. |

- Pflicht sind nur **Koreanisch** und **Deutsch**. Mehrere Bedeutungen mit Komma trennen (`nicht wissen, nicht kennen`) – jede zählt als richtig.
- **Wortart** Verb/Adjektiv ist wichtig: Diese Wörter landen dann automatisch im Konjugationstrainer. Leer = automatische Erkennung.
- **Thema** ordnet die Vokabel einem Thema zu (z. B. Alltag, Essen, Einkaufen, Unterwegs, Wetter, Arbeit, Freizeit, Gesundheit, Familie, Zeit – oder eigene).
- Duplikate werden beim Import übersprungen. Mit dem Häkchen **„Vorhandene Karten aktualisieren“** übernimmt ein erneuter Import geänderte Bedeutungen/Notizen – dein Lernstand bleibt erhalten.

## Phasen
Neue Karte → richtig → Phase 1 → 2 → … → 6. Falsch → zurück auf Phase 1 und in derselben Runde nochmal.
Standard-Abstände: 1 · 3 · 9 · 29 · 90 · 180 Tage – frei einstellbar. Abfrage in beide Richtungen oder nur eine.

## Grammatik
57 Lektionen (Level 1–3), in der Reihenfolge eines typischen Anfängerkurses. Lektion lesen → **Ins Training aufnehmen**.
Dann wird sie in eigenen Phasen fällig (Rhythmus einstellbar) mit gemischten Aufgaben:
Übersetzen DE→KO und KO→DE, Fehler finden, Satzbau, Hördiktat, Lückentext und Konjugation.
Level 3 enthält die Grammatik aus deinen Notizen: -것 같아요, -아/어지다, -게 되다, -거든요, -더라고요, -(으)려고 하다, -(으)ㄴ 적이 있다, -(으)ㄹ 때, -기 때문에, -고 나서, -뿐만 아니라, -(으)ㄹ 뻔하다, -는 편이다, -는 척하다, indirekte Rede (-대요), -대로, -(으)ㄹ 테니까, -는 동안.
≥ 80 % → Phase steigt · 50–79 % → morgen nochmal · < 50 % → zurück auf Phase 1.

## Dialoge im Alltag
Menüpunkt **💬 Dialoge**: 9 typische Gespräche – Café, Restaurant, Supermarkt, U-Bahn, Post, Arzt, Apotheke, Hotel, Taxi.
- **Lesen & Hören:** jeder Satz mit 🔊, „▶ Ganzen Dialog anhören“, Übersetzung ein-/ausblendbar.
- **🎭 Rollenspiel:** Rolle wählen (z. B. Gast); die App spricht die andere Rolle, du **schreibst** deinen Satz (wird geprüft) oder **sprichst** ihn (mit 🎙️ aufnehmen, selbst bewerten). Danach „Rollen tauschen“.
- **✍️ Üben:** Übersetzen, Satzbau und Hördiktat mit den Dialogsätzen.
- **📇 Schlüsselwörter** mit einem Klick als Karteikarten übernehmen – nur Wörter, die du noch nicht hast.

## Memory
Menüpunkt **🃏 Memory**: Paare finden – mit Bildern für Farben, Tiere, Möbel, Verkehrsmittel, Obst & Gemüse, Körper, Kleidung, Natur & Wetter.
- **Spielarten:** 🖼️ Bild ↔ Wort · 🔤 Wort ↔ Deutsch · 🎧 Hören ↔ Bild (die 🔊-Karte spricht das Wort beim Aufdecken)
- **6, 8 oder 10 Paare**; Züge und Zeit werden gezählt, Bestwerte gespeichert.
- **Mit meinen Vokabeln:** jedes Thema mit mindestens 6 Karten (Wort ↔ Deutsch).
- Nach dem Spiel: neue Wörter mit einem Klick als Karteikarten übernehmen.

## Trainer
- **Konjugation**: alle Zeiten & Endungen, nur Unregelmäßige wählbar, mit Regel-Erklärung bei Fehlern
- **Konjugationstabelle**: beliebiges Verb eingeben → alle Formen
- **Partikel**: 은/는, 이/가, 을/를, (으)로 …
- **Zahlen**: Zählwörter, Preise, Uhrzeiten, Datum

## Audio
🔊 anhören · 🐢 langsam · 🎙️ nachsprechen (Aufnahme, nochmal klicken zum Stoppen) · 🔁 Original und eigene Aufnahme direkt hintereinander.

## Darstellung
*Einstellungen → Darstellung:* Modus (Automatisch / Hell / Dunkel / Sepia), Akzentfarbe (8 Vorgaben oder eigene Farbe), Schriftgröße.

## iPad & iPhone
Die App ist online unter **https://juvor.github.io/koreanisch-lernapp/** – einmal öffnen, danach läuft sie offline.
1. Auf iPad/iPhone die Adresse in **Safari** öffnen → Teilen-Symbol → **„Zum Home-Bildschirm“**.
2. Ab jetzt über das Symbol auf dem Home-Bildschirm starten (auch im Flugmodus). Immer diesen Weg nutzen – Safari, Firefox und das Home-Bildschirm-Symbol haben jeweils einen eigenen Speicher.
3. **Vokabeln & Lernstand übertragen:** am PC *Einstellungen → Backup herunterladen* (z. B. in einen Cloud-Ordner wie OneDrive oder iCloud Drive), auf dem iPad über die Dateien-App *Einstellungen → Backup wiederherstellen*. Geräte gleichen sich nicht automatisch ab.
4. Updates: Wenn die App am PC verbessert und veröffentlicht wurde, lädt das iPad die neue Version beim nächsten Start mit Internet (eventuell zweimal öffnen).
Eigene Vokabelpakete aus dem Ordner `vokabeln/` sind bewusst **nicht** online – sie kommen über das Backup aufs iPad.


## Backups – wo speichern?
In einem Cloud-Ordner (z. B. OneDrive oder iCloud Drive, Unterordner `Sprach-Backups`) – synchronisiert und auf dem iPad über die Dateien-App erreichbar.
Der Browser lädt nach *Downloads* – Datei dorthin verschieben oder im Browser „Jedes Mal fragen, wo gespeichert wird“ einstellen.
Etwa wöchentlich sichern, die letzten 3–4 Backups behalten.
