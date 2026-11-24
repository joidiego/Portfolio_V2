// Komponen Mod: kartu modul PDF + password
function Mod({ t }) {
  const [open, setOpen] = useState(-1);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const go = async (i) => {
    if (busy || !pw) return;
    setBusy(true);
    setMsg("");
    try {
      const buf = await dec(PDFS[i].b, pw);
      const d = window.claude ? await window.claude.use("downloads") : null;
      if (!d) {
        const u = URL.createObjectURL(
            new Blob([buf], { type: "application/pdf" }),
          ),
          a = document.createElement("a");
        a.href = u;
        a.download = PDFS[i].f;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(u), 4000);
        setOpen(-1);
        setPw("");
      } else {
        await d.save({
          filename: PDFS[i].f,
          data: new Blob([buf], { type: "application/pdf" }),
        });
        setOpen(-1);
        setPw("");
      }
    } catch (e) {
      setMsg(e && e.name === "OperationError" ? t.pdf.bad : t.pdf.fail);
      await new Promise((r) => setTimeout(r, 1200));
    }
    setBusy(false);
  };
  return html`<div class="grid">${t.mod.map(
    (
      m,
      i,
    ) => html`<div class="card pdf" key=${i}><svg class="pi" viewBox="0 0 24 24" fill="none" stroke="#d92d20" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5M8 14h2.5a1.5 1.5 0 0 0 0-3H8v6M14 17v-6h1.5a2.5 2.5 0 0 1 0 5H14"/></svg>
<h3>${m[0]}</h3><p>${m[1]}</p><div class="date" style=${{ color: "var(--mut)" }}>PDF · ${PDFS[i].n} ${t.pdf.pg}</div>
${
  open === i
    ? html`<div class="pwb"><label style=${{ fontSize: 14, color: "var(--mut)" }} for=${"pw" + i}>${t.pdf.ask}</label><input id=${"pw" + i} type="password" autocomplete="off" maxLength="64" placeholder=${t.pdf.pw} value=${pw} autoFocus onInput=${(e) => setPw(e.target.value)} onKeyDown=${(e) => e.key === "Enter" && go(i)}/>
<div style=${{ display: "flex", gap: 8 }}><button class="btn p" disabled=${busy || !pw} onClick=${() => go(i)}>${busy ? "…" : t.pdf.ok}</button><button class="btn" onClick=${() => {
        setOpen(-1);
        setPw("");
        setMsg("");
      }}>${t.pdf.cancel}</button></div>${msg ? html`<p role="alert" style=${{ color: "#b42318", margin: "6px 0 0", fontSize: 14 }}>${msg}</p>` : null}</div>`
    : html`<button class="btn p" onClick=${() => {
        setOpen(i);
        setPw("");
        setMsg("");
      }}>🔒 ${t.pdf.dl}</button>`
}</div>`,
  )}</div>`;
}
