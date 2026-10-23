---
name: revisione-atto
description: >
  Revisione completa di un capitolo del libro della campagna (campagna/libro/atto-N.md) a qualità
  di manuale pubblicato, con un workflow multi-agente: quattro revisori indipendenti (prosa e
  pattern da AI, coerenza e naturalezza, scontri e ricompense, PNG), un piano unico, la
  riscrittura in parallelo per sezioni, tre verifiche avversarie e le correzioni finali.
  Usa questa skill quando il DM chiede di rivedere, rileggere, ripulire o portare a livello di
  campagna pubblicata un atto del libro: "/revisione-atto 2", "rivedi l'atto 1", "togli i pattern
  da AI dall'atto", "controlla che l'atto sia coerente", "rendi gli scontri più duri nell'atto".
  Non serve per le dm-notes delle sessioni: per quelle c'è la revisione finale di /prep-sessione.
---

# Revisione di un atto del libro — /revisione-atto

Esegue sul capitolo indicato lo stesso lavoro fatto sull'Atto I il 2026-10-23. Lo script del
workflow è `.claude/workflows/revisione-atto.js` e la divisione in sezioni la fa
`.claude/skills/revisione-atto/dividi.py`. Il DM chiede che il capitolo:

1. non abbia testo che sembra scritto da un'AI, né caratteri o spazi nascosti;
2. sia coerente e ben scritto come una campagna pubblicata, o meglio, con una voce umana;
3. abbia scontri e ricompense coerenti, con gli scontri **sul lato arduo**;
4. abbia PNG congrui e caratterizzati come persone reali;
5. metta i PG in situazioni naturali, che nascono dalle loro azioni, in un mondo che evolve in
   modo coerente.

Invocare questa skill vale come richiesta esplicita del DM di usare il workflow multi-agente.

---

## Step 0 — Prerequisiti

1. **Atto:** dal comando (`/revisione-atto 2`), altrimenti chiedi al DM quale atto rivedere. Il
   file è `campagna/libro/atto-N.md`; se non esiste, fermati e avvisa il DM.
2. **Richieste in più:** se il DM aggiunge indicazioni (per esempio «più spazio alla ciurma»,
   «scontri ancora più duri»), passale al workflow nel campo `note`, con le sue parole.
3. **Versione di partenza in git:** se `git status --short campagna/libro/atto-N.md` mostra
   modifiche non committate, chiedi al DM se committarle prima, così la versione precedente resta
   recuperabile.
4. **Durata:** avvisa il DM che il workflow gira in background e può richiedere alcune ore (sull'Atto I
   ne ha richieste circa sei e mezza, con 17 agenti). L'avanzamento si segue con `/workflows`.

---

## Step 1 — Dividi il capitolo

La cartella di lavoro è `revisione-atto-N` dentro la scratchpad della sessione, se il sistema ne
indica una (altrimenti una cartella temporanea nuova). Lancia:

```
python3 -I .claude/skills/revisione-atto/dividi.py campagna/libro/atto-N.md <cartella di lavoro>
```

Lo script taglia il capitolo alle intestazioni `## `, unisce le parti più corte di 60 righe alla
successiva, scrive `S1.md`, `S2.md`, … e `originale.md`, controlla che rimontate diano il file di
partenza e stampa in JSON l'elenco delle sezioni. Se esce con un errore, fermati.

---

## Step 2 — Lancia il workflow

Chiama il tool `Workflow` con `name: "revisione-atto"` (se il nome non viene trovato, usa
`scriptPath: ".claude/workflows/revisione-atto.js"` con il percorso assoluto) e questi `args`,
passati come oggetto JSON e non come stringa:

```json
{
  "root": "<percorso assoluto del repo>",
  "scr": "<percorso assoluto della cartella di lavoro>",
  "file": "campagna/libro/atto-N.md",
  "atto": N,
  "sections": [ ...l'elenco stampato da dividi.py... ],
  "note": "<richieste in più del DM, oppure stringa vuota>"
}
```

Il workflow fa, in ordine:

| Fase | Cosa |
|---|---|
| Revisione | 4 revisori indipendenti: prosa e pattern da AI, coerenza e naturalezza, scontri e ricompense (CR verificati sul web), PNG |
| Piano | un curatore concilia i rilievi, fissa le decisioni globali e scrive istruzioni per ogni sezione |
| Riscrittura | uno scrittore per sezione, in parallelo, ognuno sul suo file `S*.md` |
| Verifica | rimontaggio nel capitolo, poi 3 verifiche avversarie: voce, logica, numeri |
| Correzione | un agente applica i problemi residui verificati |

Mentre gira non ripetere il lavoro e non controllarne l'output a intervalli: aspetta la notifica.
Se il DM chiede a che punto è, guarda `journal.jsonl` nella cartella dei transcript del workflow.

---

## Step 3 — Controlla il risultato

1. Leggi il risultato completo del workflow. Se è troncato, leggilo dal file di output con uno
   script che fa il parse del JSON.
2. Controlla il capitolo:
   - caratteri invisibili, spazi a fine riga e doppi spazi (con uno script);
   - trattini lunghi solo in «[NOTA DM — riservata]» e «**Da recitare** —»;
   - numero dei testi da leggere (`^>>`) e `git diff --stat`;
   - una lettura di almeno l'introduzione e di un ramo, per giudicare la voce con i tuoi occhi.
3. Se il rimontaggio ha rotto qualcosa, in `<cartella di lavoro>` ci sono `originale.md`,
   `pre-rimontaggio.md` e `pre-verifica.md`.

---

## Step 4 — Commit e resoconto

Committa solo il capitolo, con un messaggio in stile conventional commit in italiano
(`docs: revisione completa dell'Atto N`). Il push lo fai solo se il DM lo chiede.

Poi riferisci al DM, in breve:
- cosa è cambiato per ognuno dei cinque punti della richiesta;
- la tabella degli scontri (XP e target);
- le ricompense, con il totale degli oggetti magici permanenti;
- le **proposte per il DM** (`proposte_per_il_dm` e quelle della correzione finale): modifiche a
  regole, framework, `aggiornamenti-schede.md`, glossario o progetto. **Non applicarle**: per il
  `CLAUDE.md` le ritarature si propongono, non si applicano senza dirlo;
- i punti in cui la correzione finale si è discostata dalle decisioni del curatore.

Alla fine ricorda al DM di eseguire `/compact`, perché il resoconto del workflow è lungo.
