import React, { useState, useEffect } from 'react';
import logo from '../assets/learnify_logo.png';

const Navbar = ({ onGoHome, onNavigate, currentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemStyle = (view) => ({
    textDecoration: 'none', 
    color: currentView === view ? '#00F0FF' : 'var(--color-text)', 
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderBottom: currentView === view ? '2px solid #00F0FF' : '2px solid transparent',
    paddingBottom: '4px'
  });

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 100, 
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(11, 17, 32, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent'
    }}>
      <div className="container flex items-center justify-between" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { onGoHome(); onNavigate('landing'); }}>
          <img src={logo} alt="Learnify Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>Learnify</span>
        </div>
        
        <div className="flex items-center gap-8" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {(currentView !== 'landing' && currentView !== 'discovery') && (
            <>
              <span onClick={() => onNavigate('dashboard')} style={navItemStyle('dashboard')}>Dashboard</span>
              <span onClick={() => onNavigate('practice')} style={navItemStyle('practice')}>Practice Hub</span>
              <span onClick={() => onNavigate('stats')} style={navItemStyle('stats')}>Stats</span>
            </>
          )}
          {currentView === 'landing' && (
            <>
              <a href="#features" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Features</a>
              <a href="http://localhost:8501" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Teachers</a>
            </>
          )}
          <button 
            onClick={() => onNavigate(currentView === 'landing' ? 'discovery' : 'dashboard')} 
            className="btn btn-primary" 
            style={{ padding: '10px 24px', cursor: 'pointer', boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
          >
            {currentView === 'landing' ? 'Get Started' : 'Learning Dashboard'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
