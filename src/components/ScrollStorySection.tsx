import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryScene {
  id: number;
  label: string;
  headline: string;
  subheadline: string;
  paragraph: string;
  theme: 'light' | 'dark';
  bgColor: string;
  textColor: string;
  badge: string;
  image: string;
  secondaryImage?: string;
  pillar: string;
}

const SCENES: StoryScene[] = [
  {
    id: 1,
    label: 'Scene 01',
    headline: 'More Than A Manicure.',
    subheadline: 'The Atelier Philosophy',
    paragraph: 'In a world of hurried salon visits and generic acrylics, Maison Nails was born to revive the sacred ritual of nail care. We treat every finger as a canvas of personal distinction.',
    theme: 'light',
    bgColor: '#FAF6F0',
    textColor: '#291C20',
    badge: 'Artisanal Heritage',
    image: '/images/nail-art/milky-nude.jpg',
    pillar: 'Anatomical Precision'
  },
  {
    id: 2,
    label: 'Scene 02',
    headline: 'Architectural Sculpting.',
    subheadline: 'Form Follows Elegance',
    paragraph: 'We eschew harsh plastic glue-on tips. Instead, our artists hand-sculpt European builder gel tailored to the exact curvature of your natural nail bed, guaranteeing effortless balance.',
    theme: 'light',
    bgColor: '#F5EFEB',
    textColor: '#291C20',
    badge: 'No Glues • No Harm',
    image: '/images/services/gel-extensions.jpg',
    pillar: 'Zero-Damage Form Sculpting'
  },
  {
    id: 3,
    label: 'Scene 03',
    headline: 'The Dramatic Shift.',
    subheadline: 'Depth, Luster & Contrast',
    paragraph: 'As day fades into evening, your manicure transforms. Our rich, multi-layered burgundy and glazed rose lacquers reflect candlelit dinners and modern gallery lights with captivating depth.',
    theme: 'dark',
    bgColor: '#511B2B',
    textColor: '#FAF6F0',
    badge: 'Haute Pigments',
    image: '/images/nail-art/cherry-red.jpg',
    secondaryImage: '/images/story/editorial-beauty.jpg',
    pillar: 'Custom Hand-Blended Tones'
  },
  {
    id: 4,
    label: 'Scene 04',
    headline: 'Beauty Lives In The Details.',
    subheadline: 'Micron Precision',
    paragraph: 'From hand-ground diamond cuticle smoothing to micro-applied 24k gold leaf and genuine freshwater pearls, it is the invisible millimeter of craftsmanship that defines true luxury.',
    theme: 'dark',
    bgColor: '#291C20',
    textColor: '#FAF6F0',
    badge: 'Couture Craftsmanship',
    image: '/images/nail-art/3d-floral.jpg',
    secondaryImage: '/images/services/bespoke-art.jpg',
    pillar: '21+ Days Chip-Free Radiance'
  }
];

export const ScrollStorySection: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const activeScene = SCENES[activeSceneIndex];

  // Screen size listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Scroll-Driven Scrollytelling
  useEffect(() => {
    if (isMobile) return; // Do not hijack scroll on mobile

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const scrolledDist = -rect.top;
      const progress = Math.min(Math.max(scrolledDist / totalDist, 0), 0.999);

      const sceneIndex = Math.floor(progress * SCENES.length);
      setActiveSceneIndex(sceneIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeSceneIndex < SCENES.length - 1) {
        // Swipe left -> Next
        setActiveSceneIndex(prev => prev + 1);
      } else if (diff < 0 && activeSceneIndex > 0) {
        // Swipe right -> Prev
        setActiveSceneIndex(prev => prev - 1);
      }
    }
    touchStartX.current = null;
  };

  const goToPrev = () => {
    setActiveSceneIndex(prev => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setActiveSceneIndex(prev => Math.min(prev + 1, SCENES.length - 1));
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      className="story-section-root"
      style={{
        position: 'relative',
        backgroundColor: activeScene.bgColor,
        transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky Cinematic Stage Container (Sticky on desktop, Natural flow on mobile) */}
      <div className="story-sticky-stage">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top Progress Track */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              borderBottom: activeScene.theme === 'dark'
                ? '1px solid rgba(250, 246, 240, 0.15)'
                : '1px solid rgba(81, 27, 43, 0.12)',
              paddingBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
            className="story-progress-bar"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span className={`section-label ${activeScene.theme === 'dark' ? 'light' : ''}`} style={{ marginBottom: 0 }}>
                Cinematic Journey
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: activeScene.theme === 'dark' ? 'var(--color-champagne-light)' : 'var(--color-rosewood)',
                letterSpacing: '0.1em'
              }}>
                {activeScene.label} of 04
              </span>
            </div>

            {/* Scene Selectors */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  aria-label={`Jump to ${scene.label}`}
                  style={{
                    height: '8px',
                    width: activeSceneIndex === idx ? '42px' : '20px',
                    borderRadius: '4px',
                    backgroundColor: activeSceneIndex === idx
                      ? (activeScene.theme === 'dark' ? 'var(--color-champagne)' : 'var(--color-burgundy)')
                      : (activeScene.theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(81,27,43,0.18)'),
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    padding: '8px 0',
                    backgroundClip: 'content-box'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Story Composition */}
          <div className="story-main-grid">
            {/* Story Image Pane (Order 1 on mobile, Order 2 / Cols 7-12 on desktop) */}
            <div className="story-img-pane">
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* Main Dynamic Image Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '520px',
                    aspectRatio: '4/3',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: activeScene.theme === 'dark'
                      ? '0 25px 60px rgba(0, 0, 0, 0.5)'
                      : 'var(--shadow-luxury)',
                    border: activeScene.theme === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.15)'
                      : '1px solid rgba(81, 27, 43, 0.1)',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="story-main-image-wrap"
                >
                  <img
                    key={activeScene.image}
                    src={activeScene.image}
                    alt={activeScene.headline}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      animation: 'fadeIn 0.6s ease-out forwards'
                    }}
                  />

                  {/* Corner Accent Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(26, 16, 20, 0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: 'var(--color-ivory)',
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    {activeScene.badge}
                  </div>
                </div>

                {/* Overlapping Secondary Depth Card (Desktop only) */}
                {activeScene.secondaryImage && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    right: '-15px',
                    width: '180px',
                    aspectRatio: '1/1',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
                    display: 'none'
                  }} className="story-depth-card">
                    <img
                      src={activeScene.secondaryImage}
                      alt="Atelier Craft Detail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Story Text Pane (Order 2 on mobile, Order 1 / Cols 1-6 on desktop) */}
            <div className="story-text-pane">
              <span style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: activeScene.theme === 'dark' ? 'var(--color-champagne-light)' : 'var(--color-rosewood)',
                marginBottom: '0.75rem',
                fontWeight: 600
              }}>
                {activeScene.subheadline}
              </span>

              <h2 className="display-2" style={{
                color: activeScene.textColor,
                marginBottom: '1.25rem',
                transition: 'color 0.5s ease'
              }}>
                {activeScene.headline}
              </h2>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                color: activeScene.theme === 'dark' ? 'rgba(250, 246, 240, 0.85)' : 'rgba(41, 28, 32, 0.8)',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
                maxWidth: '480px',
                transition: 'color 0.5s ease'
              }}>
                {activeScene.paragraph}
              </p>

              {/* Craftsmanship Pillar Highlight */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeScene.theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(81, 27, 43, 0.06)',
                border: activeScene.theme === 'dark'
                  ? '1px solid rgba(197, 164, 109, 0.3)'
                  : '1px solid rgba(81, 27, 43, 0.15)',
                color: activeScene.textColor
              }}>
                <Sparkles size={16} style={{ color: 'var(--color-champagne)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                  {activeScene.pillar}
                </span>
              </div>

              {/* Mobile Interactive Navigation Row */}
              <div className={`story-mobile-nav-row ${activeScene.theme === 'light' ? 'light-theme' : ''}`}>
                <button
                  onClick={goToPrev}
                  disabled={activeSceneIndex === 0}
                  aria-label="Previous story chapter"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    border: activeScene.theme === 'dark' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(81,27,43,0.2)',
                    backgroundColor: 'transparent',
                    color: activeScene.textColor,
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    opacity: activeSceneIndex === 0 ? 0.35 : 1,
                    cursor: activeSceneIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <span style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: activeScene.theme === 'dark' ? 'var(--color-champagne-light)' : 'var(--color-rosewood)'
                }}>
                  {activeSceneIndex + 1} of {SCENES.length}
                </span>

                <button
                  onClick={goToNext}
                  disabled={activeSceneIndex === SCENES.length - 1}
                  aria-label="Next story chapter"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: activeScene.theme === 'dark' ? 'var(--color-champagne)' : 'var(--color-burgundy)',
                    color: activeScene.theme === 'dark' ? 'var(--color-espresso-deep)' : 'var(--color-ivory)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    opacity: activeSceneIndex === SCENES.length - 1 ? 0.35 : 1,
                    cursor: activeSceneIndex === SCENES.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span>Next Chapter</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .story-section-root {
            min-height: auto !important;
            padding: clamp(3.5rem, 8vw, 5.5rem) 0 !important;
          }
          .story-sticky-stage {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          .story-main-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.75rem !important;
          }
          .story-img-pane {
            order: 1 !important;
            width: 100% !important;
          }
          .story-text-pane {
            order: 2 !important;
            width: 100% !important;
          }
          .story-main-image-wrap {
            aspect-ratio: 16/10 !important;
            max-height: 280px !important;
            width: 100% !important;
          }
          .story-text-pane h2 {
            font-size: clamp(1.75rem, 5.5vw, 2.35rem) !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.15 !important;
          }
          .story-text-pane p {
            font-size: 0.95rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.65 !important;
          }
          .story-mobile-nav-row {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            margin-top: 1.5rem;
            padding-top: 1.25rem;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
          }
          .story-mobile-nav-row.light-theme {
            border-top: 1px solid rgba(81, 27, 43, 0.12);
          }
        }

        @media (min-width: 992px) {
          .story-section-root {
            min-height: 220vh !important;
          }
          .story-sticky-stage {
            position: sticky !important;
            top: 0 !important;
            height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            padding: 3rem 0 !important;
            overflow: hidden !important;
          }
          .story-main-grid {
            display: grid !important;
            grid-template-columns: repeat(12, 1fr) !important;
            gap: 3rem !important;
            align-items: center !important;
          }
          .story-text-pane {
            grid-column: span 6 !important;
            order: 1 !important;
          }
          .story-img-pane {
            grid-column: span 6 !important;
            order: 2 !important;
          }
          .story-depth-card {
            display: block !important;
          }
          .story-mobile-nav-row {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
