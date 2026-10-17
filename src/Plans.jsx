import { useEffect, useRef } from "react";
import { trackCheckout } from "./pixel";

const PRICE_PDF = 27;
const PRICE_FULL = 37;

const CHECKOUT = {
  pdf: "https://pay.cakto.com.br/5zk54we_1212572",
  full: "https://pay.cakto.com.br/gyxxyrq_1212590",
};

const PDF_FEATURES = [
  { text: "Raio-X da prova: formato, peso por área e competências" },
  { text: "Prioridades: temas por ordem de frequência" },
  { text: "Mapas mentais por área" },
  { text: "Questões recorrentes, com onde treinar nas provas oficiais" },
  { text: "Padrões de pergunta e resposta e decodificador de enunciados" },
  { text: "Roteiros de 7, 4 e 2 semanas" },
  { text: "Plataforma interativa", off: true },
];

const FULL_FEATURES = [
  { bold: "Tudo do PDF" },
  { bold: "Plataforma interativa", text: " (link dentro do PDF)" },
  { text: "Gráfico de peso por prova, edição por edição" },
  { text: "Funciona no celular/tablet e desktop, sem login e sem instalar nada" },
];

function Features({ items }) {
  return (
    <ul className="plan-list">
      {items.map((f) => (
        <li key={f.bold || f.text} className={f.off ? "is-off" : ""}>
          {f.bold && <b>{f.bold}</b>}
          {f.text}
        </li>
      ))}
    </ul>
  );
}

export default function Plans() {
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
    root.querySelectorAll(".plans-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="plans" id="planos" ref={ref}>
      <div className="wrap">
        <div className="plans-head plans-reveal">
          <h2>Escolha como estudar</h2>
        </div>

        <div className="plans-grid">
          <article className="plan plans-reveal" style={{ "--i": 1 }}>
            <h3>Guia em PDF</h3>
            <p className="plan-price">
              <span>R$</span>
              {PRICE_PDF}
            </p>
            <p className="plan-note">
              Pagamento único. Ideal para estudar no papel.
            </p>
            <a
              className="plan-cta"
              href={CHECKOUT.pdf}
              onClick={() => trackCheckout("PDF", PRICE_PDF)}
            >
              Quero só o PDF
            </a>
            <Features items={PDF_FEATURES} />
          </article>

          {/* Moldura de vidro em volta do plano recomendado */}
          <div className="plan-frame plans-reveal" style={{ "--i": 2 }}>
            <article className="plan plan--pro">
              <h3>
                PDF + Plataforma
                <span className="plan-tag">Recomendado</span>
              </h3>
              <p className="plan-price">
                <span>R$</span>
                {PRICE_FULL}
              </p>
              <p className="plan-note">
                Pagamento único. Só R$ {PRICE_FULL - PRICE_PDF} a mais.
              </p>
              <a
                className="plan-cta"
                href={CHECKOUT.full}
                onClick={() => trackCheckout("PDF + Plataforma", PRICE_FULL)}
              >
                Quero o guia completo
              </a>
              <Features items={FULL_FEATURES} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}