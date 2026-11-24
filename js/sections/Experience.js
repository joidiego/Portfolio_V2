// Bagian Experience
function Experience({ t }) {
  return html`<section id="experience"><h2>${t.exp}</h2><div class="tl">${t.ex.map((e, i) => html`<div class="it" key=${i}><div><div class="date">${e[2]}</div><h3>${e[0]}</h3><div style=${{ color: "var(--mut)" }}>${e[1]}</div><ul>${e[3].map((x, j) => html`<li key=${j}>${x}</li>`)}</ul></div><${Logo} k=${["jason", "airasia"][i]}/></div>`)}</div></section>`;
}
