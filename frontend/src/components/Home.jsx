import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import {
  pageBackground,
  pageWrapper,
  articleGrid,
  pageTitleClass,
  bodyText,
  surfaceClass,
  secondaryBtn,
  emptyStateClass,
  successClass,
  errorClass
} from "../styles/common";

function Home() {
  const [articles, setArticles] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user-api/articles", {
        withCredentials: true,
      });
      setArticles(res.data.payload);
    } catch (err) {
      console.log("Error fetching articles:", err);
      setMsg("Failed to load articles. Please try again.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <section className={`${surfaceClass} mb-8 overflow-hidden p-8 sm:p-10`}>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              Editorial stream
            </p>
            <h1 className={pageTitleClass}>All Articles</h1>
            <p className={`${bodyText} mt-4 max-w-2xl`}>
              A clean, high-contrast reading experience for discovering stories, updates, and commentary.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Fresh layout</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Responsive cards</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Tailwind system</span>
          </div>
        </section>

        {msg && (
          <div className={msg.includes("successfully") ? successClass : errorClass}>
            {msg}
          </div>
        )}

        {articles.length === 0 ? (
          <div className={`${surfaceClass} ${emptyStateClass}`}>
            <p>No articles available yet.</p>
            <button className={`${secondaryBtn} mt-4`} onClick={() => window.location.reload()}>
              Refresh feed
            </button>
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;