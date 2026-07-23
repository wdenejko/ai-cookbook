# pypdf form-filling reference

Deeper reference for the `pdf-form-filler` skill. Read this when a field type
misbehaves or values don't show up.

## Field types (`/FT`)

| `/FT`  | Meaning        | How to set it                                                  |
|--------|----------------|----------------------------------------------------------------|
| `/Tx`  | Text field     | Plain string value.                                            |
| `/Btn` | Checkbox/radio | A name from `/_States_`, e.g. `"/Yes"`; off state is `"/Off"`. |
| `/Ch`  | Choice/dropdown| One of the option strings (see below).                         |
| `/Sig` | Signature      | Cannot be filled with text — leave it to a signing tool.       |

## Checkboxes
The "on" value is defined per field, not always `/Yes`. Inspect it:

```python
f = reader.get_fields()["subscribe"]
print(f["/_States_"])   # e.g. ['/Yes', '/Off']  or  ['/On', '/Off']
```

Set the field to the on-state name (`"/Yes"`) to tick it, `"/Off"` to clear it.

## Radio groups
All buttons in a group share one parent field name. The value you assign is the
export value of the option you want selected — again taken from `/_States_` of the
group. Assigning a value not in the list silently leaves the group unset.

## Dropdowns / list boxes (`/Ch`)
Read the allowed options from the field's `/Opt` array:

```python
f = reader.get_fields()["plan"]
print(f.get("/Opt"))   # ['Basic', 'Pro', 'Enterprise']
```

Assign one of those exact strings. Some `/Opt` entries are `[export, display]`
pairs — assign the display string.

## `/NeedAppearances` — when fields look blank
Some viewers only render field values if the document asks them to regenerate
appearance streams. If your filled values are invisible in one viewer but fine in
another, force it on:

```python
writer.set_need_appearances_writer(True)
```

Trade-off: with `NeedAppearances` on, a few strict/print pipelines may ignore it.
Prefer `auto_regenerate=False` (the default in the skill) first; only flip
`NeedAppearances` on if a target viewer needs it.

## Flattening (lock the answers)
Flattening bakes values into static page content so recipients can't edit them.
pypdf does not flatten reliably on its own. Options:

- **pypdf 4.3+**: `writer.append(reader)` then per-page render is limited; for true
  flattening, post-process with a tool that supports it (`pdftk output.pdf output
  flat.pdf`, or `qpdf --flatten-annotations=all`).
- Keep an unflattened master and flatten only the copy you send out.

## Multi-page & inherited fields
A single logical field can have widgets on several pages, or inherit properties from
a parent. Iterating every page (as the skill does) and passing the full `data` map
handles both — pypdf updates each matching widget.

## Encrypted PDFs
If `PdfReader` raises on an encrypted file, decrypt first:

```python
reader = PdfReader("template.pdf")
if reader.is_encrypted:
    reader.decrypt("")   # try empty owner password, or the real one
```

## Common failures
- **Value ignored:** field name typo — re-list names in Step 1; they're case- and
  space-sensitive.
- **Checkbox won't tick:** you passed `True`/`"true"` instead of a `/_States_` name.
- **Garbled characters:** font can't render the glyph; stick to Latin-1 or embed a
  font upstream.
