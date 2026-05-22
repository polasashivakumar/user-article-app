import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../services/authService";
import {
  pageBackground,
  pageWrapper,
  formCard,
  formTitle,
  formGroup,
  inputClass,
  submitBtn,
  labelClass,
  bodyText,
  secondaryBtn,
  successClass,
  errorClass,
} from "../styles/common";

function AddArticle() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const [article, setArticle] = useState({ title: "", category: "", content: "" });
  const [msg, setMsg] = useState("");
  const author = currentUser || JSON.parse(localStorage.getItem("author") || "null");

  useEffect(() => {
    if (!author) {
      navigate("/login");
    }
  }, [author, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post(
        "http://localhost:4000/author-api/articles",
        { ...article, author: author._id },
        { withCredentials: true }
      );
      setMsg("Article added successfully!");
      setArticle({ title: "", category: "", content: "" });
      navigate("/author-dashboard", { replace: true });
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add article");
    }
  };

  return (
    <div className={pageBackground}>
      <div className={`${pageWrapper} flex min-h-[calc(100vh-5rem)] items-center justify-center`}>
      <div className={formCard}>
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Publishing</p>
          <h2 className={formTitle}>Add Article</h2>
          <p className={`${bodyText} mt-2`}>Draft a focused article with a clean structure and clear headline.</p>
        </div>
        {msg && (
          <div className={msg.includes("successfully") ? successClass : errorClass}>{msg}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              placeholder="A compelling article title"
              className={inputClass}
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
            />
          </div>
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              placeholder="News, Opinion, Design, and more"
              className={inputClass}
              value={article.category}
              onChange={(e) => setArticle({ ...article, category: e.target.value })}
            />
          </div>
          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea
              placeholder="Write the article body here..."
              className={`${inputClass} min-h-[220px] resize-y`}
              rows={6}
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
            />
          </div>
          <button className={submitBtn}>Add Article</button>
          <button type="button" className={`${secondaryBtn} mt-3 w-full`} onClick={() => navigate("/author-dashboard")}>Back to dashboard</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddArticle;