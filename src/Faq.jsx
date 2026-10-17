import { useEffect, useRef, useState } from "react";

const ITEMS = [
    {
        q: "Tenho garantia de quantos dias?",
        a: "— Garantia de 7 dias. Se o material não fizer sentido para você, devolvemos o valor pago.",
    },
    {
        q: "É para quem?",
        a: "— Vai prestar o vestibulinho das Etecs e quer um caminho claro, com foco no que mais cai.",
    },
    {
        q: "Não é para quem?",
        a: "— Busca aprovação garantida ou curso com aulas em vídeo. É um guia de estratégia e priorização.",
    },
    {
        q: "Preciso de login para a plataforma?",
        a: "— Não. O link de acesso vem no PDF. Seu progresso fica salvo no navegador do seu aparelho.",
    },
    {
        q: "Isso substitui estudar?",
        a: "— Não. O guia mostra o que e como estudar, mas o estudo continua sendo seu.",
    },
    {
        q: "Vêm as provas anteriores?",
        a: "— As provas oficiais são gratuitas no site da ETEC. Indicamos onde treinar cada tema nelas. O valor do guia está na análise.",
    },
    {
        q: "Garante aprovação?",
        a: "— Não. O guia ajuda a estudar com mais foco. A aprovação depende também da nota de corte do curso e da unidade e do seu desempenho.",
    },
    {
        q: "Serve para a prova de 6 de dezembro?",
        a: "— Sim. Ele se baseia nos padrões das provas anteriores. Não prevemos o tema específico de cada edição.",
    },
    {
        q: "Quando recebo?",
        a: "— Por e-mail, logo após a confirmação do pagamento.",
    },
];

export default function Faq() {
    const ref = useRef(null);
    const [open, setOpen] = useState(() => new Set([0]));

    const toggle = (i) =>
        setOpen((prev) => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });

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
            { threshold: 0.1 }
        );
        root.querySelectorAll(".faq-reveal").forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <section className="faq" id="faq" ref={ref}>
            <div className="wrap">
                <div className="faq-head faq-reveal">
                    <h2>Perguntas Frequentes</h2>
                </div>

                <ul className="faq-list">
                    {ITEMS.map((item, i) => {
                        const isOpen = open.has(i);
                        return (
                            <li key={item.q} className="faq-reveal">
                                <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
                                    <h3>
                                        <button
                                            className="faq-q"
                                            id={`faq-q-${i}`}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-a-${i}`}
                                            onClick={() => toggle(i)}
                                        >
                                            {item.q}
                                            <span className="faq-icon" aria-hidden="true" />
                                        </button>
                                    </h3>
                                    <div
                                        className="faq-a"
                                        id={`faq-a-${i}`}
                                        role="region"
                                        aria-labelledby={`faq-q-${i}`}
                                    >
                                        <div>
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}