import React, { useState, useEffect } from 'react';
import logo from '../assets/learnify_logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 100, 
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(244, 241, 222, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent'
    }}>
      <div className="container flex items-center justify-between" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logo} alt="Learnify Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>Learnify</span>
        </div>
        
        <div className="flex items-center gap-8" style={{ display: 'flex', gap: '2rem' }}>
          <a href="#features" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>How it Works</a>
          <a href="http://localhost:8501" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--color-text)', fontWeight: 500 }}>Teacher Dashboard</a>
          <a href="http://localhost:8501" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '10px 24px', textDecoration: 'none' }}>Start Learning Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
