import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    bitcoin_wallet: "",
    ethereum_wallet: "",
    tron_wallet: "",
    tether_usdt_trc20_wallet: "",
    usdt_erc20_wallet: "",
    bnb_wallet: "",
    dogecoin_wallet: "",
    shiba_wallet: "",
  });

  // Loading and Error States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setError(null);
  };

  // Form Validation
  const validateForm = () => {
    if (formData.email !== formData.confirmEmail) {
      setError("Emails do not match!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return false;
    }

    return true;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Prepare API data
      const apiData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        bitcoin_wallet: formData.bitcoin_wallet || null,
        ethereum_wallet: formData.ethereum_wallet || null,
        tron_wallet: formData.tron_wallet || null,
        tether_usdt_trc20_wallet: formData.tether_usdt_trc20_wallet || null,
        usdt_erc20_wallet: formData.usdt_erc20_wallet || null,
        bnb_wallet: formData.bnb_wallet || null,
        dogecoin_wallet: formData.dogecoin_wallet || null,
        shiba_wallet: formData.shiba_wallet || null,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        apiData
      );

      if (response.data.user_id) {
        // Store user_id for verification
        localStorage.setItem('temp_user_id', response.data.user_id);
        
        // Redirect to verification page
        navigate('/verify-email');
      }

    } catch (error) {
      console.error("Signup Error:", error);
      setError(
        error.response?.data?.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Wallet input fields configuration
  const walletFields = [
    { name: "bitcoin_wallet", label: "Bitcoin Address" },
    { name: "ethereum_wallet", label: "Ethereum Address" },
    { name: "tron_wallet", label: "Tron Address" },
    { name: "tether_usdt_trc20_wallet", label: "Tether USDT (TRC20)" },
    { name: "usdt_erc20_wallet", label: "Tether USDT (ERC20)" },
    { name: "bnb_wallet", label: "BNB Address" },
    { name: "dogecoin_wallet", label: "Dogecoin Address" },
    { name: "shiba_wallet", label: "Shiba Inu Address" },
  ];

  return (
    <section className="bg-[#081C17] pb-20">
      <section className="h-72 bg-[url('src/assets/images/about-img.png')] bg-right bg-cover bg-no-repeat flex flex-col justify-center font-bold">
        <div className="w-9/12 mx-auto">
          <h1 className="font-main text-6xl text-white">Create Account</h1>
        </div>
      </section>

      <section className="w-7/12 bg-[#00150F] mx-auto mt-20 p-20">
        <hgroup>
          <h1 className="font-main font-bold text-5xl text-white">
            Create Your Account!
          </h1>
          <p className="font-sub mt-3 text-white">
            Hey there! Ready to join the party? We just need a few details from
            you to get started. Let&apos;s do this!
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-500 text-white rounded">
              {error}
            </div>
          )}
        </hgroup>

        <form onSubmit={handleSubmit} className="my-10">
          {/* User Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block font-main font-semibold text-xl text-white">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="username" className="block font-main font-semibold text-xl text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Emails */}
          <div className="grid md:grid-cols-2 gap-5 my-8">
            <div>
              <label htmlFor="email" className="block font-main font-semibold text-xl text-white">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="confirmEmail" className="block font-main font-semibold text-xl text-white">
                Confirm Email Address
              </label>
              <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                required
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder="Confirm your email address"
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid md:grid-cols-2 gap-5 my-8">
            <div>
              <label htmlFor="password" className="block font-main font-semibold text-xl text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block font-main font-semibold text-xl text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Wallet Addresses */}
          {walletFields.map((field) => (
            <div key={field.name} className="my-4">
              <label htmlFor={field.name} className="block font-main font-semibold text-xl text-white">
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full text-white rounded-md focus:border-[#00D094]"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`block w-full ${
              isLoading ? 'bg-gray-500' : 'bg-[#00D094]'
            } py-3 font-main rounded-md text-lg my-7`}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="font-sub text-center text-white">
            Already have an account?{" "}
            <span className="underline text-[#00D094]">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </section>
    </section>
  );
}

export default Signup;