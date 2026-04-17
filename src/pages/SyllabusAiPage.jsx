import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SyllabusContextualizer from '../components/SyllabusContextualizer';

export default function SyllabusAiPage() {
  const { theme } = useOutletContext();
  return <SyllabusContextualizer theme={theme} />;
}
