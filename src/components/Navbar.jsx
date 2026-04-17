import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogIn, LogOut, User } from 'lucide-react';
import logo from '../assets/learnify_logo.png';

const Navbar = ({ onGoHome, onNavigate, currentView, theme, onToggleTheme, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemStyle = (view) => ({
    textDecoration: 'none', 
    color: currentView === view ? 'var(--color-primary)' : 'var(--color-text)', 
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderBottom: currentView === view ? '2px solid var(--color-primary)' : '2px solid transparent',
    paddingBottom: '4px'
  });

  return (
    <nav style={{ 
      position: 'fixed', top: 0, width: '100%', zIndex: 100, 
      transition: 'all 0.3s ease',
      background: scrolled ? 'var(--color-navbar)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent'
    }}>
      <div className="container flex items-center justify-between" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { onGoHome(); onNavigate('landing'); }}>
          <img src={logo} alt="Learnify Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>Learnify</span>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {(currentView !== 'landing' && currentView !== 'discovery' && currentView !== 'login') && (
            <>
              <span onClick={() => onNavigate('dashboard')} style={navItemStyle('dashboard')}>Dashboard</span>
              <span onClick={() => onNavigate('practice')} style={navItemStyle('practice')}>Practice Hub</span>
              <span onClick={() => onNavigate('gap-analyzer')} style={navItemStyle('gap-analyzer')}>Gap Analyzer</span>
              <span onClick={() => onNavigate('syllabus-ai')} style={navItemStyle('syllabus-ai')}>Syllabus AI</span>
              <span onClick={() => onNavigate('knowledge-graph')} style={navItemStyle('knowledge-graph')}>Brain GPS</span>
              <span onClick={() => onNavigate('stats')} style={navItemStyle('stats')}>Stats</span>
            </>
          )}
          {currentView === 'landing' && (
            <>
              <a onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500, cursor: 'pointer' }}>How it Works</a>
              <a href="#features" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Features</a>
              <a href="http://localhost:8501" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Teachers</a>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              style={{ 
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', 
                border: `1px solid var(--color-border)`, 
                borderRadius: '8px', padding: '8px', 
                color: 'var(--color-text)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <>
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', 
                  borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  border: `1px solid var(--color-border)`, fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)'
                }}>
                  <User size={14} />
                  {user.username}
                </div>
                <button 
                  onClick={onLogout}
                  style={{ 
                    background: 'transparent', border: `1px solid var(--color-border)`, 
                    borderRadius: '8px', padding: '8px', color: 'var(--color-text)', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center'
                  }}
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  style={{ 
                    padding: '8px 20px', borderRadius: '8px', border: 'none',
                    background: '#238636', color: '#fff', fontSize: '0.85rem', 
                    fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('login')} 
                  style={{ 
                    padding: '8px 16px', borderRadius: '8px', 
                    border: `1px solid var(--color-border)`, 
                    background: 'transparent', color: 'var(--color-text)', 
                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <LogIn size={14} /> Sign in
                </button>
                <button 
                  onClick={() => onNavigate(currentView === 'landing' ? 'discovery' : 'dashboard')} 
                  style={{ 
                    padding: '8px 20px', borderRadius: '8px', border: 'none',
                    background: '#238636', color: '#fff', fontSize: '0.85rem', 
                    fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
