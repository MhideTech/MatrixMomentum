import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Withdraw() {
  // User states
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [submitMessage, setSubmitMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ text: '', isError: false });
  
  const API_BASE_URL = 'https://jwt-auth-5.onrender.com';
  
  // Get JWT token from localStorage
  const getAuthToken = () => localStorage.getItem('token');
  
  useEffect(() => {
    // Check if user is admin
    checkAdminStatus();
    
    // If admin, fetch pending withdrawals
    if (isAdmin) {
      fetchPendingWithdrawals();
    }
  }, [isAdmin]);
  
  const checkAdminStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user-profile/`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      setIsAdmin(response.data.is_staff || false);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };
  
  const fetchPendingWithdrawals = async () => {
    setIsLoading(true);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/pending-withdrawals/`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      setPendingWithdrawals(response.data);
    } catch (error) {
      console.error("Failed to fetch pending withdrawals:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || !walletAddress) {
      setSubmitMessage({ 
        text: 'Please enter both amount and wallet address', 
        isError: true 
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ text: '', isError: false });
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/withdraw/`,
        { 
          amount: parseFloat(amount),
          wallet_address: walletAddress
        },
        {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        }
      );
      
      setSubmitMessage({ 
        text: 'Withdrawal request submitted successfully!', 
        isError: false 
      });
      setAmount('');
      setWalletAddress('');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                    err.response?.data?.amount || 
                    err.response?.data?.wallet_address ||
                    'Failed to submit withdrawal request. Please try again.';
      setSubmitMessage({ 
        text: typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg, 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleStatusUpdate = async (withdrawalId, newStatus) => {
    setUpdateMessage({ text: '', isError: false });
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/withdraw/`,
        { 
          withdrawal_id: withdrawalId,
          status: newStatus
        },
        {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        }
      );
      
      setUpdateMessage({ 
        text: `Withdrawal #${withdrawalId} has been ${newStatus}`, 
        isError: false 
      });
      
      // Refresh the list
      fetchPendingWithdrawals();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                    'Failed to update withdrawal status. Please try again.';
      setUpdateMessage({ text: errorMsg, isError: true });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        {isAdmin ? 'Withdrawal Management' : 'Request a Withdrawal'}
      </h2>
      
      {!isAdmin && (
        <div className="mb-8">
          <form onSubmit={handleWithdrawalSubmit}>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter withdrawal amount"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
                step="0.000001"
                min="0"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={isSubmitting}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md transition duration-200 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Submit Withdrawal Request'}
            </button>
          </form>
          
          {submitMessage.text && (
            <div className={`mt-4 p-3 rounded-md ${
              submitMessage.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {submitMessage.text}
            </div>
          )}
        </div>
      )}
      
      {isAdmin && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Pending Withdrawal Requests</h3>
          
          {isLoading ? (
            <p className="text-gray-600">Loading pending withdrawals...</p>
          ) : pendingWithdrawals.length === 0 ? (
            <p className="text-gray-600">No pending withdrawal requests</p>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">ID</th>
                      <th className="py-2 px-4 border-b text-left">User</th>
                      <th className="py-2 px-4 border-b text-left">Amount</th>
                      <th className="py-2 px-4 border-b text-left">Wallet Address</th>
                      <th className="py-2 px-4 border-b text-left">Date</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingWithdrawals.map(withdrawal => (
                      <tr key={withdrawal.id}>
                        <td className="py-2 px-4 border-b">{withdrawal.id}</td>
                        <td className="py-2 px-4 border-b">{withdrawal.user.username}</td>
                        <td className="py-2 px-4 border-b">{withdrawal.amount}</td>
                        <td className="py-2 px-4 border-b">
                          <span className="text-xs">{withdrawal.wallet_address}</span>
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(withdrawal.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(withdrawal.id, 'processed')}
                              className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-2 rounded transition duration-200"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(withdrawal.id, 'rejected')}
                              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded transition duration-200"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {updateMessage.text && (
                <div className={`mt-4 p-3 rounded-md ${
                  updateMessage.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {updateMessage.text}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Withdraw;