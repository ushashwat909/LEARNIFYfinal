import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BookOpen, 
  Clock, 
  Zap, 
  ChevronRight, 
  ArrowLeft, 
  ExternalLink, 
  Search,
  BookMarked,
  Layers,
  Award,
  Book
} from 'lucide-react';
import curriculumData from '../data/curriculum.json';

const CurriculumView = ({ theme }) => {
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Path to .md file
  const [materialContent, setMaterialContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isDark = theme === 'dark';

  // Current states
  const currentTrack = curriculumData[selectedTrackIdx] || curriculumData[0];
  const currentCategory = currentTrack.categories[selectedCategoryIdx] || currentTrack.categories[0];

  useEffect(() => {
    if (selectedMaterial) {
      setLoading(true);
      fetch(`/api/curriculum/material?path=${encodeURIComponent(selectedMaterial)}`)
        .then(res => res.json())
        .then(data => {
          setMaterialContent(data.content || 'No content found.');
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
          console.error("Failed to load material", err);
          setMaterialContent("Error loading study material.");
          setLoading(false);
        });
    }
  }, [selectedMaterial]);

  const filteredSubcategories = currentCategory.subcategories.map(sub => ({
    ...sub,
    courses: sub.courses.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(sub => sub.courses.length > 0);

  const handleCourseClick = (course) => {
    if (course.link.endsWith('.md')) {
      setSelectedMaterial(course.link);
    } else {
      window.open(course.link, '_blank');
    }
  };

  if (selectedMaterial) {
    return (
      <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container">
          <button 
            onClick={() => setSelectedMaterial(null)}
            className="btn btn-outline btn-sm"
            style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} /> Back to Curriculum
          </button>

          <div className="card" style={{ padding: '40px', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div className="animate-pulse" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Retrieving curriculum details...</div>
              </div>
            ) : (
              <div className="prose" style={{ 
                color: 'var(--color-text)', 
                maxWidth: '100%',
                lineHeight: 1.7
              }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {materialContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        <style>{`
          .prose h1 { font-size: 2.2rem; margin-bottom: 24px; border-bottom: 1px solid var(--color-border); padding-bottom: 12px; color: var(--color-text); }
          .prose h2 { font-size: 1.6rem; margin-top: 40px; margin-bottom: 20px; color: var(--color-text); }
          .prose h3 { font-size: 1.25rem; margin-top: 30px; margin-bottom: 16px; color: var(--color-text); }
          .prose p { margin-bottom: 20px; color: var(--color-text-muted); }
          .prose ul, .prose ol { margin-bottom: 24px; padding-left: 20px; color: var(--color-text-muted); }
          .prose li { margin-bottom: 8px; }
          .prose a { color: var(--color-primary); text-decoration: none; font-weight: 600; }
          .prose a:hover { text-decoration: underline; }
          .prose code { background: var(--color-bg-alt); padding: 2px 6px; borderRadius: 4px; font-family: monospace; font-size: 0.9em; }
          .prose blockquote { border-left: 4px solid var(--color-primary); padding-left: 20px; font-style: italic; color: var(--color-text-muted); margin: 30px 0; }
          .prose table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .prose th, .prose td { border: 1px solid var(--color-border); padding: 12px; text-align: left; }
          .prose th { background: var(--color-bg-alt); font-weight: 700; }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px', display: 'flex' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ 
        width: '300px', 
        borderRight: '1px solid var(--color-border)', 
        padding: '32px 24px',
        position: 'fixed',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        background: 'var(--color-bg)',
        zIndex: 10
      }}>
        {/* Track Selector */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            LEARNING TRACK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {curriculumData.map((track, idx) => (
              <button 
                key={track.title}
                onClick={() => { setSelectedTrackIdx(idx); setSelectedCategoryIdx(0); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: selectedTrackIdx === idx ? 'var(--color-primary)' : 'var(--color-bg-alt)',
                  color: selectedTrackIdx === idx ? '#fff' : 'var(--color-text)',
                  fontWeight: selectedTrackIdx === idx ? 700 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {track.title.includes('Books') ? <Book size={18} /> : <Award size={18} />}
                <span style={{ fontSize: '0.85rem' }}>{track.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--color-border)', margin: '24px 0' }} />

        {/* Category Selector */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            CATEGORIES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentTrack.categories.map((cat, idx) => (
              <button 
                key={cat.title}
                onClick={() => setSelectedCategoryIdx(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: selectedCategoryIdx === idx ? 'var(--color-primary-light)' : 'transparent',
                  color: selectedCategoryIdx === idx ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                  fontWeight: selectedCategoryIdx === idx ? 700 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.85rem'
                }}
              >
                <ChevronRight size={14} style={{ opacity: selectedCategoryIdx === idx ? 1 : 0 }} />
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '300px', flex: 1, padding: '40px 60px 80px' }}>
        <header style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '8px' }}>{currentTrack.title}</div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>{currentCategory.title}</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                Exploring {currentCategory.subcategories.length} specialized modules in this section.
              </p>
            </div>
            
            <div style={{ 
              position: 'relative', 
              width: '300px',
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px'
            }}>
              <Search size={18} style={{ color: 'var(--color-text-muted)', marginRight: '10px' }} />
              <input 
                type="text" 
                placeholder="Search within category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text)',
                  fontSize: '0.9rem', width: '100%'
                }}
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {filteredSubcategories.map((sub, sIdx) => (
            <secton key={sub.title + sIdx}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, whiteSpace: 'nowrap' }}>{sub.title}</h2>
                <div style={{ height: '1px', background: 'var(--color-border)', flex: 1 }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {sub.courses.map((course, cIdx) => (
                  <div key={course.title + cIdx} className="card" style={{ 
                    padding: '28px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    background: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 12px 24px -10px var(--color-primary-light)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.8 }}>
                        {course.type === 'book' ? 'Recommended Text' : 'Video Course'}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.4, color: 'var(--color-text)' }}>{course.title}</h3>
                      
                      {course.type === 'book' ? (
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                          <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, marginBottom: '4px' }}>AUTHOR</span>
                          {course.author || 'N/A'}
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, marginBottom: '4px' }}>DURATION</span>
                            {course.duration}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, marginBottom: '4px' }}>EFFORT</span>
                            {course.effort}
                          </div>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => handleCourseClick(course)}
                      className={`btn ${course.link.endsWith('.md') ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}
                    >
                      {course.link.endsWith('.md') ? (
                        <><BookOpen size={16} /> Read Study Notes</>
                      ) : (
                        <><ExternalLink size={16} /> Access Material</>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </secton>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CurriculumView;
