import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { socialLinks } from '../data/socialLinks';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Navigation Items
  const navItems = [
    { name: 'Home', target: 'hero' },
    { name: 'Work', target: 'work' },
    { name: 'Experience', target: 'experience' },
    { name: 'About & Skills', target: 'about' },
    { name: 'Contact', target: 'contact' }
  ];

  // Track scroll position to change background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setIsOpen(false);
    if (isHome) {
      const element = document.getElementById(target);
      if (element) {
        if (target === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate('/', { state: { scrollTo: target } });
    }
  };

  return (
    <>
      <nav 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(250, 249, 246, 0.92)' : 'rgba(250, 249, 246, 0)',
          backdropFilter: isScrolled ? 'blur(14px)' : 'blur(0px)',
          borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4rem',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease'
        }}
      >
        {/* Left Side: Brand Logo */}
        <Link 
          to="/" 
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <motion.span
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            NIHAL PM
          </motion.span>
          <span 
            style={{
              fontSize: '0.62rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '2px 7px',
              borderRadius: '2px',
              textTransform: 'uppercase'
            }}
          >
            MERN & DESIGN
          </span>
        </Link>

        {/* Center: Dynamic Navigation Links */}
        <div 
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                position: 'relative',
                padding: '4px 0'
              }}
            >
              <span className="clickable">{item.name}</span>
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: 'var(--text-primary)',
                  scaleX: 0,
                  transformOrigin: 'right',
                }}
                whileHover={{ scaleX: 1, transformOrigin: 'left' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </button>
          ))}
        </div>

        {/* Right Side: GitHub + Let's Talk CTA */}
        <div className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="clickable"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              transition: 'background-color 0.2s, border-color 0.2s',
            }}
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>

          <button
            onClick={() => handleNavClick('contact')}
            style={{
              background: 'var(--text-primary)',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 18px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'transform 0.2s ease, opacity 0.2s ease'
            }}
            className="clickable"
          >
            Let's Talk <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'var(--bg-primary)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.75rem',
              padding: '2rem'
            }}
          >
            {navItems.map((item, idx) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => handleNavClick(item.target)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)'
                }}
              >
                {item.name}
              </motion.button>
            ))}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)'
                }}
              >
                <GithubIcon size={18} /> GitHub
              </a>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => handleNavClick('contact')}
                style={{
                  background: 'var(--text-primary)',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--bg-primary)',
                  textTransform: 'uppercase'
                }}
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Query Styling */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
