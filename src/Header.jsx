import { useEffect, useRef, useState } from "react";
import UrgencyBar from "./UrgencyBar";

export default function Header() {
  const ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!reduce) {
        const y = Math.min(window.scrollY, el.offsetHeight);
        el.style.setProperty("--y", y);
      }
      setScrolled(window.scrollY > 40);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hd" ref={ref}>
      <svg
        className="hd-shapes"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#C9D8FF" />
            <stop offset=".5" stopColor="#2F5BEA" />
            <stop offset="1" stopColor="#0A1233" />
          </linearGradient>
          <linearGradient
            id="g2"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="260"
          >
            <stop offset="0" stopColor="#8FA3C8" />
            <stop offset="1" stopColor="#2F5BEA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g3" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#E3ECFF" />
            <stop offset="1" stopColor="#2F5BEA" />
          </linearGradient>
        </defs>

        {/* Camada distante: sobe além do topo para encostar na faixa amarela */}
        <g className="layer layer-far">
          <polygon points="385,-200 1190,260 1190,-200" fill="url(#g2)" />
          <polygon
            points="1190,260 1440,130 1440,-200 1190,-200"
            fill="#1B3A8F"
            opacity=".7"
          />
        </g>

        <g className="layer layer-mid">
          <polygon points="0,110 370,300 370,760 0,460" fill="url(#g1)" />
          <polygon points="0,380 370,560 370,760 0,760" fill="#060B1F" opacity=".85" />
        </g>

        <g className="layer layer-near">
          <polygon points="25,610 255,500 255,760 25,760" fill="url(#g3)" />
        </g>
      </svg>

      <UrgencyBar />

      <nav
        className={`hd-nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Principal"
      >
        <a className="hd-logo" href="#top">
          <img src="/logo.svg" alt="Logo" />
        </a>
      </nav>

      <div className="hd-body" id="top">
        <h1>
          Pare de estudar tudo.
          <br />
          Estude o que a ETEC mais cobra, na ordem certa, até 6 de dezembro.
        </h1>
        <a className="hd-scroll" href="#modulos" aria-label="Rolar para baixo">
          <i />
        </a>
      </div>
    </header>
  );
}