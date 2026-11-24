// Teks mengetik otomatis
function Typer({ list }) {
  const [s, setS] = useState("");
  useEffect(() => {
    let i = 0,
      j = 0,
      del = false,
      id;
    const w = list[0];
    const tick = () => {
      const cur = list[i % list.length];
      j += del ? -1 : 1;
      setS(cur.slice(0, j));
      let d = del ? 40 : 85;
      if (!del && j === cur.length) {
        del = true;
        d = 1400;
      } else if (del && j === 0) {
        del = false;
        i++;
        d = 300;
      }
      id = setTimeout(tick, d);
    };
    tick();
    return () => clearTimeout(id);
  }, [list]);
  return html`<div class="role" aria-label=${list[0]}>${s}<span style=${{ opacity: 0.6 }}>|</span></div>`;
}
