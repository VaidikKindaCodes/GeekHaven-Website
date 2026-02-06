import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import NavBar from './components/Navbar';
import Philosophy from './components/Philosophy';
import Team from './components/Team'; // Import Team

export default function DesignPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-50">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Philosophy />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
