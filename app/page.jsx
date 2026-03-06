"use client";
import { useState, useEffect, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const GA_ID = "G-J830KZ50Q6";
const CALENDLY_URL = "https://calendly.com/skvad/30min";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ico = ({ d, w=20, h=20, ...p }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" {...p}>{d}</svg>
);
const IcArrow    = () => <Ico w={18} h={18} d={<path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}/>;
const IcCheck    = () => <Ico w={16} h={16} d={<path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>}/>;
const IcStar     = () => <svg width={13} height={13} viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/></svg>;
const IcCode     = () => <Ico w={22} h={22} d={<path d="M7 8L3 11l4 3M15 8l4 3-4 3M13 5l-4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}/>;
const IcRocket   = () => <Ico w={22} h={22} d={<><path d="M4.5 13.5s-1 0-1.5 1.5S2 19 2 19s3.5-.5 5-1 1.5-1.5 1.5-1.5M11 4c-4 4-5 8-5 8l4 4s4-1 8-5c3-3 3-8 0-7s-4 0-7 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="14" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.8"/></>}/>;
const IcBolt     = () => <Ico w={22} h={22} d={<path d="M13 2L4 13h7l-2 7 9-11h-7l2-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}/>;
const IcBrush    = () => <Ico w={22} h={22} d={<path d="M13.5 3.5l5 5-10 10-5-1-1-5 10-10zM16 6l-10 10M3 19c1-2 2-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}/>;
const IcMail     = () => <Ico d={<><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M2 6l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>}/>;
const IcPhone    = () => <Ico d={<path d="M3 3h4l2 4.5-2.5 1.5a11 11 0 005 5l1.5-2.5L17 13.5V17a1 1 0 01-1 1C8 18 2 12 2 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>}/>;
const IcEye      = () => <Ico w={16} h={16} d={<><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/></>}/>;
const IcCalendar = () => <Ico d={<><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M6 2v4M14 2v4M2 9h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>}/>;
const IcQuote    = () => (
  <svg width={26} height={20} viewBox="0 0 28 22" fill="none">
    <path d="M0 22V13.4C0 9.533.933 6.4 2.8 4 4.667 1.6 7.2.267 10.4 0l1.2 2.4C9.467 2.933 7.933 4 6.8 5.6 5.667 7.2 5.1 9.067 5.1 11.2H10V22H0zm15 0V13.4c0-3.867.933-7 2.8-9.4C19.667 1.6 22.2.267 25.4 0l1.2 2.4c-2.133.533-3.667 1.6-4.8 3.2-1.133 1.6-1.7 3.467-1.7 5.6H25V22H15z" fill="currentColor" opacity=".12"/>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: <IcCode/>,   title: "WordPress & Webflow",       desc: "6–8 oldalas, gyorsan elkészülő weboldalak — a designtól az éles deployig. Tökéletes vállalati és marketing oldalakhoz." },
  { icon: <IcRocket/>, title: "Next.js & React portálok",  desc: "Összetett, egyedi webes alkalmazások nagy teljesítménnyel és skálázható frontend architektúrával." },
  { icon: <IcBolt/>,   title: "Laravel backend fejlesztés",desc: "Egyedi API-k, admin felületek, komplex üzleti logika — megbízható, jól karbantartható PHP alapon." },
  { icon: <IcBrush/>,  title: "UI/UX Design & Stratégia", desc: "Intuitív, magával ragadó megjelenés, ami valódi márkaértéket és ügyfélélményt teremt. Wireframe-től a végleges UI designig." },
];

const PARTNERS = ["MOME","MNB","Erste","Viessmann","Ogilvy","BASF","HBO","Continental","Teva","Nissan","Decathlon","Eurizon"];

const STATS = [
  { value: "120+", label: "Elkészített projekt" },
  { value: "98%",  label: "Elégedett ügyfél" },
  { value: "8 év", label: "Tapasztalat" },
  { value: "24h",  label: "Átlag válaszidő" },
];

const TESTIMONIALS = [
  { name: "Kandi Tillman",   role: "Managing Co-Founder, 50strong",                              text: "We must run quickly to build solutions that meet the needs of our employer partners and the strong transitioning military talent they seek to share their opportunities with for post-military employment consideration. The Skvad team translated our business needs, offered ideas, designed and built a solution that is now being used to support impact & outcomes. Bottom line: Skvad certainly enabled us to 'run quickly'. We are excited to continue this partnership!" },
  { name: "Bob Jennings",    role: "Chief Executive Officer, Brand Innovation Inc. / 3D color",  text: "Skvad has been responsive and creative. They built capability for our company on-time and on-budget and we look forward to collaborating with Skvad in the future. I highly recommend them for your web and mobile projects." },
  { name: "Tőrös Balázs",   role: "Head of Creative, Fastbridge",                               text: "A Skvad egy remek csapat — nagyon szimpatikus az egész: a hozzáállásuk, a gondolkodásmódjuk, a folyamataik és a munkájuk. Mindig a megfelelő kérdéseket teszik fel, és soha nem okoznak csalódást. 🤜🏻🤛🏻" },
  { name: "Szentes László",  role: "Kommunikációs vezető, Magyar Nemzeti Bank",                  text: "A jegybankok éles átalakulásban vannak: kommunikációjukat meg kell újítani, hogy a nyilvánosság igényeit mélyebben és közvetlenebbül tudják megszólítani. A Skvad pragmatikus és professzionális tervezési megközelítése olyan minőségi megoldásokat eredményezett, amelyek valóban működnek, és örömet okoznak a felhasználóknak." },
  { name: "Szögi Ágnes",    role: "Head of Digital Sales, Erste Bank Hungary",                  text: "A Skvad csapata mindig rugalmasan alkalmazkodott a Bank igényeihez. Koordinálták a több résztvevős egyeztetéseket, és végül olyan termékkoncepcióval álltak elő, amelyet tanácsadóink és ügyfeleink egyaránt kedvelnek." },
  { name: "Kötcsei Csaba",  role: "Director Digital Creative Services, HBO Europe / WarnerMedia",text: "A Skvad csapata kulcsszerepet játszott a vállalati vizuális irányvonal-oldalunk elkészítésében, szűkös határidőn belül. Vizuálisan gyönyörű és mégis strukturált oldalt hoztak létre mindazok számára, akiknek a releváns irányelveket kell megtalálniuk. És mindezt nyáron!" },
  { name: "Andics Gergely", role: "Business Director, Time Agency",                             text: "Klassz fejlesztők, akik nem bújnak el a monitorjuk mögé, hanem együtt dolgoznak az ügyfelekkel a legjobb megoldások érdekében." },
  { name: "Fazakas Áron",   role: "Digital Communication Specialist, BASF",                     text: "A Skvad csapata fantasztikus! Imádom a kreatív együttműködést a projekteken — amit mindig pontos és professzionális kivitelezés követ a részükről. Csak így tovább!" },
];

const APPROACH = [
  { n:"01", t:"Stratégia",             d:"Meghallgatjuk az üzleti céljaidat, megértjük a célcsoportodat, és közösen megtaláljuk a legjobb digitális megoldást." },
  { n:"02", t:"Design",                d:"Intuitív, magával ragadó megjelenés, ami valódi márkaértéket és ügyfélélményt teremt. Wireframe-től a végleges UI designig." },
  { n:"03", t:"Fejlesztés",            d:"Cutting-edge technológiák és tapasztalt szakemberek — WordPress-től Next.js-ig, Laraveltől egyedi API-kig. Nulla meglepetés." },
  { n:"04", t:"Hosszú távú partnerség",d:"Folyamatos support, karbantartás és fejlesztés. Velünk nem ér véget a munka az átadással." },
];

// ── Blob pool (skvad.com stílusú gömbök) ─────────────────────────────────────
const BLOB_POOL = [
  { size: 260, color: "radial-gradient(circle at 35% 35%, #5ec4a0 0%, #1a5c46 55%, #0d2e24 100%)" },
  { size: 180, color: "radial-gradient(circle at 40% 30%, #7dd4b4 0%, #2a7a60 50%, #112e24 100%)" },
  { size: 310, color: "radial-gradient(circle at 30% 40%, #4ab898 0%, #1d6650 55%, #0a2820 100%)" },
  { size: 140, color: "radial-gradient(circle at 45% 35%, #88dfc4 0%, #3a9070 50%, #122e24 100%)" },
  { size: 200, color: "radial-gradient(circle at 38% 32%, #5ec4a0 0%, #236b52 55%, #0e2a20 100%)" },
  { size: 115, color: "radial-gradient(circle at 42% 38%, #6ecfac 0%, #2d7a5e 50%, #102820 100%)" },
  { size: 240, color: "radial-gradient(circle at 33% 42%, #52b894 0%, #1e6048 55%, #0c2820 100%)" },
  { size: 165, color: "radial-gradient(circle at 40% 35%, #78d0b0 0%, #317060 50%, #102a22 100%)" },
];

function HeroBlobs() {
  const [blobs, setBlobs] = useState([]);
  const tick = useRef(0);

  useEffect(() => {
    const makeBlob = (id) => {
      const p = BLOB_POOL[Math.abs(id) % BLOB_POOL.length];
      return {
        id: Math.random(),
        size: p.size * (0.7 + Math.random() * 0.6),
        color: p.color,
        x: 8 + Math.random() * 72,
        y: 8 + Math.random() * 72,
        dur: 9 + Math.random() * 13,
        opacity: 0.5 + Math.random() * 0.35,
        born: Date.now(),
        life: 5000 + Math.random() * 9000,
      };
    };
    const count = () => 2 + Math.floor(Math.random() * 5);
    setBlobs(Array.from({ length: count() }, (_, i) => makeBlob(i)));
    const iv = setInterval(() => {
      tick.current++;
      setBlobs(prev => {
        const now = Date.now();
        const alive = prev.filter(b => now - b.born < b.life);
        const need = count() - alive.length;
        if (need <= 0) return alive;
        return [...alive, ...Array.from({ length: need }, (_, i) => makeBlob(tick.current * 10 + i))].slice(0, 6);
      });
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position:"relative", width:"100%", maxWidth:500, height:460, flexShrink:0 }}>
      <style>{`
        @keyframes bFloat{0%{transform:translate(-50%,-50%) scale(1) translateY(0)}40%{transform:translate(-50%,-50%) scale(1.07) translateY(-16px)}70%{transform:translate(-50%,-50%) scale(0.95) translateY(11px)}100%{transform:translate(-50%,-50%) scale(1.04) translateY(-7px)}}
        @keyframes bIn{from{opacity:0}to{opacity:1}}
      `}</style>
      {blobs.map(b => (
        <div key={b.id} style={{
          position:"absolute", left:`${b.x}%`, top:`${b.y}%`,
          width:b.size, height:b.size, borderRadius:"50%",
          background:b.color, opacity:b.opacity,
          filter:"blur(42px)", transform:"translate(-50%,-50%)",
          animation:`bFloat ${b.dur}s ease-in-out infinite alternate, bIn 1.6s ease both`,
          mixBlendMode:"screen", pointerEvents:"none",
        }}/>
      ))}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

const initials = name => name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#141E20; --bg2:#192426; --card:#1d2c2e;
  --br:rgba(255,255,255,.07);
  --cta:#fff; --cta-t:#141E20; --cta-h:#e6e6e6;
  --teal:#5ec4a0; --tx:#fff; --mu:#7a9a9e;
  --fh:'Syne',sans-serif; --fb:'DM Sans',sans-serif;
  --rad:13px; --ease:.28s cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--tx);font-family:var(--fb);font-weight:300;line-height:1.65;overflow-x:hidden}

/* NAV */
.nav{position:fixed;top:0;inset-inline:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:20px 6%;transition:var(--ease)}
.nav.sc{background:rgba(20,30,32,.96);backdrop-filter:blur(22px);padding:13px 6%;border-bottom:1px solid var(--br)}
.logo{font-family:var(--fh);font-weight:800;font-size:1.5rem;letter-spacing:.1em;color:var(--tx);text-decoration:none}
.navl{display:flex;gap:32px;list-style:none}
.navl a{color:var(--mu);font-size:.87rem;text-decoration:none;transition:color var(--ease)}
.navl a:hover{color:var(--tx)}
.navcta{background:var(--cta);color:var(--cta-t);border:none;border-radius:4px;padding:10px 22px;font-family:var(--fb);font-size:.87rem;font-weight:500;cursor:pointer;text-decoration:none;transition:var(--ease)}
.navcta:hover{background:var(--cta-h);transform:translateY(-1px)}
@media(max-width:860px){.navl{display:none}}

/* HERO */
.hero-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:0 6%}
.hero-glow{position:absolute;top:-15%;left:25%;width:900px;height:700px;background:radial-gradient(ellipse,rgba(94,196,160,.07) 0%,transparent 65%);pointer-events:none}
.hero-inner{width:100%;max-width:1280px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:60px;padding:120px 0 80px}
.hero-left{display:flex;flex-direction:column;align-items:flex-start}
.hero-right{display:flex;align-items:center;justify-content:center}

.badge{display:inline-flex;align-items:center;gap:9px;background:rgba(94,196,160,.08);border:1px solid rgba(94,196,160,.2);border-radius:4px;padding:7px 16px;font-size:.72rem;letter-spacing:.13em;text-transform:uppercase;color:var(--teal);margin-bottom:30px;animation:fadeUp .6s ease both}
.dot{width:7px;height:7px;border-radius:50%;background:var(--teal);animation:pulse 2s ease infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.7)}}

h1.hero-h{font-family:var(--fh);font-size:clamp(2.3rem,4.5vw,4.8rem);font-weight:800;line-height:1.04;letter-spacing:-.03em;animation:fadeUp .6s .1s ease both}
h1.hero-h em{font-style:normal;color:var(--teal)}
.hero-sub{margin-top:24px;max-width:470px;font-size:1rem;color:var(--mu);line-height:1.76;animation:fadeUp .6s .2s ease both}
.hero-btns{margin-top:42px;display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp .6s .3s ease both}

.btn-p{display:inline-flex;align-items:center;gap:9px;background:var(--cta);color:var(--cta-t);border:none;border-radius:4px;padding:14px 26px;font-family:var(--fb);font-size:.93rem;font-weight:500;cursor:pointer;text-decoration:none;transition:var(--ease)}
.btn-p:hover{background:var(--cta-h);transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.22)}
.btn-s{display:inline-flex;align-items:center;gap:9px;background:transparent;color:var(--tx);border:1px solid rgba(255,255,255,.22);border-radius:4px;padding:14px 26px;font-family:var(--fb);font-size:.93rem;cursor:pointer;text-decoration:none;transition:var(--ease)}
.btn-s:hover{border-color:rgba(255,255,255,.46);background:rgba(255,255,255,.04)}

.trust{margin-top:50px;display:flex;align-items:center;gap:14px;animation:fadeUp .6s .4s ease both}
.avs{display:flex}
.av{width:36px;height:36px;border-radius:50%;border:2px solid var(--bg);display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;margin-left:-10px}
.av:first-child{margin-left:0}
.av1{background:var(--teal);color:var(--bg)}.av2{background:#2a7a60;color:#fff}.av3{background:#3d9678;color:#fff}.av4{background:#1a4d40;color:#fff}
.trust-t{font-size:.81rem;color:var(--mu)}.trust-t strong{color:var(--tx)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:920px){
  .hero-inner{grid-template-columns:1fr;text-align:center;padding:100px 0 60px;gap:40px}
  .hero-left{align-items:center}
  .hero-btns{justify-content:center}
  .hero-right{display:none}
}

/* PARTNERS */
.partners{padding:36px 6%;background:var(--bg2);border-top:1px solid var(--br);border-bottom:1px solid var(--br)}
.part-lbl{text-align:center;font-size:.69rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mu);margin-bottom:20px}
.part-row{display:flex;gap:34px;align-items:center;justify-content:center;flex-wrap:wrap}
.part-n{font-family:var(--fh);font-weight:700;font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.18);transition:color var(--ease);cursor:default}
.part-n:hover{color:rgba(255,255,255,.48)}

/* STATS */
.stats{padding:70px 6%}
.stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.stat-v{font-family:var(--fh);font-size:2.7rem;font-weight:800;color:var(--teal);letter-spacing:-.04em;opacity:0;transform:translateY(14px);transition:all .65s ease}
.stat-v.on{opacity:1;transform:none}
.stat-l{color:var(--mu);font-size:.85rem;margin-top:5px}

/* SECTIONS */
.sec{padding:88px 6%}
.sec-in{max-width:1100px;margin:0 auto}
.tag{display:inline-block;color:var(--teal);font-size:.69rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin-bottom:14px}
.sec-t{font-family:var(--fh);font-size:clamp(1.8rem,3.4vw,2.8rem);font-weight:800;letter-spacing:-.03em;line-height:1.08;max-width:640px}
.sec-t em{font-style:normal;color:var(--teal)}
.sec-sub{color:var(--mu);max-width:500px;margin-top:14px;font-size:.97rem}

/* SERVICES */
.srv-g{margin-top:48px;display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.srv-c{background:var(--card);border:1px solid var(--br);border-radius:var(--rad);padding:30px;transition:var(--ease);position:relative;overflow:hidden}
.srv-c::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--teal),rgba(255,255,255,.4));opacity:0;transition:opacity var(--ease)}
.srv-c:hover{border-color:rgba(94,196,160,.28);transform:translateY(-3px)}
.srv-c:hover::after{opacity:1}
.srv-ico{width:46px;height:46px;border-radius:9px;background:rgba(94,196,160,.08);border:1px solid rgba(94,196,160,.18);display:flex;align-items:center;justify-content:center;color:var(--teal);margin-bottom:18px}
.srv-t{font-family:var(--fh);font-size:1.03rem;font-weight:700;margin-bottom:8px}
.srv-d{color:var(--mu);font-size:.91rem;line-height:1.64}

/* APPROACH */
.ap-bg{background:var(--bg2)}
.ap-list{margin-top:48px;max-width:680px}
.ap-row{display:flex;gap:22px;padding:23px 0;border-bottom:1px solid var(--br)}
.ap-row:last-child{border-bottom:none}
.ap-n{font-family:var(--fh);font-size:.68rem;font-weight:800;color:var(--teal);min-width:28px;padding-top:3px;letter-spacing:.1em}
.ap-t{font-family:var(--fh);font-size:1.03rem;font-weight:700;margin-bottom:7px}
.ap-d{color:var(--mu);font-size:.91rem}

/* TESTIMONIALS */
.test-bg{background:var(--bg2)}
.test-g{margin-top:48px;columns:3;column-gap:16px}
.test-c{background:var(--card);border:1px solid var(--br);border-radius:var(--rad);padding:24px;transition:var(--ease);break-inside:avoid;margin-bottom:16px;position:relative}
.test-c:hover{border-color:rgba(94,196,160,.22);transform:translateY(-3px)}
.test-q{position:absolute;top:16px;right:18px;color:var(--teal)}
.stars{display:flex;gap:3px;color:var(--teal);margin-bottom:13px}
.test-tx{font-size:.88rem;color:rgba(255,255,255,.82);line-height:1.68;margin-bottom:17px}
.test-au{display:flex;align-items:center;gap:10px}
.test-av{width:35px;height:35px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:700;font-size:.7rem;color:var(--bg);flex-shrink:0}
.test-nm{font-family:var(--fh);font-weight:700;font-size:.85rem}
.test-rl{color:var(--mu);font-size:.74rem;margin-top:2px;line-height:1.4}

/* CONTACT */
.ct-bg{background:var(--bg)}
.ct-w{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
.ct-info{margin-top:30px;display:flex;flex-direction:column;gap:15px}
.ct-row{display:flex;align-items:flex-start;gap:12px}
.ct-ico{width:40px;height:40px;border-radius:8px;flex-shrink:0;background:rgba(94,196,160,.08);border:1px solid rgba(94,196,160,.18);display:flex;align-items:center;justify-content:center;color:var(--teal)}
.ct-lbl{font-size:.73rem;color:var(--mu);margin-bottom:3px;letter-spacing:.04em}
.ct-val{font-size:.93rem}
.ct-val a{color:var(--tx);text-decoration:none;transition:color var(--ease)}
.ct-val a:hover{color:var(--teal)}
.ph-btn{display:inline-flex;align-items:center;gap:7px;background:rgba(94,196,160,.08);border:1px solid rgba(94,196,160,.18);border-radius:4px;padding:6px 13px;font-size:.84rem;color:var(--teal);cursor:pointer;transition:var(--ease);font-family:var(--fb)}
.ph-btn:hover{background:rgba(94,196,160,.15)}
.perks{margin-top:30px;display:flex;flex-direction:column;gap:11px}
.perk{display:flex;align-items:flex-start;gap:11px;font-size:.9rem;color:var(--mu)}
.perk a{color:var(--mu);transition:color var(--ease)}
.perk a:hover{color:var(--teal)}
.pdot{width:20px;height:20px;border-radius:50%;flex-shrink:0;background:rgba(94,196,160,.08);border:1px solid rgba(94,196,160,.18);display:flex;align-items:center;justify-content:center;color:var(--teal);margin-top:2px}
.cal-btn{display:inline-flex;align-items:center;gap:8px;background:var(--cta);color:var(--cta-t);border:none;border-radius:4px;padding:12px 22px;font-family:var(--fb);font-size:.88rem;font-weight:500;cursor:pointer;text-decoration:none;margin-top:24px;transition:var(--ease)}
.cal-btn:hover{background:var(--cta-h);transform:translateY(-1px);box-shadow:0 8px 22px rgba(0,0,0,.18)}

/* FORM */
.form-card{background:var(--card);border:1px solid var(--br);border-radius:var(--rad);padding:36px}
.form-t{font-family:var(--fh);font-size:1.38rem;font-weight:800;margin-bottom:24px;letter-spacing:-.02em}
.fg{margin-bottom:15px}
.fl{display:block;font-size:.76rem;color:var(--mu);margin-bottom:7px;letter-spacing:.04em}
.fi{width:100%;padding:12px 14px;background:rgba(255,255,255,.04);border:1px solid var(--br);border-radius:6px;color:var(--tx);font-family:var(--fb);font-size:.9rem;outline:none;transition:border-color var(--ease)}
.fi:focus{border-color:var(--teal);background:rgba(94,196,160,.04)}
.fi::placeholder{color:#3a5255}
select.fi{cursor:pointer;appearance:none}
select.fi option{background:var(--card)}
.form-btn{width:100%;margin-top:4px;display:flex;align-items:center;justify-content:center;gap:9px;background:var(--cta);color:var(--cta-t);border:none;border-radius:4px;padding:14px 26px;font-family:var(--fb);font-size:.93rem;font-weight:500;cursor:pointer;transition:var(--ease)}
.form-btn:hover{background:var(--cta-h);transform:translateY(-1px);box-shadow:0 8px 22px rgba(0,0,0,.18)}
.form-note{text-align:center;font-size:.73rem;color:var(--mu);margin-top:10px}
.succ{text-align:center;padding:28px 8px;display:flex;flex-direction:column;align-items:center;gap:14px}
.succ-ico{width:58px;height:58px;border-radius:50%;background:rgba(94,196,160,.1);border:2px solid rgba(94,196,160,.28);display:flex;align-items:center;justify-content:center;font-size:1.6rem}
.succ-t{font-family:var(--fh);font-size:1.2rem;font-weight:800}
.succ-s{color:var(--mu);font-size:.9rem;line-height:1.65}

/* FOOTER */
.footer{padding:28px 6%;border-top:1px solid var(--br);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;font-size:.79rem;color:var(--mu)}
.foot-logo{font-family:var(--fh);font-weight:800;font-size:1.1rem;letter-spacing:.1em;color:var(--tx);text-decoration:none}
.foot-links{display:flex;gap:24px}
.foot-links a{color:var(--mu);text-decoration:none;transition:color var(--ease)}
.foot-links a:hover{color:var(--tx)}

/* RESPONSIVE */
@media(max-width:960px){
  .srv-g{grid-template-columns:1fr}
  .test-g{columns:2}
  .ct-w{grid-template-columns:1fr;gap:44px}
  .stats-g{grid-template-columns:repeat(2,1fr)}
  .foot-links{display:none}
}
@media(max-width:580px){
  .test-g{columns:1}
  .stats-g{grid-template-columns:1fr 1fr}
  .part-row{gap:20px}
}
`;

// ── Main component ─────────────────────────────────────────────────────────────
export default function SkvadLanding() {
  const [form, setForm] = useState({ name:"", email:"", project:"" });
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phoneOn, setPhoneOn] = useState(false);
  const statsRef = useRef(null);
  const statsVis = useInView(statsRef);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav${scrolled?" sc":""}`}>
        <a href="#" className="logo">SKVAD</a>
        <ul className="navl">
          <li><a href="#services">Szolgáltatások</a></li>
          <li><a href="#approach">Megközelítés</a></li>
          <li><a href="#reviews">Vélemények</a></li>
          <li><a href="#contact">Kapcsolat</a></li>
        </ul>
        <a href="#contact" className="navcta">Ajánlatot kérek →</a>
      </nav>

      {/* HERO */}
      <div className="hero-shell">
        <div className="hero-glow"/>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="badge"><span className="dot"/>Budapest · Imagine, realize, impact.</div>
            <h1 className="hero-h">
              Digitális termékek,<br/>
              amik <em>előreviszik</em><br/>
              a vállalkozásodat
            </h1>
            <p className="hero-sub">
              Weboldaltól összetett portálig — WordPress, Next.js és Laravel fejlesztés szenvedélyes szakemberektől. Határidőre, kompromisszum nélkül.
            </p>
            <div className="hero-btns">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-p">
                Ingyenes konzultáció <IcArrow/>
              </a>
              <a href="https://skvad.com/work" target="_blank" rel="noopener noreferrer" className="btn-s">
                Munkáink megtekintése
              </a>
            </div>
            <div className="trust">
              <div className="avs">
                <span className="av av1">MO</span>
                <span className="av av2">ER</span>
                <span className="av av3">HB</span>
                <span className="av av4">NS</span>
              </div>
              <p className="trust-t"><strong>MOME, Erste, HBO, Nissan</strong> — és még 116 ügyfél</p>
            </div>
          </div>
          <div className="hero-right">
            <HeroBlobs/>
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="partners">
        <p className="part-lbl">Partnereink és ügyfeleink</p>
        <div className="part-row">
          {PARTNERS.map((p,i) => <span key={i} className="part-n">{p}</span>)}
        </div>
      </div>

      {/* STATS */}
      <div className="stats" ref={statsRef}>
        <div className="stats-g">
          {STATS.map((s,i) => (
            <div key={i}>
              <div className={`stat-v${statsVis?" on":""}`} style={{transitionDelay:`${i*.12}s`}}>{s.value}</div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="sec" id="services">
        <div className="sec-in">
          <span className="tag">// Szolgáltatások</span>
          <h2 className="sec-t">Amit <em>mi csinálunk</em></h2>
          <p className="sec-sub">Stratégia, design, fejlesztés — az ötlettől az éles megjelenésig.</p>
          <div className="srv-g">
            {SERVICES.map((s,i) => (
              <div className="srv-c" key={i}>
                <div className="srv-ico">{s.icon}</div>
                <div className="srv-t">{s.title}</div>
                <p className="srv-d">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="sec ap-bg" id="approach">
        <div className="sec-in">
          <span className="tag">// Megközelítésünk</span>
          <h2 className="sec-t">Hogyan dolgozunk <em>együtt?</em></h2>
          <p className="sec-sub">Merész ötletek és meglepő kérdések vezetnek el a legjobb digitális termékhez.</p>
          <div className="ap-list">
            {APPROACH.map((a,i) => (
              <div className="ap-row" key={i}>
                <span className="ap-n">{a.n}</span>
                <div>
                  <div className="ap-t">{a.t}</div>
                  <p className="ap-d">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec test-bg" id="reviews">
        <div className="sec-in">
          <span className="tag">// Vélemények</span>
          <h2 className="sec-t">Amit az ügyfelek <em>mondanak</em></h2>
          <div className="test-g">
            {TESTIMONIALS.map((t,i) => (
              <div className="test-c" key={i}>
                <span className="test-q"><IcQuote/></span>
                <div className="stars">{[...Array(5)].map((_,s) => <IcStar key={s}/>)}</div>
                <p className="test-tx">{t.text}</p>
                <div className="test-au">
                  <div className="test-av">{initials(t.name)}</div>
                  <div>
                    <div className="test-nm">{t.name}</div>
                    <div className="test-rl">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec ct-bg" id="contact">
        <div className="ct-w">
          <div>
            <span className="tag">// Kapcsolat</span>
            <h2 className="sec-t">Kezdjük el <em>együtt</em></h2>
            <p className="sec-sub">Küldj egy rövid briefet — 24 órán belül visszajelzünk.</p>
            <div className="ct-info">
              <div className="ct-row">
                <div className="ct-ico"><IcMail/></div>
                <div>
                  <div className="ct-lbl">Email</div>
                  <div className="ct-val"><a href="mailto:hello@skvad.com">hello@skvad.com</a></div>
                </div>
              </div>
              <div className="ct-row">
                <div className="ct-ico"><IcPhone/></div>
                <div>
                  <div className="ct-lbl">Gábor Hanzmann — Client Service Director</div>
                  {phoneOn
                    ? <div className="ct-val"><a href="tel:+36304669011">+36 30 466 9011</a></div>
                    : <button className="ph-btn" onClick={() => setPhoneOn(true)}><IcEye/> Telefonszám megmutatása</button>
                  }
                </div>
              </div>
            </div>
            <div className="perks">
              <div className="perk">
                <span className="pdot"><IcCheck/></span>
                <span>Ingyenes 30 perces konzultáció — <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">foglalj időpontot itt</a></span>
              </div>
              <div className="perk"><span className="pdot"><IcCheck/></span>Kötelezettség nélküli árajánlat</div>
              <div className="perk"><span className="pdot"><IcCheck/></span>Fix ár, nincsenek rejtett költségek</div>
              <div className="perk"><span className="pdot"><IcCheck/></span>Átlagos válaszidő: 24 óra</div>
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="cal-btn">
              <IcCalendar/> Időpontfoglalás Calendly-n
            </a>
          </div>

          <div className="form-card">
            {sent ? (
              <div className="succ">
                <div className="succ-ico">✓</div>
                <div className="succ-t">Köszönjük!</div>
                <p className="succ-s">Gábor hamarosan felveszi veled a kapcsolatot.<br/>Addig nézd meg munkáinkat a <a href="https://skvad.com/work" style={{color:"var(--teal)"}}>skvad.com/work</a> oldalon.</p>
              </div>
            ) : (
              <>
                <div className="form-t">Kérd az ajánlatot</div>
                <div className="fg">
                  <label className="fl">Neved *</label>
                  <input className="fi" placeholder="Kovács Péter" value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>
                </div>
                <div className="fg">
                  <label className="fl">Email cím *</label>
                  <input className="fi" type="email" placeholder="peter@cegnev.hu" value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
                </div>
                <div className="fg">
                  <label className="fl">Milyen projekted van?</label>
                  <select className="fi" value={form.project} onChange={e => setForm({...form, project:e.target.value})}>
                    <option value="">Válassz egyet...</option>
                    <option>Új céges weboldal (WordPress / Webflow)</option>
                    <option>Next.js / React alkalmazás</option>
                    <option>Laravel backend fejlesztés</option>
                    <option>Meglévő oldal átdolgozása</option>
                    <option>Webshop / e-commerce</option>
                    <option>Egyéb egyedi fejlesztés</option>
                  </select>
                </div>
                <button className="form-btn" onClick={() => { if (form.name && form.email) setSent(true); }}>
                  Ajánlatot kérek <IcArrow/>
                </button>
                <p className="form-note">🔒 Adataid biztonságban vannak. Nem küldünk spamot.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="https://skvad.com" className="foot-logo">SKVAD</a>
        <div className="foot-links">
          <a href="https://skvad.com/about">About</a>
          <a href="https://skvad.com/work">Work</a>
          <a href="https://skvad.com/blog">Blog</a>
          <a href="https://skvad.com/joinus">Join Us</a>
        </div>
        <span>© 2026 Skvad Digital · Budapest, Hungary</span>
      </footer>
    </>
  );
}
