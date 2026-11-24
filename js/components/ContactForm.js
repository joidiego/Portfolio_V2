// Komponen Contact: tombol dan form email
function Contact({ t }) {
  const [n, setN] = useState("");
  const [m, setM] = useState("");
  const go = () => {
    location.href =
      "mailto:joidiegonapitupulu@gmail.com?subject=" +
      encodeURIComponent("Portfolio – " + n.slice(0, 80)) +
      "&body=" +
      encodeURIComponent(m.slice(0, 1500));
  };
  return html`<div><div class="btns" style=${{ marginTop: 0 }}><a class="btn p" href="mailto:joidiegonapitupulu@gmail.com">Email</a><a class="btn" href="https://linkedin.com/in/joidiego/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a class="btn" href="https://github.com/joidiego" target="_blank" rel="noopener noreferrer">GitHub</a></div>
<div role="group" style=${{ display: "grid", gap: 12, maxWidth: 520 }}><input aria-label=${t.f.n} placeholder=${t.f.n} maxLength="80" value=${n} onInput=${(e) => setN(e.target.value)}/><textarea aria-label=${t.f.m} placeholder=${t.f.m} rows="5" maxLength="1500" value=${m} onInput=${(e) => setM(e.target.value)}></textarea><button class="btn p" onClick=${go}>${t.f.s}</button><p class="cap" style=${{ margin: 0 }}>${t.f.h}</p></div></div>`;
}
