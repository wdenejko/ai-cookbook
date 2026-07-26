---
name: meeting-recap-pl
title: "Notatka po spotkaniu — Skill (PL)"
description: "Zamienia polskie notatki ze spotkania w krótkie podsumowanie, decyzje, zadania z właścicielami i pytania otwarte, bez dopowiadania brakujących danych."
library:
  tags: [polski, meetings, productivity, workflow]
  category: "Workshop PL"
  visibility: public
  targets: [chatgpt]
  sourceProject: ai-cookbook
---

# Notatka po spotkaniu

Użyj tej umiejętności, gdy użytkownik przekazuje notatki lub transkrypcję ze
spotkania i chce uzyskać materiał gotowy do wysłania uczestnikom.

## Informacje wejściowe

Poproś użytkownika o:

1. notatki albo transkrypcję;
2. nazwę lub cel spotkania, jeżeli nie wynika z notatek;
3. preferowany poziom szczegółowości: krótki albo pełny.

Jeżeli brakuje tylko nazwy spotkania, możesz użyć neutralnego tytułu „Podsumowanie
spotkania”. Nie blokuj zadania pytaniami, które nie zmienią wyniku.

## Sposób pracy

1. Przeczytaj cały materiał przed tworzeniem podsumowania.
2. Oddziel decyzje od propozycji i luźnych pomysłów.
3. Wyodrębnij zadania, ich właścicieli i terminy.
4. Jeżeli właściciel lub termin nie został podany, wpisz „Do ustalenia”.
5. Sprzeczności, niejasności i brakujące decyzje przenieś do pytań otwartych.
6. Zachowaj dokładnie liczby, daty, nazwy własne i nazwiska występujące w
   materiale.
7. Nie twórz faktów, decyzji, właścicieli ani terminów, których nie ma w notatkach.

## Format odpowiedzi

Przygotuj dokładnie następujące sekcje:

### W skrócie

Maksymalnie trzy zdania o celu i najważniejszym wyniku spotkania.

### Decyzje

Lista jednoznacznie podjętych decyzji. Jeżeli nie podjęto decyzji, napisz
„Brak potwierdzonych decyzji”.

### Zadania

| Właściciel | Zadanie | Termin |
|---|---|---|

Każde zadanie rozpocznij czasownikiem.

### Pytania otwarte i ryzyka

Lista rzeczy, które wymagają wyjaśnienia lub decyzji.

## Kontrola jakości

Przed zwróceniem odpowiedzi sprawdź:

- czy każda decyzja naprawdę występuje w materiale;
- czy żaden właściciel ani termin nie został wymyślony;
- czy propozycje nie zostały przedstawione jako decyzje;
- czy wynik jest zrozumiały dla osoby, która nie uczestniczyła w spotkaniu.
