import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useAuthStore } from '../services/authService';
import {
  cardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  tagClass,
  pageBackground,
  pageWrapper
  ,secondaryBtn,
  loadingClass,
  errorClass,
} from '../styles/common';

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const [fetchedArticle, setFetchedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If we have an id parameter, we're on the article-card page, so fetch the article
  useEffect(() => {
    if (id && !article) {
      const fetchArticle = async () => {
        if (!currentUser) {
          navigate('/login');
          return;
        }

        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:4000/user-api/articles/${id}`,
            { withCredentials: true }
          );
          setFetchedArticle(response.data.payload);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch article');
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id, article, currentUser, navigate]);

  // Use the passed article prop or the fetched article
  const displayArticle = article || fetchedArticle;

  const handleClick = () => {
    if (!id) { // Only navigate if we're not already on the article-card page
      navigate(`/article-card/${article._id}`);
    }
  };

  if (loading) {
    return (
      <div className={pageBackground}>
        <div className={pageWrapper}>
          <div className={loadingClass}>Loading article...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={pageBackground}>
        <div className={pageWrapper}>
          <div className={`${cardClass} max-w-2xl mx-auto`}>
            <p className={errorClass}>{error}</p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className={`${secondaryBtn} mt-4`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!displayArticle) {
    return (
      <div className={pageBackground}>
        <div className={pageWrapper}>
          <div className={`${cardClass} max-w-2xl mx-auto`}>
            <p className="text-slate-600">Article not found.</p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className={`${secondaryBtn} mt-4`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={id ? pageBackground : ''}>
      <div className={id ? pageWrapper : ''}>
        <div className={cardClass} onClick={handleClick} style={{ cursor: id ? 'default' : 'pointer' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className={tagClass}>{displayArticle.category}</span>
          </div>

          <h3 className={articleTitle}>{displayArticle.title}</h3>

          <p className={articleExcerpt}>
            {displayArticle.content.length > 120
              ? `${displayArticle.content.substring(0, 120)}...`
              : displayArticle.content
            }
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className={articleMeta}>By {displayArticle.author?.firstName || "Unknown"}</p>
            <p className={articleMeta}>{new Date(displayArticle.createdAt).toLocaleDateString()}</p>
            <p className={articleMeta}>{displayArticle.comments?.length || 0} comments</p>
          </div>
        </div>

        {id && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/home')}
              className={secondaryBtn}
            >
              ← Back to Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleCard;