import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AdaptiveLearning from '../components/AdaptiveLearning';

export default function DashboardPage() {
  const { userData } = useOutletContext();
  const navigate = useNavigate();

  return (
    <AdaptiveLearning
      userData={userData}
      onChallenge={(id) => {
        navigate(`/solve/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
}
