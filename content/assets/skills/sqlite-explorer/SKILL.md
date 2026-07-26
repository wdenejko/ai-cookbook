---
name: sqlite-explorer
description: "Safely explores a SQLite database read-only — lists tables and schema, previews sample rows, and runs SELECT queries with no risk of writes. Use when you need to understand or query an unfamiliar .db/.sqlite file before building against it, and must not mutate the data."
allowed-tools: Read, Bash
library:
  tags: [sqlite, database, data]
  category: "Data"
  visibility: public
  targets: [codex, openai-api]
  sourceProject: null
---

# SQLite Explorer

Explore an unknown SQLite database **without changing it**. Every step below opens
the file read-only, so there is no way to alter, drop, or corrupt the data.

## Golden rule: open read-only
Two safe ways to open the database — use one for every command.

**CLI** (SQLite 3.22+):
```bash
sqlite3 -readonly path/to/data.db
```

**Python** (OS-level read-only via URI):
```python
import sqlite3
con = sqlite3.connect("file:path/to/data.db?mode=ro", uri=True)
con.execute("PRAGMA query_only = ON;")   # extra guard for the session
```

If a task ever seems to need write access, stop and ask the user first —
exploration never does.

## 1. Map the schema
List tables/views, then dump their definitions:
```bash
sqlite3 -readonly data.db ".tables"
sqlite3 -readonly data.db ".schema --indent"
```

Per-table columns, types, and constraints:
```sql
SELECT name, type, "notnull", pk FROM pragma_table_info('users');
```

Relationships and indexes:
```sql
SELECT * FROM pragma_foreign_key_list('orders');
SELECT name, tbl_name FROM sqlite_master WHERE type = 'index';
```

## 2. Size things up
```sql
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
SELECT count(*) FROM users;
```

## 3. Preview sample rows
Keep previews small and legible:
```bash
sqlite3 -readonly -header -column data.db "SELECT * FROM users LIMIT 10;"
```
- `-header -column` gives aligned, labeled output.
- Always add `LIMIT` — never scan an unbounded table just to peek.

## 4. Run read-only queries
Only `SELECT`, `WITH … SELECT`, or `EXPLAIN`. Examples:
```sql
-- value distribution in a column
SELECT status, count(*) AS n FROM orders GROUP BY status ORDER BY n DESC;

-- see the plan without touching data
EXPLAIN QUERY PLAN SELECT * FROM orders WHERE user_id = 42;
```

## Guardrails
- Never author `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `REPLACE`,
  or `VACUUM`. The read-only open will reject them, but don't rely on that alone.
- Quote reserved or odd identifiers with double quotes: `SELECT * FROM "order";`.
- For huge tables, sample with `ORDER BY rowid LIMIT n` rather than full scans.
- Report findings in this order: table list → key columns → row counts → notable
  relationships → anything surprising.
