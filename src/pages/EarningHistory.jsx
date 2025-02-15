import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://jwt-auth-5.onrender.com/api/transactions/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Filter section */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
          {/* Filters (Transaction Type, Date Range, Currency) */}
          {/* ... (existing filter code) */}
        </div>
        <div className="flex justify-center">
          <button className="bg-[#04CB94] text-black-900 px-6 py-2 rounded-lg font-bold hover:bg-teal-500">
            Submit
          </button>
        </div>
      </div>

      <div className="mt-10 w-full max-w-4xl">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-[#04CB94] text-black text-left">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Comments</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-3">{transaction.type}</td>
                  <td className="p-3">{transaction.amount}</td>
                  <td className="p-3">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-3">{transaction.comments}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="4">
                  {error || 'No transactions found'}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-3 font-bold" colSpan="3">
                Total:
              </td>
              <td className="p-3 text-right font-bold">
                ${transactions.reduce((total, transaction) => total + transaction.amount, 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default TransactionHistory;
