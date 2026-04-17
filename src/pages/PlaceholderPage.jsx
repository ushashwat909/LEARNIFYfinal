import React from 'react';
import { Link } from 'react-router-dom';

const titles = {
  about: 'About',
  careers: 'Careers',
  events: 'Events',
  webinars: 'Webinars',
  trainers: 'Trainers',
  membership: 'Membership',
  certification: 'Certification',
  contact: 'Get in Touch',
  community: 'Community',
  knowledgebase: 'Knowledgebase',
  terms: 'Terms of Service',
  privacy: 'Privacy',
  cookies: 'Cookies',
};

export default function PlaceholderPage({ slug }) {
  const title = titles[slug] || 'Page';

  return (
    <div className="container" style={{ padding: '120px 24px 80px', maxWidth: '720px', color: 'var(--color-text)' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{title}</h1>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
        This section is reserved for future content. Use the main app from the navigation bar to explore Learnify features.
      </p>
      <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
        ← Back to home
      </Link>
    </div>
  );
}
