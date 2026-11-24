// Komponen ikon Ic
function Ic({ n }) {
  const k = MAP[n] || "code";
  return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style=${{ color: COL[k] }} aria-hidden="true" dangerouslySetInnerHTML=${{ __html: IC[k] }}></svg>`;
}
// Warna ikon sebuah skill (dipakai untuk menandai chip)
const icColor = (n) => COL[MAP[n] || "code"];
