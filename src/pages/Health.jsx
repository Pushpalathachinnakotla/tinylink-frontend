import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000")
  .replace(/\/$/, "");

export default function Health() {
  const [health, setHealth] = useState(null);

  async function checkHealth() {
    const res = await axios.get(`${API_BASE}/healthz`);
    setHealth(res.data);
  }

  useEffect(() => {
    checkHealth();
  }, []);

  if (!health) return <h2>Loading...</h2>;

  return (
    <div className="page-container">
      <h1 className="page-title">System Health</h1>
      <div className="health-box">
        <pre>{JSON.stringify(health, null, 2)}</pre>
      </div>
    </div>
  );
}
