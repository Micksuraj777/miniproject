import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './button';
import { Tables } from './table';
import { RecipientTable } from './RecipientTable';

function Check() {
    // State for form inputs
    const [donorSearch, setDonorSearch] = useState('');
    const [recipientSearch, setRecipientSearch] = useState('');
    const [searchType, setSearchType] = useState('id'); // 'id' or 'name'
    
    // State for fetched data
    const [donorData, setDonorData] = useState(null);
    const [recipientData, setRecipientData] = useState(null);
    
    // State for loading and errors
    const [donorLoading, setDonorLoading] = useState(false);
    const [recipientError, setRecipientError] = useState(null);
    const [donorError, setDonorError] = useState(null);
    const [recipientLoading, setRecipientLoading] = useState(false);
    
    // State for table data
    const [donorTableData, setDonorTableData] = useState([]);
    const [recipientTableData, setRecipientTableData] = useState([]);
    
    // State for validation
    const [validationResult, setValidationResult] = useState(null);
    const [validating, setValidating] = useState(false);
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    
    const resultVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        exit: { scale: 0.8, opacity: 0 }
    };

    // Fetch all donor data on component mount
    useEffect(() => {
        const fetchAllDonors = async () => {
            try {
                const response = await fetch('http://localhost:8080/donor', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                const data = await response.json();
                setDonorTableData(data);
            } catch (error) {
                console.error("Error fetching donors:", error);
            }
        };
        
        const fetchAllRecipients = async () => {
            try {
                const response = await fetch('http://localhost:8080/recipient', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                const data = await response.json();
                setRecipientTableData(data);
            } catch (error) {
                console.error("Error fetching recipients:", error);
            }
        };
        
        fetchAllDonors();
        fetchAllRecipients();
    }, []);

    // Function to fetch donor data from table
    const fetchDonor = () => {
        if (!donorSearch.trim()) return;
        
        setDonorLoading(true);
        setDonorError(null);
        setDonorData(null);
        
        try {
            // Search in the donor table data
            let foundDonor;
            
            if (searchType === 'id') {
                foundDonor = donorTableData.find(donor => 
                    donor.id.toString() === donorSearch.trim()
                );
            } else {
                foundDonor = donorTableData.find(donor => 
                    donor.name.toLowerCase().includes(donorSearch.trim().toLowerCase())
                );
            }
            
            if (foundDonor) {
                setDonorData(foundDonor);
            } else {
                throw new Error(`No donor found with the given ${searchType}`);
            }
        } catch (error) {
            setDonorError(error.message);
        } finally {
            setDonorLoading(false);
        }
    };
    
    // Function to fetch recipient data from table
    const fetchRecipient = () => {
        if (!recipientSearch.trim()) return;
        
        setRecipientLoading(true);
        setRecipientError(null);
        setRecipientData(null);
        
        try {
            // Search in the recipient table data
            let foundRecipient;
            
            if (searchType === 'id') {
                foundRecipient = recipientTableData.find(recipient => 
                    recipient.id.toString() === recipientSearch.trim()
                );
            } else {
                foundRecipient = recipientTableData.find(recipient => 
                    recipient.name.toLowerCase().includes(recipientSearch.trim().toLowerCase())
                );
            }
            
            if (foundRecipient) {
                setRecipientData(foundRecipient);
            } else {
                throw new Error(`No recipient found with the given ${searchType}`);
            }
        } catch (error) {
            setRecipientError(error.message);
        } finally {
            setRecipientLoading(false);
        }
    };
    
    // Function to validate compatibility
    const validateCompatibility = async () => {
        if (!donorData || !recipientData) return;
        
        setValidating(true);
        setValidationResult(null);
        
        try {
            // Step 1: Check blood group compatibility
            if (donorData.bloodGroup !== recipientData.bloodGroup) {
                setValidationResult({
                    isCompatible: false,
                    stage: 'bloodGroup',
                    message: 'Blood groups do not match',
                    details: {
                        donorBloodGroup: donorData.bloodGroup,
                        recipientBloodGroup: recipientData.bloodGroup
                    },
                    successRate: 0
                });
                return;
            }
            
            // Step 2: Check vision score compatibility
            if (donorData.visionScore <= recipientData.visionScore) {
                setValidationResult({
                    isCompatible: false,
                    stage: 'visionScore',
                    message: 'Donor vision score must be greater than recipient vision score',
                    details: {
                        donorVisionScore: donorData.visionScore,
                        recipientVisionScore: recipientData.visionScore
                    },
                    successRate: 0
                });
                return;
            }
            
            // Step 3: Calculate total compatibility score with animation
            // First set a calculating state
            setValidationResult({
                isCompatible: null,
                stage: 'calculating',
                calculationProgress: 0,
                scores: {},
                successRate: 0
            });
            
            // Simulate calculation steps with delays - using ONLY recipient data
            
            // Blood Match Score - based on exact match
            const bloodMatchScore = recipientData.bloodMatchScore;
            await new Promise(resolve => setTimeout(resolve, 500));
            setValidationResult(prev => ({
                ...prev,
                calculationProgress: 20,
                scores: { ...prev.scores, bloodMatchScore }
            }));
            
            // Vision Score - using recipient's data
            const visionScore = recipientData.visionScore;
            await new Promise(resolve => setTimeout(resolve, 500));
            setValidationResult(prev => ({
                ...prev,
                calculationProgress: 40,
                scores: { ...prev.scores, visionScore }
            }));
            
            // HLA Match Score - directly from recipient data
            const hlaMatchScore = recipientData.hlaMatchScore;
            await new Promise(resolve => setTimeout(resolve, 500));
            setValidationResult(prev => ({
                ...prev,
                calculationProgress: 60,
                scores: { ...prev.scores, hlaMatchScore }
            }));
            
            // Tissue Quality Score - directly from recipient data
            const tissueQualityScore = recipientData.tissueQualityScore;
            await new Promise(resolve => setTimeout(resolve, 500));
            setValidationResult(prev => ({
                ...prev,
                calculationProgress: 80,
                scores: { ...prev.scores, tissueQualityScore }
            }));
            
            // Recipient Urgency Score - directly from recipient data
            const recipientUrgencyScore = recipientData.recipientUrgencyScore;
            await new Promise(resolve => setTimeout(resolve, 500));
            setValidationResult(prev => ({
                ...prev,
                calculationProgress: 100,
                scores: { ...prev.scores, recipientUrgencyScore }
            }));
            
            // Calculate total score using only recipient data
            const totalScore = bloodMatchScore + visionScore + hlaMatchScore + tissueQualityScore + recipientUrgencyScore;
            
            // Calculate success rate as a percentage
            const maxPossibleScore = 50; // 10 points for each of the 5 categories
            const successRate = (totalScore / maxPossibleScore) * 100;
            
            // Final compatibility decision
            await new Promise(resolve => setTimeout(resolve, 700));
            setValidationResult({
                isCompatible: totalScore >= 25,
                stage: 'complete',
                message: totalScore >= 25 ? 
                    'Donor and recipient are compatible' : 
                    'Total compatibility score is below the required threshold',
                totalScore,
                minimumRequired: 25,
                successRate: successRate.toFixed(1),
                scores: {
                    bloodMatchScore,
                    visionScore,
                    hlaMatchScore,
                    tissueQualityScore,
                    recipientUrgencyScore
                }
            });
        } catch (error) {
            console.error("Validation error:", error);
            setValidationResult({
                isCompatible: false,
                stage: 'error',
                message: 'An error occurred during compatibility check',
                error: error.message,
                successRate: 0
            });
        } finally {
            setValidating(false);
        }
    };
    
    // Reset validation when donor or recipient changes
    useEffect(() => {
        setValidationResult(null);
    }, [donorData, recipientData]);

  return (
        <div className="max-w-screen-xl mx-auto px-4">
            <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Compatibility Check</h1>
                <p className="text-gray-600">Search for a donor and recipient to check their compatibility</p>
            </motion.div>
            
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Search Type Toggle */}
                <motion.div 
                    className="col-span-1 md:col-span-2 flex justify-center mb-4"
                    variants={itemVariants}
                >
                    <div className="inline-flex rounded-md shadow-sm p-1 bg-gray-100">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                searchType === 'id' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-700 hover:text-gray-900'
                            }`}
                            onClick={() => setSearchType('id')}
                        >
                            Search by ID
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                searchType === 'name' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-700 hover:text-gray-900'
                            }`}
                            onClick={() => setSearchType('name')}
                        >
                            Search by Name
                        </button>
                    </div>
                </motion.div>
                
                {/* Donor Search Form */}
                <motion.div 
                    className="bg-white p-6 rounded-xl shadow-md"
                    variants={itemVariants}
                >
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Donor Information
                        </h2>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder={searchType === 'id' ? "Enter donor ID" : "Enter donor name"}
                                value={donorSearch}
                                onChange={(e) => setDonorSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && fetchDonor()}
                            />
                            <button
                                className="absolute right-2 top-2 p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                onClick={fetchDonor}
                                disabled={donorLoading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Donor Results */}
                    <AnimatePresence mode="wait">
                        {donorLoading ? (
                            <motion.div 
                                key="donor-loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="animate-pulse space-y-4"
                            >
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </motion.div>
                        ) : donorError ? (
                            <motion.div 
                                key="donor-error"
                                variants={resultVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="p-4 bg-red-50 text-red-600 rounded-lg"
                            >
                                <p className="font-medium">Error: {donorError}</p>
                                <p className="text-sm mt-1">Please try again or use a different search term.</p>
                            </motion.div>
                        ) : donorData ? (
                            <motion.div 
                                key="donor-data"
                                variants={resultVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-blue-50 p-4 rounded-lg"
                            >
                                <h3 className="font-semibold text-blue-800 mb-2">Donor Found</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-600">Name:</div>
                                    <div className="font-medium">{donorData.name}</div>
                                    
                                    <div className="text-gray-600">ID:</div>
                                    <div className="font-medium">{donorData.id}</div>
                                    
                                    <div className="text-gray-600">Age:</div>
                                    <div className="font-medium">{donorData.age}</div>
                                    
                                    <div className="text-gray-600">Gender:</div>
                                    <div className="font-medium">{donorData.gender}</div>
                                    
                                    <div className="text-gray-600">Blood Group:</div>
                                    <div className="font-medium">{donorData.bloodGroup}</div>
                                    
                                    <div className="text-gray-600">Vision Score:</div>
                                    <div className="font-medium">{donorData.visionScore}/10</div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>
                
                {/* Recipient Search Form */}
                <motion.div 
                    className="bg-white p-6 rounded-xl shadow-md"
                    variants={itemVariants}
                >
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </span>
                            Recipient Information
                        </h2>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                placeholder={searchType === 'id' ? "Enter recipient ID" : "Enter recipient name"}
                                value={recipientSearch}
                                onChange={(e) => setRecipientSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && fetchRecipient()}
                            />
                            <button
                                className="absolute right-2 top-2 p-1 rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all"
                                onClick={fetchRecipient}
                                disabled={recipientLoading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Recipient Results */}
                    <AnimatePresence mode="wait">
                        {recipientLoading ? (
                            <motion.div 
                                key="recipient-loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="animate-pulse space-y-4"
                            >
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </motion.div>
                        ) : recipientError ? (
                            <motion.div 
                                key="recipient-error"
                                variants={resultVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="p-4 bg-red-50 text-red-600 rounded-lg"
                            >
                                <p className="font-medium">Error: {recipientError}</p>
                                <p className="text-sm mt-1">Please try again or use a different search term.</p>
                            </motion.div>
                        ) : recipientData ? (
                            <motion.div 
                                key="recipient-data"
                                variants={resultVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-green-50 p-4 rounded-lg"
                            >
                                <h3 className="font-semibold text-green-800 mb-2">Recipient Found</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-600">Name:</div>
                                    <div className="font-medium">{recipientData.name}</div>
                                    
                                    <div className="text-gray-600">ID:</div>
                                    <div className="font-medium">{recipientData.id}</div>
                                    
                                    <div className="text-gray-600">Age:</div>
                                    <div className="font-medium">{recipientData.age}</div>
                                    
                                    <div className="text-gray-600">Gender:</div>
                                    <div className="font-medium">{recipientData.contact}</div>
                                    
                                    <div className="text-gray-600">Blood Group:</div>
                                    <div className="font-medium">{recipientData.bloodGroup}</div>
                                    
                                    <div className="text-gray-600">Vision Score:</div>
                                    <div className="font-medium">{recipientData.visionScore}/10</div>
                                    
                                    <div className="text-gray-600">Urgency:</div>
                                    <div className="font-medium">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            recipientData.recipientUrgencyScore >= 8 
                                                ? 'bg-red-100 text-red-800' 
                                                : recipientData.recipientUrgencyScore >= 6 
                                                ? 'bg-orange-100 text-orange-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {recipientData.recipientUrgencyScore}/10
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
            
            {/* Validation Button */}
            <motion.div 
                className="flex justify-center mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
      <Button
                    text="Check Compatibility"
                    onClick={validateCompatibility}
                    color="bg-gradient-to-r from-blue-600 to-green-600"
                    size="py-3 px-8"
                    rounded="rounded-full"
                    loading={validating}
                    disabled={!donorData || !recipientData}
                    className="text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                />
            </motion.div>
            
            {/* Validation Results */}
            <AnimatePresence>
                {validationResult && (
                    <motion.div
                        key="validation-result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={(e) => {
                            // Close popup when clicking outside
                            if (e.target === e.currentTarget) {
                                setValidationResult(null);
                            }
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className={`p-4 ${
                                validationResult.stage === 'calculating' ? 'bg-blue-500' :
                                validationResult.isCompatible ? 'bg-green-500' : 'bg-red-500'
                            } text-white`}>
                                <h3 className="text-xl font-bold">
                                    {validationResult.stage === 'calculating' ? 'Calculating Compatibility...' :
                                     validationResult.isCompatible ? 'Compatible Match Found' : 'Incompatible Match'}
                                </h3>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6">
                                {validationResult.stage === 'calculating' ? (
                                    <div className="space-y-6">
                                        <p className="text-gray-700 mb-4">Analyzing compatibility factors...</p>
                                        
                                        {/* Progress bar */}
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-blue-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${validationResult.calculationProgress}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                        
                                        {/* Scores being calculated */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Blood Match Score:</span>
                                                {'bloodMatchScore' in validationResult.scores ? (
                                                    <motion.span 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="font-semibold"
                                                    >
                                                        {validationResult.scores.bloodMatchScore}/10
                                                    </motion.span>
                                                ) : (
                                                    <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Vision Score:</span>
                                                {'visionScore' in validationResult.scores ? (
                                                    <motion.span 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="font-semibold"
                                                    >
                                                        {validationResult.scores.visionScore.toFixed(1)}/10
                                                    </motion.span>
                                                ) : (
                                                    <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">HLA Match Score:</span>
                                                {'hlaMatchScore' in validationResult.scores ? (
                                                    <motion.span 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="font-semibold"
                                                    >
                                                        {validationResult.scores.hlaMatchScore}/10
                                                    </motion.span>
                                                ) : (
                                                    <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Tissue Quality Score:</span>
                                                {'tissueQualityScore' in validationResult.scores ? (
                                                    <motion.span 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="font-semibold"
                                                    >
                                                        {validationResult.scores.tissueQualityScore}/10
                                                    </motion.span>
                                                ) : (
                                                    <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                )}
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Recipient Urgency Score:</span>
                                                {'recipientUrgencyScore' in validationResult.scores ? (
                                                    <motion.span 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="font-semibold"
                                                    >
                                                        {validationResult.scores.recipientUrgencyScore}/10
                                                    </motion.span>
                                                ) : (
                                                    <div className="w-10 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : validationResult.stage === 'bloodGroup' || validationResult.stage === 'visionScore' ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center text-red-500 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{validationResult.message}</span>
                                        </div>
                                        
                                        {validationResult.stage === 'bloodGroup' && (
                                            <div className="grid grid-cols-2 gap-4 bg-red-50 p-4 rounded-lg">
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-500 mb-1">Donor Blood Group</div>
                                                    <div className="text-xl font-bold">{validationResult.details.donorBloodGroup}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-500 mb-1">Recipient Blood Group</div>
                                                    <div className="text-xl font-bold">{validationResult.details.recipientBloodGroup}</div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {validationResult.stage === 'visionScore' && (
                                            <div className="grid grid-cols-2 gap-4 bg-red-50 p-4 rounded-lg">
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-500 mb-1">Donor Vision Score</div>
                                                    <div className="text-xl font-bold">{validationResult.details.donorVisionScore}/10</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-500 mb-1">Recipient Vision Score</div>
                                                    <div className="text-xl font-bold">{validationResult.details.recipientVisionScore}/10</div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <p className="text-gray-600">
                                            This donor and recipient pair is not compatible due to the issue above.
                                            Please select a different donor or recipient.
                                        </p>
                                    </div>
                                ) : validationResult.stage === 'complete' && (
                                    <div className="space-y-6">
                                        <p className="text-gray-700 mb-4">
                                            {validationResult.message}
                                        </p>
                                        
                                        {/* Total score display */}
                                        <div className="text-center mb-6">
                                            <div className="text-sm text-gray-500 mb-1">Total Compatibility Score</div>
                                            <div className={`text-3xl font-bold ${validationResult.isCompatible ? 'text-green-600' : 'text-red-600'}`}>
                                                {validationResult.totalScore}/50
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Minimum required: {validationResult.minimumRequired}
                                            </div>
                                            <div className="mt-3">
                                                <div className="text-sm text-gray-500 mb-1">Success Rate</div>
                                                <div className={`text-2xl font-bold ${
                                                    parseFloat(validationResult.successRate) >= 70 ? 'text-green-600' : 
                                                    parseFloat(validationResult.successRate) >= 50 ? 'text-yellow-600' : 
                                                    'text-red-600'
                                                }`}>
                                                    {validationResult.successRate}%
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Score breakdown */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-700 mb-3">Score Breakdown</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span>Blood Match Score:</span>
                                                    <span className="font-medium">{validationResult.scores.bloodMatchScore}/10</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Vision Score:</span>
                                                    <span className="font-medium">{validationResult.scores.visionScore.toFixed(1)}/10</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>HLA Match Score:</span>
                                                    <span className="font-medium">{validationResult.scores.hlaMatchScore}/10</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Tissue Quality Score:</span>
                                                    <span className="font-medium">{validationResult.scores.tissueQualityScore}/10</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Recipient Urgency Score:</span>
                                                    <span className="font-medium">{validationResult.scores.recipientUrgencyScore}/10</span>
                                                </div>
                                                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                                                    <span>Total Score:</span>
                                                    <span>{validationResult.totalScore}/50</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {validationResult.isCompatible ? (
                                            <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-800">
                                                <p className="font-medium">This donor and recipient are compatible for eye tissue donation.</p>
                                                <p className="text-sm mt-1">You may proceed with the donation process following medical protocols.</p>
                                            </div>
                                        ) : (
                                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-800">
                                                <p className="font-medium">This donor and recipient are not compatible for eye tissue donation.</p>
                                                <p className="text-sm mt-1">The total compatibility score is below the required threshold of {validationResult.minimumRequired}.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* Footer */}
                            <div className="border-t p-4 flex justify-end">
                                <button
                                    onClick={() => setValidationResult(null)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Check;
