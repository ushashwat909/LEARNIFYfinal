import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DiscoveryForm from '../components/DiscoveryForm';

export default function OnboardingPage() {
  const { handleCompleteOnboarding, user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return <DiscoveryForm onComplete={handleCompleteOnboarding} />;
}
