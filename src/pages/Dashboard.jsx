import { useEffect, useState } from "react";
import axios from "axios";
import LinkRow from "../components/LinkRow";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000")
  .replace(/\/$/, "");
const API = `${API_BASE}/api/links`;

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchLinks() {
    const res = await axios.get(API);
    setLinks(res.data);
  }

  async function createLink(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API, {
        target_url: targetUrl,
        custom_code: customCode || null,
      });

      setTargetUrl("");
      setCustomCode("");
      fetchLinks();
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }

    setLoading(false);
  }

  async function deleteLink(code) {
    await axios.delete(`${API}/${code}`);
    fetchLinks();
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">TinyLink Dashboard</h1>
      <p className="sub-title">Create, manage, and track your shortened links</p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Links</h3>
          <p className="stat-number">{links.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Clicks</h3>
          <p className="stat-number">
            {links.reduce((sum, l) => sum + l.total_clicks, 0)}
          </p>
        </div>
        <div className="stat-card">
          <h3>Active Links</h3>
          <p className="stat-number">{links.filter(l => l.total_clicks > 0).length}</p>
        </div>
      </div>

      {/* Form */}
      <div className="form-card">
        <h2>Create New Short Link</h2>
        <form className="add-form" onSubmit={createLink}>
          <input
            placeholder="Enter long URL"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            required
          />
          <input
            placeholder="Custom code (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
          />

          <button disabled={loading}>
            {loading ? "Creating..." : "Create Short Link"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-header">
          <h2>Your Links</h2>
          <span className="last-updated">Last updated: just now</span>
        </div>

        <div className="modern-table-container">
          <table className="modern-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Shortened URL</th>
              <th>Clicks</th>
              <th>Last Clicked</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((l) => (
              <LinkRow key={l.code} link={l} deleteLink={deleteLink} />
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
