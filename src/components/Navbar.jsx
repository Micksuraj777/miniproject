import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AnimatedEye from './AnimatedEye';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Define navigation items based on user role
  const adminNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Donor Details', href: '/donor' },
    { name: 'Recipient Details', href: '/receiver' },
    { name: 'Check Compatibility', href: '/check' }
  ];

  const userNavItems = [
    { name: 'Home', href: '/user-home' },
    { name: 'Learn Game', href: '/transplant-game' },
    { name: 'My Profile', href: '/profile' },
    { name: 'Resources', href: '/resources' }
  ];

  const navItems = currentUser?.role === 'admin' ? adminNavItems : userNavItems;

  // Animation variants
  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const navItemVariants = {
    initial: { y: -5, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      color: "#3B82F6",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };
  
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      navigate('/auth');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <motion.div 
                  className="flex items-center"
                  variants={logoVariants}
                  whileHover="hover"
                >
                  <div className="flex space-x-2">
                    <AnimatedEye size={32} />
                    <AnimatedEye size={32} />
                  </div>
                </motion.div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial="initial"
                  animate="animate"
                  variants={navItemVariants}
                  whileHover="hover"
                  className="inline-flex items-center"
                >
                  <Link
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(item.href)
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="relative">
                <motion.button
                  onClick={toggleProfileMenu}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {currentUser.name.charAt(0)}
                  </div>
                </motion.button>
                {isProfileMenuOpen && (
                  <motion.div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="py-1 rounded-md bg-white shadow-xs">
                      <div className="block px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                      </div>
                      {currentUser.role === 'user' && (
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Your Profile
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </Link>
              </motion.div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <motion.button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className="sm:hidden overflow-hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              variants={mobileItemVariants}
            >
              <Link
                to={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(item.href)
                    ? 'border-blue-500 text-blue-700 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
        {currentUser ? (
          <motion.div 
            className="pt-4 pb-3 border-t border-gray-200"
            variants={mobileItemVariants}
          >
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {currentUser.role === 'user' && (
                <motion.div variants={mobileItemVariants}>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Your Profile
                  </Link>
                </motion.div>
              )}
              <motion.div variants={mobileItemVariants}>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="mt-3 space-y-1 pb-3"
            variants={mobileItemVariants}
          >
            <Link
              to="/auth"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Sign in
            </Link>
          </motion.div>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;

