import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import Showcase from '@/components/Showcase/Showcase';
import Solutions from '@/components/Solutions/Solutions';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Solutions />
      <Contact />
      <Footer />
    </>
  );
}
