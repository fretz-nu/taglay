import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../../article-content';

function HomePage() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Cybersecurity Research Hub</p>
          <h1>Innovative Minds</h1>
          <p className="lead">
            Exploring the frontiers of phishing URL detection through comparative algorithmic research.
            Our thesis compares FastForest, RandomForest, and XGBoost on the PhiUSIIL dataset.
          </p>
          <div className="hero-actions">
            <Link to="/articles" className="button-link primary">
              Browse Intel
            </Link>
            <Link to="/about" className="button-link secondary">
              About the Research
            </Link>
          </div>
          <div className="stats">
            <div className="stat">
              <strong>93%</strong>
              <span>XGBoost accuracy</span>
            </div>
            <div className="stat">
              <strong>91%</strong>
              <span>RandomForest baseline</span>
            </div>
            <div className="stat">
              <strong>3</strong>
              <span>models compared</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
              alt="Cybersecurity digital network visualization"
            />
            <p className="muted">
              Phishing attacks remain one of the most prevalent cyber threats, with over 300,000
              new malicious URLs detected monthly. Our research aims to improve detection accuracy
              through ensemble learning methods on the PhiUSIIL dataset.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Research Areas</p>
            <h2>What we investigate.</h2>
          </div>
          <span className="muted">Algorithmic comparison for threat detection.</span>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">FF</div>
            <h3>FastForest Algorithm</h3>
            <p>
              Our custom decision forest implementation optimized for phishing URL feature extraction.
              Initial 99% accuracy revealed critical overfitting issues that required hyperparameter
              recalibration to achieve legitimate 88% accuracy.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">RF</div>
            <h3>RandomForest Baseline</h3>
            <p>
              Established scikit-learn implementation serving as our comparative baseline.
              Achieved stable 91% accuracy with strong generalization across validation sets
              and minimal overfitting.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">XG</div>
            <h3>XGBoost Performance</h3>
            <p>
              Gradient boosting with built-in L1/L2 regularization achieved 93% accuracy—the
              highest among all models. Demonstrates superior feature extraction and robust
              performance on PhiUSIIL.
            </p>
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Intel</p>
            <h2>Latest findings.</h2>
          </div>
          <Link to="/articles" className="button-link secondary">
            View all
          </Link>
        </div>
        <div className="article-preview-grid">
          {featuredArticles.map((article) => {
            const severityColors = {
              Critical: '#ef4444',
              High: '#f59e0b',
              Info: '#22d3ee',
            };

            return (
              <div key={article.name} className="article-preview">
                <div className="article-meta">
                  <span
                    className="pill"
                    style={{
                      background: `${severityColors[article.severity]}20`,
                      color: severityColors[article.severity],
                      borderColor: `${severityColors[article.severity]}40`
                    }}
                  >
                    {article.severity}
                  </span>
                  <span className="muted">{article.content[0].substring(0, 30)}...</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.content[0].substring(0, 150)}...</p>
                <Link to={`/articles/${article.name}`} className="button-link secondary">
                  Read intel
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
