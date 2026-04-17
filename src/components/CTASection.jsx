import React, { useState } from 'react';

const CTASection = ({ onStart }) => {
  const [email, setEmail] = useState('');

  return (
    <section style={{
      background: 'var(--color-bg-dark)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-60px', left: '-40px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'rgba(45, 158, 115, 0.15)', filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', right: '-40px',
        width: '180px', height: '180px', borderRadius: '50%',
        background: 'rgba(45, 158, 115, 0.12)', filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="section-tag" style={{
          background: 'rgba(45, 158, 115, 0.2)',
          color: '#4ADE80',
          border: '1px solid rgba(74, 222, 128, 0.25)',
        }}>
          NEWSLETTER
        </div>

        <h2 style={{
          marginTop: '20px', marginBottom: '12px',
          color: '#fff',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
        }}>
          Learn and Grow with Learnify!
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.65)',
          maxWidth: '480px', margin: '0 auto 40px',
          fontSize: '1rem', lineHeight: 1.7,
        }}>
          Get the latest updates, expert advice, and special offers by joining our Learnify Newsletter today!
        </p>

        {/* Email Form */}
        <div style={{
          display: 'flex',
          maxWidth: '480px',
          margin: '0 auto',
          gap: '0',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1.5px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.06)',
        }}>
          <input
            type="email"
            placeholder="e.g. hello@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: '15px 24px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />
          <button
            onClick={onStart}
            style={{
              padding: '15px 32px',
              background: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => e.target.style.background = '#24875F'}
            onMouseLeave={e => e.target.style.background = 'var(--color-primary)'}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
