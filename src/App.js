import React, { useEffect, useState } from "react";
import Main from "./Main";
import History from "./History";
import Tess from "./Tess";
import Kepler from "./Kepler";
import Exploring from "./Exploring";
import Discover from "./Discover";
import ResultsAI from "./ResultsAI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.volume = 0.1; 

      if (isPlaying) {
        audio.play().catch(() => {
          console.log("Autoplay bloqueado, aguardando interação do usuário.");
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return (
    <Router>
      <div className="App">
        {/*  Music global*/}
        <audio id="bg-music" loop>
          <source src="/bgmusic.mp3" type="audio/mpeg" />
        </audio>

        {/* Button control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            fontSize: "20px",
            cursor: "pointer",
            backdropFilter: "blur(3px)",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
          title={isPlaying ? "Pausar música" : "Tocar música"}
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>

        {/* routes*/}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/history" element={<History />} />
          <Route path="/exploring" element={<Exploring />} />
          <Route path="/tess" element={<Tess />} />
          <Route path="/kepler" element={<Kepler />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/resultsAI" element={<ResultsAI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
