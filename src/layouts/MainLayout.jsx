import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';

const WaveIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 9 C3.5 3, 6.5 15, 11 9 S18 3, 21 9" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);

export default function MainLayout() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allProblems, setAllProblems] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setUser(data);
        if (data.onboarded) {
          setUserData({ career: data.study_track, experience: data.experience_level });
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  useEffect(() => {
    fetch('/api/problems')
      .then((res) => res.json())
      .then((data) => setAllProblems(data.problems || []))
      .catch((err) => console.error('Failed to fetch problem list', err));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleLogin = useCallback(
    (userFromAuth, isNewUser = false) => {
      setUser(userFromAuth);
      navigate(isNewUser ? '/onboarding' : '/dashboard', { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/', { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const onStartLearning = useCallback(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, user]);

  const handleCompleteOnboarding = useCallback(
    async (data) => {
      setUserData(data);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch('/api/auth/onboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ career: data.career, experience: data.experience }),
          });
        } catch (err) {
          console.error('Failed to save onboarding', err);
        }
      }
      navigate('/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate]
  );

  const outletContext = useMemo(
    () => ({
      theme,
      user,
      userData,
      setUserData,
      allProblems,
      toggleTheme,
      handleLogin,
      handleLogout,
      handleCompleteOnboarding,
      onStartLearning,
    }),
    [
      theme,
      user,
      userData,
      allProblems,
      toggleTheme,
      handleLogin,
      handleLogout,
      handleCompleteOnboarding,
      onStartLearning,
    ]
  );

  return (
    <>
      <Navbar theme={theme} user={user} onToggleTheme={toggleTheme} onLogout={handleLogout} />

      <Outlet context={outletContext} />

      <Chatbot theme={theme} userId={user?.id || 0} />

      <footer
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-text-muted)',
          padding: '60px 24px 40px',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr 1fr',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <WaveIcon />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)' }}>Learnify</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Explore the World of Artificial Intelligence. Personalized education that adapts to you.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '8px' }}>Company</h4>
            <Link to="/about" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              About
            </Link>
            <Link to="/careers" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Careers{' '}
              <span style={{ background: 'var(--color-primary)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>
                NEW
              </span>
            </Link>
            <Link to="/events" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Events
            </Link>
            <Link to="/webinars" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Webinars
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '8px' }}>Explore</h4>
            <Link to="/programs" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Programs
            </Link>
            <Link to="/trainers" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Trainers
            </Link>
            <Link to="/membership" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Membership
            </Link>
            <Link to="/certification" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Certification
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '8px' }}>Support</h4>
            <Link to="/contact" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Get in Touch
            </Link>
            <Link to="/faq" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              FAQ&apos;s
            </Link>
            <Link to="/community" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Community
            </Link>
            <Link to="/knowledgebase" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Knowledgebase
            </Link>
          </div>
        </div>

        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.85rem',
          }}
        >
          <div>© {new Date().getFullYear()} Learnify. Designed with AI.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/terms" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Terms
            </Link>
            <Link to="/privacy" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link to="/cookies" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
