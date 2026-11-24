// Kartu miring 3D (saat ini tidak dipakai)
function Tilt({ children, cls = "card" }) {
  const r = useRef();
  const mv = (e) => {
    const b = r.current.getBoundingClientRect(),
      x = (e.clientX - b.left) / b.width - 0.5,
      y = (e.clientY - b.top) / b.height - 0.5;
    r.current.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  };
  return html`<div class=${cls} ref=${r} onMouseMove=${mv} onMouseLeave=${() => (r.current.style.transform = "")}>${children}</div>`;
}
