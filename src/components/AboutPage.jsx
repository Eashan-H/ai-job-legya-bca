import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-content">
        <motion.h1 
          className="about-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          About Meraz 2026
        </motion.h1>
        <motion.p 
          className="about-description"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          Meraz is not just a festival; it's a convergence of galaxies, a cosmic celebration where cultures, ideas, and technologies orbit in a spectacular display of creativity and innovation. Born from the stars, Meraz has been the annual cultural and technical heartbeat of IIT Bhilai, drawing in curious minds from across the universe.
        </motion.p>
        <motion.p 
          className="about-description"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          Our 2026 theme, "Intergalactic Festival," transforms our campus into a celestial wonderland. We invite you to navigate through constellations of events, from technical workshops that push the boundaries of science to cultural nights that illuminate the rich diversity of our universe. Join us as we journey through space and time, all within the vibrant cosmos of Meraz.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutPage;