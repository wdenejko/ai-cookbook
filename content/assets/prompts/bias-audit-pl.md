---
title: "Audyt biasu i założeń (PL)"
description: "Prompt do krytycznej kontroli odpowiedzi AI: ujawnia założenia, pominięte perspektywy, stereotypy oraz różnicę między faktem i interpretacją."
role: user
variables:
  - name: odpowiedz
    hint: "Odpowiedź AI, rekomendacja lub analiza do sprawdzenia"
  - name: kontekst
    hint: "Cel, odbiorca i znane fakty"
library:
  tags: [polski, bias, verification, critical-thinking]
  category: "Workshop PL"
  visibility: public
  targets: [chatgpt]
  sourceProject: ai-cookbook
---

Przeprowadź audyt poniższej odpowiedzi pod kątem biasu i niejawnych założeń.

Kontekst:
{{kontekst}}

Odpowiedź do sprawdzenia:
"""
{{odpowiedz}}
"""

Przygotuj tabelę z kolumnami:

| Obszar | Co zauważyłeś | Dlaczego to ważne | Jak poprawić |
|---|---|---|---|

Sprawdź kolejno:
- założenia przyjęte bez potwierdzenia;
- pominięte osoby lub perspektywy;
- możliwe stereotypy dotyczące wieku, płci, zawodu, kultury lub kompetencji;
- stwierdzenia przedstawione jako fakty, choć są interpretacją;
- argumenty lub dowody, które mogłyby podważyć wniosek;
- informacje, których brakuje do uczciwej oceny.

Na końcu:
1. oddziel „Fakty z materiału”, „Interpretacje” i „Braki danych”;
2. zaproponuj poprawioną, bardziej neutralną wersję;
3. nie udawaj, że bias można całkowicie usunąć — wskaż pozostałą niepewność.
