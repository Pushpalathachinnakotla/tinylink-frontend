import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Health from "./pages/Health";

export default function App() {
  const [color, setColor] = useState(() => {
    try {
      return localStorage.getItem("tl_primary") || "#2b57ff";
    } catch (e) {
      return "#2b57ff";
    }
  });

  useEffect(() => {
    // apply CSS variables to document root
    const root = document.documentElement;
    function hexToRgb(hex) {
      const h = hex.replace('#','');
      const bigint = parseInt(h, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    }

    function darken(hex, amount = 0.16) {
      const { r, g, b } = hexToRgb(hex);
      const dr = Math.max(0, Math.round(r * (1 - amount)));
      const dg = Math.max(0, Math.round(g * (1 - amount)));
      const db = Math.max(0, Math.round(b * (1 - amount)));
      return `#${[dr, dg, db].map(x => x.toString(16).padStart(2,'0')).join('')}`;
    }

    function toRgba(hex, alpha = 0.12) {
      const { r, g, b } = hexToRgb(hex);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    root.style.setProperty("--primary", color);
    root.style.setProperty("--primary-dark", darken(color, 0.18));
    root.style.setProperty("--primary-light", toRgba(color, 0.12));
    try { localStorage.setItem("tl_primary", color); } catch (e) {}
  }, [color]);

  const presetOptions = [
    { name: "Blue", value: "#2b57ff" },
    { name: "Teal", value: "#0fb9b1" },
    { name: "Purple", value: "#6b5cf6" },
    { name: "Green", value: "#20b24a" },
    { name: "Orange", value: "#ff8a3d" }
  ];
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-left">TinyLink</div>

        <div className="nav-right">
          <label style={{ marginRight: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <select value={color} onChange={e => setColor(e.target.value)} aria-label="Primary color">
              {presetOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.name}</option>
              ))}
              <option value={color}>Custom</option>
            </select>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} title="Choose custom color" />
          </label>

          <Link to="/">Dashboard</Link>
          <Link to="/health">Health</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stats/:code" element={<Stats />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </BrowserRouter>
  );
}
