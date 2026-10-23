---
name: aggiorna-sessione
description: >
  Workflow post-sessione per Lo Stretto in Fiamme. Il DM ha appena giocato la sessione N e
  fornisce un recap in forma libera nel prompt. La skill annota dm-notes-sessione-N con quello che
  è successo, tiene la contabilità di nave, ciurma e Infamia (stato-nave e scheda da tavolo),
  aggiorna la memoria degli agenti (party, PNG, contesto e registro dei rami), porta le novità
  nella sessione dopo (o la crea se i giocatori hanno scelto dove andare), la rilegge una volta e
  chiede conferma per la release.
  Uso: "/aggiorna-sessione N" dove N è il numero della sessione APPENA GIOCATA.
  Alias: "abbiamo giocato la sessione N", "recap della sessione N", "aggiorna dopo sessione N",
  e ogni racconto a braccio di una serata giocata.
---

# Workflow Post-Sessione — /aggiorna-sessione

Sei l'orchestratore del flusso post-sessione. Il DM ha appena giocato la sessione **N** e ti
ha dato un recap, in qualsiasi forma. La realtà giocata ha sempre la precedenza sul piano.

Ogni step scrive o nelle dm-notes, o nella contabilità (`campagna/stato-nave.md`,
`campagna/scheda-tavolo.md`), o nei tre file di memoria che gli agenti leggono
(`campagna/party.md`, `campagna/png-incontrati.md`, `campagna/contesto.md`), e in nient'altro.

---

## Step 0 — Prerequisiti

1. **N:** dal comando (`/aggiorna-sessione 4`), altrimenti chiedi al DM quale sessione ha giocato.
2. **dm-notes:** deve esistere `campagna/sessioni/dm-notes-sessione-[N].md`; se manca, fermati
   e avvisa il DM.
3. **Recap:** deve essere nel prompt. Se manca, chiedilo al DM (va bene in forma libera). Chiedi
   **solo** quello che cambia la sessione dopo o la contabilità e il recap non dice:
   - dove si è fermata la serata e se il ramo è completato, fallito o in corso;
   - prede, bottino venduto o distribuito, danni e perdite, offese ai tratti della ciurma,
     testimoni (servono all'Agente 7: `CLAUDE.md` vuole che si chieda prima di decidere);
   - dove sono diretti i giocatori.
   Il resto diventa `[TODO DM]`.
4. **Sessione dopo:** è la N+1. Chiamiamo **S** la sessione dopo.

```
📋 Sessione [N] identificata — prossima serata: [S] ([destinazione, o «da decidere»])
Avvio pipeline post-sessione...
```

---

## Come si lancia un agente

Ogni step è un **sub-agente** (tool `Agent`, `subagent_type: general-purpose`) con il modello
indicato. Tu orchestri, gli agenti lavorano, e si passano il lavoro attraverso i file su disco.

Il prompt di ogni sub-agente è autosufficiente, perché parte senza il contesto della chat:

```
Sessione giocata: N. Prossima serata: S.
Leggi CLAUDE.md, poi leggi ed esegui ai/agents/<file>.agent.md.
File di input: <elenco>. File da modificare: <elenco>.
[Recap del DM incollato per intero, con le precisazioni date in chat.]
Scrivi i risultati direttamente sui file. Non fare commit.
Restituisci al massimo 15 righe: file modificati, TODO DM aperti, anomalie.
```

Tra uno step e il successivo mostra: `✅ Step N completato → avvio Step N+1...`

---

## Pipeline

### Step 1 — Annota la sessione giocata · `sonnet`

Sub-agente su `ai/agents/00-recap-updater.agent.md`.
Input: recap del DM. Modifica solo `campagna/sessioni/dm-notes-sessione-[N].md`: marcatori
✅/⏸️/🔀 sulle fasi e sezione finale `📋 ACCADUTO IN SESSIONE`, con i fatti per la contabilità e
le scene da trasferire a S.

### Step 2 — Contabilità e memoria, in parallelo

Leggono entrambi la sezione `📋 ACCADUTO IN SESSIONE` scritta allo Step 1 e toccano file
diversi: lanciali nello stesso messaggio e aspetta entrambe le notifiche prima dello Step 3.

**Contabilità · `opus`** — sub-agente su `ai/agents/07-ship-accountant.agent.md`. Modifica solo
`campagna/stato-nave.md` e `campagna/scheda-tavolo.md`.

**Memoria · `sonnet`** — sub-agente su `ai/agents/08-context-updater.agent.md`. Modifica solo
`campagna/party.md`, `campagna/png-incontrati.md` e `campagna/contesto.md`.

**Domande per il DM:** se l'Agente 7 restituisce domande (fatti non chiari, regole che non
coprono un caso) o proposte di ritaratura, **mostrale al DM e aspetta la risposta** prima dello
Step 3. Con la risposta, rilancia l'Agente 7 sui soli punti aperti. Le proposte di ritaratura
non si applicano senza il sì del DM.

### Step 3 — Porta le novità nella sessione S · `opus`

Serve sapere cosa si gioca in S (vedi «Prima di iniziare» in `/prep-sessione`). Se i giocatori
non hanno ancora scelto dove andare e non ci sono scene da trasferire, **salta lo Step 3 e lo
Step 4** e dillo nel riepilogo: S si prepara con `/prep-sessione` quando la destinazione è nota.

- **Se `dm-notes-sessione-[S].md` esiste:** un sub-agente, con queste istruzioni nel prompt.
  1. Copia **integralmente** (senza riassumere) le scene elencate in «Scene da trasferire» del
     dm-notes-N e mettile all'inizio delle fasi di S, rinumerando.
  2. Aggiorna intestazione, «Stato in entrata» e SETUP INIZIALE di S con lo stato reale dopo N:
     livello, taratura, dove si trovano nave e party, chi è vivo, cosa sanno, i numeri di
     `stato-nave.md`. Solo lo stato, non la storia di come ci si è arrivati.
  3. Correggi in S solo ciò che i delta di N invalidano (atteggiamenti dei PNG, hook dei PG,
     chiavi e preclusioni, segnali dei rami ancora aperti, momenti della ciurma). Per gli hook
     segui le regole di `ai/agents/03-session-pc-integrator.agent.md`, senza aggiungerne di nuovi.
  4. Se la serata si è fermata a metà scena (es. a metà combattimento), apri S con una sezione
     `🎬 RIPRESA` che dica cosa riaprire su Foundry e rimetta il tavolo nella scena.
- **Se non esiste:** esegui `/prep-sessione` per S (`.claude/skills/prep-sessione/SKILL.md`),
  passando all'Agente 1 il dm-notes-N annotato come punto di partenza. In questo caso lo Step 4 è
  già compreso in `/prep-sessione`.

### Step 4 — Revisione finale della sessione S · `opus`

Un solo sub-agente che esegue, in quest'ordine, `ai/agents/06-session-reviewer.agent.md` e
`ai/agents/09-read-aloud-reviewer.agent.md` su `dm-notes-sessione-[S].md`: coerenza, continuità,
rami e chiavi, incontri (numero corretto di nemici, niente stat block né note di bilanciamento) e
pulizia (sezione «Struttura delle dm-notes» di `ai/agents/AGENTS.md`), poi i testi da leggere al
tavolo. Nessun log nel file. È l'ultimo step che scrive su S.

Se segnala un segreto letto ad alta voce o un nome rivelato in anticipo, riportalo al DM nel
riepilogo finale anche se l'ha già corretto.

### Step 5 — Commit (lo fai tu)

Committa solo i file di contenuto, mai `module.json` né `packs/`: build, versione e pack li
gestisce la CI al momento della release. Se un `npm run build` locale li ha toccati, riportali
com'erano con `git checkout -- module.json packs`.

```
git add campagna/ ai/ .claude/ progetto/ fonti/
git commit -m "docs: sessione [N] giocata → prep sessione [S]"
git push origin main     # solo se il remoto esiste (git remote -v)
```

### Step 6 — Release (con conferma del DM)

Solo se il remoto esiste.

```
📦 RIEPILOGO RELEASE

Aggiornati: dm-notes-sessione-[N].md (giocata), dm-notes-sessione-[S].md, stato-nave e scheda da tavolo, memoria (party, PNG, contesto)
Versione corrente in module.json: [versione]

Vuoi pubblicare su Foundry? (sì / no — e la versione, oppure +patch automatico)
```

Se il DM conferma, esegui la skill `git-release`. Altrimenti chiudi con il riepilogo.

---

## Riepilogo finale

```
✅ Post-sessione completato — Sessione [N]

Sessione [N]: annotata (✅/⏸️/🔀), [N] scene trasferite a [S]
Ramo: [completato / fallito in avanti / in corso] · Chiavi: [...] · Livello: [N] [⬆ se è salito]
Contabilità: [cambiamenti principali, vecchio → nuovo]
Promemoria per la prossima serata: [i 2-3 più urgenti]
Sessione [S]: [aggiornata / creata da zero / da preparare quando i giocatori scelgono], rivista
[⚠️ segreti / nomi / doppioni segnalati dalla revisione, se ce ne sono]

TODO DM aperti:
  [lista, solo fatti di trama o di contabilità: niente su build, equipaggiamento o scelte dei PG]

Release: [completata vX.Y.Z / rimandata / nessun remoto]
```

Se la conversazione è lunga, ricorda al DM di eseguire `/compact` prima di proseguire.
