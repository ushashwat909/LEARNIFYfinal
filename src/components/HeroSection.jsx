import React from 'react';

/* Reusable wave SVG – matches the tilde/wave motif in the template */
export const WaveDivider = ({ color = 'var(--color-primary)' }) => (
  <div className="wave-divider">
    <svg width="110" height="34" viewBox="0 0 110 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 17 C10 5, 18 29, 28 17 S46 5, 56 17 S74 29, 84 17 S100 5, 108 17"
        stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const HeroSection = ({ onStart }) => {
  const stats = [
    { value: '50K+', label: 'Active Learners' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '200+', label: 'AI Programs' },
  ];

  const avatars = ['👩‍💻', '👨‍🎓', '👩‍🔬', '👨‍💼'];

  return (
    <section style={{
      background: 'var(--color-bg)',
      paddingTop: '72px',
      paddingBottom: '0',
      overflow: 'hidden',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        padding: '80px 24px 60px',
      }}>

        {/* ── Left: Text ── */}
        <div style={{ maxWidth: '540px' }}>
          {/* Badge */}
          <div className="badge badge-green" style={{ marginBottom: '24px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
            AI-Powered Personalized Learning
          </div>

          {/* Headline */}
          <h1 style={{
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '22px',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
            letterSpacing: '-0.025em',
            color: 'var(--color-text)',
          }}>
            Unlocking the future with{' '}
            <span style={{ color: 'var(--color-primary)' }}>Intelligent Learning.</span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.75,
            color: 'var(--color-text-muted)',
            marginBottom: '40px',
            maxWidth: '460px',
          }}>
            Learnify is a premier learning platform dedicated to equipping individuals with AI-powered, personalized education that adapts to your unique learning style.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button
              onClick={onStart}
              className="btn btn-primary btn-lg"
            >
              Start Learning Free
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline btn-lg"
            >
              How it Works
            </button>
          </div>

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex' }}>
              {avatars.map((av, i) => (
                <div key={i} style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: i % 2 === 0 ? 'var(--color-primary-light)' : 'var(--color-bg-alt)',
                  border: '2.5px solid var(--color-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', marginLeft: i === 0 ? 0 : '-10px',
                  zIndex: avatars.length - i, position: 'relative',
                }}>
                  {av}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>1,200+ Alumni</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>joined this month</div>
            </div>
          </div>
        </div>

        {/* ── Right: Visual Card ── */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Main card */}
          <div className="card" style={{ padding: '28px', width: '100%', maxWidth: '400px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIVE PROGRESS</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '4px' }}>Your Learning Path</div>
              </div>
              <div style={{
                background: 'var(--color-primary)',
                color: '#fff', padding: '6px 12px',
                borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
              }}>
                85% Mastered
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>DSA Mastery</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)' }}>85%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--color-bg-alt)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--color-primary)', borderRadius: '99px', transition: 'width 1s ease' }} />
              </div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Concepts Mastered', value: '18 / 24', color: 'var(--color-primary-light)', textColor: 'var(--color-primary)' },
                { label: 'Current Focus', value: 'Two Pointers', color: 'rgba(245,158,11,0.1)', textColor: '#B45309' },
                { label: 'Daily Streak', value: '12 Days 🔥', color: 'var(--color-bg-alt)', textColor: 'var(--color-text)' },
                { label: 'Problems Solved', value: '47 / 60', color: 'var(--color-bg-alt)', textColor: 'var(--color-text)' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: s.color, padding: '14px', borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: s.textColor }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* AI message */}
            <div style={{
              padding: '14px', borderRadius: '12px',
              background: 'var(--color-primary-light)',
              border: '1px solid rgba(45,158,115,0.2)',
              fontSize: '0.85rem', color: 'var(--color-primary-dark)',
              fontStyle: 'italic',
            }}>
              💬 "You've improved 15% in Data Structures this week. Keep going!"
            </div>
          </div>

          {/* Floating badge — top right */}
          <div style={{
            position: 'absolute', top: '-18px', right: '-18px',
            background: 'var(--color-accent)', color: '#fff',
            padding: '10px 18px', borderRadius: '50px',
            fontWeight: 700, fontSize: '0.85rem',
            boxShadow: '0 8px 20px rgba(245,158,11,0.4)',
            transform: 'rotate(4deg)',
            zIndex: 3,
          }}>
            ⚡ AI-Powered
          </div>

          {/* Background decoration */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-60px', width: '280px', height: '280px',
            borderRadius: '50%', background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
            zIndex: 1, pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Stats strip  */}
      <div style={{
        background: 'var(--color-bg-alt)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '28px 24px',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div:first-of-type {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 40px !important;
          }
          section > div:first-of-type > div:first-child {
            max-width: 100% !important;
          }
          section > div:first-of-type > div:first-child .badge,
          section > div:first-of-type > div:first-child > div:last-child {
            justify-content: center;
          }
          section > div:first-of-type > div:first-child p {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
