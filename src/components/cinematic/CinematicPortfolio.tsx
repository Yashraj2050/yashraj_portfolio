'use client';

import { useState, useCallback } from 'react';
import { useCinematicStore } from '@/lib/cinematic/store';
import { CinematicPageWrapper } from './CinematicPageWrapper';
import { CinematicLoader } from './CinematicLoader';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResearchPage } from './pages/ResearchPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ContactPage } from './pages/ContactPage';

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  research: ResearchPage,
  experience: ExperiencePage,
  certifications: CertificationsPage,
  contact: ContactPage,
};

export function CinematicPortfolio() {
  const currentPage = useCinematicStore((state) => state.currentPage);
  const PageComponent = pageComponents[currentPage];
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading screen — sits above everything, unmounts after sequence */}
      {isLoading && <CinematicLoader onComplete={handleLoadComplete} />}

      {/* Portfolio — renders underneath during load, transitions in after */}
      <CinematicPageWrapper>
        <PageComponent />
      </CinematicPageWrapper>
    </>
  );
}
