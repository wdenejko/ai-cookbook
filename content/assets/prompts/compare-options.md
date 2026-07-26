title: "Compare options before deciding"
description: "Create a fair, easy-to-read comparison of products, services, or plans and show when each option makes sense."
role: user
variables:
  - name: options
    hint: "The options to compare"
  - name: criteria
    hint: "What matters most to you"
library:
  tags: [decision-making, critical-thinking, verification]
  category: "Productivity"
  visibility: public
  targets: [chatgpt]
  sourceProject: null
---

Compare these options:
{{options}}

My priorities are:
{{criteria}}

Use current information and say when a fact needs checking. Start with a simple comparison table. Then explain:
- the clearest advantage and drawback of each option;
- hidden costs, limits, or commitments;
- who should choose each option;
- what one missing piece of information could change the recommendation.

Do not declare one universal winner. Give a recommendation only for the priorities above, and list your assumptions.
