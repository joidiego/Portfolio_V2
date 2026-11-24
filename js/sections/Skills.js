// Bagian Skills: judul + filter kategori (dengan jumlah) + daftar chip
function Skills({ t }) {
  const [cat, setCat] = useState("all");
  const tabs = [{ key: "all", items: SK }, ...SK_GROUPS];
  const list = tabs.find((g) => g.key === cat).items;
  return html`<section id="skills" aria-labelledby="skills-title">
<div class="sec-head"><h2 id="skills-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>${t.skills}</h2><p>${t.skillsub}</p></div>
<div class="skill-tabs" role="group" aria-label=${t.skills}>${tabs.map((g) => html`<button key=${g.key} class="stab" aria-pressed=${cat === g.key} onClick=${() => setCat(g.key)}>${t.skcat[g.key]}<small>${g.items.length}</small></button>`)}</div>
<ul class="skill-list" key=${cat} aria-live="polite">${list.map((s) => html`<li key=${s} style=${{ "--c": icColor(s) }}><${Ic} n=${s}/>${s}</li>`)}</ul></section>`;
}
