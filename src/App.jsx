import { useState, useEffect, useCallback } from "react";

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
const TEAM_PASSWORD = "torchers2026filik";

const LOGO_DATA_URI = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCALcAfMDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAMEBQIBCP/EADcQAQACAQIDBgMGBwACAwAAAAABAgMEERIhMQUiQVFhcROBoRQjMjRCsTNSU2JykcEkQ+Hw8f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD4yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABZ0WD4luO0dyPrIJNJp+5OS8c5jux/1SbTHyV4clq+U7A5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7ETM7RzmQd6fFOXJFY6eM+TVpWK1itY2iOiPS4oxY9v1TzmUoDM19eHUTPhaN2mqdpU3x1vH6Z2kFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABc7Pw7z8W0co5VVsNJyZIpHi1q1itYrEbRHQHoADnJWL0tSekxs6AY1omtprPWJ2l4tdoY+HJGSOluvuqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7w0nJkrSPGQXOz8XDSckxzt09lt5EREREcoh6AAAACPUY4y4pp4+HuypiYmYnlMNlQ7QxcNvi1jlPX3BUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXezcf4sk+0KTW09Ph4a18Yjn7gkAAAAAAc5KRek0t0l0Ax8tJx5JpbrDlo67D8SnHWO9X6wzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASaavHnpX15tZn9m13y2t5Q0AAAAAAAAAGdrcPw78dY7tvpLRc5KVvSa2jeJBjjvNjtiyTW3ynzcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv9mx93e3nOy2r9nxtp49ZlYAAAAAAAAAABFqcMZse36o6Sy7RNbTW0bTHVsqutwfEj4lI70dY8wZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANPQflq/P8AdOr6D8tHvKwAAAAAAAAAAAACjrtPtvlpHL9Uf9U20z9Zp/hzx0juT1jyBVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABodmz9zaPKy0o9mW716+kSvAAAAADyZiImZ6QRMTETE7xIPQAAAAAHkxExtPOHoDN1ennFbirzpP0V2zaItExMbxLN1WnnFbeOdJ6egIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT6K3DqK+U8mmxomYmJjrDXpaL0i0dJjcHQAAAINdbh09v7uSDQZ+GfhXnlP4XXac9ykeczKiDaFbRZ/iV4bT34+qyAAAAAAA8tEWrNbRvEvQGZqtPOKeKvOk/RA2bRFomJjeJZur084rbxzpPT0BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACxo8EZZtNvwxG3zBXHeXHbHeaW6x9XADQ7PvxYZpPWs/RnptHk+HnjfpPKQagAAAKPafXH81Nc7T64/mpg9paa2i1Z2mOjU02aM1N45THWGU7w5LYrxev/6DXHGHJXLSLVn/AOHYAAAAAADy1YtWa2jeJ6vQGXqcM4b7daz0lC182OuWk0t4/RlZaWx3mlusA5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa2nx/DxVp4+PuoaHHx54melebTBDqsMZqcuVo6SzLRNZmJjaYbKvqtPGWOKOV/PzBmjq9bUtNbRMS5Bq6bJ8TDW3j0n3SqPZlud6fNeAABT7TjuUnylRaXaFd9PM+UxLNAABJp8tsN+KOnjHm1Md65KRas7xLHS6fNbDfeOdZ6wDVHOO9b0i1Z3iXQAAAAAACvrcPxcfFWO/Xp6rADFFnXYvh5eKI7tv3VgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAexEzMRHWQaHZ9OHDxeNp+iy5pWKUrWPCNnQAAOMmOmSNr1iUE6HHvytaFoBFgw0wxPDvMz1mUoAAA4zV48Vq+cMhtMnUU4M96+vIEYAAAJtNntht51nrDSpat6xas7xLHTaXPOG3PnSesA1B5W0WrFqzvE9HoAAAAAAI9Rj+LitTx8PdkzG07S2mbr8fBnmY6W5grgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJtHXi1FPSd0K32bXfJa3lGwL4AAAAAAAAACj2lTa1ckePKV5Fq6ceC0eMRvAMoAAAAAFjR6j4VuG09yfo0mKuaHPttivP8AjP8AwF4AAAAABW7QpxYOLxrO6y5yV48dq+cbAxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF7syO5efWFFodm/wbf5f8gFoAAAAAAAAAAAGRlrwZbV8pcLGvjbUz6xEq4AAAAAANLR5/i04bT34+qwx8d7Y7xevWGriyVyY4vXx+gOwAAAAAZGeOHNePK0uE2tjbU3+X7IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGh2b/BtH93/GevdmT3bx6xILgAAAAAAAAAAAM/tL+PH+P/ZVVjtCd9RMeURCuAAAAAAAsaLN8PJwzPdt19FcBtCvosvxMW0z3q8pWAAAAAZmv/M2+X7IE2snfU3/APvghAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWuzrbZpjzqqpNNbgz0t6g1gAAAAAAAAAHlrRWs2mdoiN5es/W6iMn3dJ7sdZ8wV8lpve158Z3cgAAAAAAAACXS5PhZot4dJ9mqxWnosnHgjfrXlIJwAAcZ7cGG9vKAZeW3FlvbzmXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1tNf4mGtvHbafdIo9nZNrTjnx5wvAAAAg1mWcWLuztaZ2gE4yvtGb+pLyc2WeuS3+waszERvMxEeqHJqsNOluKfKGbMzM7zMz7vAT59Tky8vw18oQAAAAAAAAAAAAtdnX4c018LQqusVuDJW3lO4NgABU7RvtiinjaVtR1WLPlzTaKd2OUc4BTE/2XP8A0/rB9lz/AMn1gEAn+y5/6f1h59lz/wBP6wCES/Zs/wDTlxfHen4qWj3gHIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPaWmtotHWJ3a2K8ZMcXjxZCzoc3w78Fp7tvpINEABQ7Sn72tfKu6+odpR97WfOoKgAAAAAAAAJceDLf8ADSdvOeQIhcx6Gf1329IT00uGv6OKfUGbETM7REzPolpps1ulJj35NOtYrG1YiPaHoKFdDefxXrHtzS10WOPxWtP0WgEFdLgj9G/vKSuLFXpjrHydgAAAAAAAADy0RaJi0bxL0BkZa8GW1Y6ROzhJqJ3z3n+6UYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ5+Ovw7z3o6eq0xqzNZiYnaYaWlzxmrtPK8dYBOq9o04sMWj9MrTy9YtWaz0mNgYw6y0nHkmk9YlyAAAJcODJl/DXl5z0XMOjx05378/QFHHiyZJ7lZn1WsWi8clvlC5EREbRyegjx4cWP8NI38/FIAAAAAAAAAAAAAAAAACPPf4eK1/GI5e6RQ7Qy8V4xxPKvX3BUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdUtalotWdphyA09LqK5o2nleOsJ2NWZrMTE7TC/ptVF9q5JiLefhIGvw8dPiVjvV6+sM9tKeTR8Wbes8NJ5gp46WyW4aRMyvYNHWvPJ3p8vBPix0x14aRtDsAAAAAAAAAAAAAAAAAAAAAEefLTFXe08/CPMHOqzRhx7/AKp6QzJmZneecy6y5LZLze08/wBnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALuj0222TJHtAJdFGaMf3k8vCJ6rAAAAAAAAAAAAA8vaK1m09IjeQejNvq81pna3DHlEOftOf+pINQZX2jN/Ul7Gpzx/7J/1ANQZsavPH6on5OvtuXyp/oGgM/wC25f5af6l5OszT/LHyBoubWrWN7WiI9ZZltRmt1yT8uSOZmZ3mZmfUF7NrKxG2OOKfOeile9r24rzMy5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT6TD8XJz/BHUEuh0/FMZbxy/THmvPIiIjaOj0AAAAAV8urxU5Vnjn06KuTV5b8omKR6A0L3pSN72iPeUP2vHN60pE2mZ236QzpmZneZmZTaKvFqa+nMGmAAAAq9o22wxWP1StKPac88ce4KYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOqVm94rWN5lq4ccYscUj5z5q3Z2LaJyz48oXAAAAVdbqPhxwUnvT1nyB3qNTTFyjvW8lDNmyZZ71uXlHRGAAALfZsb5bW8oVF/syPu72852BbAAAAUO0/4lPZfZ/aU/fVj+0FUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7WJtaKx1mdoeLGgpxaiJ/ljcGhjrFKRWOkRs6AAAEefJGLFN5+XuyrTNrTaZ3meqxr8vHk4I/DX91YAAAABpaCNtNE+czLNa2mjbBSP7YBIAAAAzu0J/wDI9qw0WZrp/wDJt6bfsCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABd7Mjnkn2Ulzsy0cV6+MxEgvAAINZm+Fj2ie/bp6Pc+emKOc728oZuW9sl5vaecg5AAAAAAbNY2rEeUMnDG+Wkedoa4AAAADK1c76m/u1WTqJ3z5P8pBGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6pa1LRas7TDkBajW5Nvw1380eTU5r/q2j05IQAAAAAAAAE2jjfU0j13ajO7PjfUb+UTLRAAAAAY+Sd8lp9ZbDGnnMyDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFvsyPvLz5RsvqfZkd28+sLgAAAAPLcqzPoxmxk5Y7T6SxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaHZ0bYJnzstINDG2mr67/unAAAABxn/g3/xn9mQ1tR/Ayf4yyQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAauljbT09krjDG2KkeVYdgAAAAi1X5e/symrq/y1/ZlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xxvkrHnMA14jaIjyegAAAACHWflr+3/AFltPXflb/L92YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAk00b6jHH90I0+hjfU19N/2BpgAAAAAg1/5a3vDMaWv/AC1veGaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAs9nRvnmfKqsudmR37z6AvAAAAAAr6/8tPvDNa2oxfFx8HFtz6q19Dy7uTefWAUh7aJraazG0x1eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL/AGZH3d5852UGl2fG2nifOZkFgAAAAAAAGd2jWIzxaP1QrLfaf8SnsqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTRxtpqezLa+CNsNI/tgHYAAAAAAAM7tGd88R5VVkuqtxai8+uyIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsUjalY9GPHVtAAAAAAAOM1+DFa/lDtV7Rvtiin80gzwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe1/FHu2WNX8Ue7ZAAAAAAAZuvvxaiY8K8mhlvGPHa89IhkWmbWmZ6zO4PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6tpitjHO+Os+cQDoAAAAEWqzRhx7/qnpAK3aGXe0YqzyjnPupvZmZmZmd5l4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1dLPFp6T6bMpodnW3wzXykFoAAHlpitZtadogHl7VpSbWnaIZefLOXJNp6eEeTvVZ5zW2jlSOkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjQ5Ix5tpnlbkrgNoZ2HWXpXhtHHEdOfN3fXWmO7SIn1ncFzJeuOvFedoZ2p1Fs07RypHSEWS98luK9pmXIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==";

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
const SCORE_OPTS   = ["While Moving","Fixed Place","Fixed with image processing","None"];
const SHOOTER_OPTS = ["High Goal","Low Goal","Both","None"];
const INTAKE_OPTS  = ["Over Bumper","Under Bumper","Both","None"];
const CLIMB_OPTS   = ["L1 Middle","L1 Side","L2 Middle","L2 Side", "L3 Middle", "L3 Side"];
const CAP_OPTS     = ["Perfect (30+)","High (21-30)","Medium (11-20)","Low (5-10)","None"];
const BLANK_PIT = { performance:"", scoring:"", shooter_type:"", intake_type:"", climb:"", capacity:"", notes:"" };

const PERF_SCORE  = { Perfect:5, Good:4, Average:3, Poor:1, NG:0 };
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

function TorchersLogo({ size = 36 }) {
  return (
    <img
      src={LOGO_DATA_URI}
      alt="Torchers Logo"
      width={size}
      height={size}
      style={{ objectFit:"contain", filter:"invert(1) sepia(1) saturate(5) hue-rotate(320deg)" }}
    />
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

/* ── MATCH SCOUTING ── */
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
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:"#fff"}}>Connect Supabase</div>
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
CREATE POLICY "open" ON match_scouting FOR ALL USING (true) WITH CHECK (true);`}</div>
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

// ── Pit Scout ─────────────────────────────────────────────────────────────
function ScoutForm({ api, onSaved }) {
  const [q, setQ] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState(BLANK_PIT);
  const [existingId, setExistingId] = useState(null);
  const [status, setStatus] = useState(null);

  const filtered = TEAMS.filter(t =>
    t.name.toLowerCase().includes(q.toLowerCase()) || String(t.team).includes(q)
  ).slice(0,12);

  async function pick(t) {
    setSel(t); setQ(""); setShowDrop(false); setStatus(null);
    try {
      const r = await api(`/scouting?team_number=eq.${t.team}&select=*`);
      const d = await r.json();
      if (d?.[0]) {
        const s = d[0];
        setForm({ performance:s.performance||"", scoring:s.scoring||"", shooter_type:s.shooter_type||"",
          intake_type:s.intake_type||"", climb:s.climb||"", capacity:s.capacity||"", notes:s.notes||"" });
        setExistingId(s.id);
      } else { setForm(BLANK_PIT); setExistingId(null); }
    } catch { setForm(BLANK_PIT); setExistingId(null); }
  }

  async function save() {
    setStatus("saving");
    const payload = { team_number:sel.team, team_name:sel.name, pit_number:sel.pit, ...form, updated_at:new Date().toISOString() };
    try {
      const r = await api(`/scouting?on_conflict=team_number`, { method:"POST", body:JSON.stringify(payload), prefer:"resolution=merge-duplicates,return=representation" });
      if (!r.ok) throw new Error();
      setExistingId(true); setStatus("saved"); onSaved();
    } catch { setStatus("error"); }
  }

  async function clearData() {
    if (!existingId) { setForm(BLANK_PIT); setStatus(null); return; }
    setStatus("clearing");
    try {
      const r = await api(`/scouting?team_number=eq.${sel.team}`, { method:"DELETE", prefer:"" });
      if (!r.ok) throw new Error();
      setForm(BLANK_PIT); setExistingId(null); setStatus("cleared"); onSaved();
    } catch { setStatus("error"); }
  }

  const f = k => v => setForm(p=>({...p,[k]:v}));

  return (
    <div>
      <div className="ph"><h2>Pit Scouting</h2><p>Takım arama ve pit scouting verisi girme</p></div>
      {!sel ? (
        <div className="tsearch">
          <input value={q} onChange={e=>{setQ(e.target.value);setShowDrop(true)}} onFocus={()=>setShowDrop(true)} placeholder="Takım numarası veya ismiyle ara…" />
          {showDrop && q && (
            <div className="tdrop">
              {filtered.length ? filtered.map(t=>(
                <div key={t.team} className="topt" onClick={()=>pick(t)}>
                  <span className="tbadge">#{t.team}</span><span className="tname">{t.name}</span><span className="tfrom">{t.from}</span>
                </div>
              )) : <div style={{padding:"10px 16px",color:"var(--muted)",fontSize:13}}>Bulunamadı</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="scard">
          <div className="snum">#{sel.team}</div>
          <div><div className="sname">{sel.name}</div><div className="smeta">Pit {sel.pit} · {sel.from}{existingId?" · Kayıtlı ✓":""}</div></div>
          <button className="chg" onClick={()=>{setSel(null);setForm(BLANK_PIT);setStatus(null)}}>Değiştir</button>
        </div>
      )}
      {sel && (<>
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
      </>)}
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

  function RobotPanel({ alliance, slot }) {
    const r = getRobot(alliance, slot);
    const color = alliance==="red" ? "#fca5a5" : "#93c5fd";
    const borderColor = alliance==="red" ? "rgba(220,38,38,.3)" : "rgba(37,99,235,.3)";
    return (
      <div className="match-robot">
        <div className="match-robot-label" style={{color}}>
          {alliance.toUpperCase()} {slot}
          <select className={`team-select ${alliance}-sel`} value={r.team_number||""}
            onChange={e=>setRobot(alliance,slot,"team_number",e.target.value)}
            style={{marginLeft:8,flex:1}}>
            <option value="">— Team —</option>
            {TEAMS.map(t=><option key={t.team} value={t.team}>#{t.team} {t.name}</option>)}
          </select>
        </div>
        <div className="match-fields">
          {[["auto_climb","Auto Climb"],["auto_score","Auto Score"],["teleop_score","Teleop Score"],["teleop_climb","Teleop Climb"]].map(([field,label])=>(
            <div className="match-field" key={field}>
              <label>{label}</label>
              <NumInput value={r[field]||""} onChange={v=>setRobot(alliance,slot,field,v)} />
            </div>
          ))}
          <div className="match-notes">
            <label style={{fontSize:10,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"var(--muted)",display:"block",marginBottom:4}}>Notes</label>
            <textarea value={r.notes||""} onChange={e=>setRobot(alliance,slot,"notes",e.target.value)} placeholder="Not…" />
          </div>
        </div>
      </div>
    );
  }

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
          {[1,2,3].map(s=><RobotPanel key={s} alliance="red" slot={s} />)}
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
          {[1,2,3].map(s=><RobotPanel key={s} alliance="blue" slot={s} />)}
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

  useEffect(() => {
    api("/scouting?select=*").then(r=>r.json()).then(d=>setData(d||[])).catch(()=>{});
    api("/match_scouting?select=*").then(r=>r.json()).then(d=>setMatchData(d||[])).catch(()=>{});
  }, [refreshKey, api]);

  const pitRanked = data.map(r=>{
    const t = TEAMS.find(x=>x.team===r.team_number)||{};
    return { ...r, team_name: r.team_name||t.name||`Team ${r.team_number}`, pit: t.pit, score: totalPitScore(r) };
  }).sort((a,b)=>b.score-a.score);

  // Match rankings: avg score per team
  const teamMatchScores = {};
  matchData.forEach(r => {
    if (!r.team_number) return;
    if (!teamMatchScores[r.team_number]) teamMatchScores[r.team_number] = { total:0, count:0 };
    const s = (parseFloat(r.auto_climb)||0)+(parseFloat(r.auto_score)||0)+(parseFloat(r.teleop_score)||0)+(parseFloat(r.teleop_climb)||0);
    teamMatchScores[r.team_number].total += s;
    teamMatchScores[r.team_number].count += 1;
  });
  const matchRanked = Object.entries(teamMatchScores).map(([tn, s]) => {
    const t = TEAMS.find(x=>x.team===parseInt(tn))||{};
    return { team_number:parseInt(tn), team_name:t.name||`Team ${tn}`, pit:t.pit, avg:s.total/s.count, total:s.total, count:s.count };
  }).sort((a,b)=>b.avg-a.avg);

  const ranked = view==="pit" ? pitRanked : matchRanked;
  const max = view==="pit" ? (pitRanked[0]?.score||1) : (matchRanked[0]?.avg||1);

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
      {ranked.length===0 ? (
        <div className="nodata"><p style={{fontSize:16,marginBottom:6}}>Veri yok</p><span style={{fontSize:13}}>Önce scouting yap</span></div>
      ) : (
        <div className="rlist">
          {ranked.map((r,i)=>{
            const g = i===0?"g1":i===1?"g2":i===2?"g3":"";
            const score = view==="pit" ? r.score : r.avg;
            const scoreLabel = view==="pit" ? `${r.score}/16` : `${r.avg?.toFixed(1)} avg`;
            return (
              <div key={r.team_number} className={`rcard ${g}`}>
                <div className={`rpos ${g}`}>{i+1}</div>
                <div className="rinfo">
                  <div className="rn">{r.team_name}</div>
                  <div className="rm">#{r.team_number}{r.pit?` · Pit ${r.pit}`:""}{view==="match"?` · ${r.count} maç`:""}</div>
                  {view==="pit" && <div className="rpills"><Pill label={r.performance}/><Pill label={r.scoring}/>{r.climb&&r.climb!=="None"&&<Pill label={`Climb: ${r.climb}`}/>}</div>}
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
  const api = useCallback(creds ? makeApi(creds.url, creds.key) : null, [creds]);

  if (!creds)  return <Setup onConnect={(url,key)=>setCreds({url,key})} />;
  if (!authed) return <><style>{CSS}</style><Login onLogin={()=>setAuthed(true)} /></>;

  return (
    <div>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nbrand"><TorchersLogo size={32}/><span className="nbrand-text">TORCHERS</span></div>
        {[["pit","Pit Scout"],["match","Match Scout"],["dashboard","Dashboard"],["rankings","Rankings"]].map(([k,l])=>(
          <button key={k} className={`ntab ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
        <div className="nsp"/>
        <button className="nlock" onClick={()=>setAuthed(false)}>Kilitle</button>
      </nav>
      <div className="main">
        {tab==="pit"       && <ScoutForm     api={api} onSaved={()=>setRk(k=>k+1)} />}
        {tab==="match"     && <MatchScouting api={api} onSaved={()=>setRk(k=>k+1)} />}
        {tab==="dashboard" && <Dashboard     api={api} refreshKey={rk} />}
        {tab==="rankings"  && <Rankings      api={api} refreshKey={rk} />}
      </div>
    </div>
  );
}
