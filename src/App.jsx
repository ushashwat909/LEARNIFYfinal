import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import HowItWorks from './components/HowItWorks';
import CareerPathsSection from './components/CareerPathsSection';
import Features from './components/Features';
import TestimonialsSection from './components/TestimonialsSection';
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
      fetch('http://localhost:8000/api/auth/me', {
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
    fetch('http://localhost:8000/api/problems')
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
        await fetch('http://localhost:8000/api/auth/onboard', {
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
          <TestimonialsSection />
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
              const res = await fetch('http://localhost:8000/api/problems');
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

      {/* Theme-aware Footer */}
      <footer style={{ 
        background: isDark ? '#010409' : '#f6f8fa', 
        color: isDark ? '#8b949e' : '#57606a', 
        padding: '40px 24px', 
        textAlign: 'center', 
        borderTop: `1px solid ${isDark ? '#30363d' : '#d0d7de'}` 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            <span style={{ fontWeight: 700, color: isDark ? '#c9d1d9' : '#24292f' }}>Learnify</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Learnify. Personalized learning, powered by AI.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['How it Works', 'Career Paths', 'Teachers'].map((link) => (
              <span key={link} style={{ fontSize: '0.85rem', cursor: 'default' }}>{link}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
