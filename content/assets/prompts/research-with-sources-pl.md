title: "Research z wiarygodnymi źródłami"
description: "Pomaga przygotować prostą odpowiedź na podstawie aktualnych i możliwych do sprawdzenia źródeł, bez zgadywania."
role: user
variables:
  - name: pytanie
    hint: "Pytanie lub temat do sprawdzenia"
  - name: odbiorca
    hint: "Kto potrzebuje odpowiedzi"
library:
  tags: [research, verification, critical-thinking]
  category: "Productivity"
  visibility: public
  targets: [chatgpt]
  sourceProject: null
---

Zbadaj poniższe pytanie dla {{odbiorca}}:
{{pytanie}}

Korzystaj z aktualnych, wiarygodnych źródeł. Preferuj dokumenty urzędowe, oryginalne badania i informacje z pierwszej ręki. Przy każdym ważnym twierdzeniu podaj datę publikacji i klikalny link.

Napisz:
- najpierw krótką odpowiedź;
- najważniejsze fakty prostym językiem;
- co jest niepewne albo budzi spory;
- sekcję „Jak sprawdzić” z trzema najlepszymi źródłami.

Oddzielaj fakty od interpretacji. Jeśli czegoś nie da się potwierdzić, napisz to zamiast wymyślać źródło.
