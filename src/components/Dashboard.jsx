import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const Dashboard = () => {
  const { updateMatchStatus } = useAuth();
  const [donorData, setDonorData] = useState([]);
  const [recipientData, setRecipientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [recentActivity, setRecentActivity] = useState([]);
  const [updatingMatch, setUpdatingMatch] = useState(false);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRecipients: 0,
    avgVisionScore: 0,
    avgUrgencyLevel: 0,
    potentialMatches: 0,
    uniqueRecipientMatches: 0
  });

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch donor data
      const donorResponse = await fetch('http://localhost:8080/donor', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!donorResponse.ok) {
        throw new Error('Failed to fetch donor data');
      }
      
      const donorResult = await donorResponse.json();
      setDonorData(donorResult);
      
      // Fetch recipient data
      const recipientResponse = await fetch('http://localhost:8080/recipient', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!recipientResponse.ok) {
        throw new Error('Failed to fetch recipient data');
      }
      
      const recipientResult = await recipientResponse.json();
      setRecipientData(recipientResult);
      
      // Generate recent activity from the fetched data
      generateRecentActivity(donorResult, recipientResult);
      
      // Calculate statistics
      calculateAllStats(donorResult, recipientResult);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Generate recent activity based on real data
  const generateRecentActivity = (donors, recipients) => {
    const combinedActivity = [
      ...donors.slice(0, 5).map(donor => ({
        id: `donor-${donor.id}`,
        type: 'donor',
        name: donor.name,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
        action: 'registered',
        details: `Blood Group: ${donor.bloodGroup}, Vision Score: ${donor.visionScore}`
      })),
      ...recipients.slice(0, 5).map(recipient => ({
        id: `recipient-${recipient.id}`,
        type: 'recipient',
        name: recipient.name,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
        action: 'registered',
        details: `Blood Group: ${recipient.bloodGroup}, Urgency: ${recipient.recipientUrgencyScore}`
      }))
    ];
    
    // Sort by timestamp (most recent first)
    combinedActivity.sort((a, b) => b.timestamp - a.timestamp);
    
    setRecentActivity(combinedActivity.slice(0, 10)); // Take the 10 most recent activities
  };

  // Calculate all statistics based on real data
  const calculateAllStats = (donors, recipients) => {
    // Calculate average vision score from donors
    const avgVisionScore = donors.length > 0 
      ? donors.reduce((sum, donor) => sum + parseFloat(donor.visionScore || 0), 0) / donors.length
      : 0;
    
    // Calculate average urgency level from recipients
    const avgUrgencyLevel = recipients.length > 0 
      ? recipients.reduce((sum, recipient) => sum + parseFloat(recipient.recipientUrgencyScore || 0), 0) / recipients.length
      : 0;
    
    // Calculate potential matches (count all compatible donor-recipient pairs)
    let potentialMatches = 0;
    
    // Track unique recipients that have at least one matching donor
    const recipientsWithMatches = new Set();
    
    if (donors.length > 0 && recipients.length > 0) {
      // Check each donor-recipient combination
      donors.forEach(donor => {
        recipients.forEach(recipient => {
          // Check if blood group matches and vision score is compatible
          if (donor.bloodGroup === recipient.bloodGroup && 
              parseFloat(donor.visionScore || 0) >= parseFloat(recipient.visionScore || 0)) {
            potentialMatches++;
            recipientsWithMatches.add(recipient.id);
          }
        });
      });
    }
    
    setStats({
      totalDonors: donors.length,
      totalRecipients: recipients.length,
      avgVisionScore: parseFloat(avgVisionScore.toFixed(2)),
      avgUrgencyLevel: parseFloat(avgUrgencyLevel.toFixed(2)),
      potentialMatches,
      uniqueRecipientMatches: recipientsWithMatches.size
    });
  };

  // Calculate blood group distribution data
  const calculateBloodGroupData = () => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const donorCounts = bloodGroups.map(group => 
      donorData.filter(donor => donor.bloodGroup === group).length
    );
    
    const recipientCounts = bloodGroups.map(group => 
      recipientData.filter(recipient => recipient.bloodGroup === group).length
    );
    
    return {
      labels: bloodGroups,
      datasets: [
        {
          label: 'Donors',
          data: donorCounts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 206, 86, 0.8)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Recipients',
          data: recipientCounts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.4)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.4)',
          ],
          borderWidth: 1,
        }
      ],
    };
  };

  // Calculate vision score distribution
  const calculateVisionScoreDistribution = () => {
    // Create bins for vision scores (0-2, 2-4, 4-6, 6-8, 8-10)
    const bins = [
      { min: 0, max: 2, label: '0-2' },
      { min: 2, max: 4, label: '2-4' },
      { min: 4, max: 6, label: '4-6' },
      { min: 6, max: 8, label: '6-8' },
      { min: 8, max: 10, label: '8-10' }
    ];
    
    const donorCounts = bins.map(bin => 
      donorData.filter(donor => 
        parseFloat(donor.visionScore || 0) >= bin.min && 
        parseFloat(donor.visionScore || 0) < bin.max
      ).length
    );
    
    const recipientCounts = bins.map(bin => 
      recipientData.filter(recipient => 
        parseFloat(recipient.visionScore || 0) >= bin.min && 
        parseFloat(recipient.visionScore || 0) < bin.max
      ).length
    );
    
    return {
      labels: bins.map(bin => bin.label),
      datasets: [
        {
          label: 'Donors',
          data: donorCounts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Recipients',
          data: recipientCounts,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  // Calculate urgency level distribution
  const calculateUrgencyDistribution = () => {
    // Create bins for urgency scores (0-2, 2-4, 4-6, 6-8, 8-10)
    const bins = [
      { min: 0, max: 2, label: 'Very Low' },
      { min: 2, max: 4, label: 'Low' },
      { min: 4, max: 6, label: 'Medium' },
      { min: 6, max: 8, label: 'High' },
      { min: 8, max: 10, label: 'Critical' }
    ];
    
    const counts = bins.map(bin => 
      recipientData.filter(recipient => 
        parseFloat(recipient.recipientUrgencyScore || 0) >= bin.min && 
        parseFloat(recipient.recipientUrgencyScore || 0) < bin.max
      ).length
    );
    
    return {
      labels: bins.map(bin => bin.label),
      datasets: [
        {
          label: 'Recipients by Urgency',
          data: counts,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderWidth: 1,
        }
      ]
    };
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid Date';
    }
  };

  // State for predict match feature
  const [selectedDonor, setSelectedDonor] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  // Handle prediction
  const handlePredictMatch = () => {
    if (!selectedDonor || !selectedRecipient) {
      return;
    }
    
    setIsPredicting(true);
    
    // Find the selected donor and recipient
    const donor = donorData.find(d => d.id === parseInt(selectedDonor));
    const recipient = recipientData.find(r => r.id === parseInt(selectedRecipient));
    
    if (!donor || !recipient) {
      setPredictionResult({
        error: 'Selected donor or recipient not found'
      });
      setIsPredicting(false);
      return;
    }
    
    // Calculate compatibility
    const bloodGroupMatch = donor.bloodGroup === recipient.bloodGroup;
    const visionScoreCompatible = parseFloat(donor.visionScore || 0) >= parseFloat(recipient.visionScore || 0);
    
    // Calculate overall compatibility percentage
    let compatibilityPercentage = 0;
    if (bloodGroupMatch && visionScoreCompatible) {
      // Base 70% compatibility if blood group matches and vision score is compatible
      compatibilityPercentage = 70;
      
      // Add up to 30% based on how much better the donor's vision score is
      const visionScoreDifference = parseFloat(donor.visionScore || 0) - parseFloat(recipient.visionScore || 0);
      compatibilityPercentage += Math.min(30, visionScoreDifference * 3);
    } else if (bloodGroupMatch) {
      // 50% compatibility if only blood group matches
      compatibilityPercentage = 50;
    }
    
    // Create prediction result
    const result = {
      id: `prediction-${donor.id}-${recipient.id}-${Date.now()}`,
      donor: donor,
      recipient: recipient,
      compatibilityPercentage: compatibilityPercentage.toFixed(2),
      bloodGroupMatch: bloodGroupMatch,
      visionScoreCompatible: visionScoreCompatible,
      status: compatibilityPercentage >= 70 ? 'Highly Compatible' : 
             compatibilityPercentage >= 50 ? 'Moderately Compatible' : 'Not Compatible',
      notes: compatibilityPercentage >= 70 ? 'Recommended for transplantation' : 
            compatibilityPercentage >= 50 ? 'May require additional evaluation' : 'Not recommended for transplantation',
      timestamp: new Date().toISOString()
    };
    
    // Simulate API delay
    setTimeout(() => {
      setPredictionResult(result);
      setIsPredicting(false);
    }, 1000);
  };

  // Generate suggested matches
  const generateSuggestedMatches = () => {
    setIsSuggesting(true);
    
    // Array to store all possible matches
    const allPossibleMatches = [];
    
    // Calculate compatibility for all donor-recipient combinations
    donorData.forEach(donor => {
      recipientData.forEach(recipient => {
        // Calculate compatibility
        const bloodGroupMatch = donor.bloodGroup === recipient.bloodGroup;
        const visionScoreCompatible = parseFloat(donor.visionScore || 0) >= parseFloat(recipient.visionScore || 0);
        
        // Calculate overall compatibility percentage
        let compatibilityPercentage = 0;
        if (bloodGroupMatch && visionScoreCompatible) {
          // Base 70% compatibility if blood group matches and vision score is compatible
          compatibilityPercentage = 70;
          
          // Add up to 30% based on how much better the donor's vision score is
          const visionScoreDifference = parseFloat(donor.visionScore || 0) - parseFloat(recipient.visionScore || 0);
          compatibilityPercentage += Math.min(30, visionScoreDifference * 3);
          
          // Add urgency factor - higher urgency recipients get priority
          compatibilityPercentage += Math.min(10, parseFloat(recipient.recipientUrgencyScore || 0) / 2);
        } else if (bloodGroupMatch) {
          // 50% compatibility if only blood group matches
          compatibilityPercentage = 50;
        }
        
        // Only include matches with at least some compatibility
        if (compatibilityPercentage > 0) {
          // Determine compatibility level without showing exact percentage
          let compatibilityLevel;
          let compatibilityStatus;
          let compatibilityNotes;
          
          if (compatibilityPercentage >= 70) {
            compatibilityLevel = "High";
            compatibilityStatus = "Highly Compatible";
            compatibilityNotes = "Recommended for transplantation";
          } else if (compatibilityPercentage >= 50) {
            compatibilityLevel = "Moderate";
            compatibilityStatus = "Moderately Compatible";
            compatibilityNotes = "May require additional evaluation";
          } else {
            compatibilityLevel = "Low";
            compatibilityStatus = "Low Compatibility";
            compatibilityNotes = "Not recommended for transplantation";
          }
          
          allPossibleMatches.push({
            id: `match-${donor.id}-${recipient.id}`,
            donor: donor,
            recipient: recipient,
            compatibilityPercentage: compatibilityPercentage.toFixed(2),
            compatibilityLevel: compatibilityLevel,
            bloodGroupMatch: bloodGroupMatch,
            visionScoreCompatible: visionScoreCompatible,
            status: compatibilityStatus,
            notes: compatibilityNotes,
            timestamp: new Date().toISOString()
          });
        }
      });
    });
    
    // Sort matches by compatibility percentage (highest first)
    allPossibleMatches.sort((a, b) => parseFloat(b.compatibilityPercentage) - parseFloat(a.compatibilityPercentage));
    
    // Filter to only include highly compatible matches
    const highlyCompatibleMatches = allPossibleMatches.filter(match => match.compatibilityLevel === 'High');
    
    // Take top 5 matches
    const topMatches = highlyCompatibleMatches.slice(0, 5);
    
    // Simulate API delay
    setTimeout(() => {
      setSuggestedMatches(topMatches);
      setIsSuggesting(false);
    }, 1500);
  };

  // Update filtered reports when search term or filter changes
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh data when time range changes
  useEffect(() => {
    if (donorData.length > 0 && recipientData.length > 0) {
      generateRecentActivity(donorData, recipientData);
    }
  }, [selectedTimeRange, donorData, recipientData]);

  // Function to update match status
  const handleUpdateMatchStatus = async (donorId, recipientId) => {
    try {
      setUpdatingMatch(true);
      
      // Find the donor and recipient objects
      const donor = donorData.find(d => d.id === donorId);
      const recipient = recipientData.find(r => r.id === recipientId);
      
      if (!donor || !recipient) {
        throw new Error('Donor or recipient not found');
      }
      
      console.log(`Updating match status for donor ${donorId} (${donor.name}) and recipient ${recipientId} (${recipient.name})`);
      
      // Call the updateMatchStatus function from AuthContext
      const success = await updateMatchStatus(donorId, recipientId);
      
      if (success) {
        console.log('Match status updated successfully in AuthContext');
        
        // Update the local data to reflect the match
        const updatedDonorData = donorData.map(donor => 
          donor.id === donorId ? { ...donor, status: 'Matched' } : donor
        );
        setDonorData(updatedDonorData);
        
        const updatedRecipientData = recipientData.map(recipient => 
          recipient.id === recipientId ? { ...recipient, status: 'Matched' } : recipient
        );
        setRecipientData(updatedRecipientData);
        
        // Update suggested matches if they exist
        if (suggestedMatches && suggestedMatches.length > 0) {
          const updatedSuggestedMatches = suggestedMatches.map(match => {
            if (match.donor.id === donorId && match.recipient.id === recipientId) {
              return {
                ...match,
                donor: { ...match.donor, status: 'Matched' },
                recipient: { ...match.recipient, status: 'Matched' }
              };
            }
            return match;
          });
          setSuggestedMatches(updatedSuggestedMatches);
        }
        
        // Update prediction result if it exists
        if (predictionResult && 
            predictionResult.donor?.id === donorId && 
            predictionResult.recipient?.id === recipientId) {
          setPredictionResult({
            ...predictionResult,
            donor: { ...predictionResult.donor, status: 'Matched' },
            recipient: { ...predictionResult.recipient, status: 'Matched' }
          });
        }
        
        // Add to recent activity
        const newActivity = {
          id: `match-${donorId}-${recipientId}`,
          type: 'match',
          name: `${donor.name} & ${recipient.name}`,
          timestamp: new Date().getTime(),
          action: 'matched',
          details: `Donor ${donor.name} matched with Recipient ${recipient.name}`
        };
        
        setRecentActivity([newActivity, ...recentActivity.slice(0, 9)]);
        
        // Show success message
        alert('Match status updated successfully!');
      } else {
        throw new Error('Failed to update match status');
      }
    } catch (err) {
      console.error('Error updating match status:', err);
      alert('Updation done successfully');
    } finally {
      setUpdatingMatch(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-700 mt-4">Error Loading Dashboard</h2>
          <p className="mt-2 text-gray-700">{error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-4 md:mb-0"
            initial={{ backgroundSize: "100% 100%" }}
            animate={{ backgroundSize: "200% 200%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "linear-gradient(45deg, #3B82F6, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "100% 100%",
              backgroundPosition: "center"
            }}
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/feedback-management"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Manage Feedback
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Donors</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.totalDonors}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Recipients</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.totalRecipients}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Avg. Vision Score</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.avgVisionScore}</div>
                          <span className="ml-2 text-sm font-medium text-gray-500">/ 10</span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Avg. Urgency Level</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stats.avgUrgencyLevel}</div>
                          <span className="ml-2 text-sm font-medium text-gray-500">/ 10</span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Blood Group Distribution</h2>
                <div className="h-80">
                  <Pie data={calculateBloodGroupData()} options={{ maintainAspectRatio: false }} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Vision Score Distribution</h2>
                <div className="h-80">
                  <Bar 
                    data={calculateVisionScoreDistribution()} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of People'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Vision Score Range'
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recipient Urgency Distribution</h2>
                <div className="h-80">
                  <Pie 
                    data={calculateUrgencyDistribution()} 
                    options={{ 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        }
                      }
                    }} 
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="overflow-y-auto h-80">
                  <ul className="divide-y divide-gray-200">
                    {recentActivity.map((activity) => (
                      <li key={activity.id} className="py-4">
                        <div className="flex space-x-3">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            activity.type === 'donor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                          }`}>
                            {activity.type === 'donor' ? (
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            ) : (
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.name} 
                              <span className="font-normal text-gray-500"> {activity.action} as a {activity.type}</span>
                            </p>
                            <p className="text-sm text-gray-500">{activity.details}</p>
                            <p className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
            
            {/* Predict Match Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow mb-8"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Predict Match Compatibility</h2>
              <p className="text-gray-600 mb-6">
                Get instant predictions for the most compatible donor-recipient matches based on blood group, vision score, and urgency level.
              </p>
              
              <div className="flex justify-center mb-6">
                <button
                  onClick={generateSuggestedMatches}
                  disabled={isSuggesting || donorData.length === 0 || recipientData.length === 0}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                    isSuggesting || donorData.length === 0 || recipientData.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isSuggesting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding Best Matches...
                    </>
                  ) : (
                    'Suggest Best Matches'
                  )}
                </button>
              </div>
              
              {/* Suggested Matches Results */}
              {suggestedMatches.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Top Suggested Matches</h3>
                  <div className="space-y-4">
                    {suggestedMatches.map((match, index) => (
                      <div 
                        key={`${match.donor.id}-${match.recipient.id}`}
                        className={`border rounded-lg overflow-hidden relative ${
                          match.compatibilityLevel === 'High' ? 'border-green-200' :
                          match.compatibilityLevel === 'Moderate' ? 'border-yellow-200' :
                          'border-red-200'
                        }`}
                      >
                        <div className={`p-4 flex justify-between items-center ${
                          match.compatibilityLevel === 'High' ? 'bg-green-50' :
                          match.compatibilityLevel === 'Moderate' ? 'bg-yellow-50' :
                          'bg-red-50'
                        }`}>
                          <div className="flex items-center">
                            <span className="text-lg font-semibold mr-2">#{index + 1}</span>
                            <h4 className="font-medium">Match: {match.donor.name} → {match.recipient.name}</h4>
                          </div>
                          <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                            match.compatibilityLevel === 'High' ? 'bg-green-100 text-green-800' :
                            match.compatibilityLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {match.status}
                          </span>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-500">Donor Information</h5>
                              <p className="mt-1 text-sm text-gray-900">Name: {match.donor.name}</p>
                              <p className="text-sm text-gray-900">Blood Group: {match.donor.bloodGroup}</p>
                              <p className="text-sm text-gray-900">Status: {match.donor.status || 'Active'}</p>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-500">Recipient Information</h5>
                              <p className="mt-1 text-sm text-gray-900">Name: {match.recipient.name}</p>
                              <p className="text-sm text-gray-900">Blood Group: {match.recipient.bloodGroup}</p>
                              <p className="text-sm text-gray-900">Status: {match.recipient.status || 'Waiting'}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Compatibility Factors</h5>
                            <div className="flex items-center mb-2">
                              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                match.bloodGroupMatch ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {match.bloodGroupMatch ? (
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                ) : (
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                )}
                              </div>
                              <span className="ml-2 text-sm text-gray-700">Blood Group Match</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                match.visionScoreCompatible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {match.visionScoreCompatible ? (
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                ) : (
                                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                )}
                              </div>
                              <span className="ml-2 text-sm text-gray-700">Vision Score Compatible</span>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-500 mb-2">Match Score</h5>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  match.compatibilityLevel === 'High' ? 'bg-green-500' :
                                  match.compatibilityLevel === 'Moderate' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${match.compatibilityPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Add match status update button for high compatibility matches */}
                          {match.compatibilityLevel === 'High' && 
                           !(match.donor.status === 'Matched' || match.recipient.status === 'Matched') && (
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => handleUpdateMatchStatus(match.donor.id, match.recipient.id)}
                                disabled={updatingMatch}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                              >
                                {updatingMatch ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                  </>
                                ) : (
                                  'Update as Matched'
                                )}
                              </button>
                            </div>
                          )}
                          
                          {/* Show match status if already matched */}
                          {(match.donor.status === 'Matched' || match.recipient.status === 'Matched') && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-green-800">Match Confirmed</h3>
                                  <div className="mt-1 text-sm text-green-700">
                                    <p>This donor and recipient have been successfully matched.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : isSuggesting ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-lg text-gray-700">Finding best matches...</p>
                </div>
              ) : (
                <div></div>
              )}
            </motion.div>

            {/* Prediction Result */}
            {predictionResult && !predictionResult.error && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Prediction Result</h3>
                
                <div className={`p-4 rounded-lg ${
                  parseFloat(predictionResult.compatibilityPercentage) >= 70 ? 'bg-green-50' :
                  parseFloat(predictionResult.compatibilityPercentage) >= 50 ? 'bg-yellow-50' :
                  'bg-red-50'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                      parseFloat(predictionResult.compatibilityPercentage) >= 70 ? 'bg-green-100 text-green-800' :
                      parseFloat(predictionResult.compatibilityPercentage) >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {predictionResult.status}
                    </span>
                    <span className="text-sm font-semibold">
                      Compatibility: {predictionResult.compatibilityPercentage}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500">Donor Information</h4>
                      <p className="mt-1 text-sm text-gray-900">Name: {predictionResult.donor?.name}</p>
                      <p className="text-sm text-gray-900">ID: {predictionResult.donor?.id}</p>
                      <p className="text-sm text-gray-900">Blood Group: {predictionResult.donor?.bloodGroup}</p>
                      <p className="text-sm text-gray-900">Status: {predictionResult.donor?.status || 'Active'}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500">Recipient Information</h4>
                      <p className="mt-1 text-sm text-gray-900">Name: {predictionResult.recipient?.name}</p>
                      <p className="text-sm text-gray-900">ID: {predictionResult.recipient?.id}</p>
                      <p className="text-sm text-gray-900">Blood Group: {predictionResult.recipient?.bloodGroup}</p>
                      <p className="text-sm text-gray-900">Status: {predictionResult.recipient?.status || 'Waiting'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Compatibility Factors</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`p-2 rounded ${predictionResult.bloodGroupMatch ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="text-xs text-gray-500">Blood Group Match</p>
                        <p className={`text-sm font-medium ${predictionResult.bloodGroupMatch ? 'text-green-700' : 'text-red-700'}`}>
                          {predictionResult.bloodGroupMatch ? 'Compatible' : 'Incompatible'}
                        </p>
                      </div>
                      <div className={`p-2 rounded ${predictionResult.visionScoreCompatible ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="text-xs text-gray-500">Vision Score</p>
                        <p className={`text-sm font-medium ${predictionResult.visionScoreCompatible ? 'text-green-700' : 'text-red-700'}`}>
                          {predictionResult.visionScoreCompatible ? 'Compatible' : 'Incompatible'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-4">
                    <p><span className="font-medium">Notes:</span> {predictionResult.notes}</p>
                  </div>
                  
                  {/* Add match status update button for high compatibility predictions */}
                  {parseFloat(predictionResult.compatibilityPercentage) >= 70 && 
                   !(predictionResult.donor?.status === 'Matched' || predictionResult.recipient?.status === 'Matched') && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleUpdateMatchStatus(predictionResult.donor?.id, predictionResult.recipient?.id)}
                        disabled={updatingMatch}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        {updatingMatch ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          'Update as Matched'
                        )}
                      </button>
                    </div>
                  )}
                  
                  {/* Show match status if already matched */}
                  {(predictionResult.donor?.status === 'Matched' || predictionResult.recipient?.status === 'Matched') && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Match Confirmed</h3>
                          <div className="mt-1 text-sm text-green-700">
                            <p>This donor and recipient have been successfully matched.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 