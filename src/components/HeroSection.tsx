import React, { useState } from 'react';
import { ArrowDownRight, Calendar, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreSet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreSet }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMouseOffset({
      x: (clientX - centerX) / 45,
      y: (clientY - centerY) / 45
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-ivory)'
      }}
    >
      {/* Background Architectural Accent Lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '1px',
        height: '100%',
        backgroundColor: 'rgba(81, 27, 43, 0.04)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: '25%',
        width: '1px',
        height: '100%',
        backgroundColor: 'rgba(81, 27, 43, 0.04)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Editorial Headline & Meta (Cols 1-7) */}
          <div style={{ gridColumn: 'span 12' }} className="hero-text-col">
            {/* Editorial Collection Tag & Location */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              <span className="section-label" style={{ marginBottom: 0 }}>
                Haute Atelier • N° 04
              </span>
              <span style={{
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-rosewood)',
                borderLeft: '1px solid rgba(142, 75, 91, 0.3)',
                paddingLeft: '1.25rem'
              }}>
                Rue Saint-Honoré • Fictional Demo Atelier
              </span>
            </div>

            {/* Oversized Staggered Headline */}
            <h1 className="display-1" style={{
              color: 'var(--color-espresso)',
              marginBottom: '1.75rem',
              fontWeight: 300,
              letterSpacing: '-0.025em'
            }}>
              Your Nails.<br />
              <span style={{
                fontStyle: 'italic',
                color: 'var(--color-burgundy)',
                fontWeight: 400
              }}>
                Your Art.
              </span><br />
              Your Signature.
            </h1>

            {/* Supporting Copy */}
            <p style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
              color: 'rgba(41, 28, 32, 0.8)',
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: '520px',
              marginBottom: '2.5rem'
            }}>
              Exceptional nail artistry, thoughtfully designed around you. An intimate beauty sanctuary where anatomical precision meets contemporary European design.
            </p>

            {/* CTAs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <button
                className="btn btn-primary"
                onClick={onExploreSet}
                id="hero-explore-cta"
              >
                <Compass size={16} />
                Discover Your Next Set
              </button>

              <button
                className="btn btn-secondary"
                onClick={onOpenBooking}
                id="hero-book-cta"
              >
                <Calendar size={16} />
                Book Your Appointment
              </button>
            </div>

            {/* Micro Editorial Details Footer */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gap: '2.5rem',
              borderTop: '1px solid rgba(81, 27, 43, 0.12)',
              paddingTop: '1.75rem',
              maxWidth: '520px'
            }}>
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)'
                }}>
                  100%
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-rosewood)', letterSpacing: '0.04em' }}>
                  Anatomical Care
                </span>
              </div>
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)'
                }}>
                  21+ Days
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-rosewood)', letterSpacing: '0.04em' }}>
                  Chip-Free Luster
                </span>
              </div>
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)'
                }}>
                  Bespoke
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-rosewood)', letterSpacing: '0.04em' }}>
                  Hand-Blended Gels
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Imagery (Cols 8-12) */}
          <div style={{ gridColumn: 'span 12' }} className="hero-image-col">
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              padding: '0.85rem',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-luxury)',
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {/* Image Frame */}
              <div style={{
                position: 'relative',
                borderRadius: 'calc(var(--radius-lg) - 6px)',
                overflow: 'hidden',
                aspectRatio: '16/11',
                maxHeight: '580px'
              }}>
                <img
                  src="/images/hero/hero-main.jpg"
                  alt="Maison Nails Signature Burgundy & Glazed Rose Almond Manicure"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    display: 'block',
                    transform: 'scale(1.02)'
                  }}
                />

                {/* Subtle vignette gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(41,28,32,0.45) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Floating Artwork Badge in Bottom Corner */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(250, 246, 240, 0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}>
                  <div>
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--color-espresso)'
                    }}>
                      Haute Burgundy &amp; Rose Chrome
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-rosewood)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}>
                      Editorial Campaign Look No. 01
                    </span>
                  </div>

                  <a
                    href="#gallery"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-burgundy)',
                      color: 'var(--color-ivory)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                    title="View in Gallery"
                  >
                    <ArrowDownRight size={18} />
                  </a>
                </div>
              </div>

              {/* Decorative Gold Leaf Badge Corner Accent */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                background: 'var(--color-gold-shimmer)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(197, 164, 109, 0.35)',
                color: 'var(--color-espresso-deep)',
                textAlign: 'center',
                padding: '6px'
              }}>
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  lineHeight: 1.15
                }}>
                  Atelier Choice
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          marginTop: '4rem',
          color: 'var(--color-rosewood)',
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase'
        }}>
          <span>Scroll to Discover the Atelier</span>
          <div style={{
            width: '24px',
            height: '38px',
            borderRadius: '12px',
            border: '1.5px solid var(--color-rosewood)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px'
          }}>
            <div style={{
              width: '3px',
              height: '8px',
              backgroundColor: 'var(--color-burgundy)',
              borderRadius: '2px',
              animation: 'scrollBob 1.6s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.2; }
        }
        @media (min-width: 992px) {
          .hero-text-col {
            grid-column: span 6 !important;
          }
          .hero-image-col {
            grid-column: span 6 !important;
          }
        }
        @media (min-width: 1200px) {
          .hero-text-col {
            grid-column: span 7 !important;
          }
          .hero-image-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
