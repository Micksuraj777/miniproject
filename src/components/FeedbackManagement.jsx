import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FeedbackManagement = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [allFeedback, setAllFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (currentUser?.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load feedback from localStorage
    const storedFeedback = localStorage.getItem('userFeedback');
    if (storedFeedback) {
      const parsedFeedback = JSON.parse(storedFeedback);
      setAllFeedback(parsedFeedback);
      setFilteredFeedback(parsedFeedback);
    }
    setIsLoading(false);
  }, [currentUser, navigate]);

  useEffect(() => {
    // Apply filters
    let result = [...allFeedback];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(item => item.type === typeFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.message.toLowerCase().includes(term) || 
        item.userName.toLowerCase().includes(term) ||
        item.userEmail.toLowerCase().includes(term)
      );
    }
    
    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setFilteredFeedback(result);
  }, [allFeedback, statusFilter, typeFilter, searchTerm]);

  const handleStatusChange = (feedbackId, newStatus) => {
    const updatedFeedback = allFeedback.map(item => 
      item.id === feedbackId ? { ...item, status: newStatus } : item
    );
    
    setAllFeedback(updatedFeedback);
    localStorage.setItem('userFeedback', JSON.stringify(updatedFeedback));
    
    // Close modal if open
    if (isModalOpen && selectedFeedback?.id === feedbackId) {
      setSelectedFeedback({ ...selectedFeedback, status: newStatus });
    }
  };

  const handleDeleteFeedback = (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      const updatedFeedback = allFeedback.filter(item => item.id !== feedbackId);
      setAllFeedback(updatedFeedback);
      localStorage.setItem('userFeedback', JSON.stringify(updatedFeedback));
      
      // Close modal if open
      if (isModalOpen && selectedFeedback?.id === feedbackId) {
        setIsModalOpen(false);
      }
    }
  };

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsModalOpen(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'general':
        return 'bg-purple-100 text-purple-800';
      case 'suggestion':
        return 'bg-blue-100 text-blue-800';
      case 'issue':
        return 'bg-red-100 text-red-800';
      case 'question':
        return 'bg-green-100 text-green-800';
      case 'testimonial':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="typeFilter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="general">General</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="issue">Issue</option>
                    <option value="question">Question</option>
                    <option value="testimonial">Testimonial</option>
                  </select>
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email or content..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredFeedback.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFeedback.map((feedback) => (
                    <tr key={feedback.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{feedback.userName}</div>
                          <div className="text-sm text-gray-500">{feedback.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeClass(feedback.type)}`}>
                          {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 truncate max-w-xs">
                          {feedback.message.length > 100 
                            ? `${feedback.message.substring(0, 100)}...` 
                            : feedback.message}
                        </div>
                        <button 
                          onClick={() => openFeedbackModal(feedback)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          View full message
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(feedback.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(feedback.status)}`}>
                          {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <select
                            value={feedback.status}
                            onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                            className="text-xs px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            onClick={() => handleDeleteFeedback(feedback.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No feedback found matching your filters.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Feedback Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm font-medium text-blue-800">Total Feedback</div>
                <div className="mt-1 text-2xl font-semibold text-blue-900">{allFeedback.length}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="text-sm font-medium text-yellow-800">Pending</div>
                <div className="mt-1 text-2xl font-semibold text-yellow-900">
                  {allFeedback.filter(item => item.status === 'pending').length}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-sm font-medium text-green-800">Resolved</div>
                <div className="mt-1 text-2xl font-semibold text-green-900">
                  {allFeedback.filter(item => item.status === 'resolved').length}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-sm font-medium text-purple-800">Suggestions</div>
                <div className="mt-1 text-2xl font-semibold text-purple-900">
                  {allFeedback.filter(item => item.type === 'suggestion').length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Feedback Details</h2>
                <button
                  onClick={closeFeedbackModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-500">From:</span>
                      <h3 className="text-base font-medium text-gray-900">{selectedFeedback.userName}</h3>
                      <p className="text-sm text-gray-500">{selectedFeedback.userEmail}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-500">Date:</span>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedFeedback.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex space-x-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeClass(selectedFeedback.type)}`}>
                      {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedFeedback.status)}`}>
                      {selectedFeedback.status.charAt(0).toUpperCase() + selectedFeedback.status.slice(1)}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <label htmlFor="modalStatusChange" className="block text-sm font-medium text-gray-700 mb-1">
                        Update Status
                      </label>
                      <select
                        id="modalStatusChange"
                        value={selectedFeedback.status}
                        onChange={(e) => handleStatusChange(selectedFeedback.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleDeleteFeedback(selectedFeedback.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default FeedbackManagement; 