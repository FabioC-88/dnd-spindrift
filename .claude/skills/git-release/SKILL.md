---
name: git-release
description: >
  Pubblica una nuova versione del modulo Foundry VTT Lo Stretto in Fiamme DM: push di main, poi
  push del tag vX.Y.Z. Build, commit dei pack, zip e GitHub Release li fa la CI (.github/workflows/main.yml).
  Usa questa skill ogni volta che vuoi pubblicare una nuova versione: "/git-release", "/git-release v1.0.6",
  "fai la release", "pubblica la versione su GitHub", "crea il tag e la release". Richiede conferma
  esplicita del DM prima di ogni operazione che modifica lo stato remoto (push, tag).
  NON usare per semplici commit/push senza release — per quelli usa git direttamente.
---

# Workflow Release Foundry VTT — /git-release

**La release la fa la CI.** Al push di un tag `v*`, `.github/workflows/main.yml`:

1. fa il checkout di **`main`** (non del tag: costruisce quello che c'è su `main` in quel momento);
2. scrive in `module.json` la versione del tag e il campo `download`;
3. lancia `SKIP_BUMP=1 npm run build` e committa `module.json` e `packs/` su `main` come
   `chore(release): vX.Y.Z` (autore `github-actions[bot]`);
4. crea lo zip (`module.json` + `packs/` nella root) e la GitHub Release con due asset: lo zip e
   `module.json`.

La skill quindi fa solo due cose: porta `main` sul remoto e **poi** pusha il tag.

**Non** lanciare `npm run build`, non committare `packs/` o `module.json`, non creare zip né release
a mano. Duplicheresti il commit della CI (è successo con la v0.1.6 di Shadow of the Dragon Queen). Se poi il push di `main` non
passa, la CI pubblica i contenuti vecchi (è successo con la v0.1.7 di Shadow of the Dragon Queen, ripubblicata come v0.1.8 il
18/10/2026).

Ogni operazione che modifica lo stato remoto richiede conferma esplicita del DM. Se un comando
fallisce, fermati e segnala l'errore. **Mai pushare il tag se il push di `main` non è riuscito.**

I comandi sono gli stessi in zsh e in PowerShell.

---

## Step 0 — Stato del repo

**Remoto:** se `git remote -v` è vuoto, il repo GitHub non esiste ancora: fermati e chiedi al DM
se crearlo (`gh repo create FabioC-88/spindrift-dm --public --source . --push`). Deve essere
pubblico, perché Foundry scarica il manifest senza autenticazione.

```
git status
git fetch origin
git log --oneline origin/main..main
git log --oneline main..origin/main
```

- **Modifiche non committate:** chiedi al DM se committarle prima, con un messaggio in stile
  conventional commit in italiano.
- **`main..origin/main` non vuoto:** sul remoto ci sono commit che qui mancano, di solito il commit
  della CI dell'ultima release. Esegui `git pull --rebase origin main` prima di andare avanti. Se ci
  sono conflitti su `packs/` o `module.json`, fermati e chiedi.
- **`module.json` o `packs/` modificati da un build locale** (per provare i pack in Foundry): annulla
  con `git restore module.json packs`. La versione la decide il tag, non il build locale.

---

## Step 1 — Versione

```
git describe --tags --abbrev=0
```

Alla prima release non ci sono tag: la versione è quella di `module.json` (v0.1.0).
Altrimenti la prossima versione è l'ultima con la patch +1 (v0.1.7 → v0.1.8), a meno che il DM non ne indichi
un'altra (`/git-release v0.2.0`). Controlla che il tag non esista già:
`git ls-remote --tags origin vX.Y.Z` non deve restituire nulla.

---

## Step 2 — Conferma

```
📦 Riepilogo release:

  Versione:           vX.Y.Z
  Commit da pushare:  (elenco di git log --oneline origin/main..main)
  Poi:                push del tag → la CI fa build, commit dei pack su main e GitHub Release

Confermato? (sì/no)
```

Se il DM risponde no, non fare nulla.

---

## Step 3 — Push di main

```
git push origin main
```

Se il push viene rifiutato, **fermati**: non creare il tag. Torna allo Step 0.

---

## Step 4 — Tag

```
git tag vX.Y.Z
git push origin vX.Y.Z
```

---

## Step 5 — Attendi la CI

```
gh run list --workflow main.yml --limit 1
gh run watch <id> --exit-status
```

Se la run fallisce, leggi `gh run view <id> --log-failed` e segnala l'errore al DM.

---

## Step 6 — Verifica e riallinea

```
gh release view vX.Y.Z --json assets --jq '.assets[].name'
git pull --rebase origin main
```

- Gli asset devono essere `spindrift-dm-vX.Y.Z.zip` e `module.json`.
- Il pull porta in locale il commit `chore(release): vX.Y.Z` della CI, così il prossimo push non
  viene rifiutato.

---

## Riepilogo finale

```
✅ Release completata

  Tag:      vX.Y.Z
  Release:  https://github.com/FabioC-88/spindrift-dm/releases/tag/vX.Y.Z
  Asset:    spindrift-dm-vX.Y.Z.zip  +  module.json

Foundry trova l'aggiornamento tramite il manifest releases/latest/download/module.json.
```
