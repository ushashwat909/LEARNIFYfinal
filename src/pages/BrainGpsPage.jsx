import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import KnowledgeGraph from '../components/KnowledgeGraph';

export default function BrainGpsPage() {
  const { theme, user } = useOutletContext();
  const navigate = useNavigate();

  return (
    <KnowledgeGraph
      theme={theme}
      userId={user?.id || 101}
      onStartChallenge={async (category) => {
        try {
          const res = await fetch('/api/problems');
          const data = await res.json();
          const catProb = data.problems.find((p) => p.category?.toLowerCase() === category.toLowerCase());
          if (catProb) {
            navigate(`/solve/${catProb.id}`);
          } else {
            navigate(`/practice?q=${encodeURIComponent(category)}`);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
          navigate(`/practice?q=${encodeURIComponent(category)}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    />
  );
}
