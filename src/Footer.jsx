// Ajuste estes dados quando tiver os endereços reais
const BRAND = "ETEC Study";

const CONTACT = {
  emails: [
    { label: "Empresa: ", address: "contatokiprinte@gmail.com" },
    { label: "Financeiro: ", address: "esscorpcontact@gmail.com" },
  ],
  instagram: { label: "@kiprinte", href: "https://www.instagram.com/kiprinte/" },
};

const LINKS = [
  { label: "Resultado da análise", href: "#analise" },
  { label: "Planos", href: "#planos" },
  { label: "Perguntas frequentes", href: "#faq" },
];

const PAYMENT_GROUPS = [
  {
    label: "Cartão de crédito",
    brands: [
      { id: "visa", label: "Visa" },
      { id: "mastercard", label: "Mastercard" },
    ],
  },
  { label: "Pix", brands: [{ id: "pix", label: "Pix" }] },
  {
    label: "Carteiras digitais",
    brands: [
      { id: "picpay", label: "PicPay" },
      { id: "googlepay", label: "Google Pay" },
      { id: "applepay", label: "Apple Pay" },
    ],
  },
];

const FONT = "Arial, Helvetica, sans-serif";

// Versões simplificadas dos logos, desenhadas em SVG.
const LOGOS = {
  visa: (
    <text
      x="26"
      y="21.5"
      textAnchor="middle"
      fontFamily={FONT}
      fontSize="15"
      fontWeight="800"
      fontStyle="italic"
      letterSpacing="-0.5"
      fill="#1a1f71"
    >
      VISA
    </text>
  ),
  mastercard: (
    <>
      <circle cx="21" cy="16" r="9" fill="#eb001b" />
      <circle cx="31" cy="16" r="9" fill="#f79e1b" />
      <path d="M26 8.52A9 9 0 0 1 26 23.48A9 9 0 0 1 26 8.52Z" fill="#ff5f00" />
    </>
  ),
  elo: (
    <text
      x="26"
      y="21"
      textAnchor="middle"
      fontFamily={FONT}
      fontSize="17"
      fontWeight="800"
      letterSpacing="-0.5"
      fill="#111"
    >
      elo
    </text>
  ),
  pix: (
    <>
      <g fill="#32bcad" transform="translate(14 16) rotate(45)">
        <rect x="-6.8" y="-6.8" width="6" height="6" rx="1.4" />
        <rect x="0.8" y="-6.8" width="6" height="6" rx="1.4" />
        <rect x="-6.8" y="0.8" width="6" height="6" rx="1.4" />
        <rect x="0.8" y="0.8" width="6" height="6" rx="1.4" />
      </g>
      <text
        x="29"
        y="20.5"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="12.5"
        fontWeight="700"
        fill="#4d4d4d"
      >
      </text>
    </>
  ),
  picpay: (
    <text
      x="26"
      y="19.5"
      textAnchor="middle"
      fontFamily={FONT}
      fontSize="11.5"
      fontWeight="800"
      fill="#21c25e"
    >
      PicPay
    </text>
  ),
  googlepay: (
    <text
      x="26"
      y="20"
      textAnchor="middle"
      fontFamily={FONT}
      fontSize="13"
      fontWeight="600"
    >
      <tspan fill="#4285f4">G</tspan>
      <tspan fill="#5f6368"> Pay</tspan>
    </text>
  ),
  applepay: (
    <text
      x="26"
      y="19.5"
      textAnchor="middle"
      fontFamily={FONT}
      fontSize="9.5"
      fontWeight="600"
      fill="#000"
    >
      Apple Pay
    </text>
  ),
};

// Para usar o logo oficial, coloque o arquivo em public/pay/ e informe "src"
// na marca, por exemplo: { id: "visa", label: "Visa", src: "/pay/visa.svg" }
function PayLogo({ brand }) {
  if (brand.src) return <img src={brand.src} alt={brand.label} />;
  return (
    <svg viewBox="0 0 52 32" role="img" aria-label={brand.label}>
      {LOGOS[brand.id]}
    </svg>
  );
}

const PATHS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: <path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6L4 20z" />,
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <img className="ft-logo" src="/logo.svg" alt={BRAND} />
            <p className="ft-about">
              Guia de estratégia e priorização para o vestibulinho das Etecs,
              baseado na análise das provas oficiais.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h4>Navegue</h4>
            <ul className="ft-list">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>Contato</h4>
            <ul className="ft-list">
              {CONTACT.emails.map((e) => (
                <li key={e.address}>
                  <a href={`mailto:${e.address}`}>
                    <Icon name="mail" />
                    <span className="ft-mail">
                      <small>{e.label}</small>
                      {e.address}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.instagram.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="instagram" />
                  {CONTACT.instagram.label}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Pagamento</h4>
            {PAYMENT_GROUPS.map((g) => (
              <div className="ft-pay-group" key={g.label}>
                <p>{g.label}</p>
                <ul className="ft-logos">
                  {g.brands.map((b) => (
                    <li key={b.id} className="ft-logo-tile">
                      <PayLogo brand={b} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-bottom">
          <p>
            Material independente, sem vínculo com o Centro Paula Souza ou com
            as Etecs. Análise própria das provas oficiais de 2024 a 2026 (5
            edições). Não garantimos aprovação ou resultados específicos. Provas
            e gabaritos oficiais em vestibulinho.etec.sp.gov.br.
          </p>
          <p>
            © {new Date().getFullYear()} {BRAND}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}