import React, { useState, useEffect } from "react";
import "./Tess.css";

import logoGauss from "./img/logo_gauss.jpg";
import tessBg from "./img/telescopo_tess.jpg";

export default function TessPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  // Fecha o menu com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="tess-root">
      {/* ===== HEADER ===== */}
      <header className="header">
        <a href="/principal" className="logo" onClick={closeMenu}>
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
        <nav id="primary-nav" className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/history" className="active" onClick={closeMenu}>Telescopes</a>
          <a href="/exploring" onClick={closeMenu}>Exploring Exoplanets</a>
          <a href="/discover" id="discover" onClick={closeMenu}>
            Discovering with AI
          </a>
        </nav>
      </header>

      {/* ===== HERO / BACKGROUND ===== */}
      <div
        className="tess-hero"
        style={{ backgroundImage: `url(${tessBg})` }}
        role="img"
        aria-label="TESS Satellite in Space"
      >
        <div className="tess-overlay" />

        {/* ===== MAIN CONTENT ===== */}
        <main className="tess-content">
          <article className="tess-card">
            <h1>TESS (Transiting Exoplanet Survey Satellite)</h1>

            <p className="tess-lead">
              NASA’s TESS discovers exoplanets — worlds beyond our Solar System.
              Through extended sky surveys, it detects and monitors objects that
              vary in brightness, from near-Earth asteroids and pulsating stars to
              distant galaxies containing supernovas.
            </p>

            <h2>Mission</h2>
            <p>
              On July 4, the Transiting Exoplanet Survey Satellite (TESS) completed
              its primary mission, capturing images of about 75% of the sky during a
              two-year survey. By assembling this giant mosaic, TESS identified tens
              of thousands of exoplanet candidates, as well as valuable transient and
              variable phenomena for science.
            </p>
            <p>
              So far, the mission has identified over 6,000 candidates and confirmed
              hundreds of exoplanets — some within habitable zones — while more than
              2,000 remain under analysis by the scientific community.
            </p>
            <p>
              Beyond exoplanets, TESS also detects stellar flares, Solar System
              comets, and even supernovas in distant galaxies, offering a dynamic
              view of the universe.
            </p>
          </article>
        </main>
      </div>
    </div>
  );
}
