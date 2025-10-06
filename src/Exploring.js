import React, { useState, useEffect } from "react";
import "./Exploring.css";

import logoGauss from "./img/logo_gauss.jpg";
import bgSpace from "./img/explorar.jpg"; // background image

const planets = [
  { name: "TOI-5799 c", radius: "1.70 × Earth", type: "Super Earth", mass: "3.79 Earths" },
  { name: "Kepler-452 b", radius: "1.60 × Earth", type: "Rocky", mass: "5.0 Earths" },
  { name: "K2-18 b", radius: "2.60 × Earth", type: "Sub-Neptune", mass: "8.6 Earths" },
  { name: "LHS 1140 b", radius: "1.73 × Earth", type: "Rocky", mass: "6.6 Earths" },
  { name: "TRAPPIST-1 e", radius: "0.92 × Earth", type: "Rocky", mass: "0.77 Earths" },
  { name: "TOI-700 d", radius: "1.14 × Earth", type: "Rocky", mass: "1.7 Earths" },
  { name: "GJ 1214 b", radius: "2.85 × Earth", type: "Sub-Neptune", mass: "6.3 Earths" },
  { name: "WASP-96 b", radius: "11.0 × Earth", type: "Hot Jupiter", mass: "0.48 Jupiter" },
];

export default function Exploring() {
  // Estado do menu (hambúrguer)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(v => !v);
  const closeMenu = () => setMenuOpen(false);

  // Fecha com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="explore-root">
      {/* Header */}
      <header className="header">
        <a href="/main" className="logo" onClick={closeMenu}>
          <img src={logoGauss} alt="Gauss Logo" />
        </a>

        {/* Botão hambúrguer (mobile) */}
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navegação */}
        <nav id="primary-nav" className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <a href="/history" onClick={closeMenu}>Telescope</a>
          <a href="/exploring" className="active" onClick={closeMenu}>Exploring Exoplanets</a>
          <a href="/discover" className="discover-btn" onClick={closeMenu}>Discovering with AI</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="explore-hero" style={{ backgroundImage: `url(${bgSpace})` }}>
        <div className="explore-hero__overlay" />
        <div className="explore-hero__text">
          <h1>Exploring<br/>Exoplanets</h1>
        </div>
      </section>

      {/* Blocks (Cards) */}
      <main className="blocos-area">
        {planets.map((p, i) => (
          <article className="bloco" key={i} tabIndex={0}>
            <header className="bloco__topo">
              <h3 className="bloco__titulo">{p.name}</h3>
            </header>

            <div className="bloco__infos">
              <div className="caixa-info">
                <span className="caixa-info__label">Radius</span>
                <span className="caixa-info__valor">{p.radius}</span>
              </div>
              <div className="caixa-info">
                <span className="caixa-info__label">Type</span>
                <span className="caixa-info__valor">{p.type}</span>
              </div>
              <div className="caixa-info">
                <span className="caixa-info__label">Mass</span>
                <span className="caixa-info__valor">{p.mass}</span>
              </div>
            </div>

            {/* Rodapé removido (sem botão Details) */}
          </article>
        ))}
      </main>
    </div>
  );
}
