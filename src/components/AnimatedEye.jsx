import React from 'react';
import { motion } from 'framer-motion';

const AnimatedEye = ({ size = 80 }) => {
  const eyeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  const pupilVariants = {
    initial: { scale: 0.8 },
    animate: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2
      }
    }
  };

  const irisVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className="relative"
      variants={eyeVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Outer eye shape */}
      <motion.div
        className="relative rounded-full bg-white shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* Iris */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"
          variants={irisVariants}
          initial="initial"
          animate="animate"
        >
          {/* Pupil */}
          <motion.div
            className="absolute inset-0 rounded-full bg-black"
            style={{ width: '40%', height: '40%', top: '30%', left: '30%' }}
            variants={pupilVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {/* Light reflection */}
            <motion.div
              className="absolute rounded-full bg-white"
              style={{ width: '30%', height: '30%', top: '10%', left: '10%' }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Eyelid */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          style={{ height: '50%', top: '0' }}
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedEye; 