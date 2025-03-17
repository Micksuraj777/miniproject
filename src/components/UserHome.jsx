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
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800"
      >
        <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 8 + 2 + 'px',
                height: Math.random() * 8 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center text-white"
          >
            <motion.div 
              className="flex justify-center mb-8 gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                <AnimatedEye size={120} />
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, -2, 0, 2, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 0.5
                }}
              >
                <AnimatedEye size={120} />
              </motion.div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Vision Restoration Journey
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to eye tissue transplantation, recovery, and renewed vision
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleGetStarted}
                className="bg-white text-blue-700 px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Begin Your Journey
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-10 h-10 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
    </div>
  );
};

export default UserHome; 