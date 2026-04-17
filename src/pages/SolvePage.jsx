import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ProblemSpace from '../components/ProblemSpace';

export default function SolvePage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { user, theme, allProblems } = useOutletContext();

  const navigateToNextProblem = () => {
    if (!allProblems.length) return;
    const currentIndex = allProblems.findIndex((p) => p.id === problemId);
    const nextIndex = (currentIndex + 1) % allProblems.length;
    navigate(`/solve/${allProblems[nextIndex].id}`);
  };

  const navigateToPrevProblem = () => {
    if (!allProblems.length) return;
    const currentIndex = allProblems.findIndex((p) => p.id === problemId);
    const prevIndex = (currentIndex - 1 + allProblems.length) % allProblems.length;
    navigate(`/solve/${allProblems[prevIndex].id}`);
  };

  return (
    <div style={{ paddingTop: '0px' }}>
      <ProblemSpace
        theme={theme}
        problemId={problemId}
        userId={user?.id || 101}
        onBack={() => navigate('/practice')}
        onNext={navigateToNextProblem}
        onPrev={navigateToPrevProblem}
      />
    </div>
  );
}
