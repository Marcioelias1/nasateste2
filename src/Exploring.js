import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Exploring.css";

import logoGauss from "./img/logo_gauss.jpg";
import bgSpace from "./img/explorar.jpg"; // background image





export default function Exploring() {

  const [planets, setPlanetas] = useState([])

  async function obterPlanetas() {

    try {

      const response = await axios.get('http://localhost:5090/get-planets')
      console.log(response.data);
     
      setPlanetas(response.data)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    obterPlanetas()
  },[])


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
          <h1>Exploring<br />Exoplanets</h1>
        </div>
      </section>

      {/* Blocks (Cards) */}
      <main className="blocos-area">
        {planets.map((p, i) => (
          <article className="bloco" key={i} tabIndex={0}>
            <header className="bloco__topo">
              <h3 className="bloco__titulo">{p.kepoi_name}</h3>
            </header>

            <div className="bloco__infos">
              <div className="caixa-info">
                <span className="caixa-info__label">Orbital Period</span>
                <span className="caixa-info__valor">{p.koi_period.toFixed(2)} years</span>
              </div>
              <div className="caixa-info">
                <span className="caixa-info__label">Radius</span>
                <span className="caixa-info__valor">{p.koi_prad} thousand killometers</span>
              </div>
              <div className="caixa-info">
                <span className="caixa-info__label">Equilibrium Temperature</span>
                <span className="caixa-info__valor">{p.koi_teq} K°</span>
              </div>
            </div>

            {/* Rodapé removido (sem botão Details) */}
          </article>
        ))}
      </main>
    </div>
  );
}
