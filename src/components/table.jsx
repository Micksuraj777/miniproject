import React, { useState, useEffect } from 'react';
import Button from './button';
import { motion, AnimatePresence } from 'framer-motion';

export function Tables() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRows, setVisibleRows] = useState(7);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await fetch('http://localhost:8080/donor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch donor data');
      }
      const data = await response.json();
      setDonors(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setVisibleRows(donors.length);
    }, 1000);
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

  const getVisionScoreColor = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-800 ring-green-600/20';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
    return 'bg-red-100 text-red-800 ring-red-600/20';
  };

  const filteredAndSortedData = [...donors]
    .filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortConfig.key === null) return 0;
      
      if (sortConfig.key === 'visionScore') {
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
          { key: 'gender', label: 'Gender' },
          { key: 'age', label: 'Age' },
          { key: 'bloodGroup', label: 'Blood Group' },
          { key: 'contact', label: 'Contact' },
          { key: 'address', label: 'Address' },
          { key: 'visionScore', label: 'Vision Score' }
        ].map(({ key, label }) => (
          <th
            key={key}
            scope="col"
            className="py-3.5 px-4 text-sm font-semibold text-left text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
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
        {filteredAndSortedData.slice(0, visibleRows).map((donor) => (
          <motion.tr 
            key={donor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`hover:bg-gray-50 transition-all cursor-pointer ${
              selectedRow === donor.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => setSelectedRow(donor.id)}
          >
            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              {donor.id}
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              {donor.name}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {donor.gender}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {donor.age}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {donor.bloodGroup}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
              {donor.contact}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500">
              {donor.address}
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getVisionScoreColor(donor.visionScore)}`}>
                {donor.visionScore}/10
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
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
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
            onClick={fetchDonors}
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
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <table className="min-w-full divide-y divide-gray-200">
                {renderTableHeader()}
                {isLoading ? renderLoadingSkeleton() : renderTableBody()}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex pt-6">
        {visibleRows < filteredAndSortedData.length ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
        <Button
          text="Show More"
          onClick={handleClick}
              color="bg-blue-500 hover:bg-blue-600"
              size="py-2 px-6"
              rounded="rounded-md"
              loading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              text="Show Less"
              onClick={handleShowLess}
              color="bg-red-500 hover:bg-red-600"
          size="py-2 px-6"
          rounded="rounded-md"
          loading={isLoading}
        />
          </motion.div>
        )}
      </div>
    </section>
  );
}
