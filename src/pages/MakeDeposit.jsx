import { useState } from 'react';
import { FaBitcoin, FaEthereum, FaWallet } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

function Deposit() {
  const [amount, setAmount] = useState('');
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [confirmTransactionId, setConfirmTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://jwt-auth-5.onrender.com';

  const walletOptions = [
    'Bitcoin',
    'Ethereum',
    'Tron',
    'Tether usdt Trc20',
    'Tether erc 20',
    'Bnb',
    'Dogecoin',
    'Litecoin',
    'Shiba',
  ];

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/make-deposit/`,
        { amount, wallet_type: walletType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setWalletAddress(response.data.wallet_address);
      setTransactionId(response.data.transaction_id);
      toast.success('Deposit initiated! Please send funds to the provided wallet address.');
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || 'Failed to initiate deposit. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/confirm-deposit/`,
        { transaction_id: confirmTransactionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || 'Failed to confirm deposit. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FaWallet /> Make a Deposit
      </h1>

      <form
        onSubmit={handleDeposit}
        className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block mb-2 text-sm">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">Select Wallet Type</label>
          <select
            value={walletType}
            onChange={(e) => setWalletType(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Wallet</option>
            {walletOptions.map((wallet) => (
              <option key={wallet} value={wallet}>
                {wallet}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Deposit Now'}
        </button>
      </form>

      {walletAddress && transactionId && (
        <div className="bg-gray-700 p-4 mt-6 rounded-lg shadow-md text-center w-full max-w-md">
          <p className="text-green-400">Wallet Address:</p>
          <p className="break-all">{walletAddress}</p>
          <p className="text-green-400 mt-2">Transaction ID:</p>
          <p className="break-all">{transactionId}</p>
        </div>
      )}

      {/* Confirm Deposit */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaBitcoin /> Confirm Deposit
        </h2>

        <form
          onSubmit={handleConfirmDeposit}
          className="bg-gray-700 p-4 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm">Transaction ID</label>
            <input
              type="text"
              value={confirmTransactionId}
              onChange={(e) => setConfirmTransactionId(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
