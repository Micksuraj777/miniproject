import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatResponse } from '../utils/eyeTransplantQA';

const AIChat = () => {
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

  // Initial suggested questions by category
  const suggestedQuestions = [
    { text: "What is eye tissue transplantation?", category: "general" },
    { text: "How is the transplant procedure performed?", category: "procedure" },
    { text: "Who can donate eye tissue?", category: "donor" },
    { text: "What are the risks of eye transplantation?", category: "risks" },
    { text: "How long is the recovery period?", category: "recovery" },
    { text: "Will my insurance cover the procedure?", category: "insurance" }
  ];

  // Follow-up questions based on previous category
  const followUpQuestions = {
    general: [
      "What types of eye transplants are available?",
      "How successful are eye transplants?",
      "How common are eye transplants?"
    ],
    procedure: [
      "How long does the surgery take?",
      "Is the procedure painful?",
      "What anesthesia is used for eye transplants?"
    ],
    donor: [
      "How is donor tissue screened?",
      "How long after death can tissue be donated?",
      "Can I specify that I want to donate my eyes?"
    ],
    recipient: [
      "How are recipients selected?",
      "What conditions qualify for transplantation?",
      "How long is the waiting list?"
    ],
    preparation: [
      "What tests are done before surgery?",
      "Should I stop taking medications?",
      "What should I do the night before surgery?"
    ],
    recovery: [
      "When can I return to work?",
      "What medications will I need after surgery?",
      "What follow-up appointments are needed?"
    ],
    risks: [
      "What is the rejection rate?",
      "What complications are most common?",
      "How is rejection treated if it occurs?"
    ],
    vision: [
      "How much vision improvement can I expect?",
      "When will my vision stabilize after surgery?",
      "Will I need glasses after the transplant?"
    ],
    insurance: [
      "What is the average cost without insurance?",
      "Does Medicare cover eye transplants?",
      "Are there financial assistance programs?"
    ],
    alternatives: [
      "What are alternatives to transplantation?",
      "Can artificial corneas be used instead?",
      "What if I decide not to get a transplant?"
    ],
    lifestyle: [
      "Can I play sports after recovery?",
      "Are there activities I should avoid?",
      "How will this affect my daily life?"
    ],
    emotional: [
      "How can I cope with anxiety before surgery?",
      "Are there support groups for recipients?",
      "How can I thank my donor's family?"
    ]
  };

  // Categories for eye transplantation
  const categories = [
    'general', 'procedure', 'donor', 'recipient', 'preparation', 
    'recovery', 'risks', 'vision', 'insurance', 'alternatives', 
    'lifestyle', 'emotional'
  ];

  // Track the last detected category to show relevant follow-up questions
  const [lastCategory, setLastCategory] = useState(null);

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

  // Enhanced function to detect category from user input with more sophisticated analysis
  const detectCategory = (input) => {
    const lowercaseInput = input.toLowerCase().trim();
    
    // Check for category-specific keywords with weighted scoring
    const categoryKeywords = {
      general: ['what', 'explain', 'tell', 'about', 'overview', 'basics', 'understand', 'information', 'describe', 'definition'],
      procedure: ['surgery', 'operation', 'procedure', 'process', 'surgical', 'operating', 'transplant', 'technique', 'method', 'perform'],
      donor: ['donate', 'donor', 'tissue', 'donation', 'screening', 'matching', 'preserve', 'give', 'contribute', 'supply'],
      recipient: ['receive', 'recipient', 'qualify', 'eligible', 'candidacy', 'waiting', 'get', 'obtain', 'patient', 'candidate'],
      preparation: ['prepare', 'before', 'pre', 'ready', 'preparation', 'test', 'consultation', 'evaluation', 'assessment', 'prior'],
      recovery: ['recover', 'healing', 'after', 'post', 'follow-up', 'rehabilitation', 'recuperation', 'convalescence', 'restoration', 'mend'],
      risks: ['risk', 'complication', 'danger', 'problem', 'issue', 'safety', 'concern', 'hazard', 'side effect', 'adverse'],
      vision: ['see', 'vision', 'sight', 'visual', 'clarity', 'improvement', 'quality', 'acuity', 'perception', 'view'],
      insurance: ['cost', 'cover', 'insurance', 'payment', 'expense', 'financial', 'medicare', 'medicaid', 'price', 'afford'],
      alternatives: ['alternative', 'option', 'different', 'instead', 'other', 'choice', 'substitute', 'replacement', 'another', 'else'],
      lifestyle: ['life', 'activity', 'daily', 'work', 'sport', 'exercise', 'routine', 'habit', 'living', 'normal'],
      emotional: ['scared', 'afraid', 'nervous', 'anxious', 'worried', 'fear', 'stress', 'concerned', 'frightened', 'apprehensive']
    };
    
    // Check for direct question patterns
    const questionPatterns = [
      { pattern: /what is|what are|what does|what do/, weight: 2, category: 'general' },
      { pattern: /how does|how do|how is|how long|how many/, weight: 2, category: 'procedure' },
      { pattern: /can i|will i|should i/, weight: 1.5, category: 'recipient' },
      { pattern: /risk|danger|complication|problem/, weight: 2, category: 'risks' },
      { pattern: /cost|price|insurance|cover|payment/, weight: 2, category: 'insurance' },
      { pattern: /scared|afraid|nervous|anxious|worried|fear/, weight: 2.5, category: 'emotional' },
      { pattern: /donor|donate|donation/, weight: 2, category: 'donor' },
      { pattern: /recovery|heal|after surgery|post-op/, weight: 2, category: 'recovery' },
      { pattern: /alternative|option|instead|other/, weight: 2, category: 'alternatives' },
      { pattern: /prepare|preparation|before surgery|pre-op/, weight: 2, category: 'preparation' }
    ];
    
    let categoryScores = {};
    
    // Initialize scores for all categories
    categories.forEach(category => {
      categoryScores[category] = 0;
    });
    
    // Score based on keywords
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (lowercaseInput.includes(keyword)) {
          // Add more weight to exact matches
          if (lowercaseInput.includes(` ${keyword} `)) {
            categoryScores[category] += 1.5;
          } else {
            categoryScores[category] += 1;
          }
        }
      }
    }
    
    // Score based on question patterns
    for (const { pattern, weight, category } of questionPatterns) {
      if (pattern.test(lowercaseInput)) {
        categoryScores[category] += weight;
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
      console.error('Error getting response:', error);
      const errorResponse = { 
        sender: 'bot', 
        text: 'I apologize, but I encountered an issue processing your question. As an AI specialized in eye tissue transplantation, I can provide accurate information if you ask again or rephrase your question.', 
        time: new Date() 
      };
      setMessages(prev => {
        const newMessages = [...prev, errorResponse];
        setCurrentResponseIndex(newMessages.length - 1);
        setIsTyping(true);
        setDisplayText('');
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const currentTime = new Date();
    const userMessage = { sender: 'user', text: inputMessage, time: currentTime };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
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

How can I assist you with information about eye tissue transplantation?`;
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
      console.error('Error getting response:', error);
      const errorResponse = { 
        sender: 'bot', 
        text: 'I apologize, but I encountered an issue processing your question. As an AI specialized in eye tissue transplantation, I can provide accurate information if you ask again or rephrase your question.', 
        time: new Date() 
      };
      setMessages(prev => {
        const newMessages = [...prev, errorResponse];
        setCurrentResponseIndex(newMessages.length - 1);
        setIsTyping(true);
        setDisplayText('');
        return newMessages;
      });
    } finally {
      setIsLoading(false);
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
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
            <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                        : 'bg-gray-100 text-gray-800'
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
              {showSuggestedQuestions && messages.length === 1 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Frequently asked questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestionClick(question)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-full transition-colors"
                        disabled={isLoading || isTyping}
                      >
                        {question.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Follow-up Questions based on last category */}
              {!isLoading && !isTyping && lastCategory && followUpQuestions[lastCategory] && messages.length > 2 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">You might also want to know:</p>
                  <div className="flex flex-wrap gap-2">
                    {followUpQuestions[lastCategory].map((questionText, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestionClick({ text: questionText, category: lastCategory })}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded-full transition-colors"
                        disabled={isLoading || isTyping}
                      >
                        {questionText}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {isLoading && !isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
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
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about eye tissue transplantation..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading || isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  className={`${
                    isLoading || isTyping ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-lg px-4 py-2 transition-colors`}
                  disabled={isLoading || isTyping}
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
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat; 