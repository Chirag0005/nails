import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', href: '#story' },
    { label: 'Nail Art', href: '#gallery' },
    { label: 'Interactive Set', href: '#explorer' },
    { label: 'The Rituals', href: '#services' },
    { label: '3D Atelier', href: '#experience' },
    { label: 'The Studio', href: '#studio' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all var(--transition-smooth)',
          backgroundColor: isScrolled ? 'rgba(250, 246, 240, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(81, 27, 43, 0.08)' : '1px solid transparent',
          padding: isScrolled ? '0.85rem 0' : '1.5rem 0'
        }}
      >
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Brand Logo & Wordmark */}
          <a
            href="#"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: 'var(--color-espresso)'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-burgundy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(81, 27, 43, 0.2)'
            }}>
              MN
            </div>

            <div>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                letterSpacing: '0.18em',
                fontWeight: 500,
                color: 'var(--color-espresso)',
                display: 'block',
                lineHeight: 1
              }}>
                MAISON NAILS
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.62rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-rosewood)',
                display: 'block',
                marginTop: '3px'
              }}>
                Haute Atelier Paris • London
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.2rem'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  color: 'var(--color-espresso)',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color var(--transition-fast)'
                }}
                className="nav-link-hover"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action & Booking CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="desktop-nav">
            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary"
              style={{
                padding: '0.75rem 1.7rem',
                fontSize: '0.8rem'
              }}
            >
              <Calendar size={14} />
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '1px solid rgba(81, 27, 43, 0.15)',
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(250, 246, 240, 0.8)',
              color: 'var(--color-espresso)',
              cursor: 'pointer'
            }}
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-ivory)',
          zIndex: 999,
          padding: '6.5rem 2rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeIn 0.25s ease-out forwards'
        }}>
          <div>
            <span className="section-label" style={{ marginBottom: '1.5rem' }}>Menu</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.85rem',
                    color: 'var(--color-espresso)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid rgba(81, 27, 43, 0.08)'
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-champagne)' }}>0{idx + 1}</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1.1rem 0' }}
            >
              <Calendar size={16} />
              Reserve Appointment
            </button>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-rosewood)',
              textAlign: 'center',
              letterSpacing: '0.05em'
            }}>
              Private Atelier • Demonstration Portfolio
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background-color: var(--color-burgundy);
          transition: width var(--transition-fast);
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};
