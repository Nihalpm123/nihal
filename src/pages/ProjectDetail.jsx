import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CornerDownRight, 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import GithubIcon from '../components/GithubIcon';
import { projects } from '../data/portfolioData';

export default function ProjectDetail() {
  const { id } = useParams();

  // Find index of current project
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  // Dynamic helper to match aspect ratios to natural image shapes
  const getProjectRatio = (projectId) => {
    if (projectId === 'logo-design') return '2/1';
    if (projectId === 'commercial-branding' || projectId === 'nampy-research-lab' || projectId === 'le-cygnex-agency' || projectId === 'digimpc-technologies' || projectId === 'salafi-library-karimbil' || projectId === 'mpc-document-service') return '16/9';
    return '3/2';
  };

  // If project not found
  if (!project) {
    return (
      <div 
        className="portfolio-container" 
        style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '2rem' 
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>CASE STUDY NOT FOUND</h2>
        <Link to="/" className="btn-editorial" aria-label="Go back to the homepage">
          <ArrowLeft size={18} /> Return to Home
        </Link>
      </div>
    );
  }

  // Find next & previous projects (loops cleanly over active projects)
  const nextProjectIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];
  
  const prevProjectIndex = (projectIndex - 1 + projects.length) % projects.length;
  const prevProject = projects[prevProjectIndex];

  const isCodeProject = project.type === 'code';

  // Dynamic layout renderer for visual galleries based on project shapes
  const renderVisualGallery = () => {
    if (isCodeProject) return null;

    switch (project.id) {
      case 'logo-design':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div className="gallery-frame" style={{ aspectRatio: '2/1', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[0]} alt="Hitra Dates and Nuts logomark detail" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="gallery-frame" style={{ aspectRatio: '2/1', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[1]} alt="Bullseye Marketing Agency negative space logomark" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="gallery-frame" style={{ width: '100%', aspectRatio: '2/1', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <img src={project.gallery[2]} alt="Fry Day Fried Chicken brand logomark composition" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        );

      case 'commercial-branding':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div className="gallery-frame" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[0]} alt="Event tent branding mockup" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="gallery-frame" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[1]} alt="Branding visual guidelines page overview" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            
            <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div className="gallery-frame" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[2]} alt="Corporate guideline design rulebook details" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="gallery-frame" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[3]} alt="Polo shirt and caps apparel visual guidelines" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div className="gallery-frame" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <img src={project.gallery[4]} alt="Bus station advertising board packaging mockup" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        );

      case 'le-cygnex':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div className="gallery-frame" style={{ aspectRatio: '3/2', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[0]} alt="Le Cygnex digital banner campaign mockup" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="gallery-frame" style={{ aspectRatio: '3/2', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <img src={project.gallery[1]} alt="Le Cygnex social media content template" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="gallery-frame" style={{ width: '100%', aspectRatio: '3/2', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <img src={project.gallery[2]} alt="Le Cygnex visual compositions collage overview" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        );

      default:
        if (!project.gallery || project.gallery.length === 0) return null;
        return (
          <div className="project-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {project.gallery.map((image, idx) => (
              <div 
                key={idx} 
                className="gallery-frame"
                style={{ 
                  aspectRatio: getProjectRatio(project.id), 
                  overflow: 'hidden', 
                  borderRadius: '4px', 
                  border: '1px solid var(--border-color)'
                }}
              >
                <img src={image} alt={`Visual asset creative ${idx + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="portfolio-container"
      style={{ paddingTop: '3rem', paddingBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '5rem' }}
    >
      {/* Upper Back anchor Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link 
          to="/" 
          state={{ scrollTo: 'work' }} 
          className="btn-editorial" 
          aria-label="Back to selected exhibitions work section"
          style={{ borderBottomColor: 'transparent', paddingBottom: '0.2rem' }}
        >
          <ArrowLeft size={18} aria-hidden="true" /> Back to Projects
        </Link>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="clickable"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '2px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              <ExternalLink size={14} /> Visit Live Website
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
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '2px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}
            >
              <GithubIcon size={16} /> Code
            </a>
          )}
        </div>
      </div>

      {/* ================= 1. HEADER & META PANEL ================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="section-label" style={{ color: isCodeProject ? '#1976D2' : 'var(--text-secondary)' }}>
            {project.category}
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.year}</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }} />
          <span 
            style={{ 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              backgroundColor: isCodeProject ? 'rgba(0, 237, 100, 0.1)' : 'var(--bg-secondary)',
              color: isCodeProject ? '#00A843' : 'var(--text-primary)',
              padding: '3px 10px', 
              borderRadius: '2px',
              border: '1px solid var(--border-color)',
              textTransform: 'uppercase'
            }}
          >
            {isCodeProject ? 'MERN Stack Engineering' : 'Brand & Visual Design'}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textTransform: 'uppercase', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
          {project.title}
        </h1>

        {/* Hero Meta Specifications Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2.5rem', 
            borderTop: '1px solid var(--border-color)', 
            borderBottom: '1px solid var(--border-color)',
            padding: '2rem 0',
            marginTop: '1.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Client / Project</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{project.client}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Role</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{project.role}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Timeline</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{project.year}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Core Stack / Tools</span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }} role="list" aria-label="Project core tools list">
              {project.tools.map((t) => (
                <span 
                  key={t} 
                  role="listitem"
                  style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    backgroundColor: 'var(--bg-secondary)', 
                    padding: '3px 8px', 
                    borderRadius: '2px',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)' 
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. LARGE HERO IMAGE ================= */}
      <section style={{ position: 'relative' }}>
        <div 
          style={{
            width: '100%',
            aspectRatio: getProjectRatio(project.id),
            overflow: 'hidden',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
          }}
        >
          <img 
            src={project.coverImage} 
            alt={`Cover preview for ${project.title}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>
      </section>

      {/* ================= 3. OVERVIEW & APPROACH SECTION ================= */}
      <section className="asymmetrical-grid" style={{ gap: '5rem' }}>
        {/* Left Side: Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <CornerDownRight size={18} aria-hidden="true" />
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Project Objective &amp; Overview
            </h2>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500 }}>
            {project.overview}
          </p>
        </div>

        {/* Right Side: Design / Engineering Approach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <CornerDownRight size={18} aria-hidden="true" />
            <h2 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isCodeProject ? 'Engineering & Technical Strategy' : 'Creative Design Approach'}
            </h2>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {project.designApproach}
          </p>
        </div>
      </section>

      {/* ================= 4. MERN SYSTEM ARCHITECTURE (FOR CODE PROJECTS) ================= */}
      {isCodeProject && project.techArchitecture && (
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <Terminal size={22} style={{ color: '#00ED64' }} />
            <h2 style={{ fontSize: '1.75rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              System Architecture &amp; Tech Stack
            </h2>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '1.5rem' 
            }}
          >
            {/* Frontend */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '4px', 
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} style={{ color: '#61DAFB' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Frontend Client
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {project.techArchitecture.frontend}
              </p>
            </div>

            {/* Backend */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '4px', 
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server size={18} style={{ color: '#68A063' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Backend &amp; REST APIs
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {project.techArchitecture.backend}
              </p>
            </div>

            {/* Database */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '4px', 
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={18} style={{ color: '#47A248' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Database &amp; Modeling
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {project.techArchitecture.database}
              </p>
            </div>

            {/* Security */}
            <div 
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '4px', 
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} style={{ color: '#FF7A00' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Authentication &amp; Security
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {project.techArchitecture.authSecurity}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================= 5. KEY FEATURES & DELIVERABLES ================= */}
      {project.features && project.features.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', textTransform: 'uppercase', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            Key Features &amp; Technical Highlights
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {project.features.map((feature, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '3px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <CheckCircle2 size={20} style={{ color: isCodeProject ? '#2E7D32' : 'var(--text-primary)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.6 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 6. VISUAL GALLERY (FOR DESIGN PROJECTS) ================= */}
      {!isCodeProject && project.gallery && project.gallery.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', textTransform: 'uppercase', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
            Visual Assets Gallery
          </h2>
          {renderVisualGallery()}
        </section>
      )}

      {/* ================= 7. FINAL RESULT / CONCLUSION SECTION ================= */}
      <section 
        className="asymmetrical-grid" 
        style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '4rem', 
          gap: '5rem',
          alignItems: 'center' 
        }}
      >
        <div>
          <span className="section-label">05 / RESULT &amp; IMPACT</span>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Project Conclusion
          </h2>
        </div>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {project.finalResult}
        </p>
      </section>

      {/* ================= 8. PREVIOUS / NEXT LOOP FOOTER ================= */}
      <nav 
        style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '5rem',
          paddingBottom: '2rem',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '2.5rem' 
        }} 
        aria-label="Case study navigation loop"
      >
        {/* Previous project link */}
        <Link 
          to={`/project/${prevProject.id}`} 
          className="clickable"
          aria-label={`Go to previous project: ${prevProject.title}`}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            Previous Project
          </span>
          <span style={{ fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            <ArrowLeft size={16} aria-hidden="true" /> {prevProject.title}
          </span>
        </Link>

        {/* Next project link */}
        <Link 
          to={`/project/${nextProject.id}`} 
          className="clickable"
          aria-label={`Go to next project: ${nextProject.title}`}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            Next Project
          </span>
          <span style={{ fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            {nextProject.title} <ArrowRight size={16} aria-hidden="true" />
          </span>
        </Link>
      </nav>

      {/* Style blocks */}
      <style>{`
        @media (max-width: 768px) {
          .project-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .gallery-frame {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            width: 100% !important;
            align-self: auto !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
