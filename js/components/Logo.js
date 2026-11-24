// Komponen Logo
function Logo({ k }) {
  const [c, x, img] = LG[k];
  return html`<div
    class=${"lg" + (img ? " lg-img" : "")}
    style=${{ background: c }}
    role="img"
    aria-label=${k}
  >
    ${img ? html`<img src=${img} alt="" />` : x}
  </div>`;
}