import React, { useState } from 'react';
import { STYLE_EXPLORER_TAGS, GALLERY_ITEMS, SERVICES } from '../data/nailData';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

interface NailDesignExplorerProps {
  onOpenBooking: (serviceId?: string, styleTag?: string) => void;
}

export const NailDesignExplorer: React.FC<NailDesignExplorerProps> = ({ onOpenBooking }) => {
  const [selectedTag, setSelectedTag] = useState<string>('Minimal');

  const currentTagInfo = STYLE_EXPLORER_TAGS.find(t => t.id === selectedTag) || STYLE_EXPLORER_TAGS[0];

  // Find matching items from gallery that include this tag
  const matchingGalleryItems = GALLERY_ITEMS.filter(item =>
    item.styleTags.includes(selectedTag)
  );

  // Default to primary item or first match
  const activeHeroItem = matchingGalleryItems.find(item => item.id === currentTagInfo.primaryItemId) || matchingGalleryItems[0] || GALLERY_ITEMS[0];
  const suggestedService = SERVICES.find(s => s.id === activeHeroItem.suggestedServiceId) || SERVICES[0];

  return (
    <section id="explorer" style={{
      backgroundColor: 'var(--color-ivory-light)',
      padding: 'var(--section-padding) 0',
      position: 'relative',
      borderTop: '1px solid rgba(81, 27, 43, 0.08)',
      borderBottom: '1px solid rgba(81, 27, 43, 0.08)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <span className="section-label">Interactive Atelier</span>
          <h2 className="display-2" style={{ marginBottom: '1rem' }}>
            Your Next <span style={{ fontStyle: 'italic', color: 'var(--color-burgundy)' }}>Set.</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(41, 28, 32, 0.75)',
            maxWidth: '540px',
            lineHeight: 1.6
          }}>
            Explore our curated aesthetic moods. Select your personal style profile below to discover your perfect match and reserve it directly in our salon booking flow.
          </p>

          {/* Style Category Selector Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }} className="explorer-mood-pills">
            {STYLE_EXPLORER_TAGS.map((tag) => {
              const isSelected = selectedTag === tag.id;
              return (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  style={{
                    padding: '0.8rem 1.6rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: isSelected ? 'var(--color-burgundy)' : '#FFFFFF',
                    color: isSelected ? 'var(--color-ivory)' : 'var(--color-espresso)',
                    border: isSelected ? '1px solid var(--color-burgundy)' : '1px solid rgba(81, 27, 43, 0.15)',
                    boxShadow: isSelected ? '0 4px 15px rgba(81, 27, 43, 0.25)' : 'var(--shadow-subtle)'
                  }}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Presentation Panel */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid rgba(81, 27, 43, 0.1)'
        }}>
          <div style={{
            display: 'grid',
            alignItems: 'stretch'
          }} className="explorer-main-grid">
            {/* Left Image Showcase (Cols 1-7) */}
            <div style={{
              position: 'relative',
              minHeight: '440px',
              backgroundColor: '#1A0D12'
            }} className="explorer-img-col">
              <img
                key={activeHeroItem.image}
                src={activeHeroItem.image}
                alt={activeHeroItem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  animation: 'fadeIn 0.5s ease-out'
                }}
              />

              {/* Tag overlay */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'rgba(250, 246, 240, 0.95)',
                backdropFilter: 'blur(8px)',
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                <Sparkles size={14} style={{ color: 'var(--color-champagne)' }} />
                Mood Match: {selectedTag}
              </div>

              {/* Design Caption Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  backgroundColor: 'rgba(41, 28, 32, 0.85)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  color: 'var(--color-ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                className="explorer-caption-bar"
              >
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    color: 'var(--color-ivory)'
                  }}>
                    {activeHeroItem.title}
                  </h4>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-champagne-light)',
                    letterSpacing: '0.06em'
                  }}>
                    {activeHeroItem.finish} • {activeHeroItem.shape}
                  </span>
                </div>

                <div style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(197, 164, 109, 0.25)',
                  border: '1px solid var(--color-champagne)',
                  fontSize: '0.75rem',
                  color: 'var(--color-champagne-light)'
                }}>
                  {suggestedService.name}
                </div>
              </div>
            </div>

            {/* Right Information & Action Panel (Cols 8-12) */}
            <div style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-ivory-light)'
            }} className="explorer-text-col">
              <div>
                <span className="section-label" style={{ marginBottom: '0.5rem' }}>
                  Aesthetic Mood
                </span>

                <h3 className="display-3" style={{
                  color: 'var(--color-espresso)',
                  marginBottom: '1rem'
                }}>
                  {currentTagInfo.headline}
                </h3>

                <p style={{
                  fontSize: '1.05rem',
                  color: 'rgba(41, 28, 32, 0.8)',
                  lineHeight: 1.65,
                  marginBottom: '2rem'
                }}>
                  {currentTagInfo.description}
                </p>

                {/* Service Details Accordion Preview */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  border: '1px solid rgba(81, 27, 43, 0.1)',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-rosewood)',
                      fontWeight: 600
                    }}>
                      Recommended Treatment
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-burgundy)'
                    }}>
                      {suggestedService.price}
                    </span>
                  </div>

                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    color: 'var(--color-espresso)',
                    marginBottom: '0.4rem'
                  }}>
                    {suggestedService.name}
                  </h4>

                  <span style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    color: 'var(--color-rosewood)',
                    marginBottom: '1rem'
                  }}>
                    Duration: {suggestedService.duration} • Sample Demo Pricing
                  </span>

                  <ul style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {suggestedService.includes.slice(0, 3).map((feat, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '0.85rem',
                        color: 'rgba(41, 28, 32, 0.85)'
                      }}>
                        <CheckCircle2 size={15} style={{ color: 'var(--color-champagne-dark)', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1.1rem 0' }}
                  onClick={() => onOpenBooking(suggestedService.id, selectedTag)}
                  id="explorer-book-look-btn"
                >
                  <Calendar size={18} />
                  Book This Look ({suggestedService.name})
                </button>
                <p style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-rosewood)',
                  textAlign: 'center',
                  marginTop: '0.75rem'
                }}>
                  Instantly loads this {selectedTag} profile into your demonstration booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .explorer-main-grid {
          grid-template-columns: 1fr;
        }
        @media (max-width: 768px) {
          .explorer-img-col {
            min-height: 320px !important;
          }
          .explorer-text-col {
            padding: 1.5rem 1.25rem !important;
          }
        }
        @media (max-width: 600px) {
          .explorer-caption-bar {
            bottom: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            padding: 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.65rem !important;
          }
        }
        @media (max-width: 480px) {
          .explorer-mood-pills {
            gap: 0.5rem !important;
          }
          .explorer-mood-pills button {
            padding: 0.55rem 1rem !important;
            font-size: 0.78rem !important;
          }
        }
        @media (min-width: 992px) {
          .explorer-main-grid {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          .explorer-img-col {
            grid-column: span 7 !important;
          }
          .explorer-text-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
