import React from 'react';
import { WaveDivider } from './HeroSection';

const partners = [
  { name: 'Google', emoji: '🔵' },
  { name: 'Microsoft', emoji: '🪟' },
  { name: 'Meta', emoji: '📘' },
  { name: 'Amazon', emoji: '🟠' },
  { name: 'OpenAI', emoji: '⚫' },
  { name: 'Nvidia', emoji: '🟢' },
];

const StatsSection = () => {
  const stats = [
    { value: '137K+', label: 'Problems Solved', icon: '💡' },
    { value: '50K+', label: 'Active Learners', icon: '👩‍💻' },
    { value: '215K+', label: 'AI Insights Generated', icon: '🧠' },
    { value: '99%', label: 'Uptime & Reliability', icon: '⚡' },
  ];

  return (
    <section style={{ background: 'var(--color-bg)', padding: '80px 0 64px' }}>

      {/* Wave Divider */}
      <WaveDivider />
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <div className="section-tag">OUR ACHIEVEMENTS</div>
        <h2 style={{ marginTop: '12px', marginBottom: '8px' }}>
          Milestones in AI education<br/>& student success.
        </h2>
        <p style={{ maxWidth: '520px', margin: '0 auto 52px', fontSize: '1rem' }}>
          Since our founding, Learnify has been dedicated to empowering learners with world-class AI-personalized education.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {stats.map((s, i) => (
            <div key={i} className="card" style={{
              padding: '32px 24px',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: 'var(--color-primary)',
                borderRadius: '4px 4px 0 0',
              }} />
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1, marginBottom: '8px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
