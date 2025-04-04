import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('donor');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, users, addUser } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.97 
    }
  };

  // Function to fetch user data by name
  const fetchUserDataByName = async (userName, userType) => {
    try {
      const endpoint = userType === 'donor' ? 'donor' : 'recipient';
      
      const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data`);
      }
      
      const data = await response.json();
      return data.find(item => item.name === userName);
    } catch (err) {
      console.error('Error fetching user data:', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        // Handle sign in
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          // If this is a donor or recipient user, try to fetch their data from the database
          if (user.role === 'user' && (user.userType === 'donor' || user.userType === 'recipient')) {
            const userData = await fetchUserDataByName(user.name, user.userType);
            
            // If we found matching data, update the user object with the database ID
            if (userData) {
              const enhancedUser = {
                ...user,
                dbId: userData.id // Store the database ID separately
              };
              await login(enhancedUser);
            } else {
              await login(user);
            }
          } else if (user.role === 'admin') {
            await login(user);
          } else {
            await login(user);
          }
          
          navigate(user.role === 'admin' ? '/dashboard' : '/');
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Handle sign up
        if (users.some(user => user.email === email)) {
          setError('Email already exists');
          return;
        }

        // For new users, check if there's a matching donor/recipient in the database
        const userData = await fetchUserDataByName(name, userType);
        
        // Create new user with database ID if found
        const newUser = addUser({
          name,
          email,
          password,
          userType,
          role: 'user',
          dbId: userData ? userData.id : null
        });

        // Log in the new user
        await login(newUser);
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-opacity-90"
      >
        <motion.div variants={itemVariants} className="text-center">
          <motion.h2 
            className="mt-6 text-3xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </motion.h2>
          <motion.p 
            className="mt-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <motion.button
              onClick={() => setIsSignIn(!isSignIn)}
              className="font-medium text-blue-600 hover:text-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </motion.button>
          </motion.p>
          {error && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSignIn ? 'signin' : 'signup'}
            initial={{ opacity: 0, x: isSignIn ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignIn ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                {!isSignIn && (
                  <>
                    <div>
                      <label htmlFor="name" className="sr-only">Full name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex">
                      <div className="flex-1 px-3 py-2 border border-gray-300 bg-gray-50">
                        <label className="text-sm font-medium text-gray-700">I am a:</label>
                        <div className="mt-1 flex space-x-4">
                          <div className="flex items-center">
                            <input
                              id="donor-radio"
                              name="user-type"
                              type="radio"
                              checked={userType === 'donor'}
                              onChange={() => setUserType('donor')}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="donor-radio" className="ml-2 block text-sm text-gray-700">
                              Donor
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="recipient-radio"
                              name="user-type"
                              type="radio"
                              checked={userType === 'recipient'}
                              onChange={() => setUserType('recipient')}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="recipient-radio" className="ml-2 block text-sm text-gray-700">
                              Recipient
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isSignIn ? 'rounded-t-md' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {isSignIn && (
                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isSignIn ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    isSignIn ? 'Sign in' : 'Sign up'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth; 