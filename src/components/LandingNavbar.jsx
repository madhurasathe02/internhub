import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, LogIn } from 'lucide-react';

export default function LandingNavbar({ onGetStarted, onLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Brand Logo */}
      <div className="navbar-brand" onClick={() => scrollToSection('hero')}>
        <div className="brand-icon-wrapper">
          <Sparkles size={20} />
        </div>
        <div>
          <span>Intern</span>
          <span style={{ color: '#8B7CF6' }}>Hub</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="desktop-only" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <button onClick={() => scrollToSection('hero')} style={navLinkStyle}>Home</button>
        <button onClick={() => scrollToSection('features')} style={navLinkStyle}>Features</button>
        <button onClick={() => scrollToSection('how-it-works')} style={navLinkStyle}>How It Works</button>
        <button onClick={() => scrollToSection('user-roles')} style={navLinkStyle}>For Students</button>
        <button onClick={() => scrollToSection('user-roles')} style={navLinkStyle}>For Mentors</button>
        <button onClick={() => scrollToSection('why-internhub')} style={navLinkStyle}>About</button>
      </nav>

      {/* Desktop Action Buttons */}
      <div className="desktop-only" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button className="btn btn-outline btn-sm" onClick={() => onLogin && onLogin('student')}>
          <LogIn size={14} />
          <span>Login</span>
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => onGetStarted && onGetStarted('student')}>
          <span>Get Started</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <div className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          className="icon-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Slide-Out Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="soft-card animate-fade-in" 
          style={{
            position: 'absolute',
            top: '72px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderBottom: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-dropdown)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 100
          }}
        >
          <button onClick={() => scrollToSection('hero')} style={mobileNavLinkStyle}>Home</button>
          <button onClick={() => scrollToSection('features')} style={mobileNavLinkStyle}>Features</button>
          <button onClick={() => scrollToSection('how-it-works')} style={mobileNavLinkStyle}>How It Works</button>
          <button onClick={() => scrollToSection('user-roles')} style={mobileNavLinkStyle}>For Students</button>
          <button onClick={() => scrollToSection('user-roles')} style={mobileNavLinkStyle}>For Mentors</button>
          <button onClick={() => scrollToSection('why-internhub')} style={mobileNavLinkStyle}>About</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '12px', borderTop: '1px solid #E5E2F0' }}>
            <button className="btn btn-outline" onClick={() => { setMobileMenuOpen(false); if (onLogin) onLogin('student'); }}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); if (onGetStarted) onGetStarted('student'); }}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

const navLinkStyle = {
  background: 'none',
  border: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: 0,
  transition: 'color 0.2s ease',
};

const mobileNavLinkStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--text-main)',
  cursor: 'pointer',
  textAlign: 'left',
  padding: '8px 0',
};
