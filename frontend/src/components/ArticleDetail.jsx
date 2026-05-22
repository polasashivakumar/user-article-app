import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useAuthStore } from "../services/authService";
import {
  cardClass,
  pageBackground,
  pageWrapper,
  bodyText,
  timestampClass,
  tagClass,
  inputClass,
  submitBtn,
  formGroup,
  secondaryBtn,
  successClass,
  errorClass
} from "../styles/common";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/user-api/articles/${id}`,
          { withCredentials: true }
        );
        setArticle(response.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, currentUser, navigate]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await axios.put(
        "http://localhost:4000/user-api/articles",
        {
          user: currentUser._id,
          articleId: id,
          comment: commentText,
        },
        { withCredentials: true }
      );
      setMsg("Comment added successfully!");
      setCommentText("");

      // Refresh article to show new comment
      const response = await axios.get(
        `http://localhost:4000/user-api/articles/${id}`,
        { withCredentials: true }
      );
      setArticle(response.data.payload);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) {
    return (
      <div className={pageBackground}>
        <div className={pageWrapper}>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageBackground}>
        <div className={pageWrapper}>
          <div className={`${cardClass} max-w-2xl mx-auto`}>
            <p className="text-rose-700">{error}</p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className={`${secondaryBtn} mt-4`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={pageBackground}>
        <div className={pageWrapper}>
          <div className={`${cardClass} max-w-2xl mx-auto`}>
            <p className="text-slate-600">Article not found.</p>
          </div>
          <button
            onClick={() => navigate("/home")}
            className={`${secondaryBtn} mt-4`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <article className={`${cardClass} mx-auto max-w-4xl p-6 sm:p-8 lg:p-10`}>
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={tagClass}>{article.category}</span>
            </div>
            <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-slate-950">
              {article.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className={timestampClass}>
                <span>By {article.author?.firstName || "Unknown Author"}</span>
                <span>•</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className={`${bodyText} mb-12`}>
            <p className="whitespace-pre-wrap">{article.content}</p>
          </div>

          {/* Comments Section */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-950">
              Comments ({article.comments?.length || 0})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleComment} className="mb-8">
              <div className={formGroup}>
                <textarea
                  placeholder="Write a comment..."
                  className={`${inputClass} min-h-[100px] resize-none`}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={submitBtn}>
                Post Comment
              </button>
            </form>

            {/* Success/Error Messages */}
            {msg && (
              <div className={`mb-6 ${msg.includes("successfully") ? successClass : errorClass}`}>
                {msg}
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {article.comments && article.comments.length > 0 ? (
                article.comments.map((comment, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">
                        User {comment.user}
                      </span>
                    </div>
                    <p className="text-slate-600">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-12">
            <button
              onClick={() => navigate("/home")}
              className={secondaryBtn}
            >
              ← Back to Articles
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default ArticleDetail;