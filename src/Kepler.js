import React, { useState, useEffect } from "react";
import "./Kepler.css";

import logoGauss from "./img/logo_gauss.jpg";
import keplerBg from "./img/telescopo_kepler.png"; // <- caminho pedido

export default function Kepler() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(v => !v);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="kepler-root">
      {/* ===== HEADER ===== */}
      <header className="kepler-header">
        <a href="/main" className="kepler-logo" onClick={closeMenu}>
          <img src={logoGauss} alt="Gauss Logo" />
        </a>

        <button
          className={`kepler-menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="kepler-nav"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="kepler-nav" className={`kepler-nav-menu ${menuOpen ? "open" : ""}`}>
          <a href="/history" className="active" onClick={closeMenu}>Telescope</a>
          <a href="/exploring" onClick={closeMenu}>Exploring Exoplanets</a>
          <a href="/discover" className="kepler-discover-btn" onClick={closeMenu}>
            Discovering with AI
          </a>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <div
        className="kepler-hero"
        style={{ backgroundImage: `url(${keplerBg})` }}
        role="img"
        aria-label="Kepler Space Telescope"
      >
        <div className="kepler-overlay" />

        <main className="kepler-content">
          <article className="kepler-card">
            <h1>Kepler / K2</h1>

            <p className="kepler-lead">
              The Kepler space telescope was NASA’s first planet-hunting mission, assigned to search a portion of the Milky Way galaxy for Earth-sized planets orbiting stars
               outside our solar system. During nine years in deep space Kepler, and its second act, the extended mission dubbed K2, showed our galaxy contains billions of hidden 
               "exoplanets," many of which could be promising places for life
              . They proved that our night sky is filled with more planets than even stars — knowledge that revolutionizes the understanding of our place in the cosmos.
            </p>

            <h2>Discovery</h2>
            <p>
              Kepler has opened our eyes to the diversity of planets that exist in our galaxy. Analysis of Kepler’s discoveries concludes that 20 to 50 percent of the stars visible in
               the night sky are likely to have small, possibly rocky, planets similar in size to Earth, and located within the habitable zone of their parent stars. That means they’re
               located at distances from their parent stars where liquid water — a vital ingredient to life as we know it — might pool on the planet's surface.
            </p>
          </article>
        </main>
      </div>
    </div>
  );
}
