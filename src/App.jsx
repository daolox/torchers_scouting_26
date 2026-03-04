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
  return (PERF_SCORE[r.performance]||0) + (SCORE_SCORE[r.scoring]||0) + (CLIMB_SCORE[r.climb]||0);
}

// ── Components ────────────────────────────────────────────────────────────

function TorchersLogo({ size=24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <path d="M100 20 C60 70 40 110 40 140 C40 173 67 200 100 200 C133 200 160 173 160 140 C160 110 140 70 100 20Z" fill="#dc2626"/>
      <path d="M100 60 C80 90 70 115 70 135 C70 152 83 165 100 165 C117 165 130 152 130 135 C130 115 120 90 100 60Z" fill="#facc15"/>
      <rect x="80" y="160" width="40" height="20" rx="5" fill="#444"/>
    </svg>
  );
}

function TorchersText({ height=20, color="#fff" }) {
  return (
    <svg height={height} viewBox="0 0 400 60" fill="none">
      <g fill={color} style={{fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:48}}>
        <text x="0" y="45">TORCHERS</text>
        <text x="240" y="45" fill="#444">10415</text>
      </g>
    </svg>
  );
}

function Pill({ label, color }) {
  if (!label) return null;
  const good = ["Perfect","Excellent","High","High Goal","High (5+)","Ground","Both"];
  const mid  = ["Good","Average","Medium (3-4)","Human Player","Mid","Low Goal"];
  const isGood = good.includes(label);
  const isMid  = mid.includes(label);
  const bg = isGood ? "#065f46" : isMid ? "#92400e" : "#451a03";
  const fg = isGood ? "#34d399" : isMid ? "#fbbf24" : "#f87171";
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:bg,color:fg,textTransform:"uppercase",marginRight:4}}>{label}</span>;
}

// ── Shared API ────────────────────────────────────────────────────────────
function makeApi(url, key) {
  return async (path, opts={}) => {
    const r = await fetch(`${url}/rest/v1${path}`, {
      ...opts,
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        ...opts.headers
      }
    });
    if (!r.ok) throw new Error(r.statusText);
    return r.json();
  };
}

// ── Components: Pit Scout ─────────────────────────────────────────────────

function PhotoSection({ teamNumber, supabaseUrl, supabaseKey }) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState(null);

  const bucket = "robot-photos";
  const prefix = `${teamNumber}/`;
  const storageBase = `${supabaseUrl}/storage/v1`;

  useEffect(() => { load(); }, [teamNumber]);

  async function load() {
    try {
      const r = await fetch(`${storageBase}/object/list/${bucket}`, {
        method: "POST",
        headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ prefix, limit: 10, sortBy: { column: "name", order: "desc" }, offset: 0 }),
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
    setUploading(true);
    for (const f of files) {
      const name = `${Date.now()}_${f.name}`;
      try {
        await fetch(`${storageBase}/object/${bucket}/${prefix}${name}`, {
          method: "POST",
          headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` },
          body: f
        });
      } catch {}
    }
    await load();
    setUploading(false);
  }

  return (
    <div style={{marginTop:32}}>
      <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:2,marginBottom:12}}>Robot Fotoğrafları</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:12}}>
        <label className={`photo-upload-btn ${uploading?"photo-uploading":""}`}>
          <input type="file" accept="image/*" multiple onChange={upload} hidden disabled={uploading} />
          <span>{uploading ? "..." : "+"}</span>
        </label>
        {photos.map(u => (
          <div key={u} className="photo-thumb" onClick={()=>setSelected(u)}>
            <img src={u} alt="Robot" />
          </div>
        ))}
      </div>
      {selected && <div className="lightbox" onClick={()=>setSelected(null)}><img src={selected} alt="Robot Large" /></div>}
    </div>
  );
}

function ScoutForm({ api, supabaseUrl, supabaseKey, onSaved, scoutedSet }) {
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState(BLANK_PIT);
  const [status, setStatus] = useState("idle");
  const [search, setSearch] = useState("");
  const [existingId, setExistingId] = useState(false);

  useEffect(() => {
    if (sel) loadExisting();
  }, [sel]);

  async function loadExisting() {
    try {
      const data = await api(`/scouting?team_number=eq.${sel.team}&select=*`);
      if (data && data[0]) {
        setForm(data[0]);
        setExistingId(true);
      } else {
        setForm(BLANK_PIT);
        setExistingId(false);
      }
    } catch {
      setForm(BLANK_PIT);
      setExistingId(false);
    }
  }

  async function save() {
    setStatus("saving");
    const payload = { ...form, team_number: sel.team, team_name: sel.name, pit_number: sel.pit, updated_at: new Date().toISOString() };
    try {
      const r = await api(`/scouting?on_conflict=team_number`, {
        method: "POST",
        body: JSON.stringify(payload),
        prefer: "resolution=merge-duplicates,return=representation"
      });
      if (!r.ok) throw new Error();
      setExistingId(true);
      setStatus("saved");
      setScoutedSet(prev => new Set([...prev, sel.team]));
      onSaved();
    } catch {
      setStatus("error");
    }
  }

  const filtered = TEAMS.filter(t => t.team.toString().includes(search) || t.name.toLowerCase().includes(search.toLowerCase()));

  if (!sel) {
    return (
      <div>
        <div className="fbar">
          <input className="inp" placeholder="Takım ara..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="grid">
          {filtered.map(t => (
            <div key={t.team} className={`card ${scoutedSet.has(t.team)?"scouted":""}`} onClick={()=>setSel(t)}>
              <div className="ct">#{t.team}</div>
              <div className="cn">{t.name}</div>
              <div className="cl">Pit {t.pit} — {t.from}</div>
              {scoutedSet.has(t.team) && <div className="cchk">✓ Tamam</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="scout-profile">
      <div className="ph" style={{display:"flex",alignItems:"center",gap:20,marginBottom:24}}>
        <div style={{flex:1}}>
          <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1}}>{sel.from}</div>
          <div style={{fontSize:32,fontWeight:700,color:"var(--acc)",lineHeight:1}}>#{sel.team}</div>
          <div style={{fontSize:16,fontWeight:500}}>{sel.name}</div>
        </div>
        <button className="btn-sec" onClick={()=>setSel(null)}>Geri Dön</button>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:32}}>
        <div style={{flex:1,background:"var(--surf)",border:"1px solid var(--brd)",padding:24,borderRadius:12}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:14,marginTop:8}}> Pit Scout Formu </div>
          <div className="form">
            <div className="fi"><label>Genel Performans</label><select value={form.performance} onChange={e=>setForm({...form,performance:e.target.value})}><option value="">Seçiniz...</option>{PERF_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
            <div className="fi"><label>Skor Potansiyeli</label><select value={form.scoring} onChange={e=>setForm({...form,scoring:e.target.value})}><option value="">Seçiniz...</option>{SCORE_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
            <div className="fi"><label>Shooter Tipi</label><select value={form.shooter_type} onChange={e=>setForm({...form,shooter_type:e.target.value})}><option value="">Seçiniz...</option>{SHOOTER_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
            <div className="fi"><label>Intake Tipi</label><select value={form.intake_type} onChange={e=>setForm({...form,intake_type:e.target.value})}><option value="">Seçiniz...</option>{INTAKE_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
            <div className="fi"><label>Climb</label><select value={form.climb} onChange={e=>setForm({...form,climb:e.target.value})}><option value="">Seçiniz...</option>{CLIMB_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
            <div className="fi"><label>Kapasite</label><select value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})}><option value="">Seçiniz...</option>{CAP_OPTS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
            <div className="fi" style={{gridColumn:"1/-1"}}><label>Notlar</label><textarea rows={4} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} /></div>
          </div>
          <button className="btn-main" onClick={save} disabled={status==="saving"}>{status==="saving"?"Kaydediliyor...":"Değişiklikleri Kaydet"}</button>
          {status==="saved" && <div style={{color:"#10b981",fontSize:12,textAlign:"center",marginTop:8}}>Başarıyla kaydedildi!</div>}
          {status==="error" && <div style={{color:"#ef4444",fontSize:12,textAlign:"center",marginTop:8}}>Hata oluştu!</div>}
        </div>

        <PhotoSection teamNumber={sel.team} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />
      </div>
    </div>
  );
}

// ── Components: Match Scout ───────────────────────────────────────────────

function MatchScout({ api, onSaved, loadedQuals, setLoadedQuals, scoutedQuals, setScoutedQuals }) {
  const [qual, setQual] = useState(1);
  const [matchData, setMatchData] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (loadedQuals[qual]) setMatchData(loadedQuals[qual]);
    else loadMatch();
  }, [qual]);

  async function loadMatch() {
    try {
      const data = await api(`/matches?qual_number=eq.${qual}&select=*`);
      const full = [];
      for (const alliance of ["red","blue"]) {
        for (let slot=1; slot<=3; slot++) {
          const existing = data.find(d => d.alliance === alliance && d.robot_slot === slot);
          full.push(existing || { qual_number: qual, alliance, robot_slot: slot, team_number: 0, auto_climb: 0, auto_score: 0, teleop_score: 0, teleop_climb: 0, notes: "" });
        }
      }
      setMatchData(full);
    } catch {}
  }

  function update(idx, field, val) {
    const next = [...matchData];
    next[idx] = { ...next[idx], [field]: val };
    setMatchData(next);
  }

  async function save() {
    setStatus("saving");
    try {
      for (const row of matchData) {
        await api(`/matches?on_conflict=qual_number,alliance,robot_slot`, {
          method: "POST",
          body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }),
          prefer: "resolution=merge-duplicates"
        });
      }
      setScoutedQuals(prev => new Set([...prev, qual]));
      setLoadedQuals(prev => ({...prev, [qual]: matchData}));
      setStatus("saved");
      onSaved && onSaved();
    } catch { setStatus("error"); }
  }

  const getAllianceRobots = (a) => matchData.filter(d => d.alliance === a).sort((a,b)=>a.robot_slot-b.robot_slot);
  const allianceOverall = (robots) => robots.reduce((acc, r) => ({
    auto: acc.auto + (Number(r.auto_score)||0) + (Number(r.auto_climb)||0),
    tele: acc.tele + (Number(r.teleop_score)||0) + (Number(r.teleop_climb)||0)
  }), { auto:0, tele:0 });

  const redRobots = getAllianceRobots("red");
  const blueRobots = getAllianceRobots("blue");
  const redOverall = allianceOverall(redRobots);
  const blueOverall = allianceOverall(blueRobots);

  return (
    <div>
      <div className="ph"><h2>Match Scouting</h2><p>Qual bazlı robot performans takibi</p></div>
      <div className="fbar" style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <label style={{fontSize:12,fontWeight:700}}>QUAL #</label>
          <input type="number" className="inp" style={{width:80}} value={qual} onChange={e=>setQual(Number(e.target.value))} />
          {scoutedQuals.has(qual) && <span style={{color:"#10b981",fontSize:11}}>✓ Scoutlandı</span>}
        </div>
      </div>

      <div style={{display:"grid", gap:24}}>
        <AllianceBlock color="#ef4444" title="Red Alliance" robots={redRobots} overall={redOverall} startIdx={0} onUpdate={update} />
        <AllianceBlock color="#3b82f6" title="Blue Alliance" robots={blueRobots} overall={blueOverall} startIdx={3} onUpdate={update} />
      </div>

      <div style={{marginTop:32, display:"flex", alignItems:"center", gap:16}}>
        <button className="btn-main" style={{maxWidth:300}} onClick={save} disabled={status==="saving"}>{status==="saving"?"Kaydediliyor...":"Qual Verilerini Kaydet"}</button>
        {status==="saved" && <span style={{color:"#10b981",fontWeight:700}}>✓ Kaydedildi</span>}
      </div>
    </div>
  );
}

function AllianceBlock({ color, title, robots, overall, startIdx, onUpdate }) {
  return (
    <div style={{border:`1px solid var(--brd)`, borderRadius:8, overflow:"hidden"}}>
      <div style={{background:color, color:"#fff", padding:"8px 16px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <span style={{fontWeight:800, textTransform:"uppercase", letterSpacing:1}}>{title}</span>
        <span style={{fontSize:12, fontWeight:700}}>Alliance Tot: {overall.auto}A / {overall.tele}T</span>
      </div>
      <div className="match-grid">
        {robots.map((r, i) => (
          <div key={i} className="match-robot">
            <div className="match-robot-label">ROBOT {r.robot_slot}</div>
            <input type="number" className="match-team-inp" placeholder="Team #" value={r.team_number||""} onChange={e=>onUpdate(startIdx+i,"team_number",Number(e.target.value))} />
            <div className="match-sec">
              <label>Auto Score</label><input type="number" value={r.auto_score} onChange={e=>onUpdate(startIdx+i,"auto_score",Number(e.target.value))} />
              <label>Auto Climb</label><input type="number" value={r.auto_climb} onChange={e=>onUpdate(startIdx+i,"auto_climb",Number(e.target.value))} />
              <label>Teleop Score</label><input type="number" value={r.teleop_score} onChange={e=>onUpdate(startIdx+i,"teleop_score",Number(e.target.value))} />
              <label>Teleop Climb</label><input type="number" value={r.teleop_climb} onChange={e=>onUpdate(startIdx+i,"teleop_climb",Number(e.target.value))} />
            </div>
            <textarea placeholder="Notes..." value={r.notes} onChange={e=>onUpdate(startIdx+i,"notes",e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard & Rankings ──────────────────────────────────────────────────

function Dashboard({ scouting, matches }) {
  const stats = [
    { l:"Scoutlanan Takım", v:scouting.length },
    { l:"Toplam Maç Kaydı", v:matches.length },
    { l:"Qual Kapsamı", v:`%${Math.round((new Set(matches.map(m=>m.qual_number)).size / TOTAL_QUALS)*100)}` },
    { l:"Ort. Pit Puanı", v:(scouting.reduce((a,b)=>a+totalPitScore(b),0)/(scouting.length||1)).toFixed(1) }
  ];

  const recent = [...matches].sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at)).slice(0,10);

  return (
    <div>
      <div className="ph"><h2>Dashboard</h2><p>Anlık etkinlik özeti</p></div>
      <div className="stats">
        {stats.map(({l,v}) => (
          <div className="sc" key={l}><div className="scn">{v}</div><div className="scl">{l}</div></div>
        ))}
      </div>
      <div style={{marginTop:40}}>
        <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:2,marginBottom:16}}>Son Aktivite</div>
        <div style={{background:"var(--surf)", border:"1px solid var(--brd)", borderRadius:8}}>
          {recent.map((m,i)=>(
            <div key={i} style={{padding:"12px 16px", borderBottom:i===recent.length-1?"none":"1px solid var(--brd)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div>
                <div style={{fontSize:13,fontWeight:700}}>#{m.team_number} <span style={{color:"var(--muted)", fontWeight:500}}>— Qual {m.qual_number}</span></div>
                <div style={{fontSize:10,color:"var(--muted)",marginTop:2}}>{new Date(m.updated_at).toLocaleTimeString()}</div>
              </div>
              <div style={{fontSize:14, fontWeight:700, color:m.alliance==="red"?"#ef4444":"#3b82f6"}}>{m.auto_score+m.teleop_score} PTS</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Rankings({ scouting, matches }) {
  const [search, setSearch] = useState("");
  const teamStats = TEAMS.map(t => {
    const pit = scouting.find(s => s.team_number === t.team);
    const m   = matches.filter(m => m.team_number === t.team);
    const avgScore = m.length ? (m.reduce((a,b)=>a+(Number(b.auto_score)||0)+(Number(b.teleop_score)||0),0)/m.length) : 0;
    const avgClimb = m.length ? (m.reduce((a,b)=>a+(Number(b.auto_climb)||0)+(Number(b.teleop_climb)||0),0)/m.length) : 0;
    return { ...t, pit, avgScore, avgClimb, mCount: m.length };
  }).sort((a,b) => (b.avgScore+b.avgClimb) - (a.avgScore+a.avgClimb));

  const filtered = teamStats.filter(t => t.team.toString().includes(search) || t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="ph"><h2>Takım Sıralamaları</h2><p>Match scouting verilerine göre performans analizi</p></div>
      <div className="fbar"><input className="inp" placeholder="Takım ara..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
      <div className="grid">
        {filtered.map(t => (
          <div key={t.team} className="card" style={{cursor:"default", borderTop:t.mCount>0?`2px solid var(--acc)`:`1px solid var(--brd)`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div className="ct">#{t.team}</div>
                <div className="cn">{t.name}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:20,fontWeight:800,color:"var(--acc)"}}>{(t.avgScore+t.avgClimb).toFixed(1)}</div>
                <div style={{fontSize:9,color:"var(--muted)",textTransform:"uppercase"}}>Avg Pts</div>
              </div>
            </div>
            <div className="rpills" style={{marginTop:12}}>
              <Pill label={t.pit?.performance} />
              <Pill label={t.pit?.climb} />
            </div>
            <div style={{marginTop:12, paddingTop:12, borderTop:"1px solid var(--brd)", display:"flex", gap:16}}>
              <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700}}>{t.avgScore.toFixed(1)}</div><div style={{fontSize:8,color:"var(--muted)"}}>AVG SCORE</div></div>
              <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700}}>{t.avgClimb.toFixed(1)}</div><div style={{fontSize:8,color:"var(--muted)"}}>AVG CLIMB</div></div>
              <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700}}>{t.mCount}</div><div style={{fontSize:8,color:"var(--muted)"}}>MATCHES</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Auth ──────────────────────────────────────────────────────────────────

function Setup({ onConnect }) {
  const [url, setUrl] = useState(SUPABASE_URL !== "YOUR_SUPABASE_URL" ? SUPABASE_URL : "");
  const [key, setKey] = useState(SUPABASE_ANON_KEY !== "YOUR_ANON_KEY" ? SUPABASE_ANON_KEY : "");
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <TorchersLogo size={60} />
        <h1 style={{marginTop:20}}>Supabase Bağlantısı</h1>
        <p style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>Uygulamanın çalışması için veritabanı bilgilerini girin.</p>
        <div className="fi"><label>Project URL</label><input className="inp" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://xyz.supabase.co" /></div>
        <div className="fi"><label>Anon Public Key</label><input className="inp" value={key} onChange={e=>setKey(e.target.value)} placeholder="eyJhbGci..." /></div>
        <button className="btn-main" style={{marginTop:10}} onClick={()=>onConnect(url,key)} disabled={!url||!key}>Bağlan</button>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const check = () => { if (pass === TEAM_PASSWORD) onLogin(); else setErr(true); };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <TorchersLogo size={60} />
        <h1 style={{marginTop:20,marginBottom:8}}>Giriş Yap</h1>
        <p style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>Team 10415 Scouting App</p>
        <div className="fi"><label>Takım Şifresi</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} /></div>
        {err && <div style={{color:"#ef4444",fontSize:12,marginTop:8}}>Hatalı şifre!</div>}
        <button className="btn-main" style={{marginTop:16}} onClick={check}>Giriş</button>
      </div>
    </div>
  );
}

// ── Main Style ────────────────────────────────────────────────────────────

const CSS = `
:root {
  --bg: #0a0a0a; --surf: #141414; --brd: #262626; --txt: #fafafa; --muted: #a3a3a3; --acc: #dc2626;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--txt); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
.nav { height: 64px; background: var(--surf); border-bottom: 1px solid var(--brd); display: flex; align-items: center; padding: 0 24px; position: sticky; top: 0; z-index: 100; gap: 8px; }
.nbrand { display: flex; align-items: center; gap: 12px; margin-right: 24px; }
.ntab { background: none; border: none; color: var(--muted); padding: 8px 16px; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 6px; transition: .2s; }
.ntab:hover { color: var(--txt); background: var(--brd); }
.ntab.on { color: var(--acc); background: #dc262615; }
.nsp { flex: 1; }
.nlock { background: var(--brd); border: none; color: var(--txt); padding: 6px 12px; font-size: 12px; border-radius: 4px; cursor: pointer; }
.main { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
.ph { margin-bottom: 32px; }
.ph h2 { margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700; text-transform: uppercase; }
.ph p { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
.fbar { margin-bottom: 24px; }
.inp { background: var(--surf); border: 1px solid var(--brd); color: var(--txt); padding: 12px 16px; border-radius: 8px; font-size: 14px; width: 100%; transition: border-color .2s; }
.inp:focus { border-color: var(--acc); outline: none; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.card { background: var(--surf); border: 1px solid var(--brd); padding: 20px; border-radius: 12px; cursor: pointer; transition: .2s; position: relative; }
.card:hover { border-color: var(--acc); transform: translateY(-2px); }
.card.scouted { background: #065f4608; border-color: #065f46; }
.ct { font-family: 'Share Tech Mono', monospace; font-size: 24px; font-weight: 700; color: var(--acc); }
.cn { font-size: 16px; fontWeight: 600; margin: 4px 0; }
.cl { font-size: 12px; color: var(--muted); }
.cchk { position: absolute; top: 20px; right: 20px; font-size: 10px; font-weight: 800; color: #10b981; text-transform: uppercase; }
.btn-main { background: var(--acc); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; width: 100%; transition: opacity .2s; }
.btn-main:disabled { opacity: 0.5; }
.btn-sec { background: var(--brd); color: var(--txt); border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
.form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.fi label { display: block; font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; }
.fi select, .fi textarea { background: var(--bg); border: 1px solid var(--brd); color: var(--txt); padding: 10px; border-radius: 6px; width: 100%; font-size: 14px; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.sc { background: var(--surf); border: 1px solid var(--brd); padding: 24px; border-radius: 12px; text-align: center; }
.scn { font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700; color: var(--acc); }
.scl { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-top: 4px; }
.auth-wrap { height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 20px; }
.auth-card { background: var(--surf); border: 1px solid var(--brd); padding: 40px; border-radius: 20px; width: 100%; max-width: 400px; text-align: center; }
.photo-upload-btn { background: var(--brd); border: 2px dashed var(--brd); height: 100px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--muted); }
.photo-upload-btn:hover { border-color: var(--acc); color: var(--acc); }
.photo-thumb { height: 100px; border-radius: 8px; overflow: hidden; border: 1px solid var(--brd); cursor: pointer; }
.photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 40px; }
.lightbox img { max-width: 100%; max-height: 100%; border-radius: 8px; box-shadow: 0 0 40px rgba(0,0,0,0.5); }
.match-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--brd); }
.match-robot { background: var(--surf); padding: 16px; }
.match-robot-label { font-size: 10px; font-weight: 800; color: var(--muted); margin-bottom: 8px; }
.match-team-inp { background: var(--bg); border: 1px solid var(--brd); color: var(--acc); font-family: 'Share Tech Mono'; font-size: 20px; width: 100%; padding: 8px; margin-bottom: 12px; }
.match-sec { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
.match-sec label { font-size: 9px; color: var(--muted); text-transform: uppercase; }
.match-sec input { background: var(--bg); border: 1px solid var(--brd); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 13px; }
.match-robot textarea { background: var(--bg); border: 1px solid var(--brd); color: var(--txt); width: 100%; padding: 8px; font-size: 12px; height: 60px; border-radius: 4px; }
@media (max-width: 768px) {
  .nav { padding: 0 12px; gap: 4px; }
  .nbrand { margin-right: 8px; }
  .ntab { padding: 6px 8px; font-size: 12px; }
  .stats { grid-template-columns: 1fr 1fr; }
  .form { grid-template-columns: 1fr; }
  .match-grid { grid-template-columns: 1fr; }
}
`;

// ── Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [creds, setCreds]   = useState(null);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab]       = useState("pit");
  const [rk, setRk]         = useState(0);
  const [scoutedSet, setScoutedSet] = useState(new Set());
  const [scoutedQuals, setScoutedQuals] = useState(new Set());
  const [loadedQuals, setLoadedQuals] = useState({});
  const [dbData, setDbData] = useState({ scouting: [], matches: [] });

  const api = creds ? makeApi(creds.url, creds.key) : null;

  useEffect(() => {
    if (api) fetchData();
  }, [creds, rk]);

  async function fetchData() {
    try {
      const s = await api("/scouting?select=*");
      const m = await api("/matches?select=*");
      setDbData({ scouting: s, matches: m });
      setScoutedSet(new Set(s.map(i => i.team_number)));
      setScoutedQuals(new Set(m.map(i => i.qual_number)));
    } catch {}
  }

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
        {tab==="pit"       && <ScoutForm     api={api} supabaseUrl={creds.url} supabaseKey={creds.key} onSaved={()=>setRk(k=>k+1)} scoutedSet={scoutedSet} />}
        {tab==="match"     && <MatchScout     api={api} onSaved={()=>setRk(k=>k+1)} loadedQuals={loadedQuals} setLoadedQuals={setLoadedQuals} scoutedQuals={scoutedQuals} setScoutedQuals={setScoutedQuals} />}
        {tab==="dashboard" && <Dashboard     scouting={dbData.scouting} matches={dbData.matches} />}
        {tab==="rankings"  && <Rankings      scouting={dbData.scouting} matches={dbData.matches} />}
      </div>
    </div>
  );
}
