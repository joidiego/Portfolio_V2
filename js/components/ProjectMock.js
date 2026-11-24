// Komponen Mock: ilustrasi UI di balik kartu proyek
function Mock({ i }) {
  const W = "#fff",
    L = (x, y, w, o, h = 4) =>
      html`<rect x=${x} y=${y} width=${w} height=${h} rx="2" fill=${W} opacity=${o}/>`;
  const B = [
    html`<g>${[0, 1, 2].map((r) => html`<g key=${r}><rect x="14" y=${34 + r * 42} width="272" height="34" rx="7" fill=${W} opacity=".08"/><circle cx="30" cy=${51 + r * 42} r="5" fill="#5be3a1"/>${L(44, 45 + r * 42, 84, 0.7, 5)}${L(44, 55 + r * 42, 130, 0.3)}<rect x="206" y=${44 + r * 42} width="68" height="14" rx="7" fill="#8aa6ff" opacity=".85"/></g>`)}</g>`,
    html`<g>${[14, 108, 202].map((x, k) => html`<g key=${k}><rect x=${x} y="32" width="84" height="34" rx="7" fill=${W} opacity=".1"/>${L(x + 8, 40, 40, 0.6, 5)}<rect x=${x + 8} y="52" width=${30 + k * 10} height="7" rx="2" fill="#ffc86b"/></g>`)}<path d="M14 110H286M14 135H286" stroke=${W} opacity=".12"/><polygon points="14,160 14,146 50,126 86,134 122,100 158,110 194,82 230,92 286,64 286,160" fill="#8aa6ff" opacity=".22"/><polyline points="14,146 50,126 86,134 122,100 158,110 194,82 230,92 286,64" fill="none" stroke="#ffc86b" strokeWidth="2.5"/></g>`,
    html`<g><text x="14" y="42" fill="#ff9db5" fontSize="15" fontWeight="700">ATE −22.82</text><path d="M14 100H286" stroke=${W} opacity=".3"/>${[
      [30, 28],
      [80, 18],
      [230, 34],
    ].map(
      ([x, h]) =>
        html`<rect key=${x} x=${x} y=${100 - h} width="30" height=${h} rx="3" fill="#8aa6ff"/>`,
    )}${[
      [130, 24, "#8aa6ff"],
      [180, 48, "#ff7b9c"],
    ].map(
      ([x, h, c]) =>
        html`<rect key=${x} x=${x} y="100" width="30" height=${h} rx="3" fill=${c}/>`,
    )}</g>`,
    html`<g><rect x="14" y="32" width="100" height="108" rx="9" fill="#1f2d78"/><circle cx="64" cy="82" r="26" fill="#8aa6ff" opacity=".55"/><circle cx="64" cy="82" r="10" fill="#ffc86b"/>${[
      ["Newcastle 87%", 0.87, "#ff7b9c"],
      ["Avian Influenza 9%", 0.09, "#ffc86b"],
      ["Healthy 4%", 0.04, "#5be3a1"],
    ].map(
      ([t, v, c], k) =>
        html`<g key=${k}><text x="130" y=${50 + k * 34} fill=${W} fontSize="10" opacity=".85">${t}</text><rect x="130" y=${55 + k * 34} width="150" height="8" rx="4" fill=${W} opacity=".12"/><rect x="130" y=${55 + k * 34} width=${Math.max(6, 150 * v)} height="8" rx="4" fill=${c}/></g>`,
    )}</g>`,
    html`<g><path d="M14 70H286M14 110H286M14 150H286" stroke=${W} opacity=".12"/><polyline points="14,130 50,106 86,116 122,80 158,92 194,66 230,74 250,60" fill="none" stroke=${W} strokeWidth="2.2" opacity=".9"/><polyline points="194,66 230,82 266,56 288,46" fill="none" stroke="#ffc86b" strokeWidth="2.5" strokeDasharray="5 4"/><text x="14" y="44" fill="#ffc86b" fontSize="12" fontWeight="700">MAPE 6.30%</text></g>`,
  ];
  return html`<svg viewBox="0 0 300 170" aria-hidden="true"><rect width="300" height="170" fill="#0d1547"/><rect width="300" height="22" fill="#1a2566"/><circle cx="14" cy="11" r="3.5" fill="#ff6b6b"/><circle cx="26" cy="11" r="3.5" fill="#ffc86b"/><circle cx="38" cy="11" r="3.5" fill="#5be3a1"/><rect x="60" y="6" width="180" height="10" rx="5" fill=${W} opacity=".12"/>${B[i]}</svg>`;
}
