import { useEffect, useRef } from "react";

const STATS = [
  {
    num: "36%",
    title: "Ciências da Natureza",
    text: "Maior área em 4 das 5 provas.",
  },
  {
    num: "28%",
    title: "Ciências Humanas",
    text: "Meio ambiente e cidadania em todas as provas.",
  },
  {
    num: "23%",
    title: "Português",
    text: "Canção ou poema e tirinha ou charge em todas as edições.",
  },
];

export default function Results() {
  const ref = useRef(null);

  // Entrada suave ao rolar (desligada com movimento reduzido)
  useEffect(() => {
    const root = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    root.classList.add("is-ready");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll(".res-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="res" id="analise" ref={ref}>
      <div className="wrap">
        <div className="res-head res-reveal">
          <h2>Resultado da nossa análise das provas oficiais de 2024 à 2026</h2>
        </div>

        <div className="res-grid">
          {/* Card em destaque */}
          <article className="res-card res-card--hero res-reveal" style={{ "--i": 1 }}>
            <h3>Matemática é só 14% da prova.</h3>
            <p>
              Quem estuda “só Matemática” mira na menor área. Ciências da
              Natureza pesa 36%, mais que o dobro.
            </p>
          </article>

          {STATS.map((s, i) => (
            <article
              key={s.title}
              className="res-card res-reveal"
              style={{ "--i": i + 2 }}
            >
              <p className="res-num">{s.num}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}

          {/* Card do tema */}
          <article className="res-card res-card--soft res-reveal" style={{ "--i": 5 }}>
            <h3>
              Cada prova gira em torno de um tema: Amazônia, corpo humano,
              plantas, animais, transporte.
            </h3>
            <p>
              O tema muda. As habilidades se repetem, e é nelas que o guia
              treina você.
            </p>
          </article>

          {/* Card largo */}
          <article className="res-card res-card--wide res-reveal" style={{ "--i": 6 }}>
            <p className="res-num">66%</p>
            <div>
              <h3>Interpretar e aplicar</h3>
              <p>A prova mede mais “usar o que você sabe” do que decorar.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}