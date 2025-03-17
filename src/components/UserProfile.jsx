import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { currentUser, updateMatchStatus, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role === 'user') {
      console.log('UserProfile: Current user status:', currentUser.status);
      
      // First check if the user already has a status in their profile
      if (currentUser.status === 'Matched') {
        console.log('UserProfile: User is already matched, using current user data');
        // If the user is already matched, we can use that information
        setProfileData({
          ...currentUser,
          // Add any additional fields needed for display
          visionScore: currentUser.visionScore || 7,
          hlaMatchScore: currentUser.hlaMatchScore || 8,
          tissueQualityScore: currentUser.tissueQualityScore || 8,
          recipientUrgencyScore: currentUser.recipientUrgencyScore || 7
        });
        setLoading(false);
      } else {
        // Otherwise fetch from the API
        console.log('UserProfile: Fetching user data from API');
        fetchUserData();
      }
    } else if (currentUser && currentUser.role === 'admin') {
      // For admin, fetch potential matches
      fetchPotentialMatches();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // First check localStorage for updated user data
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        const userFromStorage = parsedUsers.find(u => u.id === currentUser.id);
        
        if (userFromStorage && userFromStorage.status === 'Matched') {
          console.log('UserProfile: Found matched user in localStorage:', userFromStorage);
          setProfileData({
            ...userFromStorage,
            visionScore: userFromStorage.visionScore || 7,
            hlaMatchScore: userFromStorage.hlaMatchScore || 8,
            tissueQualityScore: userFromStorage.tissueQualityScore || 8,
            recipientUrgencyScore: userFromStorage.recipientUrgencyScore || 7
          });
          
          // Update the current user in AuthContext if needed
          if (currentUser.status !== 'Matched') {
            console.log('UserProfile: Updating current user status to Matched');
            updateUser(currentUser.id, { status: 'Matched' });
          }
          
          setLoading(false);
          return;
        }
      }
      
      // Determine which endpoint to use based on user type
      const endpoint = currentUser.userType === 'donor' ? 'donor' : 'recipient';
      
      console.log(`UserProfile: Fetching data from ${endpoint} API`);
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
      
      // Find the user data by matching the name
      const userData = data.find(item => item.name === currentUser.name);
      
      if (userData) {
        console.log('UserProfile: Found user data in API:', userData);
        // Update the user's status in AuthContext if it's different
        if (userData.status === 'Matched' && currentUser.status !== 'Matched') {
          console.log('UserProfile: Updating current user status to Matched from API data');
          updateUser(currentUser.id, { status: 'Matched' });
        }
        
        setProfileData(userData);
      } else {
        console.log('UserProfile: No data found in API, using current user data');
        // If no data found in API, use the current user data
        setProfileData({
          ...currentUser,
          // Add any additional fields needed for display
          visionScore: currentUser.visionScore || 7,
          hlaMatchScore: currentUser.hlaMatchScore || 8,
          tissueQualityScore: currentUser.tissueQualityScore || 8,
          recipientUrgencyScore: currentUser.recipientUrgencyScore || 7
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      // Fallback to current user data
      console.log('UserProfile: Error fetching data, using current user data as fallback');
      setProfileData({
        ...currentUser,
        // Add any additional fields needed for display
        visionScore: currentUser.visionScore || 7,
        hlaMatchScore: currentUser.hlaMatchScore || 8,
        tissueQualityScore: currentUser.tissueQualityScore || 8,
        recipientUrgencyScore: currentUser.recipientUrgencyScore || 7
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPotentialMatches = async () => {
    try {
      setLoading(true);
      
      // Fetch donors
      const donorsResponse = await fetch('http://localhost:8080/donor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      // Fetch recipients
      const recipientsResponse = await fetch('http://localhost:8080/recipient', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!donorsResponse.ok || !recipientsResponse.ok) {
        throw new Error('Failed to fetch potential matches');
      }
      
      const donors = await donorsResponse.json();
      const recipients = await recipientsResponse.json();
      
      // Find potential matches based on blood group and other criteria
      const matches = [];
      
      donors.forEach(donor => {
        if (donor.status !== 'Matched') {
          recipients.forEach(recipient => {
            if (recipient.status !== 'Matched' && 
                donor.bloodGroup === recipient.bloodGroup && 
                donor.hlaMatchScore >= 6 && 
                recipient.hlaMatchScore >= 6) {
              matches.push({
                donor,
                recipient,
                matchScore: calculateMatchScore(donor, recipient)
              });
            }
          });
        }
      });
      
      // Sort matches by score (highest first)
      matches.sort((a, b) => b.matchScore - a.matchScore);
      
      setPotentialMatches(matches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchScore = (donor, recipient) => {
    // Simple algorithm to calculate match score
    let score = 0;
    
    // Blood group match is essential
    if (donor.bloodGroup === recipient.bloodGroup) {
      score += 5;
    }
    
    // HLA match score
    score += Math.min(donor.hlaMatchScore, recipient.hlaMatchScore) / 2;
    
    // Age proximity (closer ages get higher scores)
    const ageDiff = Math.abs(donor.age - recipient.age);
    score += (10 - Math.min(ageDiff / 5, 10)) / 5;
    
    // Urgency factor
    if (recipient.recipientUrgencyScore >= 8) {
      score += 2;
    }
    
    return Math.min(10, score);
  };

  const handleCreateMatch = async (donorId, recipientId) => {
    try {
      setMatchLoading(true);
      const success = await updateMatchStatus(donorId, recipientId);
      
      if (success) {
        // Refresh the potential matches list
        fetchPotentialMatches();
        alert('Match created successfully!');
      } else {
        throw new Error('Failed to create match');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setMatchLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900">Unauthorized Access</h2>
            <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button 
              onClick={currentUser.role === 'admin' ? fetchPotentialMatches : fetchUserData}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin view - show potential matches
  if (currentUser.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 bg-blue-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Potential Matches
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Review and create matches between donors and recipients.
              </p>
            </div>
            
            {potentialMatches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Donor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {potentialMatches.map((match, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{match.donor.name}</div>
                          <div className="text-sm text-gray-500">ID: {match.donor.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{match.recipient.name}</div>
                          <div className="text-sm text-gray-500">ID: {match.recipient.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{match.donor.bloodGroup}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            match.matchScore >= 8 ? 'bg-green-100 text-green-800' : 
                            match.matchScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {match.matchScore.toFixed(1)}/10
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleCreateMatch(match.donor.id, match.recipient.id)}
                            disabled={matchLoading}
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                          >
                            {matchLoading ? 'Processing...' : 'Create Match'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-4 py-5 sm:px-6 text-center">
                <p className="text-gray-500">No potential matches found.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // User view
  const isDonor = currentUser.userType === 'donor';

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow overflow-hidden sm:rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6 bg-blue-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isDonor ? 'Donor Profile' : 'Recipient Profile'}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and information.
            </p>
          </div>
          <div className="border-t border-gray-200">
            {profileData ? (
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.name}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.id}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profileData.status === 'Matched' ? 'bg-green-100 text-green-800' : 
                      profileData.status === 'Active' || profileData.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {profileData.status || (isDonor ? 'Active' : 'Waiting')}
                    </span>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.contact}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.age}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.gender}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.bloodGroup}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profileData.address}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Vision Score</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profileData.visionScore >= 8 ? 'bg-green-100 text-green-800' : 
                      profileData.visionScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {profileData.visionScore}/10
                    </span>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">HLA Match Score</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      profileData.hlaMatchScore >= 8 ? 'bg-green-100 text-green-800' : 
                      profileData.hlaMatchScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {profileData.hlaMatchScore}/10
                    </span>
                  </dd>
                </div>
                {isDonor ? (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Tissue Quality Score</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        profileData.tissueQualityScore >= 8 ? 'bg-green-100 text-green-800' : 
                        profileData.tissueQualityScore >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {profileData.tissueQualityScore}/10
                      </span>
                    </dd>
                  </div>
                ) : (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Urgency Score</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        profileData.recipientUrgencyScore >= 8 ? 'bg-red-100 text-red-800' : 
                        profileData.recipientUrgencyScore >= 6 ? 'bg-orange-100 text-orange-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {profileData.recipientUrgencyScore}/10
                      </span>
                    </dd>
                  </div>
                )}
              </dl>
            ) : (
              <div className="px-4 py-5 sm:px-6">
                <p className="text-sm text-gray-500">No detailed profile information available.</p>
              </div>
            )}
          </div>
        </motion.div>

        {profileData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6"
          >
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {isDonor ? 'Donation Status' : 'Transplant Status'}
            </h3>
            
            {isDonor ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compatibility</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          profileData.status === 'Matched' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {profileData.status === 'Matched' ? 'Matched with recipient' : 'Waiting for Surgery'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cornea</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {profileData.hlaMatchScore >= 8 ? 'High' : profileData.hlaMatchScore >= 6 ? 'Medium' : 'Low'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organ Needed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waiting Since</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          profileData.status === 'Matched' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {profileData.status === 'Matched' ? 'Matched with donor' : 'Waiting for Surgery'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cornea</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {profileData.recipientUrgencyScore >= 8 ? 'High' : profileData.recipientUrgencyScore >= 6 ? 'Medium' : 'Low'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 