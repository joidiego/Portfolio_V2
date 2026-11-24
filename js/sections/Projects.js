// Bagian Projects
function Projects({ t }) {
  return html`<section id="projects" aria-labelledby="pj-title">
<div class="sec-head"><h2 id="pj-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/></svg>${t.projects}</h2><p>${t.projsub}</p></div>
<div class="pj-grid">${t.pr.map((p, i) => html`<${PCard} key=${i} i=${i} p=${p} t=${t}/>`)}</div></section>`;
}
