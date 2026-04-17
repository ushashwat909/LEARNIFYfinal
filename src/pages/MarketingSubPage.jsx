import React from 'react';
import { Link } from 'react-router-dom';

const backLinkStyle = {
  display: 'inline-block',
  marginBottom: '24px',
  color: 'var(--color-primary)',
  fontWeight: 600,
  fontSize: '0.9rem',
  textDecoration: 'none',
};

export default function MarketingSubPage({ children }) {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '70vh' }}>
      <div className="container" style={{ paddingTop: '28px' }}>
        <Link to="/" style={backLinkStyle}>
          ← Back to home
        </Link>
      </div>
      {children}
    </div>
  );
}
