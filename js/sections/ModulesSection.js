// Bagian Learning modules
function ModulesSection({ t }) {
  return html`<section id="modules"><h2>${t.mods}</h2><p style=${{ color: "var(--mut)", maxWidth: "60ch", marginTop: -12 }}>${t.modsub}</p><${Mod} t=${t}/></section>`;
}
