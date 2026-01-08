import React from 'react';

function AboutPage() {
  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">About the Research</p>
        <h1>Innovative Minds: Phishing URL Detection Research</h1>
        <p className="lead">
          A comparative study of ensemble learning methods for detecting malicious URLs.
          We evaluate FastForest, RandomForest, and XGBoost classifiers on the PhiUSIIL dataset
          to identify the most effective approach for real-world phishing detection.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="feature-icon">PF</div>
          <h3>PhiUSIIL Dataset</h3>
          <p>
            Our research utilizes the Phishing URL Features from User Input Integrated through
            Learning dataset, containing over 150,000 URL samples with 56 extracted features
            including lexical, host-based, and content-based characteristics.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon">ML</div>
          <h3>Model Comparison</h3>
          <p>
            We conduct a head-to-head evaluation of three ensemble algorithms: custom FastForest
            implementation, scikit-learn RandomForest baseline, and XGBoost gradient boosting
            to determine optimal trade-offs between accuracy and generalization.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon">RO</div>
          <h3>Robustness Focus</h3>
          <p>
            Beyond accuracy metrics, we analyze overfitting tendencies, cross-validation stability,
            and feature importance distributions to understand model behavior in adversarial
            scenarios where attackers actively evolve their tactics.
          </p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-row">
          <strong>Research Initiation</strong>
          <p>
            Literature review on existing phishing detection methods revealed opportunity for
            improved ensemble techniques. PhiUSIIL dataset selected for its comprehensive feature
            engineering and balanced class distribution.
          </p>
        </div>
        <div className="timeline-row">
          <strong>Model Development</strong>
          <p>
            FastForest algorithm implemented with custom hyperparameter tuning. RandomForest and
            XGBoost baselines established using scikit-learn and XGBoost libraries with
            standardized preprocessing pipelines.
          </p>
        </div>
        <div className="timeline-row">
          <strong>FastForest Discovery</strong>
          <p>
            Initial 99% accuracy flagged as suspicious. Investigation revealed severe overfitting
            due to min_samples_leaf=1. Post-correction analysis became a key contribution of
            the research, highlighting importance of proper regularization.
          </p>
        </div>
        <div className="timeline-row">
          <strong>Final Findings</strong>
          <p>
            XGBoost emerged as top performer (93% accuracy) with natural regularization preventing
            overfitting. RandomForest provided stable baseline (91%). FastForest, after fixes,
            achieved competitive results (88%) with faster inference times.
          </p>
        </div>
      </div>

      <div className="cta-banner">
        <h3>Explore the Intel</h3>
        <p>
          Dive deeper into our findings. Read detailed analysis of each model's performance,
          the overfitting discovery, and practical recommendations for deploying phishing
          detection systems in production environments.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
