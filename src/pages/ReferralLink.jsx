import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReferralSystem() {
  // State for the user's referral link
  const [referralLink, setReferralLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  
  // State for submitting someone else's code
  const [referralCode, setReferralCode] = useState('');
  const [submitMessage, setSubmitMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_BASE_URL = 'https://jwt-auth-5.onrender.com';
  
  // Get JWT token from localStorage - adjust if you store it differently
  const getAuthToken = () => localStorage.getItem('token');
  
  useEffect(() => {
    // Fetch the user's referral link when component mounts
    fetchReferralLink();
  }, []);
  
  const fetchReferralLink = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_BASE_URL}/referral-link/`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      setReferralLink(response.data.referral_link);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("You don't have a referral link yet.");
      } else {
        setError("Failed to fetch your referral link. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(() => {
        setError("Failed to copy. Please try manually selecting and copying the link.");
      });
  };
  
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    
    if (!referralCode.trim()) {
      setSubmitMessage({ text: 'Please enter a referral code', isError: true });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ text: '', isError: false });
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register-with-referral/`,
        { referral_code: referralCode },
        {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        }
      );
      
      setSubmitMessage({ 
        text: 'Referral code successfully applied!', 
        isError: false 
      });
      setReferralCode('');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                       'Failed to apply referral code. Please try again.';
      setSubmitMessage({ text: errorMsg, isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Referral System</h2>
      
      {/* User's referral link section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Your Referral Link</h3>
        
        {isLoading ? (
          <p className="text-gray-600">Loading your referral link...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="mt-3">
            <div className="flex items-center">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-r-md transition duration-200"
              >
                {linkCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {linkCopied && (
              <p className="text-green-600 text-sm mt-1">Link copied to clipboard!</p>
            )}
          </div>
        )}
      </div>
      
      {/* Submit someone else's referral code section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Use a Referral Code</h3>
        <form onSubmit={handleCodeSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code"
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
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Apply Code'}
          </button>
        </form>
        
        {submitMessage.text && (
          <p className={`mt-2 text-sm ${
            submitMessage.isError ? 'text-red-500' : 'text-green-600'
          }`}>
            {submitMessage.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReferralSystem;