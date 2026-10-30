import React, { useState } from 'react';
import { SERVICES } from '../data/nailData';
import { Calendar, Clock, Check } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" style={{
      backgroundColor: 'var(--color-ivory)',
      padding: 'var(--section-padding) 0',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '4rem',
          maxWidth: '680px'
        }}>
          <span className="section-label">Atelier Menu</span>
          <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
            The <span style={{ fontStyle: 'italic', color: 'var(--color-burgundy)' }}>Rituals.</span>
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(41, 28, 32, 0.78)',
            lineHeight: 1.65,
            fontWeight: 300
          }}>
            Thoughtfully crafted treatments. Beautifully considered details. Every ritual includes a private consultation, tailored cuticle curation, and organic restorative essences.
          </p>
        </div>

        {/* Editorial Layout: Left List + Right Dynamic Visual Preview */}
        <div style={{
          display: 'grid',
          alignItems: 'start'
        }} className="services-main-grid">
          {/* Left Column: Interactive Rituals Accordion / List (Cols 1-7) */}
          <div className="services-list-col">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(81, 27, 43, 0.15)'
            }}>
              {SERVICES.map((service) => {
                const isActive = activeServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    style={{
                      borderBottom: '1px solid rgba(81, 27, 43, 0.12)',
                      padding: '1.75rem 0',
                      cursor: 'pointer',
                      transition: 'background-color 0.25s ease'
                    }}
                    className={`service-row ${isActive ? 'active' : ''}`}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.2rem',
                          color: isActive ? 'var(--color-burgundy)' : 'var(--color-rosewood)',
                          fontWeight: 500
                        }}>
                          {service.number}
                        </span>

                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)',
                          color: isActive ? 'var(--color-burgundy)' : 'var(--color-espresso)',
                          transition: 'color var(--transition-fast)'
                        }}>
                          {service.name}
                        </h3>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.75rem'
                      }}>
                        <span style={{
                          fontSize: '0.82rem',
                          color: 'var(--color-rosewood)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          <Clock size={14} />
                          {service.duration}
                        </span>

                        <span style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.4rem',
                          fontWeight: 600,
                          color: 'var(--color-espresso)'
                        }}>
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Details when active */}
                    {isActive && (
                      <div
                        style={{
                          marginTop: '1.25rem',
                          paddingLeft: '3rem',
                          animation: 'fadeIn 0.3s ease-out'
                        }}
                        className="service-expanded-content"
                      >
                        <p style={{
                          fontSize: '0.98rem',
                          color: 'rgba(41, 28, 32, 0.8)',
                          lineHeight: 1.65,
                          marginBottom: '1.25rem',
                          maxWidth: '560px'
                        }}>
                          {service.description}
                        </p>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                          flexWrap: 'wrap'
                        }}>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking(service.id);
                            }}
                            style={{ padding: '0.75rem 1.75rem', fontSize: '0.8rem' }}
                          >
                            <Calendar size={14} />
                            Reserve This Ritual
                          </button>

                          <span style={{
                            fontSize: '0.72rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--color-rosewood)'
                          }}>
                            {service.recommendedStyle}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Dynamic Service Visual Showcase (Cols 8-12) */}
          <div className="services-preview-col">
            <div style={{
              position: 'sticky',
              top: '6.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid rgba(81, 27, 43, 0.1)'
            }}>
              {/* Image Frame */}
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden'
              }}>
                <img
                  key={activeService.image}
                  src={activeService.image}
                  alt={activeService.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    animation: 'fadeIn 0.4s ease-out'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.4rem 0.9rem',
                  backgroundColor: 'rgba(250, 246, 240, 0.95)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  {activeService.tagline}
                </div>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: 'var(--color-espresso)'
                  }}>
                    {activeService.name}
                  </h4>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--color-burgundy)'
                  }}>
                    {activeService.price}
                  </span>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-rosewood)',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  Atelier Inclusions:
                </div>

                <ul style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  marginBottom: '1.75rem'
                }}>
                  {activeService.includes.map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      fontSize: '0.85rem',
                      color: 'rgba(41, 28, 32, 0.85)'
                    }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(197, 164, 109, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-champagne-dark)',
                        flexShrink: 0
                      }}>
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => onOpenBooking(activeService.id)}
                  id="service-preview-reserve-btn"
                >
                  <Calendar size={16} />
                  Reserve {activeService.name}
                </button>

                <p style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-rosewood)',
                  textAlign: 'center',
                  marginTop: '0.75rem'
                }}>
                  All rates reflect demonstration studio pricing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .services-main-grid {
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .service-row:hover h3 {
          color: var(--color-burgundy) !important;
        }
        @media (max-width: 768px) {
          .service-expanded-content {
            padding-left: 0.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .service-row .btn {
            width: 100% !important;
          }
        }
        @media (min-width: 992px) {
          .services-main-grid {
            grid-template-columns: repeat(12, 1fr) !important;
            gap: 3.5rem !important;
          }
          .services-list-col {
            grid-column: span 7 !important;
          }
          .services-preview-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
};
