import { Link } from "react-router-dom";

export default function LinkRow({ link, deleteLink }) {
  const SHORT_BASE = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");
  const shortUrl = `${SHORT_BASE}/${link.code}`;

  return (
    <tr>
      <td>
        <Link to={`/stats/${link.code}`} className="code-link">
          {link.code}
        </Link>
      </td>
      {/* <td className="truncate">{link.target_url}</td> */}
      <td className="truncate">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shorten-url-link"
        >
          {shortUrl}
        </a>
      </td>
      <td>{link.total_clicks}</td>
      <td>{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "-"}</td>
      <td>
        <button onClick={() => deleteLink(link.code)} className="delete-btn">
          Delete
        </button>
      </td>
    </tr>
  );
}
