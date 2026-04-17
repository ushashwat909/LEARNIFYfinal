import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    icon: '🎯',
    title: 'System Calibration',
    desc: 'Tell us your career goal and experience level. Our AI sets up a personalized knowledge graph tailored to your exact trajectory.',
  },
  {
    num: '02',
    icon: '🚀',
    title: 'Adaptive Launch',
    desc: 'The Bayesian engine locates your learning frontier — the exact boundary between what you know and what you need next — and queues your first mission.',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Prove & Advance',
    desc: 'Watch curated videos, take a micro-quiz, and submit your result. The BKT model updates in real time and dynamically shifts your path forward.',
  },
  {
    num: '04',
    icon: '🏆',
    title: 'Master Your Domain',
    desc: "As nodes turn green on your knowledge graph, your mastery probability climbs. Learnify keeps refining until you're truly ready to deploy.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" style={{ background: 'var(--color-section-bg)', padding: '100px 24px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(255,87,34,0.1)', borderRadius: '50px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, color: '#FF5722', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,87,34,0.2)' }}>
          The flight plan
        </div>
        <h2 style={{ color: 'var(--color-text)', fontSize: '2.8rem', marginBottom: '20px' }}>How Learnify Works</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Four stages from zero to production-ready. Powered by a Directed Acyclic Graph that learns from you.</p>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Connector line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(0,240,255,0.3), transparent)', transform: 'translateX(-50%)' }} />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              display: 'flex',
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: '60px',
            }}
          >
            <div className="glass" style={{
              width: '45%',
              padding: '35px',
              borderRadius: '20px',
              position: 'relative',
              borderLeft: i % 2 === 0 ? '3px solid #00F0FF' : 'none',
              borderRight: i % 2 !== 0 ? '3px solid #FF5722' : 'none',
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <span style={{ fontSize: '2rem' }}>{step.icon}</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '2px' }}>STEP {step.num}</div>
                  <h3 style={{ color: 'var(--color-text)', fontSize: '1.3rem', margin: 0 }}>{step.title}</h3>
                </div>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
