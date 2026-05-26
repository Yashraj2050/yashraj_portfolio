'use client';

import { useCinematicStore } from '@/lib/cinematic/store';
import { CinematicPageWrapper } from './CinematicPageWrapper';
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

  return (
    <CinematicPageWrapper>
      <PageComponent />
    </CinematicPageWrapper>
  );
}
