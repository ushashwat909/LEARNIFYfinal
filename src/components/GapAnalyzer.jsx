import React, { useState } from 'react';
import { Brain, Lightbulb, AlertTriangle, CheckCircle, ArrowRight, Loader2, BookOpen } from 'lucide-react';

const TOPICS = [
  "Recursion",
  "Pointers & Memory",
  "Big O Notation",
  "Dynamic Programming",
  "Concurrency & Deadlocks",
  "Binary Search Trees",
  "Graph Traversal (DFS/BFS)",
  "Object Oriented Pillars",
  "REST API Principles",
  "TCP vs UDP"
];

const GapAnalyzer = ({ theme }) => {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [explanation, setExplanation] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const isDark = theme === 'dark';

  const handleAnalyze = async () => {
    if (!explanation.trim()) return;
    
    setAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/analyze-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, explanation }),
      });

      if (!response.ok) throw new Error('Failed to analyze explanation');

      const data = await response.json();
      if (data.status === 'success') {
        setResult(data.analysis);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '16px' }}>
          Knowledge <span style={{ color: 'var(--color-primary)' }}>Gap Analyzer</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Our NLP pipeline analyzes your written answers to identify specific semantic misunderstandings, dynamically generating a targeted micro-learning path.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: result ? '1fr 1.2fr' : '1fr', 
        gap: '30px',
        transition: 'all 0.5s ease'
      }}>
        {/* Input Section */}
        <div style={{ 
          background: 'var(--color-card)', 
          borderRadius: '24px', 
          padding: '32px',
          border: '1px solid var(--color-border)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--color-text)', fontWeight: 600, marginBottom: '10px' }}>
              Select Topic
            </label>
            <select 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              <option value="Other">Other Concept</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--color-text)', fontWeight: 600, marginBottom: '10px' }}>
              Explain {topic} in your own words
            </label>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
              Tip: The Feynman Technique. Explain it as if you were teaching a beginner.
            </p>
            <textarea 
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Start explaining here..."
              style={{
                width: '100%',
                height: '250px',
                padding: '16px',
                borderRadius: '16px',
                background: isDark ? 'rgba(255,255,255,0.03)' : '#f9f9f9',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                lineHeight: '1.6',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={analyzing || !explanation.trim()}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 700,
              border: 'none',
              cursor: (analyzing || !explanation.trim()) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'transform 0.2s, opacity 0.2s',
              opacity: (analyzing || !explanation.trim()) ? 0.7 : 1
            }}
          >
            {analyzing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing semantic gaps...
              </>
            ) : (
              <>
                <Brain size={20} />
                Run Gap Analysis
              </>
            )}
          </button>
          
          {error && (
            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.9rem', display: 'flex', gap: '8px' }}>
              <AlertTriangle size={16} />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div style={{ 
            animation: 'fadeInSlide 0.5s ease-out forwards',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Summary Box */}
            <div style={{ 
              background: isDark ? 'rgba(34, 197, 94, 0.05)' : '#f0fdf4', 
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '20px', 
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                  <CheckCircle size={20} />
                </div>
                <h3 style={{ color: 'var(--color-text)', margin: 0 }}>Analysis Summary</h3>
              </div>
              <p style={{ color: 'var(--color-text)', lineHeight: '1.6', margin: 0 }}>
                {result.summary}
              </p>
            </div>

            {/* Gaps vs Correct Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ 
                background: 'var(--color-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '20px', 
                padding: '24px' 
              }}>
                <h4 style={{ color: '#ef4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} /> Semantic Gaps
                </h4>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {result.identified_gaps.map((gap, i) => (
                    <li key={i} style={{ 
                      padding: '10px 0', borderBottom: i < result.identified_gaps.length -1 ? '1px solid var(--color-border)' : 'none',
                      color: 'var(--color-text)', fontSize: '0.9rem', display: 'flex', gap: '8px'
                    }}>
                      <span style={{ color: '#ef4444' }}>•</span> {gap}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ 
                background: 'var(--color-card)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '20px', 
                padding: '24px' 
              }}>
                <h4 style={{ color: '#22c55e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lightbulb size={18} /> Key Strengths
                </h4>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {result.correct_concepts.map((concept, i) => (
                    <li key={i} style={{ 
                      padding: '10px 0', borderBottom: i < result.correct_concepts.length -1 ? '1px solid var(--color-border)' : 'none',
                      color: 'var(--color-text)', fontSize: '0.9rem', display: 'flex', gap: '8px'
                    }}>
                      <span style={{ color: '#22c55e' }}>•</span> {concept}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Micro-Learning Path */}
            <div style={{ 
              background: 'var(--color-card)', 
              borderRadius: '24px', 
              padding: '32px',
              border: '1px solid var(--color-border)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', 
                background: 'var(--color-primary)', opacity: 0.05, borderRadius: '0 0 0 100%' 
              }}></div>
              
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BookOpen className="text-primary" /> Target Learning Path
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {result.micro_path.map((step, i) => (
                  <div key={i} style={{ 
                    display: 'flex', gap: '20px', padding: '20px', 
                    borderRadius: '16px', background: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                    border: '1px solid var(--color-border)',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', 
                      fontWeight: 800, fontSize: '0.9rem', flexShrink: 0
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text)', fontWeight: 700, marginBottom: '4px' }}>{step.task}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{step.resource_tip}</div>
                    </div>
                    <ArrowRight size={18} style={{ 
                      position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                      opacity: 0.2, color: 'var(--color-text)'
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default GapAnalyzer;
