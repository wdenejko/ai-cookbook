title: "Porównanie opcji przed decyzją"
description: "Tworzy proste i uczciwe porównanie produktów, usług lub planów oraz pokazuje, kiedy każda opcja ma sens."
role: user
variables:
  - name: opcje
    hint: "Opcje do porównania"
  - name: kryteria
    hint: "Co jest dla ciebie najważniejsze"
library:
  tags: [decision-making, critical-thinking, verification]
  category: "Productivity"
  visibility: public
  targets: [chatgpt]
  sourceProject: null
---

Porównaj te opcje:
{{opcje}}

Moje priorytety:
{{kryteria}}

Korzystaj z aktualnych informacji i zaznacz, co wymaga sprawdzenia. Zacznij od prostej tabeli. Następnie wyjaśnij:
- największą zaletę i wadę każdej opcji;
- ukryte koszty, limity lub zobowiązania;
- dla kogo dana opcja będzie najlepsza;
- jaka jedna brakująca informacja mogłaby zmienić rekomendację.

Nie ogłaszaj jednego zwycięzcy dla wszystkich. Rekomendację dopasuj do podanych priorytetów i wypisz przyjęte założenia.
