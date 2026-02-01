import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import '../styles/HomePage.css';

const HomePage = ({ onNavigate, onShowContent, videoPlayed, onVideoPlayed }) => {
  const [showContent, setShowContent] = useState(videoPlayed);

  const handleShowContent = () => {
    setShowContent(true);
    if (onShowContent) onShowContent(true);
    if (onVideoPlayed) onVideoPlayed();
  };

  return (
    <div className="home-page">
      {/* Login/Signup Button for Homepage */}
      <motion.button
        className="homepage-auth-button"
        onClick={() => onNavigate('login')}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
        transition={{ delay: showContent ? 2.0 : 0, duration: 0.8 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)'
        }}
        whileTap={{ scale: 0.95 }}
        style={{ pointerEvents: showContent ? 'auto' : 'none' }}
      >
        <span className="button-text">Login / Signup</span>
      </motion.button>
      
      {/* Background Video */}
      {!videoPlayed && (
        <motion.video
          className="background-video"
          autoPlay
          muted
          playsInline
          onEnded={handleShowContent}
          initial={{ opacity: 1 }}
          animate={{ opacity: showContent ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <source src="https://cdn.builder.io/o/assets%2F0fb682404d934e8fbdb72e45717ff4f2%2Fc30731bf7124420a8b6d37c9c9b99bdf?alt=media&token=0b519df1-cadd-4979-a0e7-5f2f6dc62261&apiKey=0fb682404d934e8fbdb72e45717ff4f2" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      )}

      {/* Animated Nebula Background Layers */}
      <div className="nebula-layer nebula-1"></div>
      <div className="nebula-layer nebula-2"></div>
      <div className="nebula-layer nebula-3"></div>

      {/* Main Content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: showContent ? 'auto' : 'none' }}
      >
        {/* Meraz Logo */}
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
        >
          <div className="logo-glow"></div>
          <img src="/Meraz.png" alt="Meraz Logo" className="meraz-logo" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
        >
          MERAZ 2026
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          An Intergalactic Cultural & Technical Festival
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Where Cultures Orbit
        </motion.p>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* CTA Buttons */}
        <div className="cta-buttons-container">
          <motion.button
            className="cta-button"
            onClick={() => onNavigate('events')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            whileHover={{ 
              y: -8, 
              scale: 1.05,
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-text">Enter the Galaxy</span>
            <div className="button-glow"></div>
          </motion.button>
        </div>

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ pointerEvents: showContent ? 'auto' : 'none' }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.div>
        <span>Explore</span>
      </motion.div>
    </div>
  );
};

export default HomePage;
