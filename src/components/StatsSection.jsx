import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '98%', label: 'Completion Rate', desc: 'vs. 13% industry avg' },
  { value: '3.2×', label: 'Faster Mastery', desc: 'over traditional LMS' },
  { value: '50K+', label: 'Pathways Mapped', desc: 'across 12 disciplines' },
  { value: '< 200ms', label: 'AI Latency', desc: 'real-time BKT updates' },
];

const StatsSection = () => (
  <section style={{ background: 'var(--color-section-bg)', padding: '80px 24px', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(0,240,255,0.08)', borderRadius: '50px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(0,240,255,0.2)' }}>
        By the numbers
      </div>
      <h2 style={{ color: 'var(--color-text)', fontSize: '2.5rem', marginBottom: '60px' }}>Data that moves the needle.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="organic-card"
            style={{ padding: '40px 20px', borderRadius: '20px', borderTop: '3px solid var(--color-primary)', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
          >
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '8px' }}>{s.value}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
