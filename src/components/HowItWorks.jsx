import React from 'react';
import { WaveDivider } from './HeroSection';
import { BookOpen, BarChart3, Brain, Target } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      icon: <BookOpen size={28} />,
      title: 'Discover Your Path',
      desc: 'Take a quick assessment and our AI engine maps your current skill level, learning preferences, and career goals.',
    },
    {
      num: '02',
      icon: <Brain size={28} />,
      title: 'AI Builds Your Plan',
      desc: 'Our engine creates a fully personalized curriculum using Bayesian Knowledge Tracing, adapting in real-time as you learn.',
    },
    {
      num: '03',
      icon: <Target size={28} />,
      title: 'Practice & Master',
      desc: 'Solve curated problems in our built-in IDE with instant feedback, gap analysis, and AI-powered hints.',
    },
    {
      num: '04',
      icon: <BarChart3 size={28} />,
      title: 'Track & Grow',
      desc: 'Visualize your mastery with Knowledge Graphs, daily streaks, and a gamified dashboard that keeps you motivated.',
    },
  ];

  return (
    <section id="how-it-works" className="section" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <WaveDivider />
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '56px' }}>
          <div className="section-tag">HOW IT WORKS</div>
          <h2 style={{ marginTop: '12px', marginBottom: '12px' }}>
            Your journey to mastery,<br />simplified.
          </h2>
          <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
            Four simple steps to go from beginner to expert with Learnify's AI-powered learning engine.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          position: 'relative',
        }}>
          {steps.map((step, i) => (
            <div key={i} className="card" style={{
              padding: '32px 24px',
              textAlign: 'center',
              position: 'relative',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
            }}>
              {/* Step number */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                fontSize: '0.72rem', fontWeight: 800,
                color: 'var(--color-primary)',
                opacity: 0.6,
                letterSpacing: '0.05em',
              }}>
                STEP {step.num}
              </div>

              {/* Icon */}
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '16px',
                background: 'var(--color-primary-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--color-primary)',
              }}>
                {step.icon}
              </div>

              <h3 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #how-it-works .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #how-it-works .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
