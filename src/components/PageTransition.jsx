import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <>
      {children}
      
      {/* Cinematic Slide Wipe Panel */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 0.65, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#121212', // Dark charcoal slide curtain
          transformOrigin: 'top',
          zIndex: 9999,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Soft typographic logo watermark inside the transition curtain */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#FAF9F6',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}
        >
          NIHAL PM
        </motion.div>
      </motion.div>

      {/* Wipe Curtain Entry layer from bottom */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ 
          duration: 0.65, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#121212',
          transformOrigin: 'bottom',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
    </>
  );
}
