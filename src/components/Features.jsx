import React from 'react';
import { WaveDivider } from './HeroSection';
import { Zap, BookOpen, BarChart3, BrainCircuit, Gamepad2, GitGraph } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: <BrainCircuit size={26} />, title: 'AI-Powered Chatbot', desc: 'Get instant help from Learnify Buddy — your personal AI tutor that proactively checks in on your progress.' },
    { icon: <Zap size={26} />, title: 'Smart Gap Analysis', desc: 'Explain concepts in your own words and our AI identifies exactly where your understanding breaks down.' },
    { icon: <BookOpen size={26} />, title: 'Syllabus Contextualizer', desc: 'Paste any lecture transcript and get auto-generated flashcards, summaries, and topic classifications.' },
    { icon: <GitGraph size={26} />, title: 'Knowledge Brain GPS', desc: 'Visualize your entire learning journey as an interactive knowledge graph — see what you know and what\'s next.' },
    { icon: <Gamepad2 size={26} />, title: 'Gamified Dashboard', desc: 'Daily streaks, XP points, achievement badges, and a contribution heatmap to keep you motivated every day.' },
    { icon: <BarChart3 size={26} />, title: 'Adaptive Learning Engine', desc: 'Bayesian Knowledge Tracing powers our recommendation engine — the system gets smarter as you learn.' },
  ];

  return (
    <section id="features" className="section" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Left — Text */}
          <div>
            <WaveDivider />
            <div className="section-tag" style={{ marginTop: '16px' }}>PLATFORM FEATURES</div>
            <h2 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Discover the best place for CS enthusiasts.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '32px' }}>
              With cutting-edge courses, expert mentorship, and a real AI engine powering every recommendation — Learnify helps you study smarter, not harder.
            </p>

            {/* Highlight tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {['Hands-On Learning', 'Expert Instructors', 'AI-Powered', 'Career Support'].map((tag, i) => (
                <span key={i} className="badge badge-green">
                  ✓ {tag}
                </span>
              ))}
            </div>

            <button className="btn btn-primary">Learn More</button>
          </div>

          {/* Right — Feature Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{
                padding: '24px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-card-bg)',
              }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '14px',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #features .container > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #features .container > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Features;
