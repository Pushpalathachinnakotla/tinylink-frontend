import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000")
  .replace(/\/$/, "");

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  async function fetchStats() {
    try {
      const res = await axios.get(`${API_BASE}/api/links/${code}`);
      setData(res.data);
    } catch {
      setData("NOT_FOUND");
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (data === "NOT_FOUND") return <h2 className="error-text">404 — Link Not Found</h2>;

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="page-container">
      <h1 className="page-title">Statistics</h1>

      <div className="stat-detail-card">
        <p><strong>Code:</strong> {code}</p>
        <p><strong>Target URL:</strong> {data.target_url}</p>
        <p><strong>Total Clicks:</strong> {data.total_clicks}</p>
        <p><strong>Last Clicked:</strong> {data.last_clicked || "Never"}</p>
      </div>
    </div>
  );
}
