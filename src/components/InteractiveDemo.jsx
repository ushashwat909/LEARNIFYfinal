import React, { useState } from 'react';

const InteractiveDemo = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: 1, raw_text: text })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from backend API');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className="organic-card">
          <h2 style={{ marginBottom: '16px', fontSize: '2rem' }}>See the Seamless Integration</h2>
          <p style={{ marginBottom: '24px' }}>
            Test out our new real-time NLP Single Page Action. This text is sent directly to the headless FastAPI backend and processed dynamically.
          </p>
          
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '16px', fontSize: '1rem', background: '#FAFAFA' }}
            placeholder="E.g., I understood today's lecture but I am getting really frustrated with data structures and trees..."
          />
          
          <button 
            onClick={handleAnalyze} 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
          >
            {loading ? 'Analyzing...' : 'Analyze & Draft Study Outline'}
          </button>

          {error && <div style={{ color: 'red', marginTop: '16px' }}>{error}</div>}

          {result && (
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(129, 178, 154, 0.2)', borderRadius: '12px' }}>
                  <strong>Sentiment:</strong> <br/> {result.ai_insights.sentiment}
                </div>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(224, 122, 95, 0.1)', borderRadius: '12px' }}>
                  <strong>Tags:</strong> <br/> {result.ai_insights.keywords}
                </div>
                <div style={{ flex: 1, padding: '16px', background: 'rgba(38, 70, 83, 0.1)', borderRadius: '12px' }}>
                  <strong>Confidence:</strong> <br/> {(result.ai_insights.confidence * 100).toFixed(0)}%
                </div>
              </div>

              {result.generated_outline && (
                <div style={{ padding: '24px', background: '#FAFAFA', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                  <h3 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>✨ Your Personalized Study Outline</h3>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {result.generated_outline}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
