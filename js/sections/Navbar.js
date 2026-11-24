// Navigasi: sidebar profil (default, layar > 900px), topbar, atau menu dropdown di mobile.
const NAV_ITEMS = [
  ["top", "home", "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M10 21v-6h4v6"],
  ["skills", 1, "m16 18 6-6-6-6M8 6l-6 6 6 6"],
  ["projects", 2, "m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"],
  ["experience", 4, "M3 8h18v12H3zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M3 13h18"],
  ["education", 3, "m2 9 10-5 10 5-10 5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"],
  ["achievements", "ach", "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 14 7 21l5-3 5 3-1.5-7"],
  ["contact", 5, "M3 6h18v12H3zM3 7l9 6 9-6"],
  ["modules", 6, "M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2zM4 19V5"],
];

// Menandai bagian yang sedang terlihat di layar
function useActiveSection(ids, dep) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
  return active;
}

const THEMES = [
  ["light", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"],
  ["dark", "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"],
  ["green", "M11 20A7 7 0 0 1 4 13c0-6 5-9 16-9 0 11-3 16-9 16zM4 21c2-5 5-8 9-10"],
];

function Navbar({ t, lang, pick, layout, setLayout, theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n[0]), lang);
  const side = layout === "side";
  const label = side ? t.toTop : t.toSide;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);
  const svg = (d, cls) => html`<svg class=${cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d=${d}/></svg>`;
  return html`<nav class=${"site-nav" + (open ? " open" : "")} aria-label="Main">
<a class="brand" href="#top">JD</a>
<div class="profile">
<div class="ph"><img src=${PHOTO} alt=${PROFILE.name}/></div>
<p class="pname">${PROFILE.name}${PROFILE.verified && html`<svg class="vf" viewBox="0 0 24 24" role="img" aria-label="Verified"><path fill="#3b82f6" d="M12 1.8l2.4 1.7 2.9-.1 1 2.8 2.4 1.7-.9 2.8.9 2.8-2.4 1.7-1 2.8-2.9-.1L12 22.2l-2.4-1.7-2.9.1-1-2.8-2.4-1.7.9-2.8-.9-2.8 2.4-1.7 1-2.8 2.9.1z"/><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`}</p>
<${Typer} list=${t.roles}/>
${PROFILE.openToWork && html`<span class="otw"><i></i>${t.otw}</span>`}
</div>
<div class="tools">
<div class="seg" role="group" aria-label="Language">${[["id", "ID"], ["en", "EN"], ["ja", "日本語"]].map(([k, l]) => html`<button key=${k} aria-pressed=${lang === k} onClick=${() => pick(k)}>${l}</button>`)}</div>
<div class="seg themes" role="group" aria-label=${t.themeLabel}>${THEMES.map(([k, d], i) => html`<button key=${k} aria-pressed=${theme === k} aria-label=${t.themes[i]} title=${t.themes[i]} onClick=${() => setTheme(k)}>${svg(d)}</button>`)}</div>
<button class="tbtn layout" aria-pressed=${side} aria-label=${label} title=${label} onClick=${() => setLayout(side ? "top" : "side")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d=${side ? "M3 9h18" : "M9 4v16"}/></svg></button>
<button class="tbtn menu" aria-expanded=${open} aria-controls="nav-links" aria-label=${t.menu} onClick=${() => setOpen(!open)}>${svg(open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16")}</button>
</div>
<div class="links" id="nav-links">${NAV_ITEMS.map(([id, i, d]) => html`<a href=${"#" + id} key=${id} aria-current=${active === id ? "true" : undefined} onClick=${() => setOpen(false)}>${svg(d)}<span>${typeof i === "string" ? t[i] : t.nav[i]}</span>${svg("M5 12h14m-6-6 6 6-6 6", "arr")}</a>`)}</div>
<a class="btn p hire" href="#contact">${t.hire}</a>
<p class="copy">© ${new Date().getFullYear()} ${PROFILE.name}.<br/>${t.rights}</p>
</nav>`;
}
