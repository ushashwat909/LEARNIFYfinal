import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WaveDivider } from './HeroSection';
import { Code2, Database, Globe, Shield, Cpu, LineChart } from 'lucide-react';

const CareerPathsSection = () => {
  const navigate = useNavigate();

  const paths = [
    { id: 'data-structures-algorithms', icon: <Code2 size={24} />, title: 'Data Structures & Algorithms', duration: '12 Weeks', desc: 'Master arrays, trees, graphs, DP, and competitive programming patterns with hands-on practice.', color: '#2D9E73' },
    { id: 'system-design', icon: <Database size={24} />, title: 'System Design', duration: '10 Weeks', desc: 'Learn to design scalable systems — load balancers, caching, microservices, and database sharding.', color: '#3B82F6' },
    { id: 'full-stack-development', icon: <Globe size={24} />, title: 'Full-Stack Development', duration: '14 Weeks', desc: 'Build end-to-end applications with React, Node.js, databases, and deployment pipelines.', color: '#8B5CF6' },
    { id: 'cybersecurity-fundamentals', icon: <Shield size={24} />, title: 'Cybersecurity Fundamentals', duration: '8 Weeks', desc: 'Understand network security, ethical hacking, cryptography, and secure coding practices.', color: '#EF4444' },
    { id: 'machine-learning-basics', icon: <Cpu size={24} />, title: 'Machine Learning Basics', duration: '10 Weeks', desc: 'Dive into supervised/unsupervised learning, neural networks, and model optimization.', color: '#F59E0B' },
    { id: 'competitive-programming', icon: <LineChart size={24} />, title: 'Competitive Programming', duration: '8 Weeks', desc: 'Sharpen problem-solving with curated contest problems, editorial walkthroughs, and timing drills.', color: '#06B6D4' },
  ];

  return (
    <section id="programs" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <WaveDivider />
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '56px' }}>
          <div className="section-tag">OUR PROGRAMS</div>
          <h2 style={{ marginTop: '12px', marginBottom: '12px' }}>
            Choose the right path<br />for your career.
          </h2>
          <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
            Whether you're a beginner or an advanced professional, our structured courses will help you achieve your goals.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {paths.map((path, i) => (
            <div key={i} className="card" style={{
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
            }}>
              {/* Color header strip */}
              <div style={{
                height: '6px',
                background: path.color,
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
              }} />

              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Duration & icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${path.color}15`,
                    color: path.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {path.icon}
                  </div>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {path.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', fontWeight: 700 }}>{path.title}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>{path.desc}</p>

                {/* Bottom action */}
                <div style={{ marginTop: '20px' }}>
                  <button 
                    onClick={() => navigate(`/path/${path.id}`)}
                    className="btn btn-outline btn-sm" style={{
                    width: '100%',
                    borderRadius: 'var(--radius-full)',
                    borderColor: path.color,
                    color: path.color,
                  }}>
                    Explore Path →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #programs .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #programs .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default CareerPathsSection;
