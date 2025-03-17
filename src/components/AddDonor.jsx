import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AddDonor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'A+',
    contact: '',
    address: '',
    clarityScore: '',
    opacityScore: '',
    hla_a: '',
    hla_b: '',
    hla_c: '',
    hla_dr: '',
    hla_dq: '',
    tissueQuality: '',
    storageDays: ''
  });

  // Calculate vision score whenever clarity or opacity scores change
  const [visionScore, setVisionScore] = useState(0);
  // Calculate HLA score whenever HLA components change
  const [hlaMatchScore, setHlaMatchScore] = useState(0);
  // Calculate TQS whenever tissue quality or storage days change
  const [tissueQualityScore, setTissueQualityScore] = useState(0);

  useEffect(() => {
    if (formData.clarityScore && formData.opacityScore) {
      const clarity = parseFloat(formData.clarityScore);
      const opacity = parseFloat(formData.opacityScore);
      if (!isNaN(clarity) && !isNaN(opacity)) {
        const calculatedScore = (0.6 * clarity) + (0.4 * opacity);
        setVisionScore(parseFloat(calculatedScore.toFixed(1)));
      }
    } else {
      setVisionScore(0);
    }
  }, [formData.clarityScore, formData.opacityScore]);

  // Calculate TQS whenever tissue quality or storage days change
  useEffect(() => {
    const { tissueQuality, storageDays } = formData;
    
    if (tissueQuality && storageDays) {
      const tq = parseFloat(tissueQuality);
      const sd = parseFloat(storageDays);
      
      if (!isNaN(tq) && !isNaN(sd)) {
        // Calculate using the formula: TQS = (TQ × 0.8) + ((100 - SD) × 0.002)
        const calculatedScore = (tq * 0.8) + ((100 - sd) * 0.002);
        
        // Scale to be out of 10 (max possible raw score is around 0.8 + 0.2 = 1.0)
        const scaledScore = calculatedScore * 10;
        
        setTissueQualityScore(parseFloat(scaledScore.toFixed(1)));
      }
    } else {
      setTissueQualityScore(0);
    }
  }, [formData.tissueQuality, formData.storageDays]);

  // Calculate HLA score whenever any HLA component changes
  useEffect(() => {
    const { hla_a, hla_b, hla_c, hla_dr, hla_dq } = formData;
    
    if (hla_a && hla_b && hla_c && hla_dr && hla_dq) {
      const a = parseFloat(hla_a);
      const b = parseFloat(hla_b);
      const c = parseFloat(hla_c);
      const dr = parseFloat(hla_dr);
      const dq = parseFloat(hla_dq);
      
      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(dr) && !isNaN(dq)) {
        // Calculate using the formula: HLA_Score = (HLA_A × 0.3) + (HLA_B × 0.3) + (HLA_C × 0.2) + (HLA_DR × 0.1) + (HLA_DQ × 0.1)
        const calculatedScore = (a * 0.3) + (b * 0.3) + (c * 0.2) + (dr * 0.1) + (dq * 0.1);
        
        // Scale to be out of 10 (assuming max possible raw score is around 2.0)
        // Max possible: (2.0*0.3) + (2.5*0.3) + (1.5*0.2) + (1.2*0.1) + (1.0*0.1) = 1.87
        const scaledScore = (calculatedScore / 1.87) * 10;
        
        setHlaMatchScore(parseFloat(scaledScore.toFixed(1)));
      }
    } else {
      setHlaMatchScore(0);
    }
  }, [formData.hla_a, formData.hla_b, formData.hla_c, formData.hla_dr, formData.hla_dq]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getInputError = (field) => {
    if (!touched[field]) return '';
    
    switch (field) {
      case 'name':
        return formData.name.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'age':
        return !formData.age || formData.age < 18 || formData.age > 100 ? 'Age must be between 18 and 100' : '';
      case 'contact':
        return !/^\d{10}$/.test(formData.contact) ? 'Contact must be a 10-digit number' : '';
      case 'clarityScore':
        return formData.clarityScore < 0 || formData.clarityScore > 10 ? 'Clarity score must be between 0 and 10' : '';
      case 'opacityScore':
        return formData.opacityScore < 0 || formData.opacityScore > 10 ? 'Opacity score must be between 0 and 10' : '';
      case 'hla_a':
        return formData.hla_a < 0.5 || formData.hla_a > 2.0 ? 'HLA-A must be between 0.5 and 2.0' : '';
      case 'hla_b':
        return formData.hla_b < 0.5 || formData.hla_b > 2.5 ? 'HLA-B must be between 0.5 and 2.5' : '';
      case 'hla_c':
        return formData.hla_c < 0.3 || formData.hla_c > 1.5 ? 'HLA-C must be between 0.3 and 1.5' : '';
      case 'hla_dr':
        return formData.hla_dr < 0.2 || formData.hla_dr > 1.2 ? 'HLA-DR must be between 0.2 and 1.2' : '';
      case 'hla_dq':
        return formData.hla_dq < 0.1 || formData.hla_dq > 1.0 ? 'HLA-DQ must be between 0.1 and 1.0' : '';
      case 'tissueQuality':
        return formData.tissueQuality < 0 || formData.tissueQuality > 1 ? 'Tissue quality must be between 0 and 1' : '';
      case 'storageDays':
        return formData.storageDays < 0 || formData.storageDays > 100 ? 'Storage days must be between 0 and 100' : '';
      case 'address':
        return formData.address.length < 5 ? 'Address must be at least 5 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Touch all fields to show validation
    const allFields = [
      'name', 'age', 'contact', 'address', 'clarityScore', 'opacityScore',
      'hla_a', 'hla_b', 'hla_c', 'hla_dr', 'hla_dq',
      'tissueQuality', 'storageDays'
    ];
    const newTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(newTouched);

    // Check for validation errors
    const errors = allFields.map(field => getInputError(field)).filter(Boolean);
    if (errors.length > 0) {
      setError('Please fix all validation errors before submitting');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create a new object with the form data and the calculated scores
      const dataToSubmit = {
        ...formData,
        visionScore: visionScore,
        hlaMatchScore: hlaMatchScore,
        tissueQualityScore: tissueQualityScore
      };

      const response = await fetch('http://localhost:8080/donor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to add donor');
      }

      setSuccess(true);
      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        bloodGroup: 'A+',
        contact: '',
        address: '',
        clarityScore: '',
        opacityScore: '',
        hla_a: '',
        hla_b: '',
        hla_c: '',
        hla_dr: '',
        hla_dq: '',
        tissueQuality: '',
        storageDays: ''
      });
      setTouched({});

      setTimeout(() => {
        navigate('/donor');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderScoreInput = (name, label, min, max, step) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="ml-1 text-sm text-gray-500">({min}-{max})</span>
      </label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          required
          min={min}
          max={max}
          step={step}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`block w-full px-4 py-3 rounded-lg border ${
            touched[name] && getInputError(name)
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
        />
        {touched[name] && getInputError(name) && (
          <p className="mt-1 text-sm text-red-500">{getInputError(name)}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="mb-10 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800"
              >
                Add New Donor
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-gray-600"
              >
                Please fill in the donor information carefully
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="Enter full name"
                        required
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          touched.name && getInputError('name')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      />
                      {touched.name && getInputError('name') && (
                        <p className="mt-1 text-sm text-red-500">{getInputError('name')}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        onBlur={() => handleBlur('age')}
                        placeholder="Enter age"
                        required
                        min="18"
                        max="100"
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          touched.age && getInputError('age')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      />
                      {touched.age && getInputError('age') && (
                        <p className="mt-1 text-sm text-red-500">{getInputError('age')}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2 transition-colors bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-transparent focus:outline-none focus:ring-2 transition-colors bg-white"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        onBlur={() => handleBlur('contact')}
                        placeholder="Enter 10-digit number"
                        required
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          touched.contact && getInputError('contact')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      />
                      {touched.contact && getInputError('contact') && (
                        <p className="mt-1 text-sm text-red-500">{getInputError('contact')}</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={() => handleBlur('address')}
                        required
                        rows="3"
                        placeholder="Enter complete address"
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          touched.address && getInputError('address')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      />
                      {touched.address && getInputError('address') && (
                        <p className="mt-1 text-sm text-red-500">{getInputError('address')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Score Components */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Vision Score</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Clarity Score
                      <span className="ml-1 text-sm text-gray-500">(0-10)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="clarityScore"
                        value={formData.clarityScore}
                        onChange={handleChange}
                        onBlur={() => handleBlur('clarityScore')}
                        required
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="Enter clarity score"
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          touched.clarityScore && getInputError('clarityScore')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      />
                      {touched.clarityScore && getInputError('clarityScore') && (
                        <p className="mt-1 text-sm text-red-500">{getInputError('clarityScore')}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opacity Score
                      <span className="ml-1 text-sm text-gray-500">(0-10)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="opacityScore"
                        value={formData.opacityScore}
                        onChange={handleChange}
                        onBlur={() => handleBlur('opacityScore')}
                        required
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="Enter opacity score"
                        className={`block w-full px-4 py-3 rounded-lg border ${
                          touched.opacityScore && getInputError('opacityScore')
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        } focus:border-transparent focus:outline-none focus:ring-2 transition-colors`}
                      />
                      {touched.opacityScore && getInputError('opacityScore') && (
                        <p className="mt-1 text-sm text-red-500">{getInputError('opacityScore')}</p>
                      )}
                    </div>
                  </div>

                  {/* Calculated Vision Score Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calculated Vision Score
                    </label>
                    <div className="relative">
                      <div className={`block w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium`}>
                        {visionScore}/10
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Calculated as: (0.6 × Clarity) + (0.4 × Opacity)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tissue Quality Score Components */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Tissue Quality Score</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {renderScoreInput('tissueQuality', 'Tissue Quality', 0, 1, 0.1)}
                  {renderScoreInput('storageDays', 'Storage Days', 0, 100, 1)}
                  
                  {/* Calculated Tissue Quality Score Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calculated Tissue Quality Score
                    </label>
                    <div className="relative">
                      <div className={`block w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium`}>
                        {tissueQualityScore}/10
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Calculated as: (TQ × 0.8) + ((100 - SD) × 0.002)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* HLA Components */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">HLA Components</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {renderScoreInput('hla_a', 'HLA-A', 0.5, 2.0, 0.1)}
                  {renderScoreInput('hla_b', 'HLA-B', 0.5, 2.5, 0.1)}
                  {renderScoreInput('hla_c', 'HLA-C', 0.3, 1.5, 0.1)}
                  {renderScoreInput('hla_dr', 'HLA-DR', 0.2, 1.2, 0.1)}
                  {renderScoreInput('hla_dq', 'HLA-DQ', 0.1, 1.0, 0.1)}
                  
                  {/* Calculated HLA Score Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calculated HLA Match Score
                    </label>
                    <div className="relative">
                      <div className={`block w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium`}>
                        {hlaMatchScore}/10
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Calculated as: (HLA_A × 0.3) + (HLA_B × 0.3) + (HLA_C × 0.2) + (HLA_DR × 0.1) + (HLA_DQ × 0.1)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-500 p-4 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Donor added successfully! Redirecting...
                </motion.div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/donor')}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    'Add Donor'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddDonor; 