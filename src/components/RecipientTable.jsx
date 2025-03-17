import React, { useState, useEffect } from 'react';
import Button from './button';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfileModal from './UserProfileModal';
import { useNavigate } from 'react-router-dom';

export function RecipientTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRows, setVisibleRows] = useState(7);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      const response = await fetch('http://localhost:8080/recipient', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipient data');
      }
      const data = await response.json();
      setRecipients(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    // Show all rows immediately
    setVisibleRows(recipients.length);
    // Add a small delay just for loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleShowLess = () => {
    setVisibleRows(7);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (recipientId) => {
    setSelectedRow(recipientId);
    setSelectedRecipientId(recipientId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-800 ring-green-600/20';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
    return 'bg-red-100 text-red-800 ring-red-600/20';
  };

  const getUrgencyColor = (score) => {
    if (score >= 8) return 'bg-red-100 text-red-800 ring-red-600/20';
    if (score >= 6) return 'bg-orange-100 text-orange-800 ring-orange-600/20';
    return 'bg-green-100 text-green-800 ring-green-600/20';
  };

  const filteredAndSortedData = [...recipients]
    .filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortConfig.key === null) return 0;
      
      const scoreFields = ['visionScore', 'bloodMatchScore', 'hlaMatchScore', 'tissueQualityScore', 'recipientUrgencyScore'];
      if (scoreFields.includes(sortConfig.key)) {
        return sortConfig.direction === 'asc' 
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }
      
      if (sortConfig.key === 'age') {
        return sortConfig.direction === 'asc' 
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }

      return sortConfig.direction === 'asc'
        ? a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
        : a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  const renderTableHeader = () => (
    <thead className="bg-gray-50">
      <tr>
        {[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'contact', label: 'Contact' },
          { key: 'age', label: 'Age' },
          { key: 'gender', label: 'Gender' },
          { key: 'address', label: 'Address' },
          { key: 'bloodGroup', label: 'Blood Group' },
          { key: 'visionScore', label: 'Vision Score' },
          { key: 'hlaMatchScore', label: 'HLA Match' },
          { key: 'recipientUrgencyScore', label: 'Urgency' }
        ].map(({ key, label }) => (
          <th
            key={key}
            scope="col"
            className={`py-3.5 px-4 text-sm font-semibold text-left text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors`}
            onClick={() => handleSort(key)}
          >
            <div className="flex items-center gap-x-2">
              <span>{label}</span>
              {sortConfig.key === key && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-400"
                >
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </motion.span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      <AnimatePresence>
        {filteredAndSortedData.slice(0, visibleRows).map((recipient) => (
          <motion.tr 
            key={recipient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`hover:bg-gray-50 transition-all cursor-pointer ${
              selectedRow === recipient.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleRowClick(recipient.id)}
          >
            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              {recipient.id}
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              {recipient.name}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {recipient.contact}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {recipient.age}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {recipient.gender}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">
              {recipient.address}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {recipient.bloodGroup}
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getScoreColor(recipient.visionScore)}`}>
                {recipient.visionScore}/10
              </span>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getScoreColor(recipient.hlaMatchScore)}`}>
                {recipient.hlaMatchScore}/10
              </span>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getUrgencyColor(recipient.recipientUrgencyScore)}`}>
                {recipient.recipientUrgencyScore}/10
              </span>
            </td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  );

  const renderLoadingSkeleton = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      {[...Array(7)].map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchRecipients}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-4 mx-auto h-screen">
      <div className="flex flex-col mt-6">
        <div className="mb-4 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search recipients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => navigate('/add-recipient')}
              className="bg-green-600 hover:bg-green-700 text-white"
              text="Add Recipient"
            />
            <Button
              onClick={handleClick}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              text={isLoading ? 'Loading...' : 'Show All'}
            />
            {visibleRows > 7 && (
              <Button
                onClick={handleShowLess}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                text="Show Less"
              />
            )}
          </div>
        </div>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {renderTableHeader()}
                {isLoading ? renderLoadingSkeleton() : renderTableBody()}
              </table>
            </div>
          </div>
        </div>
      </div>

      <UserProfileModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        userId={selectedRecipientId}
        userType="recipient"
      />
    </section>
  );
} 