import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Award, BookOpen, Send, Check } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolioData';
import { socialLinks } from '../data/socialLinks';

export default function Home() {
  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Branding');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Setup Scroll-Linked Parallax Animations
  const { scrollY } = useScroll();
  const textParallaxY = useTransform(scrollY, [0, 600], [0, -100]);
  const imageParallaxY = useTransform(scrollY, [0, 600], [0, 40]);
  const lineParallaxX = useTransform(scrollY, [0, 600], [0, -50]);

  // Dynamic helper to match cover aspect ratio to original image dimensions
  const getProjectRatio = (id) => {
    if (id === 'logo-design') return '2/1';
    if (id === 'commercial-branding') return '16/9';
    return '3/2'; // Default ratio for general campaign JPEGs
  };

  // Framer Motion Animation Variants
  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const imageRevealVariants = {
    hidden: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.15 },
    visible: {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }
    }
  };

  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.4,
      scale: 1,
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.4 }
    }
  };

  const projectItemVariants = {
    initial: {},
    hover: {}
  };

  const titleHoverVariants = {
    initial: { x: 0 },
    hover: { x: 12, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const arrowHoverVariants = {
    initial: { x: 0, y: 0 },
    hover: { x: 5, y: -5, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const gradientHoverVariants = {
    initial: { opacity: 0.3, scale: 0.98 },
    hover: { opacity: 0.55, scale: 1.01, transition: { duration: 0.4 } }
  };

  // Interactive Skill Animation Variants
  const skillItemVariants = {
    initial: { scale: 1, backgroundColor: '#FAF9F6', borderColor: '#E2E1DD', color: '#121212' },
    hover: { 
      scale: 1.05, 
      backgroundColor: '#121212', 
      borderColor: '#121212',
      color: '#FAF9F6', 
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const projectTypes = ['Branding', 'UI Design', 'Social Media', 'Layout Composition'];

  // Handle Form mailto redirect fallback submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const emailSubject = `Design Inquiry: ${projectType} - from ${name}`;
    const emailBody = `Hi Nihal,\n\nMy name is ${name} (${email}).\n\nI would like to collaborate with you on a ${projectType} project.\n\nProject Brief:\n${message}\n\nBest regards,\n${name}`;
    
    // Redirect to mailto URL
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    setSubmitted(true);
    // Reset fields after delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      style={{ overflow: 'hidden' }}
    >
      {/* ================= HERO SECTION ================= */}
      <section 
        id="hero" 
        style={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '4rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        {/* Architectural Fine Grid Lines */}
        <div className="fine-line fine-line-vert" style={{ left: '15%', top: 0 }} />
        <motion.div 
          className="fine-line fine-line-vert" 
          style={{ right: '35%', top: 0, x: lineParallaxX }} 
        />
        <div className="fine-line fine-line-horiz" style={{ top: '30%', left: 0 }} />
        <div className="fine-line fine-line-horiz" style={{ bottom: '20%', left: 0 }} />

        <div className="portfolio-container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="asymmetrical-grid" style={{ alignItems: 'center', gap: '3rem' }}>
            
            {/* Left Column: Typographic Exhibition */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 2 }}>
              {/* Top Meta Label */}
              <div style={{ overflow: 'hidden' }}>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                >
                  <span className="section-label" style={{ letterSpacing: '0.2em' }}>portfolio exhibition v2.0</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Malappuram, Kakkad</span>
                </motion.div>
              </div>

              {/* Oversized Editorial Heading */}
              <motion.h1
                variants={headingContainerVariants}
                style={{
                  fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.05em',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                <div className="reveal-text-mask">
                  <motion.span variants={lineVariants} style={{ display: 'block' }}>Creative</motion.span>
                </div>
                <div className="reveal-text-mask" style={{ color: 'var(--text-secondary)' }}>
                  <motion.span variants={lineVariants} style={{ display: 'block', fontStyle: 'italic', fontWeight: 300 }}>Graphic</motion.span>
                </div>
                <div className="reveal-text-mask">
                  <motion.span variants={lineVariants} style={{ display: 'block' }}>Designer</motion.span>
                </div>
              </motion.h1>

              {/* Supporting Statement based directly on CV */}
              <motion.div variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p 
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.7,
                    maxWidth: '480px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Specializing in visual content, layout composition, branding, and social media design. Bringing hands-on design experience across digital marketing, e-commerce, real estate, and sports brands.
                </p>

                {/* Subtext Fine Line Separator */}
                <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--text-primary)' }} />
                
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>core competencies</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>Identity, Compositions, Marketing UI</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>availability</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>Independent Projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Parallax moving background overlay text */}
              <motion.div 
                className="watermark-text"
                style={{
                  position: 'absolute',
                  top: '-40%',
                  left: '-10%',
                  y: textParallaxY,
                  zIndex: -1
                }}
              >
                Nampy
              </motion.div>
            </div>

            {/* Right Column: Layered Portrait & Mask Reveal */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              
              {/* Blurred pastel gradient shape behind image */}
              <motion.div 
                variants={decorativeVariants}
                style={{
                  position: 'absolute',
                  width: '110%',
                  height: '110%',
                  background: 'var(--grad-lavender)',
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  filter: 'blur(50px)',
                  top: '-5%',
                  left: '-5%',
                  zIndex: 0
                }}
              />

              {/* Asymmetric Metadata Tag Layer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                style={{
                  position: 'absolute',
                  right: '-10%',
                  top: '15%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '10px 18px',
                  borderRadius: '2px',
                  zIndex: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>
                  Visual Coordinates
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  11.0722° N, 76.0740° E
                </span>
              </motion.div>

              {/* Secondary metadata tag under image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                style={{
                  position: 'absolute',
                  left: '-5%',
                  bottom: '10%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '8px 14px',
                  borderRadius: '2px',
                  zIndex: 3,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50', animation: 'pulse 2s infinite' }} />
                <span>Fact-Checked Portfolio</span>
              </motion.div>

              {/* Main Portrait Frame - adjusted to 1:1 ratio to prevent cropping Nihal's face */}
              <motion.div 
                variants={imageRevealVariants}
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  aspectRatio: '1/1', // Adjusted to 1/1 square for hero portrait
                  overflow: 'hidden',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  zIndex: 2,
                  y: imageParallaxY,
                  position: 'relative'
                }}
              >
                <img 
                  src={personalInfo.portraitImage} 
                  alt="Nihal PM Professional Portrait"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center' // Centered vertically and horizontally
                  }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CREATIVE SCROLLING MARQUEE ================= */}
      <section className="marquee-container" style={{ zIndex: 5 }}>
        <div className="marquee-content">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="marquee-item">
                <span>Graphic Design</span>
                <span className="marquee-separator" />
                <span>Branding</span>
                <span className="marquee-separator" />
                <span>UI Design</span>
                <span className="marquee-separator" />
                <span>Social Media</span>
                <span className="marquee-separator" />
                <span>Visual Communication</span>
              </div>
              <div className="marquee-separator" style={{ alignSelf: 'center' }} />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ================= SELECTED WORK SECTION ================= */}
      <section 
        id="work" 
        className="portfolio-container" 
        style={{ 
          paddingTop: '6rem', 
          paddingBottom: '6rem',
          position: 'relative',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
          <div>
            <span className="section-label">Selected Exhibitions</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Design Case Studies
            </h2>
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            ({projects.length} PROJECTS)
          </span>
        </div>

        {/* Asymmetrical Staggered Work Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const projectNumber = `0${idx + 1}`;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative'
                }}
              >
                {/* Horizontal Section Line Divider */}
                <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', position: 'absolute', top: '-4rem', left: 0 }} />

                <motion.div
                  variants={projectItemVariants}
                  initial="initial"
                  whileHover="hover"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isEven ? '1.3fr 0.7fr' : '0.7fr 1.3fr',
                    gap: '5rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Image Frame (Order shifts based on Index) */}
                  <div style={{ order: isEven ? 0 : 1, position: 'relative' }}>
                    {/* Hover Glow Background Gradient */}
                    <motion.div 
                      variants={gradientHoverVariants}
                      style={{
                        position: 'absolute',
                        inset: '-15px',
                        background: idx % 3 === 0 ? 'var(--grad-pale-blue)' : idx % 3 === 1 ? 'var(--grad-soft-pink)' : 'var(--grad-warm-peach)',
                        borderRadius: '10px',
                        zIndex: -1,
                        filter: 'blur(16px)'
                      }}
                    />
                    
                    <Link to={`/project/${project.id}`} data-cursor="VIEW">
                      {/* Container aspect ratio matched dynamically to image natural ratios */}
                      <div 
                        style={{
                          overflow: 'hidden',
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          aspectRatio: getProjectRatio(project.id), // Dynamic Aspect Ratio
                          backgroundColor: 'var(--bg-secondary)',
                          position: 'relative'
                        }}
                      >
                        <motion.img 
                          src={project.coverImage} 
                          alt={project.title}
                          loading="lazy" 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center center' // Centered mapping
                          }}
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Asymmetrical Text Panel details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}>
                    
                    {/* Large Project Numbering */}
                    <div 
                      style={{ 
                        fontFamily: 'var(--font-heading)', 
                        fontSize: '3rem', 
                        fontWeight: 300, 
                        color: 'var(--border-color)',
                        lineHeight: 1
                      }}
                    >
                      {projectNumber}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span 
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          color: 'var(--text-secondary)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {project.category}
                      </span>
                      
                      <h3 style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                        <Link to={`/project/${project.id}`} className="clickable" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                          <motion.span variants={titleHoverVariants} style={{ display: 'inline-block' }}>
                            {project.title}
                          </motion.span>
                          <motion.span variants={arrowHoverVariants} style={{ display: 'inline-block' }}>
                            <ArrowUpRight size={28} />
                          </motion.span>
                        </Link>
                      </h3>
                    </div>

                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.65 }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '4px 10px',
                            borderRadius: '2px',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <Link to={`/project/${project.id}`} className="btn-editorial" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                      Explore Case Study <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section 
        id="experience" 
        className="portfolio-container" 
        style={{ 
          paddingTop: '6rem',
          paddingBottom: '6rem',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="asymmetrical-grid">
          {/* Left Column: Title and vertical timeline track */}
          <div style={{ position: 'relative' }}>
            <span className="section-label">02 / HISTORY</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
              Work Timeline
            </h2>
            
            {/* Fine architectural line grid */}
            <div className="fine-line fine-line-vert" style={{ left: '0', top: '7.5rem', height: 'calc(100% - 6rem)' }} />
          </div>

          {/* Right Column: Modern Vertical Editorial Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {personalInfo.experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.5rem',
                  position: 'relative',
                  paddingLeft: '2.5rem'
                }}
              >
                {/* Visual Node Dot on vertical timeline track */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '-2.75rem', 
                    top: '0.5rem', 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: 'var(--text-primary)', 
                    borderRadius: '50%',
                    border: '4px solid var(--bg-primary)',
                    boxShadow: '0 0 0 1px var(--text-primary)'
                  }} 
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {exp.company}
                    </h4>
                  </div>
                  <span 
                    style={{ 
                      fontSize: '0.85rem', 
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '4px 12px',
                      borderRadius: '2px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* CV-supported Experience Details */}
                <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {exp.bullets.map((bullet, idx) => (
                    <li 
                      key={idx} 
                      style={{ 
                        fontSize: '0.95rem', 
                        color: 'var(--text-secondary)',
                        position: 'relative',
                        paddingLeft: '1.25rem',
                        lineHeight: 1.6
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, top: '8px', width: '4px', height: '4px', backgroundColor: 'var(--text-primary)', borderRadius: '50%' }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT & SKILLS SECTION ================= */}
      <section 
        id="about" 
        className="portfolio-container" 
        style={{ 
          paddingTop: '6rem',
          paddingBottom: '6rem',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="asymmetrical-grid">
          {/* Left Column: Editorial biography & Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            <div>
              <span className="section-label">03 / CREATOR</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                About Nihal PM
              </h2>
              
              {/* Refactored Bio */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>
                  A dedicated Graphic Designer with a comprehensive background in layout composition, visual packaging, and digital branding solutions.
                </p>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  With hands-on experience in visual design for e-commerce, digital marketing, sports campaigns, and real estate, my focus is delivering cohesive, polished assets. Experienced working in agile environments to build and preserve brand integrity.
                </p>
              </div>
            </div>

            {/* Asymmetrical Portrait Image - adjusted to 1:1 ratio to prevent head/face cropping */}
            <div 
              style={{
                width: '100%',
                maxHeight: '400px', // Increased maxHeight to match square shape
                aspectRatio: '1/1', // Adjusted to 1/1 square
                overflow: 'hidden',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <img 
                src={personalInfo.heroImage} 
                alt="Graphic Design Portfolio Visual Work"
                loading="lazy" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '4px 10px',
                  borderRadius: '1px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Visual Art Showcase
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Languages</h3>
              <div style={{ display: 'flex', gap: '2rem' }}>
                {personalInfo.languages.map((lang) => (
                  <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Typographic Skills */}
            <div>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Core Expertises</h3>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} role="list" aria-label="Skills cloud list">
                {personalInfo.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={skillItemVariants}
                    initial="initial"
                    whileHover="hover"
                    role="listitem"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      padding: '8px 18px',
                      borderRadius: '2px',
                      border: '1px solid',
                      cursor: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{skill}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education & Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', paddingLeft: '2rem' }}
          >
            {/* Education Sub-section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <BookOpen size={20} aria-hidden="true" />
                <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>Education</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {personalInfo.education.map((edu, idx) => (
                  <div key={idx} style={{ position: 'relative', borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                    <div style={{ position: 'absolute', left: '-6px', top: '4px', width: '10px', height: '10px', backgroundColor: 'var(--text-primary)', borderRadius: '50%' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{edu.years}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', margin: '0.2rem 0' }}>{edu.degree}</h4>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{edu.institution}</p>
                    {edu.details && <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{edu.details}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Sub-section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Award size={20} aria-hidden="true" />
                <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>Certifications</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {personalInfo.certifications.map((cert, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      alignItems: 'flex-start',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '1rem',
                      borderRadius: '2px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <Award size={18} style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section 
        id="contact" 
        className="portfolio-container" 
        style={{ 
          paddingTop: '6rem',
          paddingBottom: '6rem'
        }}
      >
        <div className="asymmetrical-grid" style={{ gap: '5rem' }}>
          
          {/* Left Column: CTA Statement & Direct Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">04 / DIALOGUE</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
              Let's create<br />something meaningful.
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3.5rem' }}>
              <a href={`mailto:${personalInfo.email}`} className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }} aria-label={`Email Nihal at ${personalInfo.email}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <Mail size={18} aria-hidden="true" />
                </div>
                <span>{personalInfo.email}</span>
              </a>

              <a href={`tel:${personalInfo.phone.replace(/ /g, '')}`} className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }} aria-label={`Call Nihal at ${personalInfo.phone}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <Phone size={18} aria-hidden="true" />
                </div>
                <span>{personalInfo.phone}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with select-pills & mailto redirect */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              padding: '3rem 2.5rem', 
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Send a Message</h3>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleContactSubmit}>
              
              {/* Name Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="form-name" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  id="form-name"
                  type="text" 
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.8rem 1rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Email Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="form-email" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  id="form-email"
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.8rem 1rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Project Type selector pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Project Type</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} role="group" aria-label="Select inquiry project type">
                  {projectTypes.map((type) => {
                    const isSelected = projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        aria-pressed={isSelected}
                        style={{
                          backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--bg-primary)',
                          color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                          border: isSelected ? '1px solid var(--text-primary)' : '1px solid var(--border-color)',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'none',
                          transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease'
                        }}
                        className="clickable"
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="form-message" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Message</label>
                <textarea 
                  id="form-message"
                  rows={4}
                  required
                  placeholder="Describe your design project requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.8rem 1rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA Button */}
              <button 
                type="submit"
                className="clickable"
                disabled={submitted}
                aria-label={submitted ? "Message sent" : "Submit contact form"}
                style={{
                  backgroundColor: submitted ? '#4CAF50' : 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  padding: '1rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  marginTop: '0.5rem',
                  cursor: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {submitted ? (
                  <>Sent Successfully <Check size={18} aria-hidden="true" /></>
                ) : (
                  <>Send Message <Send size={16} aria-hidden="true" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= PREMIUM MINIMAL FOOTER ================= */}
      <footer 
        className="portfolio-container"
        style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '4rem', 
          paddingBottom: '3rem',
          display: 'flex', 
          flexDirection: 'column',
          gap: '3rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          
          {/* Logo brand & closing statement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
              NIHAL PM
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Graphic Designer & Visual Artist.
            </p>
            <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              "Creativity Never Stops."
            </p>
          </div>

          {/* Quick links loops */}
          <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
            {/* Sitemap Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} aria-label="Footer navigation">
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                Navigation
              </span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Home</button>
              <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">About</button>
              <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Work</button>
              <button onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Experience</button>
              <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Contact</button>
            </nav>

            {/* Clickable social items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                Social Connections
              </span>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                WhatsApp <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a 
                href={socialLinks.instagram || '#'} 
                target={socialLinks.instagram ? "_blank" : undefined} 
                rel={socialLinks.instagram ? "noopener noreferrer" : undefined} 
                className="clickable" 
                style={{ fontSize: '0.85rem', fontWeight: 700, opacity: socialLinks.instagram ? 1 : 0.4 }}
              >
                Instagram
              </a>
              <a 
                href={socialLinks.linkedin || '#'} 
                target={socialLinks.linkedin ? "_blank" : undefined} 
                rel={socialLinks.linkedin ? "noopener noreferrer" : undefined} 
                className="clickable" 
                style={{ fontSize: '0.85rem', fontWeight: 700, opacity: socialLinks.linkedin ? 1 : 0.4 }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Closing Copyright bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} NIHAL PM. All rights reserved. Fact-Checked Profile.
          </span>
          <a href={`mailto:${personalInfo.email}`} className="clickable" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }} aria-label={`Email Nihal PM at ${personalInfo.email}`}>
            {personalInfo.email}
          </a>
        </div>
      </footer>
      
      {/* Dynamic pulse keyframe and layouts styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(76, 175, 80, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
        @media (max-width: 900px) {
          .asymmetrical-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          #about .asymmetrical-grid > div:last-child {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
