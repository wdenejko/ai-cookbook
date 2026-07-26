---
title: "Brief dobrego promptu — 6 elementów (PL)"
description: "Polski szablon, który pomaga zamienić ogólne polecenie w konkretny brief: cel, kontekst, dane, odbiorca, format i kryteria jakości."
role: user
variables:
  - name: cel
    hint: "Co ma powstać lub jaka decyzja ma zostać wsparta"
  - name: kontekst
    hint: "Najważniejsze informacje o sytuacji"
  - name: dane
    hint: "Tekst, notatki lub fakty, na których model ma pracować"
  - name: odbiorca
    hint: "Kto przeczyta lub wykorzysta wynik"
  - name: format
    hint: "Np. e-mail, tabela, lista kroków, maksymalna długość"
  - name: kryteria
    hint: "Po czym poznasz, że odpowiedź jest dobra"
library:
  tags: [polski, prompting, warsztat, productivity]
  category: "Workshop PL"
  visibility: public
  targets: [chatgpt]
  sourceProject: ai-cookbook
---

Pomóż mi wykonać zadanie na podstawie poniższego briefu.

## Cel
{{cel}}

## Kontekst
{{kontekst}}

## Dane wejściowe
{{dane}}

## Odbiorca
{{odbiorca}}

## Oczekiwany format
{{format}}

## Kryteria jakości
{{kryteria}}

Zasady:
- Nie uzupełniaj brakujących faktów własnymi domysłami.
- Jeżeli brakuje informacji potrzebnych do wykonania zadania, najpierw zadaj mi
  maksymalnie trzy konkretne pytania.
- Po przygotowaniu wyniku sprawdź go według podanych kryteriów.
- Na końcu wskaż krótko wszystkie ważne założenia, które musiałeś przyjąć.
