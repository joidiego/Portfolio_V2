// Latar bintang (canvas)
function Galaxy({ theme }) {
  const r = useRef();
  useEffect(() => {
    const c = r.current,
      x = c.getContext("2d");
    const cs = getComputedStyle(document.documentElement);
    const C1 = cs.getPropertyValue("--star1").trim() || "#cfe0ff";
    const C2 = cs.getPropertyValue("--star2").trim() || "#ffd9a0";
    let w,
      h,
      id,
      S = [],
      sh = null;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rs = () => {
      w = c.width = innerWidth;
      h = c.height = innerHeight;
      S = Array.from({ length: Math.min(280, ((w * h) / 6000) | 0) }, () => ({
        a: Math.random() * 6.28,
        d: Math.random() * Math.hypot(w, h) * 0.6,
        s: Math.random() * 1.6 + 0.3,
        p: Math.random() * 6.28,
        v: (Math.random() * 0.5 + 0.1) * 1e-3,
      }));
    };
    rs();
    addEventListener("resize", rs);
    const f = (t) => {
      x.clearRect(0, 0, w, h);
      for (const s of S) {
        if (!rm) s.a += s.v * 0.2;
        x.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t / 900 + s.p));
        x.fillStyle = s.s > 1.5 ? C2 : C1;
        x.beginPath();
        x.arc(
          w / 2 + Math.cos(s.a) * s.d,
          h / 2 + Math.sin(s.a) * s.d * 0.7,
          s.s,
          0,
          6.28,
        );
        x.fill();
      }
      if (!sh && !rm && Math.random() < 0.005)
        sh = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, l: 0 };
      if (sh) {
        sh.x += 10;
        sh.y += 4.5;
        sh.l++;
        x.globalAlpha = Math.max(0, 1 - sh.l / 40);
        x.strokeStyle = C1;
        x.lineWidth = 2;
        x.beginPath();
        x.moveTo(sh.x, sh.y);
        x.lineTo(sh.x - 70, sh.y - 31);
        x.stroke();
        if (sh.l > 40) sh = null;
      }
      id = requestAnimationFrame(f);
    };
    id = requestAnimationFrame(f);
    return () => {
      cancelAnimationFrame(id);
      removeEventListener("resize", rs);
    };
  }, [theme]);
  return html`<canvas ref=${r} class="gx" aria-hidden="true"></canvas>`;
}
