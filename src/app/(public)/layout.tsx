import { Header } from '@/shared/components/layout/Header';
import { FloatingDock } from '@/shared/components/layout/FloatingDock';
import { Footer } from '@/shared/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-32 md:pb-12">{children}</main>
      <FloatingDock />
      <Footer />
    </>
  );
}
