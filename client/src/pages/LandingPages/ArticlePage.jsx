import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleByName } from '../../services/ArticleService';
import NotFoundPage from '../NotFoundPage.jsx';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        setError('');
        const { data } = await fetchArticleByName(name);
        const fetchedArticle = data?.article;
        if (fetchedArticle && fetchedArticle.isActive !== false) {
          setArticle(fetchedArticle);
        } else {
          setArticle(null);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          setArticle(null);
        } else {
          console.error('Error loading article', err);
          setError('Unable to load this article right now.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (isLoading) {
    return (
      <div className="page">
        <p className="muted">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="muted">{error}</p>
      </div>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  const contentArray = Array.isArray(article.content)
    ? article.content
    : article.content
      ? [article.content]
      : [];

  const words = contentArray.join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 70));

  const severityColors = {
    Critical: '#ef4444',
    High: '#f59e0b',
    Info: '#22d3ee',
  };

  const severityClass = article.severity?.toLowerCase() || 'info';

  return (
    <div className="page article-page">
      <div className="page-header">
        <p className="eyebrow">Intel</p>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span
            className={`pill ${severityClass}`}
            style={{
              background: `${severityColors[article.severity] || '#22d3ee'}20`,
              color: severityColors[article.severity] || '#22d3ee',
              borderColor: `${severityColors[article.severity] || '#22d3ee'}40`
            }}
          >
            {article.severity || 'Info'}
          </span>
          <span className="muted">{minutes} min read</span>
        </div>
      </div>

      <div className="article-body">
        {contentArray.map((paragraph, idx) => (
          <p key={`${article.name}-${idx}`}>{paragraph}</p>
        ))}
        <div className="card callout">
          <h3>Explore more findings</h3>
          <p>
            Dive deeper into our comparative analysis of FastForest, RandomForest, and XGBoost
            models for phishing URL detection.
          </p>
          <Link to="/articles" className="button-link primary">
            Browse more Intel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
