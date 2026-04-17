import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

import HowItWorks from '../components/HowItWorks';
import CareerPathsSection from '../components/CareerPathsSection';
import Features from '../components/Features';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

export default function LandingPage() {
  const { onStartLearning } = useOutletContext();
  return (
    <>
      <HeroSection onStart={onStartLearning} />

      <HowItWorks />
      <CareerPathsSection />
      <Features />
      <TestimonialsSection />
      <CTASection onStart={onStartLearning} />
    </>
  );
}
