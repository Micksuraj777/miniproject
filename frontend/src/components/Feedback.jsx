import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    // Load existing feedback from localStorage
    const storedFeedback = localStorage.getItem('userFeedback');
    if (storedFeedback) {
      setAllFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create new feedback object
    const newFeedback = {
      id: `feedback-${Date.now()}`,
      userId: currentUser?.id || 'anonymous',
      userName: currentUser?.name || 'Anonymous User',
      userEmail: currentUser?.email || 'anonymous@example.com',
      type: feedbackType,
      message: feedbackText,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Simulate API call with timeout
    setTimeout(() => {
      // Add to existing feedback
      const updatedFeedback = [...allFeedback, newFeedback];
      setAllFeedback(updatedFeedback);
      
      // Save to localStorage
      localStorage.setItem('userFeedback', JSON.stringify(updatedFeedback));
      
      // Reset form
      setFeedbackText('');
      setFeedbackType('general');
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Share Your Feedback
              </motion.h1>
              <motion.p 
                className="mt-2 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We value your input to improve our eye transplant services
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback Type
                </label>
                <select
                  id="feedbackType"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="general">General Feedback</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="issue">Issue Report</option>
                  <option value="question">Question</option>
                  <option value="testimonial">Testimonial</option>
                </select>
              </div>

              <div>
                <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback
                </label>
                <textarea
                  id="feedbackText"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please share your thoughts, suggestions, or concerns..."
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !feedbackText.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                    isSubmitting || !feedbackText.trim() 
                      ? 'bg-blue-300 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </motion.button>
              </div>
            </form>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 rounded-md border border-green-200"
              >
                <p className="text-green-700 text-center">
                  Thank you for your feedback! We appreciate your input.
                </p>
              </motion.div>
            )}

            {currentUser && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Previous Feedback</h2>
                
                {allFeedback.filter(item => item.userId === currentUser.id).length > 0 ? (
                  <div className="space-y-4">
                    {allFeedback
                      .filter(item => item.userId === currentUser.id)
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .map(feedback => (
                        <div 
                          key={feedback.id} 
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-start">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(feedback.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-700">{feedback.message}</p>
                          <div className="mt-2 flex justify-end">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              feedback.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : feedback.status === 'resolved' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <p className="text-gray-500 italic">You haven't submitted any feedback yet.</p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Feedback; 