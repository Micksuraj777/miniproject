import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Initial mock data - only used if no users exist in localStorage
const initialDonors = [
  { id: 'D001', name: 'John Smith', email: 'john.smith@example.com', password: '1234', role: 'user', userType: 'donor', bloodType: 'O+', organType: 'Cornea', age: 35, status: 'Active' },
  { id: 'D002', name: 'Emily Johnson', email: 'emily.johnson@example.com', password: '1234', role: 'user', userType: 'donor', bloodType: 'A+', organType: 'Cornea', age: 42, status: 'Active' },
  { id: 'D003', name: 'Michael Brown', email: 'michael.brown@example.com', password: '1234', role: 'user', userType: 'donor', bloodType: 'B-', organType: 'Cornea', age: 28, status: 'Active' },
  { id: 'D004', name: 'Sarah Davis', email: 'sarah.davis@example.com', password: '1234', role: 'user', userType: 'donor', bloodType: 'AB+', organType: 'Cornea', age: 39, status: 'Active' },
  { id: 'D005', name: 'David Wilson', email: 'david.wilson@example.com', password: '1234', role: 'user', userType: 'donor', bloodType: 'O-', organType: 'Cornea', age: 45, status: 'Active' }
];

const initialRecipients = [
  { id: 'R001', name: 'Jessica Martinez', email: 'jessica.martinez@example.com', password: '1234', role: 'user', userType: 'recipient', bloodType: 'O+', organNeeded: 'Cornea', age: 32, status: 'Waiting' },
  { id: 'R002', name: 'Robert Taylor', email: 'robert.taylor@example.com', password: '1234', role: 'user', userType: 'recipient', bloodType: 'A-', organNeeded: 'Cornea', age: 51, status: 'Waiting' },
  { id: 'R003', name: 'Jennifer Anderson', email: 'jennifer.anderson@example.com', password: '1234', role: 'user', userType: 'recipient', bloodType: 'B+', organNeeded: 'Cornea', age: 29, status: 'Waiting' },
  { id: 'R004', name: 'Thomas Jackson', email: 'thomas.jackson@example.com', password: '1234', role: 'user', userType: 'recipient', bloodType: 'AB-', organNeeded: 'Cornea', age: 47, status: 'Waiting' },
  { id: 'R005', name: 'Lisa White', email: 'lisa.white@example.com', password: '1234', role: 'user', userType: 'recipient', bloodType: 'O+', organNeeded: 'Cornea', age: 36, status: 'Waiting' }
];

// Admin user
const adminUser = { id: 'A001', email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Initialize users from localStorage or use initial data
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Get users from localStorage or initialize with default data
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no users exist in localStorage, initialize with default data
      const initialUsers = [adminUser, ...initialDonors, ...initialRecipients];
      setUsers(initialUsers);
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    // Simulate a delay for login process
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        resolve(true);
      }, 1500); // 1.5 second delay
    });
  };

  const logout = () => {
    // Immediate logout without delay
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Function to add a new user
  const addUser = (userData) => {
    // Generate a new ID based on user type
    const prefix = userData.userType === 'donor' ? 'D' : userData.userType === 'recipient' ? 'R' : 'U';
    const lastId = users
      .filter(user => user.id && user.id.startsWith(prefix))
      .map(user => parseInt(user.id.substring(1)))
      .reduce((max, id) => Math.max(max, id), 0);
    
    const newId = `${prefix}${String(lastId + 1).padStart(3, '0')}`;
    
    const newUser = {
      ...userData,
      id: newId,
      role: userData.role || 'user',
      password: userData.password || '1234', // Default password
      status: userData.userType === 'donor' ? 'Active' : 'Waiting'
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return newUser;
  };

  // Function to update an existing user
  const updateUser = (userId, updatedData) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // If the current user is being updated, also update currentUser state
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, ...updatedData };
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
    
    return updatedUsers.find(user => user.id === userId);
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // If the current user is being deleted, log them out
    if (currentUser && currentUser.id === userId) {
      logout();
    }
    
    return true;
  };

  // Function to get users by type
  const getUsersByType = (userType) => {
    return users.filter(user => user.userType === userType);
  };

  // Function to update status when a match is found
  const updateMatchStatus = async (donorId, recipientId) => {
    try {
      console.log(`Updating match status for donor ${donorId} and recipient ${recipientId}`);
      
      // Find the donor and recipient in our local users array
      const donorUser = users.find(user => user.userType === 'donor' && user.id === donorId);
      const recipientUser = users.find(user => user.userType === 'recipient' && user.id === recipientId);
      
      if (!donorUser || !recipientUser) {
        console.warn(`Could not find donor ${donorId} or recipient ${recipientId} in local users`);
        return false;
      } else {
        console.log(`Found users to update: Donor ${donorUser.name}, Recipient ${recipientUser.name}`);
      }
      
      // Skip API calls due to CORS issues
      console.log('Skipping API calls due to CORS issues. Updating local state only.');
      
      // Create match messages
      const matchDate = new Date().toLocaleDateString();
      const donorMatchMessage = `Matched with ${recipientUser.name} on ${matchDate}`;
      const recipientMatchMessage = `Matched with ${donorUser.name} on ${matchDate}`;
      
      // Update local users with matched status
      const updatedUsers = users.map(user => {
        if (user.userType === 'donor' && user.id === donorId) {
          console.log(`Updating donor ${user.name} (${user.id}) status to Matched`);
          return { 
            ...user, 
            status: 'Matched',
            matchStatus: 'Matched',
            matchMessage: donorMatchMessage,
            matchedWith: recipientUser.name,
            matchDate: new Date().toISOString()
          };
        } else if (user.userType === 'recipient' && user.id === recipientId) {
          console.log(`Updating recipient ${user.name} (${user.id}) status to Matched`);
          return { 
            ...user, 
            status: 'Matched',
            matchStatus: 'Matched',
            matchMessage: recipientMatchMessage,
            matchedWith: donorUser.name,
            matchDate: new Date().toISOString()
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log('Updated users in localStorage with match status');

      // Update current user if they are part of the match
      if (currentUser && 
          ((currentUser.userType === 'donor' && currentUser.id === donorId) || 
           (currentUser.userType === 'recipient' && currentUser.id === recipientId))) {
        console.log(`Updating current user ${currentUser.name} status to Matched`);
        const updatedCurrentUser = { 
          ...currentUser, 
          status: 'Matched',
          matchStatus: 'Matched',
          matchMessage: currentUser.userType === 'donor' ? donorMatchMessage : recipientMatchMessage,
          matchedWith: currentUser.userType === 'donor' ? recipientUser.name : donorUser.name,
          matchDate: new Date().toISOString()
        };
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
        console.log('Updated currentUser in localStorage');
      }

      return true;
    } catch (error) {
      console.error('Error updating match status:', error);
      return false;
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
    users,
    addUser,
    updateUser,
    deleteUser,
    getUsersByType,
    updateMatchStatus,
    getDonors: () => getUsersByType('donor'),
    getRecipients: () => getUsersByType('recipient')
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 