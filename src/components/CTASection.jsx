import React from 'react';
import { motion } from 'framer-motion';

const CTASection = ({ onStart }) => (
  <section style={{ background: 'radial-gradient(ellipse at center, #1e293b 0%, #0B1120 100%)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
    {/* Decorative background rings */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.07)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '900px', height: '900px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.04)', pointerEvents: 'none' }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}
    >
      <span style={{ fontSize: '4rem', display: 'block', marginBottom: '30px' }}>🚀</span>
      <h2 style={{ color: 'var(--color-text)', fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '24px', fontWeight: 900 }}>
        Ready to <span style={{ color: 'var(--color-primary)' }}>defy gravity?</span>
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '50px', lineHeight: 1.7 }}>
        Join thousands of students whose knowledge graphs are expanding daily. Your mission starts now.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 240, 255, 0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{ padding: '20px 50px', borderRadius: '14px', background: '#00F0FF', color: '#0B1120', border: 'none', fontWeight: 900, fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 0 25px rgba(0,240,255,0.35)' }}
        >
          Initialize My Path — It's Free
        </motion.button>
        <button style={{ padding: '20px 40px', borderRadius: '14px', background: 'transparent', color: '#FFF', border: '1px solid #334155', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>
          View Demo
        </button>
      </div>
      <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '30px' }}>No account required. Your progress is saved locally.</p>
    </motion.div>
  </section>
);

export default CTASection;
