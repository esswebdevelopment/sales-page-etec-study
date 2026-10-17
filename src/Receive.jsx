import { useEffect, useRef } from "react";

const ITEMS = [
  { label: "Mapa Mental de estudos", color: "var(--sun)" },
  { label: "Matérias que mais caem", color: "var(--brand)" },
  { label: "O que estudar", color: "var(--brand-d)" },
  { label: "Prioridades de estudos", color: "var(--sun)" },
  { label: "Questões que mais caem", color: "var(--brand)" },
  { label: "Padrões repetitivos de perguntas", color: "var(--brand-d)" },
  { label: "Roteiro de 7, 4 e 2 semanas", color: "var(--sun)" },
];

export default function Receive() {
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
      { threshold: 0.2 }
    );
    root.querySelectorAll(".rcv-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="rcv" id="recebo" ref={ref}>
      <div className="wrap">
        <div className="rcv-head rcv-reveal">
          <h2>O que eu recebo</h2>
        </div>

        <ul className="rcv-list">
          {ITEMS.map((item, i) => (
            <li
              key={item.label}
              className="rcv-item rcv-reveal"
              style={{ "--c": item.color, "--i": i + 1 }}
            >
              <span className="rcv-dot" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}