import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import HowItWorks from './components/HowItWorks';
import CareerPathsSection from './components/CareerPathsSection';
import Features from './components/Features';
import TestimonialsSection from './components/TestimonialsSection'; // Now acts as FAQ
import CTASection from './components/CTASection';
import Chatbot from './components/Chatbot';
import AdaptiveLearning from './components/AdaptiveLearning';
import DiscoveryForm from './components/DiscoveryForm';
import PracticeHub from './components/PracticeHub';
import ProblemSpace from './components/ProblemSpace';
import GamificationDashboard from './components/GamificationDashboard';
import LoginPage from './components/LoginPage';
import GapAnalyzer from './components/GapAnalyzer';
import SyllabusContextualizer from './components/SyllabusContextualizer';
import KnowledgeGraph from './components/KnowledgeGraph';

// Import WaveIcon from Navbar for use in Footer, or define inline
const WaveIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M1 9 C3.5 3, 6.5 15, 11 9 S18 3, 21 9" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [view, setView] = useState('landing');
  const [userData, setUserData] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [user, setUser] = useState(null); // Authenticated user
  const [practiceSearch, setPracticeSearch] = useState('');
  const [allProblems, setAllProblems] = useState([]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          setUser(data);
          // If they already onboarded, go to dashboard; otherwise stay on landing
          if (data.onboarded) {
            setUserData({ career: data.study_track, experience: data.experience_level });
          }
        })
        .catch(() => { localStorage.removeItem('token'); setUser(null); });
    }
  }, []);

  // Fetch all problems for navigation
  useEffect(() => {
    fetch('/api/problems')
      .then(res => res.json())
      .then(data => setAllProblems(data.problems || []))
      .catch(err => console.error("Failed to fetch problem list", err));
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLogin = (userData, isNewUser = false) => {
    setUser(userData);
    if (isNewUser) {
      // New registration → ask onboarding questions (only once)
      setView('discovery');
    } else {
      // Returning user → go to dashboard
      setView('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('landing');
  };

  const handleStartOnboarding = () => {
    if (!user) {
      setView('login');
      return;
    }
    setView('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOnboarding = async (data) => {
    setUserData(data);
    // Save onboarding answers to the database
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch('/api/auth/onboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ career: data.career, experience: data.experience })
        });
      } catch (err) {
        console.error('Failed to save onboarding', err);
      }
    }
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProblem = (id) => {
    setSelectedProblem(id);
    setView('coding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToNextProblem = () => {
    if (!allProblems.length) return;
    const currentIndex = allProblems.findIndex(p => p.id === selectedProblem);
    const nextIndex = (currentIndex + 1) % allProblems.length;
    setSelectedProblem(allProblems[nextIndex].id);
  };

  const navigateToPrevProblem = () => {
    if (!allProblems.length) return;
    const currentIndex = allProblems.findIndex(p => p.id === selectedProblem);
    const prevIndex = (currentIndex - 1 + allProblems.length) % allProblems.length;
    setSelectedProblem(allProblems[prevIndex].id);
  };

  const isDark = theme === 'dark';

  return (
    <>
      <Navbar 
        currentView={view}
        theme={theme}
        user={user}
        onToggleTheme={toggleTheme}
        onNavigate={(v) => { 
          if (v !== 'practice') setPracticeSearch(''); 
          setView(v); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }}
        onGoHome={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onLogout={handleLogout}
      />

      {view === 'login' && (
        <LoginPage onLogin={handleLogin} theme={theme} />
      )}

      {view === 'landing' && (
        <>
          <HeroSection onStart={handleStartOnboarding} />
          <StatsSection />
          <HowItWorks />
          <CareerPathsSection />
          <Features />
          <TestimonialsSection /> {/* Actually FAQ now based on Aicademy */}
          <CTASection onStart={handleStartOnboarding} />
        </>
      )}

      {view === 'discovery' && (
        <DiscoveryForm onComplete={handleCompleteOnboarding} />
      )}

      {view === 'dashboard' && (
        <AdaptiveLearning userData={userData} onChallenge={handleSelectProblem} />
      )}

      {view === 'practice' && (
        <PracticeHub onSelectProblem={handleSelectProblem} initialSearch={practiceSearch} />
      )}

      {view === 'gap-analyzer' && (
        <GapAnalyzer theme={theme} />
      )}

      {view === 'syllabus-ai' && (
        <SyllabusContextualizer theme={theme} />
      )}

      {view === 'knowledge-graph' && (
        <KnowledgeGraph 
          theme={theme} 
          userId={user?.id || 101} 
          onStartChallenge={async (category) => {
            // Pick a problem for this category and jump straight to coding
            try {
              const res = await fetch('/api/problems');
              const data = await res.json();
              const catProb = data.problems.find(p => p.category?.toLowerCase() === category.toLowerCase());
              if (catProb) {
                handleSelectProblem(catProb.id);
              } else {
                setPracticeSearch(category);
                setView('practice');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } catch (err) {
              setPracticeSearch(category);
              setView('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      )}

      {view === 'coding' && (
        <div style={{ paddingTop: '0px' }}> {/* ProblemSpace now handles its own internal offset */}
           <ProblemSpace 
              theme={theme} 
              problemId={selectedProblem} 
              userId={user?.id || 101} 
              onBack={() => setView('practice')} 
              onNext={navigateToNextProblem}
              onPrev={navigateToPrevProblem}
           />
        </div>
      )}

      {view === 'stats' && (
        <GamificationDashboard userId={user?.id || 101} />
      )}

      <Chatbot theme={theme} userId={user?.id || 0} />

      {/* Aicademy-style Theme-aware Footer */}
      <footer style={{ 
        background: 'var(--color-bg)', 
        color: 'var(--color-text-muted)', 
        padding: '60px 24px 40px', 
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr 1fr', gap: '40px', marginBottom: '60px' }}>
          
          {/* Col 1: Brand & Desc */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
              }}>
                <WaveIcon />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)' }}>Learnify</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Explore the World of Artificial Intelligence. Personalized education that adapts to you.
            </p>
          </div>

          {/* Col 2: Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '8px' }}>Company</h4>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>About</a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
              Careers <span style={{ background: 'var(--color-primary)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>NEW</span>
            </a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Events</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Webinars</a>
          </div>

          {/* Col 3: Explore */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '8px' }}>Explore</h4>
            <a href="#programs" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Programs</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Trainers</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Membership</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Certification</a>
          </div>

          {/* Col 4: Support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '1.05rem', marginBottom: '8px' }}>Support</h4>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Get in Touch</a>
            <a href="#faq" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>FAQ's</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Community</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>Knowledgebase</a>
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="container" style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px',
          paddingTop: '24px', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem'
        }}>
          <div>© {new Date().getFullYear()} Learnify. Designed with AI.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
             <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Terms</a>
             <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Privacy</a>
             <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
