import React, { useMemo, useState, useEffect } from "react";
import "./ResultsAI.css";
import logoGauss from "./img/logo_gauss.jpg";

export default function ResultsAI() {
  // Estados-base
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null); // aqui entra o retorno real da sua IA

  // Estado do menu responsivo
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  // Fecha o menu com ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mock para rascunho
  const mockData = useMemo(() => ({
    modelInfo: {
      name: "ExoNet",
      version: "v0.9.3",
      trainedOn: "2025-09-12",
      dataset: "NASA Open Exoplanets (curated)",
      runtime: "2.3s",
      parameters: 12_500_000
    },
    metrics: {
      accuracy: 0.923,
      precision: 0.901,
      recall: 0.887,
      f1: 0.894,
      auc: 0.951
    },
    confusionMatrix: [
      [210, 18],
      [22, 185]
    ],
    featureImportances: [
      { name: "Transit Depth (ppm)", value: 0.34 },
      { name: "Orbital Period (days)", value: 0.26 },
      { name: "S/N Ratio", value: 0.19 },
      { name: "Host Star Temp (K)", value: 0.12 },
      { name: "Host Star Radius (R☉)", value: 0.09 }
    ],
    predictions: [
      { id: "TOI-700 d", prob: 0.91, label: "Candidate", truth: "Positive" },
      { id: "LHS 1140 b", prob: 0.84, label: "Candidate", truth: "Positive" },
      { id: "WASP-96 b", prob: 0.12, label: "Non-candidate", truth: "Negative" },
      { id: "Kepler-452 b", prob: 0.72, label: "Candidate", truth: "Positive" }
    ],
    warnings: [
      "High class imbalance detected (ratio ~1:2). Consider weighted loss.",
      "2% missing values imputed in features: Star Radius, S/N Ratio."
    ],
    payloadEcho: {
      mode: "csv",
      rows: 1024,
      columns: 18,
      mapping: { v1: "TransitDepth", v2: "Period", v3: "SN", v4: "TempK", v5: "RadiusRsun" }
    }
  }), []);

  const loadMock = () => {
    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 600);
  };

  const clearAll = () => {
    setData(null);
    setErrorMsg("");
  };

  // Helpers
  const pct = (n) => (n * 100).toFixed(1) + "%";
  const downloadJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "ai_results.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const copyJSON = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert("Copied JSON to clipboard.");
    } catch {
      alert("Copy failed.");
    }
  };

  const cm = data?.confusionMatrix || [[0,0],[0,0]];
  const cmTotals = useMemo(() => {
    const tn = cm[0][0], fp = cm[0][1], fn = cm[1][0], tp = cm[1][1];
    return { tn, fp, fn, tp, total: tn + fp + fn + tp };
  }, [cm]);

  return (
    <div className="ai-results-root">
      {/* Header */}
      <header className="header">
        <a href="/main" className="logo" onClick={closeMenu}>
          <img src={logoGauss} alt="Logo" />
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
          <a href="/history" onClick={closeMenu}>Telescopes</a>
          <a href="/exploring" onClick={closeMenu}>Exploring Exoplanets</a>
          <a href="/discover" id="discover" onClick={closeMenu}>Discovering with AI</a>
        </nav>
      </header>

      <main className="results-content">
        <section className="results-panel">
          <div className="panel-head">
            <h1>AI Analysis Results</h1>
            <div className="actions">
              <button className="btn" type="button" onClick={loadMock}>Load Mock</button>
              <button className="btn" type="button" onClick={clearAll}>Clear</button>
              <button className="btn" disabled={!data} onClick={copyJSON} type="button">Copy JSON</button>
              <button className="btn primary" disabled={!data} onClick={downloadJSON} type="button">Download JSON</button>
            </div>
          </div>

          {/* Loading / Error / Empty */}
          {loading && (
            <div className="skeleton">
              <div className="sk-row" />
              <div className="sk-grid">
                <div className="sk-card" />
                <div className="sk-card" />
                <div className="sk-card" />
                <div className="sk-card" />
                <div className="sk-card" />
              </div>
              <div className="sk-block" />
            </div>
          )}
          {errorMsg && <div className="error">{errorMsg}</div>}
          {!loading && !data && !errorMsg && (
            <div className="empty">
              <p>No results yet. Load mock data or run the AI pipeline.</p>
            </div>
          )}

          {/* Conteúdo quando há dados */}
          {!loading && data && (
            <>
              {/* Overview cards */}
              <section className="cards">
                <div className="card">
                  <span className="k">Accuracy</span>
                  <strong className="v">{pct(data.metrics.accuracy)}</strong>
                </div>
                <div className="card">
                  <span className="k">Precision</span>
                  <strong className="v">{pct(data.metrics.precision)}</strong>
                </div>
                <div className="card">
                  <span className="k">Recall</span>
                  <strong className="v">{pct(data.metrics.recall)}</strong>
                </div>
                <div className="card">
                  <span className="k">F1 Score</span>
                  <strong className="v">{pct(data.metrics.f1)}</strong>
                </div>
                <div className="card">
                  <span className="k">AUC</span>
                  <strong className="v">{pct(data.metrics.auc)}</strong>
                </div>
              </section>

              {/* Confusion Matrix + Feature Importance */}
              <section className="grid-2">
                <div className="block">
                  <h3>Confusion Matrix</h3>
                  <div className="cm-grid" aria-label="Confusion Matrix">
                    {/* header */}
                    <div className="cm-cell cm-empty" />
                    <div className="cm-cell cm-h">Pred: Negative</div>
                    <div className="cm-cell cm-h">Pred: Positive</div>
                    {/* row 1 */}
                    <div className="cm-cell cm-v">True: Negative</div>
                    <div className="cm-cell cm-val" title="TN">{cm[0][0]}</div>
                    <div className="cm-cell cm-val" title="FP">{cm[0][1]}</div>
                    {/* row 2 */}
                    <div className="cm-cell cm-v">True: Positive</div>
                    <div className="cm-cell cm-val" title="FN">{cm[1][0]}</div>
                    <div className="cm-cell cm-val" title="TP">{cm[1][1]}</div>
                  </div>
                  <div className="cm-legend">
                    <span>Total: {cmTotals.total}</span>
                    <span>TP: {cmTotals.tp}</span>
                    <span>TN: {cmTotals.tn}</span>
                    <span>FP: {cmTotals.fp}</span>
                    <span>FN: {cmTotals.fn}</span>
                  </div>
                </div>

                <div className="block">
                  <h3>Feature Importances</h3>
                  <div className="fi-list">
                    {data.featureImportances.map((f) => (
                      <div className="fi-item" key={f.name}>
                        <span className="fi-name">{f.name}</span>
                        <div className="fi-bar">
                          <div className="fi-fill" style={{ width: `${Math.round(f.value * 100)}%` }} />
                        </div>
                        <span className="fi-val">{(f.value * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Predictions Table */}
              <section className="block">
                <h3>Predictions (sample)</h3>
                <div className="table">
                  <div className="t-head">
                    <div>ID</div>
                    <div>Probability</div>
                    <div>Label</div>
                    <div>Ground Truth</div>
                  </div>
                  <div className="t-body">
                    {data.predictions.map((p) => (
                      <div className="t-row" key={p.id}>
                        <div>{p.id}</div>
                        <div>{(p.prob * 100).toFixed(1)}%</div>
                        <div className={p.label === "Candidate" ? "pill pill-pos" : "pill pill-neg"}>
                          {p.label}
                        </div>
                        <div>{p.truth}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Model Info + Warnings + Payload */}
              <section className="grid-3">
                <div className="block">
                  <h3>Model Info</h3>
                  <ul className="kv">
                    <li><span>Name</span><strong>{data.modelInfo.name}</strong></li>
                    <li><span>Version</span><strong>{data.modelInfo.version}</strong></li>
                    <li><span>Trained on</span><strong>{data.modelInfo.trainedOn}</strong></li>
                    <li><span>Dataset</span><strong>{data.modelInfo.dataset}</strong></li>
                    <li><span>Parameters</span><strong>{data.modelInfo.parameters.toLocaleString()}</strong></li>
                    <li><span>Runtime</span><strong>{data.modelInfo.runtime}</strong></li>
                  </ul>
                </div>

                <div className="block">
                  <h3>Warnings / Logs</h3>
                  <ul className="warnings">
                    {data.warnings.map((w, i) => (
                      <li key={i}>⚠️ {w}</li>
                    ))}
                  </ul>
                </div>

                <div className="block">
                  <h3>Payload Echo</h3>
                  <pre className="code">
{JSON.stringify(data.payloadEcho, null, 2)}
                  </pre>
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
