import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/nailData';
import { X, ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';

interface NailArtGalleryProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const NailArtGallery: React.FC<NailArtGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLightboxIndex, setSelectedLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: 'All Creations' },
    { key: 'classics', label: 'The Classics' },
    { key: 'statement', label: 'The Statement' },
    { key: 'artistry', label: 'The Artistry' },
    { key: 'bridal', label: 'The Bridal Edit' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedLightboxIndex === null) return;
      if (e.key === 'Escape') setSelectedLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLightboxIndex, filteredItems.length]);

  const activeLightboxItem = selectedLightboxIndex !== null ? filteredItems[selectedLightboxIndex] : null;

  return (
    <section id="gallery" style={{
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
          <span className="section-label">Haute Galerie</span>
          <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
            Find Your Next <span style={{ fontStyle: 'italic', color: 'var(--color-burgundy)' }}>Obsession.</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(41, 28, 32, 0.75)',
            maxWidth: '560px',
            lineHeight: 1.6
          }}>
            From timeless Parisian minimalism to sculptural art that refuses to be ordinary. Each design is custom tailored in our private atelier.
          </p>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            marginTop: '2.5rem'
          }} className="gallery-filter-pills">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: isActive ? 'var(--color-burgundy)' : 'rgba(81, 27, 43, 0.05)',
                    color: isActive ? 'var(--color-ivory)' : 'var(--color-espresso)',
                    border: isActive ? '1px solid var(--color-burgundy)' : '1px solid rgba(81, 27, 43, 0.1)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Editorial Asymmetrical Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {filteredItems.map((item, index) => {
            // Give featured items 8 columns, others 4 columns or 6 columns for an asymmetrical magazine spread
            const isSpanEight = index === 0 || index === 3;
            const colSpan = isSpanEight ? 8 : 4;

            return (
              <div
                key={item.id}
                style={{
                  gridColumn: `span ${colSpan}`,
                  position: 'relative'
                }}
                className={`gallery-card-col gallery-card-${item.id}`}
              >
                <div
                  onClick={() => setSelectedLightboxIndex(index)}
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 'var(--shadow-card)',
                    cursor: 'pointer',
                    transition: 'transform var(--transition-smooth), box-shadow var(--transition-smooth)'
                  }}
                  className="gallery-card-container"
                >
                  {/* Image Frame */}
                  <div style={{
                    position: 'relative',
                    aspectRatio: isSpanEight ? '16/10' : '4/5',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="gallery-item-image"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(26,13,18,0.75) 100%)',
                      opacity: 0.9,
                      transition: 'opacity 0.3s ease'
                    }} />

                    {/* Top Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(250, 246, 240, 0.9)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-burgundy)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}>
                      {item.categoryLabel}
                    </div>

                    {/* Bottom Info Bar */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      color: 'var(--color-ivory)'
                    }}>
                      <div>
                        <span style={{
                          display: 'block',
                          fontSize: '0.7rem',
                          color: 'var(--color-champagne-light)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}>
                          {item.finish} • {item.shape}
                        </span>
                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: isSpanEight ? '1.5rem' : '1.25rem',
                          fontWeight: 500,
                          color: 'var(--color-ivory)',
                          marginTop: '3px'
                        }}>
                          {item.title}
                        </h3>
                      </div>

                      {/* View Lightbox Pill */}
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s ease, transform 0.2s ease'
                      }} className="expand-pill">
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedLightboxIndex !== null && activeLightboxItem && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '920px',
              backgroundColor: '#FAF6F0',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            className="gallery-lightbox-modal"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedLightboxIndex(null)}
              aria-label="Close Lightbox"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(41, 28, 32, 0.8)',
                color: '#FAF6F0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Left Image Area (Cols 1-7) */}
            <div style={{
              gridColumn: 'span 12',
              position: 'relative',
              backgroundColor: '#1A0D12',
              minHeight: '380px'
            }} className="lightbox-img-col">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLightboxIndex((selectedLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
                }}
                aria-label="Previous Design"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(26, 13, 18, 0.65)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLightboxIndex((selectedLightboxIndex + 1) % filteredItems.length);
                }}
                aria-label="Next Design"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(26, 13, 18, 0.65)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Right Details Area (Cols 8-12) */}
            <div style={{
              gridColumn: 'span 12',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }} className="lightbox-details-col">
              <div>
                <span className="section-label" style={{ marginBottom: '0.75rem' }}>
                  {activeLightboxItem.categoryLabel}
                </span>

                <h3 className="display-3" style={{
                  color: 'var(--color-espresso)',
                  marginBottom: '1rem'
                }}>
                  {activeLightboxItem.title}
                </h3>

                <div style={{
                  display: 'flex',
                  gap: '0.6rem',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(81, 27, 43, 0.08)',
                    fontSize: '0.75rem',
                    color: 'var(--color-burgundy)',
                    fontWeight: 600
                  }}>
                    {activeLightboxItem.finish}
                  </span>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(197, 164, 109, 0.15)',
                    fontSize: '0.75rem',
                    color: 'var(--color-champagne-dark)',
                    fontWeight: 600
                  }}>
                    {activeLightboxItem.shape}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(41, 28, 32, 0.8)',
                  lineHeight: 1.65,
                  marginBottom: '1.75rem'
                }}>
                  {activeLightboxItem.description}
                </p>

                {/* Style tags */}
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-rosewood)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    Artisan Aesthetic Tags:
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {activeLightboxItem.styleTags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(81, 27, 43, 0.15)',
                          color: 'var(--color-espresso)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    const svc = activeLightboxItem.suggestedServiceId;
                    setSelectedLightboxIndex(null);
                    onOpenBooking(svc);
                  }}
                >
                  <Calendar size={16} />
                  Book This Look in Atelier
                </button>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-rosewood)',
                  textAlign: 'center',
                  marginTop: '0.75rem'
                }}>
                  Preselects service &amp; style preference in demonstration booking
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card-container:hover .gallery-item-image {
          transform: scale(1.04);
        }
        .gallery-card-container:hover .expand-pill {
          background-color: var(--color-burgundy) !important;
          color: var(--color-ivory);
          transform: scale(1.1);
        }
        @media (max-width: 991px) {
          .gallery-card-col {
            grid-column: span 12 !important;
          }
          .gallery-lightbox-modal {
            max-height: 92vh !important;
            overflow-y: auto !important;
          }
          .lightbox-img-col {
            min-height: 250px !important;
            max-height: 320px !important;
          }
          .lightbox-details-col {
            padding: 1.5rem 1.25rem !important;
          }
        }
        @media (max-width: 500px) {
          .gallery-filter-pills {
            gap: 0.5rem !important;
          }
          .gallery-filter-pills button {
            padding: 0.55rem 1rem !important;
            font-size: 0.75rem !important;
          }
        }
        @media (min-width: 992px) {
          .lightbox-img-col {
            grid-column: span 7 !important;
          }
          .lightbox-details-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
