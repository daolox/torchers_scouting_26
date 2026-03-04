import { useState, useEffect } from "react";

const SUPABASE_URL = "https://czplcdhhzehxqfbxkito.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cGxjZGhoemVoeHFmYnhraXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjU2MDgsImV4cCI6MjA4ODIwMTYwOH0.hzXDcccXtj4UuI8JZRQQR03xhgyjOvSJlFBm348JYAM";
const TEAM_PASSWORD = "torchers2026filik";

const TEAMS = [
  { no:1,  pit:2,  team:4817,  name:"One Degree North",           from:"Singapore" },
  { no:2,  pit:31, team:4972,  name:"BORUSAN ROBOTICS",           from:"Türkiye" },
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

const TOTAL_QUALS = 80;
const PERF_OPTS    = ["Perfect","Good","Average","Poor","NG"];
const SCORE_OPTS   = ["While Moving","Fixed Place","Fixed Place with image processing","None"];
const SHOOTER_OPTS = ["360 Turret","Bevel Turret","Kitbot","Fixed Shooter","None"];
const INTAKE_OPTS  = ["Over Bumper","Under Bumper","Both","None"];
const CLIMB_OPTS   = ["L1 Middle","L1 Side","L2 Middle","L2 Side","L3 Middle","L3 Side","None"];
const CAP_OPTS     = ["Insane (30+)","High (21-30)","Medium (11-20)","Low (5-10)","None"];
const BLANK_PIT = { performance:"", scoring:"", shooter_type:"", intake_type:"", climb:"", capacity:"", notes:"" };

const PERF_SCORE  = { Perfect:5, Good:4, Average:3, Poor:1, DNQ:0 };
const SCORE_SCORE = { Excellent:5, Good:4, Average:3, Poor:1, None:0 };
const CLIMB_SCORE = { High:3, Mid:2, Low:1, None:0 };

function totalPitScore(r) {
  return (PERF_SCORE[r.performance]||0)*2 + (SCORE_SCORE[r.scoring]||0)*2 + (CLIMB_SCORE[r.climb]||0);
}

function makeApi(url, key) {
  const base = `${url}/rest/v1`;
  const h = { "apikey": key, "Authorization": `Bearer ${key}`, "Content-Type": "application/json" };
  return async function api(path, opts = {}) {
    return fetch(`${base}${path}`, {
      ...opts,
      headers: { ...h, "Prefer": opts.prefer || "return=representation", ...(opts.extraHeaders||{}) },
    });
  };
}

// ── Components ────────────────────────────────────────────────────────────

function TorchersLogo({ size = 36, color = "#dc2626" }) {
  const h = size;
  const w = size * (499 / 732);
  return (
    <svg width={w} height={h} viewBox="0 0 499 732" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,732) scale(0.1,-0.1)" fill={color} stroke="none">
        <path d="M2088 6603 c-139 -173 -223 -300 -297 -450 -210 -422 -223 -765 -46 -1202 83 -203 82 -223 -8 -223 -77 0 -161 58 -249 171 -28 36 -55 70 -60 75 -10 13 -80 -137 -122 -265 -133 -399 -88 -752 135 -1069 62 -88 206 -235 301 -306 l67 -51 -44 -37 c-25 -20 -75 -74 -113 -119 -163 -194 -239 -348 -249 -502 -5 -72 -3 -83 17 -107 17 -23 29 -28 65 -28 50 0 141 31 180 61 31 25 108 137 156 229 49 92 117 156 224 209 89 44 334 135 342 127 2 -2 -7 -77 -21 -167 -38 -247 -73 -541 -101 -854 -14 -154 -37 -395 -51 -535 -55 -555 -56 -559 -51 -775 8 -348 51 -465 168 -465 52 0 118 39 202 119 163 156 250 303 321 541 70 239 79 387 26 440 -14 14 -34 20 -63 20 l-42 0 2 173 c8 444 35 1060 62 1404 7 87 14 121 32 155 l24 43 95 5 c52 3 151 1 220 -3 240 -16 436 8 530 66 140 86 269 289 270 424 0 108 -15 113 -346 113 l-213 0 24 64 c79 210 85 476 14 689 -35 108 -118 261 -199 368 -43 57 -145 172 -227 255 -293 297 -442 474 -602 714 -102 154 -158 255 -216 391 -41 96 -85 254 -85 308 0 68 -13 67 -72 -6z m191 -1497 c47 -60 177 -205 289 -324 113 -120 238 -257 277 -307 159 -198 268 -383 325 -555 44 -131 48 -124 -72 -139 -407 -50 -872 -205 -1127 -376 -45 -30 -86 -55 -91 -55 -13 0 -79 96 -116 170 -55 111 -67 194 -39 287 l15 51 68 6 c213 18 322 59 392 147 55 70 65 106 64 234 -1 94 -6 125 -33 210 -68 212 -80 257 -97 356 -19 113 -15 329 7 408 l12 44 21 -25 c12 -14 59 -73 105 -132z"/>
      </g>
    </svg>
  );
}

function TorchersText({ height = 24, color = "#dc2626" }) {
  const w = height * (242 / 97);
  return (
    <svg width={w} height={height} viewBox="0 0 242 97" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,97) scale(0.1,-0.1)" fill={color} stroke="none">
        <path d="M172 898 c-47 -59 -64 -150 -41 -217 14 -39 6 -50 -19 -28 -25 23 -28 22 -41 -14 -22 -63 -6 -134 39 -179 l22 -22 -20 -21 c-28 -30 -45 -78 -33 -90 7 -7 23 3 48 31 21 22 51 44 67 48 19 4 27 3 23 -3 -4 -6 -14 -84 -23 -174 -18 -184 -12 -229 26 -209 44 24 88 133 60 150 -10 6 -11 35 -6 126 4 65 9 121 12 126 3 4 30 8 60 8 45 0 59 4 79 25 35 34 32 55 -5 55 -29 0 -30 1 -30 50 0 64 -15 93 -92 178 -34 37 -72 91 -85 120 -14 28 -26 52 -28 52 -1 0 -7 -6 -13 -12z m149 -332 c11 -17 19 -36 19 -41 0 -6 -26 -16 -58 -23 -31 -6 -75 -21 -97 -32 -30 -15 -41 -17 -47 -7 -16 25 -4 52 25 55 39 5 54 40 39 91 -7 21 -12 54 -12 72 l1 34 56 -59 c30 -33 64 -73 74 -90z"/>
        <path d="M686 878 c-9 -12 -16 -30 -16 -39 0 -9 -9 -28 -20 -42 -27 -34 -26 -56 0 -32 l21 19 -3 -80 -3 -79 -37 -3 c-26 -2 -41 -10 -49 -24 -17 -32 6 -40 96 -34 66 5 83 9 98 27 26 33 21 41 -25 37 l-42 -3 3 138 c1 75 0 137 -3 137 -2 0 -12 -10 -20 -22z"/>
        <path d="M1386 878 c-9 -12 -16 -29 -16 -37 0 -7 -10 -29 -21 -48 -23 -36 -17 -61 7 -29 12 18 14 11 14 -62 l0 -82 -40 0 c-29 0 -42 -5 -50 -19 -5 -11 -10 -22 -10 -25 0 -11 68 -18 126 -11 64 7 94 23 94 52 0 13 -8 14 -40 9 l-41 -6 2 135 c0 75 -1 138 -4 141 -3 3 -12 -5 -21 -18z"/>
        <path d="M875 867 c-16 -6 -32 -13 -34 -14 -3 -2 -6 -61 -8 -132 -4 -129 -4 -130 21 -146 23 -15 27 -15 58 1 18 10 37 17 42 16 15 -5 36 20 36 43 0 12 7 39 15 58 37 90 1 188 -68 186 -18 -1 -45 -6 -62 -12z m72 -59 c23 -22 33 -91 14 -102 -12 -8 -64 92 -57 109 7 20 16 19 43 -7z m-43 -137 c13 -24 13 -31 2 -40 -18 -15 -26 -4 -26 36 0 41 5 41 24 4z"/>
        <path d="M1206 861 c-9 -9 -16 -21 -16 -25 0 -4 -27 -38 -60 -74 -33 -36 -59 -70 -57 -76 2 -6 29 -12 60 -14 l57 -3 0 -49 c0 -51 13 -63 38 -38 14 14 17 284 3 292 -4 3 -16 -3 -25 -13z m-16 -108 c0 -23 -4 -28 -25 -28 -31 0 -31 3 -3 32 27 29 28 29 28 -4z"/>
        <path d="M1558 874 c-3 -3 -4 -23 -1 -44 3 -21 0 -61 -7 -90 -14 -59 -9 -71 17 -41 23 28 64 27 92 -3 26 -27 25 -63 -2 -80 -22 -14 -66 9 -83 42 -11 22 -11 22 -28 3 -11 -12 -15 -27 -11 -40 8 -27 53 -61 79 -61 73 2 129 98 94 163 -17 34 -39 46 -80 47 -24 0 -38 5 -38 13 0 9 11 12 35 9 25 -3 42 1 55 13 29 27 24 34 -18 28 -33 -4 -42 -1 -59 21 -20 25 -34 32 -45 20z"/>
        <path d="M1144 472 c-6 -4 -18 -21 -27 -38 -11 -21 -26 -33 -46 -37 -40 -8 -87 -74 -108 -149 -13 -45 -21 -58 -35 -58 -28 0 -58 -18 -58 -35 0 -21 -14 -19 -35 5 -10 11 -26 22 -35 25 -15 5 -6 18 47 69 50 49 64 69 61 87 -2 17 -10 25 -28 27 -14 2 -56 12 -94 23 -78 23 -111 19 -119 -13 -5 -22 -10 -184 -8 -295 1 -48 3 -53 24 -53 34 0 47 19 47 67 0 32 4 43 15 43 24 0 64 -49 71 -87 14 -76 75 -43 107 57 l20 65 9 -35 c19 -71 75 -107 138 -90 49 13 86 43 109 89 22 41 47 158 37 168 -3 4 -18 3 -33 -3 -22 -7 -29 -19 -39 -66 -16 -71 -47 -133 -70 -142 -25 -10 -63 32 -70 75 -3 19 -1 53 5 75 10 38 13 40 44 36 20 -2 37 2 44 10 17 21 81 172 76 181 -5 9 -35 9 -49 -1z m-345 -143 c38 -13 38 -19 4 -50 -64 -57 -63 -57 -63 5 0 61 4 64 59 45z"/>
        <path d="M1513 435 c-21 -14 -21 -17 -7 -50 26 -63 11 -232 -31 -338 -10 -24 30 -23 91 4 42 19 53 20 97 10 44 -10 52 -9 69 6 18 16 18 18 3 29 -24 18 -96 26 -133 15 -32 -10 -33 -9 -30 16 2 21 10 29 38 36 68 17 81 47 20 47 l-40 0 0 40 0 40 59 0 c39 0 63 5 71 15 17 21 3 35 -36 35 -49 0 -69 13 -100 65 -28 49 -38 53 -71 30z"/>
        <path d="M1792 398 c-7 -7 -12 -44 -13 -92 0 -45 -3 -101 -7 -126 -4 -25 -6 -69 -4 -97 3 -47 6 -53 25 -53 38 0 51 17 57 71 l5 52 32 -27 c19 -16 37 -44 43 -66 13 -48 23 -55 57 -38 19 10 32 28 46 72 l20 59 24 -32 c13 -17 45 -43 70 -58 103 -60 232 -9 209 82 -6 25 -29 48 -130 137 -28 25 -37 40 -33 52 6 16 12 15 57 -10 41 -22 56 -26 77 -18 40 14 38 30 -8 61 -61 40 -135 40 -178 -1 -52 -50 -40 -83 54 -156 51 -40 85 -83 85 -110 0 -34 -114 22 -139 69 -9 15 -22 19 -71 19 -50 0 -63 -4 -78 -22 l-17 -22 -38 27 -37 27 48 44 c83 73 104 128 50 128 -13 0 -56 9 -96 20 -84 23 -94 24 -110 8z m121 -69 c20 -5 37 -14 37 -18 0 -4 -22 -27 -50 -50 l-50 -42 0 60 c0 67 1 68 63 50z"/>
        <path d="M1408 388 c-14 -10 -18 -32 -20 -103 -3 -85 -4 -90 -25 -93 -22 -3 -23 -1 -23 85 0 112 -21 137 -79 96 -23 -15 -23 -17 -6 -29 17 -12 18 -27 12 -174 l-6 -160 23 0 c33 0 46 21 53 84 5 45 9 56 24 56 15 0 19 -10 21 -58 3 -54 5 -57 30 -60 43 -5 49 19 46 200 -3 136 -5 163 -18 166 -9 1 -23 -3 -32 -10z"/>
        <path d="M446 361 c-57 -38 -109 -141 -71 -141 11 0 15 -12 15 -49 0 -69 17 -111 52 -125 44 -19 76 -8 124 40 81 80 93 197 28 262 -26 26 -40 32 -75 32 -27 0 -56 -8 -73 -19z m97 -62 c26 -36 24 -100 -5 -158 -30 -57 -52 -63 -67 -20 -16 46 -14 107 6 162 19 53 35 57 66 16z"/>
      </g>
    </svg>
  );
}

function Pill({ label, color }) {
  if (!label) return null;
  const good = ["Perfect","Excellent","High","High Goal","High (5+)","Both"];
  const bad  = ["Poor","DNQ","None"];
  const styles = {
    display:"inline-block", padding:"2px 9px", fontSize:10, fontWeight:700,
    fontFamily:"'Share Tech Mono',monospace", borderRadius:2,
    background: good.includes(label) ? "rgba(220,38,38,.2)" : bad.includes(label) ? "rgba(100,116,139,.2)" : "rgba(239,68,68,.15)",
    color:       good.includes(label) ? "#fca5a5"           : bad.includes(label) ? "#94a3b8"               : "#f87171",
    ...(color ? {background:`${color}22`, color} : {}),
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

function NumInput({ value, onChange, placeholder }) {
  return (
    <input
      type="number" min="0" value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "0"}
      style={{
        width:"100%", background:"#0a0a0a", border:"1px solid #2a2a2a",
        color:"#e2e8f0", fontSize:14, padding:"8px 10px", outline:"none",
        fontFamily:"'Share Tech Mono',monospace", transition:"border-color .2s",
      }}
      onFocus={e => e.target.style.borderColor="#dc2626"}
      onBlur={e => e.target.style.borderColor="#2a2a2a"}
    />
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&family=Barlow:wght@300;400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg:#060606; --surf:#0d0d0d; --surf2:#111111;
  --brd:#1f1f1f; --brd2:#2a2a2a;
  --acc:#dc2626; --acc2:#ef4444; --accl:#fca5a5;
  --red:#dc2626; --blue:#2563eb;
  --txt:#e2e8f0; --muted:#64748b;
  --good:#4ade80; --warn:#facc15; --bad:#94a3b8;
}
body { background:var(--bg); color:var(--txt); font-family:'Barlow',sans-serif; font-size:14px; }
button { cursor:pointer; font-family:inherit; }
input,textarea { font-family:'Barlow',sans-serif; }
::-webkit-scrollbar { width:6px; height:6px; }
::-webkit-scrollbar-track { background:var(--bg); }
::-webkit-scrollbar-thumb { background:#2a2a2a; border-radius:3px; }
::-webkit-scrollbar-thumb:hover { background:var(--acc); }

.lw { min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:radial-gradient(ellipse 80% 60% at 50% -5%, #2a0a0a 0%, var(--bg) 65%);
  position:relative; overflow:hidden; }
.lgrid { position:fixed; inset:0;
  background-image:linear-gradient(#1a0a0a 1px,transparent 1px),linear-gradient(90deg,#1a0a0a 1px,transparent 1px);
  background-size:44px 44px; opacity:.4; pointer-events:none; }
.lcard { position:relative; z-index:1; width:440px; background:var(--surf);
  border:1px solid #2a1a1a; border-top:3px solid var(--acc); padding:48px 40px;
  box-shadow:0 0 100px rgba(220,38,38,.15); }
.llogo { display:flex; align-items:center; gap:14px; margin-bottom:24px; }
.ltag { font-family:'Rajdhani',sans-serif; font-size:10px; font-weight:600; letter-spacing:4px; color:var(--acc); }
.ltitle { font-family:'Rajdhani',sans-serif; font-size:40px; font-weight:700; line-height:1; color:#fff; margin-bottom:4px; }
.lsub { font-size:13px; color:var(--muted); margin-bottom:36px; }
.lbl { display:block; font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:8px; }
.inp { width:100%; background:var(--bg); border:1px solid var(--brd2); color:var(--txt);
  font-size:15px; padding:12px 16px; outline:none; transition:border-color .2s; }
.inp:focus { border-color:var(--acc); }
.btn-main { width:100%; margin-top:22px; padding:14px; background:var(--acc); color:#fff; border:none;
  font-family:'Rajdhani',sans-serif; font-size:16px; font-weight:700; letter-spacing:3px;
  text-transform:uppercase; transition:all .2s; }
.btn-main:hover { background:var(--acc2); }
.btn-main:disabled { opacity:.35; cursor:not-allowed; }
.err { margin-top:10px; font-size:12px; color:#f87171; text-align:center; }

.nav { background:var(--surf); border-bottom:1px solid var(--brd); padding:0 28px;
  display:flex; align-items:center; position:sticky; top:0; z-index:99; }
.nbrand { display:flex; align-items:center; gap:10px; padding:10px 24px 10px 0;
  border-right:1px solid var(--brd); margin-right:4px; }
.nbrand-text { font-family:'Rajdhani',sans-serif; font-size:20px; font-weight:700; color:var(--acc); letter-spacing:2px; }
.ntab { padding:18px 16px; font-family:'Rajdhani',sans-serif; font-size:12px; font-weight:600; letter-spacing:2px;
  text-transform:uppercase; color:var(--muted); border:none; background:none;
  border-bottom:2px solid transparent; margin-bottom:-1px; transition:all .18s; }
.ntab:hover { color:var(--txt); }
.ntab.on { color:var(--acc); border-bottom-color:var(--acc); }
.nsp { flex:1; }
.nlock { font-size:11px; color:var(--muted); background:none; border:1px solid var(--brd2); padding:5px 12px; }

.main { padding:32px 28px; max-width:1440px; margin:0 auto; }
.ph { margin-bottom:28px; border-left:4px solid var(--acc); padding-left:20px; }
.ph h2 { font-family:'Rajdhani',sans-serif; font-size:28px; color:#fff; letter-spacing:1px; }
.ph p { color:var(--muted); font-size:13px; margin-top:2px; }

.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
.sc { background:var(--surf); border:1px solid var(--brd); border-top:2px solid var(--acc); padding:18px 22px; }
.scn { font-family:'Share Tech Mono',monospace; font-size:34px; color:var(--acc); line-height:1; }
.scl { font-size:11px; color:var(--muted); margin-top:5px; text-transform:uppercase; letter-spacing:1px; }

.fbar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; align-items:center; }
.fbar input { background:var(--surf); border:1px solid var(--brd2); color:var(--txt);
  padding:7px 12px; font-size:13px; outline:none; width:210px; transition:border-color .2s; }
.fbar input:focus { border-color:var(--acc); }
.sbtn { background:var(--surf); border:1px solid var(--brd2); color:var(--muted);
  padding:7px 12px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; }
.sbtn.on { border-color:var(--acc); color:var(--acc); }

.tbl { width:100%; border-collapse:collapse; background:var(--surf); border:1px solid var(--brd); }
.tbl th { text-align:left; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px;
  color:var(--muted); padding:14px 16px; border-bottom:1px solid var(--brd); }
.tbl td { padding:14px 16px; border-bottom:1px solid var(--brd); font-size:13px; }
.tbl tr:hover { background:var(--surf2); }
.tnc { font-family:'Share Tech Mono',monospace; font-size:15px; color:var(--acc); font-weight:700; }

.rgrid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:20px; }
.rcard { background:var(--surf); border:1px solid var(--brd); position:relative; overflow:hidden; transition:transform .2s; }
.rcard:hover { transform:translateY(-2px); border-color:var(--brd2); }
.rheader { padding:16px; border-bottom:1px solid var(--brd); display:flex; justify-content:space-between; align-items:center; }
.rname { font-weight:700; font-size:15px; }
.rnum { font-family:'Share Tech Mono',monospace; color:var(--acc); font-size:14px; }
.rbody { padding:16px; }
.rpills { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:12px; }
.rbar { margin-top:12px; }
.btrack { height:6px; background:var(--brd); border-radius:3px; overflow:hidden; }
.bfill { height:100%; background:linear-gradient(90deg, var(--acc), var(--acc2)); }
.bval { display:flex; justify-content:space-between; font-size:10px; font-weight:700; margin-top:5px; color:var(--muted); }

.fgrid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
.fg { display:flex; flex-direction:column; gap:8px; }
.fg label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted); }

.srow { display:flex; align-items:center; gap:16px; margin-top:24px; }
.btn-save { background:var(--acc); color:#fff; border:none; padding:12px 32px;
  font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700; letter-spacing:2px;
  text-transform:uppercase; transition:all .2s; }
.btn-save:hover { background:var(--acc2); transform:translateY(-1px); }
.btn-save:disabled { opacity:.4; cursor:not-allowed; }
.sok { color:var(--good); font-weight:700; font-size:13px; }
.serr { color:var(--red); font-weight:700; font-size:13px; }

.qual-dots { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:24px; }
.qual-dot { width:12px; height:12px; background:var(--brd2); border-radius:2px; transition:all .2s; }
.qual-dot.filled { background:var(--muted); }
.qual-dot.red { background: var(--red) !important; box-shadow: 0 0 5px var(--red); }
.qual-dot.blue { background: var(--blue) !important; box-shadow: 0 0 5px var(--blue); }
.qual-dot.draw { background: var(--muted) !important; }

.qual-nav { display:flex; align-items:center; gap:12px; background:var(--surf); border:1px solid var(--brd); padding:12px 20px; margin-bottom:28px; }
.qual-btn { background:var(--surf2); border:1px solid var(--brd2); color:var(--txt); padding:8px 16px; font-size:11px; font-weight:700; }
.qual-btn:disabled { opacity:.3; }
.qual-num-display { font-family:'Share Tech Mono',monospace; font-size:20px; font-weight:700; color:var(--acc); min-width:100px; text-align:center; }
.qual-jump { display:flex; gap:6px; align-items:center; }
.qual-jump input { background:#000; border:1px solid var(--brd2); color:#fff; padding:6px; width:50px; text-align:center; font-size:12px; }

.alliance-block { margin-bottom:24px; border:1px solid var(--brd); }
.alliance-header { padding:10px 16px; font-weight:700; font-size:12px; letter-spacing:1px; display:flex; justify-content:space-between; }
.alliance-header.red { background:rgba(220,38,38,.1); color:var(--red); border-bottom:1px solid rgba(220,38,38,.2); }
.alliance-header.blue { background:rgba(37,99,235,.1); color:var(--blue); border-bottom:1px solid rgba(37,99,235,.2); }
.alliance-overall { font-family:'Share Tech Mono',monospace; font-size:14px; }

.match-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--brd); }
.match-robot { background:var(--surf); padding:14px 16px; }
.match-robot-label { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.match-robot-label span { font-family:'Share Tech Mono',monospace; font-size:11px; }
.match-fields { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.match-field { display:flex; flex-direction:column; gap:4px; }
.match-field label { font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--muted); }
.match-notes { grid-column:1/-1; margin-top:8px; }
.match-notes textarea { width:100%; background:#0a0a0a; border:1px solid #2a2a2a; color:var(--txt); font-size:12px; padding:7px 10px; resize:none; height:54px; outline:none; font-family:'Barlow',sans-serif; transition:border-color .2s; }
.match-notes textarea:focus { border-color:var(--acc); }

.team-select { width:100%; background:#0a0a0a; border:1px solid #2a2a2a; color:var(--txt); font-size:12px; padding:7px 8px; outline:none; font-family:'Share Tech Mono',monospace; transition:border-color .2s; appearance:none; cursor:pointer; }
.team-select:focus { border-color:var(--acc); }
.team-select.red-sel { border-color:rgba(220,38,38,.3); color:var(--red); }
.team-select.blue-sel { border-color:rgba(37,99,235,.3); color:var(--blue); }

.pit-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(64px, 1fr)); gap:6px; margin-bottom:28px; }
.pit-cell { background:var(--surf); border:1px solid var(--brd); padding:10px 4px; text-align:center; cursor:pointer; transition:all .2s; position:relative; }
.pit-cell:hover { background:var(--surf2); border-color:var(--brd2); }
.pit-cell.on { border-color:var(--acc); background:rgba(220,38,38,.05); }
.pit-cell.scouted { opacity:.6; }
.pit-cell.scouted::after { content:""; position:absolute; top:3px; right:3px; width:5px; height:5px; background:var(--acc); border-radius:50%; }
.pit-tn { font-family:'Share Tech Mono',monospace; font-size:14px; color:var(--txt); display:block; }
.pit-pn { font-size:9px; color:var(--muted); display:block; margin-top:2px; }
.pit-cell.on .pit-tn { color:var(--acc); }

.photo-section { margin:24px 0; border:1px solid var(--brd); background:rgba(255,255,255,.01); padding:16px; }
.photo-section-label { display:block; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:12px; }
.photo-grid { display:flex; flex-wrap:wrap; gap:10px; }
.photo-thumb { width:90px; height:90px; border:1px solid var(--brd2); position:relative; cursor:pointer; }
.photo-thumb img { width:100%; height:100%; object-fit:cover; }
.photo-thumb-del { position:absolute; top:-6px; right:-6px; background:#ef4444; color:#fff; border:none; width:18px; height:18px; border-radius:50%; font-size:10px; display:flex; align-items:center; justify-content:center; }
.photo-upload-btn { width:90px; height:90px; border:1px dashed var(--brd2); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; gap:4px; color:var(--muted); }
.photo-upload-btn:hover { border-color:var(--acc); color:var(--acc); }
.photo-uploading { opacity:.5; pointer-events:none; }

.lb-overlay { position:fixed; inset:0; background:rgba(0,0,0,.92); z-index:1000; display:flex; align-items:center; justify-content:center; padding:40px; }
.lb-close { position:absolute; top:24px; right:32px; font-size:32px; color:#fff; cursor:pointer; background:none; border:none; }
.lb-img { max-width:100%; max-height:100%; object-fit:contain; box-shadow:0 0 50px rgba(0,0,0,.5); }
.lb-nav { position:absolute; top:50%; width:100%; display:flex; justify-content:space-between; padding:0 30px; pointer-events:none; }
.lb-nav button { pointer-events:auto; background:rgba(255,255,255,.1); border:none; color:#fff; width:50px; height:50px; font-size:24px; cursor:pointer; border-radius:50%; }

.setup-box { background:#0a0a0a; border:1px solid #2a2a2a; padding:24px; margin-top:20px; }
.setup-sql { background:#000; border:1px solid #1a1a1a; padding:16px; font-family:'Share Tech Mono',monospace; font-size:11px; color:#4ade80; white-space:pre-wrap; overflow-x:auto; margin-top:12px; line-height:1.5; }
`;

// ── Shared Logic ──────────────────────────────────────────────────────────

function allianceOverall(robots) {
  if (!robots || !robots.length) return 0;
  return robots.reduce((sum, r) => {
    return sum + (parseFloat(r.auto_climb)||0) + (parseFloat(r.auto_score)||0) + (parseFloat(r.teleop_score)||0) + (parseFloat(r.teleop_climb)||0);
  }, 0).toFixed(1);
}

// ── Setup (Initial connection) ────────────────────────────────────────────

function Setup({ onConnect }) {
  const [url, setUrl] = useState(SUPABASE_URL === "YOUR_SUPABASE_URL" ? "" : SUPABASE_URL);
  const [key, setKey] = useState(SUPABASE_ANON_KEY === "YOUR_ANON_KEY" ? "" : SUPABASE_ANON_KEY);
  return (
    <div className="lw"><style>{CSS}</style><div className="lgrid" />
      <div className="lcard" style={{width:600}}>
        <div className="llogo"><TorchersLogo size={56}/><div><div className="ltag">DATABASE SETUP</div><TorchersText height={38} color="#ffffff" /></div></div>
        <p className="lsub">Uygulamayı başlatmak için Supabase bağlantı bilgilerini girin.</p>
        <div style={{display:"grid",gap:16,marginBottom:24}}>
          <div><label className="lbl">Supabase URL</label><input className="inp" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://xxx.supabase.co" /></div>
          <div><label className="lbl">Anon Public Key</label><input className="inp" value={key} onChange={e=>setKey(e.target.value)} placeholder="eyJhbG..." /></div>
        </div>
        <button className="btn-main" onClick={() => onConnect(url, key)} disabled={!url || !key}>BAĞLAN VE DEVAM ET</button>
        <div className="setup-box">
          <label className="lbl">Veritabanı Tablo Kurulumu (SQL Editor'da çalıştır)</label>
          <div className="setup-sql">{`CREATE TABLE IF NOT EXISTS scouting (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  team_number int NOT NULL UNIQUE,
  team_name text, pit_number int,
  performance text, scoring text,
  shooter_type text, intake_type text,
  climb text, capacity text, notes text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS match_scouting (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  qual_number int NOT NULL,
  alliance text NOT NULL,
  robot_slot int NOT NULL,
  team_number int,
  auto_climb numeric DEFAULT 0,
  auto_score numeric DEFAULT 0,
  teleop_score numeric DEFAULT 0,
  teleop_climb numeric DEFAULT 0,
  notes text,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(qual_number, alliance, robot_slot)
);

ALTER TABLE scouting ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_scouting ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open" ON scouting FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open" ON match_scouting FOR ALL USING (true) WITH CHECK (true);

-- STORAGE: Supabase Dashboard → Storage → New Bucket
-- Bucket name: robot-photos
-- Public bucket: YES (toggle on)
-- Sonra Policies → Add Policy → "Allow all" seç`}</div>
        </div>
      </div>
    </div>
  );
}

// ── Login ──────────────────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const go = () => {
    if (pw === TEAM_PASSWORD) onLogin();
    else { setErr("Yanlış şifre."); setPw(""); }
  };
  return (
    <div className="lw"><style>{CSS}</style><div className="lgrid" />
      <div className="lcard">
        <div className="llogo">
          <TorchersLogo size={56}/>
          <div>
            <div className="ltag">FRC · TUIS5 · 2026</div>
            <TorchersText height={38} color="#ffffff" />
          </div>
        </div>
        <div className="lsub">Team 10415 — Internal Scouting Platform</div>
        <label className="lbl">Team Password</label>
        <input className="inp" type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr("")}} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Şifreyi gir…" />
        <button className="btn-main" onClick={go} disabled={!pw}>GİRİŞ YAP</button>
        {err && <div className="err">{err}</div>}
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────

function Lightbox({ urls, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  useEffect(() => {
    const h = e => { if(e.key==="Escape") onClose(); if(e.key==="ArrowRight") setIdx(p=>(p+1)%urls.length); if(e.key==="ArrowLeft") setIdx(p=>(p-1+urls.length)%urls.length); };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [urls.length, onClose]);
  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close">×</button>
      <img src={urls[idx]} className="lb-img" alt="" onClick={e=>e.stopPropagation()} />
      {urls.length > 1 && (
        <div className="lb-nav">
          <button onClick={e=>{e.stopPropagation(); setIdx((idx-1+urls.length)%urls.length)}}>◀</button>
          <button onClick={e=>{e.stopPropagation(); setIdx((idx+1)%urls.length)}}>▶</button>
        </div>
      )}
    </div>
  );
}

// ── Photo Upload ──────────────────────────────────────────────────────────

function PhotoSection({ teamNumber, supabaseUrl, supabaseKey }) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  
  const bucket = "robot-photos";
  const prefix = `${teamNumber}/`;
  const storageBase = `${supabaseUrl}/storage/v1`;
  const headers = { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` };

  useEffect(() => { loadPhotos(); }, [teamNumber]);

  async function loadPhotos() {
    try {
      const r = await fetch(`${storageBase}/object/list/${bucket}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ prefix, limit: 10, offset: 0 }),
      });
      const files = await r.json();
      if (!Array.isArray(files)) return;
      const urls = files
        .filter(f => f.name && f.name !== ".emptyFolderPlaceholder")
        .map(f => `${storageBase}/object/public/${bucket}/${prefix}${f.name}`);
      setPhotos(urls);
    } catch {}
  }

  async function upload(e) {
    const files = Array.from(e.target.files||[]);
    if (!files.length) return;
    if (photos.length + files.length > 8) { alert("Maksimum 8 fotoğraf yüklenebilir!"); return; }
    
    setUploading(true);
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      try {
        await fetch(`${storageBase}/object/${bucket}/${prefix}${name}`, {
          method: "POST",
          headers: { ...headers, "Content-Type": file.type, "x-upsert": "true" },
          body: file,
        });
      } catch {}
    }
    await loadPhotos();
    setUploading(false);
    e.target.value = "";
  }

  async function deletePhoto(url) {
    const name = url.split(`${prefix}`).pop();
    try {
      await fetch(`${storageBase}/object/${bucket}`, {
        method: "DELETE",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ prefixes: [`${prefix}${name}`] }),
      });
      setPhotos(p => p.filter(u => u !== url));
    } catch {}
  }

  return (
    <div className="photo-section">
      <span className="photo-section-label">Robot Fotoğrafları ({photos.length}/8)</span>
      <div className="photo-grid">
        {photos.map((url, i) => (
          <div key={url} className="photo-thumb">
            <img src={url} alt={`robot-${i}`} onClick={() => setLightbox(i)} />
            <button className="photo-thumb-del" onClick={e => { e.stopPropagation(); deletePhoto(url); }}>✕</button>
          </div>
        ))}
        {photos.length < 8 && (
          <label className={`photo-upload-btn ${uploading ? "photo-uploading" : ""}`}>
            <span>{uploading ? "⏳" : "+"}</span>
            <span style={{fontSize:10}}>{uploading ? "Yükleniyor…" : "Fotoğraf Ekle"}</span>
            <input type="file" accept="image/*" multiple style={{display:"none"}} onChange={upload} disabled={uploading} />
          </label>
        )}
      </div>
      {lightbox !== null && <Lightbox urls={photos} startIndex={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

// ── Pit Scout ─────────────────────────────────────────────────────────────

function ScoutForm({ api, supabaseUrl, supabaseKey, onSaved }) {
  const [sel, setSel] = useState(null);
  const [scoutedSet, setScoutedSet] = useState(new Set());
  const [form, setForm] = useState(BLANK_PIT);
  const [existingId, setExistingId] = useState(null);
  const [status, setStatus] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    api("/scouting?select=team_number").then(r=>r.json()).then(d=>{
      if (Array.isArray(d)) setScoutedSet(new Set(d.map(x=>x.team_number)));
    }).catch(()=>{});
  }, [api]);

  async function pick(t) {
    setSel(t);
    setStatus(null);
    try {
      const [scoutRes, matchRes] = await Promise.all([
        api(`/scouting?team_number=eq.${t.team}&select=*`),
        api(`/match_scouting?team_number=eq.${t.team}&select=*&order=qual_number.asc`)
      ]);
      const sData = await scoutRes.json();
      const mData = await matchRes.json();
      
      if (sData && sData[0]) {
        const { id, team_number, team_name, pit_number, updated_at, ...fields } = sData[0];
        setForm(fields);
        setExistingId(id);
      } else {
        setForm(BLANK_PIT);
        setExistingId(null);
      }
      setMatchHistory(Array.isArray(mData) ? mData : []);
    } catch {
      setForm(BLANK_PIT);
      setExistingId(null);
      setMatchHistory([]);
    }
  }

  async function save() {
    setStatus("saving");
    try {
      const payload = { ...form, team_number: sel.team, team_name: sel.name, pit_number: sel.pit };
      if (existingId) {
        await api(`/scouting?id=eq.${existingId}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await api("/scouting", { method: "POST", body: JSON.stringify(payload) });
      }
      
      setScoutedSet(prev => new Set([...prev, sel.team]));
      setStatus("saved");
      onSaved && onSaved();
    } catch { setStatus("error"); }
  }

  async function clearData() {
    if (!existingId) return setForm(BLANK_PIT);
    if (!confirm("Bu takımın pit verilerini silmek istediğinize emin misiniz?")) return;
    setStatus("clearing");
    try {
      await api(`/scouting?id=eq.${existingId}`, { method: "DELETE" });
      setScoutedSet(prev => { const s = new Set(prev); s.delete(sel.team); return s; });
      setForm(BLANK_PIT);
      setExistingId(null);
      setStatus(null);
    } catch { setStatus("error"); }
  }

  const f = (k) => (v) => setForm(p => ({...p, [k]: v}));

  return (
    <div>
      <div className="ph"><h2>Pit Scouting</h2><p>Takımların teknik özelliklerini ve hazırlık durumlarını kaydet</p></div>
      
      <div className="pit-grid">
        {TEAMS.map(t => (
          <div key={t.team} className={`pit-cell ${sel?.team===t.team?"on":""} ${scoutedSet.has(t.team)?"scouted":""}`} onClick={()=>pick(t)}>
            <span className="pit-tn">{t.team}</span>
            <span className="pit-pn">P{t.pit}</span>
          </div>
        ))}
      </div>

      {sel && (
        <div className="rcard" style={{padding:24, borderTop:"4px solid var(--acc)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1}}>{sel.from}</div>
              <h3 style={{fontSize:24,fontFamily:"'Rajdhani',sans-serif"}}>{sel.name} <span style={{color:"var(--acc)"}}>#{sel.team}</span></h3>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"var(--muted)"}}>PIT NUMBER</div>
              <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:20,color:"var(--acc)"}}>{sel.pit}</div>
            </div>
          </div>

          {matchHistory.length > 0 && (
            <div style={{marginBottom:24, padding:16, background:"rgba(0,0,0,.2)", border:"1px solid var(--brd)"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:"var(--muted)",textTransform:"uppercase",marginBottom:10}}>Maç Geçmişi</div>
              <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8}}>
                {matchHistory.map(m => {
                  const s = (parseFloat(m.auto_score)||0) + (parseFloat(m.auto_climb)||0) + (parseFloat(m.teleop_score)||0) + (parseFloat(m.teleop_climb)||0);
                  return (
                    <div key={m.id} style={{minWidth:80, background:m.alliance==="red"?"rgba(220,38,38,.1)":"rgba(37,99,235,.1)", padding:8, border:"1px solid "+(m.alliance==="red"?"rgba(220,38,38,.2)":"rgba(37,99,235,.2)")}}>
                      <div style={{fontSize:9,fontWeight:700,color:"var(--muted)"}}>Q{m.qual_number}</div>
                      <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:18,color:"var(--txt)",margin:"4px 0"}}>{s}</div>
                      <div style={{fontSize:9,color:"var(--muted)"}}>
                        {m.auto_score||0}+{m.auto_climb||0} / {m.teleop_score||0}+{m.teleop_climb||0}
                      </div>
                      {m.notes && <div style={{fontSize:10,color:"var(--muted)",marginTop:4,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={m.notes}>{m.notes}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <PhotoSection teamNumber={sel.team} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />

          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:14,marginTop:8}}> Pit Scout Formu </div>
          <div className="fgrid">
            {[["Performance","performance",PERF_OPTS],["Scoring","scoring",SCORE_OPTS],
              ["Shooter Type","shooter_type",SHOOTER_OPTS],["Intake Type","intake_type",INTAKE_OPTS],
              ["Climb","climb",CLIMB_OPTS],["Capacity","capacity",CAP_OPTS]].map(([lbl,key,opts])=>(
              <div className="fg" key={key}><label>{lbl}</label><RadioGroup options={opts} value={form[key]} onChange={f(key)} /></div>
            ))}
          </div>

          <label className="lbl">Notes</label>
          <textarea className="inp" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Gözlemler, strateji notları…" />
          
          <div className="srow">
            <button className="btn-save" onClick={save} disabled={status==="saving"||status==="clearing"}>
              {status==="saving"?"KAYDEDİLİYOR…":existingId?"GÜNCELLE":"KAYDET"}
            </button>
            <button onClick={clearData} disabled={status==="saving"||status==="clearing"} style={{
              padding:"10px 16px",background:"none",border:"1px solid #2a2a2a",color:"#64748b",
              fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",transition:"all .2s"
            }} onMouseEnter={e=>{e.target.style.borderColor="#ef4444";e.target.style.color="#f87171"}} onMouseLeave={e=>{e.target.style.borderColor="#2a2a2a";e.target.style.color="#64748b"}} >
              {status==="clearing"?"SİLİNİYOR…":"✕ TEMİZLE"}
            </button>
            {status==="saved" && <span className="sok">✓ Kaydedildi</span>}
            {status==="error" && <span className="serr">✗ Hata!</span>}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Match Scout ───────────────────────────────────────────────────────────

function MatchScout({ api, onSaved }) {
  const [qual, setQual] = useState(1);
  const [matchData, setMatchData] = useState([]);
  const [savedQuals, setSavedQuals] = useState(new Set());
  const [winners, setWinners] = useState({});
  const [status, setStatus] = useState(null);
  const [jumpVal, setJumpVal] = useState("");
  const [loadedQuals, setLoadedQuals] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const r = await api(`/match_scouting?select=qual_number,alliance,auto_score,auto_climb,teleop_score,teleop_climb`);
        const data = await r.json();
        const qSet = new Set();
        const matchGroups = {};
        const qualResults = {};

        data.forEach(d => {
          qSet.add(d.qual_number);
          if (!matchGroups[d.qual_number]) matchGroups[d.qual_number] = { red: 0, blue: 0 };
          const total = (parseFloat(d.auto_score)||0) + (parseFloat(d.auto_climb)||0) + (parseFloat(d.teleop_score)||0) + (parseFloat(d.teleop_climb)||0);
          matchGroups[d.qual_number][d.alliance] += total;
        });

        Object.keys(matchGroups).forEach(q => {
          const scores = matchGroups[q];
          if (scores.red > scores.blue) qualResults[q] = "red";
          else if (scores.blue > scores.red) qualResults[q] = "blue";
          else qualResults[q] = "draw";
        });

        setWinners(qualResults);
        setSavedQuals(qSet);
      } catch {}
    }
    load();
  }, [api]);

  useEffect(() => {
    async function loadQual() {
      setStatus(null);
      if (loadedQuals[qual]) return setMatchData(loadedQuals[qual]);
      try {
        const r = await api(`/match_scouting?qual_number=eq.${qual}`);
        const data = await r.json();
        if (data && data.length > 0) {
          setMatchData(data);
          setLoadedQuals(p => ({...p, [qual]: data}));
        } else {
          const empty = [1,2,3].flatMap(s => [
            {qual_number:qual, alliance:"red", robot_slot:s, team_number:null, auto_climb:0, auto_score:0, teleop_score:0, teleop_climb:0, notes:""},
            {qual_number:qual, alliance:"blue", robot_slot:s, team_number:null, auto_climb:0, auto_score:0, teleop_score:0, teleop_climb:0, notes:""}
          ]);
          setMatchData(empty);
        }
      } catch { setMatchData([]); }
    }
    loadQual();
  }, [qual, api, loadedQuals]);

  const getRobot = (alliance, slot) => matchData.find(d => d.alliance === alliance && d.robot_slot === slot) || {};
  const getAllianceRobots = (alliance) => matchData.filter(d => d.alliance === alliance);

  const updateRobot = (alliance, slot, key, val) => {
    setMatchData(prev => prev.map(d => (d.alliance === alliance && d.robot_slot === slot) ? {...d, [key]: val} : d));
  };

  async function saveQual() {
    setStatus("saving");
    try {
      for (const robot of matchData) {
        const { id, updated_at, ...payload } = robot;
        if (id) {
          await api(`/match_scouting?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(payload) });
        } else {
          await api("/match_scouting", { method: "POST", body: JSON.stringify(payload) });
        }
      }
      setSavedQuals(prev => new Set([...prev, qual]));
      const redTotal = getAllianceRobots("red").reduce((s,r) => s + (parseFloat(r.auto_score)||0)+(parseFloat(r.auto_climb)||0)+(parseFloat(r.teleop_score)||0)+(parseFloat(r.teleop_climb)||0), 0);
      const blueTotal = getAllianceRobots("blue").reduce((s,r) => s + (parseFloat(r.auto_score)||0)+(parseFloat(r.auto_climb)||0)+(parseFloat(r.teleop_score)||0)+(parseFloat(r.teleop_climb)||0), 0);
      setWinners(prev => ({...prev, [qual]: redTotal > blueTotal ? "red" : blueTotal > redTotal ? "blue" : "draw"}));
      setLoadedQuals(prev => ({...prev, [qual]: matchData}));
      setStatus("saved");
      onSaved && onSaved();
    } catch { setStatus("error"); }
  }

  async function deleteQual() {
    if (!confirm(`Qual ${qual} verilerini tamamen silmek istediğinize emin misiniz?`)) return;
    setStatus("saving");
    try {
      await api(`/match_scouting?qual_number=eq.${qual}`, { method: "DELETE" });
      setSavedQuals(prev => { const s = new Set(prev); s.delete(qual); return s; });
      setWinners(prev => { const w = {...prev}; delete w[qual]; return w; });
      setLoadedQuals(prev => { const l = {...prev}; delete l[qual]; return l; });
      const empty = [1,2,3].flatMap(s => [
        {qual_number:qual, alliance:"red", robot_slot:s, team_number:null, auto_climb:0, auto_score:0, teleop_score:0, teleop_climb:0, notes:""},
        {qual_number:qual, alliance:"blue", robot_slot:s, team_number:null, auto_climb:0, auto_score:0, teleop_score:0, teleop_climb:0, notes:""}
      ]);
      setMatchData(empty);
      setStatus(null);
    } catch { setStatus("error"); }
  }

  const redOverall = allianceOverall(getAllianceRobots("red"));
  const blueOverall = allianceOverall(getAllianceRobots("blue"));

  return (
    <div>
      <div className="ph"><h2>Match Scouting</h2><p>Qual bazında alliance skorlarını takip et</p></div>

      <div className="qual-dots">
        {Array.from({length:TOTAL_QUALS},(_,i)=>(
          <div 
            key={i+1} 
            className={`qual-dot ${savedQuals.has(i+1)?"filled":""} ${winners[i+1] || ""}`} 
            onClick={()=>setQual(i+1)} 
          />
        ))}
      </div>

      <div className="qual-nav">
        <button className="qual-btn" onClick={()=>setQual(q=>Math.max(1,q-1))} disabled={qual<=1}>◀ PREV</button>
        <div className="qual-num-display">QUAL {qual}</div>
        <button className="qual-btn" onClick={()=>setQual(q=>Math.min(TOTAL_QUALS,q+1))} disabled={qual>=TOTAL_QUALS}>NEXT ▶</button>
        
        <div className="qual-jump">
          <input value={jumpVal} onChange={e=>setJumpVal(e.target.value)} placeholder="No" type="number" min="1" max={TOTAL_QUALS} onKeyDown={e=>{if(e.key==="Enter"){const n=parseInt(jumpVal);if(n>=1&&n<=TOTAL_QUALS){setQual(n);setJumpVal("");}}}} />
          <button className="qual-btn" onClick={()=>{const n=parseInt(jumpVal);if(n>=1&&n<=TOTAL_QUALS){setQual(n);setJumpVal("");}}}>GİT</button>
        </div>

        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          {savedQuals.has(qual) && (
            <button className="sbtn" onClick={deleteQual} style={{borderColor:"#ef4444", color:"#ef4444"}}>SİL</button>
          )}
          <button className="btn-save" onClick={saveQual} disabled={status==="saving"}>{status==="saving"?"KAYDEDİLİYOR…":"KAYDET"}</button>
          {status==="saved" && <span className="sok">✓</span>}
          {status==="error" && <span className="serr">✗ Hata</span>}
        </div>
      </div>

      <div className="alliance-block">
        <div className="alliance-header red">
          🔴 RED ALLIANCE <span className="alliance-overall red">Overall: {redOverall}</span>
        </div>
        <div className="match-grid">
          {[1,2,3].map(s => {
            const r = getRobot("red", s);
            return (
              <div key={`red-${s}`} className="match-robot">
                <div className="match-robot-label">ROBOT {s} <span>RED SLOT</span></div>
                <select className="team-select red-sel" value={r.team_number||""} onChange={e=>updateRobot("red",s,"team_number",parseInt(e.target.value))}>
                  <option value="">Takım Seç…</option>
                  {TEAMS.map(t=><option key={t.team} value={t.team}>{t.team} - {t.name}</option>)}
                </select>
                <div className="match-fields" style={{marginTop:12}}>
                  <div className="match-field"><label>Auto S.</label><NumInput value={r.auto_score} onChange={v=>updateRobot("red",s,"auto_score",v)} /></div>
                  <div className="match-field"><label>Auto C.</label><NumInput value={r.auto_climb} onChange={v=>updateRobot("red",s,"auto_climb",v)} /></div>
                  <div className="match-field"><label>Tele S.</label><NumInput value={r.teleop_score} onChange={v=>updateRobot("red",s,"teleop_score",v)} /></div>
                  <div className="match-field"><label>Tele C.</label><NumInput value={r.teleop_climb} onChange={v=>updateRobot("red",s,"teleop_climb",v)} /></div>
                  <div className="match-notes"><textarea value={r.notes} onChange={e=>updateRobot("red",s,"notes",e.target.value)} placeholder="Notlar…" /></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="alliance-block">
        <div className="alliance-header blue">
          🔵 BLUE ALLIANCE <span className="alliance-overall blue">Overall: {blueOverall}</span>
        </div>
        <div className="match-grid">
          {[1,2,3].map(s => {
            const r = getRobot("blue", s);
            return (
              <div key={`blue-${s}`} className="match-robot">
                <div className="match-robot-label">ROBOT {s} <span>BLUE SLOT</span></div>
                <select className="team-select blue-sel" value={r.team_number||""} onChange={e=>updateRobot("blue",s,"team_number",parseInt(e.target.value))}>
                  <option value="">Takım Seç…</option>
                  {TEAMS.map(t=><option key={t.team} value={t.team}>{t.team} - {t.name}</option>)}
                </select>
                <div className="match-fields" style={{marginTop:12}}>
                  <div className="match-field"><label>Auto S.</label><NumInput value={r.auto_score} onChange={v=>updateRobot("blue",s,"auto_score",v)} /></div>
                  <div className="match-field"><label>Auto C.</label><NumInput value={r.auto_climb} onChange={v=>updateRobot("blue",s,"auto_climb",v)} /></div>
                  <div className="match-field"><label>Tele S.</label><NumInput value={r.teleop_score} onChange={v=>updateRobot("blue",s,"teleop_score",v)} /></div>
                  <div className="match-field"><label>Tele C.</label><NumInput value={r.teleop_climb} onChange={v=>updateRobot("blue",s,"teleop_climb",v)} /></div>
                  <div className="match-notes"><textarea value={r.notes} onChange={e=>updateRobot("blue",s,"notes",e.target.value)} placeholder="Notlar…" /></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────

function Dashboard({ api, rk }) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("perf");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api("/scouting?select=*").then(r=>r.json()).then(d=>{
      if (Array.isArray(d)) setData(d);
    }).catch(()=>{});
  }, [api, rk]);

  const scoutedMap = Object.fromEntries(data.map(r => [r.team_number, r]));
  const teamsWithScout = TEAMS.map(t => ({
    ...t,
    ...(scoutedMap[t.team] || {}),
    scouted: !!scoutedMap[t.team],
    pitScore: scoutedMap[t.team] ? totalPitScore(scoutedMap[t.team]) : -1,
  }));

  const filtered = teamsWithScout.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.team.toString().includes(search)
  );

  const sorted = [...filtered].sort((a,b) => {
    if (sort === "team") return a.team - b.team;
    if (sort === "pit")  return a.pit  - b.pit;
    return b.pitScore - a.pitScore;
  });

  const avgPerf = data.length ? (data.reduce((s,r)=>s+(PERF_SCORE[r.performance]||0),0)/data.length).toFixed(1) : 0;
  const avgScor = data.length ? (data.reduce((s,r)=>s+(SCORE_SCORE[r.scoring]||0),0)/data.length).toFixed(1) : 0;

  return (
    <div>
      <div className="ph"><h2>Pit Dashboard</h2><p>Toplanan tüm pit verilerini karşılaştır ve analiz et</p></div>
      <div className="stats-grid">
        {[["Scouted Teams",data.length],["Avg Performance",avgPerf],["Avg Scoring",avgScor],["Total Teams",TEAMS.length]].map(([l,v])=>(
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
        <thead><tr>{["Team","Pit","Name","Performance","Scoring","Shooter","Intake","Climb","Capacity","Notes"].map(h=><th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {sorted.map(r=>(
            <tr key={r.team}>
              <td className="tnc">{r.team}</td>
              <td style={{color:"var(--muted)"}}>{r.pit}</td>
              <td style={{fontWeight:600}}>{r.name}</td>
              {r.scouted ? <>
                <td><Pill label={r.performance}/></td><td><Pill label={r.scoring}/></td>
                <td><Pill label={r.shooter_type}/></td><td><Pill label={r.intake_type}/></td>
                <td><Pill label={r.climb}/></td><td><Pill label={r.capacity}/></td>
                <td style={{color:"var(--muted)",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={r.notes}>{r.notes}</td>
              </> : <td colSpan={7} style={{color:"var(--muted)", fontStyle:"italic", fontSize:11}}>Henüz taranmadı</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Rankings ──────────────────────────────────────────────────────────────

function Rankings({ api }) {
  const [data, setData] = useState([]);
  const [mdata, setMdata] = useState([]);

  useEffect(() => {
    Promise.all([
      api("/scouting?select=*"),
      api("/match_scouting?select=*")
    ]).then(async ([r1, r2]) => {
      const d1 = await r1.json();
      const d2 = await r2.json();
      if (Array.isArray(d1)) setData(d1);
      if (Array.isArray(d2)) setMdata(d2);
    }).catch(()=>{});
  }, [api]);

  const teamStats = TEAMS.map(t => {
    const scout = data.find(s => s.team_number === t.team);
    const matches = mdata.filter(m => m.team_number === t.team);
    const pitScore = scout ? totalPitScore(scout) : 0;
    const matchScore = matches.length ? matches.reduce((s,m) => s + (parseFloat(m.auto_score)||0)+(parseFloat(m.auto_climb)||0)+(parseFloat(m.teleop_score)||0)+(parseFloat(m.teleop_climb)||0), 0) / matches.length : 0;
    return { ...t, scout, pitScore, matchScore, total: (pitScore * 2) + (matchScore * 5) };
  });

  const sorted = teamStats.sort((a,b) => b.total - a.total);
  const max = sorted[0]?.total || 1;

  return (
    <div>
      <div className="ph"><h2>Team Rankings</h2><p>Pit ve Maç verilerinin ağırlıklı ortalamasına göre sıralama</p></div>
      <div className="rgrid">
        {sorted.map((r,i) => {
          const score = r.total;
          return (
            <div className="rcard" key={r.team}>
              <div className="rheader">
                <div className="rnum">#{i+1}</div>
                <div className="rname">{r.name}</div>
                <div className="rnum">{r.team}</div>
              </div>
              <div className="rbody">
                {r.scout && (
                  <div className="rpills">
                    <Pill label={r.scout.performance}/>
                    <Pill label={r.scout.scoring}/>
                    {r.scout.climb && r.scout.climb!=="None" && <Pill label={`Climb: ${r.scout.climb}`}/>}
                  </div>
                )}
                <div className="rbar">
                  <div className="btrack"><div className="bfill" style={{width:`${(score/max)*100}%`}}/></div>
                  <div className="bval"><span>POWER SCORE</span><span>{score.toFixed(1)}</span></div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:14,fontSize:10,fontWeight:700,color:"var(--muted)"}}>
                  <div>PIT: {r.pitScore.toFixed(1)}</div>
                  <div>MATCH AVG: {r.matchScore.toFixed(1)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────

export default function App() {
  const [creds, setCreds]   = useState(null);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab]       = useState("pit");
  const [rk, setRk]         = useState(0);
  const api = creds ? makeApi(creds.url, creds.key) : null;

  if (!creds)  return <Setup onConnect={(url,key)=>setCreds({url,key})} />;
  if (!authed) return <><style>{CSS}</style><Login onLogin={()=>setAuthed(true)} /></>;

  return (
    <div>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nbrand"><TorchersLogo size={32}/><TorchersText height={18} color="#dc2626" /></div>
        {[["pit","Pit Scout"],["match","Match Scout"],["dashboard","Dashboard"],["rankings","Rankings"]].map(([k,l])=>(
          <button key={k} className={`ntab ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
        <div className="nsp"/>
        <button className="nlock" onClick={()=>setAuthed(false)}>Kilitle</button>
      </nav>
      <div className="main">
        {tab==="pit"       && <ScoutForm     api={api} supabaseUrl={creds.url} supabaseKey={creds.key} onSaved={()=>setRk(k=>k+1)} />}
        {tab==="match"     && <MatchScout     api={api} onSaved={()=>setRk(k=>k+1)} />}
        {tab==="dashboard" && <Dashboard     api={api} rk={rk} />}
        {tab==="rankings"  && <Rankings      api={api} />}
      </div>
    </div>
  );
}
