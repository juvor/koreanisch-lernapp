# Projektregeln

- **ENTWICKLUNG.md immer aktualisieren**, sobald etwas an der App ergänzt oder geändert wird: betroffene Abschnitte anpassen und eine Zeile im Änderungsprotokoll (Abschnitt 11) hinzufügen. Wunsch der Nutzerin / des Nutzers.
- Bei Nutzer-relevanten Änderungen auch ANLEITUNG.md anpassen.
- Bei jeder Änderung an App-Dateien `VERSION` in `sw.js` erhöhen (sonst sieht das iPad die alte Version); neue Dateien in `FILES` eintragen.
- App muss offline und per file:// laufen: keine ES-Module, keine CDNs, keine externen Abhängigkeiten.
- Vor Abschluss: `tests/test.html` über den Server „lernapp“ (.claude/launch.json) ausführen – 0 Fehler.
- Nach jeder Änderung an einer Vokabel-CSV in `vokabeln/`: `python -I vokabeln/build_pakete.py` ausführen, damit die App das Paket zum Import anbietet.
- `js/dialogs.js` und `js/memory.js` sind in beiden Apps identisch – Änderungen immer in beide Projekte kopieren.
- Veröffentlicht über GitHub Pages: https://juvor.github.io/koreanisch-lernapp/ (Repo `juvor/koreanisch-lernapp`, Branch `main`). Nach Änderungen fragen, ob veröffentlicht werden soll (commit + push) – nicht ungefragt pushen. Vorher `VERSION` in `sw.js` erhöhen.
- Commits mit der anonymen Adresse (repo-lokal gesetzt); nie die private E-Mail eintragen.
- **Lernstand & alte Backups schützen:** Kennungen (Vokabel-/Lektions-/Dialog-/Set-ids, Feldnamen) nie umbenennen oder löschen; neue Funktionen nur mit neuen Feldern. Formatänderung → `SCHEMA` + `MIGRATIONS` in core.js + Testfall (Details: ENTWICKLUNG.md, Abschnitt „Datenformat, Backups & Updates“).
