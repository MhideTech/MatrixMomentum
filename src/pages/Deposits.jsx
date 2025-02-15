import React, { useState, useEffect } from 'react';
import axios from 'axios';

function YourDeposit() {
  const [deposits, setDeposits] = useState([]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_BASE_URL = 'https://jwt-auth-5.onrender.com';
  
  // Get JWT token from localStorage
  const getAuthToken = () => localStorage.getItem('token');
  
  useEffect(() => {
    // Fetch confirmed deposits when component mounts
    fetchConfirmedDeposits();
  }, []);
  
  const fetchConfirmedDeposits = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_BASE_URL}/your-deposit/`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      setDeposits(response.data.deposits);
      setTotalDeposit(response.data.total_deposit);
    } catch (err) {
      console.error('Error fetching confirmed deposits:', err);
      setError('Failed to load your confirmed deposits. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Confirmed Deposits</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-600">Loading your confirmed deposits...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          {/* Total deposit summary */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total Confirmed Deposits</h3>
            <p className="text-3xl font-bold text-green-900">
              {totalDeposit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </div>
          
          {/* Confirmed deposits table */}
          {deposits.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Date Confirmed</th>
                    <th className="py-2 px-4 border-b text-left">Transaction ID</th>
                    <th className="py-2 px-4 border-b text-left">Amount</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map(deposit => (
                    <tr key={deposit.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{formatDate(deposit.created_at)}</td>
                      <td className="py-2 px-4 border-b">
                        <span className="text-xs font-mono">{deposit.transaction_id || 'N/A'}</span>
                      </td>
                      <td className="py-2 px-4 border-b font-medium">
                        {deposit.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>You don't have any confirmed deposits yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default YourDeposit;