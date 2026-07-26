---
title: "Tryb wywiadu krok po kroku (PL)"
description: "Prompt, który każe ChatGPT zadawać jedno pytanie naraz, zebrać brakujący kontekst i potwierdzić brief przed wykonaniem zadania."
role: user
variables:
  - name: zadanie
    hint: "Ogólny opis tego, co chcesz przygotować"
  - name: liczba_pytan
    hint: "Maksymalna liczba pytań, np. 5"
library:
  tags: [polski, prompting, interview, context]
  category: "Workshop PL"
  visibility: public
  targets: [chatgpt]
  sourceProject: ai-cookbook
---

Chcę wykonać następujące zadanie:

{{zadanie}}

Przeprowadź ze mną krótki wywiad, zanim zaczniesz:

1. Zadaj maksymalnie {{liczba_pytan}} pytań.
2. Zadawaj tylko jedno pytanie naraz i zawsze czekaj na moją odpowiedź.
3. Pytaj wyłącznie o informacje, które realnie zmienią wynik.
4. Jeżeli moja odpowiedź jest niejasna, poproś o jedno doprecyzowanie.
5. Po ostatnim pytaniu podsumuj cel, odbiorcę, dane, ograniczenia i oczekiwany
   format.
6. Poproś mnie o potwierdzenie podsumowania.
7. Dopiero po potwierdzeniu wykonaj zadanie.

Nie rozpoczynaj od tworzenia rozwiązania. Zacznij od pierwszego pytania.
