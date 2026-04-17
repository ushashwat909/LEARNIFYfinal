import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CurriculumView from '../components/CurriculumView';

export default function CurriculumPage() {
  const { theme } = useOutletContext();
  return <CurriculumView theme={theme} />;
}
