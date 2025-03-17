import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isSignedIn = !!currentUser;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      if (currentUser.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      navigate('/auth');
    }
  };

  const features = [
    {
      title: "Donor Management",
      description: "Efficiently manage eye tissue donors and their information",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      link: "/donor"
    },
    {
      title: "Receiver Management",
      description: "Track and manage tissue recipients and their requirements",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: "/receiver"
    },
    {
      title: "Status Tracking",
      description: "Real-time tracking of tissue status and availability",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      link: "/check"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Eye Tissue Management Platform
      </h1>
            <p className="text-xl md:text-2xl mb-8">
              Streamlining the process of eye tissue donation and transplantation
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleGetStarted}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors mr-4"
              >
                {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
              </button>
              {/* {isSignedIn && (
                <Link
                  to="/donor"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Manage Donors
                </Link>
              )} */}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to={isSignedIn ? feature.link : '/auth'}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {isSignedIn ? 'Access Feature' : 'Sign in to Access'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Active Donors</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Successful Transplants</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-blue-600 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">Join our network of donors and help restore vision to those in need.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          ><div className='flex justify-center items-center gap-4'>
            <Link
              to={isSignedIn ? "/add-donor" : "/auth"}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              {isSignedIn ? 'Add Donor' : 'Go to Dashboard'}
            </Link>
            <Link
              to={isSignedIn ? "/add-recipient" : "/auth"}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              {isSignedIn ? 'Add Recipient' : 'Go to Dashboard'}
            </Link>
          </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
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

export default Home;
