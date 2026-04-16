import React, { useState } from 'react';
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

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'discovery', 'dashboard', 'practice', 'coding', 'stats'
  const [userData, setUserData] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleStartOnboarding = () => {
    setView('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOnboarding = (data) => {
    setUserData(data);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProblem = (id) => {
    setSelectedProblem(id);
    setView('coding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar 
        currentView={view}
        onNavigate={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onGoHome={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
      />

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
        <PracticeHub onSelectProblem={handleSelectProblem} />
      )}

      {view === 'coding' && (
        <ProblemSpace problemId={selectedProblem} onBack={() => setView('practice')} />
      )}

      {view === 'stats' && (
        <GamificationDashboard />
      )}

      <Chatbot />

      {/* Footer */}
      <footer style={{ background: '#070d1a', color: '#E2E8F0', padding: '40px 24px', textAlign: 'center', borderTop: '1px solid rgba(0,240,255,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            <span style={{ fontWeight: 700, color: '#FFF' }}>EduGrav</span>
          </div>
          <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} EduGrav. Defying limits in education.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['How it Works', 'Career Paths', 'Teacher Dashboard'].map((link) => (
              <span key={link} style={{ color: '#64748b', fontSize: '0.9rem', cursor: 'default' }}>{link}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
