# Lo Stretto in Fiamme: regole di nave, ciurma e Infamia

*Complemento al documento di progetto `2026-10-22-campagna-spindrift-design.md` (§9). D&D 2024, base* Ghosts of Saltmarsh *(GoS), Appendice A, testo in `fonti/`.*
*Stato: bozza, data 2026-10-23.*

Legenda: quello che non è marcato l'ha deciso il DM. *(mia scelta)* = proposta mia, da verificare.

---

## 1. Intento

### Quando queste regole devono farsi sentire
Le regole servono in due momenti al tavolo, e solo lì devono pesare davvero:
1. **Negli abbordaggi.** La ciurma combatte sullo sfondo mentre i PG affrontano i comandanti nemici. Se la ciurma dei PG è più forte di quella nemica, i PG hanno un vantaggio; se è più debole, uno svantaggio.
2. **Quando la ciurma minaccia l'ammutinamento.** Succede perché i PG non l'hanno pagata, l'hanno messa troppo in pericolo, non si sono dimostrati degni, oppure si sono comportati contro la sua **indole**.

### Principi
- **I giocatori non gestiscono la ciurma in combattimento.** Niente pedine, niente tiri per i marinai.
- **La ciurma si può migliorare, ma più è forte più è difficile da gestire.** Ogni miglioramento è un gruppo di persone con un'indole propria: dà forza, ma porta con sé cose che vuole e cose che non tollera.
- **L'ammutinamento è una scena giocata**, e la sua forma dipende dall'indole della ciurma: i disciplinati mandano un portavoce a sfidare il capitano, i sanguinari attaccano i PG tutti insieme.
- **Il quartiermastro è un PNG eletto dalla ciurma.** Il PG del ruolo "Quartiermastro" diventa Capitano nel prologo e il suo posto va a un PNG.
- **L'Infamia ha due facce:** i mercanti si arrendono subito, ma Aerdy alza la taglia.
- **Il combattimento tra navi dura pochi round**, poi si salta all'abbordaggio.
- **La contabilità la tiene Claude** nel file `campagna/stato-nave.md` (§8). Al tavolo il DM guarda solo una scheda di una pagina.

### Non obiettivi
- Un gioco di guerra navale con punti ferita delle navi, velocità in piedi e griglie di movimento.
- Contare i singoli marinai.

### Cose da evitare (anche se le regole "funzionano")
- Un ammutinamento che arriva a sorpresa: ci sono sempre segnali prima (§4.3).
- Miglioramenti della ciurma senza prezzo.
- Una ciurma che vince lo scontro al posto dei PG: la differenza di forza aggiunge o toglie nemici minori, non decide l'esito.
- Calcoli al tavolo durante la sessione.
- Regole che contraddicono il documento di progetto: "fallire in avanti", i tre stati della nave, la battaglia finale in 3 scene di abbordaggio. **Unica eccezione voluta dal DM:** un ammutinamento perso contro tutta la ciurma può lasciare i PG senza ciurma o senza nave (§4.4).

### Corrispondenza con gli ufficiali di GoS
GoS chiama *Quartermaster* chi traccia la rotta. In questa campagna lo fa il Navigatore. Dove GoS dice:

| GoS | Qui |
|---|---|
| Captain | **Capitano** (il PG ex Quartiermastro) |
| First Mate | **Capitano** o **quartiermastro PNG** (morale) |
| Quartermaster | **Navigatore** (rotta) |
| Bosun | **Nostromo** (riparazioni, disciplina) |
| — | **Maestro d'armi** (balista e mangano) |
| — | **Scrivano** (bandiere, carichi, trattative, conti del bottino) |

---

## 2. La nave

Nave a vela di GoS: ciurma 30, passeggeri 20, stiva 100 tonnellate, balista e mangano, niente remi, andatura 5 mph (120 miglia al giorno). Il nome lo scelgono i giocatori.

### 2.1 Stati
Restano i tre stati del documento di progetto, più un quarto che vale solo come esito estremo *(mia scelta per gli effetti)*:

| Stato | Effetto | Riparazione |
|---|---|---|
| **Integra** | — | — |
| **Danneggiata** | andatura −1 mph (−24 miglia al giorno, regola GoS: −10 piedi) | in porto: 3 giorni e 300 mo |
| **Gravemente danneggiata** | andatura −2 mph; svantaggio alle prove di Manovra (§5) e nelle fughe | in porto: 7 giorni e 1.000 mo. In mare il Nostromo può riportarla a Danneggiata: un giorno di lavoro e una prova con gli attrezzi da falegname CD 15 |
| **Alla deriva** | non si muove | rimorchio fino a un porto, poi come Gravemente danneggiata |

- La nave scende di uno stato ogni **2 Danni** subiti nell'avvicinamento (§5).
- **Fallire in avanti:** se la nave dei PG finisce alla deriva, il nemico li abborda (abbordaggio con Bilancia −2, §6). Dopo lo scontro la nave è Gravemente danneggiata, ma resta dei PG.
- Una nave **nemica** alla deriva è catturata, oppure affonda se il DM lo preferisce.

### 2.2 Potenziamenti della nave
Quelli di GoS (*Superior Ship Upgrades*: 15.000 mo e 1d4 settimane in porto). Ai livelli 5–10 sono rari: il costruttore li usa come **premi di ramo**, non come acquisti *(mia scelta)*.

### 2.3 Cambio di nave (idea aperta)
Catturare una nave più grande, per esempio una nave da guerra nell'Atto II ①. Una nave da guerra vuole 40 marinai: finché non si recluta un altro tratto (§3.3) la ciurma è sotto organico e la Forza scende di 1 *(mia scelta)*. Da decidere se e quando offrirlo.

---

## 3. La ciurma

La ciurma ha **tre valori**: Forza (quanto vale), Morale (se segue il capitano) e Indole (i suoi tratti).

### 3.1 Forza (da 0 a 5)
**Forza = 1 + 1 per ogni tratto + Armamento − Perdite** *(mia scelta)*.
- **Armamento:** +1 una tantum, comprando armi e corazze per tutta la ciurma (1.000 mo in un porto grande).
- **Perdite:** −1 dopo un abbordaggio Disperato (§6) o quando un gruppo lascia la nave senza essere sostituito, finché non si recluta in porto (200 mo, un giorno).
- **A inizio campagna:** Forza 2 (base 1 + tratto *Corsari delle Baronie*).

Dove GoS usa la *crew quality*, si usa la Forza:
- iniziativa della nave: d20 + Forza;
- Percezione passiva della ciurma per notare minacce in viaggio: 10 + Forza;
- tiro della ciurma nelle prove di gruppo contro i pericoli di GoS (tempesta, nebbia, incendio): d20 + Forza.

### 3.2 Morale (da 0 a 5)
Il Morale dice se la ciurma segue il capitano. **A inizio campagna: 3.**

**Sale di 1** *(mia scelta)*:
- bottino distribuito con la quota piena (§7), al massimo una volta per ramo;
- un tratto ottiene **ciò che vuole** (§3.3), al massimo una volta per ramo per ciascun tratto;
- almeno 3 giorni in un porto amico, ma solo fino a 3 (dalla regola GoS del congedo a terra);
- il Capitano **si dimostra degno** davanti alla ciurma: vince un duello, guida l'abbordaggio in prima fila, salva marinai a proprio rischio;
- il Capitano **rincuora la ciurma**: una prova di Carisma (Persuasione o Intimidire) con CD **10 + 2 × numero di tratti**, una volta per traversata o per ramo. Se fallisce di 5 o più, Morale −1.

**Scende di 1** *(mia scelta)*:
- una distribuzione con quota non pagata o ridotta (§7);
- due rami consecutivi senza alcuna distribuzione ("la ciurma ha fame");
- un abbordaggio Disperato (§6), oppure la nave che scende a Gravemente danneggiata;
- **troppo pericolo**: affrontare un ramo tarato sopra il livello dei PG, attraversare i Denti alla cieca, cercare lo scontro con forze chiaramente superiori;
- il Capitano **si dimostra indegno**: abbandona i compagni o la ciurma in uno scontro, perde un duello, viene scoperto a mentire alla ciurma. La nave che fugge nell'avvicinamento (§5) non conta: è una scelta da marinai *(mia scelta)*.

**Scende di 2:** un tratto subisce **ciò che non tollera** (§3.3).

**Niente salti** *(mia scelta)*: un singolo evento non porta mai il Morale da 2 o più direttamente a 0, ma si ferma a 1. Così i segni visibili (§4.3) arrivano sempre prima dell'ammutinamento.

**Soglie:**

| Morale | Stato | Effetto |
|---|---|---|
| 5 | **Devota** | +1 alla Bilancia d'abbordaggio (§6) |
| 3–4 | **Salda** | — |
| 2 | **Mugugni** | il quartiermastro PNG avverte il Capitano e dice cosa vuole la ciurma |
| 1 | **Sull'orlo** | segni visibili: risse, sabotaggi, un ultimatum. −1 alla Bilancia d'abbordaggio |
| 0 | **Ammutinamento** | scena di ammutinamento (§4) alla prima occasione tranquilla: di notte, in mare o in porto |

### 3.3 Indole: i tratti
L'indole è fatta di **tratti**, cioè gruppi di marinai con un'origine comune. Al massimo **3 tratti attivi**.

Ogni tratto:
- **Dà** +1 alla Forza, e a volte un effetto in più.
- **Vuole** qualcosa: quando lo ottiene, Morale +1.
- **Non tollera** qualcosa: quando succede, Morale −2.
- Ha una **forma di ammutinamento** sua (§4.2).

Il menu che segue è tutto *(mia scelta)* tranne lo spirito dei Liberi e dei sanguinari, che è del DM.

| Tratto | Dove si recluta | Dà | Vuole | Non tollera | Ammutinamento |
|---|---|---|---|---|---|
| **Corsari delle Baronie** *(iniziale)* | è la ciurma di Vell | +1 Forza | una lettera di corsa, prede della Lega di Ferro | attaccare navi delle Baronie di Foy (non quelle di Aerdy: il galeone del tributo e la sua scorta sono di Aerdy) | **Sfida**: un portavoce sfida il capitano |
| **Liberi** | la Rada (🔑 Accesso alla Rada) | +1 Forza | colpire Aerdy; il rispetto del codice della Rada | servire Aerdy; vendere un Libero | **Voto** secondo il codice della Rada |
| **Sanguinari** | il Mercato, o i pirati catturati | +1 Forza; con Infamia Temuti o più, +1 Bilancia (terrore) | assalti, saccheggi, Infamia che sale | lasciar passare una preda; liberare prigionieri ricchi senza riscatto | **Assalto**: attaccano i PG tutti insieme |
| **Disciplinati** | i disertori di Asperdi (legati al Nostromo) | +1 Forza; vantaggio alle prove di Manovra | ordini chiari e paga regolare | gli eccessi: massacri, uccidere chi si arrende, saccheggiare chi non può difendersi | **Sfida**: un portavoce sfida il capitano |
| **Contrabbandieri** | Rel Astra, il Mercato | +1 Forza; il bottino si vende al 110% | carichi da piazzare e rotte nascoste | che l'Infamia salga a Temuti o Leggendari (una volta per livello); bruciare un carico | **Diserzione**: spariscono di notte in porto, con parte della stiva |
| **Vecchi lupi** | Sulward, o il vecchio della ciurma tornato dalle scogliere bianche | +1 Forza; +2 alla Percezione passiva della ciurma | presagi favorevoli, offerte agli dei del mare prima di salpare | navigare verso l'Isola dei Serpenti; magia necromantica a bordo | **Abbandono**: calano le scialuppe o rifiutano la rotta |
| **Fuggiaschi** | la rete di Tamsin alla Rada (legati al Maestro d'armi) | +1 Forza; +1 Bilancia contro la Brotherhood | colpire la Scarlet Brotherhood | trattare con la Brotherhood; consegnarle qualcuno | **Diserzione** |

**Regole dei tratti:**
- **Reclutare** costa 200 mo e un giorno nel porto indicato, oppure arriva come premio di un ramo (lo decide il costruttore).
- **Un quarto tratto** si recluta solo **sbarcando** uno di quelli attivi. Per farlo bisogna pagargli la sua parte di bottino (pari a una distribuzione); se non la si paga, Morale −1.
- **Tratti in contrasto.** Lo stesso evento può far piacere a un tratto e offenderne un altro: si applicano entrambi gli effetti. Esempio: un massacro dà +1 dai sanguinari e −2 dai disciplinati, cioè −1. Contrasti tipici: sanguinari e disciplinati, sanguinari e contrabbandieri. Con due tratti in contrasto a bordo, in ogni traversata c'è un pericolo **Conflitto nella ciurma** di GoS con CD 15. Gli esiti si leggono sul Morale, non sulla Forza: successo totale Morale +1, fallimento Morale −1, fallimento totale Morale −1 e un caporione si fa avanti (niente ammutinamento immediato, vale la regola "niente salti") *(mia scelta)*.
- **Fine dell'Atto I, la bandiera:**
  - con la bandiera di **Foy**, i Corsari delle Baronie restano;
  - con quella dei **Liberi**, i Corsari diventano **Liberi** senza costo. Se a bordo ci sono già dei Liberi, restano due tratti distinti con le stesse righe ("Liberi" e "Liberi veterani"), e la Forza non cambia *(mia scelta)*;
  - con il **doppio gioco**, i Corsari restano e la ciurma diffida: Morale −1.

  Così anche a bordo la lealtà paga più del tradimento.
- **Lamarossa (Atto I ③, ramo fallito):** metà della ciurma passa a lui. La Forza scende di 1 per Perdite e il Morale va a 2.

### 3.4 Il quartiermastro (PNG)
Nel prologo, la ciurma elegge Capitano il PG Quartiermastro. Subito dopo **la ciurma elegge il nuovo quartiermastro**, un PNG. Il quartiermastro è la **voce della ciurma**: riferisce i mugugni e nell'ammutinamento sceglie da che parte stare.

**Elezione.** Si tiene quando il posto è vacante: nel prologo, se il quartiermastro muore o sbarca, oppure dopo un ammutinamento guidato da lui (§4.4).
- C'è **un candidato per ogni tratto attivo**, con nome e carattere decisi dal costruttore. Se c'è un solo tratto, i candidati sono due, entrambi di quel tratto *(mia scelta)*.
- Il Capitano può **appoggiare un candidato** con una prova di Carisma (Persuasione) CD **10 + 2 × numero di tratti**, con vantaggio se il Morale è 4 o più.
  - Se riesce, vince quel candidato, che è **Leale**.
  - Se fallisce, la ciurma sceglie un altro candidato (lo decide il DM): è **Ambizioso**, e la ciurma, contenta di aver fatto da sé, guadagna Morale +1.
- Nel prologo c'è un solo tratto, quindi i candidati sono due Corsari: la prova decide chi vince, e quindi se il quartiermastro è Leale o Ambizioso.

**Cosa fa:**
- **Leale**: a Morale 2 avverte con precisione cosa vuole la ciurma. A Morale 0 prova a frenare la rivolta, e l'ammutinamento è sempre una **Sfida** formale (§4.2), in cui lui sta con il Capitano.
- **Ambizioso**: a Morale 2 avverte in modo vago. A Morale 0 **guida lui** l'ammutinamento, nella forma del tratto da cui proviene.

---

## 4. L'ammutinamento

### 4.1 Quando
**A Morale 0.** La scena si gioca alla prima occasione tranquilla, nella stessa sessione o all'inizio della successiva. Non è un tiro di dado: è una scena.

**Non si torna indietro** *(mia scelta)*: a Morale 0 l'unica uscita è la scena. Per rimediare ci sono i segnali di Morale 2 e 1.

**Il tratto ribelle** è quello che ha subito ciò che non tollera. Se il Morale è sceso per altri motivi (paga, pericolo, indegnità), è il tratto del quartiermastro; se il quartiermastro è Leale, è il tratto che il DM giudica più scontento *(mia scelta)*.

**La forma** è quella del tratto ribelle. Fa eccezione il quartiermastro Leale: con lui l'ammutinamento è sempre una Sfida.

### 4.2 Le forme *(mia scelta, sulla traccia del DM)*

| Forma | Come si gioca |
|---|---|
| **Sfida** | Un portavoce (un veterano, o il quartiermastro Ambizioso) sfida il Capitano. Il Capitano sceglie tra **duello** (scontro uno contro uno, al primo sangue o all'ultimo) e **processo** davanti alla ciurma (prova di gruppo di Carisma dei PG, CD 15, 3 successi prima di 3 fallimenti). |
| **Voto** | Si vota secondo il codice della Rada, come nel ramo di Lamarossa (Atto I ③). Ogni PG può parlare con una prova di Persuasione, Intimidire o Inganno, CD 10 + 2 × numero di tratti; serve la maggioranza dei successi. |
| **Assalto** | I sanguinari attaccano i PG tutti insieme, di notte. Scontro Moderato al livello dei PG, guidato da un caporione o dal quartiermastro Ambizioso. Il resto della ciurma resta a guardare. |
| **Diserzione** | Di notte, in porto, un gruppo sparisce con parte della stiva. Se l'ufficiale di guardia se ne accorge (Percezione passiva contro 15), diventa un inseguimento tra i moli o una trattativa; altrimenti è un fatto compiuto. |
| **Abbandono** | Il gruppo cala le scialuppe o rifiuta di proseguire la rotta. Lo si convince con Religione o Persuasione (un presagio "giusto", CD 15), oppure si cambia rotta. |

### 4.3 Segnali (il DM li semina sempre)
- **Morale 2:** il quartiermastro va dal Capitano: *"I ragazzi mugugnano: vogliono…"*.
- **Morale 1:** succede qualcosa di visibile, come una rissa, una cima tagliata, un ultimatum scritto o la paga contestata in pubblico.
- In entrambi i casi i PG possono ancora rimediare: pagare, dare al tratto ciò che vuole, rincuorare la ciurma (§3.2).

### 4.4 Esiti
- **I PG vincono:** Morale a 3. Il tratto resta a bordo, domato. Se la rivolta l'ha guidata il quartiermastro Ambizioso, perde il posto (morto, abbandonato o degradato) e si tiene una nuova elezione; un quartiermastro Leale resta. Se i caporioni vengono uccisi o abbandonati su un'isola, la ciurma lo ricorda: i sanguinari approvano, i disciplinati no (applicare ciò che vuole o non tollera).
- **I PG perdono, ma a bordo restano altri tratti:** il tratto ribelle **sbarca al primo porto** portandosi via metà del bottino non distribuito. Gli altri tratti restano con i PG.
  - Se il quartiermastro era con i ribelli, se ne va anche lui e si tiene una nuova elezione.
  - Forza −1 (il tratto perso).
  - Morale a 2, perché chi resta è sollevato.
  - Con la **Diserzione** gli effetti sono gli stessi, ma senza scontro.
- **I PG perdono e i ribelli sono tutta la ciurma** (un solo tratto a bordo, o tutti i tratti dalla stessa parte): **la ciurma se ne va**, con tutto il bottino non distribuito. Come se ne va lo decide la forma dell'ammutinamento *(mia scelta)*:

  | Forma | Cosa succede |
  |---|---|
  | **Diserzione**, **Abbandono** | La ciurma se ne va con le scialuppe o a terra. **I PG restano soli sulla nave.** |
  | **Sfida**, **Voto** | Il portavoce diventa capitano, e secondo il codice chi perde scende al primo porto. **I PG restano a terra, la nave se ne va.** |
  | **Assalto** | Se i PG sono ancora vivi, vengono abbandonati su un'isola o una costa deserta. **La nave se ne va.** |

  Questa è l'unica eccezione voluta al "fallire in avanti" del documento di progetto: **la nave si può perdere solo così**.

#### Soli sulla nave
In cinque si governa a fatica. Con meno di 10 marinai la nave fa una sola azione in combattimento (regola GoS), e la Forza della ciurma è 0.
- **Arrivare in porto:** il porto più vicino si raggiunge in montaggio, con una prova di gruppo del Navigatore e degli altri contro la CD 15. Se fallisce, la nave arriva Danneggiata oppure capita un pericolo GoS di viaggio.
- **Nuova ciurma:** 30 marinai costano 600 mo e arrivano in un giorno. La ciurma nuova parte con Forza 1, Morale 3, nessun tratto e un quartiermastro da eleggere. I tratti si reclutano come al solito (§3.3), e dipendono dal porto.

#### A terra, senza nave
I PG devono procurarsi **una nave e una ciurma**. Il tipo di nave dipende **dagli alleati che hanno**, e quasi sempre i PG si indebitano *(tabella mia scelta)*:

| Da chi | Cosa danno | Debito |
|---|---|---|
| la Vedova Saltrell, cioè i Liberi (serve 🔑 Accesso alla Rada) | una nave a vela usata, Danneggiata, e marinai della Rada (tratto Liberi) | 5.000 mo |
| Foy (serve 🔑 Lettera di Foy) | una nave a vela in buono stato, con ciurma delle Baronie (tratto Corsari) | 6.000 mo e la fedeltà della lettera |
| i contrabbandieri di Rel Astra | un drakkar: veloce, ma con 10 tonnellate di stiva (tratto Contrabbandieri) | 4.000 mo |
| la Signoria, solo se Latmac è stato salvato (Atto III) | una nave da guerra della Signoria | un favore, nessun oro |
| nessuno | una barca a remi e un piano: **rubare una nave** in porto (missione giocata, come una soffiata) | nessuno |

- **Il debito** si salda con il bottino. L'alleato prende un quarto di ogni distribuzione, dopo la quota della ciurma, finché non è pagato. In alternativa chiede un favore, cioè una soffiata "per conto suo".
- **Chi non paga** perde l'alleato: il contatto non dà più soffiate e diventa ostile. È la regola della lealtà applicata ai debiti.
- **La vecchia nave** diventa una nave pirata nemica, comandata dal portavoce o dal quartiermastro che ha guidato la rivolta: un rivale ricorrente. **Riprenderla** è una soffiata giocata. Se ci riescono, i PG tornano alla loro nave e si tengono anche la seconda come preda.
- **Tempo:** procurarsi una nave non conta come ramo e non fa avanzare l'orologio, ma è tempo in cui il mondo va avanti. Le soffiate già offerte scadono.

---

## 5. L'avvicinamento (nave contro nave)

**Al massimo 3 round, poi si salta all'abbordaggio.** È una sfida rapida, non un combattimento tattico.

### 5.1 Il nemico

| Nave nemica | Forza | CD delle prove | Fuoco | Resa con l'Infamia (§7.3) |
|---|---|---|---|---|
| Mercantile | 0 | 12 | +2 | sì |
| Mercantile armato, scorta | 2 | 14 | +4 | sì, più difficile |
| Corsaro o pirata | 2–3 | 14 | +5 | solo da Leggendari |
| Nave da guerra di Aerdy o della Signoria | 3 | 15 | +6 | no |
| Squadra scelta o ammiraglia di Dren | 4–5 | 17 | +8 | no |

*(mia scelta)* Tutte le navi hanno CA 15, come lo scafo delle navi di GoS.

### 5.2 Un round
1. **Il nemico agisce** (o dopo i PG, se la nave dei PG vince l'iniziativa: d20 + Forza contro d20 + Forza). Il DM sceglie una cosa:
   - **Fuoco:** d20 + Fuoco contro CA 15; se colpisce, 1 Danno alla nave dei PG;
   - **Fuga** o **chiusura:** Posizione −1 o +1.
2. **Ogni PG fa una sola azione**, di ruolo o propria:

| Azione | Chi la fa di solito | Prova | Se riesce |
|---|---|---|---|
| **Manovrare** | Navigatore | Saggezza (Sopravvivenza) o strumenti da navigatore | Posizione +1, oppure −1 se si fugge |
| **Fare fuoco** | Maestro d'armi | balista: tiro per colpire +6 (o quello del PG, se più alto) contro CA 15 | 1 Danno al nemico |
| **Mangano** | Maestro d'armi | si carica in un round e tira nel successivo, +5 contro CA 15 | 1 Danno al nemico e la sua Forza −1 per l'abbordaggio |
| **Tenere la nave** | Nostromo | Forza (Atletica) o attrezzi da falegname | annulla 1 Danno subito in questo round |
| **Avanti tutta** | Capitano | Carisma (Persuasione o Intimidire) | Posizione +1 |
| **Intimare la resa** | Capitano | Carisma (Intimidire) con la CD della tabella dell'Infamia (§7.3), non quella della nave; da Sconosciuti non si può tentare | il nemico si arrende, niente abbordaggio |
| **Leggere il nemico** | Scrivano | Intelligenza (Indagare) o Saggezza (Intuizione) | punto debole: +1 alla Bilancia d'abbordaggio (una volta) |
| **Bandiera falsa** | Scrivano | Carisma (Inganno), solo al primo round | il nemico non fa fuoco questo round; Posizione +1 |
| **Azione propria** | chiunque | incantesimo, privilegio, idea | il DM la traduce in uno degli effetti sopra. Per esempio, *palla di fuoco* sul ponte nemico: Forza nemica −1; *folata di vento*: Posizione +1 |

   Le prove hanno la CD della nave nemica (§5.1), tranne Intimare la resa.

3. **Fine del round:**
   - **Posizione +2:** aggancio, si passa all'abbordaggio con +1 alla Bilancia.
   - **Posizione −2:** chi fugge sfugge, e il nemico o i PG escono dalla scena.
   - **Dopo il 3° round:** con Posizione 0 o più, si abborda; altrimenti decide il nemico se fuggire o abbordare lui.

**Danni:** ogni 2 Danni, una nave scende di uno stato (§2.1). Un mercantile Gravemente danneggiato si arrende.

---

## 6. L'abbordaggio: la Bilancia

La ciurma è sfondo e i PG affrontano i comandanti nemici a scala di personaggio, come nel documento di progetto. **Prima dello scontro** il DM calcola **una sola volta** la Bilancia:

**Bilancia = Forza dei PG − Forza nemica**, più questi modificatori:

| Modificatori a favore dei PG | Modificatori contro i PG |
|---|---|
| +1 aggancio fatto dai PG (Posizione +2) | −1 nave dei PG Gravemente danneggiata |
| +1 Morale 5 (Devota) | −1 Morale 1 (Sull'orlo) |
| +1 punto debole (Scrivano) | −2 nave dei PG alla deriva (abbordati) |
| +1 nave nemica Danneggiata o peggio | |
| +1 tratto con effetto specifico (Sanguinari, Fuggiaschi) | |

Colpi di mangano e azioni proprie riducono la Forza nemica, fino a un massimo di −2.

| Bilancia | Esito | Effetto sullo scontro |
|---|---|---|
| +3 o più | **Schiacciante** | Metà dei nemici minori non arriva: la ciurma li tiene impegnati. Quando il comandante nemico scende sotto metà dei punti ferita, gli altri si arrendono. |
| +1 / +2 | **Favorevole** | Un gruppo di nemici minori in meno. I PG hanno vantaggio all'iniziativa. |
| 0 | **Pari** | Lo scontro come è scritto. |
| −1 / −2 | **Sfavorevole** | Al 2° round arriva un gruppo di nemici minori in più. |
| −3 o meno | **Disperato** | Arriva un gruppo in più al 2° round e un altro al 4°. Dopo lo scontro: Morale −1 e Perdite (Forza −1). |

Un **gruppo** vale circa un quarto del budget dello scontro, speso in nemici minori: lo decide il costruttore.

**Battaglia finale (Atto III ⑤):** ognuna delle 3 scene di abbordaggio ha la sua Bilancia. I contingenti guadagnati o persi con le chiavi restano come nel documento di progetto (nemici aggiunti o alleati nella scena dell'ammiraglia), e la Bilancia si somma a questi effetti. Se la flotta dei Liberi è arrivata: +1 alla Bilancia in ogni scena. **Nella battaglia finale la Bilancia non scende sotto −2** (Sfavorevole): la difficoltà la danno già le chiavi mancanti, e i due effetti non si sommano fino allo sterminio *(mia scelta)*.

---

## 7. Bottino, paga e Infamia

### 7.1 Il bottino di bordo
Il **bottino di bordo** è il valore di quello che si prende alle prede: merci, navi vendute, riscatti. Va **venduto** a un ricettatore prima di diventare oro: la Rada, il Mercato, Rel Astra a nord e a metà strada; al sud lo **Scoglio del Mercante** *(inv., mia scelta)*, un covo di contrabbandieri tra le isole esterne della Signoria, fuori dalla portata di Sulward. Sulward stessa non compra bottino: dopo l'orologio dell'Atto I la Signoria ha una taglia sulla nave.

I **tesori personali** trovati nei rami, come oggetti magici e monete del forziere del capitano nemico, restano ai PG e non si dividono *(mia scelta: la ciurma non sa che farsene di una bacchetta)*.

Ordini di grandezza, da tarare dal costruttore *(mia scelta)*:
- mercantile piccolo: 1.000 mo;
- mercantile grande: 3.000 mo;
- galeone del tributo di Aerdy: 10.000 mo.

### 7.2 La paga
**A ogni sosta in un porto amico** con del bottino venduto, il Capitano distribuisce. La quota della ciurma dipende dalla Forza: più è forte, più pretende.

| Forza | 0–1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Quota della ciurma | 40% | 45% | 50% | 55% | 60% |

- **Quota piena:** Morale +1, al massimo una volta per ramo.
- **Quota non pagata o ridotta:** Morale −1, e la differenza resta come **debito**. Alla distribuzione successiva il debito si paga per primo.
- Quello che avanza è dei PG.

### 7.3 L'Infamia
Si misura in **punti**, che determinano il **livello**.

| Punti | Livello | I mercanti | I porti | Aerdy |
|---|---|---|---|---|
| 0–4 | **Sconosciuti** | combattono | nessuno vi conosce | non sa chi siete |
| 5–11 | **Noti** | resa con Intimidire CD 15 | la Rada vi ascolta | taglia di 500 mo; dopo l'orologio dell'Atto II, Rel Astra è un rischio |
| 12–19 | **Temuti** | resa con CD 10; mercantili armati con CD 15 | ricettatori e capitani vi cercano | taglia di 2.000 mo; cacciatori di taglie nei porti |
| 20+ | **Leggendari** | resa senza prova; mercantili armati con CD 10; corsari con CD 15 | i Liberi vi seguono | taglia di 5.000 mo; una nave da guerra vi dà la caccia |

**Si guadagna** *(mia scelta)*:

| Evento | Punti |
|---|---|
| Preda mercantile catturata | +1 |
| Nave armata o da guerra catturata o affondata | +2 |
| Se la nave è di Aerdy | +1 in più |
| Bandiera di fine Atto I (Foy o Liberi) | +1 |
| Doppio gioco a fine Atto I | +3 |
| Il tributo di Aerdy (Atto II ①) | +3 in totale (comprende cattura e bonus Aerdy) |
| Battaglia finale vinta | +3 |

Con circa una soffiata tra un ramo e l'altro (§7.4), i PG chiudono l'Atto I da Noti (circa 6 punti), l'Atto II da Temuti (circa 14), e possono diventare Leggendari nell'Atto III.

**Si perde** −1 per ogni ramo intero passato senza atti di pirateria. **La taglia di Aerdy invece non scende mai**: segue il livello più alto raggiunto. L'orologio dell'Atto II (la taglia ufficiale di Naelax) porta comunque la taglia almeno a 500 mo.

**Si spende.** Una volta per sessione un PG può **far valere la nomea** della nave. Una prova di Intimidire o Persuasione contro chi ne conosce la fama riesce **automaticamente**, purché il bersaglio sia alla portata del livello:
- Noti: popolani, mercanti, guardie di porto;
- Temuti: capitani, ricettatori, funzionari;
- Leggendari: nobili e ammiragli, ma non i nemici giurati.

Ogni volta che si spende, la caccia guadagna **1 traccia**. Alla **3ª traccia** i cacciatori di Aerdy trovano i PG e le tracce tornano a 0. La forza dei cacciatori dipende dal livello d'Infamia:
- Noti: scontro Facile in porto;
- Temuti: scontro Moderato;
- Leggendari: avvicinamento e abbordaggio con una nave da guerra di Aerdy, Moderato.

**Rapporto con i tratti:** ai sanguinari piace che l'Infamia salga, i contrabbandieri lo detestano (§3.3).

### 7.4 Le soffiate: da dove vengono le prede
Le prede arrivano soprattutto dalle **soffiate**: un contatto dice ai PG quale nave passerà, dove e quando. Funzionano come **missioni secondarie** tra un ramo e l'altro.

**Chi le dà** *(mia scelta, sui contatti già presenti nel documento di progetto)*:

| Atto | Contatti | Che navi segnalano |
|---|---|---|
| I | il ricettatore del Mercato; il fratello o la sorella del Nostromo nella flotta di Asperdi; la Vedova Saltrell (con 🔑 Accesso alla Rada) | mercantili della Lega di Ferro e della Signoria; movimenti delle navi di Aerdy |
| II | i contrabbandieri di Rel Astra; l'ex promessa o promesso dello Scrivano a Sulward; la rete di Tamsin | navi della Signoria e dei mercanti di corte; navi della Brotherhood |
| III | i capitani dei Liberi; lo Scoglio del Mercante | rifornimenti della flotta di Dren; navi in fuga dal colpo di stato |

**Il ritmo.** Tra un ramo e l'altro il DM offre **una o due soffiate**: i PG ne scelgono una, oppure nessuna e vanno dritti al ramo. Le soffiate non contano come rami: non fanno salire di livello e non fanno avanzare l'orologio.

**Una soffiata** si scrive su una riga, con cinque voci:
- **nave**: uno dei tipi della tabella §5.1;
- **dove e quando**: per esempio "fra tre giorni, al largo dei Denti";
- **valore**: il bottino (§7.1);
- **complicazione**: un d6, oppure la sceglie il DM;
- **cosa vuole il contatto**: di solito il 10% del bottino, oppure un favore.

| d6 | Complicazione |
|---|---|
| 1 | nessuna: preda pulita |
| 2 | una scorta che la soffiata non diceva (nave un gradino più forte) |
| 3 | a bordo c'è un passeggero importante: riscatto, oppure un seme per un ramo |
| 4 | un pirata rivale arriva per primo |
| 5 | carico vivo: prigionieri o schiavi diretti alla Brotherhood |
| 6 | è una trappola: la soffiata l'ha messa in giro Aerdy, o qualcuno ha venduto i PG |

**Si risolve** in uno di due modi, a scelta del DM:
- **Rapida**, quando non c'è complicazione o non c'è tempo. Prova di gruppo con la CD della nave (§5.1): ogni PG descrive cosa fa nel suo ruolo.
  - Se riesce, preda presa senza danni.
  - Se fallisce, la preda è presa ma la nave dei PG è Danneggiata, oppure la preda scappa (lo sceglie il DM).
- **Giocata**: avvicinamento e abbordaggio (§5–6), da 30 a 45 minuti. Si sceglie quando c'è una complicazione interessante o avanza tempo.

**La lealtà paga anche qui.** Un contatto della fazione a cui i PG sono rimasti leali dà soffiate migliori: valore +50% e complicazione scelta dal DM in senso favorevole. Un contatto tradito smette di darle, oppure ne dà una di tipo 6.

**Con i tratti.** Accettare una soffiata è un assalto, quindi i sanguinari approvano. Rifiutare tutte le soffiate di un intervallo vale come "lasciar passare una preda".

---

## 8. Lo stato della nave e il lavoro tra le sessioni

### 8.1 `stato-nave.md`
È un file nella cartella della campagna, **aggiornato da Claude** dopo ogni sessione. Contiene:
- nave: nome, stato, potenziamenti;
- ciurma: Forza (con il calcolo), Morale, tratti attivi, quartiermastro (nome, tratto, Leale o Ambizioso);
- bottino non venduto, bottino venduto, debito verso la ciurma, debiti con gli alleati;
- Infamia: punti, livello, tracce, taglia di Aerdy;
- contatti: chi dà soffiate e chi è stato tradito;
- **promemoria per la prossima sessione**: cosa sta per succedere. Per esempio: *"Morale 1: la prossima offesa ai Liberi scatena il voto"*, oppure *"2 tracce: alla prossima spesa arrivano i cacciatori"*.

### 8.2 Il giro tra le sessioni
1. Dopo la sessione, il DM racconta a Claude cosa è successo, anche a braccio: prede, distribuzioni, scelte, scontri, chi è stato offeso.
2. Claude applica le regole, aggiorna il file e segnala i promemoria.
3. Prima della sessione, il DM stampa o apre la **scheda di una pagina** (§8.3).

### 8.3 La scheda di una pagina
In alto i numeri attuali: stato della nave, Forza, Morale, tratti con le rispettive righe "vuole / non tollera", quartiermastro, Infamia e tracce. Sotto, le tabelle che servono al tavolo: il round di avvicinamento (§5.2), la Bilancia (§6), la resa (§7.3) e le forme di ammutinamento (§4.2).

### 8.4 Stato iniziale (dopo il prologo)
- **Nave:** nave a vela, nome scelto dai giocatori, Integra.
- **Ciurma:** Forza 2 (base + Corsari delle Baronie), Morale 3, tratto Corsari delle Baronie.
- **Quartiermastro:** eletto nel prologo, Leale o Ambizioso secondo la prova.
- **Bottino:** il carico della *Stella di Sulward*, da vendere.
- **Infamia:** 1 punto (la *Stella*), Sconosciuti.
- **Debito:** 0. **Tracce:** 0.

---

## 9. Lasciato al costruttore

- Nomi e carattere dei candidati quartiermastro, e dei portavoce o caporioni degli ammutinamenti.
- Dove offrire i tratti come premio di ramo, oltre ai porti indicati.
- Composizione dei "gruppi" di nemici minori negli abbordaggi.
- Valori esatti del bottino per ogni preda e per ogni ramo.
- Le soffiate concrete di ogni atto: nave, rotta, complicazione.
- Quali potenziamenti GoS offrire come premi, e se e quando offrire il cambio di nave.
- Pericoli di viaggio di GoS (tempesta, nebbia, incendio, infestazione): facoltativi, al massimo uno per traversata.

## 10. Modifiche da riportare nel documento di progetto
- **§5.1:** il PG Quartiermastro diventa **Capitano** nel prologo. Nel testo dei rami il ruolo resta "Quartiermastro", come nome della scala.
- **§9:** rimandare a questo documento al posto della sezione "In attesa di queste regole".
- **§6.1, Fallire in avanti:** aggiungere "salvo l'ammutinamento, vedi le regole della nave §4.4".
