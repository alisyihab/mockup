'use client';

// Type Imports
import type { ChildrenType } from '@core/types';

// Component Imports
import Footer from '@components/layout/front-pages/Footer';
import NavCustom from '@/views/front-pages/landing-page/NavCustom';

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses';
import { usePathname } from 'next/navigation';

const FrontLayout = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname(); // Mendapatkan path saat ini

  return (
    <div className={frontLayoutClasses.root}>
      <NavCustom currentPath={currentPath} />
      {children}
      <Footer />
    </div>
  );
};

export default FrontLayout;
