import { Link } from "react-router-dom";

export default function LinkRow({ link, deleteLink }) {
  const SHORT_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000")
    .replace(/\/$/, "");
  const shortUrl = `${SHORT_BASE}/${link.code}`;

  return (
    <tr className="table-row">
      <td>
        <Link to={`/stats/${link.code}`} className="tag">
          {link.code}
        </Link>
      </td>

      <td>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
          {shortUrl}
        </a>
      </td>

      <td>{link.total_clicks}</td>
      <td>{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "-"}</td>

      <td className="actions-col">
        <button onClick={() => deleteLink(link.code)} className="icon-btn delete-btn">
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
