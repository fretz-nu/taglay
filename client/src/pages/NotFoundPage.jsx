import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page">
      <div className="not-found card">
        <p className="eyebrow">404 Error</p>
        <h1>Page not found.</h1>
        <p className="lead">
          The intel you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to explore our research.
        </p>
        <div className="hero-actions">
          <Link to="/" className="button-link primary">
            Go home
          </Link>
          <Link to="/articles" className="button-link secondary">
            Browse Intel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
