// Bagian Pencapaian: kartu sertifikat + tombol ikon untuk melihat ukuran penuh (lightbox)
const LANG_LOCALE = { id: "id-ID", en: "en-US", ja: "ja-JP" };
function Achievements({ t, lang }) {
  const [view, setView] = useState(null);
  const lastBtn = useRef(null);
  const closeBtn = useRef(null);
  const close = () => {
    setView(null);
    if (lastBtn.current) lastBtn.current.focus();
  };
  useEffect(() => {
    if (view === null) return;
    const onKey = (e) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (closeBtn.current) closeBtn.current.focus();
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [view]);
  const fmt = (d) => {
    const [y, m] = d.split("-");
    return new Date(+y, +m - 1, 1).toLocaleDateString(LANG_LOCALE[lang] || "en-US", { month: "long", year: "numeric" });
  };
  const ico = (d) => html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d=${d}/></svg>`;
  const award = ico("M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM8.5 14 7 21l5-3 5 3-1.5-7");
  const c = view === null ? null : CERTS[view];
  return html`<section id="achievements" aria-labelledby="ach-title">
<div class="sec-head"><h2 id="ach-title">${award}${t.ach}</h2><p>${t.achsub}</p></div>
<ul class="cert-grid">${CERTS.map((c, i) => html`<li class="cert" key=${c.title} style=${{ "--h": 210 + i * 38 }}>
<div class="cert-thumb">${c.img ? html`<img src=${c.img} alt=${c.title} loading="lazy"/>` : html`<div class="cert-ph" role="img" aria-label=${t.noimg}>${award}<span>${c.issuer}</span></div>`}</div>
<div class="cert-body">
${c.id && html`<p class="cert-id">${c.id}</p>`}
<div class="cert-head"><h3>${c.title}</h3><button class="cert-zoom" type="button" aria-label=${t.viewfull + ": " + c.title} title=${t.viewfull} onClick=${(e) => { lastBtn.current = e.currentTarget; setView(i); }}>${ico("M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7")}</button></div><p class="cert-by">${c.issuer}</p>
<div class="cert-tags">${c.tags.map((g) => html`<span key=${g}>${g}</span>`)}</div>
<p class="cert-date">${t.issued} <time datetime=${c.date}>${fmt(c.date)}</time></p>
</div></li>`)}</ul>
${c && ReactDOM.createPortal(html`<div class="lb" role="dialog" aria-modal="true" aria-label=${c.title} onClick=${close}>
<div class="lb-box" onClick=${(e) => e.stopPropagation()}>
<button class="lb-x" type="button" ref=${closeBtn} aria-label=${t.close} onClick=${close}>${ico("M6 6l12 12M18 6 6 18")}</button>
<div class="lb-media">${c.img ? html`<img src=${c.img} alt=${c.title}/>` : html`<div class="cert-ph lb-ph" role="img" aria-label=${t.noimg}>${award}<span>${c.issuer}</span><small>${t.noimg}</small></div>`}</div>
<div class="lb-cap"><h3>${c.title}</h3><p>${c.issuer} · ${fmt(c.date)}</p></div>
</div></div>`, document.body)}</section>`;
}
