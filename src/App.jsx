import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar"
import Home from "./components/home"
import Donor from "./components/Donor"
import Receiver from "./components/Receiver"
import Check from './components/check';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AddDonor from './components/AddDonor';
import AddRecipient from './components/AddRecipient';

// Get the publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file");
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <SignedIn>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={
                    <motion.div
                      key="home"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Home />
                    </motion.div>
                  } />
                  <Route path="/donor" element={
                    <motion.div
                      key="donor"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Donor />
                    </motion.div>
                  } />
                  <Route path="/add-donor" element={
                    <motion.div
                      key="add-donor"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <AddDonor />
                    </motion.div>
                  } />
                  <Route path="/receiver" element={
                    <motion.div
                      key="receiver"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Receiver />
                    </motion.div>
                  } />
                  <Route path="/add-recipient" element={
                    <motion.div
                      key="add-recipient"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <AddRecipient />
                    </motion.div>
                  } />
                  <Route path="/check" element={
                    <motion.div
                      key="check"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Check />
                    </motion.div>
                  } />
                  <Route path="/dashboard" element={
                    <motion.div
                      key="dashboard"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <Dashboard />
                    </motion.div>
                  } />
                </Routes>
              </AnimatePresence>
            </main>
          </SignedIn>
          <SignedOut>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </SignedOut>
        </div>
      </Router>
    </ClerkProvider>
  );
};

export default App;

