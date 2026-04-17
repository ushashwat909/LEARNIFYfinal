import React, { useState } from 'react';
import { FileText, Zap, BookOpen, Layers, ArrowRight, Loader2, CheckCircle, RefreshCcw, LayoutGrid, ChevronRight } from 'lucide-react';

const SyllabusContextualizer = ({ theme }) => {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('topics'); // 'topics' or 'flashcards'
  const [flippedCards, setFlippedCards] = useState({});

  const isDark = theme === 'dark';

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setTranscript(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleContextualize = async () => {
    if (!transcript.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/contextualize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setResult(data.data);
        if (data.warning) {
          setError(`Note: ${data.warning}`); // Non-critical warning
        }
      } else {
        setError(data.message || 'Analysis failed');
      }
    } catch (err) {
      setError('Connection refused. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px', maxWidth: '1200px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '16px' }}>
          Smart Syllabus <span style={{ color: 'var(--color-primary)' }}>AI Contextualizer</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Transform raw lecture transcripts into structured topic maps and bite-sized flashcards instantly.
        </p>
      </div>

      {!result ? (
        <div style={{ 
          background: 'var(--color-card)', 
          borderRadius: '32px', 
          padding: '40px',
          border: '1px solid var(--color-border)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ color: 'var(--color-text)', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText className="text-primary" size={20} /> Paste Lecture Transcript
              </label>
              <label style={{ 
                cursor: 'pointer', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <Zap size={14} /> Upload .txt File
                <input type="file" accept=".txt" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            </div>
            <textarea 
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Example: Today we're discussing Operating System Kernels. There are two main architectures: Monolithic kernels and Microkernels. A monolithic kernel... "
              style={{
                width: '100%',
                height: '350px',
                padding: '24px',
                borderRadius: '20px',
                background: isDark ? 'rgba(255,255,255,0.03)' : '#f9f9f9',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                lineHeight: '1.6',
                resize: 'none',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            />
          </div>

          <button 
            onClick={handleContextualize}
            disabled={loading || !transcript.trim()}
            style={{
              width: '100%',
              padding: '20px',
              borderRadius: '16px',
              border: 'none',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 800,
              cursor: (loading || !transcript.trim()) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              transition: 'all 0.2s',
              opacity: (loading || !transcript.trim()) ? 0.7 : 1,
              transform: loading ? 'scale(0.98)' : 'none'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Analyzing Structure...
              </>
            ) : (
              <>
                <Zap size={20} /> Generate AI Syllabus
              </>
            )}
          </button>
          
          {error && (
            <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', gap: '10px' }}>
              <RefreshCcw size={18} /> {error}
            </div>
          )}
        </div>
      ) : (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          {/* Header Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
            <div style={{ textAlign: 'left' }}>
              <button 
                onClick={() => setResult(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}
              >
                <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> New Transcript
              </button>
              <h2 style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.8rem' }}>Transformed <span className="text-primary">Content</span></h2>
            </div>

            <div style={{ 
              display: 'flex', background: 'var(--color-card)', border: '1px solid var(--color-border)', 
              borderRadius: '12px', padding: '4px' 
            }}>
              <button 
                onClick={() => setActiveTab('topics')}
                style={{ 
                  padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: activeTab === 'topics' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'topics' ? '#fff' : 'var(--color-text)',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600
                }}
              >
                <Layers size={16} /> Topic Map
              </button>
              <button 
                onClick={() => setActiveTab('flashcards')}
                style={{ 
                  padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: activeTab === 'flashcards' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'flashcards' ? '#fff' : 'var(--color-text)',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600
                }}
              >
                <BookOpen size={16} /> Flashcards
              </button>
            </div>
          </div>

          {/* Summary Banner */}
          <div style={{ 
            background: isDark ? 'rgba(35, 134, 54, 0.05)' : '#f0fdf4',
            border: '1px solid rgba(35, 134, 54, 0.2)',
            borderRadius: '20px', padding: '24px', marginBottom: '24px', color: 'var(--color-text)'
          }}>
            <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#238636' }}>
              <CheckCircle size={18} /> Quick Summary
            </h4>
            <p style={{ margin: 0, lineHeight: '1.6', opacity: 0.9 }}>{result.summary}</p>
          </div>

          {/* Bullet Point Summary */}
          {result.bullet_points && result.bullet_points.length > 0 && (
            <div style={{ 
              background: 'var(--color-card)', 
              border: '1px solid var(--color-border)',
              borderRadius: '24px', padding: '30px', marginBottom: '40px'
            }}>
              <h4 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text)' }}>
                <LayoutGrid size={20} className="text-primary" /> Key Takeaways
              </h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0 }}>
                {result.bullet_points.map((point, idx) => (
                  <li key={idx} style={{ color: 'var(--color-text-muted)', lineHeight: '1.5', fontSize: '1rem' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'topics' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
              {result.classified_topics.map((topic, i) => (
                <div key={i} style={{ 
                  background: 'var(--color-card)', border: '1px solid var(--color-border)', 
                  borderRadius: '24px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ color: 'var(--color-text)', fontSize: '1.2rem', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {topic.module}
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {topic.subtopics.map((sub, j) => (
                      <div key={j} style={{ 
                        color: 'var(--color-text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 0', borderBottom: j < topic.subtopics.length - 1 ? '1px solid var(--color-border)' : 'none'
                      }}>
                        <ChevronRight size={14} className="text-primary" /> {sub}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
              {result.flashcards.map((card, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleFlip(i)}
                  style={{ 
                    perspective: '1000px',
                    height: '240px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    position: 'relative', width: '100%', height: '100%', transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: flippedCards[i] ? 'rotateY(180deg)' : 'none'
                  }}>
                    {/* Front */}
                    <div style={{ 
                      position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                      background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '24px',
                      padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', tracking: '1px' }}>
                         {card.topic}
                      </div>
                      <div style={{ color: 'var(--color-text)', fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.4' }}>
                        {card.question}
                      </div>
                      <div style={{ textAlign: 'right', color: 'var(--color-text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        Click to flip
                      </div>
                    </div>
                    {/* Back */}
                    <div style={{ 
                      position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                      background: 'var(--color-primary)', color: '#fff', borderRadius: '24px',
                      padding: '30px', transform: 'rotateY(180deg)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'
                    }}>
                       <div style={{ fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 600 }}>
                         {card.answer}
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SyllabusContextualizer;
