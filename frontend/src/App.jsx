import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import Navbar from "./components/Navbar"
import Home from "./components/home"
import UserHome from "./components/UserHome"
import Donor from "./components/Donor"
import Receiver from "./components/Receiver"
import Check from './components/check';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AddDonor from './components/AddDonor';
import AddRecipient from './components/AddRecipient';
import AIChat from './components/AIChat';
import TransplantGame from './components/TransplantGame';
import OfflinePage from './components/OfflinePage';
import { Tables } from './components/table';
import { RecipientTable } from './components/RecipientTable';
import UserProfile from './components/UserProfile';
import ResourcesPage from './components/ResourcesPage';
import Feedback from './components/Feedback';
import FeedbackManagement from './components/FeedbackManagement';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getChatResponse } from './utils/eyeTransplantQA';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Children animation variants
const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect to profile page for regular users, or appropriate page based on role
    const redirectPath = currentUser.role === 'user' ? '/profile' : '/auth';
    return <Navigate to={redirectPath} replace />;
  }
  
  return children;
};

// Custom redirect component that can access currentUser
const CustomRedirect = () => {
  const { currentUser } = useAuth();
  
  // Redirect based on user role
  if (currentUser) {
    return <Navigate to={currentUser.role === 'admin' ? '/' : '/profile'} replace />;
  }
  
  // Redirect to auth if not logged in
  return <Navigate to="/auth" replace />;
};

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/auth" element={<Auth />} />
        
        {/* Public routes */}
        <Route path="/" element={
          currentUser?.role === 'admin' ? (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <Home />
            </motion.div>
          ) : (
            <motion.div
              key="user-home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <UserHome />
            </motion.div>
          )
        } />
        
        {/* User routes */}
        <Route path="/user-home" element={
          <ProtectedRoute requiredRole="user">
            <motion.div
              key="user-home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <UserHome />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute requiredRole="user">
            <motion.div
              key="profile"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <UserProfile />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/feedback" element={
          <ProtectedRoute>
            <motion.div
              key="feedback"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <Feedback />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/transplant-game" element={
          <ProtectedRoute>
            <motion.div
              key="transplant-game"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <TransplantGame />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/resources" element={
          <ProtectedRoute requiredRole="user">
            <motion.div
              key="resources"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <ResourcesPage />
            </motion.div>
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <Dashboard />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/feedback-management" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="feedback-management"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <FeedbackManagement />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/donor" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="donor"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <Tables />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/add-donor" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="add-donor"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <AddDonor />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/receiver" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="receiver"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <RecipientTable />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/add-recipient" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="add-recipient"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <AddRecipient />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/check" element={
          <ProtectedRoute requiredRole="admin">
            <motion.div
              key="check"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <Check />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="/ai-chat" element={
          <ProtectedRoute requiredRole="user">
            <motion.div
              key="ai-chat"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="page-container"
            >
              <AIChat />
            </motion.div>
          </ProtectedRoute>
        } />
        
        {/* Redirect any unmatched routes */}
        <Route path="*" element={
          <CustomRedirect />
        } />
      </Routes>
    </AnimatePresence>
  );
};

// AI Chat Modal Component
const AIChatModal = () => {
  const { currentUser } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [{ 
      sender: 'bot', 
      text: 'Hello! I am your Eye Transplant AI Assistant. I have been trained on comprehensive medical data about eye tissue transplantation. How can I help you today?',
      time: new Date()
    }];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentResponseIndex, setCurrentResponseIndex] = useState(null);
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(true);
  const messagesEndRef = useRef(null);
  const typingSpeed = 15; // milliseconds per character
  const [lastCategory, setLastCategory] = useState(null);

  // Only show for users
  if (currentUser?.role !== 'user') {
    return null;
  }

  // Initial suggested questions by category
  const suggestedQuestions = [
    { text: "What is eye tissue transplantation?", category: "general" },
    { text: "How is the transplant procedure performed?", category: "procedure" },
    { text: "Who can donate eye tissue?", category: "donor" },
    { text: "What are the risks of eye transplantation?", category: "risks" },
    { text: "How long is the recovery period?", category: "recovery" },
    { text: "Will my insurance cover the procedure?", category: "insurance" }
  ];

  // Categories for follow-up questions
  const categories = [
    'general', 'procedure', 'donor', 'recipient', 'preparation', 
    'recovery', 'risks', 'vision', 'insurance', 'alternatives', 
    'lifestyle', 'emotional'
  ];

  // Get follow-up questions based on category
  const getFollowUpQuestions = (category) => {
    switch(category) {
      case 'general':
        return [
          { text: "What are the different types of corneal transplants?", category: "general" },
          { text: "How successful are eye transplants?", category: "general" },
          { text: "How long has eye transplantation been performed?", category: "general" }
        ];
      case 'procedure':
        return [
          { text: "How long does the surgery take?", category: "procedure" },
          { text: "Is the procedure painful?", category: "procedure" },
          { text: "What type of anesthesia is used?", category: "procedure" }
        ];
      case 'donor':
        return [
          { text: "How are donor tissues screened?", category: "donor" },
          { text: "How long can eye tissue be preserved?", category: "donor" },
          { text: "What is tissue matching in eye transplant?", category: "donor" }
        ];
      case 'recipient':
        return [
          { text: "Who needs eye tissue transplant?", category: "recipient" },
          { text: "What conditions disqualify someone from receiving a transplant?", category: "recipient" },
          { text: "How long is the waiting list?", category: "recipient" }
        ];
      case 'preparation':
        return [
          { text: "How to prepare for surgery?", category: "preparation" },
          { text: "What tests are needed before surgery?", category: "preparation" },
          { text: "What medications should be stopped before surgery?", category: "preparation" }
        ];
      case 'recovery':
        return [
          { text: "What is the recovery process?", category: "recovery" },
          { text: "What are the post-surgery restrictions?", category: "recovery" },
          { text: "When can I return to work?", category: "recovery" }
        ];
      case 'risks':
        return [
          { text: "What are the risks of eye transplantation?", category: "risks" },
          { text: "What are signs of rejection?", category: "risks" },
          { text: "How common is transplant rejection?", category: "risks" }
        ];
      case 'insurance':
        return [
          { text: "Is the surgery covered by insurance?", category: "insurance" },
          { text: "What are the total costs involved?", category: "insurance" },
          { text: "Does Medicare cover corneal transplants?", category: "insurance" }
        ];
      case 'alternatives':
        return [
          { text: "Are there alternatives to transplant?", category: "alternatives" },
          { text: "What are the latest advances?", category: "alternatives" },
          { text: "Tell me about artificial corneas", category: "alternatives" }
        ];
      case 'lifestyle':
        return [
          { text: "Can I play sports after recovery?", category: "lifestyle" },
          { text: "How long does a corneal transplant last?", category: "lifestyle" },
          { text: "When can I drive after surgery?", category: "lifestyle" }
        ];
      case 'emotional':
        return [
          { text: "I am scared of surgery", category: "emotional" },
          { text: "What if something goes wrong?", category: "emotional" },
          { text: "How can I stay positive during recovery?", category: "emotional" }
        ];
      default:
        return suggestedQuestions;
    }
  };

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayText]);

  // Typing effect
  useEffect(() => {
    if (currentResponseIndex !== null && isTyping) {
      const fullText = messages[currentResponseIndex].text;
      
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.substring(0, displayText.length + 1));
        }, typingSpeed);
        
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        setCurrentResponseIndex(null);
      }
    }
  }, [displayText, currentResponseIndex, isTyping, messages]);

  // Function to detect category from user input
  const detectCategory = (input) => {
    const text = input.toLowerCase();
    
    // Category keywords mapping
    const categoryKeywords = {
      general: ['what is', 'overview', 'explain', 'types', 'different', 'success rate'],
      procedure: ['surgery', 'procedure', 'operation', 'surgical', 'anesthesia', 'operating'],
      donor: ['donor', 'donate', 'donation', 'tissue', 'screening', 'preserve', 'matching'],
      recipient: ['recipient', 'receive', 'qualify', 'eligible', 'waiting', 'list', 'candidate'],
      preparation: ['prepare', 'preparation', 'before surgery', 'test', 'evaluation', 'ready'],
      recovery: ['recovery', 'heal', 'healing', 'after surgery', 'post-op', 'restrictions'],
      risks: ['risk', 'complication', 'danger', 'rejection', 'reject', 'infection', 'problem'],
      vision: ['vision', 'see', 'sight', 'visual', 'clarity', 'focus', 'improvement'],
      insurance: ['insurance', 'cost', 'cover', 'expense', 'pay', 'medicare', 'medicaid', 'price'],
      alternatives: ['alternative', 'option', 'instead', 'other', 'different', 'choice'],
      lifestyle: ['lifestyle', 'activity', 'exercise', 'sport', 'work', 'travel', 'daily'],
      emotional: ['scared', 'afraid', 'nervous', 'worry', 'anxious', 'fear', 'stress', 'cope']
    };
    
    // Calculate scores for each category
    const categoryScores = {};
    for (const category of categories) {
      categoryScores[category] = 0;
      
      for (const keyword of categoryKeywords[category]) {
        if (text.includes(keyword)) {
          categoryScores[category] += 1;
        }
      }
    }
    
    // Find category with highest score
    let maxScore = 0;
    let detectedCategory = null;
    
    for (const [category, score] of Object.entries(categoryScores)) {
      if (score > maxScore) {
        maxScore = score;
        detectedCategory = category;
      }
    }
    
    // If the score is too low, consider it undetected
    if (maxScore < 1) {
      detectedCategory = null;
    }
    
    return { category: detectedCategory, score: maxScore };
  };

  // Function to handle suggested question click
  const handleSuggestedQuestionClick = async (question) => {
    if (isLoading || isTyping) return;
    
    // Set the question as input message
    setInputMessage(question.text);
    
    // Process the question
    const currentTime = new Date();
    const userMessage = { sender: 'user', text: question.text, time: currentTime };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestedQuestions(false);
    
    try {
      // Add a small delay to simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get response from the QA database
      const response = getChatResponse(question.text);
      
      // Update the last category for follow-up questions
      setLastCategory(question.category);
      
      const botResponse = { sender: 'bot', text: response, time: new Date() };
      setMessages(prev => {
        const newMessages = [...prev, botResponse];
        setCurrentResponseIndex(newMessages.length - 1);
        setIsTyping(true);
        setDisplayText('');
        return newMessages;
      });
    } catch (error) {
      console.error('Error processing question:', error);
      const errorResponse = { 
        sender: 'bot', 
        text: 'I apologize, but I encountered an error processing your question. Please try again or ask something else.',
        time: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isTyping) return;
    
    const currentTime = new Date();
    const userMessage = { sender: 'user', text: inputMessage, time: currentTime };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestedQuestions(false);
    
    try {
      // Add a small delay to simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Process the user's question
      const userQuestion = inputMessage.trim();
      
      // Check if the question is about eye transplantation
      const eyeTransplantKeywords = ['eye', 'cornea', 'transplant', 'donation', 'donor', 'recipient', 'surgery', 'vision', 'corneal'];
      const isAboutEyeTransplant = eyeTransplantKeywords.some(keyword => 
        userQuestion.toLowerCase().includes(keyword)
      );
      
      // Detect category for follow-up questions
      const { category, score } = detectCategory(userQuestion);
      if (category && score >= 1.5) {
        setLastCategory(category);
      }
      
      let response;
      
      if (isAboutEyeTransplant || messages.length > 1) {
        // Get response from the QA database
        response = getChatResponse(userQuestion);
        
        // If the response seems like a fallback (generic), try to provide more helpful guidance
        if (response.includes("Could you please rephrase your question")) {
          if (category) {
            response = `I'm not sure I fully understand your question about ${category} aspects of eye transplantation. Could you provide more details or ask in a different way? I'm here to help with any specific information you need about eye tissue transplantation.`;
          }
        }
      } else {
        // If first question is not clearly about eye transplantation, guide the user
        response = `I'm an AI assistant specialized in eye tissue transplantation. I can answer questions about:

• The transplantation procedure and techniques
• Donor eligibility and the donation process
• Recipient requirements and selection
• Pre-surgery preparation and evaluation
• Post-surgery recovery and care
• Risks, complications, and success rates
• Vision improvement expectations
• Insurance coverage and costs
• Alternative treatments
• Lifestyle adjustments after surgery
• Emotional support for patients

Please feel free to ask me anything about these topics!`;
      }
      
      const botResponse = { sender: 'bot', text: response, time: new Date() };
      setMessages(prev => {
        const newMessages = [...prev, botResponse];
        setCurrentResponseIndex(newMessages.length - 1);
        setIsTyping(true);
        setDisplayText('');
        return newMessages;
      });
    } catch (error) {
      console.error('Error processing message:', error);
      const errorResponse = { 
        sender: 'bot', 
        text: 'I apologize, but I encountered an error processing your message. Please try again.',
        time: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const handleRefresh = () => {
    setMessages([{ 
      sender: 'bot', 
      text: 'Hello! I am your Eye Transplant AI Assistant. I have been trained on comprehensive medical data about eye tissue transplantation. How can I help you today?',
      time: new Date()
    }]);
    setShowSuggestedQuestions(true);
    setLastCategory(null);
    localStorage.removeItem('chatMessages');
  };

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center z-50 text-white"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl h-[600px] flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold">Eye Transplant AI Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRefresh}
                    className="text-white hover:text-gray-200"
                    title="Reset conversation"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      {index === currentResponseIndex && isTyping ? (
                        <p className="text-sm">{displayText}<span className="inline-block w-1 h-4 ml-1 bg-gray-500 animate-pulse"></span></p>
                      ) : (
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {formatTime(message.time)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Suggested Questions */}
                {showSuggestedQuestions && !isLoading && !isTyping && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedQuestionClick(question)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full transition-colors"
                        >
                          {question.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Follow-up Questions */}
                {lastCategory && !isLoading && !isTyping && messages.length > 1 && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      You might also want to know:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getFollowUpQuestions(lastCategory).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedQuestionClick(question)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full transition-colors"
                        >
                          {question.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {isLoading && !isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <p className="text-xs text-gray-500">Processing your question...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about eye tissue transplantation..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading || isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    className={`${
                      isLoading || isTyping || !inputMessage.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white rounded-lg px-4 py-2 transition-colors`}
                    disabled={isLoading || isTyping || !inputMessage.trim()}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
      <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {isOffline ? (
            <OfflinePage />
          ) : (
            <>
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <AnimatedRoutes />
              </main>
              <AIChatModal />
            </>
          )}
        </div>+
      </AuthProvider>
      </Router>
  );
};

export default App;

