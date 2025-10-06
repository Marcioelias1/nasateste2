import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./History.css";

import logoGauss from "./img/logo_gauss.jpg";
import slide1 from "./img/telescopo_kepler.png";
import slide2 from "./img/telescopo_tess.jpg";

export default function History() {
  const slides = [
     {
      image: slide1,
      title: "Kepler Space Telescope",
      text: "NASA’s first planet-hunting mission that revealed thousands of worlds beyond our solar system.",
      link: "/kepler",
 },
    {
      image: slide2,
      title: "TESS (Transiting Exoplanet Survey Satellite)",
      text: "Discovering thousands of exoplanets orbiting the brightest nearby stars.",
      link: "/tess",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const length = slides.length;
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  // Fecha o menu com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
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
          <a href="/history" className="active" onClick={closeMenu}>
            Telescopes
          </a>
          <a href="/exploring" onClick={closeMenu}>
            Exploring Exoplanets
          </a>
          <a href="/discover" className="discover-btn" onClick={closeMenu}>
            Discovering with AI
          </a>
        </nav>
      </header>

      {/* Carousel */}
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <>
                {slide.link ? (
                  <Link to={slide.link}>
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="slide-image"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                ) : (
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="slide-image"
                  />
                )}

                <div className="carousel-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                </div>
              </>
            )}
          </div>
        ))}

        <button className="left-arrow" onClick={prevSlide} type="button">
          &#10094;
        </button>
        <button className="right-arrow" onClick={nextSlide} type="button">
          &#10095;
        </button>
      </div>
    </div>
  );
}
