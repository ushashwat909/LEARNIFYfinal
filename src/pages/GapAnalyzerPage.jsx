import React from 'react';
import { useOutletContext } from 'react-router-dom';
import GapAnalyzer from '../components/GapAnalyzer';

export default function GapAnalyzerPage() {
  const { theme } = useOutletContext();
  return <GapAnalyzer theme={theme} />;
}
