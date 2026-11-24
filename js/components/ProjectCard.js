// Kartu proyek: gambar, badge Unggulan, judul, deskripsi, tag, tombol Live Demo + Source
const MAX_TAGS = 4;
const I_EXT = "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5";
const I_GH = "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z";
function PCard({ i, p, t }) {
  const [bad, setBad] = useState(false);
  const tech = TECH[i];
  const extra = tech.length - MAX_TAGS;
  const L = PJ_LINKS[i] || {};
  const feat = i === 0;
  const btn = (url, cls, label, icon) => {
    const inner = icon;
    return url
      ? html`<a class=${"pbtn " + cls} href=${url} target="_blank" rel="noopener noreferrer" aria-label=${label + ": " + p[0]}>${inner}</a>`
      : html`<span class=${"pbtn off " + cls} aria-disabled="true" title=${t.soon}>${inner}</span>`;
  };
  const ext = (txt) => html`${txt}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d=${I_EXT}/></svg>`;
  const gh = (txt) => html`<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d=${I_GH}/></svg>${txt}`;
  return html`<article class=${"pj" + (feat ? " is-feat" : "")}>
<div class="pj-media">${L.img && !bad ? html`<img src=${L.img} alt=${p[0]} loading="lazy" onError=${() => setBad(true)}/>` : html`<div class="pj-mock"><${Mock} i=${i}/></div>`}${feat ? html`<span class="feat">★ ${t.feat}</span>` : null}</div>
<div class="pj-body">
<h3>${p[0]}</h3><p>${p[1]}</p>
<div class="pj-tags">${tech.slice(0, MAX_TAGS).map((x) => html`<span key=${x}><${Ic} n=${x}/>${x}</span>`)}${extra > 0 ? html`<span>+${extra}</span>` : null}</div>
<div class="pj-actions">${btn(L.demo, "demo", t.demo, ext(t.demo))}${btn(L.src, "src", t.src, gh(t.src))}</div>
</div></article>`;
}
