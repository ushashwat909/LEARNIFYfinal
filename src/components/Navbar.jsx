import React, { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, User, Menu, X } from 'lucide-react';

const WaveIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 9 C3.5 3, 6.5 15, 11 9 S18 3, 21 9" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);

const linkStyle = ({ isActive }) => ({
  cursor: 'pointer',
  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
  fontWeight: isActive ? 700 : 500,
  fontSize: '0.9rem',
  padding: '4px 0',
  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
});

const Navbar = ({ theme, onToggleTheme, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  const isInApp = useMemo(() => {
    const p = location.pathname;
    const appPrefixes = ['/dashboard', '/practice', '/gap-analyzer', '/syllabus-ai', '/curriculum', '/brain-gps', '/stats', '/solve'];
    return appPrefixes.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navTo = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      <div
        style={{
          background: 'var(--color-announcement)',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 24px',
          fontSize: '0.82rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        🚀 Learn AI the Right Way &mdash;{' '}
        <Link to="/login" style={{ textDecoration: 'underline', fontWeight: 700, color: '#fff' }}>
          Join Us Today!
        </Link>
      </div>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          background: 'var(--color-navbar)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textDecoration: 'none' }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <WaveIcon />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>Learnify</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {isInApp ? (
              <>
                <NavLink to="/dashboard" style={linkStyle} end>
                  Dashboard
                </NavLink>
                <NavLink to="/practice" style={linkStyle}>
                  Practice Hub
                </NavLink>
                <NavLink to="/curriculum" style={linkStyle}>
                  Full Curriculum
                </NavLink>
                <NavLink to="/gap-analyzer" style={linkStyle}>
                  Gap Analyzer
                </NavLink>
                <NavLink to="/syllabus-ai" style={linkStyle}>
                  Syllabus AI
                </NavLink>
                <NavLink to="/brain-gps" style={linkStyle}>
                  Brain GPS
                </NavLink>
                <NavLink to="/stats" style={linkStyle}>
                  Stats
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/curriculum" style={linkStyle}>
                  Curriculum
                </NavLink>
                <NavLink to="/how-it-works" style={linkStyle}>
                  How it Works
                </NavLink>
                <NavLink to="/programs" style={linkStyle}>
                  Programs
                </NavLink>
                <NavLink to="/features" style={linkStyle}>
                  Features
                </NavLink>
                <NavLink to="/faq" style={linkStyle}>
                  FAQ
                </NavLink>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onToggleTheme}
              style={{
                background: 'transparent',
                border: '1.5px solid var(--color-border)',
                borderRadius: '8px',
                padding: '7px',
                cursor: 'pointer',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {user ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    background: 'var(--color-bg-alt)',
                    border: '1.5px solid var(--color-border)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                  }}
                >
                  <User size={14} />
                  {user.username}
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  style={{
                    background: 'transparent',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '7px',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                  }}
                  title="Sign out"
                >
                  <LogOut size={15} />
                </button>
                <Link to="/dashboard" className="btn btn-primary btn-sm" style={{ borderRadius: '8px', textDecoration: 'none' }}>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm" style={{ borderRadius: '8px', textDecoration: 'none' }}>
                  Sign In
                </Link>
                <Link to="/login" className="btn btn-primary btn-sm" style={{ borderRadius: '8px', textDecoration: 'none' }}>
                  Get Started
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: '1.5px solid var(--color-border)',
                borderRadius: '8px',
                padding: '7px',
                cursor: 'pointer',
                color: 'var(--color-text)',
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            style={{
              background: 'var(--color-card-bg)',
              borderTop: '1px solid var(--color-border)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {isInApp ? (
              [
                ['/dashboard', 'Dashboard'],
                ['/practice', 'Practice Hub'],
                ['/curriculum', 'Full Curriculum'],
                ['/gap-analyzer', 'Gap Analyzer'],
                ['/syllabus-ai', 'Syllabus AI'],
                ['/brain-gps', 'Brain GPS'],
                ['/stats', 'Stats'],
              ].map(([path, label]) => (
                <span
                  key={path}
                  role="presentation"
                  onClick={() => navTo(path)}
                  style={{
                    cursor: 'pointer',
                    color: location.pathname === path || (path === '/practice' && location.pathname.startsWith('/solve')) ? 'var(--color-primary)' : 'var(--color-text)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  {label}
                </span>
              ))
            ) : (
              [
                ['/curriculum', 'Curriculum'],
                ['/how-it-works', 'How it Works'],
                ['/programs', 'Programs'],
                ['/features', 'Features'],
                ['/faq', 'FAQ'],
              ].map(([path, label]) => (
                <span
                  key={path}
                  role="presentation"
                  onClick={() => navTo(path)}
                  style={{ cursor: 'pointer', color: 'var(--color-text)', fontWeight: 600, fontSize: '0.95rem' }}
                >
                  {label}
                </span>
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
