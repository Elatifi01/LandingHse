import { useEffect, useState } from "react";
import "./App.css";

const ICON_PATHS = {
  checkbox: (
    <>
      <path d="M9 11l2 2 4-4" />
      <rect x="4" y="3" width="16" height="18" rx="2" />
    </>
  ),
  shield: <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />,
  list: <path d="M4 7h16M4 12h16M4 17h10" />,
  bars: <path d="M4 19V5M4 19h16M8 16V9M13 16v-4M18 16V7" />,
  check: (
    <>
      <path d="M9 11l2 2 4-4" />
      <rect x="4" y="3" width="16" height="18" rx="2" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  book: (
    <>
      <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z" />
      <path d="M5 17a3 3 0 013-3h11" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 21h4" />
    </>
  ),
  folder: (
    <path d="M4 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  link: (
    <>
      <path d="M9 15l6-6" />
      <path d="M10 6l1-1a4 4 0 016 6l-1 1" />
      <path d="M14 18l-1 1a4 4 0 01-6-6l1-1" />
    </>
  ),
  chart: <path d="M4 19V5M4 19h16M8 16V9M13 16v-4M18 16V7" />,
  pdf: (
    <>
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M14 3v6h6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  doc: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  logo: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrowR: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowD: <path d="M12 5v14M6 13l6 6 6-6" />,
  chevL: <path d="M15 6l-6 6 6 6" />,
  chevR: <path d="M9 6l6 6-6 6" />,
};

const NAV_LINKS = [
  ["#plateforme", "La plateforme"],
  ["#solution", "Fonctionnalités"],
  ["#sites", "Multi-sites"],
  ["#rapports", "Rapports"],
  ["#contact", "Contact"],
];

const SOLUTION_TABS = [
  {
    label: "Audits & checklists",
    icon: "checkbox",
    cap: "Aperçu - modèle d'audit personnalisable",
    feats: [
      [
        "check",
        "Checklists personnalisables",
        "Créez vos modèles d'audit adaptés à chaque site, métier et norme applicable.",
      ],
      [
        "phone",
        "Audits terrain sur mobile",
        "Réalisez vos inspections même hors ligne, photos et signatures à l'appui.",
      ],
      [
        "history",
        "Historique complet",
        "Retrouvez chaque audit et son contexte, archivé et horodaté.",
      ],
    ],
  },
  {
    label: "Conformité réglementaire",
    icon: "shield",
    cap: "Aperçu - suivi des obligations réglementaires",
    feats: [
      [
        "book",
        "Veille réglementaire",
        "Suivez les obligations applicables à votre activité, mises à jour en continu.",
      ],
      [
        "bell",
        "Alertes automatiques",
        "Soyez prévenu avant chaque échéance, contrôle périodique ou renouvellement.",
      ],
      [
        "folder",
        "Preuves de conformité",
        "Centralisez documents, certificats et justificatifs en un seul endroit.",
      ],
    ],
  },
  {
    label: "Plans d'action",
    icon: "list",
    cap: "Aperçu - suivi des actions correctives",
    feats: [
      [
        "target",
        "Actions correctives",
        "Assignez, priorisez et suivez chaque action jusqu'à sa clôture.",
      ],
      [
        "link",
        "Traçabilité totale",
        "Conservez l'historique des responsables, délais et changements de statut.",
      ],
      [
        "bell",
        "Relances intelligentes",
        "Automatisez les rappels pour qu'aucune action ne reste en suspens.",
      ],
    ],
  },
  {
    label: "Tableaux de bord",
    icon: "bars",
    cap: "Aperçu - tableau de bord consolidé",
    feats: [
      [
        "chart",
        "KPI en temps réel",
        "Visualisez taux de conformité, incidents et tendances d'un coup d'œil.",
      ],
      [
        "pdf",
        "Rapports PDF exportables",
        "Générez des rapports prêts à présenter en un seul clic.",
      ],
      [
        "layers",
        "Vue consolidée",
        "Comparez la performance HSE entre l'ensemble de vos sites.",
      ],
    ],
  },
];

const HERO_REPORTS = [
  "Rapport de conformité - T2 2026",
  "Synthèse des audits - Site de Lyon",
  "Plan d'action - Risque chimique",
];

const MOROCCO_PINS = [
  {
    name: "Tanger",
    left: "59.2%",
    top: "14.9%",
    labelX: "18px",
    labelY: "-16px",
  },
  {
    name: "Oujda",
    left: "74.0%",
    top: "24.5%",
    labelX: "20px",
    labelY: "-9px",
  },
  {
    name: "Rabat",
    left: "56.2%",
    top: "25.3%",
    labelX: "20px",
    labelY: "-24px",
  },
  { name: "Fès", left: "61.1%", top: "27.4%", labelX: "20px", labelY: "-1px" },
  {
    name: "Casablanca",
    left: "48.9%",
    top: "31.9%",
    labelX: "24px",
    labelY: "-8px",
  },
  {
    name: "Marrakech",
    left: "51.8%",
    top: "42.9%",
    labelX: "24px",
    labelY: "-4px",
  },
  {
    name: "Agadir",
    left: "46.6%",
    top: "49.0%",
    labelX: "22px",
    labelY: "-3px",
  },
  {
    name: "Laâyoune",
    left: "29.8%",
    top: "68.3%",
    labelX: "26px",
    labelY: "-6px",
  },
];

const FOOTER_COLS = [
  [
    "Produit",
    [
      ["#solution", "Audits & checklists"],
      ["#solution", "Conformité réglementaire"],
      ["#solution", "Plans d'action"],
      ["#rapports", "Tableaux de bord"],
    ],
  ],
  [
    "Secteurs",
    [
      ["#", "Industrie & production"],
      ["#", "BTP & construction"],
      ["#", "Énergie"],
      ["#", "Chimie & logistique"],
    ],
  ],
  [
    "Ressources",
    [
      ["#", "Documentation"],
      ["#", "Veille réglementaire"],
      ["#", "Études de cas"],
      ["#", "Centre d'aide"],
    ],
  ],
  [
    "Entreprise",
    [
      ["#", "À propos"],
      ["#contact", "Contact"],
      ["#", "Sécurité & RGPD"],
      ["#", "Mentions légales"],
    ],
  ],
];

const ASSETS = {
  moroccoMap: "/assets/images/moroccoMap.png",
  reportsFlow: "/assets/images/reportsFlow.png",
  solutionImg: "/assets/images/solutionImg.png",
};

const TRUSTED_LOGOS = [
  {
    name: "Colorado",
    src: "/assets/logos/colorado.png",
    className: "colorado",
  },
  {
    name: "Lesieur Cristal",
    src: "/assets/logos/lesieur.png",
    className: "lesieur",
  },
  { name: "Cosumar", src: "/assets/logos/cosumar.png", className: "cosumar" },
  {
    name: "TotalEnergies",
    src: "/assets/logos/total-energies.png",
    className: "total",
  },
  {
    name: "Afriquia Gaz",
    src: "/assets/logos/afriquia-gaz.png",
    className: "afriquia",
  },
];

function Icon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="#top">
      <span className="logo">
        <Icon name="logo" />
      </span>
      HSE&nbsp;Platform
    </a>
  );
}

function Nav({ scrolled }) {
  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="nav-in">
        <Brand />
        <nav className="nav-links">
          {NAV_LINKS.map(([href, label]) => (
            <a key={`${href}${label}`} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-right"></div>
      </div>
    </header>
  );
}

function FloatCard() {
  const [i, setI] = useState(0);
  const move = (dir) =>
    setI((p) => (p + dir + HERO_REPORTS.length) % HERO_REPORTS.length);
  const idx = `${String(i + 1).padStart(2, "0")} / 0${HERO_REPORTS.length}`;

  return (
    <div className="float-card">
      <div className="fc-top">
        <div className="fc-title">{HERO_REPORTS[i]}</div>
        <div className="fc-pager">
          <button aria-label="Précédent" onClick={() => move(-1)} type="button">
            <Icon name="chevL" />
          </button>
          <button aria-label="Suivant" onClick={() => move(1)} type="button">
            <Icon name="chevR" />
          </button>
        </div>
      </div>
      <hr />
      <div className="fc-bot">
        <a className="fc-link" href="#rapports">
          Consulter le rapport <Icon name="arrowR" className="arrow" />
        </a>
        <span className="fc-idx">{idx}</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <span className="eyebrow">Hygiène · Sécurité · Environnement</span>
        <h1 className="display">
          Pilotez votre <span className="hl">conformité HSE</span> sur tous vos
          sites industriels.
        </h1>
      </div>
      <div className="wrap hero-foot">
        <a className="btn btn-ghost hero-cta" href="#plateforme">
          Découvrir la plateforme
          <span className="ic">
            <Icon name="arrowD" className="arrow" />
          </span>
        </a>
        <FloatCard />
      </div>
      <div className="hero-bg" aria-hidden="true">
        <video autoPlay loop muted playsInline>
          <source src="/assets/Video/hse_video.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
}

function Trusted() {
  return (
    <section className="trusted wrap">
      <span className="eyebrow">Ils nous font confiance</span>
      <div className="logos">
        {TRUSTED_LOGOS.map((logo) => (
          <span className={`logo-card ${logo.className}`} key={logo.name}>
            <img src={logo.src} alt={logo.name} />
          </span>
        ))}
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section className="sec wrap" id="plateforme">
      <div className="intro-grid">
        <div className="reveal">
          <span className="eyebrow">La plateforme</span>
          <h2>
            Une solution pensée pour les équipes <span className="hl">HSE</span>{" "}
            de l'industrie.
          </h2>
        </div>
        <div className="intro-body reveal">
          <p>
            HSE Platform centralise vos audits, votre conformité réglementaire
            et vos plans d'action correctifs dans un même outil, conçu pour les
            environnements industriels exigeants : production, BTP, énergie,
            chimie et logistique.
          </p>
          <p>
            Fini les tableurs dispersés et les classeurs papier. Vos
            responsables sécurité, vos chefs de site et votre direction
            partagent une vision unique, à jour en temps réel, du niveau de
            conformité de chaque établissement.
          </p>
          <p>
            Déployée sur un ou cent sites, la plateforme s'adapte à votre
            organisation grâce à une gestion fine des rôles et des accès - et
            garde la traçabilité complète de chaque décision.
          </p>
          <a className="btn btn-green" href="#solution">
            En savoir plus{" "}
            <span className="ic">
              <Icon name="arrowR" className="arrow" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const [tab, setTab] = useState(0);
  const active = SOLUTION_TABS[tab];

  return (
    <section className="solution" id="solution">
      <div className="sec wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Notre solution</span>
          <h2>Tout ce qu'il faut pour gérer la sécurité au quotidien.</h2>
        </div>

        <div className="tabbar" role="tablist">
          {SOLUTION_TABS.map((t, i) => (
            <button
              key={t.label}
              className={`tab${i === tab ? " active" : ""}`}
              role="tab"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
              type="button"
            >
              <Icon name={t.icon} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="sol-grid">
          <div className="sol-figure reveal">
            <img
              src={ASSETS.solutionImg}
              alt="Aperçu du tableau de bord HSE sur tablette"
            />
            <span className="ph-cap">{active.cap}</span>
          </div>
          <div className="sol-list reveal">
            {active.feats.map(([ic, title, desc]) => (
              <div className="feat" key={title}>
                <span className="fic">
                  <Icon name={ic} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MultiSite() {
  return (
    <section className="dark-wrap" id="sites">
      <div className="wrap">
        <div className="dark-sec">
          <div className="dark-inner">
            <div className="dark-top">
              <div>
                <span className="eyebrow">Pilotage multi-sites</span>
                <h2>
                  Tous vos sites,
                  <br />
                  une seule vue.
                </h2>
              </div>
              <div className="dark-side">
                <p>
                  Comparez le niveau de conformité, les audits en cours et les
                  actions en retard entre l'ensemble de vos établissements.
                  Chaque site dispose de ses propres responsables, modèles et
                  accès - la direction garde la vision consolidée.
                </p>
                <a className="btn btn-dark" href="#contact">
                  Voir la démo{" "}
                  <span className="ic">
                    <Icon name="arrowR" className="arrow" />
                  </span>
                </a>
              </div>
            </div>

            <div className="map">
              <img
                src={ASSETS.moroccoMap}
                alt="Carte du Maroc - réseau de sites HSE"
              />
              <span className="map-cap">Réseau national - Maroc</span>
              {MOROCCO_PINS.map((p) => (
                <div
                  className="pin"
                  style={{
                    left: p.left,
                    top: p.top,
                    "--label-x": p.labelX,
                    "--label-y": p.labelY,
                  }}
                  key={p.name}
                >
                  <span className="dot"></span>
                  <span className="lbl">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reports() {
  return (
    <section className="sec wrap" id="rapports">
      <div className="rep-grid">
        <div className="reveal">
          <span className="eyebrow">Rapports &amp; KPI</span>
          <h2 className="reports-title">
            Des indicateurs clairs, des rapports prêts à présenter.
          </h2>
          <p className="lead reports-copy">
            Suivez vos taux de conformité, vos incidents et vos délais de
            clôture en temps réel. Générez en un clic des rapports PDF prêts
            pour vos comités, vos clients ou vos audits externes.
          </p>
          <a className="btn btn-green reports-button" href="#contact">
            Voir tous les rapports{" "}
            <span className="ic">
              <Icon name="arrowR" className="arrow" />
            </span>
          </a>
        </div>
        <div className="rep-figure reveal">
          <img
            src={ASSETS.reportsFlow}
            alt="Du tableau de bord HSE au rapport PDF exportable"
          />
          <div className="stat-card s1">
            <span className="sic">
              <Icon name="doc" />
            </span>
            <div>
              <div className="num">142</div>
              <div className="cap">Audits réalisés ce trimestre</div>
            </div>
          </div>
          <div className="stat-card s3">
            <span className="sic">
              <Icon name="clock" />
            </span>
            <div>
              <div className="num">12&nbsp;j</div>
              <div className="cap">Délai moyen de clôture d'action</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta wrap" id="contact">
      <div className="cta-box reveal">
        <h2>Prêt à reprendre le contrôle de votre conformité HSE&nbsp;?</h2>
        <a className="btn btn-dark" href="#contact">
          Demander une démo{" "}
          <span className="ic">
            <Icon name="arrowR" className="arrow" />
          </span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Brand />
            <p className="lead">
              La plateforme de pilotage Hygiène, Sécurité &amp; Environnement
              pour les entreprises industrielles multi-sites.
            </p>
          </div>
          {FOOTER_COLS.map(([title, links]) => (
            <div className="foot-col" key={title}>
              <h4>{title}</h4>
              {links.map(([href, label]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-bot">
          <span>© 2026 HSE Platform - Tous droits réservés.</span>
          <span>Conçu pour l'industrie .</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reveals = () => Array.from(document.querySelectorAll(".reveal"));
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      reveals().forEach((el) => {
        if (el.classList.contains("in")) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("in");
      });
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    const fallback = setTimeout(
      () => reveals().forEach((el) => el.classList.add("in")),
      1500,
    );
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <Nav scrolled={scrolled} />
      <main id="top">
        <Hero />
        <Trusted />
        <Platform />
        <Solution />
        <MultiSite />
        <Reports />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
