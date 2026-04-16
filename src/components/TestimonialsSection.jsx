import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'SWE Intern @ Google',
    avatar: '👩‍💻',
    text: '"EduGrav found I was failing Sliding Window because my Array Indexing was weak — something I never would have diagnosed myself. Fixed in 2 sessions."',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    role: 'CS Junior @ IIT Delhi',
    avatar: '👨‍🎓',
    text: '"I went from 30% to 80% mastery on Binary Search in one week. The Bayesian tracking made me realize exactly when I was truly ready to move forward."',
    rating: 5,
  },
  {
    name: 'Zara Ahmed',
    role: 'Security Analyst @ CrowdStrike',
    avatar: '👩‍🔬',
    text: '"The Cybersecurity path is insanely well structured. It mapped perfectly to what real interviewers ask. Best $0 I ever spent."',
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section style={{ background: '#0B1120', padding: '100px 24px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(0,240,255,0.08)', borderRadius: '50px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, color: '#00F0FF', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(0,240,255,0.2)' }}>
          Mission logs
        </div>
        <h2 style={{ color: '#FFF', fontSize: '2.8rem' }}>Astronauts who made it.</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="glass"
            style={{ padding: '35px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} style={{ color: '#00F0FF', fontSize: '1rem' }}>★</span>
              ))}
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{t.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(0,240,255,0.3)' }}>{t.avatar}</div>
              <div>
                <div style={{ color: '#FFF', fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
