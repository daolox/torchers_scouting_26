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
.ntab { padding:18px 16px; font-family:'Rajdhani',sans-serif; font-size:12px; font-weight:600;
  letter-spacing:2px; text-transform:uppercase; color:var(--muted); border:none; background:none;
  border-bottom:2px solid transparent; margin-bottom:-1px; transition:all .18s; }
.ntab:hover { color:var(--txt); }
.ntab.on { color:var(--acc); border-bottom-color:var(--acc); }
.nsp { flex:1; }
.nlock { font-size:11px; color:var(--muted); background:none; border:1px solid var(--brd2);
  padding:6px 14px; letter-spacing:1px; text-transform:uppercase; transition:all .2s; }
.nlock:hover { border-color:var(--acc); color:var(--acc); }

.main { max-width:1320px; margin:0 auto; padding:28px 24px; }
.ph { margin-bottom:22px; }
.ph h2 { font-family:'Rajdhani',sans-serif; font-size:28px; font-weight:700; color:#fff; }
.ph p { color:var(--muted); font-size:13px; margin-top:3px; }

.tsearch { position:relative; margin-bottom:20px; }
.tsearch input { width:100%; background:var(--surf); border:1px solid var(--brd2); color:var(--txt);
  font-size:14px; padding:11px 16px; outline:none; transition:border-color .2s; }
.tsearch input:focus { border-color:var(--acc); }
.tdrop { position:absolute; top:100%; left:0; right:0; z-index:60; background:var(--surf2);
  border:1px solid var(--brd2); border-top:none; max-height:270px; overflow-y:auto; }
.topt { padding:9px 16px; display:flex; align-items:center; gap:10px; transition:background .12s; cursor:pointer; }
.topt:hover { background:#1a1a1a; }
.tbadge { font-family:'Share Tech Mono',monospace; font-size:11px; background:rgba(220,38,38,.15);
  color:var(--acc); padding:2px 8px; white-space:nowrap; flex-shrink:0; }
.tname { font-size:13px; font-weight:600; }
.tfrom { font-size:11px; color:var(--muted); margin-left:auto; }

.scard { background:var(--surf); border:1px solid var(--acc); padding:14px 20px;
  margin-bottom:22px; display:flex; align-items:center; gap:16px; border-left:4px solid var(--acc); }
.snum { font-family:'Share Tech Mono',monospace; font-size:28px; color:var(--acc); line-height:1; }
.sname { font-family:'Rajdhani',sans-serif; font-size:21px; font-weight:700; }
.smeta { font-size:11px; color:var(--muted); }
.chg { margin-left:auto; font-size:11px; color:var(--muted); background:none;
  border:1px solid var(--brd2); padding:4px 10px; transition:all .2s; }
.chg:hover { border-color:var(--acc); color:var(--acc); }

.fgrid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px; }
.fg { display:flex; flex-direction:column; gap:7px; }
.fg label { font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--muted); }
textarea.inp { min-height:80px; resize:vertical; margin-bottom:18px; font-size:14px; }
.srow { display:flex; align-items:center; gap:14px; }
.btn-save { padding:12px 32px; background:var(--acc); color:#fff; border:none;
  font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700; letter-spacing:2px;
  text-transform:uppercase; transition:all .2s; }
.btn-save:hover { background:var(--acc2); }
.btn-save:disabled { opacity:.35; cursor:not-allowed; }
.sok { font-size:13px; color:var(--good); }
.serr { font-size:13px; color:#f87171; }

.sbar { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
.sc { background:var(--surf); border:1px solid var(--brd); border-top:2px solid var(--acc); padding:18px 22px; }
.scn { font-family:'Share Tech Mono',monospace; font-size:34px; color:var(--acc); line-height:1; }
.scl { font-size:11px; color:var(--muted); margin-top:5px; text-transform:uppercase; letter-spacing:1px; }

.fbar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; align-items:center; }
.fbar input { background:var(--surf); border:1px solid var(--brd2); color:var(--txt);
  padding:7px 12px; font-size:13px; outline:none; width:210px; transition:border-color .2s; }
.fbar input:focus { border-color:var(--acc); }
.sbtn { padding:7px 14px; background:var(--surf); border:1px solid var(--brd2); color:var(--muted);
  font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:1px; transition:all .15s; }
.sbtn:hover,.sbtn.on { border-color:var(--acc); color:var(--acc); }

.tbl { width:100%; border-collapse:collapse; }
.tbl th { text-align:left; padding:9px 12px; font-size:10px; font-weight:700; letter-spacing:2px;
  text-transform:uppercase; color:var(--muted); border-bottom:1px solid var(--brd);
  background:var(--surf); white-space:nowrap; }
.tbl td { padding:10px 12px; border-bottom:1px solid #151515; vertical-align:middle; }
.tbl tr:hover td { background:#0f0f0f; }
.tnc { font-family:'Share Tech Mono',monospace; color:var(--acc); font-size:13px; }

.rlist { display:flex; flex-direction:column; gap:8px; }
.rcard { background:var(--surf); border:1px solid var(--brd); padding:14px 20px;
  display:flex; align-items:center; gap:14px; }
.rcard.g1 { border-left:3px solid #ffd700; }
.rcard.g2 { border-left:3px solid #c0c0c0; }
.rcard.g3 { border-left:3px solid #cd7f32; }
.rpos { font-family:'Share Tech Mono',monospace; font-size:20px; color:var(--muted); width:32px; text-align:center; flex-shrink:0; }
.rpos.g1 { color:#ffd700; } .rpos.g2 { color:#c0c0c0; } .rpos.g3 { color:#cd7f32; }
.rinfo { flex:1; }
.rn { font-family:'Rajdhani',sans-serif; font-size:18px; font-weight:700; }
.rm { font-family:'Share Tech Mono',monospace; font-size:11px; color:var(--muted); }
.rpills { display:flex; gap:5px; flex-wrap:wrap; margin-top:4px; }
.rbar { display:flex; align-items:center; gap:10px; }
.btrack { width:160px; height:5px; background:#1f1f1f; }
.bfill { height:100%; background:var(--acc); transition:width .4s; }
.rval { font-family:'Share Tech Mono',monospace; font-size:13px; color:var(--acc); }
.nodata { text-align:center; padding:60px; color:var(--muted); }
.setup-sql { margin-top:20px; padding:14px 16px; background:rgba(220,38,38,.06);
  border:1px solid rgba(220,38,38,.2); font-family:'Share Tech Mono',monospace;
  font-size:11px; color:var(--muted); white-space:pre; overflow-x:auto; line-height:1.7; }

/* ── PHOTOS ── */
.photo-section { margin-bottom:20px; }
.photo-section-label { font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:10px; display:block; }
.photo-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:10px; }
.photo-thumb { position:relative; aspect-ratio:1; background:var(--surf2); border:1px solid var(--brd2); cursor:pointer; overflow:hidden; }
.photo-thumb img { width:100%; height:100%; object-fit:cover; transition:opacity .2s; }
.photo-thumb:hover img { opacity:.75; }
.photo-thumb-del { position:absolute; top:3px; right:3px; background:rgba(0,0,0,.7); border:none;
  color:#f87171; font-size:14px; width:22px; height:22px; display:flex; align-items:center; justify-content:center;
  cursor:pointer; border-radius:2px; line-height:1; }
.photo-upload-btn { border:1px dashed var(--brd2); background:none; color:var(--muted); width:100%;
  padding:10px; font-size:12px; cursor:pointer; transition:all .2s; aspect-ratio:1;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; }
.photo-upload-btn:hover { border-color:var(--acc); color:var(--acc); }
.photo-upload-btn span { font-size:20px; line-height:1; }
.photo-uploading { opacity:.5; pointer-events:none; }

/* ── LIGHTBOX ── */
.lightbox { position:fixed; inset:0; z-index:999; background:rgba(0,0,0,.95);
  display:flex; align-items:center; justify-content:center; }
.lightbox-img { max-width:90vw; max-height:85vh; object-fit:contain; }
.lightbox-close { position:absolute; top:16px; right:16px; background:rgba(255,255,255,.1);
  border:1px solid rgba(255,255,255,.2); color:#fff; font-size:20px;
  width:48px; height:48px; display:flex; align-items:center; justify-content:center;
  cursor:pointer; border-radius:4px; }
.lightbox-close:hover { background:var(--acc); }
.lightbox-prev, .lightbox-next { position:absolute; top:50%; transform:translateY(-50%);
  background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); color:#fff;
  font-size:22px; width:52px; height:52px; display:flex; align-items:center; justify-content:center;
  cursor:pointer; border-radius:4px; }
.lightbox-prev:hover, .lightbox-next:hover { background:var(--acc); }
.lightbox-prev { left:16px; }
.lightbox-next { right:16px; }
.lightbox-counter { position:absolute; bottom:20px; left:50%; transform:translateX(-50%);
  font-family:'Share Tech Mono',monospace; font-size:13px; color:rgba(255,255,255,.6); }

/* ── PIT GRID ── */
.pit-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:8px; margin-top:8px; }
.pit-card { position:relative; padding:12px 10px; cursor:pointer; transition:all .18s; border:1px solid; }
.pit-empty { background:#111; border-color:#222; }
.pit-empty:hover { border-color:#444; background:#161616; }
.pit-done { background:rgba(220,38,38,.1); border-color:rgba(220,38,38,.5); }
.pit-done:hover { background:rgba(220,38,38,.18); border-color:#dc2626; }
.pit-num { font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:4px; }
.pit-empty .pit-num { color:#333; }
.pit-done .pit-num { color:rgba(220,38,38,.7); }
.pit-team { font-family:'Share Tech Mono',monospace; font-size:15px; font-weight:700; margin-bottom:2px; }
.pit-empty .pit-team { color:#444; }
.pit-done .pit-team { color:#fca5a5; }
.pit-name { font-size:10px; line-height:1.3; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.pit-empty .pit-name { color:#333; }
.pit-done .pit-name { color:#e2e8f0; }
.pit-check { position:absolute; top:6px; right:8px; color:#dc2626; font-size:12px; font-weight:700; }
.qual-nav { display:flex; align-items:center; gap:10px; margin-bottom:24px; flex-wrap:wrap; }
.qual-num-display {
  font-family:'Share Tech Mono',monospace; font-size:28px; font-weight:700;
  color:var(--acc); padding:8px 20px; background:var(--surf); border:1px solid var(--brd2);
  min-width:80px; text-align:center;
}
.qual-btn { padding:10px 18px; background:var(--surf); border:1px solid var(--brd2);
  color:var(--muted); font-family:'Rajdhani',sans-serif; font-size:15px; font-weight:700;
  letter-spacing:1px; transition:all .2s; }
.qual-btn:hover { border-color:var(--acc); color:var(--acc); }
.qual-btn:disabled { opacity:.3; cursor:not-allowed; }
.qual-jump { display:flex; gap:6px; align-items:center; margin-left:auto; }
.qual-jump input { background:var(--surf); border:1px solid var(--brd2); color:var(--txt);
  padding:8px 10px; width:80px; font-family:'Share Tech Mono',monospace; font-size:14px; outline:none; }
.qual-jump input:focus { border-color:var(--acc); }
.qual-dot { width:8px; height:8px; border-radius:50%; background:var(--brd2); display:inline-block; flex-shrink:0; }
.qual-dot.filled { background:var(--acc); }
.qual-dots { display:flex; gap:4px; flex-wrap:wrap; margin-bottom:20px; max-width:600px; }

.alliance-block { margin-bottom:20px; border-radius:0; }
.alliance-header { padding:10px 16px; font-family:'Rajdhani',sans-serif; font-size:13px;
  font-weight:700; letter-spacing:3px; text-transform:uppercase; display:flex; align-items:center; gap:12px; }
.alliance-header.red  { background:rgba(220,38,38,.2);  color:#fca5a5; border-left:3px solid var(--red); }
.alliance-header.blue { background:rgba(37,99,235,.2);  color:#93c5fd; border-left:3px solid var(--blue); }
.alliance-overall { margin-left:auto; font-family:'Share Tech Mono',monospace; font-size:18px; }
.alliance-overall.red  { color:#fca5a5; }
.alliance-overall.blue { color:#93c5fd; }

.match-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--brd); }
.match-robot { background:var(--surf); padding:14px 16px; }
.match-robot-label { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase;
  color:var(--muted); margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.match-robot-label span { font-family:'Share Tech Mono',monospace; font-size:11px; }
.match-fields { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.match-field { display:flex; flex-direction:column; gap:4px; }
.match-field label { font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:var(--muted); }
.match-notes { grid-column:1/-1; margin-top:8px; }
.match-notes textarea { width:100%; background:#0a0a0a; border:1px solid #2a2a2a; color:var(--txt);
  font-size:12px; padding:7px 10px; resize:none; height:54px; outline:none;
  font-family:'Barlow',sans-serif; transition:border-color .2s; }
.match-notes textarea:focus { border-color:var(--acc); }

.team-select { width:100%; background:#0a0a0a; border:1px solid #2a2a2a; color:var(--txt);
  font-size:12px; padding:7px 8px; outline:none; font-family:'Share Tech Mono',monospace;
  transition:border-color .2s; appearance:none; cursor:pointer; }
.team-select:focus { border-color:var(--acc); }
.team-select.red-sel  { border-color:rgba(220,38,38,.4); }
.team-select.blue-sel { border-color:rgba(37,99,235,.4); }
`;

// ── Setup ──────────────────────────────────────────────────────────────────
function Setup({ onConnect }) {
  const [url, setUrl] = useState(SUPABASE_URL !== "YOUR_SUPABASE_URL" ? SUPABASE_URL : "");
  const [key, setKey] = useState(SUPABASE_ANON_KEY !== "YOUR_ANON_KEY" ? SUPABASE_ANON_KEY : "");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_ANON_KEY")
      onConnect(SUPABASE_URL, SUPABASE_ANON_KEY);
  }, []);

  async function attempt() {
    setErr(""); setLoading(true);
    try {
      const r = await fetch(`${url.trim()}/rest/v1/scouting?select=count&limit=1`, {
        headers: { apikey: key.trim(), Authorization: `Bearer ${key.trim()}` }
      });
      if (r.status === 401) setErr("Geçersiz API key.");
      else if (r.status === 404) setErr("Tablo bulunamadı — önce SQL'i çalıştır.");
      else onConnect(url.trim(), key.trim());
    } catch { setErr("Bağlantı başarısız — URL'yi kontrol et."); }
    setLoading(false);
  }

  return (
    <div className="lw"><style>{CSS}</style><div className="lgrid" />
      <div className="lcard" style={{width:520}}>
        <div className="llogo"><TorchersLogo size={44}/><div>
          <div className="ltag">SETUP · ONE TIME</div>
          <TorchersText height={26} color="#ffffff" />
        </div></div>
        <p style={{fontSize:13,color:"var(--muted)",marginBottom:22,lineHeight:1.7}}>
          Supabase → <strong style={{color:"var(--txt)"}}>Project Settings → API</strong>
        </p>
        <label className="lbl">Project URL</label>
        <input className="inp" style={{marginBottom:14}} value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://xxxx.supabase.co" />
        <label className="lbl">Anon Public Key</label>
        <input className="inp" value={key} onChange={e=>setKey(e.target.value)} placeholder="eyJhbGci..." />
        <button className="btn-main" onClick={attempt} disabled={!url||!key||loading}>{loading?"BAĞLANIYOR…":"BAĞLAN"}</button>
        {err && <div className="err">{err}</div>}
        <div style={{marginTop:20}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--acc)",marginBottom:8}}>SUPABASE SQL EDITOR'DA ÇALIŞTIR</div>
          <div className="setup-sql">{`CREATE TABLE IF NOT EXISTS scouting (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  team_number int NOT NULL UNIQUE, team_name text, pit_number int,
  performance text, scoring text, shooter_type text,
  intake_type text, climb text, capacity text, notes text,
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
  const go = () => { if (pw === TEAM_PASSWORD) onLogin(); else { setErr("Yanlış şifre."); setPw(""); } };
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
        <input className="inp" type="password" value={pw}
          onChange={e=>{setPw(e.target.value);setErr("")}}
          onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Şifreyi gir…" />
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
    const handler = e => { if(e.key==="Escape") onClose(); if(e.key==="ArrowLeft") setIdx(i=>Math.max(0,i-1)); if(e.key==="ArrowRight") setIdx(i=>Math.min(urls.length-1,i+1)); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [urls.length, onClose]);
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      {idx > 0 && <button className="lightbox-prev" onClick={e=>{e.stopPropagation();setIdx(i=>i-1)}}>‹</button>}
      <img className="lightbox-img" src={urls[idx]} alt="" onClick={e=>e.stopPropagation()} />
      {idx < urls.length-1 && <button className="lightbox-next" onClick={e=>{e.stopPropagation();setIdx(i=>i+1)}}>›</button>}
      <div className="lightbox-counter">{idx+1} / {urls.length}</div>
    </div>
  );
}

// ── PhotoSection ───────────────────────────────────────────────────────────
function PhotoSection({ teamNumber, supabaseUrl, supabaseKey }) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const storageBase = `${supabaseUrl}/storage/v1`;
  const headers = { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` };
  const bucket = "robot-photos";
  const prefix = `team-${teamNumber}/`;

  useEffect(() => {
    if (!teamNumber) return;
    loadPhotos();
  }, [teamNumber]);

  async function loadPhotos() {
    try {
      const r = await fetch(`${storageBase}/object/list/${bucket}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ prefix, limit: 8, offset: 0 }),
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

  // Load all scouted team numbers for the grid
  useEffect(() => {
    api("/scouting?select=team_number").then(r=>r.json()).then(d=>{
      if (Array.isArray(d)) setScoutedSet(new Set(d.map(x=>x.team_number)));
    }).catch(()=>{});
  }, [api]);

  async function pick(t) {
    setSel(t); setStatus(null);
    try {
      const [scoutRes, matchRes] = await Promise.all([
        api(`/scouting?team_number=eq.${t.team}&select=*`),
        api(`/match_scouting?team_number=eq.${t.team}&select=*&order=qual_number.asc`),
      ]);
      const sd = await scoutRes.json();
      const md = await matchRes.json();
      if (sd?.[0]) {
        const s = sd[0];
        setForm({ performance:s.performance||"", scoring:s.scoring||"", shooter_type:s.shooter_type||"",
          intake_type:s.intake_type||"", climb:s.climb||"", capacity:s.capacity||"", notes:s.notes||"" });
        setExistingId(s.id);
      } else { setForm(BLANK_PIT); setExistingId(null); }
      setMatchHistory(Array.isArray(md) ? md : []);
    } catch { setForm(BLANK_PIT); setExistingId(null); setMatchHistory([]); }
  }

  async function save() {
    setStatus("saving");
    const payload = { team_number:sel.team, team_name:sel.name, pit_number:sel.pit, ...form, updated_at:new Date().toISOString() };
    try {
      const r = await api(`/scouting?on_conflict=team_number`, { method:"POST", body:JSON.stringify(payload), prefer:"resolution=merge-duplicates,return=representation" });
      if (!r.ok) throw new Error();
      setExistingId(true); setStatus("saved");
      setScoutedSet(prev => new Set([...prev, sel.team]));
      onSaved();
    } catch { setStatus("error"); }
  }

  async function clearData() {
    if (!existingId) { setForm(BLANK_PIT); setStatus(null); return; }
    setStatus("clearing");
    try {
      const r = await api(`/scouting?team_number=eq.${sel.team}`, { method:"DELETE", prefer:"" });
      if (!r.ok) throw new Error();
      setForm(BLANK_PIT); setExistingId(null); setStatus("cleared");
      setScoutedSet(prev => { const s = new Set(prev); s.delete(sel.team); return s; });
      onSaved();
    } catch { setStatus("error"); }
  }

  const f = k => v => setForm(p=>({...p,[k]:v}));

  // sorted by pit number
  const sortedTeams = [...TEAMS].sort((a,b) => a.pit - b.pit);

  if (!sel) {
    // ── PIT GRID ──
    const scouted = scoutedSet.size;
    return (
      <div>
        <div className="ph">
          <h2>Pit Scouting</h2>
          <p>Bir pit seç — <span style={{color:"var(--acc)"}}>{scouted}</span> / {TEAMS.length} tamamlandı</p>
        </div>
        <div className="pit-grid">
          {sortedTeams.map(t => {
            const done = scoutedSet.has(t.team);
            return (
              <div key={t.team} className={`pit-card ${done?"pit-done":"pit-empty"}`} onClick={() => pick(t)}>
                <div className="pit-num">PIT {t.pit}</div>
                <div className="pit-team">#{t.team}</div>
                <div className="pit-name">{t.name}</div>
                {done && <div className="pit-check">✓</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── TEAM PROFILE ──
  const matchScore = matchHistory.reduce((sum,r) =>
    sum + (parseFloat(r.auto_climb)||0) + (parseFloat(r.auto_score)||0) +
          (parseFloat(r.teleop_score)||0) + (parseFloat(r.teleop_climb)||0), 0);
  const avgMatchScore = matchHistory.length ? (matchScore / matchHistory.length).toFixed(1) : null;

  return (
    <div>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button onClick={()=>{setSel(null);setForm(BLANK_PIT);setStatus(null)}} style={{
          padding:"8px 16px", background:"none", border:"1px solid var(--brd2)", color:"var(--muted)",
          fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", cursor:"pointer", transition:"all .2s",
        }}
          onMouseEnter={e=>e.target.style.borderColor="#dc2626"}
          onMouseLeave={e=>e.target.style.borderColor="var(--brd2)"}
        >← Geri</button>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:22,color:"var(--acc)"}}>#{sel.team}</span>
            <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700}}>{sel.name}</span>
            {existingId && <span style={{fontSize:11,color:"var(--acc)",background:"rgba(220,38,38,.15)",padding:"2px 8px"}}>✓ SCOUTED</span>}
          </div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>Pit {sel.pit} · {sel.from}</div>
        </div>
        {avgMatchScore && (
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Share Tech Mono',monospace",fontSize:22,color:"var(--acc)"}}>{avgMatchScore}</div>
            <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1}}>MATCH AVG</div>
          </div>
        )}
      </div>

      {/* Pit Score summary if scouted */}
      {existingId && (
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}>
          {[["Performance",form.performance],["Scoring",form.scoring],["Climb",form.climb],
            ["Shooter",form.shooter_type],["Intake",form.intake_type],["Capacity",form.capacity]
          ].filter(([,v])=>v).map(([k,v])=>(
            <div key={k} style={{background:"var(--surf)",border:"1px solid var(--brd2)",padding:"5px 12px"}}>
              <div style={{fontSize:9,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>{k}</div>
              <div style={{fontSize:13,color:"var(--acc)",fontWeight:600,marginTop:2}}>{v}</div>
            </div>
          ))}
          <div style={{background:"rgba(220,38,38,.1)",border:"1px solid var(--acc)",padding:"5px 14px"}}>
            <div style={{fontSize:9,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>PIT SCORE</div>
            <div style={{fontSize:18,color:"var(--acc)",fontFamily:"'Share Tech Mono',monospace",fontWeight:700}}>{totalPitScore(form)}/16</div>
          </div>
        </div>
      )}

      {/* Match history */}
      {matchHistory.length > 0 && (
        <div style={{marginBottom:24}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:10}}>
            Match Geçmişi — {matchHistory.length} maç
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {matchHistory.map(m => {
              const s = (parseFloat(m.auto_climb)||0)+(parseFloat(m.auto_score)||0)+(parseFloat(m.teleop_score)||0)+(parseFloat(m.teleop_climb)||0);
              const allianceColor = m.alliance==="red" ? "#fca5a5" : "#93c5fd";
              return (
                <div key={m.id} style={{background:"var(--surf)",border:`1px solid ${m.alliance==="red"?"rgba(220,38,38,.3)":"rgba(37,99,235,.3)"}`,padding:"8px 12px",minWidth:80}}>
                  <div style={{fontSize:10,color:allianceColor,fontWeight:700,letterSpacing:1}}>QUAL {m.qual_number}</div>
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

      {/* Photos */}
      <PhotoSection teamNumber={sel.team} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />

      {/* Pit scout form */}
      <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:14,marginTop:8}}>
        Pit Scout Formu
      </div>
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
        }}
          onMouseEnter={e=>{e.target.style.borderColor="#ef4444";e.target.style.color="#f87171"}}
          onMouseLeave={e=>{e.target.style.borderColor="#2a2a2a";e.target.style.color="#64748b"}}
        >
          {status==="clearing"?"SİLİNİYOR…":"✕ TEMİZLE"}
        </button>
        {status==="saved"   && <span className="sok">✓ Kaydedildi!</span>}
        {status==="cleared" && <span style={{fontSize:13,color:"#94a3b8"}}>✓ Temizlendi</span>}
        {status==="error"   && <span className="serr">✗ Hata</span>}
      </div>
    </div>
  );
}

// ── Match Scouting ────────────────────────────────────────────────────────
const BLANK_ROBOT = { team_number:"", auto_climb:"", auto_score:"", teleop_score:"", teleop_climb:"", notes:"" };

function allianceOverall(robots) {
  return robots.reduce((sum, r) => {
    return sum + (parseFloat(r.auto_climb)||0) + (parseFloat(r.auto_score)||0) +
                 (parseFloat(r.teleop_score)||0) + (parseFloat(r.teleop_climb)||0);
  }, 0);
}

function MatchScouting({ api, onSaved }) {
  const [qual, setQual] = useState(1);
  const [jumpVal, setJumpVal] = useState("");
  const [matchData, setMatchData] = useState({});
  const [savedQuals, setSavedQuals] = useState(new Set());
  const [status, setStatus] = useState(null);
  const [loadedQuals, setLoadedQuals] = useState({});

  // Load all saved quals list
  useEffect(() => {
    api("/match_scouting?select=qual_number").then(r=>r.json()).then(d=>{
      if (Array.isArray(d)) setSavedQuals(new Set(d.map(x=>x.qual_number)));
    }).catch(()=>{});
  }, [api]);

  // Load current qual data
  useEffect(() => {
    if (loadedQuals[qual]) {
      setMatchData(loadedQuals[qual]);
      return;
    }
    api(`/match_scouting?qual_number=eq.${qual}&select=*`).then(r=>r.json()).then(rows=>{
      if (!Array.isArray(rows) || rows.length===0) { setMatchData({}); return; }
      const d = {};
      rows.forEach(row => { d[`${row.alliance}_${row.robot_slot}`] = { ...row }; });
      setMatchData(d);
      setLoadedQuals(prev => ({...prev, [qual]: d}));
    }).catch(()=>{});
  }, [qual, api]);

  function getRobot(alliance, slot) {
    return matchData[`${alliance}_${slot}`] || { ...BLANK_ROBOT };
  }

  function setRobot(alliance, slot, field, value) {
    const key = `${alliance}_${slot}`;
    setMatchData(prev => ({ ...prev, [key]: { ...(prev[key]||BLANK_ROBOT), [field]:value } }));
  }

  function getAllianceRobots(alliance) {
    return [1,2,3].map(s => getRobot(alliance, s));
  }

  async function saveQual() {
    setStatus("saving");
    try {
      const rows = [];
      for (const alliance of ["red","blue"]) {
        for (const slot of [1,2,3]) {
          const r = getRobot(alliance, slot);
          rows.push({
            qual_number: qual, alliance, robot_slot: slot,
            team_number: r.team_number ? parseInt(r.team_number) : null,
            auto_climb: parseFloat(r.auto_climb)||0,
            auto_score: parseFloat(r.auto_score)||0,
            teleop_score: parseFloat(r.teleop_score)||0,
            teleop_climb: parseFloat(r.teleop_climb)||0,
            notes: r.notes||"",
            updated_at: new Date().toISOString(),
          });
        }
      }
      const r = await api(`/match_scouting?on_conflict=qual_number,alliance,robot_slot`, {
        method:"POST", body:JSON.stringify(rows),
        prefer:"resolution=merge-duplicates,return=representation",
      });
      if (!r.ok) throw new Error();
      setSavedQuals(prev => new Set([...prev, qual]));
      setLoadedQuals(prev => ({...prev, [qual]: matchData}));
      setStatus("saved"); onSaved && onSaved();
    } catch { setStatus("error"); }
  }

  const redRobots  = getAllianceRobots("red");
  const blueRobots = getAllianceRobots("blue");
  const redOverall  = allianceOverall(redRobots);
  const blueOverall = allianceOverall(blueRobots);

  return (
    <div>
      <div className="ph"><h2>Match Scouting</h2><p>Qual bazında alliance skorlarını takip et</p></div>

      {/* Qual dots */}
      <div className="qual-dots">
        {Array.from({length:TOTAL_QUALS},(_,i)=>(
          <div key={i+1} className={`qual-dot ${savedQuals.has(i+1)?"filled":""}`}
            title={`Qual ${i+1}`} style={{cursor:"pointer"}} onClick={()=>setQual(i+1)} />
        ))}
      </div>

      {/* Nav */}
      <div className="qual-nav">
        <button className="qual-btn" onClick={()=>setQual(q=>Math.max(1,q-1))} disabled={qual<=1}>◀ PREV</button>
        <div className="qual-num-display">QUAL {qual}</div>
        <button className="qual-btn" onClick={()=>setQual(q=>Math.min(TOTAL_QUALS,q+1))} disabled={qual>=TOTAL_QUALS}>NEXT ▶</button>
        <div className="qual-jump">
          <input value={jumpVal} onChange={e=>setJumpVal(e.target.value)} placeholder="No" type="number" min="1" max={TOTAL_QUALS}
            onKeyDown={e=>{if(e.key==="Enter"){const n=parseInt(jumpVal);if(n>=1&&n<=TOTAL_QUALS){setQual(n);setJumpVal("");}}}} />
          <button className="qual-btn" onClick={()=>{const n=parseInt(jumpVal);if(n>=1&&n<=TOTAL_QUALS){setQual(n);setJumpVal("");}}}>GİT</button>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          <button className="btn-save" onClick={saveQual} disabled={status==="saving"}>{status==="saving"?"KAYDEDİLİYOR…":"KAYDET"}</button>
          {status==="saved" && <span className="sok">✓</span>}
          {status==="error" && <span className="serr">✗ Hata</span>}
        </div>
      </div>

      {/* RED Alliance */}
      <div className="alliance-block">
        <div className="alliance-header red">
          🔴 RED ALLIANCE
          <span className="alliance-overall red">Overall: {redOverall}</span>
        </div>
        <div className="match-grid">
          {[1,2,3].map(s => {
            const r = getRobot("red", s);
            return (
              <div key={s} className="match-robot">
                <div className="match-robot-label" style={{color:"#fca5a5"}}>
                  RED {s}
                  <select className="team-select red-sel" value={r.team_number||""}
                    onChange={e=>setRobot("red",s,"team_number",e.target.value)}
                    style={{marginLeft:8,flex:1}}>
                    <option value="">— Team —</option>
                    {TEAMS.map(t=><option key={t.team} value={t.team}>#{t.team} {t.name}</option>)}
                  </select>
                </div>
                <div className="match-fields">
                  {[["auto_climb","Auto Climb"],["auto_score","Auto Score"],["teleop_score","Teleop Score"],["teleop_climb","Teleop Climb"]].map(([field,label])=>(
                    <div className="match-field" key={field}>
                      <label>{label}</label>
                      <NumInput value={r[field]||""} onChange={v=>setRobot("red",s,field,v)} />
                    </div>
                  ))}
                  <div className="match-notes">
                    <label style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:4}}>Notes</label>
                    <textarea value={r.notes||""} onChange={e=>setRobot("red",s,"notes",e.target.value)} placeholder="Not…" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{height:12}} />

      {/* BLUE Alliance */}
      <div className="alliance-block">
        <div className="alliance-header blue">
          🔵 BLUE ALLIANCE
          <span className="alliance-overall blue">Overall: {blueOverall}</span>
        </div>
        <div className="match-grid">
          {[1,2,3].map(s => {
            const r = getRobot("blue", s);
            return (
              <div key={s} className="match-robot">
                <div className="match-robot-label" style={{color:"#93c5fd"}}>
                  BLUE {s}
                  <select className="team-select blue-sel" value={r.team_number||""}
                    onChange={e=>setRobot("blue",s,"team_number",e.target.value)}
                    style={{marginLeft:8,flex:1}}>
                    <option value="">— Team —</option>
                    {TEAMS.map(t=><option key={t.team} value={t.team}>#{t.team} {t.name}</option>)}
                  </select>
                </div>
                <div className="match-fields">
                  {[["auto_climb","Auto Climb"],["auto_score","Auto Score"],["teleop_score","Teleop Score"],["teleop_climb","Teleop Climb"]].map(([field,label])=>(
                    <div className="match-field" key={field}>
                      <label>{label}</label>
                      <NumInput value={r[field]||""} onChange={v=>setRobot("blue",s,field,v)} />
                    </div>
                  ))}
                  <div className="match-notes">
                    <label style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:4}}>Notes</label>
                    <textarea value={r.notes||""} onChange={e=>setRobot("blue",s,"notes",e.target.value)} placeholder="Not…" />
                  </div>
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
    if(sort==="perf") return totalPitScore(b)-totalPitScore(a);
    return 0;
  });

  return (
    <div>
      <div className="sbar">
        {[["Total Teams",TEAMS.length],["Scouted",scoutedNums.size],["Remaining",TEAMS.length-scoutedNums.size],["Coverage",Math.round(scoutedNums.size/TEAMS.length*100)+"%"]].map(([l,v])=>(
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
                <td style={{color:"var(--muted)",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={r.notes}>{r.notes||"—"}</td>
              </> : <td colSpan={7} style={{color:"var(--muted)",fontSize:12,fontStyle:"italic"}}>Henüz scouted değil</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Rankings ──────────────────────────────────────────────────────────────
function Rankings({ api, refreshKey }) {
  const [data, setData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [view, setView] = useState("pit");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!api) return;
    setError(null);
    Promise.all([
      api("/scouting?select=*").then(r=>r.json()).catch(()=>[]),
      api("/match_scouting?select=*").then(r=>r.json()).catch(()=>[]),
    ]).then(([pit, match]) => {
      setData(Array.isArray(pit) ? pit : []);
      setMatchData(Array.isArray(match) ? match : []);
    }).catch(e => setError(String(e)));
  }, [refreshKey]);

  if (error) return (
    <div className="nodata">
      <p style={{fontSize:16,marginBottom:6,color:"#f87171"}}>Hata oluştu</p>
      <span style={{fontSize:13}}>{error}</span>
    </div>
  );

  const pitRanked = data.map(r => {
    const t = TEAMS.find(x => x.team === r.team_number) || {};
    return {
      ...r,
      team_name: r.team_name || t.name || `Team ${r.team_number}`,
      pit: t.pit,
      score: totalPitScore(r),
    };
  }).sort((a, b) => b.score - a.score);

  const teamMatchScores = {};
  matchData.forEach(r => {
    if (!r.team_number) return;
    if (!teamMatchScores[r.team_number]) teamMatchScores[r.team_number] = { total:0, count:0 };
    const s = (parseFloat(r.auto_climb)||0)+(parseFloat(r.auto_score)||0)+(parseFloat(r.teleop_score)||0)+(parseFloat(r.teleop_climb)||0);
    teamMatchScores[r.team_number].total += s;
    teamMatchScores[r.team_number].count += 1;
  });
  const matchRanked = Object.entries(teamMatchScores).map(([tn, s]) => {
    const t = TEAMS.find(x => x.team === parseInt(tn)) || {};
    return { team_number:parseInt(tn), team_name:t.name||`Team ${tn}`, pit:t.pit, avg:s.total/s.count, total:s.total, count:s.count };
  }).sort((a, b) => b.avg - a.avg);

  const ranked = view === "pit" ? pitRanked : matchRanked;
  const max = view === "pit" ? (pitRanked[0]?.score || 1) : (matchRanked[0]?.avg || 1);

  return (
    <div>
      <div className="ph">
        <h2>Rankings</h2>
        <div style={{display:"flex",gap:8,marginTop:10}}>
          {[["pit","Pit Scouting"],["match","Match Avg"]].map(([k,l])=>(
            <button key={k} className={`sbtn ${view===k?"on":""}`} onClick={()=>setView(k)}>{l}</button>
          ))}
        </div>
      </div>
      {ranked.length === 0 ? (
        <div className="nodata">
          <p style={{fontSize:16,marginBottom:6}}>Veri yok</p>
          <span style={{fontSize:13}}>Önce scouting yap</span>
        </div>
      ) : (
        <div className="rlist">
          {ranked.map((r, i) => {
            const g = i===0?"g1":i===1?"g2":i===2?"g3":"";
            const score = view==="pit" ? r.score : r.avg;
            const scoreLabel = view==="pit" ? `${r.score}/16` : `${(r.avg||0).toFixed(1)} avg`;
            return (
              <div key={r.team_number} className={`rcard ${g}`}>
                <div className={`rpos ${g}`}>{i+1}</div>
                <div className="rinfo">
                  <div className="rn">{r.team_name}</div>
                  <div className="rm">#{r.team_number}{r.pit ? ` · Pit ${r.pit}` : ""}{view==="match" ? ` · ${r.count} maç` : ""}</div>
                  {view==="pit" && (
                    <div className="rpills">
                      <Pill label={r.performance}/>
                      <Pill label={r.scoring}/>
                      {r.climb && r.climb!=="None" && <Pill label={`Climb: ${r.climb}`}/>}
                    </div>
                  )}
                </div>
                <div className="rbar">
                  <div className="btrack"><div className="bfill" style={{width:`${(score/max)*100}%`}}/></div>
                  <div className="rval">{scoreLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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
        {tab==="match"     && <MatchScouting api={api} onSaved={()=>setRk(k=>k+1)} />}
        {tab==="dashboard" && <Dashboard     api={api} refreshKey={rk} />}
        {tab==="rankings"  && <Rankings      api={api} refreshKey={rk} />}
      </div>
    </div>
  );
}
