// Root: state bahasa + susunan seluruh halaman
function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "id";
    } catch (e) {
      return "id";
    }
  });
  const t = T[lang];
  const pick = (l) => {
    setLang(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem("lang", l);
    } catch (e) {}
  };
  const [layout, setLayoutState] = useState(() => {
    try {
      return localStorage.getItem("layout") === "top" ? "top" : "side";
    } catch (e) {
      return "side";
    }
  });
  const setLayout = (l) => {
    setLayoutState(l);
    try {
      localStorage.setItem("layout", l);
    } catch (e) {}
  };
  React.useLayoutEffect(() => {
    document.documentElement.dataset.layout = layout;
  }, [layout]);
  const [theme, setThemeState] = useState(() => {
    try {
      const v = localStorage.getItem("theme");
      return ["light", "dark", "green"].includes(v) ? v : "dark";
    } catch (e) {
      return "dark";
    }
  });
  const setTheme = (v) => {
    setThemeState(v);
    try {
      localStorage.setItem("theme", v);
    } catch (e) {}
  };
  React.useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
  }, [theme]);
  React.useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return html`<div><a class="skip" href="#main">${t.skip}</a><div class="neb"></div><${Galaxy} theme=${theme}/>
<div class="shell">
<${Navbar} t=${t} lang=${lang} pick=${pick} layout=${layout} setLayout=${setLayout} theme=${theme} setTheme=${setTheme}/>
<main id="main" key=${lang} class="lang-in">
<${Hero} t=${t}/>
<${Skills} t=${t}/>
<${Projects} t=${t}/>
<${Experience} t=${t}/>
<${Education} t=${t}/>
<${Achievements} t=${t} lang=${lang}/>
<${ContactSection} t=${t}/>
<${ModulesSection} t=${t}/>
<${Footer} t=${t}/>
</main></div></div>`;
}
