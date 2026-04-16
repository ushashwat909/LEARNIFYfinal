import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import InteractiveDemo from './components/InteractiveDemo';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InteractiveDemo />
      <Features />
      <Chatbot />
      
      {/* Footer */}
      <footer style={{ background: 'var(--color-primary)', color: 'var(--color-text-light)', padding: '40px 0', textAlign: 'center', marginTop: '60px' }}>
        <div className="container">
          <p style={{ color: 'var(--color-text-light)', opacity: 0.8, fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} EduGrav. Defying limits in education.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
