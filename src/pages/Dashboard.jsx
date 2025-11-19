import { useEffect, useState } from "react";
import axios from "axios";
import LinkRow from "../components/LinkRow";

const API_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");
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
    <div className="container">
      <h1>TinyLink Dashboard</h1>

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

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Shorten URL</th>
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
  );
}
