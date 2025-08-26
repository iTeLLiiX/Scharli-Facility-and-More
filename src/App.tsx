import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioGallery from './components/PortfolioGallery';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CookieConsent from './components/CookieConsent';
import AdminPanel from './components/AdminPanel';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.set('.fade-in', { opacity: 0, y: 50 });
    
    ScrollTrigger.batch('.fade-in', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        });
      },
      start: 'top 90%'
    });

    // Smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleAdminLogin = () => {
    setIsAdminPanelOpen(true);
  };

  const handleAdminClose = () => {
    setIsAdminPanelOpen(false);
  };



  return (
    <div className="App">
      {/* Main Website */}
      <Header onAdminLogin={handleAdminLogin} />
      
      <main>
        <Hero />
        <Services />
        <PortfolioGallery />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* Interactive Components */}
      <ChatWidget />
      
      {showCookieConsent && (
        <CookieConsent />
      )}
      
      {/* Admin Panel */}
      {isAdminPanelOpen && (
        <AdminPanel 
          isOpen={isAdminPanelOpen} 
          onClose={handleAdminClose} 
        />
      )}
    </div>
  );
}

export default App;