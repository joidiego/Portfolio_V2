// Bagian Education
function Education({ t }) {
  return html`<section id="education"><h2>${t.edu}</h2><div class="tl">${t.ed.map((e, i) => html`<div class="it" key=${i}><div><div class="date">${e[2]}</div><h3>${e[0]}</h3><div style=${{ color: "var(--mut)" }}>${e[1]}</div></div><${Logo} k=${["binus", "del"][i]}/></div>`)}</div></section>`;
}
