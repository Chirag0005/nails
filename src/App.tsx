import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ScrollStorySection } from './components/ScrollStorySection';
import { NailArtGallery } from './components/NailArtGallery';
import { NailDesignExplorer } from './components/NailDesignExplorer';
import { ThreeDExperience } from './components/ThreeDExperience';
import { ServicesSection } from './components/ServicesSection';
import { StudioSection } from './components/StudioSection';
import { SocialProofSection } from './components/SocialProofSection';
import { Footer } from './components/Footer';
import { BookingExperience } from './components/BookingExperience';

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);
  const [selectedStyleMoodForBooking, setSelectedStyleMoodForBooking] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string, styleMood?: string) => {
    setSelectedServiceForBooking(serviceId);
    setSelectedStyleMoodForBooking(styleMood);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedServiceForBooking(undefined);
    setSelectedStyleMoodForBooking(undefined);
  };

  const handleScrollToExplorer = () => {
    const el = document.getElementById('explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="maison-nails-app" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Global Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Page Layout */}
      <main>
        {/* 01. Spectacular Hero Section */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExploreSet={handleScrollToExplorer}
        />

        {/* 02. Cinematic Scroll Storytelling */}
        <ScrollStorySection />

        {/* 03. The Nail Art Collection & Lightbox */}
        <NailArtGallery onOpenBooking={handleOpenBooking} />

        {/* 04. Interactive Nail Design Explorer */}
        <NailDesignExplorer onOpenBooking={handleOpenBooking} />

        {/* 05. Premium 3D Nail Experience */}
        <ThreeDExperience onOpenBooking={handleOpenBooking} />

        {/* 06. The Services Rituals Menu */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* 07. The Studio Atmosphere */}
        <StudioSection />

        {/* 08. Social Proof & Community */}
        <SocialProofSection />
      </main>

      {/* Oversized Editorial Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Multi-Step Appointment Booking Modal Flow */}
      <BookingExperience
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceForBooking}
        initialStyleMood={selectedStyleMoodForBooking}
      />
    </div>
  );
}

export default App;
