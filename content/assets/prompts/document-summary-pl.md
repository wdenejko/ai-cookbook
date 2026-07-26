title: "Podsumowanie dokumentu"
description: "Zamienia PDF, plik Word lub wklejony tekst w krótkie i rzetelne podsumowanie z faktami oraz pytaniami pomocniczymi."
role: user
variables:
  - name: dokument
    hint: "Prześlij plik albo wklej jego treść"
library:
  tags: [documents, summarization, verification]
  category: "Documents"
  visibility: public
  targets: [chatgpt]
  sourceProject: null
---

Przeczytaj poniższy dokument i wyjaśnij go osobie bez wiedzy specjalistycznej.

Dokument:
"""
{{dokument}}
"""

Przygotuj:
1. Podsumowanie w pięciu zdaniach.
2. Pięć najważniejszych faktów, z numerem strony lub sekcji, jeśli są dostępne.
3. Krótką listę dat, kwot, nazwisk i zobowiązań.
4. Rzeczy niejasne, brakujące lub wymagające sprawdzenia.

Korzystaj tylko z dokumentu. Nie zgaduj i nie uzupełniaj luk wiedzą z zewnątrz. Napisz wprost, jeśli dokument nie zawiera odpowiedzi.
