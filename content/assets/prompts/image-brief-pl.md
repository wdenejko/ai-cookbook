---
title: "Brief do generowania obrazu (PL)"
description: "Szablon promptu wizualnego obejmujący zastosowanie, temat, kompozycję, styl, światło, format i elementy zakazane."
role: user
variables:
  - name: zastosowanie
    hint: "Np. slajd, post, baner albo ilustracja do instrukcji"
  - name: temat
    hint: "Co ma przedstawiać obraz"
  - name: kompozycja
    hint: "Rozmieszczenie obiektów i wolnej przestrzeni"
  - name: styl
    hint: "Np. realistyczna fotografia lub płaska ilustracja"
  - name: kolory_swiatlo
    hint: "Paleta, nastrój i rodzaj oświetlenia"
  - name: format
    hint: "Np. poziomy 16:9 lub kwadrat 1:1"
  - name: ograniczenia
    hint: "Czego nie umieszczać i co musi pozostać wolne"
library:
  tags: [polski, images, prompting, presentations]
  category: "Workshop PL"
  visibility: public
  targets: [chatgpt]
  sourceProject: ai-cookbook
---

Stwórz obraz według poniższego briefu.

- **Zastosowanie:** {{zastosowanie}}
- **Główny temat:** {{temat}}
- **Kompozycja:** {{kompozycja}}
- **Styl:** {{styl}}
- **Kolory i światło:** {{kolory_swiatlo}}
- **Format i proporcje:** {{format}}
- **Ograniczenia:** {{ograniczenia}}

Przed wygenerowaniem:
1. sprawdź, czy opis zawiera sprzeczne wymagania;
2. jeżeli brakuje informacji kluczowej dla kompozycji, zadaj jedno pytanie;
3. unikaj stereotypowego przedstawiania wieku, płci, zawodu i kompetencji;
4. nie dodawaj tekstu ani logotypów, jeżeli brief wyraźnie ich nie wymaga.

Po wygenerowaniu krótko opisz, które elementy briefu zostały zastosowane i co
warto zmienić w kolejnej iteracji.
