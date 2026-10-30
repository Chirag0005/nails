import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeScene = SCENES[activeSceneIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through this section (0 to 1)
      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const scrolledDist = -rect.top;
      const progress = Math.min(Math.max(scrolledDist / totalDist, 0), 0.999);

      const sceneIndex = Math.floor(progress * SCENES.length);
      setActiveSceneIndex(sceneIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '220vh',
        backgroundColor: activeScene.bgColor,
        transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Sticky Cinematic Stage Container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 0',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top Progress Track */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            borderBottom: activeScene.theme === 'dark'
              ? '1px solid rgba(250, 246, 240, 0.15)'
              : '1px solid rgba(81, 27, 43, 0.12)',
            paddingBottom: '1rem'
          }}>
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  aria-label={`Jump to ${scene.label}`}
                  style={{
                    height: '6px',
                    width: activeSceneIndex === idx ? '45px' : '18px',
                    borderRadius: '3px',
                    backgroundColor: activeSceneIndex === idx
                      ? (activeScene.theme === 'dark' ? 'var(--color-champagne)' : 'var(--color-burgundy)')
                      : (activeScene.theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(81,27,43,0.15)'),
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Story Composition */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Story Text Block (Cols 1-6) */}
            <div style={{ gridColumn: 'span 12' }} className="story-text-pane">
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
                marginBottom: '1.5rem',
                transition: 'color 0.5s ease'
              }}>
                {activeScene.headline}
              </h2>

              <p style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                color: activeScene.theme === 'dark' ? 'rgba(250, 246, 240, 0.85)' : 'rgba(41, 28, 32, 0.8)',
                lineHeight: 1.7,
                marginBottom: '2rem',
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
            </div>

            {/* Right Visual Image Showcase (Cols 7-12) */}
            <div style={{ gridColumn: 'span 12' }} className="story-img-pane">
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* Main Dynamic Image Container */}
                <div style={{
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
                }}>
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
                    backgroundColor: 'rgba(26, 16, 20, 0.82)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--color-ivory)',
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    {activeScene.badge}
                  </div>
                </div>

                {/* Overlapping Secondary Depth Card (if present) */}
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
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .story-text-pane {
            grid-column: span 6 !important;
          }
          .story-img-pane {
            grid-column: span 6 !important;
          }
          .story-depth-card {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};
