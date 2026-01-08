import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';

function ArticleList({ articles }) {
  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'critical';
      case 'High':
        return 'high';
      case 'Info':
      default:
        return 'info';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return '#ef4444';
      case 'High':
        return '#f59e0b';
      case 'Info':
      default:
        return '#22d3ee';
    }
  };

  return (
    <div className="article-list">
      {articles.map((article) => {
        const words = article.content.join(' ').split(' ').length;
        const minutes = Math.max(2, Math.ceil(words / 70));
        const severityClass = getSeverityBadgeClass(article.severity);

        return (
          <Link
            key={article.name}
            to={`/articles/${article.name}`}
            className="article-card"
          >
            <div className="article-card__meta">
              <span className={`pill ${severityClass}`}>
                {article.severity || 'Info'}
              </span>
              <span className="muted">{minutes} min read</span>
            </div>
            <h3>{article.title}</h3>
            <p>{article.content[0].substring(0, 140)}...</p>
          </Link>
        );
      })}
    </div>
  );
}

export default ArticleList;
