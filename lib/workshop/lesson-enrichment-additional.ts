import type { LessonEnrichment, LessonLocale } from './lesson-enrichment';

type BilingualLesson = Record<LessonLocale, LessonEnrichment>;

export const additionalLessonEnrichment = {
  'choosing-an-ai-assistant': {
    en: {
      image: '/images/learn/choosing-an-ai-assistant.jpg',
      alt: 'A person compares three balanced assistant workstations using one neutral scorecard.',
      caption:
        'The right assistant depends on the job. Compare the whole workflow instead of looking for one permanent winner.',
      outcomes: [
        'match an assistant to the task, existing tools and data rules;',
        'compare ChatGPT, Claude and Gemini with the same realistic test;',
        'recognize which product details must be checked again before a decision.',
      ],
      example: {
        situation:
          'A community group wants one AI subscription for meeting summaries, document questions, occasional web research and simple visuals.',
        firstAttempt: 'Which AI is the best: ChatGPT, Claude or Gemini?',
        improvedApproach:
          'Test all three with the same anonymized meeting notes, the same policy PDF and the same current research question. Score Polish quality, page citations, ease of correction, image workflow, privacy controls and total monthly cost. Record any feature that depends on a paid plan.',
        explanation:
          'The second approach replaces a generic opinion with evidence from the group’s real work and exposes plan-dependent differences.',
      },
      practice: {
        title: 'Run a three-task comparison',
        duration: '20 minutes',
        steps: [
          'Choose one writing task, one file task and one current-information task.',
          'Prepare identical, non-sensitive input and success criteria for every product.',
          'Run each task without improving the prompt for only one assistant.',
          'Score the full workflow and write one situation in which each product would be your choice.',
        ],
      },
      pitfalls: [
        {
          title: 'Treating a ranking as permanent',
          body: 'Products change quickly and a benchmark may test work unlike yours. Date every comparison and keep the test cases.',
        },
        {
          title: 'Comparing answers but not workflow',
          body: 'A good paragraph may still require awkward copying, missing integrations or a plan upgrade. Count the whole path to a usable result.',
        },
        {
          title: 'Ignoring account differences',
          body: 'Personal, work and school accounts can expose different tools and data protections. Verify the exact account being considered.',
        },
      ],
      takeaways: [
        'Choose for a task and ecosystem, not for brand loyalty.',
        'A fair test uses identical inputs, criteria and revision opportunities.',
        'Prices, limits and integrations should always be checked at decision time.',
      ],
      challenge:
        'Write one sentence beginning “I would choose ChatGPT when…”, one for Claude and one for Gemini, without using the word “best”.',
    },
    pl: {
      image: '/images/learn/choosing-an-ai-assistant.jpg',
      alt: 'Osoba porównuje trzy równorzędne stanowiska asystentów za pomocą jednej neutralnej karty oceny.',
      caption:
        'Właściwy asystent zależy od zadania. Porównuj cały proces zamiast szukać jednego stałego zwycięzcy.',
      outcomes: [
        'dopasować asystenta do zadania, używanych narzędzi i zasad danych;',
        'porównać ChatGPT, Claude i Gemini za pomocą tego samego realistycznego testu;',
        'rozpoznać informacje o produkcie, które trzeba ponownie sprawdzić przed decyzją.',
      ],
      example: {
        situation:
          'Lokalne stowarzyszenie chce jeden abonament AI do podsumowań spotkań, pytań o dokumenty, okazjonalnego researchu i prostych grafik.',
        firstAttempt: 'Które AI jest najlepsze: ChatGPT, Claude czy Gemini?',
        improvedApproach:
          'Przetestuj wszystkie trzy na tych samych zanonimizowanych notatkach, tym samym PDF-ie regulaminu i tym samym aktualnym pytaniu. Oceń polszczyznę, wskazania stron, łatwość poprawek, pracę z obrazami, ustawienia prywatności i pełny miesięczny koszt. Zapisz funkcje zależne od płatnego planu.',
        explanation:
          'Drugie podejście zastępuje ogólną opinię dowodami z prawdziwej pracy stowarzyszenia i ujawnia różnice zależne od planu.',
      },
      practice: {
        title: 'Przeprowadź porównanie trzech zadań',
        duration: '20 minut',
        steps: [
          'Wybierz jedno zadanie tekstowe, jedno z plikiem i jedno wymagające aktualnych informacji.',
          'Przygotuj identyczne, niewrażliwe dane oraz kryteria sukcesu dla każdego produktu.',
          'Wykonaj zadania bez ulepszania promptu tylko dla jednego asystenta.',
          'Oceń cały proces i zapisz po jednej sytuacji, w której wybrałbyś każdy produkt.',
        ],
      },
      pitfalls: [
        {
          title: 'Traktowanie rankingu jako stałego',
          body: 'Produkty zmieniają się szybko, a benchmark może badać inną pracę. Datuj porównanie i zachowuj przypadki testowe.',
        },
        {
          title: 'Porównywanie odpowiedzi, nie procesu',
          body: 'Dobry akapit może nadal wymagać niewygodnego kopiowania, brakującej integracji lub droższego planu. Policz całą drogę do wyniku.',
        },
        {
          title: 'Pomijanie różnic między kontami',
          body: 'Konta prywatne, firmowe i szkolne mogą mieć inne narzędzia oraz ochronę danych. Sprawdź dokładnie rozważane konto.',
        },
      ],
      takeaways: [
        'Wybieraj do zadania i ekosystemu, nie z lojalności wobec marki.',
        'Uczciwy test używa tych samych danych, kryteriów i możliwości poprawek.',
        'Ceny, limity i integracje zawsze sprawdzaj w momencie decyzji.',
      ],
      challenge:
        'Napisz po jednym zdaniu „Wybrałbym ChatGPT, gdy…”, analogicznie dla Claude i Gemini, bez używania słowa „najlepszy”.',
    },
  },
  'privacy-and-safe-ai-use': {
    en: {
      image: '/images/learn/privacy-and-safe-ai-use.jpg',
      alt: 'Sensitive pieces are removed from a document by a privacy filter before a minimized version reaches an assistant.',
      caption:
        'Safe sharing begins before upload: permission, minimization and account settings all matter.',
      outcomes: [
        'identify data that should not be placed in an ordinary consumer chat;',
        'minimize and anonymize material without destroying its usefulness;',
        'check the account, retention and connected-app boundary.',
      ],
      example: {
        situation:
          'You want AI to categorize customer feedback. The export contains names, email addresses, order numbers and free-text complaints.',
        firstAttempt: 'Upload the entire export and ask for themes.',
        improvedApproach:
          'Confirm that the organization permits the tool, remove direct identifiers and unnecessary columns, replace order numbers with neutral case IDs, review free text for identifying details and upload only the rows needed for the analysis.',
        explanation:
          'The task still has useful content, but fewer people and business records are exposed if the account or workflow is inappropriate.',
      },
      practice: {
        title: 'Classify before sharing',
        duration: '15 minutes',
        steps: [
          'Choose a fictional document containing contact, financial and work information.',
          'Mark every field as required, removable, replaceable or prohibited.',
          'Create a minimized version that can still answer the intended question.',
          'Write down the account, settings and organizational approval needed before upload.',
        ],
      },
      pitfalls: [
        {
          title: 'Deleting only the name',
          body: 'A combination of job, place, date and unusual event can still identify a person. Review the whole context.',
        },
        {
          title: 'Assuming deletion is universal',
          body: 'Chat history, memory, uploaded files and connected services may have separate controls and retention rules.',
        },
        {
          title: 'Using a personal account for work',
          body: 'A useful feature does not grant permission to process company or customer data. Use approved accounts and policies.',
        },
      ],
      takeaways: [
        'Permission comes before convenience.',
        'Share the smallest useful dataset.',
        'Privacy depends on the exact product, account, settings and connections.',
      ],
      challenge:
        'Take one document you might upload and list five details the task does not actually need.',
    },
    pl: {
      image: '/images/learn/privacy-and-safe-ai-use.jpg',
      alt: 'Filtr prywatności usuwa wrażliwe elementy dokumentu, zanim ograniczona wersja trafi do asystenta.',
      caption:
        'Bezpieczne udostępnianie zaczyna się przed wysłaniem: liczą się zgoda, minimalizacja i ustawienia konta.',
      outcomes: [
        'wskazać dane, które nie powinny trafić do zwykłej rozmowy konsumenckiej;',
        'ograniczyć i zanonimizować materiał bez utraty jego przydatności;',
        'sprawdzić konto, przechowywanie oraz granicę połączonych aplikacji.',
      ],
      example: {
        situation:
          'Chcesz pogrupować opinie klientów. Eksport zawiera nazwiska, e-maile, numery zamówień i swobodne opisy reklamacji.',
        firstAttempt: 'Wyślij cały eksport i poproś o znalezienie tematów.',
        improvedApproach:
          'Potwierdź zgodę organizacji na narzędzie, usuń bezpośrednie identyfikatory i zbędne kolumny, zastąp numery zamówień neutralnymi identyfikatorami spraw, przejrzyj opisy pod kątem danych osobowych i wyślij tylko potrzebne wiersze.',
        explanation:
          'Materiał nadal pozwala wykonać zadanie, lecz przy złym koncie lub procesie naraża znacznie mniej danych osób i firmy.',
      },
      practice: {
        title: 'Sklasyfikuj przed udostępnieniem',
        duration: '15 minut',
        steps: [
          'Wybierz fikcyjny dokument z danymi kontaktowymi, finansowymi i firmowymi.',
          'Oznacz każde pole jako wymagane, zbędne, możliwe do zastąpienia lub zakazane.',
          'Utwórz ograniczoną wersję, która nadal odpowiada na właściwe pytanie.',
          'Zapisz wymagane konto, ustawienia i zgodę organizacji przed wysłaniem.',
        ],
      },
      pitfalls: [
        {
          title: 'Usunięcie tylko nazwiska',
          body: 'Połączenie stanowiska, miejsca, daty i rzadkiego zdarzenia nadal może wskazać osobę. Sprawdzaj cały kontekst.',
        },
        {
          title: 'Założenie, że usunięcie działa wszędzie',
          body: 'Historia, pamięć, przesłane pliki i połączone usługi mogą mieć osobne ustawienia i okresy przechowywania.',
        },
        {
          title: 'Prywatne konto do pracy',
          body: 'Przydatna funkcja nie oznacza zgody na przetwarzanie danych firmy lub klientów. Używaj zatwierdzonych kont i zasad.',
        },
      ],
      takeaways: [
        'Zgoda jest ważniejsza niż wygoda.',
        'Udostępniaj najmniejszy użyteczny zbiór danych.',
        'Prywatność zależy od konkretnego produktu, konta, ustawień i połączeń.',
      ],
      challenge:
        'Weź dokument, który mógłbyś wysłać, i wypisz pięć szczegółów niepotrzebnych do wykonania zadania.',
    },
  },
  'learning-with-ai': {
    en: {
      image: '/images/learn/learning-with-ai.jpg',
      alt: 'A learner actively moves through explanation, independent attempt, quiz and teach-back stages while an assistant guides from the side.',
      caption:
        'AI supports learning when you still attempt, retrieve, explain and judge the answer yourself.',
      outcomes: [
        'ask for tutoring that adapts to your level without giving everything away;',
        'use retrieval, explanation and application to check real understanding;',
        'keep a reliable source and your own judgement in the learning loop.',
      ],
      example: {
        situation:
          'You want to learn percentages for discounts and bills, but usually forget a worked example as soon as you close it.',
        firstAttempt: 'Explain percentages and solve five examples for me.',
        improvedApproach:
          'Give me a three-question diagnostic. Teach one missing idea with one example, then give me a similar problem without the solution. If I am wrong, point to my first incorrect step. Finish by asking me to explain the method and apply it to a different situation.',
        explanation:
          'The improved approach makes the learner retrieve and apply the method instead of merely recognizing a polished solution.',
      },
      practice: {
        title: 'Complete one active-learning loop',
        duration: '20 minutes',
        steps: [
          'Choose one small idea you genuinely want to understand.',
          'Ask for a diagnostic and one explanation matched to the result.',
          'Hide the explanation, attempt a new problem and explain your reasoning.',
          'Request feedback, retry and verify the final idea against a trusted source.',
        ],
      },
      pitfalls: [
        {
          title: 'Reading feels like learning',
          body: 'Recognition is easier than recall. Close the answer and produce the idea or method from memory.',
        },
        {
          title: 'Hints become solutions',
          body: 'Ask for one question or the first incorrect step. Explicitly forbid the full answer until you attempt again.',
        },
        {
          title: 'A confident tutor is always right',
          body: 'Check important claims and calculations against reliable material. Adaptability is not authority.',
        },
      ],
      takeaways: [
        'Your attempt is the central learning event.',
        'Feedback should identify the next useful correction, not replace the task.',
        'Teach-back reveals gaps that a multiple-choice answer can hide.',
      ],
      challenge:
        'Ask AI to teach one idea without stating the final answer, then explain it to an imaginary twelve-year-old.',
    },
    pl: {
      image: '/images/learn/learning-with-ai.jpg',
      alt: 'Osoba aktywnie przechodzi przez wyjaśnienie, samodzielną próbę, quiz i uczenie kogoś, a asystent prowadzi ją z boku.',
      caption:
        'AI wspiera naukę, gdy nadal samodzielnie próbujesz, przypominasz, wyjaśniasz i oceniasz odpowiedź.',
      outcomes: [
        'poprosić o nauczanie dopasowane do poziomu bez podawania wszystkiego;',
        'użyć przypominania, wyjaśniania i zastosowania do kontroli zrozumienia;',
        'zachować wiarygodne źródło i własną ocenę w pętli nauki.',
      ],
      example: {
        situation:
          'Chcesz nauczyć się procentów potrzebnych przy rabatach i rachunkach, ale zapominasz rozwiązany przykład zaraz po jego zamknięciu.',
        firstAttempt: 'Wyjaśnij procenty i rozwiąż za mnie pięć przykładów.',
        improvedApproach:
          'Zadaj mi trzy pytania diagnostyczne. Naucz jednej brakującej idei na jednym przykładzie, a potem daj podobne zadanie bez rozwiązania. Jeżeli się pomylę, wskaż pierwszy błędny krok. Na końcu poproś mnie o wyjaśnienie metody i użycie jej w innej sytuacji.',
        explanation:
          'Lepsze podejście zmusza do przypomnienia i zastosowania metody zamiast rozpoznawania gotowego rozwiązania.',
      },
      practice: {
        title: 'Przejdź jedną pętlę aktywnej nauki',
        duration: '20 minut',
        steps: [
          'Wybierz jedną małą ideę, którą naprawdę chcesz zrozumieć.',
          'Poproś o diagnozę i jedno wyjaśnienie dopasowane do wyniku.',
          'Ukryj wyjaśnienie, wykonaj nowe zadanie i opisz swoje rozumowanie.',
          'Poproś o informację zwrotną, spróbuj ponownie i sprawdź ideę w zaufanym źródle.',
        ],
      },
      pitfalls: [
        {
          title: 'Czytanie wydaje się nauką',
          body: 'Rozpoznawanie jest łatwiejsze niż przypominanie. Zamknij odpowiedź i odtwórz ideę lub metodę z pamięci.',
        },
        {
          title: 'Wskazówka zmienia się w rozwiązanie',
          body: 'Poproś o jedno pytanie albo pierwszy błędny krok. Zabroń pełnej odpowiedzi przed kolejną próbą.',
        },
        {
          title: 'Pewny siebie nauczyciel zawsze ma rację',
          body: 'Sprawdzaj ważne twierdzenia i obliczenia w wiarygodnym materiale. Dopasowanie nie oznacza autorytetu.',
        },
      ],
      takeaways: [
        'Twoja próba jest najważniejszym wydarzeniem w nauce.',
        'Informacja zwrotna ma wskazać następną poprawkę, a nie zastąpić zadanie.',
        'Wyjaśnienie komuś ujawnia braki ukrywane przez test wyboru.',
      ],
      challenge:
        'Poproś AI o nauczenie jednej idei bez podania końcowej odpowiedzi, a potem wyjaśnij ją wyobrażonemu dwunastolatkowi.',
    },
  },
  'working-with-files-and-data': {
    en: {
      image: '/images/learn/working-with-files-and-data.jpg',
      alt: 'Documents, a spreadsheet, chart and scanned image pass through inspection and become a sourced table and chart.',
      caption:
        'Reliable file work preserves the path from every important result back to its page, row or calculation.',
      outcomes: [
        'prepare documents and tables so an assistant can inspect them more reliably;',
        'request extraction with explicit source locations and missing-value rules;',
        'audit calculations, charts and high-impact claims.',
      ],
      example: {
        situation:
          'You have three supplier proposals in different PDF layouts and need to compare cost, delivery, support and cancellation terms.',
        firstAttempt: 'Summarize these offers and tell me which is best.',
        improvedApproach:
          'Inventory each file and page count. Build one comparison table with total cost, delivery date, support hours, cancellation terms, source page and missing fields. Do not calculate a winner until I confirm the extracted values.',
        explanation:
          'Extraction and checking happen before judgement, so layout errors or absent terms are visible before they affect the recommendation.',
      },
      practice: {
        title: 'Create a traceable document table',
        duration: '20 minutes',
        steps: [
          'Choose a short public document or a fictional one with several obligations.',
          'Ask for a table with a source page and “not specified” rule.',
          'Open three cited pages and compare them with the extracted rows.',
          'Correct the prompt or source, then export the checked table separately.',
        ],
      },
      pitfalls: [
        {
          title: 'The whole file must have been read',
          body: 'Large, scanned or complex files may be partly missed. Ask for an inventory and verify page coverage.',
        },
        {
          title: 'Formatting is treated as data',
          body: 'Merged cells, repeated headers and blank rows can distort analysis. Clean the source or describe its structure.',
        },
        {
          title: 'A chart hides assumptions',
          body: 'Inspect the table, filters, units and missing values behind a chart before discussing its visual pattern.',
        },
      ],
      takeaways: [
        'Prepare the source before asking for analysis.',
        'A useful result exposes missing information instead of filling it in.',
        'Trace important outputs back to a page, row or reproducible calculation.',
      ],
      challenge:
        'Take one generated table and verify three cells without using the assistant’s explanation.',
    },
    pl: {
      image: '/images/learn/working-with-files-and-data.jpg',
      alt: 'Dokumenty, arkusz, wykres i skan przechodzą kontrolę i zmieniają się w tabelę ze źródłami oraz wykres.',
      caption:
        'Rzetelna praca z plikami zachowuje drogę od ważnego wyniku do jego strony, wiersza lub obliczenia.',
      outcomes: [
        'przygotować dokumenty i tabele do bardziej niezawodnej analizy;',
        'zamówić wydobycie danych ze źródłami i zasadami dla brakujących wartości;',
        'sprawdzić obliczenia, wykresy i twierdzenia o dużych konsekwencjach.',
      ],
      example: {
        situation:
          'Masz trzy oferty dostawców w PDF-ach o różnym układzie i chcesz porównać koszt, dostawę, wsparcie oraz warunki rezygnacji.',
        firstAttempt: 'Podsumuj oferty i powiedz, która jest najlepsza.',
        improvedApproach:
          'Zrób spis plików i liczby stron. Utwórz jedną tabelę: pełny koszt, data dostawy, godziny wsparcia, rezygnacja, strona źródłowa i braki. Nie wybieraj zwycięzcy, dopóki nie potwierdzę wydobytych wartości.',
        explanation:
          'Wydobycie i kontrola odbywają się przed oceną, więc błędy układu i brakujące warunki są widoczne przed rekomendacją.',
      },
      practice: {
        title: 'Utwórz tabelę możliwą do prześledzenia',
        duration: '20 minut',
        steps: [
          'Wybierz krótki publiczny lub fikcyjny dokument z kilkoma obowiązkami.',
          'Poproś o tabelę ze stroną źródłową i zasadą „brak informacji”.',
          'Otwórz trzy wskazane strony i porównaj je z wydobytymi wierszami.',
          'Popraw prompt lub źródło, a sprawdzoną tabelę wyeksportuj osobno.',
        ],
      },
      pitfalls: [
        {
          title: 'Cały plik na pewno został przeczytany',
          body: 'Duże, skanowane lub złożone pliki mogą być częściowo pominięte. Poproś o spis i sprawdź pokrycie stron.',
        },
        {
          title: 'Formatowanie jest traktowane jak dane',
          body: 'Scalone komórki, powtarzane nagłówki i puste wiersze zniekształcają analizę. Oczyść źródło lub opisz strukturę.',
        },
        {
          title: 'Wykres ukrywa założenia',
          body: 'Przed oceną wzoru sprawdź tabelę, filtry, jednostki i brakujące wartości stojące za wykresem.',
        },
      ],
      takeaways: [
        'Przygotuj źródło przed zamówieniem analizy.',
        'Dobry wynik ujawnia braki zamiast je uzupełniać.',
        'Ważne wyniki prowadź do strony, wiersza lub powtarzalnego obliczenia.',
      ],
      challenge:
        'Weź jedną wygenerowaną tabelę i sprawdź trzy komórki bez korzystania z wyjaśnienia asystenta.',
    },
  },
  'research-with-ai': {
    en: {
      image: '/images/learn/research-with-ai.jpg',
      alt: 'One question branches into several dated and inspected sources before supported findings converge into a cited report.',
      caption:
        'Research is a path from question to evidence. Citations make that path inspectable, not automatically correct.',
      outcomes: [
        'choose between ordinary chat, web search and deep research;',
        'create a focused plan and prefer primary, current sources;',
        'verify whether citations support the claims attached to them.',
      ],
      example: {
        situation:
          'You need to know whether a small organization qualifies for a current public grant and which deadline applies.',
        firstAttempt: 'Can our organization get this grant?',
        improvedApproach:
          'Search the current official program page, regulations and application documents. First list the eligibility questions you need me to answer. Then provide a claim table with requirement, our status, source, publication date, applicable deadline and unresolved issue. Do not use summaries from application consultants as the deciding source.',
        explanation:
          'The research starts with missing facts, prioritizes official material and connects every eligibility conclusion to current evidence.',
      },
      practice: {
        title: 'Build a five-source evidence trail',
        duration: '20 minutes',
        steps: [
          'Choose a current, low-risk question with a clear date and location.',
          'Approve three to five subquestions and the preferred source types.',
          'Open every source behind the three most important claims.',
          'Record confirmed findings, conflicts, unknowns and the next human decision.',
        ],
      },
      pitfalls: [
        {
          title: 'Many links mean strong evidence',
          body: 'Several articles may repeat one original source. Trace each important claim to the closest independent evidence.',
        },
        {
          title: 'Publication date equals event date',
          body: 'A new article can describe an old event. Check both dates and the period covered by the underlying data.',
        },
        {
          title: 'The citation supports the nearby sentence',
          body: 'Open the page and read the relevant passage. Conditions, geography or uncertainty may have been omitted.',
        },
      ],
      takeaways: [
        'A clear question and plan prevent impressive but irrelevant reports.',
        'Primary sources are usually the strongest foundation for factual claims.',
        'A cited answer still requires source inspection.',
      ],
      challenge:
        'Take one sourced AI answer and find the weakest-supported high-impact claim in it.',
    },
    pl: {
      image: '/images/learn/research-with-ai.jpg',
      alt: 'Jedno pytanie rozgałęzia się na kilka datowanych i sprawdzonych źródeł, a potwierdzone ustalenia łączą się w raport.',
      caption:
        'Research jest drogą od pytania do dowodów. Cytowania pozwalają ją sprawdzić, ale nie gwarantują poprawności.',
      outcomes: [
        'wybrać między zwykłą rozmową, wyszukiwaniem i deep research;',
        'utworzyć skupiony plan oraz wybierać źródła pierwotne i aktualne;',
        'sprawdzić, czy cytowania naprawdę wspierają przypisane im twierdzenia.',
      ],
      example: {
        situation:
          'Musisz ustalić, czy mała organizacja kwalifikuje się do aktualnego programu dotacyjnego i jaki termin ją obowiązuje.',
        firstAttempt: 'Czy nasza organizacja może dostać tę dotację?',
        improvedApproach:
          'Przeszukaj aktualną oficjalną stronę programu, regulamin i dokumenty aplikacyjne. Najpierw wypisz pytania o kwalifikację, na które muszę odpowiedzieć. Następnie utwórz tabelę: wymaganie, nasz status, źródło, data publikacji, termin i nierozwiązana kwestia. Nie traktuj podsumowań firm konsultingowych jako źródła rozstrzygającego.',
        explanation:
          'Research zaczyna się od brakujących faktów, wybiera oficjalne materiały i łączy każdy wniosek z aktualnym dowodem.',
      },
      practice: {
        title: 'Zbuduj ścieżkę pięciu źródeł',
        duration: '20 minut',
        steps: [
          'Wybierz aktualne pytanie o małym ryzyku z jasną datą i miejscem.',
          'Zatwierdź od trzech do pięciu pytań pomocniczych i rodzaje źródeł.',
          'Otwórz każde źródło stojące za trzema najważniejszymi twierdzeniami.',
          'Zapisz potwierdzenia, konflikty, niewiadome i następną decyzję człowieka.',
        ],
      },
      pitfalls: [
        {
          title: 'Wiele linków oznacza mocne dowody',
          body: 'Kilka artykułów może powtarzać jedno źródło. Prowadź ważne twierdzenia do najbliższego niezależnego dowodu.',
        },
        {
          title: 'Data publikacji jest datą wydarzenia',
          body: 'Nowy artykuł może opisywać dawne zdarzenie. Sprawdzaj obie daty i okres objęty danymi.',
        },
        {
          title: 'Cytowanie wspiera sąsiednie zdanie',
          body: 'Otwórz stronę i przeczytaj właściwy fragment. Mogły zniknąć warunki, obszar lub niepewność.',
        },
      ],
      takeaways: [
        'Jasne pytanie i plan chronią przed efektownym, lecz nieistotnym raportem.',
        'Źródła pierwotne są zwykle najmocniejszą podstawą twierdzeń o faktach.',
        'Odpowiedź z cytowaniami nadal wymaga sprawdzenia źródeł.',
      ],
      challenge:
        'Weź odpowiedź AI ze źródłami i znajdź w niej ważne twierdzenie o najsłabszym poparciu.',
    },
  },
  'recognizing-ai-scams': {
    en: {
      image: '/images/learn/recognizing-ai-scams.jpg',
      alt: 'A recipient pauses an urgent altered call, verifies through separate known channels and blocks payment.',
      caption:
        'Do not try to outguess a convincing fake. Pause, use a known channel and verify before taking action.',
      outcomes: [
        'recognize urgency, secrecy and unusual payment as a dangerous pattern;',
        'verify identity and media through an independent channel;',
        'respond safely when money, codes or account access are requested.',
      ],
      example: {
        situation:
          'A familiar voice calls from an unknown number, says there has been an accident and demands immediate payment without telling anyone.',
        firstAttempt: 'Continue the call and ask whether the voice sounds genuine.',
        improvedApproach:
          'End the call, do not pay, contact the person on their saved number and check with another family member. If the story is false, preserve the message, warn the impersonated person and report the account or number.',
        explanation:
          'Independent verification works even when the cloned voice is perfect. Judging sound quality does not.',
      },
      practice: {
        title: 'Rehearse the pause-and-verify response',
        duration: '15 minutes',
        steps: [
          'Read three fictional urgent requests involving a relative, manager and public institution.',
          'Identify the pressure, requested asset and channel controlled by the sender.',
          'Choose a separate known channel and a question or record that can verify the story.',
          'Write the reporting and recovery step if money or access has already been sent.',
        ],
      },
      pitfalls: [
        {
          title: 'Trusting familiar appearance',
          body: 'Voice, face, writing style and caller ID can be copied or manipulated. Verify the relationship outside the message.',
        },
        {
          title: 'Searching only for visual glitches',
          body: 'Real media can be relabelled or taken out of context. Check the original source, date and official account.',
        },
        {
          title: 'Staying in the urgent conversation',
          body: 'Every extra minute gives the sender another chance to apply pressure. Stop and restart contact independently.',
        },
      ],
      takeaways: [
        'Urgency is a signal to slow down.',
        'A separate known channel is stronger than judging whether media looks real.',
        'Never share codes, access or unusual payment under unexpected pressure.',
      ],
      challenge:
        'Agree on one family verification phrase and one person everyone can contact when an emergency story cannot be confirmed.',
    },
    pl: {
      image: '/images/learn/recognizing-ai-scams.jpg',
      alt: 'Odbiorca zatrzymuje pilną, zmienioną rozmowę, sprawdza historię znanymi kanałami i blokuje płatność.',
      caption:
        'Nie próbuj przechytrzyć przekonującego fałszerstwa. Zatrzymaj się, użyj znanego kanału i sprawdź przed działaniem.',
      outcomes: [
        'rozpoznać pilność, tajemnicę i nietypową płatność jako niebezpieczny schemat;',
        'potwierdzić tożsamość i materiał przez niezależny kanał;',
        'bezpiecznie zareagować na prośbę o pieniądze, kod lub dostęp do konta.',
      ],
      example: {
        situation:
          'Znajomy głos dzwoni z obcego numeru, mówi o wypadku i żąda natychmiastowej płatności bez informowania kogokolwiek.',
        firstAttempt: 'Kontynuuj rozmowę i oceń, czy głos brzmi prawdziwie.',
        improvedApproach:
          'Zakończ rozmowę, nie płać, zadzwoń do tej osoby na zapisany numer i sprawdź historię u innego członka rodziny. Jeśli jest fałszywa, zachowaj wiadomość, ostrzeż osobę, pod którą ktoś się podszywa, i zgłoś konto lub numer.',
        explanation:
          'Niezależna kontrola działa nawet przy idealnie sklonowanym głosie. Ocena jakości dźwięku — nie.',
      },
      practice: {
        title: 'Przećwicz zatrzymanie i weryfikację',
        duration: '15 minut',
        steps: [
          'Przeczytaj trzy fikcyjne pilne prośby od krewnego, przełożonego i urzędu.',
          'Wskaż presję, żądany zasób i kanał kontrolowany przez nadawcę.',
          'Wybierz osobny znany kanał oraz pytanie lub zapis potwierdzający historię.',
          'Zapisz krok zgłoszenia i odzyskiwania, gdy pieniądze lub dostęp już wysłano.',
        ],
      },
      pitfalls: [
        {
          title: 'Zaufanie do znajomego wyglądu',
          body: 'Głos, twarz, styl pisania i numer mogą być skopiowane. Potwierdź relację poza otrzymaną wiadomością.',
        },
        {
          title: 'Szukanie tylko błędów wizualnych',
          body: 'Prawdziwy materiał można źle opisać lub wyrwać z kontekstu. Sprawdź pierwotne źródło, datę i oficjalne konto.',
        },
        {
          title: 'Pozostawanie w pilnej rozmowie',
          body: 'Każda minuta daje nadawcy kolejną okazję do nacisku. Zatrzymaj kontakt i rozpocznij go samodzielnie.',
        },
      ],
      takeaways: [
        'Pilność jest sygnałem, aby zwolnić.',
        'Osobny znany kanał jest mocniejszy niż ocena, czy materiał wygląda prawdziwie.',
        'Nie przekazuj kodów, dostępu ani nietypowej płatności pod niespodziewaną presją.',
      ],
      challenge:
        'Ustalcie jedno rodzinne hasło weryfikacyjne i jedną osobę kontaktową na wypadek historii awaryjnej, której nie da się potwierdzić.',
    },
  },
} satisfies Record<string, BilingualLesson>;
