---
name: pdf-form-filler
description: "Fills AcroForm (interactive) PDF form fields from a key-value data map using pypdf, preserving the original layout. Use when you need to programmatically populate a fillable PDF — invoices, applications, tax or intake forms — from structured data instead of editing by hand."
allowed-tools: Read, Write, Bash
library:
  tags: [pdf, documents, forms]
  category: "Documents"
  visibility: public
  targets: [claude-code, claude-api]
  sourceProject: null
---

# PDF Form Filler

Fill the interactive fields of an **AcroForm** PDF from a data map, then write a new
file. Uses [`pypdf`](https://pypdf.readthedocs.io/) — pure Python, no system deps.

## When to use
- The source PDF has real form fields (AcroForm): text boxes, checkboxes, radio
  groups, dropdowns.
- You have the values as structured data (a dict / JSON object).
- You want the output to look identical to the template.

If the PDF is a flat scan with no interactive fields, this skill does **not** apply —
that needs OCR + a text overlay, not form filling.

## Setup
```bash
pip install "pypdf>=4.0"
```

## Step 1 — Discover the field names (never guess)
Read the field names and types straight from the file:

```python
from pypdf import PdfReader

reader = PdfReader("template.pdf")
fields = reader.get_fields() or {}
for name, f in fields.items():
    print(repr(name), "type:", f.get("/FT"), "states:", f.get("/_States_"))
```

- `/FT` is the field type: `/Tx` text, `/Btn` checkbox/radio, `/Ch` choice/dropdown.
- `/_States_` lists the accepted "on" values for a checkbox/radio (e.g.
  `['/Yes', '/Off']`). Use the exact string, including the leading `/`.

## Step 2 — Fill and save
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("template.pdf")
writer = PdfWriter()
writer.append(reader)

data = {
    "full_name": "Ada Lovelace",
    "email": "ada@example.com",
    "subscribe": "/Yes",   # checkbox: use a value from /_States_
    "plan": "Pro",         # dropdown: one of the field's listed options
}

for page in writer.pages:
    writer.update_page_form_field_values(page, data, auto_regenerate=False)

with open("filled.pdf", "wb") as fh:
    writer.write(fh)
```

Notes:
- `update_page_form_field_values` ignores keys that aren't on a given page, so it's
  safe to pass the whole `data` map to every page.
- `auto_regenerate=False` avoids setting `/NeedAppearances`, which keeps values
  visible in strict viewers. If a viewer still shows blanks, see `reference.md`.
- Keys absent from `data` are left untouched.

## Step 3 — Verify
```python
out = PdfReader("filled.pdf")
print(out.get_form_text_fields())   # {'full_name': 'Ada Lovelace', ...}
```

## Gotchas
- Checkbox/radio values are **names** (`/Yes`), not booleans — `True` won't tick it.
- A radio group shares one field name; set it to the chosen option's export value.
- Always work on a copy — never overwrite the template.
- Field names may contain spaces or dots; copy them verbatim from Step 1.

For field-type edge cases, appearance streams, and flattening, read `reference.md`
in this folder.
