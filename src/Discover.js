import React, { useMemo, useState, useEffect } from "react";
import "./Discover.css";
import logoGauss from "./img/logo_gauss.jpg";
import { Link } from "react-router-dom";

export default function Discover() {
  const [mode, setMode] = useState("csv"); // 'csv' | 'twenty'
  const [message, setMessage] = useState("");

  // ====== MENU (hambúrguer)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ====== CSV
  const [csvHeader, setCsvHeader] = useState([]);
  const [csvRows, setCsvRows] = useState([]);
  const [csvMap, setCsvMap] = useState({ v1: "", v2: "", v3: "", v4: "", v5: "" });

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (!lines.length) return { header: [], rows: [] };
    const header = lines[0].split(",").map((h) => h.trim());
    const rows = lines.slice(1).map((line) => {
      const cols = [];
      let cur = "", inQ = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') { inQ = !inQ; }
        else if (c === "," && !inQ) { cols.push(cur.trim()); cur = ""; }
        else { cur += c; }
      }
      cols.push(cur.trim());
      return cols;
    });
    return { header, rows };
  };

  const onUploadCSV = async (file) => {
    if (!file) return;
    const text = await file.text();
    const parsed = parseCSV(text);
    setCsvHeader(parsed.header);
    setCsvRows(parsed.rows);
    setMessage(`CSV loaded: ${parsed.rows.length} rows, ${parsed.header.length} columns.`);
  };

  const applyCsvMapping = () => {
    if (!csvRows.length) return setMessage("Load a CSV first.");
    const idxs = Object.fromEntries(
      Object.entries(csvMap).map(([k, col]) => [k, csvHeader.indexOf(col)])
    );
    if (Object.values(idxs).some((i) => i < 0))
      return setMessage("Missing mapping for one or more main variables.");

    const first = csvRows[0] || [];
    setMessage(
      `Mapped CSV → v1=${first[idxs.v1] ?? ""} | v2=${first[idxs.v2] ?? ""} | v3=${first[idxs.v3] ?? ""} | v4=${first[idxs.v4] ?? ""} | v5=${first[idxs.v5] ?? ""}`
    );
  };

  // ====== TWENTY
  const [twenty, setTwenty] = useState(Array.from({ length: 20 }, () => ""));
  const onTwentyChange = (i, v) =>
    setTwenty((prev) => prev.map((x, idx) => (idx === i ? v : x)));

  const canRun = useMemo(() => {
    if (mode === "csv") return csvRows.length > 0;
    if (mode === "twenty") return twenty.some((v) => v !== "");
    return false;
  }, [mode, csvRows, twenty]);

  const runAI = () => {
    let payload;
    if (mode === "csv") payload = { mode, header: csvHeader, rows: csvRows, map: csvMap };
    if (mode === "twenty") payload = { mode, data: twenty };
    console.log("RUN_AI_PAYLOAD", payload);
    setMessage("AI run submitted! (check console for payload)");
  };

  return (
    <div className="ai-root">
      {/* ===== HEADER ===== */}
      <header className="header">
        <a href="/main" className="logo" onClick={closeMenu}>
          <img src={logoGauss} alt="Logo" />
        </a>

        {/* Hambúrguer (mobile) */}
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
          <a href="/discover" id="discover" className="active" onClick={closeMenu}>
            Discovering with AI
          </a>
        </nav>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="ai-content">
        <section className="ai-panel">
          <h1>Discovering with AI</h1>

          {/* Mode selector */}
          <div className="mode-switch">
            <button
              className={`tab ${mode === "csv" ? "active" : ""}`}
              onClick={() => setMode("csv")}
              type="button"
            >
              CSV
            </button>
            <button
              className={`tab ${mode === "twenty" ? "active" : ""}`}
              onClick={() => setMode("twenty")}
              type="button"
            >
              20 Inputs
            </button>
          </div>

          {mode === "csv" && (
            <div className="card">
              <h3>Upload CSV</h3>
              <div className="csv-row">
                {/* input de arquivo com tooltip */}
                <div
                  className="with-tip"
                  data-tip="Carregue um arquivo .CSV com cabeçalho. No passo abaixo, você pode mapear colunas para os 5 valores principais."
                >
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => onUploadCSV(e.target.files?.[0])}
                    aria-label="Upload CSV"
                  />
                </div>
                {csvHeader.length > 0 && (
                  <small>{csvRows.length} rows • {csvHeader.length} columns</small>
                )}
              </div>

              {csvHeader.length > 0 && (
                <>
                  <h4>Map CSV columns to 5 inputs (optional)</h4>
                  <div className="grid grid-5">
                    {Object.keys(csvMap).map((k, i) => (
                      <div className="field" key={k}>
                        <label>Value #{i + 1}</label>
                        <div
                          className="with-tip"
                          data-tip={`Selecione a coluna do CSV que representa o Value #${i + 1}.`}
                        >
                          <select
                            value={csvMap[k]}
                            onChange={(e) => setCsvMap((m) => ({ ...m, [k]: e.target.value }))}
                            aria-label={`Mapeamento do Value #${i + 1}`}
                          >
                            <option value="">— select column —</option>
                            {csvHeader.map((col) => (
                              <option key={col} value={col}>{col}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn" type="button" onClick={applyCsvMapping}>
                    Apply mapping (use first row)
                  </button>
                </>
              )}
            </div>
          )}

          {mode === "twenty" && (
            <div className="card">
              <h3>Provide up to 20 data points</h3>
              <div className="grid grid-20">
                {twenty.map((v, i) => (
                  <div className="field small" key={i}>
                    <label>Value #{i + 1}</label>
                    <div
                      className="with-tip"
                      data-tip={`Descreva uma medida/feature para o Value #${i + 1}. Ex.: Transit Depth, Period, S/N...`}
                    >
                      <input
                        type="text"
                        value={v}
                        onChange={(e) => onTwentyChange(i, e.target.value)}
                        placeholder="enter a value"
                        aria-label={`Value #${i + 1}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="actions">
            <button className="btn primary" type="button" disabled={!canRun} onClick={runAI}>
              Run AI
            </button>
            {message && <div className="status">{message}</div>}
            <Link to="/resultsAI" className="btn">Results</Link>
          </div>
        </section>
      </main>
    </div>
  );
}



