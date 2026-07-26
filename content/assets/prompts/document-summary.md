title: "Summarize a document"
description: "Turn a PDF, Word file, or pasted text into a short, reliable summary with key facts and follow-up questions."
role: user
variables:
  - name: document
    hint: "Upload the file or paste its text"
library:
  tags: [documents, summarization, verification]
  category: "Documents"
  visibility: public
  targets: [chatgpt]
  sourceProject: null
---

Read the document below and explain it for a non-specialist.

Document:
"""
{{document}}
"""

Return:
1. A five-sentence summary.
2. The five most important facts, with page or section references when available.
3. A short list of dates, amounts, names, and commitments.
4. Anything unclear, missing, or worth checking.

Use only the document. Do not fill gaps with guesses or outside knowledge. Say clearly when the document does not contain an answer.
