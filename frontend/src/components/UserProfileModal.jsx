import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserProfileModal = ({ isOpen, onClose, userId, userType }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const { currentUser, updateMatchStatus, users } = useAuth();

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserData();
    }
  }, [isOpen, userId, userType, users]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // First check if we can find the user in the AuthContext
      const user = users.find(u => u.id === userId && u.userType === userType);
      
      if (user) {
        // If we found the user in AuthContext, use that data
        console.log('UserProfileModal: Found user in AuthContext:', user);
        setUserData(user);
        
        // If user is not already matched, check for perfect compatibility
        if (user.status !== 'Matched') {
          checkForPerfectCompatibility(user);
        }
        
        setLoading(false);
        return;
      }
      
      // Otherwise fetch from the API
      console.log(`UserProfileModal: Fetching user from API: ${userType}/${userId}`);
      const endpoint = userType === 'donor' ? 'donor' : 'recipient';
      const response = await fetch(`http://localhost:8080/${endpoint}/${userId}`, {
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
      console.log('UserProfileModal: Received data from API:', data);
      setUserData(data);
      
      // If user is not already matched, check for perfect compatibility
      if (data.status !== 'Matched') {
        checkForPerfectCompatibility(data);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check for perfect compatibility and automatically match if found
  const checkForPerfectCompatibility = async (user) => {
    try {
      console.log('Checking for perfect compatibility...');
      
      // Determine which type of users to search for potential matches
      const oppositeType = user.userType === 'donor' ? 'recipient' : 'donor';
      
      // Get all users of the opposite type from AuthContext
      const potentialMatches = users.filter(u => 
        u.userType === oppositeType && 
        u.status !== 'Matched'
      );
      
      // Find perfect matches based on criteria
      const perfectMatches = potentialMatches.filter(match => {
        // Perfect match criteria:
        // 1. Blood group must match
        const bloodGroupMatch = match.bloodGroup === user.bloodGroup;
        
        // 2. For donors, vision score must be higher than recipient's
        // For recipients, find donors with higher vision score
        const visionScoreCompatible = user.userType === 'donor' 
          ? parseFloat(user.visionScore || 0) >= parseFloat(match.visionScore || 0)
          : parseFloat(match.visionScore || 0) >= parseFloat(user.visionScore || 0);
        
        // 3. HLA score must be high (8 or above)
        const highHlaScore = (match.hlaMatchScore >= 8 && user.hlaMatchScore >= 8);
        
        // Return true if all criteria are met
        return bloodGroupMatch && visionScoreCompatible && highHlaScore;
      });
      
      console.log(`Found ${perfectMatches.length} perfect matches`);
      
      // If perfect matches found, create a match with the first one
      if (perfectMatches.length > 0) {
        const perfectMatch = perfectMatches[0];
        console.log(`Perfect match found: ${perfectMatch.name}`);
        
        // Determine donor and recipient IDs
        const donorId = user.userType === 'donor' ? user.id : perfectMatch.id;
        const recipientId = user.userType === 'recipient' ? user.id : perfectMatch.id;
        
        // Update match status
        console.log(`Creating match between donor ${donorId} and recipient ${recipientId}`);
        const success = await updateMatchStatus(donorId, recipientId);
        
        if (success) {
          console.log('Perfect match created successfully!');
          // Refresh the user data
          fetchUserData();
          
          // Show notification
          alert(`Perfect compatibility match found! ${user.name} has been matched with ${perfectMatch.name}.`);
        }
      }
    } catch (err) {
      console.error('Error checking for perfect compatibility:', err);
    }
  };

  const fetchPotentialMatches = async () => {
    try {
      setLoading(true);
      
      // Determine which endpoint to use based on current user type
      const oppositeType = userType === 'donor' ? 'recipient' : 'donor';
      const endpoint = oppositeType;
      
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
      
      // Filter potential matches based on blood group and other criteria
      const potentialMatches = data.filter(item => 
        item.status !== 'Matched' && 
        item.bloodGroup === userData.bloodGroup && 
        item.hlaMatchScore >= 6
      );
      
      return potentialMatches;
    } catch (err) {
      console.error('Error fetching potential matches:', err);
      return [];
    }
  };

  const handleCreateMatch = async (matchId) => {
    try {
      setMatchLoading(true);
      
      // Determine which ID is donor and which is recipient
      const donorId = userType === 'donor' ? userId : matchId;
      const recipientId = userType === 'donor' ? matchId : userId;
      
      console.log(`UserProfileModal: Creating match between donor ${donorId} and recipient ${recipientId}`);
      
      const success = await updateMatchStatus(donorId, recipientId);
      
      if (success) {
        // Refresh user data
        console.log('UserProfileModal: Match created successfully, refreshing data');
        fetchUserData();
        
        // Force refresh the page after a short delay to ensure all components update
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
        alert('Match created successfully! The page will refresh to show updated status.');
      } else {
        throw new Error('Failed to create match');
      }
    } catch (err) {
      console.error('Error creating match:', err);
      setError(err.message);
    } finally {
      setMatchLoading(false);
    }
  };

  if (!isOpen) return null;

  const isDonor = userType === 'donor';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isDonor ? 'Donor Profile' : 'Recipient Profile'}
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {loading ? (
                      <div className="mt-6 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : error ? (
                      <div className="mt-6 text-center">
                        <p className="text-red-600">{error}</p>
                        <button 
                          onClick={fetchUserData}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    ) : userData ? (
                      <div className="mt-6">
                        <div className="border-t border-gray-200">
                          <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Full name</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.name}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">ID</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.id}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Status</dt>
                              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  userData.status === 'Matched' ? 'bg-green-100 text-green-800' : 
                                  userData.status === 'Active' || userData.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {userData.status || (isDonor ? 'Active' : 'Waiting')}
                                </span>
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Contact</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.contact}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Age</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.age}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Gender</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.gender}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.bloodGroup}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Address</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.address}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Vision Score</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  userData.visionScore >= 8 ? 'bg-green-100 text-green-800' : 
                                  userData.visionScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {userData.visionScore}/10
                                </span>
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">HLA Match Score</dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  userData.hlaMatchScore >= 8 ? 'bg-green-100 text-green-800' : 
                                  userData.hlaMatchScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {userData.hlaMatchScore}/10
                                </span>
                              </dd>
                            </div>
                            {isDonor ? (
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Tissue Quality Score</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    userData.tissueQualityScore >= 8 ? 'bg-green-100 text-green-800' : 
                                    userData.tissueQualityScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {userData.tissueQualityScore}/10
                                  </span>
                                </dd>
                              </div>
                            ) : (
                              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Urgency Score</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    userData.recipientUrgencyScore >= 8 ? 'bg-red-100 text-red-800' : 
                                    userData.recipientUrgencyScore >= 6 ? 'bg-orange-100 text-orange-800' : 
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {userData.recipientUrgencyScore}/10
                                  </span>
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                        
                        {currentUser && currentUser.role === 'admin' && userData.status !== 'Matched' && (
                          <div className="mt-6">
                            <h4 className="text-md font-medium text-gray-900 mb-2">Match Options</h4>
                            <button
                              type="button"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={async () => {
                                const potentialMatches = await fetchPotentialMatches();
                                if (potentialMatches.length > 0) {
                                  // Find the best match (first in the sorted list)
                                  const bestMatch = potentialMatches[0];
                                  const matchId = bestMatch.id;
                                  
                                  if (confirm(`Create match with ${bestMatch.name}?`)) {
                                    handleCreateMatch(matchId);
                                  }
                                } else {
                                  alert('No suitable matches found.');
                                }
                              }}
                              disabled={matchLoading}
                            >
                              {matchLoading ? 'Processing...' : 'Find and Create Match'}
                            </button>
                          </div>
                        )}
                        
                        {userData.status === 'Matched' && (
                          <div className="mt-6 p-4 bg-green-50 rounded-md">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Match Status</h3>
                                <div className="mt-2 text-sm text-green-700">
                                  <p>This {isDonor ? 'donor' : 'recipient'} has been successfully matched.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-6 text-center">
                        <p className="text-gray-500">No user data found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileModal; 