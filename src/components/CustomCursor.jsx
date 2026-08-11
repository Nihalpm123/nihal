import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOverImage, setIsOverImage] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Position of the dot (follows mouse directly)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the trailing ring
  const springConfig = { damping: 35, stiffness: 350, mass: 0.4 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check mobile or touch device settings
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Find closest interactive link/button
      const targetLink = e.target.closest('a, button, [role="button"], .clickable, [data-cursor]');
      // Find closest image
      const targetImg = e.target.closest('img');
      
      if (targetLink) {
        setIsHovered(true);
        setIsOverImage(false);
        const textAttr = targetLink.getAttribute('data-cursor');
        if (textAttr) {
          setCursorText(textAttr);
        } else {
          setCursorText("");
        }
      } else if (targetImg) {
        setIsHovered(true);
        setIsOverImage(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setIsOverImage(false);
        setCursorText("");
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  // Disable custom cursor on mobile devices
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Central Cursor Dot */}
      <motion.div
        className="custom-cursor"
        style={{
          left: cursorX,
          top: cursorY,
        }}
        animate={{
          scale: isHovered ? (isOverImage ? 0.5 : 1.5) : 1,
          backgroundColor: isHovered 
            ? (isOverImage ? 'rgba(18, 18, 18, 0.4)' : 'var(--text-secondary)') 
            : 'var(--text-primary)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          left: ringX,
          top: ringY,
        }}
        animate={{
          scale: isHovered 
            ? (cursorText ? 2.2 : (isOverImage ? 1.8 : 1.4)) 
            : 1,
          borderColor: isHovered 
            ? (isOverImage ? 'rgba(18, 18, 18, 0.15)' : 'rgba(18, 18, 18, 0.3)') 
            : 'rgba(18, 18, 18, 0.8)',
          backgroundColor: isHovered 
            ? (cursorText ? 'rgba(18, 18, 18, 0.05)' : (isOverImage ? 'rgba(18, 18, 18, 0.03)' : 'rgba(0, 0, 0, 0)'))
            : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '8px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
