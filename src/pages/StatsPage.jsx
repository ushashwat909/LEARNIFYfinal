import React from 'react';
import { useOutletContext } from 'react-router-dom';
import GamificationDashboard from '../components/GamificationDashboard';

export default function StatsPage() {
  const { user } = useOutletContext();
  return <GamificationDashboard userId={user?.id || 101} />;
}
