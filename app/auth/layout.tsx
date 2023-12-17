import TransitionProvider from '@/context/transition-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TransitionProvider initial={{ opacity: 0, scale: 0.7 }}>
      {children}
    </TransitionProvider>
  );
}
