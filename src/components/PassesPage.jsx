import React from 'react';
import { motion } from 'framer-motion';
import '../styles/PassesPage.css';

const passes = [
  {
    name: 'Starlight Pass',
    price: '₹499',
    features: ['General Access to all days', 'Entry to all cultural nights', 'Access to food court'],
    color: '#c084fc',
  },
  {
    name: 'Supernova Pass',
    price: '₹999',
    features: ['All Starlight benefits', 'Access to all technical workshops', 'Exclusive Meraz merchandise'],
    color: '#ec4899',
  },
  {
    name: 'Galactic Pass',
    price: '₹1499',
    features: ['All Supernova benefits', 'Front row seats at all events', 'Meet and greet with artists'],
    color: '#67e8f9',
  },
];

const PassesPage = () => {
  return (
    <motion.div
      className="passes-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="passes-header">
        <h1 className="passes-title">Festival Passes</h1>
        <p className="passes-subtitle">Choose your pass and unlock the galaxy of Meraz.</p>
      </div>
      <div className="passes-container">
        {passes.map((pass, index) => (
          <motion.div
            key={index}
            className="pass-card"
            style={{ '--glow-color': pass.color }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -10, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 40px ${pass.color}` }}
          >
            <div className="pass-header">
              <h2 className="pass-name">{pass.name}</h2>
              <p className="pass-price">{pass.price}</p>
            </div>
            <ul className="pass-features">
              {pass.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <motion.button 
              className="buy-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PassesPage;