import { additionalLessonEnrichment } from './lesson-enrichment-additional';

export type LessonLocale = 'en' | 'pl';

interface LessonExample {
  situation: string;
  firstAttempt: string;
  improvedApproach: string;
  explanation: string;
}

interface LessonPractice {
  title: string;
  duration: string;
  steps: string[];
}

interface LessonPitfall {
  title: string;
  body: string;
}

export interface LessonEnrichment {
  image: string;
  alt: string;
  caption: string;
  outcomes: string[];
  example: LessonExample;
  practice: LessonPractice;
  pitfalls: LessonPitfall[];
  takeaways: string[];
  challenge: string;
}

type BilingualLesson = Record<LessonLocale, LessonEnrichment>;

export const lessonEnrichment: Record<string, BilingualLesson> = {
  'how-llms-work': {
    en: {
      image: '/images/learn/how-llms-work.jpg',
      alt: 'Loose shapes pass through pattern screens and emerge as an ordered sequence, with one shape taking a wrong turn.',
      caption:
        'A language model builds an answer piece by piece. The pattern can be convincing even when one turn is wrong.',
      outcomes: [
        'explain in plain language why a model can write fluently without knowing facts like a database;',
        'recognize which parts of a conversation form the model’s working context;',
        'decide which claims need a source or a human check.',
      ],
      example: {
        situation:
          'You want to know how many days of leave your company allows. The answer matters, but the assistant has not seen the current policy.',
        firstAttempt: 'How many days of leave do I get?',
        improvedApproach:
          'Using only the attached leave policy, list the standard annual allowance, the rules for new employees and any exceptions. Quote the relevant section number for every answer. If the document does not say, write “not specified”.',
        explanation:
          'The second request replaces guessing with a supplied source, narrows the task and makes every important claim traceable.',
      },
      practice: {
        title: 'Run a context experiment',
        duration: '10 minutes',
        steps: [
          'Choose a question connected to a document you know well.',
          'Ask it once without sharing the document and save the answer.',
          'Attach or paste the relevant material, then ask again with a clear “use only this source” rule.',
          'Mark what became more precise, what still needs checking and what the first answer invented.',
        ],
      },
      pitfalls: [
        {
          title: 'Fluent means true',
          body: 'Polished language is a presentation quality, not evidence. Check names, numbers, dates, quotations and high-impact recommendations.',
        },
        {
          title: 'The model must know what happened today',
          body: 'Knowledge can be incomplete or outdated. When recency matters, provide a current source or use a tool that can retrieve one.',
        },
        {
          title: 'The assistant understands like a person',
          body: 'Human-sounding phrases are useful interface behaviour. They do not prove intent, experience or human judgement.',
        },
      ],
      takeaways: [
        'The model predicts a useful continuation from patterns and context.',
        'More relevant context means fewer hidden guesses.',
        'Verification effort should grow with the cost of being wrong.',
      ],
      challenge:
        'Before your next factual request, write down the one claim that would cause the most harm if it were wrong. Verify that claim first.',
    },
    pl: {
      image: '/images/learn/how-llms-work.jpg',
      alt: 'Luźne kształty przechodzą przez kolejne sita wzorców i tworzą uporządkowaną sekwencję, a jeden element skręca w złą stronę.',
      caption:
        'Model językowy buduje odpowiedź fragment po fragmencie. Wzorzec może być przekonujący nawet wtedy, gdy jeden krok jest błędny.',
      outcomes: [
        'wyjaśnić prostym językiem, dlaczego model pisze płynnie, choć nie jest bazą faktów;',
        'rozpoznać, które elementy rozmowy tworzą kontekst roboczy modelu;',
        'zdecydować, które twierdzenia wymagają źródła lub kontroli człowieka.',
      ],
      example: {
        situation:
          'Chcesz sprawdzić, ile dni urlopu przysługuje w twojej firmie. Odpowiedź jest ważna, ale asystent nie widział aktualnego regulaminu.',
        firstAttempt: 'Ile dni urlopu mi przysługuje?',
        improvedApproach:
          'Korzystając wyłącznie z załączonego regulaminu urlopowego, podaj standardowy wymiar urlopu, zasady dla nowych pracowników i wyjątki. Przy każdej odpowiedzi wskaż numer odpowiedniego punktu. Jeśli dokument o czymś nie mówi, napisz „brak informacji”.',
        explanation:
          'Drugie polecenie zastępuje zgadywanie dostarczonym źródłem, zawęża zadanie i pozwala prześledzić każde ważne twierdzenie.',
      },
      practice: {
        title: 'Przeprowadź eksperyment z kontekstem',
        duration: '10 minut',
        steps: [
          'Wybierz pytanie dotyczące dokumentu, który dobrze znasz.',
          'Zadaj je bez udostępniania dokumentu i zachowaj odpowiedź.',
          'Dodaj właściwy materiał i zapytaj ponownie z zasadą „korzystaj wyłącznie z tego źródła”.',
          'Zaznacz, co stało się precyzyjniejsze, co nadal wymaga sprawdzenia i co pojawiło się bez podstawy.',
        ],
      },
      pitfalls: [
        {
          title: 'Płynnie znaczy prawdziwie',
          body: 'Ładny język świadczy o sposobie prezentacji, a nie o dowodach. Sprawdzaj nazwy, liczby, daty, cytaty i ważne rekomendacje.',
        },
        {
          title: 'Model na pewno zna dzisiejsze informacje',
          body: 'Wiedza może być niepełna lub nieaktualna. Gdy liczy się świeżość, dostarcz bieżące źródło albo użyj narzędzia, które potrafi je pobrać.',
        },
        {
          title: 'Asystent rozumie jak człowiek',
          body: 'Ludzko brzmiące wypowiedzi ułatwiają rozmowę, lecz nie dowodzą intencji, doświadczenia ani ludzkiego osądu.',
        },
      ],
      takeaways: [
        'Model przewiduje użyteczną kontynuację na podstawie wzorców i kontekstu.',
        'Lepszy, trafny kontekst oznacza mniej ukrytego zgadywania.',
        'Dokładność sprawdzania powinna rosnąć wraz z kosztem pomyłki.',
      ],
      challenge:
        'Przed kolejnym pytaniem o fakty zapisz jedno twierdzenie, którego błąd spowodowałby największą szkodę. Sprawdź je jako pierwsze.',
    },
  },
  'what-is-a-prompt': {
    en: {
      image: '/images/learn/what-is-a-prompt.jpg',
      alt: 'Scattered paper shapes pass through a structured frame and become one clear, composed card.',
      caption:
        'A prompt narrows the space of possible answers: purpose, audience and format turn a vague request into a useful result.',
      outcomes: [
        'recognize the goal, context, input, audience, format and criteria inside a request;',
        'rewrite a vague instruction without making it unnecessarily long;',
        'distinguish your message from the instructions set by an application.',
      ],
      example: {
        situation:
          'You need a short plan for a weekend in Gdańsk for two adults and a child. Rain is likely and one person cannot walk far.',
        firstAttempt: 'Plan a weekend in Gdańsk.',
        improvedApproach:
          'Plan Saturday and Sunday in Gdańsk for two adults and a six-year-old. Keep walks under 20 minutes, include indoor alternatives for rain and suggest one quiet lunch place each day. Return a morning / afternoon / evening table with approximate travel time.',
        explanation:
          'The better prompt defines the people, constraints and usable format. It remains short because every detail changes the plan.',
      },
      practice: {
        title: 'Upgrade one real request',
        duration: '10 minutes',
        steps: [
          'Take a request you used recently and underline its goal.',
          'Add only the missing audience, source material or constraint that would change the answer.',
          'Specify the output format and two simple quality criteria.',
          'Run both versions and decide which added detail produced the biggest improvement.',
        ],
      },
      pitfalls: [
        {
          title: 'Adding detail without purpose',
          body: 'A long background story can bury the task. Keep information that changes the answer and remove the rest.',
        },
        {
          title: 'Conflicting instructions',
          body: '“Be comprehensive” and “use three sentences” may pull in opposite directions. State which requirement wins.',
        },
        {
          title: 'Keeping success in your head',
          body: 'If tone, length or required sections matter, say so before the draft instead of correcting avoidable guesses later.',
        },
      ],
      takeaways: [
        'A prompt is a brief, not a magic formula.',
        'Useful constraints reduce guessing; decorative detail does not.',
        'A clear output format makes the answer easier to evaluate and reuse.',
      ],
      challenge:
        'Rewrite “Help me prepare for a meeting” so another person could judge the answer without asking what you meant.',
    },
    pl: {
      image: '/images/learn/what-is-a-prompt.jpg',
      alt: 'Rozproszone papierowe kształty przechodzą przez uporządkowaną ramę i zmieniają się w jedną czytelną kartę.',
      caption:
        'Prompt zawęża przestrzeń możliwych odpowiedzi: cel, odbiorca i format zmieniają ogólną prośbę w użyteczny wynik.',
      outcomes: [
        'rozpoznać cel, kontekst, dane, odbiorcę, format i kryteria w poleceniu;',
        'poprawić niejasną instrukcję bez niepotrzebnego jej wydłużania;',
        'odróżnić własną wiadomość od instrukcji ustawionych przez aplikację.',
      ],
      example: {
        situation:
          'Potrzebujesz planu weekendu w Gdańsku dla dwojga dorosłych i dziecka. Możliwy jest deszcz, a jedna osoba nie może długo chodzić.',
        firstAttempt: 'Zaplanuj weekend w Gdańsku.',
        improvedApproach:
          'Zaplanuj sobotę i niedzielę w Gdańsku dla dwojga dorosłych i sześciolatka. Ogranicz spacery do 20 minut, dodaj warianty pod dachem na wypadek deszczu i jedno spokojne miejsce na obiad każdego dnia. Zwróć tabelę: rano / popołudnie / wieczór, z przybliżonym czasem dojazdu.',
        explanation:
          'Lepszy prompt określa osoby, ograniczenia i użyteczny format. Nadal jest krótki, bo każdy dodany szczegół wpływa na plan.',
      },
      practice: {
        title: 'Ulepsz jedno prawdziwe polecenie',
        duration: '10 minut',
        steps: [
          'Weź niedawno użyte polecenie i podkreśl jego cel.',
          'Dodaj tylko brakującego odbiorcę, materiał albo ograniczenie, które zmieni odpowiedź.',
          'Wskaż format wyniku i dwa proste kryteria jakości.',
          'Uruchom obie wersje i oceń, który szczegół dał największą poprawę.',
        ],
      },
      pitfalls: [
        {
          title: 'Szczegóły bez celu',
          body: 'Długa historia może ukryć właściwe zadanie. Zostaw informacje, które zmieniają odpowiedź, a resztę usuń.',
        },
        {
          title: 'Sprzeczne instrukcje',
          body: '„Napisz wyczerpująco” i „użyj trzech zdań” mogą prowadzić w różne strony. Wskaż, które wymaganie jest ważniejsze.',
        },
        {
          title: 'Kryteria sukcesu pozostają w głowie',
          body: 'Jeśli liczą się ton, długość lub obowiązkowe sekcje, podaj je przed szkicem zamiast później poprawiać zgadywanie.',
        },
      ],
      takeaways: [
        'Prompt jest briefem, a nie magiczną formułą.',
        'Przydatne ograniczenia zmniejszają zgadywanie; ozdobne szczegóły tego nie robią.',
        'Jasny format ułatwia ocenę i ponowne użycie odpowiedzi.',
      ],
      challenge:
        'Przepisz zdanie „Pomóż mi przygotować się do spotkania” tak, aby inna osoba mogła ocenić odpowiedź bez dopytywania, co masz na myśli.',
    },
  },
  'prompting-as-dialogue': {
    en: {
      image: '/images/learn/prompting-as-dialogue.jpg',
      alt: 'Two paper speech forms exchange draft cards around a circular review and revision loop.',
      caption:
        'Good prompting is a loop: clarify, draft, inspect and improve. Each turn should have one clear job.',
      outcomes: [
        'start a complex task with a short brief instead of an oversized prompt;',
        'use questions to reveal missing information before work begins;',
        'improve a draft through focused, observable changes.',
      ],
      example: {
        situation:
          'A team announcement must explain a changed office schedule without sounding cold or creating more questions.',
        firstAttempt: 'Write an email about the new office schedule.',
        improvedApproach:
          'Before writing, ask me one question at a time about the reason, affected people, dates and available exceptions. Then summarize what you heard. After I confirm it, draft an email under 180 words with the change first, the reason second and a clear contact for individual cases.',
        explanation:
          'The assistant collects missing facts before drafting, confirms the brief and receives criteria that make revision concrete.',
      },
      practice: {
        title: 'Use the five-turn loop',
        duration: '15 minutes',
        steps: [
          'Describe a real task in two sentences: the goal and who needs the result.',
          'Ask the assistant to interview you with no more than five questions, one at a time.',
          'Confirm or correct its summary, then request the first draft.',
          'Ask for a critique against three criteria and revise only the weakest area.',
        ],
      },
      pitfalls: [
        {
          title: 'Trying to predict every question',
          body: 'A giant first prompt is hard to review. Give a useful starting brief and let targeted questions expose what is missing.',
        },
        {
          title: 'Saying only “make it better”',
          body: 'Name the dimension to improve: clarity, tone, evidence, structure, length or usefulness for a specific audience.',
        },
        {
          title: 'Changing everything at once',
          body: 'If tone, structure and content all change together, you cannot tell what helped. Revise one dimension per turn.',
        },
      ],
      takeaways: [
        'The first answer is a draft, not a verdict.',
        'Questions before production are cheaper than corrections after production.',
        'A visible criterion turns subjective feedback into a useful instruction.',
      ],
      challenge:
        'Take one answer you dislike and request exactly one measurable change without using the words “better”, “improve” or “more professional”.',
    },
    pl: {
      image: '/images/learn/prompting-as-dialogue.jpg',
      alt: 'Dwa papierowe dymki wymieniają szkice w kolistej pętli pytań, kontroli i poprawek.',
      caption:
        'Dobre promptowanie jest pętlą: doprecyzuj, przygotuj szkic, sprawdź i popraw. Każda tura powinna mieć jedno jasne zadanie.',
      outcomes: [
        'rozpocząć złożone zadanie krótkim briefem zamiast ogromnym promptem;',
        'wykorzystać pytania do ujawnienia braków przed rozpoczęciem pracy;',
        'poprawiać szkic przez konkretne i widoczne zmiany.',
      ],
      example: {
        situation:
          'Wiadomość do zespołu ma wyjaśnić zmianę dni pracy w biurze, ale nie może brzmieć chłodno ani wywołać kolejnej fali pytań.',
        firstAttempt: 'Napisz e-mail o nowym harmonogramie pracy w biurze.',
        improvedApproach:
          'Zanim napiszesz, zadaj mi po jednym pytaniu o powód, zainteresowane osoby, daty i możliwe wyjątki. Potem podsumuj ustalenia. Po moim potwierdzeniu przygotuj e-mail do 180 słów: najpierw zmiana, potem powód i jasny kontakt w sprawach indywidualnych.',
        explanation:
          'Asystent zbiera brakujące fakty przed pisaniem, potwierdza brief i otrzymuje kryteria, dzięki którym poprawki są konkretne.',
      },
      practice: {
        title: 'Przejdź pętlę pięciu etapów',
        duration: '15 minut',
        steps: [
          'Opisz prawdziwe zadanie w dwóch zdaniach: cel oraz odbiorcę wyniku.',
          'Poproś asystenta o maksymalnie pięć pytań, zadawanych pojedynczo.',
          'Potwierdź lub popraw podsumowanie, a następnie zamów pierwszy szkic.',
          'Poproś o ocenę według trzech kryteriów i popraw wyłącznie najsłabszy obszar.',
        ],
      },
      pitfalls: [
        {
          title: 'Próba przewidzenia każdego pytania',
          body: 'Ogromny pierwszy prompt trudno ocenić. Podaj użyteczny brief początkowy, a braki odkryj przez celne pytania.',
        },
        {
          title: 'Samo „zrób to lepiej”',
          body: 'Nazwij obszar poprawy: jasność, ton, dowody, struktura, długość albo użyteczność dla konkretnego odbiorcy.',
        },
        {
          title: 'Zmiana wszystkiego naraz',
          body: 'Gdy jednocześnie zmieniasz ton, układ i treść, nie wiesz, co pomogło. Poprawiaj jeden wymiar na turę.',
        },
      ],
      takeaways: [
        'Pierwsza odpowiedź jest szkicem, a nie werdyktem.',
        'Pytania przed wykonaniem są tańsze niż poprawki po wykonaniu.',
        'Widoczne kryterium zmienia subiektywną uwagę w użyteczną instrukcję.',
      ],
      challenge:
        'Weź odpowiedź, która ci się nie podoba, i zamów jedną mierzalną zmianę bez używania słów „lepiej”, „popraw” ani „bardziej profesjonalnie”.',
    },
  },
  'critical-thinking-with-ai': {
    en: {
      image: '/images/learn/critical-thinking-with-ai.jpg',
      alt: 'One answer card is inspected with a balance scale, magnifying glass, opposing paths and a missing puzzle piece.',
      caption:
        'A strong answer survives more than one test: evidence, alternatives, missing information and the consequences of error.',
      outcomes: [
        'separate facts from interpretations and recommendations;',
        'test an answer from several relevant perspectives;',
        'design a verification step that matches the risk of the decision.',
      ],
      example: {
        situation:
          'An assistant recommends one software supplier after reading three proposals. The summary is polished, but the criteria were never defined.',
        firstAttempt: 'Which supplier is best?',
        improvedApproach:
          'Before scoring the proposals, derive a neutral table with these criteria: total three-year cost, implementation time, data location, support hours and exit terms. Mark every missing value. Score all suppliers with the same method, cite the proposal page for each fact and list the two strongest arguments against the winner.',
        explanation:
          'Criteria are fixed before a favourite appears, missing evidence remains visible and the winning option is actively challenged.',
      },
      practice: {
        title: 'Audit one confident answer',
        duration: '15 minutes',
        steps: [
          'Choose an answer that contains a recommendation or conclusion.',
          'Ask for a table separating supplied facts, inferences and unknowns.',
          'Request the strongest alternative explanation and evidence that would change the conclusion.',
          'Verify the two highest-impact claims outside the conversation.',
        ],
      },
      pitfalls: [
        {
          title: 'Asking “Are you sure?”',
          body: 'The model can repeat the same claim more confidently. Ask for evidence, uncertainty and a specific falsification test instead.',
        },
        {
          title: 'Forcing false balance',
          body: 'Multiple perspectives do not mean every claim is equally supported. Keep the quality and quantity of evidence visible.',
        },
        {
          title: 'Delegating the decision',
          body: 'AI can structure trade-offs, but the accountable person must consider context, values and consequences beyond the prompt.',
        },
      ],
      takeaways: [
        'Ask what supports a claim and what could disprove it.',
        'Use the same criteria for every option.',
        'Keep the final decision and its accountability with a person.',
      ],
      challenge:
        'For your next recommendation, write the strongest reason not to follow it and one early warning sign that would trigger a review.',
    },
    pl: {
      image: '/images/learn/critical-thinking-with-ai.jpg',
      alt: 'Jedna karta z odpowiedzią jest sprawdzana za pomocą wagi, lupy, przeciwnych ścieżek i brakującego puzzla.',
      caption:
        'Mocna odpowiedź wytrzymuje więcej niż jeden test: dowody, alternatywy, brakujące informacje i skutki pomyłki.',
      outcomes: [
        'oddzielić fakty od interpretacji i rekomendacji;',
        'sprawdzić odpowiedź z kilku istotnych perspektyw;',
        'zaplanować weryfikację odpowiednią do ryzyka decyzji.',
      ],
      example: {
        situation:
          'Asystent rekomenduje jednego dostawcę oprogramowania po przeczytaniu trzech ofert. Podsumowanie brzmi dobrze, ale wcześniej nie ustalono kryteriów.',
        firstAttempt: 'Który dostawca jest najlepszy?',
        improvedApproach:
          'Przed oceną ofert utwórz neutralną tabelę z kryteriami: pełny koszt przez trzy lata, czas wdrożenia, miejsce przechowywania danych, godziny wsparcia i warunki rezygnacji. Zaznacz każdą brakującą wartość. Oceń wszystkich tą samą metodą, przy każdym fakcie wskaż stronę oferty i podaj dwa najmocniejsze argumenty przeciw zwycięzcy.',
        explanation:
          'Kryteria powstają przed wyborem faworyta, braki dowodów pozostają widoczne, a zwycięska opcja zostaje świadomie zakwestionowana.',
      },
      practice: {
        title: 'Przeprowadź audyt pewnej siebie odpowiedzi',
        duration: '15 minut',
        steps: [
          'Wybierz odpowiedź zawierającą rekomendację lub wniosek.',
          'Poproś o tabelę oddzielającą dostarczone fakty, wnioskowanie i niewiadome.',
          'Zażądaj najmocniejszego alternatywnego wyjaśnienia oraz dowodów, które zmieniłyby wniosek.',
          'Sprawdź poza rozmową dwa twierdzenia o największych konsekwencjach.',
        ],
      },
      pitfalls: [
        {
          title: 'Pytanie „Czy na pewno?”',
          body: 'Model może powtórzyć to samo z większą pewnością. Zamiast tego zapytaj o dowody, niepewność i konkretny test obalający wniosek.',
        },
        {
          title: 'Sztuczna równowaga',
          body: 'Wiele perspektyw nie oznacza, że każde twierdzenie ma takie samo poparcie. Pokazuj jakość i ilość dowodów.',
        },
        {
          title: 'Oddanie decyzji modelowi',
          body: 'AI porządkuje kompromisy, lecz odpowiedzialna osoba musi uwzględnić kontekst, wartości i skutki spoza promptu.',
        },
      ],
      takeaways: [
        'Pytaj, co wspiera twierdzenie i co mogłoby je obalić.',
        'Stosuj te same kryteria wobec każdej opcji.',
        'Pozostaw ostateczną decyzję i odpowiedzialność człowiekowi.',
      ],
      challenge:
        'Przy następnej rekomendacji zapisz najmocniejszy powód, by jej nie realizować, oraz jeden sygnał ostrzegawczy uruchamiający ponowną ocenę.',
    },
  },
  'generating-images': {
    en: {
      image: '/images/learn/generating-images.jpg',
      alt: 'Simple controls for subject, framing, light, palette and space guide several drafts into one finished picture.',
      caption:
        'A usable image begins with a visual job and a composition. Style comes after purpose.',
      outcomes: [
        'turn a communication goal into a practical visual brief;',
        'control composition with placement, camera and negative space;',
        'iterate without accidentally changing the parts that already work.',
      ],
      example: {
        situation:
          'You need an image for the opening slide of an internal workshop. The title will sit on the right and the audience should feel welcome, not impressed by science fiction.',
        firstAttempt: 'Create a modern image about AI.',
        improvedApproach:
          'Create a natural editorial photograph for a 16:9 workshop slide: three colleagues arranging paper notes around a laptop on the left half of a bright, ordinary meeting room. Eye-level camera, soft daylight, calm realistic colour. Leave the right 40% visually quiet for a title. No visible screen content, text, logos, robots or neon effects.',
        explanation:
          'The improved brief defines the image’s job, placement and exclusions. The result has a realistic chance of fitting the slide.',
      },
      practice: {
        title: 'Build and refine one visual',
        duration: '15 minutes',
        steps: [
          'Name where the image will appear and what the viewer should understand or feel.',
          'Specify subject, setting, framing, light, palette, aspect ratio and exclusions.',
          'Generate several drafts and choose the one with the strongest composition, not the prettiest detail.',
          'Edit one variable while explicitly preserving subject, framing and every successful element.',
        ],
      },
      pitfalls: [
        {
          title: 'Mood without layout',
          body: 'Words like “modern” or “premium” do not say where anything belongs. Describe viewpoint, scale, placement and empty space.',
        },
        {
          title: 'Trusting generated text',
          body: 'Small copy can be misspelled or invented. Add important wording in a layout tool and always proofread what remains in the image.',
        },
        {
          title: 'Revision drift',
          body: 'A colour change can alter faces, objects or composition. Repeat what must stay unchanged in every edit request.',
        },
      ],
      takeaways: [
        'Start with the image’s job, not a list of attractive adjectives.',
        'Composition determines whether a draft can be used in a real layout.',
        'Focused edits are easier to compare and control.',
      ],
      challenge:
        'Take one image prompt and remove every adjective that does not affect subject, composition, light, material or intended use.',
    },
    pl: {
      image: '/images/learn/generating-images.jpg',
      alt: 'Proste ustawienia tematu, kadru, światła, palety i przestrzeni prowadzą od kilku szkiców do gotowego obrazu.',
      caption:
        'Użyteczny obraz zaczyna się od zadania wizualnego i kompozycji. Styl pojawia się dopiero po określeniu celu.',
      outcomes: [
        'zamienić cel komunikacyjny w praktyczny brief wizualny;',
        'kontrolować kompozycję przez rozmieszczenie, kamerę i pustą przestrzeń;',
        'poprawiać obraz bez przypadkowej zmiany elementów, które już działają.',
      ],
      example: {
        situation:
          'Potrzebujesz obrazu na slajd otwierający wewnętrzne szkolenie. Tytuł znajdzie się po prawej, a odbiorcy mają poczuć się swobodnie, nie jak w filmie science fiction.',
        firstAttempt: 'Stwórz nowoczesny obraz o AI.',
        improvedApproach:
          'Stwórz naturalną fotografię redakcyjną na slajd 16:9: troje współpracowników układa papierowe notatki wokół laptopa w lewej połowie jasnej, zwyczajnej sali spotkań. Kamera na wysokości oczu, miękkie światło dzienne, spokojne realistyczne kolory. Pozostaw prawe 40% kadru wizualnie puste na tytuł. Bez widocznej treści ekranu, tekstu, logotypów, robotów i neonów.',
        explanation:
          'Lepszy brief określa zadanie obrazu, rozmieszczenie i wykluczenia. Wynik ma realną szansę pasować do slajdu.',
      },
      practice: {
        title: 'Zbuduj i popraw jedną grafikę',
        duration: '15 minut',
        steps: [
          'Nazwij miejsce użycia obrazu oraz to, co odbiorca ma zrozumieć lub poczuć.',
          'Określ temat, otoczenie, kadr, światło, paletę, proporcje i wykluczenia.',
          'Wygeneruj kilka szkiców i wybierz najlepszą kompozycję, nie najładniejszy detal.',
          'Zmień jedną cechę, wyraźnie nakazując zachowanie tematu, kadru i udanych elementów.',
        ],
      },
      pitfalls: [
        {
          title: 'Nastrój bez układu',
          body: 'Słowa „nowoczesny” czy „premium” nie mówią, gdzie ma znaleźć się temat. Opisz punkt widzenia, skalę, położenie i pustą przestrzeń.',
        },
        {
          title: 'Zaufanie do wygenerowanego tekstu',
          body: 'Drobny napis może zawierać błędy lub zmyślone słowa. Ważny tekst dodaj w programie do składu i zawsze sprawdź to, co pozostaje na obrazie.',
        },
        {
          title: 'Dryf podczas poprawek',
          body: 'Zmiana koloru może zmienić twarze, przedmioty lub kadr. W każdej poprawce ponownie wymień to, co ma pozostać bez zmian.',
        },
      ],
      takeaways: [
        'Zacznij od zadania obrazu, a nie listy atrakcyjnych przymiotników.',
        'Kompozycja decyduje, czy szkic można wykorzystać w prawdziwym układzie.',
        'Skupione poprawki łatwiej porównać i kontrolować.',
      ],
      challenge:
        'Weź jeden prompt graficzny i usuń każdy przymiotnik, który nie wpływa na temat, kompozycję, światło, materiał ani zastosowanie.',
    },
  },
  'organizing-work-with-ai': {
    en: {
      image: '/images/learn/organizing-work-with-ai.jpg',
      alt: 'Loose task cards are sorted into a conversation tray, a project folder, a memory archive and a reusable process box.',
      caption:
        'Different information has a different lifespan. Give each task the smallest home that supports it.',
      outcomes: [
        'choose between a chat, project, memory and reusable skill;',
        'move work to a fresh conversation without losing important decisions;',
        'keep temporary, stable and sensitive information in appropriate places.',
      ],
      example: {
        situation:
          'Every Monday you turn meeting notes into decisions, owners and follow-ups. You also have one-off questions and a few stable writing preferences.',
        firstAttempt: 'Keep everything in one long chat so the assistant remembers it.',
        improvedApproach:
          'Use a project for the recurring meeting files and shared instructions, a fresh chat for each meeting, memory only for stable preferences such as date format, and a Skill for the repeatable recap procedure. End each chat with a hand-off summary and never store confidential access data in memory.',
        explanation:
          'Each piece of information gets a lifespan and a clear boundary. Old conversations stop contaminating new work while the useful process remains reusable.',
      },
      practice: {
        title: 'Map your AI workspace',
        duration: '15 minutes',
        steps: [
          'List five recent AI tasks and mark each as one-off, ongoing, stable preference or repeatable process.',
          'Assign each item to a new chat, project, memory or Skill.',
          'Choose one overloaded conversation and ask for a hand-off summary of goal, facts, decisions, constraints and next step.',
          'Start fresh with the summary and remove anything the new task does not need.',
        ],
      },
      pitfalls: [
        {
          title: 'One endless conversation',
          body: 'Old goals and assumptions accumulate. Start fresh when the outcome changes, and carry over a deliberate summary rather than the entire history.',
        },
        {
          title: 'Memory as a private vault',
          body: 'Do not store passwords, access tokens, health records or fast-changing facts. Use the product’s controls to review and remove saved memories.',
        },
        {
          title: 'Automating before understanding',
          body: 'Run a workflow manually several times before turning it into a Skill. Stable steps and quality checks should emerge from real use.',
        },
      ],
      takeaways: [
        'Match where information lives to how long it should remain useful.',
        'A hand-off summary preserves decisions without carrying every distraction.',
        'Reusable procedures belong in a Skill; secrets do not belong in memory.',
      ],
      challenge:
        'Find one chat that now contains two goals. Write a five-line hand-off for the newer goal and continue it in a clean conversation.',
    },
    pl: {
      image: '/images/learn/organizing-work-with-ai.jpg',
      alt: 'Luźne karty zadań są rozdzielane między tackę rozmowy, folder projektu, archiwum pamięci i pudełko procesu.',
      caption:
        'Różne informacje mają różny czas przydatności. Daj zadaniu najmniejsze miejsce, które naprawdę je wspiera.',
      outcomes: [
        'wybrać między rozmową, projektem, pamięcią i powtarzalnym Skillem;',
        'przenieść pracę do świeżej rozmowy bez utraty ważnych decyzji;',
        'umieścić informacje tymczasowe, stałe i wrażliwe we właściwych miejscach.',
      ],
      example: {
        situation:
          'W każdy poniedziałek zamieniasz notatki ze spotkania w decyzje, właścicieli i dalsze działania. Masz też jednorazowe pytania i kilka stałych preferencji pisania.',
        firstAttempt: 'Trzymaj wszystko w jednej długiej rozmowie, żeby asystent pamiętał.',
        improvedApproach:
          'Użyj projektu dla cyklicznych plików i wspólnych instrukcji, świeżej rozmowy dla każdego spotkania, pamięci wyłącznie dla stałych preferencji, takich jak format daty, oraz Skilla dla powtarzalnej procedury podsumowania. Kończ rozmowę podsumowaniem do przekazania i nigdy nie zapisuj poufnych danych dostępowych w pamięci.',
        explanation:
          'Każda informacja otrzymuje czas życia i granicę. Stare rozmowy przestają zakłócać nową pracę, a użyteczny proces pozostaje wielokrotnego użytku.',
      },
      practice: {
        title: 'Zmapuj swoje miejsce pracy z AI',
        duration: '15 minut',
        steps: [
          'Wypisz pięć ostatnich zadań i oznacz je jako jednorazowe, ciągłe, stałą preferencję albo powtarzalny proces.',
          'Przypisz każdą pozycję do nowej rozmowy, projektu, pamięci lub Skilla.',
          'Wybierz przeciążoną rozmowę i poproś o podsumowanie: cel, fakty, decyzje, ograniczenia i następny krok.',
          'Rozpocznij od nowa z tym podsumowaniem i usuń wszystko, czego nowe zadanie nie potrzebuje.',
        ],
      },
      pitfalls: [
        {
          title: 'Jedna nieskończona rozmowa',
          body: 'Stare cele i założenia gromadzą się. Gdy zmienia się wynik, zacznij od nowa i przenieś świadome podsumowanie zamiast całej historii.',
        },
        {
          title: 'Pamięć jako prywatny sejf',
          body: 'Nie zapisuj haseł, tokenów, danych medycznych ani szybko zmieniających się faktów. Przeglądaj i usuwaj zapisy przez ustawienia produktu.',
        },
        {
          title: 'Automatyzacja przed zrozumieniem',
          body: 'Wykonaj proces ręcznie kilka razy, zanim zamienisz go w Skill. Stałe kroki i kontrole jakości powinny wynikać z praktyki.',
        },
      ],
      takeaways: [
        'Dopasuj miejsce informacji do czasu, przez który ma być przydatna.',
        'Podsumowanie do przekazania zachowuje decyzje bez przenoszenia rozpraszaczy.',
        'Powtarzalna procedura pasuje do Skilla; sekrety nie pasują do pamięci.',
      ],
      challenge:
        'Znajdź rozmowę, która zawiera już dwa cele. Napisz pięciowierszowe podsumowanie nowszego celu i kontynuuj go w czystej rozmowie.',
    },
  },
  'what-is-a-skill': {
    en: {
      image: '/images/learn/what-is-a-skill.jpg',
      alt: 'A matching task piece opens a folder containing reusable instruction cards, references and one tool.',
      caption:
        'A Skill packages a proven way of working. It appears when the task matches and brings only the instructions that are needed.',
      outcomes: [
        'recognize when a repeated workflow is ready to become a Skill;',
        'describe the trigger, inputs, steps, output and quality checks;',
        'keep core instructions readable by moving edge cases into references.',
      ],
      example: {
        situation:
          'After every meeting, you clean notes, identify decisions, assign owners and draft a follow-up. The same corrections recur each week.',
        firstAttempt: 'Save my favourite meeting-summary prompt.',
        improvedApproach:
          'Create a meeting recap Skill that activates for raw meeting notes, asks for missing participant names, never invents an owner or deadline, returns decisions / actions / open questions in a fixed format and checks that every action has an owner or is explicitly marked unassigned.',
        explanation:
          'The Skill preserves the whole procedure and its safety rules, not only one request. Its quality check makes a silent omission visible.',
      },
      practice: {
        title: 'Design a Skill on paper',
        duration: '15 minutes',
        steps: [
          'Choose a task you have completed successfully at least three times.',
          'Write one sentence describing exactly when the Skill should activate.',
          'List required inputs, numbered steps, output shape and three “never” rules.',
          'Create one normal test and one difficult edge case, then refine the instructions against both.',
        ],
      },
      pitfalls: [
        {
          title: 'A Skill for everything',
          body: 'Broad triggers create unpredictable behaviour. One Skill should own one recognizable job with a clear boundary.',
        },
        {
          title: 'Steps without an output contract',
          body: 'Say what the final artifact must contain and how to signal missing information. Otherwise two correct runs may be impossible to compare.',
        },
        {
          title: 'No realistic test',
          body: 'Examples reveal ambiguity faster than more prose. Test a normal input, incomplete input and a case that should not trigger the Skill.',
        },
      ],
      takeaways: [
        'A stable, repeated procedure is a better Skill candidate than a one-off prompt.',
        'Good triggers say both when to use the Skill and where its responsibility ends.',
        'Quality checks and failure behaviour belong inside the procedure.',
      ],
      challenge:
        'Describe one possible Skill in five lines: trigger, input, three core steps, output and one quality check.',
    },
    pl: {
      image: '/images/learn/what-is-a-skill.jpg',
      alt: 'Pasujący element zadania otwiera folder z kartami instrukcji, materiałami pomocniczymi i jednym narzędziem.',
      caption:
        'Skill przechowuje sprawdzony sposób pracy. Pojawia się, gdy zadanie pasuje, i dostarcza tylko potrzebne instrukcje.',
      outcomes: [
        'rozpoznać moment, w którym powtarzalny proces warto zamienić w Skill;',
        'opisać wyzwalacz, dane wejściowe, kroki, wynik i kontrole jakości;',
        'zachować czytelny rdzeń instrukcji, przenosząc wyjątki do materiałów pomocniczych.',
      ],
      example: {
        situation:
          'Po każdym spotkaniu porządkujesz notatki, wskazujesz decyzje, przypisujesz właścicieli i przygotowujesz wiadomość. Co tydzień poprawiasz te same rzeczy.',
        firstAttempt: 'Zapisz mój ulubiony prompt do podsumowania spotkania.',
        improvedApproach:
          'Utwórz Skill do podsumowań, który uruchamia się dla surowych notatek, pyta o brakujące nazwiska, nigdy nie wymyśla właściciela ani terminu, zwraca stałe sekcje decyzje / działania / otwarte pytania i sprawdza, czy każde działanie ma właściciela lub jawne oznaczenie „nieprzypisane”.',
        explanation:
          'Skill zachowuje całą procedurę i zasady bezpieczeństwa, nie tylko jedno polecenie. Kontrola jakości ujawnia ciche pominięcia.',
      },
      practice: {
        title: 'Zaprojektuj Skill na papierze',
        duration: '15 minut',
        steps: [
          'Wybierz zadanie, które udało ci się wykonać co najmniej trzy razy.',
          'Jednym zdaniem opisz dokładnie, kiedy Skill powinien się uruchomić.',
          'Wypisz wymagane dane, ponumerowane kroki, formę wyniku i trzy zasady „nigdy”.',
          'Przygotuj zwykły test i trudny wyjątek, a potem popraw instrukcje na podstawie obu.',
        ],
      },
      pitfalls: [
        {
          title: 'Skill do wszystkiego',
          body: 'Zbyt szeroki wyzwalacz prowadzi do nieprzewidywalnego działania. Jeden Skill powinien mieć jedno rozpoznawalne zadanie i jasną granicę.',
        },
        {
          title: 'Kroki bez umowy na wynik',
          body: 'Opisz zawartość końcowego materiału i sposób oznaczania braków. Inaczej dwóch poprawnych wykonań nie da się porównać.',
        },
        {
          title: 'Brak realistycznego testu',
          body: 'Przykład szybciej ujawnia niejasność niż kolejny akapit. Sprawdź zwykłe dane, dane niepełne i przypadek, który nie powinien uruchomić Skilla.',
        },
      ],
      takeaways: [
        'Stała, powtarzalna procedura jest lepszym kandydatem na Skill niż jednorazowy prompt.',
        'Dobry wyzwalacz mówi, kiedy użyć Skilla i gdzie kończy się jego odpowiedzialność.',
        'Kontrola jakości oraz zachowanie przy błędzie należą do procedury.',
      ],
      challenge:
        'Opisz możliwy Skill w pięciu punktach: wyzwalacz, dane, trzy główne kroki, wynik i jedna kontrola jakości.',
    },
  },
  'what-is-a-subagent': {
    en: {
      image: '/images/learn/what-is-a-subagent.jpg',
      alt: 'A coordinator sends three separate task pieces to focused helper stations and receives concise result cards.',
      caption:
        'Delegation works when each helper receives a bounded task, enough context and a clear definition of the result.',
      outcomes: [
        'identify work that benefits from a focused helper rather than the main conversation;',
        'write a self-contained delegation with scope, context and deliverable;',
        'review and combine returned results without losing accountability.',
      ],
      example: {
        situation:
          'You are preparing a community event. The venue comparison, accessibility review and draft schedule can be researched independently.',
        firstAttempt: 'Use subagents to plan the event.',
        improvedApproach:
          'Delegate three bounded tasks: compare the supplied venue offers using the same five criteria; audit the draft plan for accessibility barriers; turn confirmed activities into a schedule with conflicts marked. Give every helper the event date, audience, budget and source files. Require a short result, evidence references, open questions and no final booking decisions.',
        explanation:
          'The workstreams are independent, their inputs and limits are explicit, and the main assistant retains the integration and final decision.',
      },
      practice: {
        title: 'Write a delegation packet',
        duration: '15 minutes',
        steps: [
          'Take a larger task and split it into two or three outputs that can be produced independently.',
          'For each helper, write the goal, necessary context, allowed sources, exclusions and exact deliverable.',
          'Add a rule for uncertainty: what should be flagged instead of guessed?',
          'Define how the main assistant will compare, reconcile and verify the returned results.',
        ],
      },
      pitfalls: [
        {
          title: 'A vague assignment',
          body: 'A helper cannot recover context it never received. Include decisions, definitions and source locations that the task depends on.',
        },
        {
          title: 'Overlapping ownership',
          body: 'Two helpers editing the same conclusion create conflict. Delegate separable outputs and keep one owner for integration.',
        },
        {
          title: 'Trusting a tidy summary',
          body: 'A concise result can still be wrong. Require evidence, assumptions and open questions, then verify high-impact claims.',
        },
      ],
      takeaways: [
        'Delegate bounded outputs, not a vague share of responsibility.',
        'Separate context protects focus only when the task packet is complete.',
        'The main assistant owns synthesis; a person still owns the consequential decision.',
      ],
      challenge:
        'Rewrite “research our competitors” as a delegation that another helper could finish without seeing the current conversation.',
    },
    pl: {
      image: '/images/learn/what-is-a-subagent.jpg',
      alt: 'Koordynator wysyła trzy osobne części zadania do wyspecjalizowanych pomocników i otrzymuje zwięzłe karty wyników.',
      caption:
        'Delegowanie działa, gdy każdy pomocnik otrzymuje ograniczone zadanie, wystarczający kontekst i jasną definicję wyniku.',
      outcomes: [
        'rozpoznać pracę, która skorzysta z osobnego pomocnika zamiast głównej rozmowy;',
        'napisać samodzielne zlecenie z zakresem, kontekstem i oczekiwanym wynikiem;',
        'sprawdzić i połączyć zwrócone wyniki bez utraty odpowiedzialności.',
      ],
      example: {
        situation:
          'Przygotowujesz wydarzenie lokalnej społeczności. Porównanie miejsc, kontrolę dostępności i szkic harmonogramu można opracować niezależnie.',
        firstAttempt: 'Użyj subagentów do zaplanowania wydarzenia.',
        improvedApproach:
          'Deleguj trzy ograniczone zadania: porównaj dostarczone oferty miejsc według tych samych pięciu kryteriów; sprawdź szkic planu pod kątem barier dostępności; ułóż potwierdzone aktywności w harmonogram i oznacz konflikty. Każdemu pomocnikowi podaj datę, odbiorców, budżet i pliki źródłowe. Wymagaj krótkiego wyniku, wskazania dowodów, otwartych pytań i zakazu podejmowania decyzji o rezerwacji.',
        explanation:
          'Obszary pracy są niezależne, ich dane i granice są jawne, a główny asystent zachowuje odpowiedzialność za połączenie wyników i ostateczną decyzję.',
      },
      practice: {
        title: 'Napisz pakiet do delegowania',
        duration: '15 minut',
        steps: [
          'Weź większe zadanie i podziel je na dwa lub trzy wyniki możliwe do przygotowania niezależnie.',
          'Dla każdego pomocnika zapisz cel, konieczny kontekst, dozwolone źródła, wykluczenia i dokładny rezultat.',
          'Dodaj zasadę niepewności: co należy oznaczyć zamiast zgadywać?',
          'Określ, jak główny asystent porówna, uzgodni i sprawdzi zwrócone wyniki.',
        ],
      },
      pitfalls: [
        {
          title: 'Niejasne zlecenie',
          body: 'Pomocnik nie odzyska kontekstu, którego nie otrzymał. Dodaj decyzje, definicje i miejsca źródeł niezbędne do wykonania zadania.',
        },
        {
          title: 'Nakładająca się odpowiedzialność',
          body: 'Dwóch pomocników zmieniających ten sam wniosek tworzy konflikt. Deleguj rozłączne wyniki i zachowaj jednego właściciela integracji.',
        },
        {
          title: 'Zaufanie do schludnego podsumowania',
          body: 'Zwięzły wynik nadal może być błędny. Wymagaj dowodów, założeń i otwartych pytań, a ważne twierdzenia sprawdzaj.',
        },
      ],
      takeaways: [
        'Deleguj ograniczone wyniki, a nie niejasny fragment odpowiedzialności.',
        'Oddzielny kontekst chroni skupienie tylko wtedy, gdy pakiet zadania jest kompletny.',
        'Główny asystent odpowiada za syntezę, a człowiek za decyzję o poważnych skutkach.',
      ],
      challenge:
        'Przepisz „zbadaj naszą konkurencję” jako zlecenie, które pomocnik wykona bez dostępu do bieżącej rozmowy.',
    },
  },
  ...additionalLessonEnrichment,
};

export function getLessonEnrichment(slug: string, locale: LessonLocale) {
  return lessonEnrichment[slug]?.[locale];
}
