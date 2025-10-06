import React, { useState } from "react";

import "./Main.css";
import logoGauss from "./img/logo_gauss.jpg";
import Exoplanetas from "./img/Exoplanetas_pag1.jpg";
import Exoplanetas2 from "./img/exoplanetas_nasa.jpg";

export default function Main() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  // fecha com ESC
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={logoGauss} alt="Logo" />
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen ? "true" : "false"}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="primary-nav" className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/history" onClick={closeMenu}>Telescope</a>
          <a href="/exploring" onClick={closeMenu}>Exploring Exoplanets</a>
          <a href="/discover" id="discover" onClick={closeMenu}>
            Discovering with AI
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          {/* Texto principal (esquerda) */}
          <div className="hero-text">
            <h2>
              Eyes Beyond the Sky: Artificial intelligence that sees planets
              where there was only darkness.
            </h2>
            <p>
              Exoplanets are planets that orbit stars outside our Solar System.
              They can be rocky,<span className="terra"> like Earth</span>, or
              gaseous,<span className="jupiter"> like Jupiter</span>, and are
              studied to better understand
              <span className="destaque"> the Universe</span> and the
              possibility of life elsewhere.
            </p>
          </div>

          {/* Box (direita) */}
          <aside className="hero-box">
            <h3>🌌 Explore the Universe</h3>
            <p>
              Experience our 3D exoplanet simulation and travel through distant
              worlds. See how planets orbit their stars and discover habitable
              zones.
            </p>
            <a
              href="/orbit.html"
              className="btn-simulate"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Simulation
            </a>
          </aside>
        </div>
      </section>

      {/* Exoplanets Section */}
      <section className="exoplanetas-section">
        <div className="texto">
          <h2>How do we find exoplanets?</h2>
          <p>
            When a planet passes directly between an observer and the star it
            orbits, it blocks some of that star's light. For a brief period, the
            star's light dims slightly. This is enough to give astronomers a
            clue of the presence of an exoplanet. This is known as the{" "}
            <span className="highlight">transit method</span>.
          </p>
          <p>
            Planets in orbit cause stars to wobble in space, changing the color
            of the light astronomers observe. If the star moves toward the
            observer, it appears blue-shifted. If it moves away, it appears
            red-shifted. Observing this is known as the{" "}
            <span className="highlight">radial velocity method</span>.
          </p>
          <h2>Discovering Exoplanets with AI</h2>
          <p>
            Data from various space missions surveying exoplanets have allowed
            the discovery of thousands of new planets outside our solar system,
            but most of these exoplanets were identified manually. With advances
            in artificial intelligence and machine learning (AI/ML), it is now
            possible to automatically analyze large datasets collected by these
            missions to identify exoplanets.
          </p>
          <p>
            Our system consists of an artificial intelligence model trained on
            open-source exoplanet datasets provided by NASA, allowing it to
            analyze patterns and generate insights about these planets beyond the
            Solar System.
          </p>
        </div>
        <div className="imagem">
          <img
            src={Exoplanetas2}
            alt="Exoplanets"
            className="fade-in-on-scroll"
          />
        </div>
      </section>
    </div>
  );
}
