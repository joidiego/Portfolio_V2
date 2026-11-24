// Bagian pertama: sapaan, info singkat, ringkasan profil, tombol Resume
function Hero({ t }) {
  const gap = /[、，]$/.test(t.hi) ? "" : " ";
  const job = t.ex[0];
  const company = job[0].split(/[,、]/)[0];
  const pin = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`;
  return html`<section class="hero" id="top" aria-labelledby="hero-title">
<div class="hero-top">
<div class="hero-id">
<div class="ph hero-ph"><img src=${PHOTO} alt=${PROFILE.name}/></div>
<div>
<h1 id="hero-title">${t.hi}${gap}${PROFILE.first}</h1>
<ul class="meta"><li>${pin}${PROFILE.location}</li><li>${job[1]} · ${company}</li></ul>
<p class="hero-role">${t.roles.slice(0, 3).join(" · ")}</p>
</div></div>
${PROFILE.resume && html`<a class="btn-res" href=${PROFILE.resume} download><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4"/><path d="M5 20h14"/></svg>${t.resume}</a>`}
</div>
<div class="summary">${t.ab.map((p, i) => html`<p key=${i}>${p}</p>`)}</div></section>`;
}
