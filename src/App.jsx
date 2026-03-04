import { useState, useEffect, useCallback } from "react";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
// Paste your Supabase credentials here after setup
const SUPABASE_URL = "https://czplcdhhzehxqfbxkito.supabase.co";       // e.g. https://xxxx.supabase.co
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cGxjZGhoemVoeHFmYnhraXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjU2MDgsImV4cCI6MjA4ODIwMTYwOH0.hzXDcccXtj4UuI8JZRQQR03xhgyjOvSJlFBm348JYAM";      // from Project Settings → API

const TEAM_PASSWORD = "torchers2026filik";

const TEAMS = [
  { no:1,  pit:2,  team:4817,  name:"One Degree North",           from:"Singapore" },
  { no:2,  pit:31, team:4972,  name:"BORUSAN ROBOTICS",           from:"Istanbul" },
  { no:3,  pit:14, team:5665,  name:"FENERBAHÇE DOGUS SPARC",     from:"Istanbul" },
  { no:4,  pit:3,  team:6232,  name:"Florya Bisons",              from:"Istanbul" },
  { no:5,  pit:5,  team:6415,  name:"Gultepe Robotics 6415",      from:"Istanbul" },
  { no:6,  pit:15, team:6459,  name:"AG Robotik",                 from:"Istanbul" },
  { no:7,  pit:45, team:7035,  name:"MEF Thunders",               from:"Istanbul" },
  { no:8,  pit:43, team:7298,  name:"TOROS",                      from:"Istanbul" },
  { no:9,  pit:12, team:7439,  name:"Qubit Robotics",             from:"Istanbul" },
  { no:10, pit:18, team:7536,  name:"ANKA ROBOTICS",              from:"Istanbul" },
  { no:11, pit:20, team:7576,  name:"FMWill",                     from:"Istanbul" },
  { no:12, pit:24, team:7748,  name:"TECHTOLIA ROBOTICS",         from:"Istanbul" },
  { no:13, pit:26, team:7758,  name:"MEVOLUTION",                 from:"Istanbul" },
  { no:14, pit:33, team:8084,  name:"ALFA ROBOTICS",              from:"Istanbul" },
  { no:15, pit:29, team:8092,  name:"Greatest of All Times",      from:"Tekirdağ" },
  { no:16, pit:34, team:8158,  name:"Bosphorus Robotics",         from:"Istanbul" },
  { no:17, pit:40, team:8214,  name:"Cyber Unicorn",              from:"China" },
  { no:18, pit:37, team:8263,  name:"Robin",                      from:"Istanbul" },
  { no:19, pit:39, team:8264,  name:"ATA ROBOTICS",               from:"Kocaeli" },
  { no:20, pit:6,  team:8784,  name:"HEVSEL",                     from:"Diyarbakır" },
  { no:21, pit:11, team:9024,  name:"Callister",                  from:"Kocaeli" },
  { no:22, pit:21, team:9043,  name:"Valkyrie",                   from:"Manisa" },
  { no:23, pit:38, team:9264,  name:"HUNTERS ROBOTICS",           from:"Istanbul" },
  { no:24, pit:27, team:9483,  name:"Overcharge",                 from:"Istanbul" },
  { no:25, pit:9,  team:9545,  name:"Caracal Robotics",           from:"Istanbul" },
  { no:26, pit:36, team:9609,  name:"Paraducks",                  from:"India" },
  { no:27, pit:41, team:9635,  name:"Cyber Rabbit",               from:"China" },
  { no:28, pit:23, team:9692,  name:"Sigma Powered By Adipro",    from:"India" },
  { no:29, pit:7,  team:9694,  name:"TUBITECH",                   from:"Kocaeli" },
  { no:30, pit:42, team:10131, name:"Royal Turtles",              from:"Hong Kong" },
  { no:31, pit:35, team:10234, name:"TEDRA",                      from:"Istanbul" },
  { no:32, pit:30, team:10415, name:"Torchers",                   from:"Istanbul" },
  { no:33, pit:28, team:10425, name:"WhiteFox",                   from:"Istanbul" },
  { no:34, pit:10, team:10542, name:"EAGLE WARRIORS",             from:"Istanbul" },
  { no:35, pit:25, team:10604, name:"Demirören Robotics",         from:"Istanbul" },
  { no:36, pit:32, team:10623, name:"AY YILDIZ ROBOTİM",         from:"Istanbul" },
  { no:37, pit:22, team:10675, name:"Energize",                   from:"Istanbul" },
  { no:38, pit:19, team:10692, name:"GOLDEN APPLE",               from:"Istanbul" },
  { no:39, pit:13, team:10932, name:"Tulpar",                     from:"Istanbul" },
  { no:40, pit:44, team:10951, name:"Saigon South Dragons",       from:"Vietnam" },
  { no:41, pit:46, team:10998, name:"VOLTARIA ROBOTICS",          from:"Aksaray" },
  { no:42, pit:16, team:11303, name:"BEZOAR ROBOTICS",            from:"Hakkâri" },
  { no:43, pit:4,  team:11382, name:"INTERHERMES",                from:"Bursa" },
  { no:44, pit:8,  team:11389, name:"ŞAL RoboRage",              from:"Şırnak" },
  { no:45, pit:17, team:11404, name:"The Power of Skopje",        from:"Macedonia" },
];

const PERF_OPTS    = ["Perfect","Good","Average","Poor","NG"];
const SCORE_OPTS   = ["Moving","FixedPlace","FixedPlaceVP"];
const SHOOTER_OPTS = ["360 Turret","Fixed Turret","Kitbot","Fixed Shooter"];
const INTAKE_OPTS  = ["Over Bumper","Under Bumper","Both"];
const CLIMB_OPTS   = ["L1 Middle","L1 Side","L2 Middle","L2 Side","L3 Middle","L3 Side"];
const CAP_OPTS     = ["Insane (30+)","High (21-30)","Medium (11-20)","Low (5-10)","None"];
const BLANK = { performance:"", scoring:"", shooter_type:"", intake_type:"", climb:"", capacity:"", notes:"" };

const PERF_SCORE  = { Perfect:5, Good:4, Average:3, Poor:1, NG:0 };
const SCORE_SCORE = { Moving:5, FixedPlace:2, FixedPlaceVP:3};
const CLIMB_SCORE = { High:3, Mid:2, Low:1, None:0 };
function totalScore(r) {
  return (PERF_SCORE[r.performance]||0)*2 + (SCORE_SCORE[r.scoring]||0)*2 + (CLIMB_SCORE[r.climb]||0);
}

function makeApi(url, key) {
  const base = `${url}/rest/v1`;
  const h = {
    "apikey": key,
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  return async function api(path, opts = {}) {
    const res = await fetch(`${base}${path}`, {
      ...opts,
      headers: { ...h, "Prefer": opts.prefer || "return=representation", ...(opts.extraHeaders||{}) },
    });
    return res;
  };
}

function Pill({ label }) {
  if (!label) return null;
  const good = ["Perfect","Excellent","High","High Goal","High (5+)","Both"];
  const bad  = ["Poor","DNQ","None"];
  const styles = {
    display:"inline-block", padding:"2px 9px", fontSize:10, fontWeight:700,
    fontFamily:"'Share Tech Mono',monospace", borderRadius:2,
    background: good.includes(label) ? "rgba(220,38,38,.2)" : bad.includes(label) ? "rgba(100,116,139,.2)" : "rgba(239,68,68,.15)",
    color:       good.includes(label) ? "#fca5a5"           : bad.includes(label) ? "#94a3b8"               : "#f87171",
  };
  return <span style={styles}>{label}</span>;
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(value===o ? "" : o)} style={{
          padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer",
          fontFamily:"'Barlow',sans-serif", transition:"all .15s",
          background: value===o ? "rgba(220,38,38,.2)" : "#0a0a0a",
          border: value===o ? "1px solid #dc2626" : "1px solid #2a2a2a",
          color: value===o ? "#fca5a5" : "#64748b",
        }}>{o}</button>
      ))}
    </div>
  );
}

function TorchersLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 8 C40 8 55 22 55 38 C55 50 47 60 40 65 C33 60 25 50 25 38 C25 22 40 8 40 8Z" fill="#dc2626"/>
      <path d="M40 20 C40 20 50 30 50 40 C50 48 45 55 40 58 C35 55 30 48 30 40 C30 30 40 20 40 20Z" fill="#ef4444"/>
      <path d="M40 30 C40 30 46 36 46 42 C46 46 43 50 40 52 C37 50 34 46 34 42 C34 36 40 30 40 30Z" fill="#fca5a5"/>
      <ellipse cx="40" cy="44" rx="5" ry="7" fill="#fff" opacity="0.6"/>
      <text x="40" y="76" textAnchor="middle" fontFamily="'Rajdhani',sans-serif" fontSize="11" fontWeight="700" fill="#dc2626" letterSpacing="1">10415</text>
    </svg>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #060606; --surf: #0d0d0d; --surf2: #111111;
  --brd: #1f1f1f; --brd2: #2a2a2a;
  --acc: #dc2626; --acc2: #ef4444; --accl: #fca5a5;
  --txt: #e2e8f0; --muted: #64748b;
  --good: #4ade80; --warn: #facc15; --bad: #94a3b8;
}
body { background: var(--bg); color: var(--txt); font-family: 'Barlow', sans-serif; font-size: 14px; }
button { cursor: pointer; font-family: inherit; }
input, textarea { font-family: 'Barlow', sans-serif; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--acc); }
.lw { min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: radial-gradient(ellipse 80% 60% at 50% -5%, #2a0a0a 0%, var(--bg) 65%); position: relative; overflow: hidden; }
.lgrid { position: fixed; inset: 0;
  background-image: linear-gradient(#1a0a0a 1px, transparent 1px), linear-gradient(90deg, #1a0a0a 1px, transparent 1px);
  background-size: 44px 44px; opacity: .4; pointer-events: none; }
.lcard { position: relative; z-index: 1; width: 440px; background: var(--surf);
  border: 1px solid #2a1a1a; border-top: 3px solid var(--acc); padding: 48px 40px;
  box-shadow: 0 0 100px rgba(220,38,38,.15); }
.llogo { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.ltag { font-family: 'Rajdhani', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 4px; color: var(--acc); }
.ltitle { font-family: 'Rajdhani', sans-serif; font-size: 40px; font-weight: 700; line-height: 1; color: #fff; margin-bottom: 4px; }
.lsub { font-size: 13px; color: var(--muted); margin-bottom: 36px; }
.lbl { display: block; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.inp { width: 100%; background: var(--bg); border: 1px solid var(--brd2); color: var(--txt);
  font-size: 15px; padding: 12px 16px; outline: none; transition: border-color .2s; }
.inp:focus { border-color: var(--acc); }
.btn-main { width: 100%; margin-top: 22px; padding: 14px; background: var(--acc); color: #fff; border: none;
  font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; transition: all .2s; }
.btn-main:hover { background: var(--acc2); }
.btn-main:disabled { opacity: .35; cursor: not-allowed; }
.err { margin-top: 10px; font-size: 12px; color: #f87171; text-align: center; }
.nav { background: var(--surf); border-bottom: 1px solid var(--brd); padding: 0 28px;
  display: flex; align-items: center; position: sticky; top: 0; z-index: 99; }
.nbrand { display: flex; align-items: center; gap: 10px; padding: 12px 24px 12px 0;
  border-right: 1px solid var(--brd); margin-right: 4px; }
.nbrand-text { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: var(--acc); letter-spacing: 2px; }
.ntab { padding: 18px 18px; font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase; color: var(--muted); border: none; background: none;
  border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all .18s; }
.ntab:hover { color: var(--txt); }
.ntab.on { color: var(--acc); border-bottom-color: var(--acc); }
.nsp { flex: 1; }
.nlock { font-size: 11px; color: var(--muted); background: none; border: 1px solid var(--brd2);
  padding: 6px 14px; letter-spacing: 1px; text-transform: uppercase; transition: all .2s; }
.nlock:hover { border-color: var(--acc); color: var(--acc); }
.main { max-width: 1240px; margin: 0 auto; padding: 32px 28px; }
.ph { margin-bottom: 26px; }
.ph h2 { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: #fff; }
.ph p { color: var(--muted); font-size: 13px; margin-top: 3px; }
.tsearch { position: relative; margin-bottom: 20px; }
.tsearch input { width: 100%; background: var(--surf); border: 1px solid var(--brd2); color: var(--txt);
  font-size: 14px; padding: 11px 16px; outline: none; transition: border-color .2s; }
.tsearch input:focus { border-color: var(--acc); }
.tdrop { position: absolute; top: 100%; left: 0; right: 0; z-index: 60; background: var(--surf2);
  border: 1px solid var(--brd2); border-top: none; max-height: 270px; overflow-y: auto; }
.topt { padding: 9px 16px; display: flex; align-items: center; gap: 10px; transition: background .12s; cursor: pointer; }
.topt:hover { background: #1a1a1a; }
.tbadge { font-family: 'Share Tech Mono', monospace; font-size: 11px; background: rgba(220,38,38,.15);
  color: var(--acc); padding: 2px 8px; white-space: nowrap; flex-shrink: 0; }
.tname { font-size: 13px; font-weight: 600; }
.tfrom { font-size: 11px; color: var(--muted); margin-left: auto; }
.scard { background: var(--surf); border: 1px solid var(--acc); padding: 14px 20px;
  margin-bottom: 22px; display: flex; align-items: center; gap: 16px; border-left: 4px solid var(--acc); }
.snum { font-family: 'Share Tech Mono', monospace; font-size: 28px; color: var(--acc); line-height: 1; }
.sname { font-family: 'Rajdhani', sans-serif; font-size: 21px; font-weight: 700; }
.smeta { font-size: 11px; color: var(--muted); }
.chg { margin-left: auto; font-size: 11px; color: var(--muted); background: none;
  border: 1px solid var(--brd2); padding: 4px 10px; transition: all .2s; }
.chg:hover { border-color: var(--acc); color: var(--acc); }
.fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
.fg { display: flex; flex-direction: column; gap: 7px; }
.fg label { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
textarea.inp { min-height: 84px; resize: vertical; margin-bottom: 18px; font-size: 14px; }
.srow { display: flex; align-items: center; gap: 14px; }
.btn-save { padding: 12px 32px; background: var(--acc); color: #fff; border: none;
  font-family: 'Rajdhani', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; transition: all .2s; }
.btn-save:hover { background: var(--acc2); }
.btn-save:disabled { opacity: .35; cursor: not-allowed; }
.sok { font-size: 13px; color: var(--good); }
.serr { font-size: 13px; color: #f87171; }
.sbar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.sc { background: var(--surf); border: 1px solid var(--brd); border-top: 2px solid var(--acc); padding: 18px 22px; }
.scn { font-family: 'Share Tech Mono', monospace; font-size: 34px; color: var(--acc); line-height: 1; }
.scl { font-size: 11px; color: var(--muted); margin-top: 5px; text-transform: uppercase; letter-spacing: 1px; }
.fbar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
.fbar input { background: var(--surf); border: 1px solid var(--brd2); color: var(--txt);
  padding: 7px 12px; font-size: 13px; outline: none; width: 210px; transition: border-color .2s; }
.fbar input:focus { border-color: var(--acc); }
.sbtn { padding: 7px 14px; background: var(--surf); border: 1px solid var(--brd2); color: var(--muted);
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: all .15s; }
.sbtn:hover, .sbtn.on { border-color: var(--acc); color: var(--acc); }
.tbl { width: 100%; border-collapse: collapse; }
.tbl th { text-align: left; padding: 9px 12px; font-size: 10px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--brd);
  background: var(--surf); white-space: nowrap; }
.tbl td { padding: 10px 12px; border-bottom: 1px solid #151515; vertical-align: middle; }
.tbl tr:hover td { background: #0f0f0f; }
.tnc { font-family: 'Share Tech Mono', monospace; color: var(--acc); font-size: 13px; }
.rlist { display: flex; flex-direction: column; gap: 8px; }
.rcard { background: var(--surf); border: 1px solid var(--brd); padding: 14px 20px;
  display: flex; align-items: center; gap: 14px; }
.rcard.g1 { border-left: 3px solid #ffd700; }
.rcard.g2 { border-left: 3px solid #c0c0c0; }
.rcard.g3 { border-left: 3px solid #cd7f32; }
.rpos { font-family: 'Share Tech Mono', monospace; font-size: 20px; color: var(--muted); width: 32px; text-align: center; flex-shrink: 0; }
.rpos.g1 { color: #ffd700; } .rpos.g2 { color: #c0c0c0; } .rpos.g3 { color: #cd7f32; }
.rinfo { flex: 1; }
.rn { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; }
.rm { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--muted); }
.rpills { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 4px; }
.rbar { display: flex; align-items: center; gap: 10px; }
.btrack { width: 160px; height: 5px; background: #1f1f1f; }
.bfill { height: 100%; background: var(--acc); transition: width .4s; }
.rval { font-family: 'Share Tech Mono', monospace; font-size: 13px; color: var(--acc); }
.nodata { text-align: center; padding: 60px; color: var(--muted); }
.setup-sql { margin-top: 20px; padding: 14px 16px; background: rgba(220,38,38,.06);
  border: 1px solid rgba(220,38,38,.2); font-family: 'Share Tech Mono', monospace;
  font-size: 11px; color: var(--muted); white-space: pre; overflow-x: auto; line-height: 1.7; }
`;

function Setup({ onConnect }) {
  const [url, setUrl] = useState(SUPABASE_URL !== "YOUR_SUPABASE_URL" ? SUPABASE_URL : "");
  const [key, setKey] = useState(SUPABASE_ANON_KEY !== "YOUR_ANON_KEY" ? SUPABASE_ANON_KEY : "");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_ANON_KEY") {
      onConnect(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  }, []);

  async function attempt() {
    setErr(""); setLoading(true);
    try {
      const r = await fetch(`${url.trim()}/rest/v1/scouting?select=count&limit=1`, {
        headers: { apikey: key.trim(), Authorization: `Bearer ${key.trim()}` }
      });
      if (r.status === 401) { setErr("Invalid API key — check your anon key."); }
      else if (r.status === 404) { setErr("Table not found — run the SQL below first."); }
      else { onConnect(url.trim(), key.trim()); }
    } catch { setErr("Connection failed — check your Supabase URL."); }
    setLoading(false);
  }

  return (
    <div className="lw">
      <style>{CSS}</style>
      <div className="lgrid" />
      <div className="lcard" style={{width:520}}>
        <div className="llogo"><TorchersLogo size={40}/><div>
          <div className="ltag">SETUP · ONE TIME ONLY</div>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:"#fff"}}>Connect Supabase</div>
        </div></div>
        <p style={{fontSize:13,color:"var(--muted)",marginBottom:22,lineHeight:1.7}}>
          Supabase → <strong style={{color:"var(--txt)"}}>Project Settings → API</strong> kısmından kopyala
        </p>
        <label className="lbl">Project URL</label>
        <input className="inp" style={{marginBottom:14}} value={url} onChange={e=>setUrl(e.target.value)}
          placeholder="https://xxxxxxxxxxxx.supabase.co" />
        <label className="lbl">Anon Public Key</label>
        <input className="inp" value={key} onChange={e=>setKey(e.target.value)} placeholder="eyJhbGci..." />
        <button className="btn-main" onClick={attempt} disabled={!url||!key||loading}>
          {loading ? "BAĞLANIYOR…" : "BAĞLAN VE DEVAM ET"}
        </button>
        {err && <div className="err">{err}</div>}
        <div style={{marginTop:20}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--acc)",marginBottom:8}}>ÖNCE BU SQL'İ ÇALIŞTIR</div>
          <div className="setup-sql">{`CREATE TABLE IF NOT EXISTS scouting (
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
  FOR ALL USING (true) WITH CHECK (true);`}</div>
        </div>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const go = () => { if (pw === TEAM_PASSWORD) onLogin(); else { setErr("Yanlış şifre."); setPw(""); } };
  return (
    <div className="lw">
      <style>{CSS}</style>
      <div className="lgrid" />
      <div className="lcard">
        <div className="llogo">
          <TorchersLogo size={52}/>
          <div>
            <div className="ltag">FRC · TUIS5 · 2026</div>
            <div className="ltitle">TORCHERS<br/>SCOUTING</div>
          </div>
        </div>
        <div className="lsub">Team 10415 — Internal Scouting Platform</div>
        <label className="lbl">Team Password</label>
        <input className="inp" type="password" value={pw}
          onChange={e=>{setPw(e.target.value);setErr("")}}
          onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Şifreyi gir…" />
        <button className="btn-main" onClick={go} disabled={!pw}>GİRİŞ YAP</button>
        {err && <div className="err">{err}</div>}
      </div>
    </div>
  );
}

function ScoutForm({ api, onSaved }) {
  const [q, setQ] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [existingId, setExistingId] = useState(null);
  const [status, setStatus] = useState(null);

  const filtered = TEAMS.filter(t =>
    t.name.toLowerCase().includes(q.toLowerCase()) || String(t.team).includes(q)
  ).slice(0, 12);

  async function pick(t) {
    setSel(t); setQ(""); setShowDrop(false); setStatus(null);
    try {
      const r = await api(`/scouting?team_number=eq.${t.team}&select=*`);
      const d = await r.json();
      if (d?.[0]) {
        const s = d[0];
        setForm({ performance:s.performance||"", scoring:s.scoring||"",
          shooter_type:s.shooter_type||"", intake_type:s.intake_type||"",
          climb:s.climb||"", capacity:s.capacity||"", notes:s.notes||"" });
        setExistingId(s.id);
      } else { setForm(BLANK); setExistingId(null); }
    } catch { setForm(BLANK); setExistingId(null); }
  }

  async function save() {
    setStatus("saving");
    const payload = { team_number:sel.team, team_name:sel.name, pit_number:sel.pit,
      ...form, updated_at: new Date().toISOString() };
    try {
      const r = await api(`/scouting?on_conflict=team_number`, {
        method:"POST", body:JSON.stringify(payload),
        prefer:"resolution=merge-duplicates,return=representation",
      });
      if (!r.ok) throw new Error();
      setStatus("saved"); onSaved();
    } catch { setStatus("error"); }
  }

  const f = k => v => setForm(p=>({...p,[k]:v}));

  return (
    <div>
      <div className="ph"><h2>Scout a Team</h2><p>Search and fill in pit scouting data for any team</p></div>
      {!sel ? (
        <div className="tsearch">
          <input value={q} onChange={e=>{setQ(e.target.value);setShowDrop(true)}}
            onFocus={()=>setShowDrop(true)} placeholder="Takım numarası veya ismiyle ara…" />
          {showDrop && q && (
            <div className="tdrop">
              {filtered.length ? filtered.map(t=>(
                <div key={t.team} className="topt" onClick={()=>pick(t)}>
                  <span className="tbadge">#{t.team}</span>
                  <span className="tname">{t.name}</span>
                  <span className="tfrom">{t.from}</span>
                </div>
              )) : <div style={{padding:"10px 16px",color:"var(--muted)",fontSize:13}}>Takım bulunamadı</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="scard">
          <div className="snum">#{sel.team}</div>
          <div>
            <div className="sname">{sel.name}</div>
            <div className="smeta">Pit {sel.pit} · {sel.from}{existingId?" · Daha önce scouted ✓":""}</div>
          </div>
          <button className="chg" onClick={()=>{setSel(null);setForm(BLANK);setStatus(null)}}>Değiştir</button>
        </div>
      )}
      {sel && (<>
        <div className="fgrid">
          {[["Performance","performance",PERF_OPTS],["Scoring","scoring",SCORE_OPTS],
            ["Shooter Type","shooter_type",SHOOTER_OPTS],["Intake Type","intake_type",INTAKE_OPTS],
            ["Climb","climb",CLIMB_OPTS],["Capacity","capacity",CAP_OPTS]].map(([lbl,key,opts])=>(
            <div className="fg" key={key}>
              <label>{lbl}</label>
              <RadioGroup options={opts} value={form[key]} onChange={f(key)} />
            </div>
          ))}
        </div>
        <label className="lbl">Notes</label>
        <textarea className="inp" value={form.notes}
          onChange={e=>setForm(p=>({...p,notes:e.target.value}))}
          placeholder="Gözlemler, güçlü/zayıf yönler, strateji notları…" />
        <div className="srow">
          <button className="btn-save" onClick={save} disabled={status==="saving"}>
            {status==="saving" ? "KAYDEDİLİYOR…" : existingId ? "GÜNCELLE" : "KAYDET"}
          </button>
          {status==="saved" && <span className="sok">✓ Kaydedildi!</span>}
          {status==="error" && <span className="serr">✗ Hata — bağlantıyı kontrol et</span>}
        </div>
      </>)}
    </div>
  );
}

function Dashboard({ api, refreshKey }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("team");

  useEffect(() => {
    api("/scouting?select=*").then(r=>r.json()).then(d=>setData(d||[])).catch(()=>{});
  }, [refreshKey, api]);

  const scoutedNums = new Set(data.map(d=>d.team_number));
  const rows = TEAMS.map(t=>({...t,...(data.find(d=>d.team_number===t.team)||{}),scouted:scoutedNums.has(t.team)}));
  const filtered = rows.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())||String(r.team).includes(search));
  const sorted = [...filtered].sort((a,b)=>{
    if(sort==="team") return a.team-b.team;
    if(sort==="pit")  return a.pit-b.pit;
    if(sort==="perf") return totalScore(b)-totalScore(a);
    return 0;
  });

  return (
    <div>
      <div className="sbar">
        {[["Total Teams",TEAMS.length],["Scouted",scoutedNums.size],
          ["Remaining",TEAMS.length-scoutedNums.size],
          ["Coverage",Math.round(scoutedNums.size/TEAMS.length*100)+"%"]].map(([l,v])=>(
          <div className="sc" key={l}><div className="scn">{v}</div><div className="scl">{l}</div></div>
        ))}
      </div>
      <div className="fbar">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Takım ara…" />
        {[["team","Team #"],["pit","Pit #"],["perf","Score"]].map(([k,l])=>(
          <button key={k} className={`sbtn ${sort===k?"on":""}`} onClick={()=>setSort(k)}>Sırala: {l}</button>
        ))}
      </div>
      <table className="tbl">
        <thead><tr>
          {["Team","Pit","Name","Performance","Scoring","Shooter","Intake","Climb","Capacity","Notes"].map(h=>(
            <th key={h}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {sorted.map(r=>(
            <tr key={r.team}>
              <td className="tnc">{r.team}</td>
              <td style={{color:"var(--muted)"}}>{r.pit}</td>
              <td style={{fontWeight:600}}>{r.name}</td>
              {r.scouted ? <>
                <td><Pill label={r.performance}/></td>
                <td><Pill label={r.scoring}/></td>
                <td><Pill label={r.shooter_type}/></td>
                <td><Pill label={r.intake_type}/></td>
                <td><Pill label={r.climb}/></td>
                <td><Pill label={r.capacity}/></td>
                <td style={{color:"var(--muted)",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}
                  title={r.notes}>{r.notes||"—"}</td>
              </> : <td colSpan={7} style={{color:"var(--muted)",fontSize:12,fontStyle:"italic"}}>Henüz scouted değil</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Rankings({ api, refreshKey }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api("/scouting?select=*").then(r=>r.json()).then(d=>setData(d||[])).catch(()=>{});
  }, [refreshKey, api]);

  const ranked = data.map(r=>{
    const t = TEAMS.find(x=>x.team===r.team_number)||{};
    return {...r,...t,score:totalScore(r)};
  }).sort((a,b)=>b.score-a.score);

  if (!ranked.length) return (
    <div className="nodata">
      <p style={{fontSize:16,marginBottom:6}}>Henüz veri yok</p>
      <span style={{fontSize:13}}>Önce Scout tabından takımları gir</span>
    </div>
  );

  const max = ranked[0].score || 1;

  return (
    <div>
      <div className="ph">
        <h2>Rankings</h2>
        <p>Performance (×2) + Scoring (×2) + Climb — {ranked.length} / {TEAMS.length} takım scouted</p>
      </div>
      <div className="rlist">
        {ranked.map((r,i)=>{
          const g = i===0?"g1":i===1?"g2":i===2?"g3":"";
          return (
            <div key={r.team_number} className={`rcard ${g}`}>
              <div className={`rpos ${g}`}>{i+1}</div>
              <div className="rinfo">
                <div className="rn">{r.team_name}</div>
                <div className="rm">#{r.team_number} · Pit {r.pit}</div>
                <div className="rpills">
                  <Pill label={r.performance}/>
                  <Pill label={r.scoring}/>
                  {r.climb && r.climb!=="None" && <Pill label={`Climb: ${r.climb}`}/>}
                  {r.shooter_type && r.shooter_type!=="None" && <Pill label={r.shooter_type}/>}
                </div>
              </div>
              <div className="rbar">
                <div className="btrack"><div className="bfill" style={{width:`${(r.score/max)*100}%`}}/></div>
                <div className="rval">{r.score}/16</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [creds, setCreds]   = useState(null);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab]       = useState("scout");
  const [rk, setRk]         = useState(0);

  const api = useCallback(creds ? makeApi(creds.url, creds.key) : null, [creds]);

  if (!creds)  return <Setup onConnect={(url,key)=>setCreds({url,key})} />;
  if (!authed) return <><style>{CSS}</style><Login onLogin={()=>setAuthed(true)} /></>;

  return (
    <div>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nbrand">
          <TorchersLogo size={30}/>
          <span className="nbrand-text">TORCHERS</span>
        </div>
        {[["scout","Scout"],["dashboard","Dashboard"],["rankings","Rankings"]].map(([k,l])=>(
          <button key={k} className={`ntab ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
        <div className="nsp"/>
        <button className="nlock" onClick={()=>setAuthed(false)}>Kilitle</button>
      </nav>
      <div className="main">
        {tab==="scout"     && <ScoutForm  api={api} onSaved={()=>setRk(k=>k+1)} />}
        {tab==="dashboard" && <Dashboard  api={api} refreshKey={rk} />}
        {tab==="rankings"  && <Rankings   api={api} refreshKey={rk} />}
      </div>
    </div>
  );
}
