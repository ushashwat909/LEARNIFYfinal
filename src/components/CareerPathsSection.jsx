import React from 'react';
import { motion } from 'framer-motion';

const paths = [
  { icon: '💻', title: 'Software Engineer', topics: ['Arrays', 'Trees', 'Dynamic Programming', 'System Design'], color: '#00F0FF', count: 24 },
  { icon: '🔐', title: 'Cybersecurity', topics: ['Network Layers', 'Cryptography', 'Exploit Dev', 'CTF Patterns'], color: '#FF5722', count: 18 },
  { icon: '🤖', title: 'AI Researcher', topics: ['Linear Algebra', 'Probability', 'Transformers', 'RLHF'], color: '#a855f7', count: 22 },
  { icon: '📊', title: 'Data Scientist', topics: ['Statistics', 'Pandas', 'Feature Eng', 'ML Pipelines'], color: '#22d3ee', count: 20 },
  { icon: '🌐', title: 'Cloud Architect', topics: ['Networking', 'Docker', 'Kubernetes', 'IAM & Security'], color: '#FB923C', count: 16 },
  { icon: '🎮', title: 'Game Developer', topics: ['Math for Games', 'Physics Sim', 'Shaders', 'ECS Patterns'], color: '#4ade80', count: 14 },
];

const CareerPathsSection = () => (
  <section style={{ background: 'var(--color-section-bg)', padding: '100px 24px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(168,85,247,0.1)', borderRadius: '50px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, color: '#a855f7', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(168,85,247,0.2)' }}>
          Choose your orbit
        </div>
        <h2 style={{ color: 'var(--color-text)', fontSize: '2.8rem', marginBottom: '20px' }}>Career-Indexed Learning Paths</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Every trajectory is a Directed Acyclic Graph mapped to real hiring requirements. Built from job listings, not textbooks.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
        {paths.map((path, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8, boxShadow: `0 20px 40px ${path.color}22` }}
            className="organic-card"
            style={{ padding: '30px', borderRadius: '20px', cursor: 'default', position: 'relative', overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
          >
            {/* Glow orb */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: path.color, opacity: 0.08, filter: 'blur(30px)' }} />

            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{path.icon}</div>
            <h3 style={{ color: 'var(--color-text)', fontSize: '1.2rem', marginBottom: '5px' }}>{path.title}</h3>
            <div style={{ fontSize: '0.8rem', color: path.color, marginBottom: '20px', fontWeight: 600 }}>{path.count} knowledge nodes</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {path.topics.map((t, j) => (
                <span key={j} style={{ padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, background: `${path.color}18`, color: path.color, border: `1px solid ${path.color}33` }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CareerPathsSection;
