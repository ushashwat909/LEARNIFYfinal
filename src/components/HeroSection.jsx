import React from 'react';

const HeroSection = () => {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', position: 'relative' }}>
      <div className="container grid md:grid-cols-2 items-center gap-8">
        
        {/* Text Content */}
        <div style={{ zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(129, 178, 154, 0.2)', borderRadius: '50px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-secondary)' }}></span>
            Empowering Human Intelligence
          </div>
          <h1 className="mb-4">
            Education that actually <br/>
            <span style={{ color: 'var(--color-primary)' }}>understands you.</span>
          </h1>
          <p className="mb-4" style={{ fontSize: '1.25rem' }}>
            Learnify acts as your invisible co-pilot. We gently analyze your learning patterns in the background to deliver exactly what you need, exactly when you need it—without the robotic interface.
          </p>
          <div className="flex items-center mt-8" style={{ gap: '1rem' }}>
            <a href="http://localhost:8501" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>Find My Learning Path</a>
            <a href="#features" className="btn btn-secondary" style={{ textDecoration: 'none' }}>See How It Works</a>
          </div>
        </div>

        {/* UI Mockup / XAI Concept */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          
          {/* Mockup Base */}
          <div className="organic-card" style={{ width: '100%', maxWidth: '450px', padding: '30px', position: 'relative' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Module 4: Advanced Data Structures</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '24px' }}>Let's review Binary Trees before we proceed.</p>
            
            <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #e9ecef' }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 500, color: '#495057' }}>"What is the time complexity of searching a completely unbalanced Binary Search Tree?"</p>
            </div>
            
            <button className="btn-copilot" style={{ marginTop: '8px' }}>✨ Generate a hint</button>

            {/* Explainable AI Tooltip Overlay */}
            <div className="tooltip-card" style={{ position: 'absolute', top: '-20px', right: '-40px', width: '280px', animation: 'float 5s ease-in-out infinite' }}>
              <div style={{ fontSize: '1.5rem' }}>💡</div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '4px' }}>Why are we reviewing this?</strong>
                <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.4 }}>Recommended because you missed 2 questions on Tree Traversals last week.</p>
              </div>
            </div>
            
            <div className="tooltip-card" style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '240px', borderColor: 'var(--color-primary)', animation: 'float-delay 6s ease-in-out infinite' }}>
               <div style={{ fontSize: '1.2rem' }}>🎯</div>
               <div>
                 <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.4 }}><strong>Goal aligned:</strong> Midterm prep (85% readiness)</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
