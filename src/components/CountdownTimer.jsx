import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/CountdownTimer.css';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-03-01T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return null;
    }

    return (
      <motion.div 
        key={interval} 
        className="countdown-item"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        <div className="countdown-value">{String(timeLeft[interval]).padStart(2, '0')}</div>
        <div className="countdown-label">{interval}</div>
      </motion.div>
    );
  });

  return (
    <div className="countdown-timer">
      {timerComponents.length ? timerComponents : <span>Festival has begun!</span>}
    </div>
  );
};

export default CountdownTimer;
