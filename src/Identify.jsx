import { useEffect, useRef } from "react";
import avatar from "./assets/Cute Avatar.svg";

function Avatar() {
  return (
    <img className="idf-avatar" src={avatar} alt="Avatar" />
  );
}

export default function Identify() {
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
    root.querySelectorAll(".idf-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="idf" id="identifica" ref={ref}>
      <div className="wrap">
        <div className="idf-head idf-reveal">
          <h2>Você se identifica?</h2>
        </div>

        <figure className="idf-quote idf-reveal" style={{ "--i": 1 }}>
          <Avatar />
          <div className="idf-quote-body">
            <blockquote>
              <p>
                “Não sei por onde começar. Será que o que estou estudando é o
                certo? Só rever as provas anteriores basta?”
              </p>
            </blockquote>
            <figcaption>
              <strong>Candidata à ETEC</strong>
              <span>A dúvida de quem estuda sem direção</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}