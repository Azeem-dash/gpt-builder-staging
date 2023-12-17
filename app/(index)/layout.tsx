import TransitionProvider from '@/context/transition-provider';

import { Footer } from '@/components/footer';
import { GoToTop } from '@/components/goto-top';
import { Navbar } from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <TransitionProvider as={'main'} className="flex-1" initial="hidden">
        {children}
      </TransitionProvider>
      <Footer />
      <GoToTop />
    </>
  );
}
