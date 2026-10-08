import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  Send, 
  Check, 
  Code, 
  Terminal, 
  Palette, 
  Sparkles, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { personalInfo, projects } from '../data/portfolioData';
import { socialLinks } from '../data/socialLinks';

export default function Home() {
  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('MERN Stack Project');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Project Filtering State: 'all' | 'code' | 'design'
  const [activeFilter, setActiveFilter] = useState('all');

  // Interactive Code Snippet Tab: 'api' | 'component'
  const [activeCodeTab, setActiveCodeTab] = useState('api');

  // Setup Scroll-Linked Parallax Animations
  const { scrollY } = useScroll();
  const textParallaxY = useTransform(scrollY, [0, 600], [0, -100]);
  const imageParallaxY = useTransform(scrollY, [0, 600], [0, 40]);
  const lineParallaxX = useTransform(scrollY, [0, 600], [0, -50]);

  // Aspect ratio helper
  const getProjectRatio = (id) => {
    if (id === 'logo-design') return '2/1';
    if (id === 'commercial-branding' || id === 'nampy-research-lab' || id === 'le-cygnex-agency' || id === 'digimpc-technologies' || id === 'salafi-library-karimbil' || id === 'mpc-document-service') return '16/9';
    return '3/2';
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.type === activeFilter;
  });

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

  const skillItemVariants = {
    initial: { scale: 1, backgroundColor: '#FAF9F6', borderColor: '#E2E1DD', color: '#121212' },
    hover: { 
      scale: 1.04, 
      backgroundColor: '#121212', 
      borderColor: '#121212',
      color: '#FAF9F6', 
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const projectTypes = [
    'MERN Stack Project', 
    'Full-Stack Web App', 
    'React Frontend', 
    'Brand Identity & Logo', 
    'Graphic Design & Ads'
  ];

  // Handle Form mailto redirect fallback submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const emailSubject = `Inquiry: ${projectType} - from ${name}`;
    const emailBody = `Hi Nihal,\n\nMy name is ${name} (${email}).\n\nI would like to collaborate on a ${projectType}.\n\nProject Requirements:\n${message}\n\nBest regards,\n${name}`;
    
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const scrollToSectionWithFilter = (filterType) => {
    setActiveFilter(filterType);
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        <div className="fine-line fine-line-vert" style={{ left: '12%', top: 0 }} />
        <motion.div 
          className="fine-line fine-line-vert" 
          style={{ right: '35%', top: 0, x: lineParallaxX }} 
        />
        <div className="fine-line fine-line-horiz" style={{ top: '28%', left: 0 }} />
        <div className="fine-line fine-line-horiz" style={{ bottom: '18%', left: 0 }} />

        <div className="portfolio-container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="asymmetrical-grid" style={{ alignItems: 'center', gap: '3.5rem' }}>
            
            {/* Left Column: Typographic Exhibition */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 2 }}>
              
              {/* Top Meta Label */}
              <div style={{ overflow: 'hidden' }}>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <span className="section-label" style={{ letterSpacing: '0.15em', color: 'var(--text-primary)', fontWeight: 700 }}>
                    MERN DEVELOPER &amp; DESIGNER
                  </span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Malappuram, Kerala
                  </span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    backgroundColor: 'var(--bg-secondary)', 
                    padding: '2px 8px', 
                    borderRadius: '2px',
                    border: '1px solid var(--border-color)',
                    color: '#2E7D32',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4CAF50' }} />
                    Available for Work
                  </span>
                </motion.div>
              </div>

              {/* Oversized Editorial Heading */}
              <motion.h1
                variants={headingContainerVariants}
                style={{
                  fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
                  lineHeight: 0.96,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.05em',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                <div className="reveal-text-mask">
                  <motion.span variants={lineVariants} style={{ display: 'block' }}>
                    MERN Developer
                  </motion.span>
                </div>
                <div className="reveal-text-mask" style={{ color: 'var(--text-secondary)' }}>
                  <motion.span variants={lineVariants} style={{ display: 'block', fontStyle: 'italic', fontWeight: 300 }}>
                    &amp; Creative
                  </motion.span>
                </div>
                <div className="reveal-text-mask">
                  <motion.span variants={lineVariants} style={{ display: 'block' }}>
                    Designer
                  </motion.span>
                </div>
              </motion.h1>

              {/* Supporting Statement based directly on dual profile */}
              <motion.div variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <p 
                  style={{
                    fontSize: '1.12rem',
                    lineHeight: 1.7,
                    maxWidth: '520px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Architecting full-stack web applications with <strong style={{ color: 'var(--text-primary)' }}>MongoDB, Express, React, and Node.js</strong>, coupled with precision <strong style={{ color: 'var(--text-primary)' }}>graphic design, brand identity, and UI/UX systems</strong>. Bridging high-performance code with memorable visual artistry.
                </p>

                {/* Subtext Fine Line Separator */}
                <div style={{ width: '80px', height: '1px', backgroundColor: 'var(--text-primary)' }} />
                
                {/* Dual Competency Snapshot */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '500px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Terminal size={12} /> Full-Stack Engineering
                    </span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      React, Node, Express, MongoDB, REST APIs, Redux
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Palette size={12} /> Visual Brand Artistry
                    </span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      Photoshop, Illustrator, Figma, Brand Identity, UI
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button 
                    onClick={() => scrollToSectionWithFilter('code')}
                    className="clickable"
                    style={{
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      padding: '12px 22px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'none'
                    }}
                  >
                    <Code size={16} /> MERN Projects
                  </button>

                  <button 
                    onClick={() => scrollToSectionWithFilter('design')}
                    className="clickable"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '12px 22px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'none'
                    }}
                  >
                    <Palette size={16} /> Design Work
                  </button>

                  <a 
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clickable"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '12px 18px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <GithubIcon size={16} /> GitHub
                  </a>
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
                MERN
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

              {/* Asymmetric Metadata Tag Layer: Tech stack badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                style={{
                  position: 'absolute',
                  right: '-8%',
                  top: '12%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '12px 18px',
                  borderRadius: '2px',
                  zIndex: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={14} style={{ color: '#00ED64' }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    Core Stack
                  </span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', display: 'block', marginTop: '2px' }}>
                  M • E • R • N
                </span>
              </motion.div>

              {/* Secondary metadata tag under image: Creative badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                style={{
                  position: 'absolute',
                  left: '-8%',
                  bottom: '8%',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '10px 16px',
                  borderRadius: '2px',
                  zIndex: 3,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                }}
              >
                <Palette size={14} style={{ color: '#FF7A00' }} />
                <span>Graphic &amp; UI Artist</span>
              </motion.div>

              {/* Main Portrait Frame - 1:1 square ratio */}
              <motion.div 
                variants={imageRevealVariants}
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  aspectRatio: '1/1',
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
                  alt="Nihal PM — MERN Developer & Graphic Designer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center'
                  }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= DUAL-DISCIPLINE SCROLLING MARQUEE ================= */}
      <section className="marquee-container" style={{ zIndex: 5 }}>
        <div className="marquee-content">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="marquee-item">
                <span>MERN Stack</span>
                <span className="marquee-separator" />
                <span>React.js</span>
                <span className="marquee-separator" />
                <span>Graphic Design</span>
                <span className="marquee-separator" />
                <span>Node.js &amp; Express</span>
                <span className="marquee-separator" />
                <span>Brand Identity</span>
                <span className="marquee-separator" />
                <span>MongoDB</span>
                <span className="marquee-separator" />
                <span>Adobe Photoshop</span>
                <span className="marquee-separator" />
                <span>REST APIs</span>
                <span className="marquee-separator" />
                <span>Adobe Illustrator</span>
                <span className="marquee-separator" />
                <span>UI/UX Architecture</span>
              </div>
              <div className="marquee-separator" style={{ alignSelf: 'center' }} />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ================= SELECTED WORK SECTION WITH CATEGORY FILTER ================= */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
          <div>
            <span className="section-label">01 / PORTFOLIO EXHIBITIONS</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
              Selected Projects
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              backgroundColor: 'var(--bg-secondary)', 
              padding: '4px', 
              borderRadius: '30px',
              border: '1px solid var(--border-color)',
              flexWrap: 'wrap'
            }}
            role="tablist"
            aria-label="Filter portfolio by discipline"
          >
            <button
              onClick={() => setActiveFilter('all')}
              role="tab"
              aria-selected={activeFilter === 'all'}
              className="clickable"
              style={{
                backgroundColor: activeFilter === 'all' ? 'var(--text-primary)' : 'transparent',
                color: activeFilter === 'all' ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              All Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveFilter('code')}
              role="tab"
              aria-selected={activeFilter === 'code'}
              className="clickable"
              style={{
                backgroundColor: activeFilter === 'code' ? 'var(--text-primary)' : 'transparent',
                color: activeFilter === 'code' ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.25s ease'
              }}
            >
              <Terminal size={14} /> MERN &amp; Code ({projects.filter(p => p.type === 'code').length})
            </button>

            <button
              onClick={() => setActiveFilter('design')}
              role="tab"
              aria-selected={activeFilter === 'design'}
              className="clickable"
              style={{
                backgroundColor: activeFilter === 'design' ? 'var(--text-primary)' : 'transparent',
                color: activeFilter === 'design' ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.25s ease'
              }}
            >
              <Palette size={14} /> Graphic Design ({projects.filter(p => p.type === 'design').length})
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}
          >
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              const projectNumber = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
              const isCodeProject = project.type === 'code';

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'relative' }}
                >
                  {/* Horizontal Section Line Divider */}
                  <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', position: 'absolute', top: '-4rem', left: 0 }} />

                  <motion.div
                    variants={{
                      initial: {},
                      hover: {}
                    }}
                    initial="initial"
                    whileHover="hover"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isEven ? '1.3fr 0.7fr' : '0.7fr 1.3fr',
                      gap: '4.5rem',
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
                          background: isCodeProject 
                            ? 'linear-gradient(135deg, rgba(0, 237, 100, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)'
                            : idx % 2 === 0 ? 'var(--grad-pale-blue)' : 'var(--grad-soft-pink)',
                          borderRadius: '12px',
                          zIndex: -1,
                          filter: 'blur(20px)'
                        }}
                      />
                      
                      <Link to={`/project/${project.id}`} data-cursor="VIEW">
                        <div 
                          style={{
                            overflow: 'hidden',
                            borderRadius: '6px',
                            border: '1px solid var(--border-color)',
                            aspectRatio: getProjectRatio(project.id),
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
                              objectPosition: 'center center'
                            }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          />

                          {/* Top-right Type badge */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '1rem',
                              right: '1rem',
                              backgroundColor: 'rgba(18, 18, 18, 0.85)',
                              color: '#FAF9F6',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.15)'
                            }}
                          >
                            {isCodeProject ? (
                              <><Terminal size={12} color="#00ED64" /> MERN App</>
                            ) : (
                              <><Palette size={12} color="#FF7A00" /> Brand Identity</>
                            )}
                          </div>
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
                            color: isCodeProject ? '#1976D2' : 'var(--text-secondary)',
                            textTransform: 'uppercase'
                          }}
                        >
                          {project.category}
                        </span>
                        
                        <h3 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
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

                      <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.65 }}>
                        {project.description}
                      </p>

                      {/* Tech stack / Tools pills */}
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              backgroundColor: 'var(--bg-secondary)',
                              padding: '4px 10px',
                              borderRadius: '2px',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                        <Link to={`/project/${project.id}`} className="btn-editorial">
                          Case Study <ArrowUpRight size={16} />
                        </Link>

                        {project.liveDemo && (
                          <a 
                            href={project.liveDemo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="clickable"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              padding: '6px 14px',
                              border: '1px solid var(--border-color)',
                              borderRadius: '2px',
                              backgroundColor: 'var(--bg-secondary)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <ExternalLink size={13} /> Live Site
                          </a>
                        )}

                        {isCodeProject && project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="clickable"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: 'var(--text-secondary)',
                              padding: '6px 12px',
                              border: '1px solid var(--border-color)',
                              borderRadius: '2px',
                              backgroundColor: 'var(--bg-primary)'
                            }}
                          >
                            <GithubIcon size={14} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ================= EXPERIENCE & TIMELINE SECTION ================= */}
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
            <span className="section-label">02 / CAREER TRAJECTORY</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
              Work Timeline
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '360px', lineHeight: 1.7, marginBottom: '2rem' }}>
              Hands-on experience delivering full-stack web applications and visual brand campaigns for agile agencies, startups, and private clients.
            </p>
            
            <div className="fine-line fine-line-vert" style={{ left: '0', top: '9.5rem', height: 'calc(100% - 8rem)' }} />
          </div>

          {/* Right Column: Modern Vertical Editorial Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
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
                  gap: '1.25rem',
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
                    <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15 }}>{exp.role}</h3>
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
                      <span style={{ position: 'absolute', left: 0, top: '9px', width: '5px', height: '5px', backgroundColor: 'var(--text-primary)', borderRadius: '50%' }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT & DUAL-SKILL MATRIX SECTION ================= */}
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
          
          {/* Left Column: Editorial Biography & Dual Matrix Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            <div>
              <span className="section-label">03 / CREATOR &amp; ENGINEER</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                About Nihal PM
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>
                  A multidisciplinary MERN Stack Developer and Graphic Designer driven by clean architecture and striking visual aesthetics.
                </p>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {personalInfo.aboutMe}
                </p>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Understanding both full-stack engineering logic and design principles enables me to write cleaner, more maintainable code that directly honors the design system — turning design mockups into responsive, high-performance web applications without friction.
                </p>
              </div>
            </div>

            {/* Asymmetrical Portrait Image */}
            <div 
              style={{
                width: '100%',
                aspectRatio: '1/1',
                overflow: 'hidden',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <img 
                src={personalInfo.heroImage} 
                alt="Nihal PM Studio Showcase"
                loading="lazy" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '6px 12px',
                  borderRadius: '1px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={12} /> Full-Stack &amp; Design Practice
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Languages</h3>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {personalInfo.languages.map((lang) => (
                  <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dual Skills Showcase & Code Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', paddingLeft: '1rem' }}
          >
            {/* Section 1: MERN Stack Skills */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Terminal size={22} aria-hidden="true" style={{ color: '#00ED64' }} />
                <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                  MERN &amp; Coding Stack
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {personalInfo.mernSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillItemVariants}
                    initial="initial"
                    whileHover="hover"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      padding: '8px 14px',
                      borderRadius: '2px',
                      border: '1px solid var(--border-color)',
                      cursor: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{skill.name}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.6, textTransform: 'uppercase' }}>{skill.category}</span>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Code Preview Box */}
              <div 
                style={{
                  backgroundColor: '#111216',
                  borderRadius: '6px',
                  border: '1px solid #23262F',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                }}
              >
                {/* Window header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid #23262F', backgroundColor: '#181A20' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setActiveCodeTab('api')}
                      style={{
                        background: activeCodeTab === 'api' ? '#23262F' : 'transparent',
                        border: 'none',
                        color: activeCodeTab === 'api' ? '#FAF9F6' : '#8A8F98',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'none'
                      }}
                    >
                      server.js (Express + Mongoose)
                    </button>
                    <button 
                      onClick={() => setActiveCodeTab('component')}
                      style={{
                        background: activeCodeTab === 'component' ? '#23262F' : 'transparent',
                        border: 'none',
                        color: activeCodeTab === 'component' ? '#FAF9F6' : '#8A8F98',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'none'
                      }}
                    >
                      ProductCard.jsx (React)
                    </button>
                  </div>
                </div>

                {/* Code body */}
                <div style={{ padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6, color: '#E1E4EA', overflowX: 'auto' }}>
                  <pre style={{ margin: 0 }}>
                    <code>
                      {activeCodeTab === 'api' 
                        ? `// Express.js & Mongoose REST API Controller
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Query catalog with projection
router.get('/', async (req, res) => {
  try {
    const items = await Product.find({ inStock: true })
      .select('title price category stock thumbnail')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve catalog' });
  }
});

module.exports = router;`
                        : `// React 19 Component with Cart Management
import React from 'react';

export default function ProductCard({ product, onAddToCart, isSaved }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">\${product.price.toFixed(2)}</p>
      <button 
        onClick={() => onAddToCart(product.id)}
        className={isSaved ? 'btn-active' : 'btn-default'}
      >
        {isSaved ? 'In Cart' : 'Add To Cart'}
      </button>
    </div>
  );
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Section 2: Graphic & UI Design Skills */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Palette size={22} aria-hidden="true" style={{ color: '#FF7A00' }} />
                <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                  Graphic &amp; Visual Design
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                {personalInfo.designSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillItemVariants}
                    initial="initial"
                    whileHover="hover"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      padding: '8px 14px',
                      borderRadius: '2px',
                      border: '1px solid var(--border-color)',
                      cursor: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{skill.name}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.6, textTransform: 'uppercase' }}>{skill.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Section 3: Certifications */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Award size={22} aria-hidden="true" />
                <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                  Credentials &amp; Certifications
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {personalInfo.certifications.map((cert, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      alignItems: 'center',
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '1rem',
                      borderRadius: '2px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: '#2E7D32', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Education */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <BookOpen size={22} aria-hidden="true" />
                <h3 style={{ fontSize: '1.45rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                  Education
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
            <span className="section-label">04 / COLLABORATION</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
              Let's engineer &amp;<br />design together.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '440px' }}>
              Whether you need a full-stack MERN application built from scratch, clean RESTful backend APIs, or high-impact brand design collaterals, I'm ready to bring your vision to life.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
              <a href={`mailto:${personalInfo.email}`} className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }} aria-label={`Email Nihal at ${personalInfo.email}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <Mail size={18} aria-hidden="true" />
                </div>
                <span>{personalInfo.email}</span>
              </a>

              <a href={`tel:${personalInfo.phone.replace(/ /g, '')}`} className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }} aria-label={`Call Nihal at ${personalInfo.phone}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <Phone size={18} aria-hidden="true" />
                </div>
                <span>{personalInfo.phone}</span>
              </a>

              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="clickable" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <GithubIcon size={18} aria-hidden="true" />
                </div>
                <span>github.com/Nihalpm123</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
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
            <h3 style={{ fontSize: '1.35rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Send a Message</h3>
            
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
                    padding: '0.85rem 1rem',
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
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.85rem 1rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Project Type selector pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Inquiry Scope</span>
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
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'none',
                          transition: 'all 0.2s ease'
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
                  placeholder="Share details regarding your web application, coding requirement, or design project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.85rem 1rem',
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
                  padding: '1.1rem',
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

      {/* ================= EDITORIAL FOOTER ================= */}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '340px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
              NIHAL PM
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              MERN Stack Developer &amp; Graphic Designer.
            </p>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              "Engineering resilient code while honoring high-impact visual design."
            </p>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
            {/* Sitemap Navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} aria-label="Footer navigation">
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                Navigation
              </span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Home</button>
              <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Work</button>
              <button onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Experience</button>
              <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">About &amp; Skills</button>
              <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', textTransform: 'uppercase', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600 }} className="clickable">Contact</button>
            </nav>

            {/* Social connections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                Connect Online
              </span>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                GitHub <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                WhatsApp <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Instagram <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Closing Copyright bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} NIHAL PM. MERN Stack Developer &amp; Graphic Designer.
          </span>
          <a href={`mailto:${personalInfo.email}`} className="clickable" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }} aria-label={`Email Nihal PM at ${personalInfo.email}`}>
            {personalInfo.email}
          </a>
        </div>
      </footer>
      
      {/* Keyframe and layout styles */}
      <style>{`
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
