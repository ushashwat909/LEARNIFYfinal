import React, { useState } from 'react';
import { WaveDivider } from './HeroSection';
import { ChevronDown, Phone, Mail } from 'lucide-react';

const TestimonialsSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    { q: 'What courses does Learnify offer?', a: 'Learnify offers comprehensive programs in Data Structures & Algorithms, System Design, Full-Stack Development, Machine Learning, Cybersecurity, and Competitive Programming — all powered by our AI tutoring engine.' },
    { q: 'Do I need prior coding experience to enroll?', a: 'Not at all! Our AI engine assesses your current skill level during onboarding and creates a fully personalized learning path. Whether you\'re a complete beginner or an experienced developer, we adapt to your level.' },
    { q: 'How does the AI-powered learning work?', a: 'We use Bayesian Knowledge Tracing and custom NLP models to analyze your performance in real-time. The system identifies knowledge gaps, recommends targeted practice problems, and adjusts difficulty automatically.' },
    { q: 'Are the courses self-paced or instructor-led?', a: 'Learnify courses are primarily self-paced with AI guidance. Our chatbot "Learnify Buddy" acts as your 24/7 tutor, proactively checking in on your progress and answering questions instantly.' },
    { q: 'Can I track my progress over time?', a: 'Absolutely! Our gamified dashboard shows daily streaks, XP points, mastery percentages, and an interactive Knowledge Graph that visualizes your entire learning journey.' },
    { q: 'Is there a free tier available?', a: 'Yes! You can sign up for free and access our core learning paths, AI chatbot, and practice problems. Premium features like advanced gap analysis and syllabus contextualizer are available with a membership.' },
  ];

  return (
    <section id="faq" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <WaveDivider />
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '60px',
          alignItems: 'flex-start',
          marginTop: '16px',
        }}>
          {/* Left — Title & Contact */}
          <div>
            <div className="section-tag">HAVE QUESTIONS?</div>
            <h2 style={{ marginTop: '12px', marginBottom: '32px', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
              Frequently<br />asked questions.
            </h2>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 20px', borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>24/7 SUPPORT</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>Available via Chat</div>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 20px', borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMAIL US</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>hello@learnify.dev</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                borderBottom: '1px solid var(--color-border)',
              }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '22px 0',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: 'var(--color-text)', fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 600, paddingRight: '16px' }}>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      flexShrink: 0,
                      color: 'var(--color-text-muted)',
                      transition: 'transform 0.3s',
                      transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <div style={{
                  maxHeight: openIdx === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease, padding 0.35s ease',
                  paddingBottom: openIdx === i ? '20px' : '0',
                }}>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--color-text-muted)', margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #faq .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
