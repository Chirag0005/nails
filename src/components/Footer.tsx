import React, { useState } from 'react';
import { Calendar, ArrowUp, Check } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-espresso-deep)',
      color: 'var(--color-ivory)',
      paddingTop: '6rem',
      paddingBottom: '3.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Accent Subtle Glow */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(81, 27, 43, 0.4) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Grand Booking Banner */}
        <div
          style={{
            backgroundColor: 'rgba(81, 27, 43, 0.45)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(197, 164, 109, 0.25)',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '5rem'
          }}
          className="footer-booking-banner"
        >
          <div>
            <span className="section-label light" style={{ marginBottom: '0.5rem' }}>
              Reserve Your Private Session
            </span>
            <h3 className="display-2" style={{ color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
              Your Atelier Appointment <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-blush)' }}>Awaits You.</span>
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(250, 246, 240, 0.8)',
              maxWidth: '520px'
            }}>
              Step into an unhurried sanctuary of bespoke nail artistry and organic restorative care.
            </p>
          </div>

          <button
            className="btn btn-gold"
            onClick={onOpenBooking}
            style={{ padding: '1.1rem 2.5rem', fontSize: '0.9rem' }}
          >
            <Calendar size={18} />
            Book Your Appointment
          </button>
        </div>

        {/* 4-Column Navigation & Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem'
        }}>
          {/* Col 1: Wordmark & Statement */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: 'var(--color-burgundy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600
              }}>
                MN
              </div>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                letterSpacing: '0.15em',
                fontWeight: 600,
                color: 'var(--color-ivory)'
              }}>
                MAISON NAILS
              </span>
            </div>

            <p style={{
              fontSize: '0.88rem',
              color: 'rgba(250, 246, 240, 0.7)',
              lineHeight: 1.7,
              marginBottom: '1.5rem'
            }}>
              An exclusive nail atelier where beauty, high fashion, self-expression, and anatomical precision come together in quiet luxury.
            </p>

            <span style={{
              fontSize: '0.72rem',
              color: 'var(--color-champagne-light)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              Demo Portfolio Atelier
            </span>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '1.5rem',
              fontWeight: 600
            }}>
              Navigation
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'The Philosophy', href: '#story' },
                { label: 'Haute Nail Art Gallery', href: '#gallery' },
                { label: 'Interactive Set Explorer', href: '#explorer' },
                { label: 'Treatment Rituals Menu', href: '#services' },
                { label: '3D Sculptural Atelier', href: '#experience' },
                { label: 'Studio Atmosphere', href: '#studio' }
              ].map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      color: 'rgba(250, 246, 240, 0.75)',
                      textDecoration: 'none',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne-light)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250, 246, 240, 0.75)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Fictional Location */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '1.5rem',
              fontWeight: 600
            }}>
              Atelier Hours
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'rgba(250, 246, 240, 0.75)' }}>
              <div>
                <strong style={{ color: 'var(--color-ivory)' }}>Tuesday – Friday:</strong>
                <div>10:00 AM – 8:00 PM</div>
              </div>
              <div>
                <strong style={{ color: 'var(--color-ivory)' }}>Saturday:</strong>
                <div>09:30 AM – 7:30 PM</div>
              </div>
              <div>
                <strong style={{ color: 'var(--color-ivory)' }}>Sunday:</strong>
                <div>11:00 AM – 6:00 PM</div>
              </div>
              <div>
                <strong style={{ color: 'var(--color-rosewood)' }}>Monday:</strong>
                <div>Closed for private collection curation</div>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '1.5rem',
              fontWeight: 600
            }}>
              The Atelier Gazette
            </h4>

            <p style={{
              fontSize: '0.88rem',
              color: 'rgba(250, 246, 240, 0.7)',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              Receive private invitations to seasonal shade debuts and editorial nail art inspirations.
            </p>

            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(250, 246, 240, 0.15)',
                  color: 'var(--color-ivory)',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-sans)'
                }}
              />
              <button
                type="submit"
                className="btn btn-outline-light"
                style={{ padding: '0.7rem 0', fontSize: '0.78rem' }}
              >
                {subscribed ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-champagne)' }}>
                    <Check size={14} /> Subscribed (Demo)
                  </span>
                ) : 'Request Invitation'}
              </button>
            </form>
          </div>
        </div>

        {/* Oversized Brand Typography Watermark */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(250, 246, 240, 0.08)',
          paddingTop: '3.5rem',
          paddingBottom: '2.5rem',
          overflow: 'hidden'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 9.5vw, 7.5rem)',
            letterSpacing: '0.18em',
            color: 'rgba(250, 246, 240, 0.06)',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            userSelect: 'none',
            wordBreak: 'break-word'
          }}>
            MAISON NAILS
          </h2>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderTop: '1px solid rgba(250, 246, 240, 0.08)',
          paddingTop: '2rem',
          fontSize: '0.78rem',
          color: 'rgba(250, 246, 240, 0.5)'
        }}>
          <div>
            © {new Date().getFullYear()} MAISON NAILS Atelier. All Rights Reserved. Fictional luxury demonstration portfolio.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-champagne)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.78rem'
            }}
          >
            <span>Back to Summit</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          .footer-booking-banner {
            padding: 1.75rem 1.25rem !important;
          }
          .footer-booking-banner .btn {
            width: 100% !important;
          }
        }
      `}</style>
    </footer>
  );
};
