import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections';

export default function BifrostResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
