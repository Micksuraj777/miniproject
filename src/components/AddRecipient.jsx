import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AddRecipient = () => {
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
    visionScore: '',
    bloodMatchScore: '',
    hlaMatchScore: '',
    tissueQualityScore: '',
    recipientUrgencyScore: ''
  });

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
      case 'visionScore':
        return formData.visionScore < 0 || formData.visionScore > 10 ? 'Vision score must be between 0 and 10' : '';
      case 'bloodMatchScore':
        return formData.bloodMatchScore < 0 || formData.bloodMatchScore > 10 ? 'Blood match score must be between 0 and 10' : '';
      case 'hlaMatchScore':
        return formData.hlaMatchScore < 0 || formData.hlaMatchScore > 10 ? 'HLA match score must be between 0 and 10' : '';
      case 'tissueQualityScore':
        return formData.tissueQualityScore < 0 || formData.tissueQualityScore > 10 ? 'Tissue quality score must be between 0 and 10' : '';
      case 'recipientUrgencyScore':
        return formData.recipientUrgencyScore < 0 || formData.recipientUrgencyScore > 10 ? 'Recipient urgency score must be between 0 and 10' : '';
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
      'name', 'age', 'contact', 'address', 'visionScore',
      'bloodMatchScore', 'hlaMatchScore', 'tissueQualityScore', 'recipientUrgencyScore'
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
      const response = await fetch('http://localhost:8080/recipient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipient');
      }

      setSuccess(true);
      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        bloodGroup: 'A+',
        contact: '',
        address: '',
        visionScore: '',
        bloodMatchScore: '',
        hlaMatchScore: '',
        tissueQualityScore: '',
        recipientUrgencyScore: ''
      });
      setTouched({});

      setTimeout(() => {
        navigate('/receiver');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderScoreInput = (name, label) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="ml-1 text-sm text-gray-500">(0-10)</span>
      </label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          required
          min="0"
          max="10"
          step="0.1"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
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
                Add New Recipient
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-gray-600"
              >
                Please fill in the recipient information carefully
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
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

                {renderScoreInput('visionScore', 'Vision Score')}
                {renderScoreInput('bloodMatchScore', 'Blood Match Score')}
                {renderScoreInput('hlaMatchScore', 'HLA Match Score')}
                {renderScoreInput('tissueQualityScore', 'Tissue Quality Score')}
                {renderScoreInput('recipientUrgencyScore', 'Recipient Urgency Score')}
              </div>

              <div>
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
                  Recipient added successfully! Redirecting...
                </motion.div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/receiver')}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center ${
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
                    'Add Recipient'
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

export default AddRecipient; 