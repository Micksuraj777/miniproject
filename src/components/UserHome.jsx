import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedEye from './AnimatedEye';
import { transplantProcedures, eligibilityCriteria, postOperativeCare, donorTissueStandards, patientRights } from '../utils/transplantInfo';

const UserHome = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [greeting, setGreeting] = useState('Welcome');
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
    
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [controls]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const transplantSteps = [
    {
      title: "Initial Evaluation",
      description: "Comprehensive eye examination to determine eligibility for transplantation",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Donor Matching",
      description: "Finding the most suitable donor tissue for your specific needs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      title: "Pre-Surgery Preparation",
      description: "Guidelines and preparations to follow before your transplant procedure",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      title: "Transplantation Procedure",
      description: "State-of-the-art surgical techniques performed by expert ophthalmologists",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Recovery & Aftercare",
      description: "Comprehensive post-operative care and recovery guidelines",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Follow-up Care",
      description: "Regular check-ups and long-term care to ensure successful transplantation",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const policies = [
    {
      id: "eligibility",
      title: "Eligibility Criteria",
      description: "Learn about the medical requirements for receiving eye tissue transplantation",
      content: eligibilityCriteria
    },
    {
      id: "standards",
      title: "Donor Tissue Standards",
      description: "Our strict quality control measures ensure only the highest quality tissue is used",
      content: donorTissueStandards
    },
    {
      id: "rights",
      title: "Patient Rights",
      description: "Understanding your rights and responsibilities as a transplant recipient",
      content: patientRights
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      description: "How we protect your personal and medical information",
      content: [
        "All patient information is kept strictly confidential",
        "Data is encrypted and stored securely",
        "Information is only shared with healthcare providers directly involved in your care",
        "You have the right to access your medical records at any time",
        "We comply with all relevant data protection regulations"
      ]
    }
  ];

  const openPolicyModal = (policy) => {
    setSelectedPolicy(policy);
    document.body.style.overflow = 'hidden';
  };

  const closePolicyModal = () => {
    setSelectedPolicy(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
        {/* Background 3D elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10"
              style={{
                width: Math.random() * 300 + 100 + 'px',
                height: Math.random() * 300 + 100 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                filter: 'blur(40px)',
                zIndex: 0
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, Math.random() * 10 - 5]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="text-center lg:text-left"
              >
                {currentUser && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.p
                      className="text-xl md:text-2xl text-blue-600 font-medium mb-2"
                      animate={{ 
                        color: ['#3b82f6', '#6366f1', '#8b5cf6', '#3b82f6'],
                        textShadow: ['0 0 5px rgba(59, 130, 246, 0.3)', '0 0 10px rgba(99, 102, 241, 0.4)', '0 0 5px rgba(139, 92, 246, 0.3)', '0 0 5px rgba(59, 130, 246, 0.3)']
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      {greeting}, {currentUser.displayName || currentUser.email?.split('@')[0] || 'Friend'}!
                    </motion.p>
                  </motion.div>
                )}
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <span className="inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      Restoring
                    </motion.span>
                  </span>{" "}
                  <span className="inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-block"
                    >
                      Vision
                    </motion.span>
                  </span>{" "}
                  <span className="inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="inline-block"
                    >
                      Through
                    </motion.span>
                  </span>{" "}
                  <span className="inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      Corneal
                    </motion.span>
                  </span>{" "}
                  <span className="inline-block">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      Transplantation
                    </motion.span>
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Join our mission to bring the gift of sight to those in need through innovative corneal transplant procedures.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap justify-center lg:justify-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    onClick={() => navigate('/profile')}
                    style={{ 
                      boxShadow: "0 4px 14px -3px rgba(59, 130, 246, 0.3)",
                      transform: "perspective(1000px)" 
                    }}
                  >
                    My Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all"
                    onClick={() => navigate('/transplant-game')}
                    style={{ 
                      boxShadow: "0 4px 14px -3px rgba(99, 102, 241, 0.3)",
                      transform: "perspective(1000px)" 
                    }}
                  >
                    Learn with Game
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 transition-all"
                    onClick={() => navigate('/feedback')}
                    style={{ 
                      boxShadow: "0 4px 14px -3px rgba(16, 185, 129, 0.3)",
                      transform: "perspective(1000px)" 
                    }}
                  >
                    Share Feedback
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative z-10"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <motion.div 
                  className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  whileHover={{ 
                    rotateY: 0,
                    rotateX: 0,
                    transition: { duration: 0.4 }
                  }}
                >
                  <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700">
                    {/* 3D depth elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="relative w-40 h-40 md:w-72 md:h-72"
                        animate={{ 
                          rotateY: [0, 10, 0, -10, 0],
                          rotateX: [0, 5, 0, -5, 0],
                          z: [0, 10, 0, -10, 0]
                        }}
                        transition={{ 
                          duration: 10, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <AnimatedEye size={200} />
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full rounded-full"
                          animate={{
                            boxShadow: [
                              "0 0 30px 15px rgba(59, 130, 246, 0.4)",
                              "0 0 60px 30px rgba(99, 102, 241, 0.6)",
                              "0 0 30px 15px rgba(59, 130, 246, 0.4)"
                            ],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Enhanced 3D particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(40)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: Math.random() * 8 + 2 + 'px',
                            height: Math.random() * 8 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.6 + 0.4,
                            zIndex: Math.floor(Math.random() * 10),
                            filter: `blur(${Math.random() * 1}px)`
                          }}
                          animate={{
                            y: [0, -Math.random() * 150 - 50],
                            x: [0, (Math.random() - 0.5) * 100],
                            z: [0, Math.random() * 50],
                            opacity: [0.8, 0],
                            scale: [1, Math.random() * 0.5 + 0.5]
                          }}
                          transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Reflective surface */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent mix-blend-overlay"></div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-10 -right-10 bg-white rounded-2xl p-6 shadow-xl z-20"
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px) rotateX(-5deg) rotateY(5deg)",
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)"
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 0,
                  rotateY: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-full mr-4 shadow-inner">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Success Rate</p>
                    <motion.p 
                      className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      98%
                    </motion.p>
                  </div>
                </div>
              </motion.div>
              
              {/* 3D decorative elements */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-70 filter blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-100 rounded-full opacity-70 filter blur-3xl"></div>
              <motion.div 
                className="absolute top-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.3, 0.2],
                  filter: ["blur(20px)", "blur(30px)", "blur(20px)"]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-indigo-500 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                  filter: ["blur(15px)", "blur(25px)", "blur(15px)"]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Transplantation Process Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The Transplantation Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding each step of the eye tissue transplantation process helps prepare you for a successful procedure and recovery
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transplantSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Procedure Details Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Transplantation Procedures</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn about the different types of eye tissue transplantation procedures and their success rates
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {transplantProcedures.map((procedure, index) => (
              <motion.div
                key={procedure.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-blue-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{procedure.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Success Rate:</span>
                    <span className="text-xl font-semibold">{procedure.successRate}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-6">{procedure.description}</p>
                  
                  <h4 className="font-semibold text-gray-800 mb-3">Procedure Steps:</h4>
                  <ul className="space-y-2 mb-6">
                    {procedure.steps.map((step, stepIndex) => (
                      <motion.li
                        key={stepIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIndex * 0.1 }}
                        className="flex items-start"
                      >
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Recovery Time:</span> {procedure.recoveryTime}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <Link
              to="/resources"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Learn more about these procedures
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Services & Benefits Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-6">Our Comprehensive Services</h2>
              <p className="text-xl mb-8 text-blue-100">
                We provide end-to-end support throughout your transplantation journey, from initial consultation to long-term follow-up care
              </p>
              
              <ul className="space-y-4">
                {[
                  "Pre-transplant evaluation and counseling",
                  "Advanced surgical techniques for optimal outcomes",
                  "Personalized post-operative care plans",
                  "Regular follow-up appointments and monitoring",
                  "Access to vision rehabilitation services",
                  "Emotional support and community resources"
                ].map((service, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <svg className="w-6 h-6 text-blue-300 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-w-16 aspect-h-9 bg-blue-800 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatedEye size={200} />
                  </div>
                  
                  {/* Animated circles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-4 border-blue-400 rounded-full"
                      initial={{ opacity: 0.3, scale: 0.8 }}
                      animate={{ 
                        opacity: [0.2, 0.4, 0.2], 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.8,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-blue-600 rounded-xl p-6 shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-2xl font-bold">98%</p>
                <p className="text-blue-200">Success Rate</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Policies Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Policies & Standards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of care, ethics, and transparency throughout the transplantation process
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 cursor-pointer relative overflow-hidden group"
                onClick={() => openPolicyModal(policy)}
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white p-2 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{policy.title}</h3>
                <p className="text-gray-600 mb-4">{policy.description}</p>
                <div className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
                  View details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Policy Modal */}
      <AnimatePresence>
        {selectedPolicy && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePolicyModal}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3 bg-blue-100 p-2 rounded-lg text-blue-600">
                      {selectedPolicy.id === "eligibility" ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : selectedPolicy.id === "standards" ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      ) : selectedPolicy.id === "rights" ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedPolicy.title}</h3>
                  </div>
                  <button 
                    onClick={closePolicyModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {selectedPolicy.id === "eligibility" ? (
                  <div>
                    {selectedPolicy.content.map((category, idx) => (
                      <motion.div 
                        key={idx} 
                        className="mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">{category.category}</h4>
                        <ul className="space-y-2">
                          {category.criteria.map((criterion, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + i * 0.05 }}
                            >
                              <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-600">{criterion}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {Array.isArray(selectedPolicy.content) && selectedPolicy.content.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
                
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-500 text-sm">
                    For more detailed information, please consult with your healthcare provider or contact our support team.
                  </p>
                </motion.div>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="flex justify-end">
                  <button
                    onClick={closePolicyModal}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post-Operative Care Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Post-Operative Care</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proper care after your transplantation procedure is crucial for optimal healing and vision recovery
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {postOperativeCare.map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  {index === 0 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : index === 1 ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{phase.phase}</h3>
                <ul className="space-y-3">
                  {phase.instructions.map((instruction, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{instruction}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            variants={fadeInUp}
            className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Important Reminder</h4>
                <p className="text-gray-600">
                  Always follow your doctor's specific instructions, as they may vary based on your individual case and the type of transplantation procedure you undergo. Contact your healthcare provider immediately if you experience any unusual symptoms or concerns during your recovery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from patients who have successfully undergone eye tissue transplantation
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Johnson",
                age: 42,
                quote: "After years of deteriorating vision, my corneal transplant gave me back the ability to see my children's faces clearly. The care I received was exceptional.",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Chen",
                age: 56,
                quote: "The transplant process was smooth and well-explained. Six months later, I'm back to my photography hobby with better vision than I've had in decades.",
                image: "https://randomuser.me/api/portraits/men/22.jpg"
              },
              {
                name: "Emily Rodriguez",
                age: 35,
                quote: "From the initial consultation to post-surgery care, every step was handled with professionalism and compassion. My vision improvement has been life-changing.",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600">Age {testimonial.age}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Vision Restoration Journey?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Our team of specialists is ready to guide you through every step of the transplantation process
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to={currentUser ? "/profile" : "/auth"}
                className="bg-white text-blue-700 px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg inline-block"
              >
                {currentUser ? 'View Your Profile' : 'Create Your Account'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-10"
              style={{
                width: Math.random() * 300 + 50 + 'px',
                height: Math.random() * 300 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Back to top button */}
        <motion.div 
          className="absolute top-0 right-8 transform -translate-y-1/2 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-blue-600 p-3 rounded-full shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7H3" />
            </svg>
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                Vision Restoration Center
              </h3>
              <p className="text-gray-400 mb-4">Your partner in eye health and vision care</p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a 
                    key={social} 
                    href="#" 
                    className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'facebook' && <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.84.5C10.41.5,9.4,3.3,9.4,5.3V7.46H5v4h4.4V20h5.1V11.46h3.77Z" />}
                      {social === 'twitter' && <path d="M23.32,6.44a.5.5,0,0,0-.2-.87l-.79-.19A.49.49,0,0,1,22,4.89L21.74,4a.5.5,0,0,0-.58-.18l-1.33.41a.5.5,0,0,1-.52-.13A5.05,5.05,0,0,0,15.5,2,5,5,0,0,0,10,7a5.44,5.44,0,0,0,.11,1.07A.5.5,0,0,1,9.73,8.5,12.5,12.5,0,0,1,2.5,4.25a.5.5,0,0,0-.5,0A5,5,0,0,0,3,13a.5.5,0,0,1,.5.8,2.5,2.5,0,0,1-.5.16.5.5,0,0,0-.16.89A5,5,0,0,0,8,15a.51.51,0,0,1,.5.48,5,5,0,0,1-3,1.87.5.5,0,0,0,0,.9A12.44,12.44,0,0,0,12,20a12.5,12.5,0,0,0,12.5-12.5.5.5,0,0,0-.18-.38Z" />}
                      {social === 'instagram' && <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.59-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.64.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12S0,15.67.07,17c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.43,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />}
                      {social === 'linkedin' && <path d="M19,3a2,2,0,0,1,2,2V19a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H19m0-2H5A4,4,0,0,0,1,5V19a4,4,0,0,0,4,4H19a4,4,0,0,0,4-4V5a4,4,0,0,0-4-4ZM7,10h2v8H7ZM8,8.13A1.13,1.13,0,1,1,9.13,7,1.13,1.13,0,0,1,8,8.13ZM18,15.5c0-1.06-.2-2.75-2.33-2.75A2.51,2.51,0,0,0,13.5,14h0V13H11.5v5h2V15.5c0-.84.16-1.65,1.18-1.65s1.32.81,1.32,1.7V18h2Z" />}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Vision Street, Eye Care City, EC 12345</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">info@visionrestorationcenter.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 md:mb-0"
            >
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Vision Restoration Center. All rights reserved.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center md:text-right"
            >
              <p className="text-gray-400 mb-2">Developed and Designed by:</p>
              <motion.p 
                className="text-sm text-blue-300 font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Mick Suraj, Diana Regi, K R Muhammad Adnan, Haisel Davis
              </motion.p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHome; 