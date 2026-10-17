import { useLayoutEffect, useRef, useState } from "react";

const DESIGN_W = 920; // largura do layout de desktop dentro da moldura

const TABS = [
  "Mapa de estudos",
  "Matérias que mais caem",
  "O que estudar",
  "Questões recorrentes",
  "Padrões de perguntas",
];

const AREAS = [
  { name: "Natureza", temas: 8, color: "#1adb5e", on: true },
  { name: "Humanas", temas: 8, color: "#fac40a" },
  { name: "Português", temas: 6, color: "#3454ff" },
  { name: "Matemática", temas: 8, color: "#1c2e9e" },
];

const FILTERS = ["Todos os temas", "Prioridade 1", "Prioridade 2", "Prioridade 3"];

// Todas as linhas usam texto de enchimento: o tema real não vai para o HTML.
const ROWS = [
  { name: "Tema reservado da prioridade máxima", n: 5, p: 1, blur: true },
  { name: "Assunto exclusivo da plataforma", n: 5, p: 1, blur: true },
  { name: "Tema reservado da área de natureza", n: 4, p: 2, blur: true },
  { name: "Assunto reservado aos alunos da plataforma", n: 3, p: 2, blur: true },
  { name: "Conteúdo exclusivo do nível dois", n: 3, p: 2, blur: true },
];

// Mede a largura disponível e calcula a escala do layout de desktop.
function useFit() {
  const viewport = useRef(null);
  const stage = useRef(null);
  const [fit, setFit] = useState({ scale: 1, height: undefined });

  useLayoutEffect(() => {
    const vp = viewport.current;
    const st = stage.current;

    const measure = () => {
      const scale = Math.min(1, vp.clientWidth / DESIGN_W);
      setFit({ scale, height: st.offsetHeight * scale });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    ro.observe(st);
    return () => ro.disconnect();
  }, []);

  return { viewport, stage, fit };
}

export default function PlatformPreview() {
  const { viewport, stage, fit } = useFit();

  return (
    <section className="pv" id="previa">
      <div
        className="pv-frame"
        role="img"
        aria-label="Prévia da plataforma: Mapa de estudos com os temas organizados por prioridade"
      >
        <div
          className="pv-viewport"
          ref={viewport}
          style={{ height: fit.height }}
        >
          <div
            className="pv-stage"
            ref={stage}
            style={{
              width: DESIGN_W,
              transform: `scale(${fit.scale})`,
              "--s": fit.scale,
            }}
          >
            <div className="pv-card">
              <div className="pv-nav">
                <img src="/logo.svg" alt="" />
                <ul>
                  {TABS.map((t, i) => (
                    <li key={t} className={i === 0 ? "on" : ""}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="pv-title is-blur">Mapa de estudos</h3>

              <div className="pv-areas">
                {AREAS.map((a) => (
                  <span key={a.name} className={`pv-area ${a.on ? "on" : ""}`}>
                    <i style={{ background: a.color }} />
                    {a.name} <small>{a.temas} temas</small>
                  </span>
                ))}
              </div>

              <div className="pv-filters">
                {FILTERS.map((f, i) => (
                  <span key={f} className={i === 0 ? "on" : ""}>
                    {f}
                  </span>
                ))}
              </div>

              <ul className="pv-list">
                {ROWS.map((r) => (
                  <li key={r.name} className="pv-row">
                    <span className={`pv-name ${r.blur ? "is-blur" : ""}`}>
                      {r.name}
                    </span>
                    <span className="pv-meta">
                      <span className="pv-dots">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <i key={i} className={i < r.n ? "on" : ""} />
                        ))}
                      </span>
                      <span className="pv-count">em {r.n} de 5 provas</span>
                      <b className={`pv-badge p${r.p}`}>Prioridade {r.p}</b>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pv-fade" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}