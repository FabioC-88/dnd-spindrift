---
name: prep-sessione
description: >
  Orchestratore della pipeline di preparazione sessione per la campagna D&D Lo Stretto in Fiamme.
  Usa questa skill ogni volta che il DM vuole preparare una nuova sessione di gioco, anche se
  scrive semplicemente "/prep-sessione", "prepara la sessione", "prossima sessione" o "prepara il
  ramo del Nostromo". Esegue in sequenza gli agenti 1 → 2 → 3 → revisione finale (6 + 9).
  Produce il file dm-notes-sessione-NN.md pronto per il tavolo.
---

# Pipeline Preparazione Sessione — /prep-sessione

Sei l'orchestratore della pipeline DM per Lo Stretto in Fiamme. Il tuo compito è guidare la
preparazione di una sessione eseguendo in sequenza gli agenti di `ai/agents/`.

**Il prodotto è uno solo:** `campagna/sessioni/dm-notes-sessione-NN.md`. Nessuno step crea altri
file (salvo i termini nuovi nel glossario e le creature modificate in
`campagna/scontri/aggiornamenti-schede.md`).

---

## Prima di iniziare

1. **Numero:** il più alto tra i file `campagna/sessioni/dm-notes-sessione-NN.md` + 1; la prima
   sessione è la 01. Se il DM ne indica un altro, usa quello.
2. **Cosa si gioca:** l'ordine dei rami lo scelgono i giocatori, quindi serve sapere dove vanno.
   Cercalo in quest'ordine: richiesta del DM, «Prossima destinazione» nell'`📋 ACCADUTO IN
   SESSIONE` dell'ultima sessione, «Prossima serata» in `campagna/contesto.md`. Se non è deciso,
   **chiedi al DM** mostrando i rami ancora aperti dell'atto (non il loro ordine previsto). Se
   l'atto non è ancora cominciato, la serata è il prologo.
3. **Una sola sessione alla volta:** non preparare rami che i giocatori non hanno scelto.

---

## Come si lancia un agente

Ogni step va eseguito da un **sub-agente** (tool `Agent`, `subagent_type: general-purpose`) con il
modello indicato accanto allo step. Tu orchestri, gli agenti lavorano.

Il prompt di ogni sub-agente è autosufficiente, perché parte senza il contesto della chat:

```
Sessione da preparare: NN. Contenuto: [prologo / Atto e ramo / …], scelto da [giocatori, DM].
Leggi CLAUDE.md, poi leggi ed esegui ai/agents/<file>.agent.md.
File di input: <elenco>. File da modificare: <elenco>.
[Precisazioni del DM date in chat.]
Scrivi i risultati direttamente sui file. Non fare commit.
Restituisci al massimo 15 righe: file modificati, TODO DM, anomalie.
```

**Il file che passa di mano è `campagna/sessioni/dm-notes-sessione-NN.md`:** l'Agente 1 lo crea
con la scaletta, ogni agente successivo lo legge e lo riscrive. Aspetta la notifica di
completamento prima di lanciare lo step dopo.

---

## Pipeline (esegui nell'ordine)

Tra uno step e il successivo, mostra: `✅ Step N completato → avvio Step N+1...`

### Step 1 — Estrazione della serata dal libro · `sonnet`
Sub-agente su `ai/agents/01-session-planner.agent.md`.

Input: `campagna/libro/atto-N.md`, `campagna/contesto.md`, ultima sessione,
`campagna/stato-nave.md`, `campagna/party.md`, `progetto/`, `fonti/Ghosts of Saltmarsh.md`.
Output: scaletta in `dm-notes-sessione-NN.md`: contenuto, taratura, chiavi, estratto del ramo dal
libro con i testi da leggere marcati, segnali, elementi da inventare.

Se l'atto non ha ancora il suo capitolo in `campagna/libro/`, fermati: va scritto prima.

Se l'Agente 1 si ferma perché il contenuto non è deciso o una chiave 🔒 manca, riporta al DM e
aspetta.

### Step 2 — Scrittura · `opus`
Sub-agente su `ai/agents/02-session-writer.agent.md`.

Input: scaletta dello Step 1.
Output: dm-notes complete: fasi, testi da leggere adattati dal libro (un riquadro solo per scena),
battute da recitare, CD, nemici con nome e numero, elementi inventati segnati *(inv.)*.

### Step 3 — Integrazione dei personaggi · `opus`
Sub-agente su `ai/agents/03-session-pc-integrator.agent.md`.

Input: draft dello Step 2.
File da leggere: `campagna/party.md`, `campagna/png-incontrati.md`, `campagna/contesto.md`,
`campagna/stato-nave.md`, `fonti/personaggi/*.md`.
Output: draft con Hook PG, scene opzionali, segnali da seminare per ogni ramo aperto, momenti della
ciurma, note DM riservate, attitudini dei PNG. Le parti aggiunte sono già nello stile dell'Agente 2.

### Step 4 — Revisione finale · `opus`
Un solo sub-agente che esegue, in quest'ordine, `ai/agents/06-session-reviewer.agent.md` e
`ai/agents/09-read-aloud-reviewer.agent.md` su `dm-notes-sessione-NN.md`.

Applica direttamente le correzioni e toglie tutto ciò che non serve al tavolo (sezione «Struttura
delle dm-notes» di `ai/agents/AGENTS.md`), senza scrivere log nel file. Poi ripulisce SETUP
INIZIALE, riquadri `[BT-xx]` e battute dai pattern da AI, e segnala segreti, nomi o descrizioni
doppie finiti nel testo letto al tavolo: riporta queste segnalazioni nel riepilogo finale al DM.

---

## Riepilogo finale

```
✅ Pipeline completata — Sessione NN

Contenuto: [prologo / Atto e ramo] · Tarato a [N] (party al [N])
File prodotto: campagna/sessioni/dm-notes-sessione-NN.md
Testi da leggere: [N] riquadri corretti su [M]
Elementi inventati: [elenco breve, da confermare]
[⚠️ segreti / nomi / doppioni segnalati, se ce ne sono]

Prossimi step manuali:
1. Leggi e approva dm-notes-sessione-NN.md
2. /git-release  (per pubblicare l'aggiornamento su Foundry)
```
