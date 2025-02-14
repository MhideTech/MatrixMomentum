import { useEffect, useState } from 'react';
import axios from 'axios';

function Referrals({ userId }) {
  const [referrals, setReferrals] = useState(0);
  const [activeReferrals, setActiveReferrals] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);

  const API_BASE_URL = 'https://jwt-auth-5.onrender.com'; // Your deployed API base URL

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/get-referral-rewards/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );

        const rewards = response.data;

        const referralCount = new Set(
          rewards.map((reward) => reward.referral.referred)
        ).size; // Unique referred users
        const activeReferralCount = referralCount; // Customize this logic if needed for "active"
        const commissionSum = rewards.reduce(
          (acc, reward) => acc + reward.reward_percentage,
          0
        );

        setReferrals(referralCount);
        setActiveReferrals(activeReferralCount);
        setTotalCommission(commissionSum);
      } catch (error) {
        console.error('Failed to fetch referral data:', error);
      }
    };

    if (userId) {
      fetchReferralData();
    }
  }, [userId]);

  const createReferral = async (referrerId, referredId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/create-referral/`,
        {
          referrer_id: referrerId,
          referred_id: referredId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      alert('Referral Created Successfully!');
    } catch (error) {
      console.error('Failed to create referral:', error);
      alert(error.response?.data?.error || 'Failed to create referral');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="bg-[#04CB94] p-5 h-40 flex flex-col gap-5 text-center justify-center">
        <h2 className="font-bold text-lg">Referrals</h2>
        <h1 className="text-xl">{referrals}</h1>
      </div>
      <div className="bg-[#04CB94] p-5 h-40 flex flex-col gap-5 text-center justify-center">
        <h2 className="font-bold text-lg">Active Referrals</h2>
        <h1 className="text-xl">{activeReferrals}</h1>
      </div>
      <div className="bg-[#04CB94] p-5 h-40 flex flex-col gap-5 text-center justify-center">
        <h2 className="font-bold text-lg">Total Referral Commission</h2>
        <h1 className="text-xl">${totalCommission.toFixed(2)}</h1>
      </div>

      {/* Example Button for Creating a Referral */}
      <div className="col-span-3 text-center mt-5">
        <button
          onClick={() => createReferral(userId, 2)} // Replace 2 with referred user's ID
          className="bg-[#04CB94] text-white py-2 px-4 rounded"
        >
          Create Referral (Example)
        </button>
      </div>
    </div>
  );
}

export default Referrals;
