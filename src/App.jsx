import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import './App.css';

// Scroll restoration and anchor redirection helper
function RouteScrollHandler() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // If we have a target anchor to scroll to, handle it
    if (pathname === '/' && state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        // Delay slightly to allow transition and mount to finish
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      // Normal route change - scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}

// Router child component to leverage useLocation for AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/project/:id" 
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <Navigation />
      <RouteScrollHandler />
      
      {/* Dynamic route spacing for fixed navbar */}
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
