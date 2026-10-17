import { useEffect, useState } from "react";

// Prova: 6 de dezembro de 2026 (horário de Brasília)
const EXAM = new Date("2026-12-06T00:00:00-03:00").getTime();

// A faixa só aparece a partir do lançamento (segunda, 19/10/2026).
// Para testar antes, coloque uma data no passado, por exemplo "2026-01-01".
const SHOW_FROM = new Date("2026-10-19T00:00:00-03:00").getTime();

const pad = (n) => String(n).padStart(2, "0");

function planText(days) {
  const weeks = Math.floor(days / 7);
  if (days <= 3) return "Hoje é dia de cola das 72 horas";
  if (days < 14) return "Reta final: foque só no nível 1";
  return `${weeks} semanas para estudar o que a ETEC mais cobra`;
}

export default function UrgencyBar() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = EXAM - now;
  if ((!import.meta.env.DEV && now < SHOW_FROM) || diff <= 0) return null;

  const total = Math.floor(diff / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return (
    <div className="urg">
      <span className="urg-dot" aria-hidden="true" />
      <span className="urg-time" role="timer">
        Prova em <b>{d}d</b> <b>{pad(h)}h</b> <b>{pad(m)}m</b> <b>{pad(s)}s</b>
      </span>
      <span className="urg-sep" aria-hidden="true" />
      <span className="urg-plan">{planText(d)}</span>
    </div>
  );
}