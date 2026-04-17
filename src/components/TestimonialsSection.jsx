import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'SWE Intern @ Google',
    avatar: '👩‍💻',
    text: '"Learnify found I was failing Sliding Window because my Array Indexing was weak — something I never would have diagnosed myself. Fixed in 2 sessions."',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'CS Sophomore',
    avatar: '👨‍💻',
    text: '"The Bayesian graph is like a GPS for my brain. I don\'t waste time on easy problems anymore; it constantly pushes me to my learning frontier."',
    rating: 5,
  },
  {
    name: 'Sarah Jenkins',
    role: 'Self-Taught Dev',
    avatar: '🚀',
    text: '"Coming from a non-CS background, Data Structures was terrifying. Learnify broke it down into micro-missions that actually felt achievable."',
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section style={{ background: 'var(--color-section-bg)', padding: '100px 24px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(0,240,255,0.08)', borderRadius: '50px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(0,240,255,0.2)' }}>
          Astronauts who made it.
        </div>
        <h2 style={{ color: 'var(--color-text)', fontSize: '2.8rem' }}>What our students say</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="organic-card"
            style={{ padding: '35px', borderRadius: '24px', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', position: 'relative' }}
          >
            <div style={{ fontSize: '1.5rem', color: '#fbbf24', marginBottom: '20px' }}>
              {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '30px', fontStyle: 'italic' }}>
              {t.text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-section-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--color-border)' }}>
                {t.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>{t.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
