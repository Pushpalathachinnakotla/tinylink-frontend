import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/links";

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  async function fetchStats() {
    try {
      const res = await axios.get(`${API}/${code}`);
      setData(res.data);
    } catch {
      setData("NOT_FOUND");
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (data === "NOT_FOUND") return <h2>404 — Link Not Found</h2>;

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>Stats for: {code}</h1>
      <p><strong>Target URL:</strong> {data.target_url}</p>
      <p><strong>Total Clicks:</strong> {data.total_clicks}</p>
      <p><strong>Last Clicked:</strong> {data.last_clicked || "Never"}</p>
    </div>
  );
}
