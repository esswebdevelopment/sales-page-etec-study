import { useEffect, useRef } from "react";

// Para colocar a foto: salve em public/depoimentos/ e preencha "photo",
// por exemplo: photo: "/depoimentos/ana-vitoria.jpg"
const PEOPLE = [
  {
    name: "Ana Vitória",
    role: "Candidata à Etec",
    initials: "AV",
    photo: "depoimentos/WhatsApp Image 2026-10-20 at 23.06.10.jpeg",
    pain: "Eu estudava tudo e não sabia se era o certo. O guia me mostrou o que mais cai na prova e por onde começar.",
    solution: "Estou animaaaaaada!.",
  },
  {
    name: "Micael Lucas",
    role: "Candidato à Etec",
    initials: "ML",
    photo: "depoimentos/9c929b2d-6fb5-4541-b61b-0b430ffedcfa.jpg",
    pain: "Eu ficava só refazendo prova antiga achando que bastava, mas nem sabia o que treinar de verdade. Aí o guia mostrou os temas que mais caem e como as questões são feitas.",
    solution: "Agora eu sei o que estudar e parei de perder tempo.",
  },
];

export default function Testimonials() {
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
    root.querySelectorAll(".dep-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="dep" id="depoimentos" ref={ref}>
      <div className="wrap">
        <div className="dep-head dep-reveal">
          <h2>Depoimentos</h2>
        </div>

        <ul className="dep-grid">
          {PEOPLE.map((p, i) => (
            <li key={p.name} className="dep-reveal" style={{ "--i": i + 1 }}>
              <figure className="dep-card">
                <blockquote className="dep-quote">
                  <p>
                    {p.pain} <strong>{p.solution}</strong>
                  </p>
                </blockquote>

                <figcaption className="dep-who">
                  <div className="dep-photo">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} />
                    ) : (
                      <span aria-hidden="true">{p.initials}</span>
                    )}
                  </div>
                  <div>
                    <strong>{p.name}</strong>
                    <span>{p.role}</span>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}