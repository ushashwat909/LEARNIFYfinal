import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogIn, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';

const WaveIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 9 C3.5 3, 6.5 15, 11 9 S18 3, 21 9" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);

const Navbar = ({ onGoHome, onNavigate, currentView, theme, onToggleTheme, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = (label, view) => (
    <span
      key={view}
      onClick={() => { onNavigate(view); setMenuOpen(false); }}
      style={{
        cursor: 'pointer',
        color: currentView === view ? 'var(--color-primary)' : 'var(--color-text)',
        fontWeight: currentView === view ? 700 : 500,
        fontSize: '0.9rem',
        padding: '4px 0',
        borderBottom: currentView === view ? '2px solid var(--color-primary)' : '2px solid transparent',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );

  const isInApp = !['landing', 'login', 'discovery'].includes(currentView);

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        background: 'var(--color-announcement)',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 24px',
        fontSize: '0.82rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}>
        🚀 Learn AI the Right Way &mdash;{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 700 }}
          onClick={() => onNavigate('login')}
        >
          Join Us Today!
        </span>
      </div>

      {/* Main Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: 'var(--color-navbar)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
          
          {/* Logo */}
          <div
            onClick={() => { onGoHome(); onNavigate('landing'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}>
              <WaveIcon />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
              Learnify
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {isInApp ? (
              <>
                {navLink('Dashboard', 'dashboard')}
                {navLink('Practice Hub', 'practice')}
                {navLink('Gap Analyzer', 'gap-analyzer')}
                {navLink('Syllabus AI', 'syllabus-ai')}
                {navLink('Brain GPS', 'knowledge-graph')}
                {navLink('Stats', 'stats')}
              </>
            ) : (
              <>
                <span
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ cursor: 'pointer', color: 'var(--color-text)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text)'}
                >
                  How it Works
                </span>
                <span
                  onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ cursor: 'pointer', color: 'var(--color-text)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text)'}
                >
                  Programs
                </span>
                <span
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ cursor: 'pointer', color: 'var(--color-text)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text)'}
                >
                  Features
                </span>
                <span
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ cursor: 'pointer', color: 'var(--color-text)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text)'}
                >
                  FAQ
                </span>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              style={{
                background: 'transparent',
                border: '1.5px solid var(--color-border)',
                borderRadius: '8px',
                padding: '7px',
                cursor: 'pointer',
                color: 'var(--color-text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {user ? (
              <>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '7px 14px', borderRadius: '8px',
                  background: 'var(--color-bg-alt)',
                  border: '1.5px solid var(--color-border)',
                  fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)',
                }}>
                  <User size={14} />
                  {user.username}
                </div>
                <button
                  onClick={onLogout}
                  style={{
                    background: 'transparent', border: '1.5px solid var(--color-border)',
                    borderRadius: '8px', padding: '7px', cursor: 'pointer',
                    color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center',
                    transition: 'all 0.2s',
                  }}
                  title="Sign out"
                >
                  <LogOut size={15} />
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  Get Started
                </button>
              </>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'transparent', border: '1.5px solid var(--color-border)',
                borderRadius: '8px', padding: '7px', cursor: 'pointer', color: 'var(--color-text)',
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div style={{
            background: 'var(--color-card-bg)',
            borderTop: '1px solid var(--color-border)',
            padding: '20px 24px',
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            {isInApp ? (
              ['dashboard', 'practice', 'gap-analyzer', 'syllabus-ai', 'knowledge-graph', 'stats'].map(v => (
                <span key={v} onClick={() => { onNavigate(v); setMenuOpen(false); }}
                  style={{ cursor: 'pointer', color: currentView === v ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: 600, fontSize: '0.95rem', textTransform: 'capitalize' }}>
                  {v.replace('-', ' ')}
                </span>
              ))
            ) : (
              ['How it Works', 'Programs', 'Features', 'FAQ'].map(label => (
                <span key={label} style={{ cursor: 'pointer', color: 'var(--color-text)', fontWeight: 600, fontSize: '0.95rem' }}>{label}</span>
              ))
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
