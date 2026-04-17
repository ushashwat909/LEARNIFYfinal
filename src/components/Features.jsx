import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🧠',
    color: '#00F0FF',
    title: 'Knowledge Gap Analyzer',
    desc: 'Our NLP pipeline analyzes your written answers to identify specific semantic misunderstandings, dynamically generating a targeted micro-learning path.',
  },
  {
    icon: '🌿',
    color: '#4ade80',
    title: 'Wellness & Burnout Shield',
    desc: 'Ethical NLP extracts key stressors from anonymous feedback, creating a burnout-risk dashboard for administrators before it becomes a crisis.',
  },
  {
    icon: '📚',
    color: '#FB923C',
    title: 'Smart Syllabus Contextualizer',
    desc: 'Upload raw lecture transcripts. The system automatically parses text, classifying topics to generate interactive, bite-sized study flashcards.',
  },
  {
    icon: '⚡',
    color: '#a855f7',
    title: 'Real-Time BKT Mastery',
    desc: 'Bayesian Knowledge Tracing updates mastery probability after every interaction — no waiting for a quiz score to know where you actually stand.',
  },
  {
    icon: '🗺️',
    color: '#00F0FF',
    title: 'Live Knowledge Graph',
    desc: 'Powered by a Directed Acyclic Graph. See every prerequisite, visited concept, and frontier node rendered live, just like a GPS for your brain.',
  },
  {
    icon: '🎥',
    color: '#FF5722',
    title: 'Curated Video Mining',
    desc: 'For each graph node, our YouTube scraper ranks tutorials by view count and duration — surfacing the best 7-minute explanation, not 4-hour courses.',
  },
];

const Features = () => (
  <section id="features" style={{ background: 'var(--color-section-bg)', padding: '100px 24px' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(0,240,255,0.08)', borderRadius: '50px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(0,240,255,0.2)' }}>
          Capabilities
        </div>
        <h2 style={{ color: 'var(--color-text)', fontSize: '2.8rem', marginBottom: '20px' }}>Invisible AI. Visible Impact.</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          We don't believe in generic chatbots. Learnify runs complex NLP silently in the background, surfacing insights only when they help you succeed.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="organic-card"
            style={{ padding: '35px', borderRadius: '20px', position: 'relative', overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: f.color, opacity: 0.07, filter: 'blur(25px)' }} />
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '20px', border: `1px solid ${f.color}33` }}>
              {f.icon}
            </div>
            <h3 style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: '12px' }}>{f.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
