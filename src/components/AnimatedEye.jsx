import React from 'react';
import { motion } from 'framer-motion';

const AnimatedEye = ({ size = 80 }) => {
  const eyeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const irisVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 100%)",
        "linear-gradient(45deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.6) 100%)"
      ],
      backgroundSize: "200% 200%",
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const eyelidVariants = {
    animate: {
      scaleY: [1, 0.05, 1],
      translateY: [0, -1, 0],
      transition: {
        duration: 0.10,
        times: [0, 0.4, 1],
        repeat: Infinity,
        repeatDelay: 2.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const spectacleVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const frameReflectionVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '200% 200%'],
      transition: {
        duration: 3,
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
      {/* Removed Spectacle frame */}

      {/* Outer eye shape with modern shadow */}
      <motion.div
        className="relative rounded-full bg-gradient-to-br from-white to-gray-100 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
        style={{ 
          width: size, 
          height: size,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
        }}
      >
        {/* Iris with modern gradient */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          variants={irisVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600" />
          <motion.div
            className="absolute inset-0"
            variants={shimmerVariants}
            animate="animate"
          />
        </motion.div>

        {/* Pupil with enhanced design */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-gray-900 to-black"
          style={{ 
            width: '38%', 
            height: '38%', 
            top: '31%', 
            left: '31%',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)'
          }}
          variants={pupilVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          {/* Enhanced light reflections */}
          <motion.div
            className="absolute rounded-full bg-white"
            style={{ 
              width: '35%', 
              height: '35%', 
              top: '15%', 
              left: '15%',
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute rounded-full bg-white"
            style={{ 
              width: '20%', 
              height: '20%', 
              bottom: '20%', 
              right: '20%',
              filter: 'blur(0.5px)'
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
        
        {/* Upper eyelid with realistic animation */}
        <motion.div
          className="absolute inset-x-0 top-0 rounded-t-full bg-gradient-to-b from-white via-gray-50 to-gray-100"
          style={{ 
            height: '35%',
            transformOrigin: 'top',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}
          variants={eyelidVariants}
          animate="animate"
        >
          {/* Eyelid crease */}
          <div 
            className="absolute w-full"
            style={{
              top: '25%',
              height: '1px',
              background: 'linear-gradient(to right, transparent 10%, rgba(0,0,0,0.03) 50%, transparent 90%)',
              transform: 'translateY(-1px)'
            }}
          />
        </motion.div>

        {/* Removed Lower eyelid */}

        {/* Enhanced glass reflection */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            backdropFilter: 'blur(0.5px)'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedEye; 