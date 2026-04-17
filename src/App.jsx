import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ProgramsPage from './pages/ProgramsPage';
import FeaturesPage from './pages/FeaturesPage';
import FaqPage from './pages/FaqPage';
import LoginPageRoute from './pages/LoginPageRoute';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import PracticePage from './pages/PracticePage';
import SolvePage from './pages/SolvePage';
import GapAnalyzerPage from './pages/GapAnalyzerPage';
import SyllabusAiPage from './pages/SyllabusAiPage';
import CurriculumPage from './pages/CurriculumPage';
import BrainGpsPage from './pages/BrainGpsPage';
import StatsPage from './pages/StatsPage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="login" element={<LoginPageRoute />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="solve/:problemId" element={<SolvePage />} />
        <Route path="gap-analyzer" element={<GapAnalyzerPage />} />
        <Route path="syllabus-ai" element={<SyllabusAiPage />} />
        <Route path="curriculum" element={<CurriculumPage />} />
        <Route path="brain-gps" element={<BrainGpsPage />} />
        <Route path="stats" element={<StatsPage />} />

        <Route path="about" element={<PlaceholderPage slug="about" />} />
        <Route path="careers" element={<PlaceholderPage slug="careers" />} />
        <Route path="events" element={<PlaceholderPage slug="events" />} />
        <Route path="webinars" element={<PlaceholderPage slug="webinars" />} />
        <Route path="trainers" element={<PlaceholderPage slug="trainers" />} />
        <Route path="membership" element={<PlaceholderPage slug="membership" />} />
        <Route path="certification" element={<PlaceholderPage slug="certification" />} />
        <Route path="contact" element={<PlaceholderPage slug="contact" />} />
        <Route path="community" element={<PlaceholderPage slug="community" />} />
        <Route path="knowledgebase" element={<PlaceholderPage slug="knowledgebase" />} />
        <Route path="terms" element={<PlaceholderPage slug="terms" />} />
        <Route path="privacy" element={<PlaceholderPage slug="privacy" />} />
        <Route path="cookies" element={<PlaceholderPage slug="cookies" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
