import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onStart }) => {
  return (
    <section style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '80px 20px', 
      background: 'var(--color-hero-bg)',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '50px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600, color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }}></span>
            AI-Powered Personalization
          </div>
          
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '24px', color: 'var(--color-text)', fontWeight: 800 }}>
            Education that <span style={{ color: 'var(--color-primary)' }}>Defies Gravity.</span>
          </h1>
          
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '500px' }}>
            Learnify analyzes your learning gaps in real-time. We build a personalized path that evolves with you, ensuring you master every concept.
          </p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={onStart}
              style={{ 
                background: '#00F0FF', color: '#0B1120', padding: '18px 36px', borderRadius: '12px', 
                border: 'none', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
              }}
            >
              Start My Learning Path
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', color: '#FFF', padding: '18px 36px', borderRadius: '12px', border: '1px solid #1e293b', fontWeight: 600, cursor: 'pointer' }}
            >
              How it Works
            </button>
          </div>
        </motion.div>

        {/* Visual Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          <div className="glass" style={{ padding: '30px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-text)' }}>Student Progress: Alex</h3>
            <div style={{ height: '8px', background: '#0B1120', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ height: '100%', background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }} 
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ background: 'var(--color-section-bg)', padding: '15px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Concepts Mastered</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>12 / 20</div>
              </div>
              <div style={{ background: 'rgba(255, 87, 34, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255, 87, 34, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#FF5722' }}>Current Focus</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>Two Pointers</div>
              </div>
            </div>
            <div style={{ marginTop: '20px', padding: '15px', background: '#0B1120', borderRadius: '12px', color: '#FFF', fontSize: '0.9rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
              "Looking good! You've improved 15% in Data Structures this week."
            </div>
          </div>
          
          {/* Floating badge */}
          <div style={{ 
            position: 'absolute', top: '-20px', right: '-20px', background: '#FF5722', 
            color: '#FFF', padding: '12px 20px', borderRadius: '50px', fontWeight: 700,
            boxShadow: '0 10px 20px rgba(255, 87, 34, 0.4)', transform: 'rotate(5deg)'
          }}>
            85% Mastery
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
