import React, { useState, useEffect } from 'react';
import { SERVICES, TIME_SLOTS, NAIL_SHAPES } from '../data/nailData';
import confetti from 'canvas-confetti';
import {
  User,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface BookingExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialStyleMood?: string;
}

export const BookingExperience: React.FC<BookingExperienceProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialStyleMood
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>(NAIL_SHAPES[0]);
  const [notes, setNotes] = useState<string>(initialStyleMood ? `Preference: ${initialStyleMood} style collection.` : '');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Sync if initial props change
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
    if (initialStyleMood) {
      setNotes(`Preferred style: ${initialStyleMood} aesthetic.`);
    }
  }, [initialServiceId, initialStyleMood]);

  const { minDateStr, maxDateStr } = React.useMemo(() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const maxD = new Date();
    maxD.setDate(maxD.getDate() + 60);
    return {
      minDateStr: tom.toISOString().split('T')[0],
      maxDateStr: maxD.toISOString().split('T')[0]
    };
  }, []);

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Validation
  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) {
      errs.phone = 'Please provide your phone number.';
    } else if (phone.trim().length < 8) {
      errs.phone = 'Please enter a complete phone number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedServiceId) return;
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate) {
        setErrors({ date: 'Please select a preferred appointment date.' });
        return;
      }
      setErrors({});
      setStep(3);
    } else if (step === 3) {
      if (!selectedTime) {
        setErrors({ time: 'Please select an appointment time slot.' });
        return;
      }
      setErrors({});
      setStep(4);
    } else if (step === 4) {
      if (!validateStep4()) return;
      setStep(5);
    } else if (step === 5) {
      // Simulate booking submission
      setIsSubmitting(true);
      setTimeout(() => {
        const randomCode = 'MN-' + Math.floor(100000 + Math.random() * 900000);
        setConfirmationCode(randomCode);
        setIsSubmitting(false);
        setStep(6);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#511B2B', '#C5A46D', '#E9C9CD', '#FAF6F0']
        });
      }, 900);
    }
  };

  const handlePrevStep = () => {
    if (step > 1 && step <= 5) {
      setStep(step - 1);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          backgroundColor: '#FAF6F0',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
          border: '1px solid rgba(81, 27, 43, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s ease-out forwards'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.75rem 2rem',
          borderBottom: '1px solid rgba(81, 27, 43, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div>
            <span className="section-label" style={{ marginBottom: 0 }}>
              Atelier Reservation • Step 0{step} of 05
            </span>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              color: 'var(--color-espresso)',
              marginTop: '4px'
            }}>
              {step === 1 && 'Select Your Desired Ritual'}
              {step === 2 && 'Select Your Preferred Date'}
              {step === 3 && 'Choose Your Appointment Time'}
              {step === 4 && 'Guest Information & Preferences'}
              {step === 5 && 'Review Atelier Summary'}
              {step === 6 && 'Appointment Confirmed'}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Reservation"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(81, 27, 43, 0.08)',
              border: 'none',
              color: 'var(--color-espresso)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-step Progress Bar */}
        {step < 6 && (
          <div style={{
            display: 'flex',
            height: '4px',
            backgroundColor: 'rgba(81, 27, 43, 0.1)'
          }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  backgroundColor: step >= s ? 'var(--color-burgundy)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        )}

        {/* Demo Mode Disclaimer Alert */}
        <div style={{
          backgroundColor: 'rgba(197, 164, 109, 0.15)',
          padding: '0.65rem 2rem',
          borderBottom: '1px solid rgba(197, 164, 109, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.78rem',
          color: 'var(--color-espresso)'
        }}>
          <Sparkles size={14} style={{ color: 'var(--color-champagne-dark)', flexShrink: 0 }} />
          <span>
            <strong>Demonstration Atelier:</strong> Scheduling and availability are simulated for portfolio demonstration. No real payment or salon booking is processed.
          </span>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem', flex: 1 }}>
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'rgba(41, 28, 32, 0.75)', marginBottom: '0.5rem' }}>
                Select an exclusive treatment from our atelier menu:
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {SERVICES.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected
                          ? '2px solid var(--color-burgundy)'
                          : '1px solid rgba(81, 27, 43, 0.12)',
                        backgroundColor: isSelected ? 'rgba(81, 27, 43, 0.04)' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                          <span style={{
                            fontSize: '0.72rem',
                            color: 'var(--color-rosewood)',
                            letterSpacing: '0.1em'
                          }}>
                            {service.number}
                          </span>
                          <h4 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.2rem',
                            color: 'var(--color-espresso)',
                            marginTop: '2px'
                          }}>
                            {service.name}
                          </h4>
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: 'var(--color-burgundy)'
                        }}>
                          {service.price}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '0.8rem',
                        color: 'rgba(41, 28, 32, 0.75)',
                        margin: '0.75rem 0',
                        lineHeight: 1.5
                      }}>
                        {service.tagline}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.6rem',
                        borderTop: '1px solid rgba(81, 27, 43, 0.06)',
                        fontSize: '0.75rem',
                        color: 'var(--color-rosewood)'
                      }}>
                        <span>Duration: {service.duration}</span>
                        {isSelected && (
                          <span style={{ color: 'var(--color-burgundy)', fontWeight: 600 }}>Selected</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-rosewood)' }}>
                  Selected Treatment:
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-burgundy)' }}>
                  {currentService.name} ({currentService.duration} • {currentService.price})
                </h4>
              </div>

              <div>
                <label
                  htmlFor="booking-date"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-espresso)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Choose Appointment Date
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    id="booking-date"
                    min={minDateStr}
                    max={maxDateStr}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      if (errors.date) setErrors({});
                    }}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.date ? '2px solid #D9383A' : '1px solid rgba(81, 27, 43, 0.2)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-espresso)'
                    }}
                  />
                </div>
                {errors.date && (
                  <p style={{ color: '#D9383A', fontSize: '0.8rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={14} />
                    {errors.date}
                  </p>
                )}
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(81, 27, 43, 0.08)',
                fontSize: '0.82rem',
                color: 'rgba(41, 28, 32, 0.75)',
                lineHeight: 1.6
              }}>
                <strong>Atelier Hours:</strong> Tuesday through Saturday: 10:00 AM – 8:00 PM. Sunday: 11:00 AM – 6:00 PM. Closed Mondays for private collection curation.
              </div>
            </div>
          )}

          {/* STEP 3: SELECT TIME */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-rosewood)' }}>
                  Date: {selectedDate}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-espresso)' }}>
                  Available Atelier Slots
                </h4>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.85rem'
              }}>
                {TIME_SLOTS.map((time, idx) => {
                  const isSelected = selectedTime === time;
                  // Simulate 1 slot being booked for realism
                  const isSimulatedBooked = idx === 2;

                  return (
                    <button
                      key={time}
                      disabled={isSimulatedBooked}
                      onClick={() => {
                        setSelectedTime(time);
                        if (errors.time) setErrors({});
                      }}
                      style={{
                        padding: '1rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected
                          ? '2px solid var(--color-burgundy)'
                          : '1px solid rgba(81, 27, 43, 0.15)',
                        backgroundColor: isSelected
                          ? 'var(--color-burgundy)'
                          : isSimulatedBooked
                          ? 'rgba(0, 0, 0, 0.04)'
                          : '#FFFFFF',
                        color: isSelected
                          ? 'var(--color-ivory)'
                          : isSimulatedBooked
                          ? 'rgba(41, 28, 32, 0.35)'
                          : 'var(--color-espresso)',
                        cursor: isSimulatedBooked ? 'not-allowed' : 'pointer',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{time}</span>
                      <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>
                        {isSimulatedBooked ? 'Unavailable' : 'Available'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {errors.time && (
                <p style={{ color: '#D9383A', fontSize: '0.8rem', textAlign: 'center' }}>
                  {errors.time}
                </p>
              )}
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 4 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="e.g. Camille Laurent"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem 0.9rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.fullName ? '2px solid #D9383A' : '1px solid rgba(81, 27, 43, 0.2)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.95rem'
                    }}
                  />
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: 'var(--color-rosewood)' }} />
                </div>
                {errors.fullName && <p style={{ color: '#D9383A', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.fullName}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="camille@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem 0.9rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.email ? '2px solid #D9383A' : '1px solid rgba(81, 27, 43, 0.2)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.95rem'
                    }}
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: 'var(--color-rosewood)' }} />
                </div>
                {errors.email && <p style={{ color: '#D9383A', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Phone Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem 0.9rem 2.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.phone ? '2px solid #D9383A' : '1px solid rgba(81, 27, 43, 0.2)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.95rem'
                    }}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: 'var(--color-rosewood)' }} />
                </div>
                {errors.phone && <p style={{ color: '#D9383A', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</p>}
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Preferred Nail Silhouette (Optional)
                </label>
                <select
                  value={selectedShape}
                  onChange={(e) => setSelectedShape(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(81, 27, 43, 0.2)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {NAIL_SHAPES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Artistry Notes &amp; Inspiration (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your desired color palette, event dress, or special occasion..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(81, 27, 43, 0.2)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW SUMMARY */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                border: '1px solid rgba(81, 27, 43, 0.12)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(81, 27, 43, 0.1)',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-rosewood)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Selected Ritual
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-espresso)' }}>
                      {currentService.name}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-rosewood)' }}>
                      {currentService.duration} duration
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--color-burgundy)'
                  }}>
                    {currentService.price}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.25rem',
                  fontSize: '0.9rem'
                }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-rosewood)', textTransform: 'uppercase' }}>
                      Date &amp; Time
                    </span>
                    <strong style={{ color: 'var(--color-espresso)' }}>
                      {selectedDate} at {selectedTime}
                    </strong>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-rosewood)', textTransform: 'uppercase' }}>
                      Nail Silhouette
                    </span>
                    <strong style={{ color: 'var(--color-espresso)' }}>
                      {selectedShape}
                    </strong>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-rosewood)', textTransform: 'uppercase' }}>
                      Guest Name
                    </span>
                    <strong style={{ color: 'var(--color-espresso)' }}>
                      {fullName}
                    </strong>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-rosewood)', textTransform: 'uppercase' }}>
                      Contact Details
                    </span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-espresso)' }}>
                      {email} • {phone}
                    </div>
                  </div>

                  {notes && (
                    <div style={{ gridColumn: 'span 2', paddingTop: '0.5rem', borderTop: '1px solid rgba(81, 27, 43, 0.08)' }}>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-rosewood)', textTransform: 'uppercase' }}>
                        Artisan Notes
                      </span>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(41, 28, 32, 0.85)', marginTop: '2px' }}>
                        {notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.8rem',
                color: 'var(--color-rosewood)'
              }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-champagne-dark)' }} />
                <span>Private atelier booking. Complimentary cancellation up to 24 hours prior.</span>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION SCREEN */}
          {step === 6 && (
            <div style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 164, 109, 0.2)',
                color: 'var(--color-burgundy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <CheckCircle2 size={40} />
              </div>

              <span className="section-label" style={{ marginBottom: '0.5rem' }}>
                Demonstration Booking Confirmed
              </span>

              <h3 className="display-2" style={{ color: 'var(--color-espresso)', marginBottom: '0.75rem' }}>
                We Await Your Visit.
              </h3>

              <p style={{
                fontSize: '1.05rem',
                color: 'rgba(41, 28, 32, 0.8)',
                maxWidth: '480px',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                Thank you, <strong>{fullName}</strong>. Your appointment for the <strong>{currentService.name}</strong> has been simulated for <strong>{selectedDate} at {selectedTime}</strong>.
              </p>

              {/* Reference Ticket Box */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem 2.5rem',
                border: '1px dashed var(--color-champagne)',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-rosewood)' }}>
                  Reservation Code
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'var(--color-burgundy)'
                }}>
                  {confirmationCode}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(41, 28, 32, 0.65)' }}>
                  Demo Portfolio Atelier • Paris / London
                </span>
              </div>

              <button
                className="btn btn-primary"
                onClick={resetBooking}
              >
                Return to Atelier Experience
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 6 && (
          <div style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid rgba(81, 27, 43, 0.1)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            bottom: 0,
            zIndex: 10
          }}>
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-espresso)',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : <div />}

            <button
              onClick={handleNextStep}
              className="btn btn-primary"
              disabled={isSubmitting}
              id="booking-next-step-btn"
            >
              {isSubmitting ? 'Confirming Reservation...' : step === 5 ? 'Confirm Reservation' : 'Continue'}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
