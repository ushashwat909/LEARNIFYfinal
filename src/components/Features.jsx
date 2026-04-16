import React from 'react';

const FeatureCard = ({ title, problem, solution, icon, copilotText }) => (
  <div className="organic-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(224, 122, 95, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '24px' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>{title}</h3>
    <div style={{ flexGrow: 1 }}>
      <p style={{ fontSize: '0.95rem', marginBottom: '12px' }}><strong>The Problem:</strong> {problem}</p>
      <p style={{ fontSize: '0.95rem', marginBottom: '24px' }}><strong>The Solution:</strong> {solution}</p>
    </div>
    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
      <a href="http://localhost:8501" target="_blank" rel="noreferrer" className="btn-copilot" style={{ textDecoration: 'none' }}>✨ {copilotText}</a>
    </div>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-20" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
      <div className="container">
        <div className="text-center mb-4" style={{ maxWidth: '700px', margin: '0 auto 60px' }}>
          <h2 style={{ marginBottom: '16px' }}>Invisible AI. Visible Impact.</h2>
          <p style={{ fontSize: '1.1rem' }}>
            We don't believe in generic chatbots. Learnify runs complex Natural Language Processing silently in the background, surfacing insights only when they help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🧠"
            title="Knowledge Gap Analyzer" 
            problem="Students fail because they don't know exactly what they don't know."
            solution="Our NLP pipeline analyzes your written answers to identify specific semantic misunderstandings, dynamically generating a targeted micro-learning path."
            copilotText="Draft personalized study outline"
          />
          <FeatureCard 
            icon="🌿"
            title="Wellness & Burnout Dashboard" 
            problem="Schools lack the resources to monitor the mental load and academic burnout of their students."
            solution="Ethical NLP analyzes anonymous feedback to extract key stressors, creating a macro-level dashboard for administrators to adjust workloads before burnout happens."
            copilotText="View class sentiment trends"
          />
          <FeatureCard 
            icon="📚"
            title="Smart Syllabus Contextualizer" 
            problem="Students waste hours organizing notes and finding relevant resources for dense lectures."
            solution="Upload raw lecture transcripts. The system automatically parses the text, classifying main topics to generate interactive, bite-sized study flashcards."
            copilotText="Extract key terms from lecture"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
