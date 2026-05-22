import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuthStore } from "../services/authService.js";
import { API_BASE_URL } from "../services/api";
import {
  cardClass,
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
  articleTitle,
  articleExcerpt,
  articleMeta,
  emptyStateClass,
  loadingClass,
} from "../styles/common";

function AuthorDashboard() {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedAuthor = (() => {
    try {
      return JSON.parse(localStorage.getItem("author") || "null");
    } catch {
      return null;
    }
  })();

  const authorId = currentUser?._id || storedAuthor?._id;

  useEffect(() => {
    const fetchArticles = async () => {
      if (!authorId) {
        setLoading(false);
        setError("Author profile not found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/author-api/articles/${authorId}`,
          { withCredentials: true }
        );
        setArticles(response.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [authorId]);

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <section className={`${cardClass} mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Author workspace</p>
            <h2 className={headingClass}>Author Dashboard</h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>Track your published pieces, draft new stories, and keep the editorial flow organized.</p>
          </div>
          <button className={primaryBtn} onClick={() => navigate("/add-article")}>
            Add Article
          </button>
        </section>

        <div className={cardClass}>
          <div className="mb-6 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">My Articles</h3>
            <button className={secondaryBtn} onClick={() => navigate("/home")}>View public feed</button>
          </div>
          {loading ? (
            <p className={loadingClass}>Loading articles...</p>
          ) : error ? (
            <p className="text-rose-700">{error}</p>
          ) : articles.length === 0 ? (
            <div className={emptyStateClass}>
              <p>No articles found.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {articles.map((article) => (
                <div key={article._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-700">{article.category}</span>
                    <span className={articleMeta}>{new Date(article.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className={articleTitle}>{article.title}</h4>
                  <p className={`${articleExcerpt} mt-2`}>{article.content.substring(0, 180)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AuthorDashboard;