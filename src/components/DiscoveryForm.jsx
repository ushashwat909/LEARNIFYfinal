import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DiscoveryForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    career: '',
    experience: ''
  });

  const careers = ['Software Engineer', 'Data Scientist', 'Cybersecurity', 'AI Researcher'];
  const experiences = ['Beginner', 'Intermediate', 'Advanced'];

  const handleNext = () => {
    if (step === 2) {
      onComplete(formData);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass"
        style={{ padding: '40px', borderRadius: '24px', maxWidth: '600px', width: '100%', border: '1px solid var(--color-border)', color: '#FFF' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-primary)' }}>System Calibration</h2>
          <span style={{ fontSize: '1.2rem', color: 'var(--color-secondary)' }}>0{step} / 02</span>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#E2E8F0' }}>Select your target trajectory:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {careers.map((c) => (
                <button
                  key={c}
                  onClick={() => setFormData({ ...formData, career: c })}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: formData.career === c ? '2px solid var(--color-primary)' : '1px solid #1e293b',
                    background: formData.career === c ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                    color: '#FFF',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#E2E8F0' }}>Current atmospheric experience:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {experiences.map((exp) => (
                <button
                  key={exp}
                  onClick={() => setFormData({ ...formData, experience: exp })}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: formData.experience === exp ? '2px solid var(--color-primary)' : '1px solid #1e293b',
                    background: formData.experience === exp ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                    color: '#FFF',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  {exp}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNext}
            disabled={step === 1 ? !formData.career : !formData.experience}
            style={{
              padding: '15px 40px',
              borderRadius: '12px',
              background: (step === 1 ? !formData.career : !formData.experience) ? '#334155' : 'var(--color-primary)',
              color: '#0B1120',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: (step === 1 ? !formData.career : !formData.experience) ? 'not-allowed' : 'pointer'
            }}
          >
            {step === 2 ? 'Initialize Dashboard' : 'Proceed'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DiscoveryForm;
