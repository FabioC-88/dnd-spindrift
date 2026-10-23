export const meta = {
  name: 'revisione-atto',
  description: 'Revisione e riscrittura di un capitolo del libro a qualità di manuale pubblicato: pattern AI, coerenza, scontri, PNG',
  whenToUse: 'Lanciato dalla skill revisione-atto, con le sezioni prodotte da dividi.py',
  phases: [
    { title: 'Revisione', detail: '4 revisori indipendenti: prosa/AI, coerenza, scontri e ricompense, PNG' },
    { title: 'Piano', detail: 'un piano unico che concilia le correzioni fra sezioni' },
    { title: 'Riscrittura', detail: 'una sezione per agente, in parallelo' },
    { title: 'Verifica', detail: 'rimontaggio e 3 verifiche avversarie sul testo finale' },
    { title: 'Correzione', detail: 'applica le correzioni verificate' },
  ],
}

// args: { root, scr, file, atto, sections: [{ id, righe, cosa }], note }
//   root     radice del repo
//   scr      cartella di lavoro con S1.md… e originale.md (prodotti da dividi.py)
//   file     capitolo da rivedere, relativo alla radice (es. campagna/libro/atto-1.md)
//   atto     numero dell'atto (1, 2, 3)
//   sections l'elenco JSON stampato da dividi.py
//   note     richieste aggiuntive del DM per questa revisione (facoltativo)
if (!args || !args.root || !args.scr || !args.file || !args.sections || !args.sections.length) {
  return { error: 'mancano gli argomenti: root, scr, file, atto, sections' }
}
const ROOT = args.root
const SCR = args.scr
const FILE = `${ROOT}/${args.file}`
const ATTO = args.atto
const SECTIONS = args.sections
const IDS = SECTIONS.map(s => s.id)
const SEZ_PROGETTO = { 1: '§6.2', 2: '§6.3', 3: '§6.4' }[ATTO] || '§6'

const CONTEXT = `
CONTESTO (lavori nel repo ${ROOT}, campagna D&D 2024 "Lo Stretto in Fiamme", pirati, Greyhawk 576 CY; l'utente è il DM; tutto in italiano).

File:
- Il capitolo da rivedere: ${FILE} (copia identica in ${SCR}/originale.md). È il "libro della campagna", Atto ${ATTO}, scritto come un manuale di avventura: da qui una pipeline estrae le sessioni. I paragrafi che iniziano con ">>" sono testi da leggere ai giocatori. *(inv.)* = inventato per la campagna; *(mia scelta)* = proposta di Claude non ancora confermata dal DM.
- Sezioni del capitolo (numeri di riga dell'originale): ${SECTIONS.map(s => `${s.id} righe ${s.righe}: ${s.cosa}`).join('; ')}.
- Ossatura da rispettare: ${ROOT}/progetto/2026-10-22-campagna-spindrift-design.md (in particolare §4 fazioni, §5 ruoli, §6.1 meccanismo dei rami, ${SEZ_PROGETTO} tabella dell'Atto ${ATTO}, §6.5 lealtà, §7 finali, §8, §9). Regole della nave: ${ROOT}/progetto/2026-10-23-regole-nave-ciurma-infamia.md. Taratura scontri: ${ROOT}/campagna/scontri/00-framework.md e differenze di scheda in ${ROOT}/campagna/scontri/aggiornamenti-schede.md. Glossario: ${ROOT}/campagna/glossario.md. Stato della campagna: ${ROOT}/campagna/contesto.md e ${ROOT}/campagna/stato-nave.md.
- Capitoli degli altri atti già scritti, da tenere coerenti: i file in ${ROOT}/campagna/libro/ diversi da ${args.file}.
- Regole di stile del DM: sezione "Linee guida per le sessioni" di ${ROOT}/CLAUDE.md e il catalogo dei pattern in ${ROOT}/ai/agents/09-read-aloud-reviewer.agent.md. Esempio di tono approvato dal DM (altra campagna): ${ROOT}/ai/esempi/sotdq-dm-notes-sessione-06.md.
- Fonte di materiale ufficiale: ${ROOT}/fonti/Ghosts of Saltmarsh.md (inglese).

RICHIESTA DEL DM (parole sue, riassunte fedelmente):
1. Rilevare il testo chiaramente scritto da un'AI e correggerne i pattern, compresi spazi o caratteri nascosti e l'abuso del trattino lungo "—" (restano ammessi solo in «[NOTA DM — riservata]» e in «**Da recitare** —», convenzioni della pipeline).
2. Il capitolo deve essere coerente e ben scritto al livello di una campagna pubblicata, o meglio, e sembrare scritto da un vero essere umano.
3. Scontri e ricompense coerenti, con gli scontri SUL LATO ARDUO.
4. PNG che si comportano in modo congruo e ben caratterizzati, come persone reali.
5. Ogni situazione in cui si trovano i PG deve sembrare naturale, non forzata ai fini dell'avventura: ciò che accade deve essere, o almeno sembrare, conseguenza logica delle azioni dei PG, e il mondo deve evolversi in modo naturale e coerente.
${args.note ? `\nRICHIESTE AGGIUNTIVE DEL DM PER QUESTA REVISIONE:\n${args.note}\n` : ''}
TARGET "LATO ARDUO" (budget DMG 2024 già moltiplicato per 5 PG, sommando gli XP ufficiali senza moltiplicatori): scontro culminante di un ramo fra 1,0 e 1,25 × Alta del livello di taratura; scontri secondari e costi delle chiavi mancanti fra Moderata e Alta; il prologo di un atto, se ha un solo scontro, fra Moderata e Alta; la seconda ondata vale almeno un terzo dello scontro ed entra su un evento della scena; i "gruppi" di nemici minori per la Bilancia valgono circa 1/4 del budget dello scontro. Soglie per 5 PG (Moderata / Alta / 1,25 × Alta): liv5 3.750 / 5.500 / 6.875; liv6 5.000 / 7.000 / 8.750; liv7 6.500 / 8.500 / 10.625; liv8 8.500 / 10.500 / 13.125; liv9 10.000 / 13.000 / 16.250; liv10 11.500 / 15.500 / 19.375. XP per CR: 1/8=25, 1/4=50, 1/2=100, 1=200, 2=450, 3=700, 4=1.100, 5=1.800, 6=2.300, 7=2.900, 8=3.900, 9=5.000, 10=5.900, 11=7.200, 12=8.400, 13=10.000. Se ${ROOT}/campagna/scontri/00-framework.md fissa un target diverso, vale il framework.
`

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'identificativo breve con il prefisso del revisore, es. PR-12' },
          section: { type: 'string', enum: [...IDS, 'GLOBALE'] },
          lines: { type: 'string', description: 'righe dell\'originale' },
          quote: { type: 'string', description: 'il testo esatto (o un estratto) che ha il problema' },
          problem: { type: 'string' },
          fix: { type: 'string', description: 'la correzione concreta: testo riscritto, composizione nuova, fatto da aggiungere' },
          severity: { type: 'string', enum: ['alta', 'media', 'bassa'] },
          cross_section: { type: 'boolean', description: 'true se la correzione tocca anche altre sezioni' },
        },
        required: ['id', 'section', 'lines', 'problem', 'fix', 'severity', 'cross_section'],
      },
    },
    overall: { type: 'string', description: 'giudizio complessivo in 5-10 righe' },
  },
  required: ['findings', 'overall'],
}

const REVIEWERS = [
  {
    key: 'prosa',
    prefix: 'PR',
    label: 'Prosa e pattern AI',
    prompt: `Sei un editor italiano di manuali di gioco di ruolo pubblicati, con l'orecchio allenato a riconoscere il testo generato da un'AI. Leggi TUTTO il capitolo, riga per riga: testi da leggere (>>), battute dei PNG, prosa per il DM, tabelle, titoli.

Cerca e segnala ogni occorrenza (non solo esempi) di:
- caratteri invisibili (spazi non separabili, spazi a larghezza zero, caratteri di formato Unicode), spazi a fine riga o doppi: controllali con uno script;
- trattino lungo "—" usato come inciso o connettivo, e in generale tic tipografici da AI; incoerenze di virgolette, di ellissi, di apostrofi;
- contrasti annunciati ("non X, ma Y", "Non è X. È Y"), tricolon enfatici, frasi a effetto in chiusura, ellissi drammatiche, personificazioni con intenzione, "come se…", "ha l'aria di chi…", spiegazioni del sottotesto, aggettivi che giudicano al posto dei giocatori, glosse emotive;
- formule ripetute in modo meccanico in tutto il capitolo (stesso schema di presentazione per ogni PNG; stesse espressioni ricorrenti; stessi incipit di scena; stessa struttura rigida in ogni ramo; stesse chiuse delle tattiche; ondate sempre allo stesso round), cioè tutto ciò che fa sembrare il testo prodotto in serie;
- elenchi puntati dove un manuale pubblicato scriverebbe prosa (un vero autore alterna paragrafi, elenchi e tabelle secondo il contenuto), ed eccesso di grassetti;
- battute dei PNG che suonano da narratore o da quest-giver invece che da persone (troppo complete, troppo ordinate, che riassumono la trama);
- note in cui l'autore commenta il proprio design invece di dire al DM cosa succede;
- frasi telegrafiche, sintassi da parlato trascritto, dislocazioni, catene di "e", calchi dall'inglese, persona incoerente (voi/tu), testi letti che decidono azioni o sensazioni dei PG, segni *(inv.)* o *(mia scelta)* dentro un testo letto, anacronismi (polvere da sparo, stampa) per Greyhawk 576 CY;
- errori di italiano, refusi, termini non conformi al glossario.

Per ogni problema dai la correzione concreta (il testo riscritto, in un italiano naturale da autore umano). Ordina per sezione.`,
  },
  {
    key: 'coerenza',
    prefix: 'C',
    label: 'Coerenza e naturalezza',
    prompt: `Sei uno sviluppatore narrativo senior che ha curato campagne pubblicate e sa come i giocatori veri smontano le trame forzate. Leggi TUTTO il capitolo, il documento di progetto (§4-§9), le regole della nave e gli altri capitoli del libro già scritti.

Verifica:
- CAUSALITÀ: ogni situazione deve nascere da cause plausibili nel mondo o dalle azioni dei PG. Chiediti per ogni evento "perché succede proprio adesso, proprio così, e come fa questo PNG a saperlo?". Segnala coincidenze di comodo (avversari che arrivano nello stesso momento, informazioni che arrivano ai PG al momento giusto senza motivo, PNG che sanno cose che non possono sapere, tempi di viaggio delle notizie e delle navi incoerenti, motivazioni deboli), e scadenze che partono dall'arrivo dei PG invece che dal mondo.
- AGENCY: i PG devono poter scegliere davvero, e ogni ramo deve reggere se i giocatori fanno la cosa imprevista (rifiutano, mentono, uccidono il PNG chiave, arrivano in ritardo, arrivano prima, vanno altrove, usano magie come parlare con i morti o rianimare). Segnala binari, esiti forzati, scene in cui il DM "deve" far succedere qualcosa a prescindere.
- ORDINE DEI RAMI: i rami si giocano in qualsiasi ordine scelto dai giocatori (§6.1). Verifica che ogni ramo funzioni in ogni ordine plausibile: riferimenti a PNG o luoghi non ancora incontrati, chiavi, preclusioni (⛔), l'orologio dopo il 3° ramo, le versioni alternative dei rami, i luoghi visitati prima del ramo che li riguarda.
- MONDO VIVO: il mondo deve evolvere in modo naturale (cosa fanno i PNG e le fazioni mentre i PG sono altrove, come reagiscono alle azioni dei PG nei rami e negli atti precedenti, come si diffondono le notizie, taglie, Infamia).
- COERENZA INTERNA ed ESTERNA: contraddizioni fra sezioni, con il documento di progetto, con le regole della nave, con gli altri capitoli del libro, con lo stato della campagna in contesto.md, con il canone di Greyhawk citato nel progetto. Nomi, date, distanze, chi possiede cosa.
- COMPLETEZZA DA MANUALE: cosa manca perché un DM possa giocare il capitolo senza inventare le cose importanti (cosa succede se…, cronologia degli eventi di fondo, chi sa cosa).

Per ogni problema proponi una correzione concreta e minima che renda la cosa naturale (una causa, un motivo, un'alternativa, un paragrafo da aggiungere), rispettando il documento di progetto. Segna cross_section=true quando tocca più sezioni.`,
  },
  {
    key: 'scontri',
    prefix: 'SR',
    label: 'Scontri e ricompense',
    prompt: `Sei un designer di incontri per D&D 2024 molto rigoroso. Esamina OGNI scontro e OGNI ricompensa del capitolo.

Scontri:
- Verifica nome ufficiale inglese, CR e XP di ogni creatura citata sul Monster Manual 2024 / SRD 5.2 (usa WebSearch e WebFetch, per esempio aidedd.org con le schede 2024, il System Reference Document 5.2 o D&D Beyond). Se un nome non esiste nel MM 2024, dillo e proponi la creatura ufficiale corretta. Se esiste il nome italiano ufficiale dell'edizione italiana 2024 e lo trovi con certezza, indicalo; altrimenti dillo.
- Somma gli XP di ogni scontro (onde comprese) e confrontali con il TARGET LATO ARDUO del contesto, nei casi tipici di Bilancia. Proponi composizioni corrette che stiano nel target, con il conto.
- Valuta la qualità tattica e la letalità reale per 5 PG del livello indicato (economia d'azione, incantesimi ad area dei maghi, veleni, duelli uno contro uno, il terreno, le onde): deve essere arduo, non un massacro scontato né una passeggiata. Proponi correzioni concrete (composizione, onde, terreno, obiettivi alternativi alla vittoria a oltranza, tattiche limitate da ragioni del mondo).
- Controlla i "gruppi" per la Bilancia (≈1/4 del budget), l'uso coerente delle regole della nave (avvicinamento, Bilancia, Infamia, resa, Percezione passiva della ciurma) e i rimandi ad aggiornamenti-schede.md.

Ricompense:
- Coerenza fra rami (valori del bottino di bordo rispetto a §7.1 delle regole, prede, monete personali), con la quantità attesa dal DMG 2024 per i livelli dell'atto e con il §8 del progetto (preferenza per oro, migliorie alla nave e favori; indicativamente un oggetto magico permanente per il gruppo ogni due rami). Conta gli oggetti magici permanenti dati in tutto l'atto, anche rispetto agli atti precedenti.
- Distinzione corretta fra bottino di bordo (si divide con la ciurma) e tesori personali (§7.1); rami senza distribuzione e la regola della fame (§3.2).
- Infamia assegnata secondo §7.3.

Per ogni problema dai la correzione concreta con i numeri.`,
  },
  {
    key: 'png',
    prefix: 'PNG',
    label: 'Caratterizzazione dei PNG',
    prompt: `Sei uno scrittore di personaggi per campagne pubblicate. Fai l'inventario di TUTTI i PNG del capitolo (compresi i marinai, i prigionieri, le comparse con nome, i nemici con nome) e valuta ciascuno come una persona reale.

Per ognuno chiediti: cosa vuole, di cosa ha paura, cosa sa e cosa no, cosa ha da perdere, come reagisce alle scelte probabili dei PG (accordo, rifiuto, minaccia, corruzione, violenza, inganno), se il suo comportamento è congruo da una scena all'altra, da una sezione all'altra e con gli atti precedenti, se ha una voce sua o se parla come tutti gli altri, se è un distributore di missioni travestito da persona.

Segnala:
- PNG piatti o formulaici, presentati tutti con lo stesso schema;
- comportamenti incongrui con le loro motivazioni (es. un capo che rivela troppo, un nemico che aspetta per comodità di trama, un alleato che aiuta senza un perché);
- battute che non suonano come quella persona;
- PNG importanti a cui manca qualcosa che il DM deve sapere per interpretarli (cosa fanno se…, un segreto, un limite, un desiderio contraddittorio);
- occasioni mancate di ambiguità morale (la campagna vuole PG pirati moralmente ambigui).

Proponi correzioni concrete: righe di motivazione, reazioni, battute riscritte, dettagli che li rendono veri. Non stravolgere i PNG che vengono dal documento di progetto.`,
  },
]

phase('Revisione')
const reviews = await parallel(REVIEWERS.map(r => () =>
  agent(`${CONTEXT}\n\nIL TUO COMPITO (${r.label}):\n${r.prompt}\n\nUsa il prefisso «${r.prefix}-» negli id dei rilievi. Non modificare nessun file. Restituisci i risultati nello schema richiesto.`,
    { label: `revisione:${r.key}`, phase: 'Revisione', schema: FINDINGS })
    .then(res => res ? { key: r.key, label: r.label, ...res } : null)))
const okReviews = reviews.filter(Boolean)
const allFindings = okReviews.flatMap(r => r.findings.map(f => ({ ...f, reviewer: r.key })))
log(`Revisione: ${allFindings.length} rilievi da ${okReviews.length}/${REVIEWERS.length} revisori`)
if (okReviews.length < REVIEWERS.length) {
  log(`Attenzione: mancano i revisori ${REVIEWERS.filter(r => !okReviews.find(o => o.key === r.key)).map(r => r.label).join(', ')}`)
}

phase('Piano')
const PLAN = {
  type: 'object',
  properties: {
    global_decisions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          decision: { type: 'string' },
          affects: { type: 'array', items: { type: 'string' } },
        },
        required: ['decision', 'affects'],
      },
    },
    per_section: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string', enum: IDS },
          instructions: { type: 'string', description: 'istruzioni complete e autosufficienti per chi riscrive la sezione: cosa cambiare, con i testi e i numeri decisi' },
          finding_ids: { type: 'array', items: { type: 'string' } },
        },
        required: ['section', 'instructions', 'finding_ids'],
      },
    },
    rejected: {
      type: 'array',
      items: { type: 'object', properties: { id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] },
    },
    proposals_for_dm: {
      type: 'array',
      description: 'modifiche fuori dal capitolo (regole, framework, schede, glossario, progetto) da proporre al DM e non applicare',
      items: { type: 'string' },
    },
  },
  required: ['global_decisions', 'per_section', 'rejected', 'proposals_for_dm'],
}
const plan = await agent(`${CONTEXT}

Sei il curatore editoriale del capitolo. ${okReviews.length} revisori indipendenti hanno prodotto questi rilievi (JSON):
${JSON.stringify(okReviews.map(r => ({ revisore: r.label, giudizio: r.overall, rilievi: r.findings })), null, 1)}

Leggi il capitolo e il documento di progetto, poi produci UN piano di revisione coerente:
- decidi ogni conflitto fra rilievi (un rilievo può essere sbagliato: rifiutalo con il motivo in "rejected"; verifica tu i fatti contestati, per esempio un CR, rileggendo le fonti o cercando sul web);
- fissa le decisioni globali che toccano più sezioni (fatti di fondo, cronologia, motivazioni, nomi, chi sa cosa, composizioni degli scontri, politica delle ricompense, eventuali sezioni nuove) in modo che ${SECTIONS.length} scrittori che lavorano in parallelo, ognuno su una sezione, producano un capitolo coerente;
- per ogni sezione ${IDS.join(', ')} scrivi istruzioni COMPLETE e autosufficienti: chi le riceve vede solo le istruzioni della sua sezione, le decisioni globali e il capitolo originale. Includi le composizioni degli scontri con il conto degli XP, i valori delle ricompense, le battute o i fatti da cambiare;
- la riscrittura deve portare tutto il capitolo a qualità di manuale pubblicato e a una voce umana: chiedi esplicitamente di riscrivere da capo le parti formulaiche, non di ritoccarle;
- rispetta il documento di progetto (rami, chiavi, preclusioni, segnali, ruoli): se un rilievo chiede di cambiarlo, non farlo nel capitolo; mettilo in "proposals_for_dm". Lo stesso per ogni modifica a regole, framework, aggiornamenti-schede.md o glossario: gli scrittori toccano solo il capitolo.

Non modificare file.`, { label: 'piano', phase: 'Piano', schema: PLAN })

if (!plan) return { error: 'piano non prodotto', revisori: okReviews.map(r => r.label), rilievi: allFindings }

phase('Riscrittura')
const globalText = plan.global_decisions.map((g, i) => `${i + 1}. ${g.decision} [tocca: ${g.affects.join(', ')}]`).join('\n')
const rewrites = await pipeline(SECTIONS, s => {
  const sec = plan.per_section.find(p => p.section === s.id)
  const rel = allFindings.filter(f => f.section === s.id || (sec && sec.finding_ids.includes(f.id)))
  const last = s.id === IDS[IDS.length - 1]
  return agent(`${CONTEXT}

Sei l'autore che riscrive la sezione ${s.id} (${s.cosa}, righe ${s.righe} dell'originale). Il file della sezione è ${SCR}/${s.id}.md: è l'UNICO file che modifichi, riscrivendolo per intero con lo strumento Write. Leggi però tutto il capitolo originale (${SCR}/originale.md) per la continuità, e le fonti che ti servono.

DECISIONI GLOBALI DEL CURATORE (valgono per tutte le sezioni, rispettale alla lettera):
${globalText}

ISTRUZIONI PER LA TUA SEZIONE:
${sec ? sec.instructions : '(nessuna istruzione specifica: applica comunque le decisioni globali e lo standard qui sotto)'}

RILIEVI DEI REVISORI CHE RIGUARDANO LA TUA SEZIONE (il curatore li ha già vagliati; quelli rifiutati sono: ${plan.rejected.map(r => r.id).join(', ') || 'nessuno'}):
${JSON.stringify(rel, null, 1)}

STANDARD DI SCRITTURA:
- Qualità di un manuale di avventura pubblicato, scritto da un autore umano con una voce propria. Prosa per il DM chiara e informativa, che alterna paragrafi, elenchi e tabelle secondo il contenuto (non tutto a elenchi). Varia le strutture: niente schema identico ripetuto in ogni ramo se il contenuto non lo richiede, niente formule ripetute.
- Testi da leggere (>>) e battute: regole di CLAUDE.md e catalogo dell'agente 09; italiano naturale, presente, voi; nessun trattino lungo come inciso; virgolette coerenti con il resto del capitolo.
- Mantieni: il marcatore >> per i testi da leggere, *(inv.)* e *(mia scelta)* dove servono (fuori dai testi letti), le intestazioni dei rami e la tabella Richiede/Sblocca/Preclude/Segnali di ogni ramo, la struttura generale. Il primo e l'ultimo rigo del file devono continuare a raccordarsi con le sezioni vicine${last ? ' (sei l\'ultima sezione: il file finisce con un a capo)' : ' (la sezione finisce come nell\'originale, di solito con il separatore --- e una riga vuota)'}.
- Non inventare elementi in conflitto con il documento di progetto, con gli altri capitoli del libro o con le decisioni globali. Non modificare altri file del repo.

Restituisci un riepilogo di massimo 15 righe: cosa hai cambiato, e ogni problema che tocca un'altra sezione e che non potevi risolvere tu.`, { label: `riscrittura:${s.id}`, phase: 'Riscrittura' })
})

phase('Verifica')
await agent(`Fai una copia di sicurezza di ${FILE} in ${SCR}/pre-rimontaggio.md. Poi concatena in ordine i file ${SECTIONS.map(s => `${SCR}/${s.id}.md`).join(', ')} nel file ${FILE} (sovrascrivilo), per esempio con: cat ${SECTIONS.map(s => `"${SCR}/${s.id}.md"`).join(' ')} > "${FILE}". Poi controlla che fra una sezione e l'altra non ci siano righe duplicate, separatori doppi o righe vuote multiple, e correggi solo quelle giunture. Controlla anche, con uno script, che nel file non ci siano caratteri invisibili (spazi non separabili, spazi a larghezza zero, caratteri di formato Unicode), spazi a fine riga o doppi spazi interni, e rimuovili. Restituisci il numero di righe finale e cosa hai sistemato.`,
  { label: 'rimontaggio', phase: 'Verifica', effort: 'low' })

const ISSUES = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          lines: { type: 'string' },
          quote: { type: 'string' },
          problem: { type: 'string' },
          fix: { type: 'string' },
          severity: { type: 'string', enum: ['alta', 'media', 'bassa'] },
        },
        required: ['lines', 'quote', 'problem', 'fix', 'severity'],
      },
    },
    verdict: { type: 'string' },
  },
  required: ['issues', 'verdict'],
}
const VERIFIERS = [
  { key: 'voce', prompt: `Verifica avversaria della VOCE. Leggi il capitolo finale ${FILE} come lo leggerebbe un editor che deve decidere se è stato scritto da un'AI. Cerca ogni pattern residuo (trattini lunghi fuori dalle due convenzioni ammesse, contrasti annunciati, tricolon, chiuse a effetto, formule ripetute fra rami, schemi identici di presentazione dei PNG, elenchi meccanici, battute da narratore, note in cui l'autore commenta il design, calchi, errori di italiano, persona incoerente nei testi letti, virgolette incoerenti, segni (inv.)/(mia scelta) dentro testi letti, caratteri invisibili). Riporta solo problemi reali, ciascuno con la correzione esatta.` },
  { key: 'logica', prompt: `Verifica avversaria della LOGICA. Leggi il capitolo finale ${FILE}, il documento di progetto ${ROOT}/progetto/2026-10-22-campagna-spindrift-design.md e gli altri capitoli di ${ROOT}/campagna/libro/. Cerca contraddizioni fra sezioni (nomi, fatti, cronologia, chi sa cosa, valori), rami che non reggono in un ordine diverso, situazioni forzate o coincidenze di comodo rimaste, PNG che si comportano contro le proprie motivazioni, divergenze dal progetto e dalle regole della nave non segnate come *(mia scelta)*. Riporta solo problemi reali, ciascuno con la correzione esatta.` },
  { key: 'numeri', prompt: `Verifica avversaria dei NUMERI. Leggi il capitolo finale ${FILE}. Per ogni scontro ricalcola gli XP con i CR ufficiali del Monster Manual 2024 (verifica sul web ogni creatura di cui non sei certo) e confrontali con il target lato arduo del contesto nei casi tipici di Bilancia; controlla gruppi della Bilancia, seconde ondate, ricompense (bottino di bordo vs personale, totale degli oggetti magici permanenti, valori coerenti con le regole §7.1) e Infamia (§7.3). Riporta solo problemi reali, ciascuno con la correzione esatta e il conto.` },
]
const verdicts = await parallel(VERIFIERS.map(v => () =>
  agent(`${CONTEXT}\n\n${v.prompt}\n\nNon modificare file.`, { label: `verifica:${v.key}`, phase: 'Verifica', schema: ISSUES })
    .then(r => r ? { key: v.key, ...r } : null)))
const okVerdicts = verdicts.filter(Boolean)
const issues = okVerdicts.flatMap(v => v.issues.map(i => ({ ...i, verifier: v.key })))
log(`Verifica: ${issues.length} problemi residui da ${okVerdicts.length}/${VERIFIERS.length} verificatori`)

phase('Correzione')
let fixSummary = 'nessun problema residuo'
if (issues.length) {
  fixSummary = await agent(`${CONTEXT}

Tre verificatori indipendenti hanno trovato questi problemi residui nel capitolo finale ${FILE}:
${JSON.stringify(issues, null, 1)}

Decisioni globali del curatore, da rispettare:
${globalText}

Prima fai una copia di sicurezza del file in ${SCR}/pre-verifica.md. Poi, per ogni problema: controlla che sia reale rileggendo il punto e le fonti; se lo è, correggilo direttamente nel file con lo strumento Edit, nello stile del resto del capitolo (manuale pubblicato, voce umana, regole di CLAUDE.md). Se un problema è falso, non toccare il testo. Se la correzione richiede di modificare un file diverso dal capitolo (regole, framework, schede, glossario), non farlo: elencala come proposta per il DM. Se ti discosti da una decisione globale del curatore, dillo. Alla fine ricontrolla il file per caratteri invisibili e spazi a fine riga.
Restituisci: quanti problemi hai corretto, quanti hai scartato e perché (una riga ciascuno), dove ti sei discostato dalle decisioni del curatore, e le proposte per il DM.`, { label: 'correzione', phase: 'Correzione' })
}

return {
  file: args.file,
  revisori: okReviews.map(r => ({ revisore: r.label, rilievi: r.findings.length, giudizio: r.overall })),
  piano: { decisioni_globali: plan.global_decisions, rifiutati: plan.rejected, proposte_per_il_dm: plan.proposals_for_dm },
  riscritture: rewrites,
  verifiche: okVerdicts.map(v => ({ verificatore: v.key, problemi: v.issues.length, verdetto: v.verdict })),
  correzione: fixSummary,
}
