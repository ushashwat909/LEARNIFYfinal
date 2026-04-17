import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PracticeHub from '../components/PracticeHub';

export default function PracticePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  return (
    <PracticeHub
      key={q}
      initialSearch={q}
      onSelectProblem={(id) => {
        navigate(`/solve/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
}
