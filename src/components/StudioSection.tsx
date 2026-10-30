import React, { useState } from 'react';
import { Coffee, Wind, Shield } from 'lucide-react';

export const StudioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interior' | 'alcove' | 'stillLife'>('interior');

  const studioImages = {
    interior: {
      src: '/images/studio/atelier-interior.jpg',
      title: 'The Parisian Travertine Atelier',
      caption: 'Curved limestone walls, bouclé armchairs, and floor-to-ceiling sheer linen overlooking quiet Parisian streetscapes.'
    },
    alcove: {
      src: '/images/studio/polish-alcove.jpg',
      title: 'The Custom Pigment Library',
      caption: 'Over 120 hand-formulated vegan and non-toxic Japanese gel lacquers housed in backlit Italian marble alcoves.'
    },
    stillLife: {
      src: '/images/studio/polish-still-life.jpg',
      title: 'Tactile Sensory Elements',
      caption: 'Organic Bulgarian rose mists, wild lavender hand-poured balms, and natural stone accessories.'
    }
  };

  const currentVisual = studioImages[activeTab];

  return (
    <section id="studio" style={{
      backgroundColor: 'var(--color-ivory)',
      padding: 'var(--section-padding) 0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <span className="section-label">Atmosphere</span>
          <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
            Your Little <span style={{ fontStyle: 'italic', color: 'var(--color-burgundy)' }}>Escape.</span>
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(41, 28, 32, 0.75)',
            maxWidth: '580px',
            lineHeight: 1.65,
            fontWeight: 300
          }}>
            Stepping through our heavy brass doors means leaving the noise of the city behind. An oasis of tactile textures, soft jazz, and deliberate slowness.
          </p>

          {/* Perspective Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }} className="studio-tab-buttons">
            <button
              onClick={() => setActiveTab('interior')}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeTab === 'interior' ? 'var(--color-burgundy)' : 'transparent',
                color: activeTab === 'interior' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                border: activeTab === 'interior' ? '1px solid var(--color-burgundy)' : '1px solid rgba(81, 27, 43, 0.15)'
              }}
            >
              The Atelier Interior
            </button>
            <button
              onClick={() => setActiveTab('alcove')}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeTab === 'alcove' ? 'var(--color-burgundy)' : 'transparent',
                color: activeTab === 'alcove' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                border: activeTab === 'alcove' ? '1px solid var(--color-burgundy)' : '1px solid rgba(81, 27, 43, 0.15)'
              }}
            >
              The Pigment Library
            </button>
            <button
              onClick={() => setActiveTab('stillLife')}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeTab === 'stillLife' ? 'var(--color-burgundy)' : 'transparent',
                color: activeTab === 'stillLife' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                border: activeTab === 'stillLife' ? '1px solid var(--color-burgundy)' : '1px solid rgba(81, 27, 43, 0.15)'
              }}
            >
              Sensory Rituals
            </button>
          </div>
        </div>

        {/* Big Visual Showcase */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '16/9',
            maxHeight: '620px',
            boxShadow: 'var(--shadow-luxury)',
            marginBottom: '3.5rem',
            backgroundColor: '#1A0D12'
          }}
          className="studio-showcase-wrap"
        >
          <img
            key={currentVisual.src}
            src={currentVisual.src}
            alt={currentVisual.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: 'fadeIn 0.5s ease-out'
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              backgroundColor: 'rgba(41, 28, 32, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem 2rem',
              color: 'var(--color-ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            className="studio-showcase-caption"
          >
            <div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: 'var(--color-ivory)',
                marginBottom: '4px'
              }}>
                {currentVisual.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(250, 246, 240, 0.8)',
                maxWidth: '620px'
              }}>
                {currentVisual.caption}
              </p>
            </div>

            <div style={{
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne-light)',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-champagne)'
            }}>
              Private Atelier Concept (Demo)
            </div>
          </div>
        </div>

        {/* 4 Atelier Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-subtle)',
            border: '1px solid rgba(81, 27, 43, 0.08)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 164, 109, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne-dark)',
              marginBottom: '1.25rem'
            }}>
              <Coffee size={20} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Complimentary Pairings
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(41, 28, 32, 0.75)', lineHeight: 1.6 }}>
              Enjoy organic French vintage champagne, artisanal ceremonial matcha, or cold-pressed botanical infusions served in handcrafted crystal during your appointment.
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-subtle)',
            border: '1px solid rgba(81, 27, 43, 0.08)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 164, 109, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne-dark)',
              marginBottom: '1.25rem'
            }}>
              <Wind size={20} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Hospital-Grade Air Purity
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(41, 28, 32, 0.75)', lineHeight: 1.6 }}>
              Individual downdraft carbon-HEPA exhaust tables ensure zero chemical odors, maintaining crisp, aromatic air scented subtly with wild fig and cedarwood.
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-subtle)',
            border: '1px solid rgba(81, 27, 43, 0.08)'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 164, 109, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne-dark)',
              marginBottom: '1.25rem'
            }}>
              <Shield size={20} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Medical Autoclave Sterilization
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(41, 28, 32, 0.75)', lineHeight: 1.6 }}>
              All surgical-grade stainless steel implements undergo multi-stage ultrasonic cleansing and autoclave steam sterilization, sealed in sterile single-use pouches.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .studio-showcase-caption {
            bottom: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            padding: 1rem 1.25rem !important;
          }
          .studio-showcase-caption h3 {
            font-size: 1.3rem !important;
          }
          .studio-showcase-wrap {
            aspect-ratio: 4/3 !important;
            margin-bottom: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .studio-tab-buttons button {
            padding: 0.55rem 1rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
