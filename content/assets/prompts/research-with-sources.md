title: "Research a topic with sources"
description: "Plan and write a plain-language answer based on current, traceable sources instead of unsupported guesses."
role: user
variables:
  - name: question
    hint: "The question or topic to research"
  - name: audience
    hint: "Who needs the answer"
library:
  tags: [research, verification, critical-thinking]
  category: "Productivity"
  visibility: public
  targets: [chatgpt]
  sourceProject: null
---

Research this question for {{audience}}:
{{question}}

Use current, trustworthy sources. Prefer official documents, original research, and first-hand sources. Give the publication date and a clickable link for every important claim.

Write:
- a short answer first;
- the main facts in simple language;
- what is uncertain or disputed;
- a “How to check” section with the three most useful sources.

Separate facts from interpretation. If you cannot verify something, say so instead of inventing a source.
