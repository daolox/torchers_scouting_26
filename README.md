# Torchers Scouting App — Team 10415

FRC TUIS5 2026 pit scouting web app.

## Setup

### 1. Supabase (database)
1. Create a free project at https://supabase.com
2. Go to SQL Editor and run:

```sql
CREATE TABLE IF NOT EXISTS scouting (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  team_number int NOT NULL UNIQUE,
  team_name text, pit_number int,
  performance text, scoring text,
  shooter_type text, intake_type text,
  climb text, capacity text, notes text,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE scouting ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open" ON scouting
  FOR ALL USING (true) WITH CHECK (true);
```

3. Go to Project Settings → API → copy Project URL and anon public key
4. Paste them into `src/App.jsx` at the top (SUPABASE_URL and SUPABASE_ANON_KEY)

### 2. Deploy to Vercel
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your GitHub repo
3. Click Deploy — done!

## Password
Default: `torchers2026` (change in src/App.jsx)
