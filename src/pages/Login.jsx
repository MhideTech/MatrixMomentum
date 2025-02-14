import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "", // Changed from email to username to match API
    password: "",
    pin_code: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://jwt-auth-5.onrender.com/api/login/", {
        username: formData.username,
        password: formData.password
      });

      // Check if we got tokens in response
      if (response.data.data?.tokens) {
        // Store both tokens
        localStorage.setItem("accessToken", response.data.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.data.tokens.refresh);
        
        // Store user data if needed
        localStorage.setItem("userData", JSON.stringify(response.data.data.user));
        
        navigate("/dashboard");
        return;
      }

      if (response.data.message === "Verification required") {
        setNeedsVerification(true);
        // Request verification code if needed
        await axios.post("https://jwt-auth-5.onrender.com/api/generate-verification-code/", {
          username: formData.username
        });
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#081C17] pb-20">
      <section className="h-72 bg-[url('src/assets/images/about-img.png')] bg-right bg-cover bg-no-repeat flex flex-col justify-center font-bold">
        <div className="w-9/12 mx-auto">
          <h1 className="font-main text-6xl text-white">Login In</h1>
        </div>
      </section>

      <section className="w-7/12 bg-[#00150F] mx-auto mt-20 p-20">
        <hgroup>
          <h1 className="font-main font-bold text-5xl text-white">Welcome back!</h1>
          <p className="font-sub mt-3 text-white">
            Hey there! Ready to log in? Just enter your username and password
            below and you&apos;ll be back in action in no time. Let&apos;s go!
          </p>
        </hgroup>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="my-10">
          <div className="my-8">
            <label
              htmlFor="username"
              className="block font-main font-semibold text-xl text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block font-sub px-5 py-4 bg-[#1B2D29] w-full border border-[#1B2D29] text-white rounded-md focus:border-[#00D094] focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div className="mt-8 mb-3">
            <label
              htmlFor="password"
              className="block font-main font-semibold text-xl text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block font-sub px-5 py-4 bg-[#1B2D29] w-full border border-[#1B2D29] text-white rounded-md focus:border-[#00D094] focus:outline-none"
              placeholder="Password"
            />
          </div>

          {needsVerification && (
            <div className="mt-8 mb-3">
              <label
                htmlFor="pin_code"
                className="block font-main font-semibold text-xl text-white"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="pin_code"
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                className="block font-sub px-5 py-4 bg-[#1B2D29] w-full border border-[#1B2D29] text-white rounded-md focus:border-[#00D094] focus:outline-none"
                placeholder="Enter verification code"
              />
              <p className="text-white mt-2">Please check your email for the verification code.</p>
            </div>
          )}

          <Link
            to="/forgot-password"
            className="block underline font-bold text-[#00D094] text-right"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="block w-full bg-[#00D094] py-3 font-main rounded-md text-lg my-7 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <p className="font-sub text-center text-white">
            Don&apos;t have an account{" "}
            <span className="underline text-[#00D094] ">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </form>
      </section>
    </section>
  );
}

export default Login;