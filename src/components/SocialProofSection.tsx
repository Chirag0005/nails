import React from 'react';
import { TESTIMONIALS, GALLERY_ITEMS } from '../data/nailData';
import { Star, ArrowUpRight } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 18, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const SocialProofSection: React.FC = () => {
  return (
    <section style={{
      backgroundColor: 'var(--color-ivory-light)',
      padding: 'var(--section-padding) 0',
      position: 'relative',
      borderTop: '1px solid rgba(81, 27, 43, 0.08)'
    }}>
      <div className="container">
        {/* Testimonials Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <span className="section-label">Tastemaker Acclaim</span>
          <h2 className="display-2" style={{ marginBottom: '1.25rem' }}>
            Loved For The <span style={{ fontStyle: 'italic', color: 'var(--color-burgundy)' }}>Details.</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(41, 28, 32, 0.75)',
            maxWidth: '560px',
            lineHeight: 1.6
          }}>
            From fashion week front rows to bridal mornings, read fictional demo testimonials showcasing our studio's devotion to perfection.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid rgba(81, 27, 43, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* 5-Star Rating */}
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.25rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="var(--color-champagne)"
                      style={{ color: 'var(--color-champagne)' }}
                    />
                  ))}
                </div>

                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: 'var(--color-espresso)',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(81, 27, 43, 0.08)',
                paddingTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <strong style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    color: 'var(--color-espresso)'
                  }}>
                    {t.author}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-rosewood)' }}>
                    {t.title}
                  </span>
                </div>

                <span style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne-dark)',
                  fontWeight: 600
                }}>
                  {t.publication}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Mosaic Showcase */}
        <div style={{
          borderTop: '1px solid rgba(81, 27, 43, 0.12)',
          paddingTop: '4.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <span className="section-label" style={{ marginBottom: '0.5rem' }}>
                @MaisonNailsAtelier
              </span>
              <h3 className="display-3" style={{ color: 'var(--color-espresso)' }}>
                Follow Our <span style={{ fontStyle: 'italic', color: 'var(--color-burgundy)' }}>Journey.</span>
              </h3>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}
            >
              <InstagramIcon size={16} />
              Connect on Instagram (Demo Link)
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Editorial 4-photo Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  backgroundColor: '#1A0D12',
                  boxShadow: 'var(--shadow-subtle)'
                }}
                className="insta-tile"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="insta-img"
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(81, 27, 43, 0.65)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-ivory)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  padding: '1rem',
                  textAlign: 'center'
                }} className="insta-overlay">
                  <InstagramIcon size={24} style={{ marginBottom: '0.5rem', color: 'var(--color-champagne)' }} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-champagne-light)', marginTop: '4px' }}>
                    #{item.finish.replace(/\s+/g, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .insta-tile:hover .insta-img {
          transform: scale(1.08);
        }
        .insta-tile:hover .insta-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};
