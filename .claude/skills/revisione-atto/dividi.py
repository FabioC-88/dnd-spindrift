#!/usr/bin/env python3
"""Divide un capitolo del libro in sezioni per la revisione in parallelo.

Uso: python3 -I dividi.py <capitolo.md> <cartella di lavoro>

Taglia il file alle intestazioni di secondo livello (`## `). Le parti più corte
di MIN_RIGHE si uniscono alla successiva, così ogni scrittore riceve un blocco
di senso compiuto. Scrive S1.md, S2.md, … e originale.md nella cartella di
lavoro, controlla che rimontati diano il file di partenza e stampa in JSON
l'elenco delle sezioni (id, righe, cosa) da passare al workflow.
"""
import json
import os
import sys

MIN_RIGHE = 60


def main():
    capitolo, cartella = sys.argv[1], sys.argv[2]
    os.makedirs(cartella, exist_ok=True)
    righe = open(capitolo, encoding='utf-8').read().split('\n')

    # Inizio di ogni blocco: la riga 0 e ogni intestazione «## ».
    inizi = [0] + [i for i, r in enumerate(righe) if r.startswith('## ') and i > 0]
    blocchi = [(a, b) for a, b in zip(inizi, inizi[1:] + [len(righe)])]

    sezioni, corrente = [], None
    for a, b in blocchi:
        corrente = (corrente[0], b) if corrente else (a, b)
        if corrente[1] - corrente[0] >= MIN_RIGHE:
            sezioni.append(corrente)
            corrente = None
    if corrente:
        if sezioni:
            sezioni[-1] = (sezioni[-1][0], corrente[1])
        else:
            sezioni.append(corrente)

    elenco = []
    for n, (a, b) in enumerate(sezioni, 1):
        testo = '\n'.join(righe[a:b])
        # Il file originale finisce con un a capo: l'ultima sezione lo conserva.
        if b < len(righe):
            testo += '\n'
        with open(os.path.join(cartella, f'S{n}.md'), 'w', encoding='utf-8') as f:
            f.write(testo)
        titoli = [r[3:].strip() for r in righe[a:b] if r.startswith('## ')]
        elenco.append({
            'id': f'S{n}',
            'righe': f'{a + 1}-{b}',
            'cosa': '; '.join(titoli) if titoli else 'intestazione del capitolo',
        })

    with open(os.path.join(cartella, 'originale.md'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(righe))

    rimontato = ''.join(
        open(os.path.join(cartella, f"{s['id']}.md"), encoding='utf-8').read() for s in elenco
    )
    if rimontato != '\n'.join(righe):
        sys.exit('errore: le sezioni rimontate non coincidono con il capitolo')

    print(json.dumps(elenco, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
