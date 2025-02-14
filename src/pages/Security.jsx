import { useState } from "react";
import axios from "axios";

function Security() {
  const [ipSensitivity, setIpSensitivity] = useState("Medium");
  const [browserChange, setBrowserChange] = useState("Disabled");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Get stored authentication token
      const response = await axios.put(
        "/api/security/settings/", 
        {
          ip_address_sensitivity: ipSensitivity.toLowerCase(),
          detect_device_change: browserChange === "Enabled",
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setSuccess("Security settings updated successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while updating settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            Detect IP Address Change Sensitivity
          </h2>
          {["Disabled", "Medium", "High", "Paranoid"].map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="radio"
                id={option}
                name="ipSensitivity"
                value={option}
                checked={ipSensitivity === option}
                onChange={(e) => setIpSensitivity(e.target.value)}
                className="mr-2"
              />
              <label htmlFor={option} className="text-white">
                {option}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            Detect Browser Change
          </h2>
          {["Disabled", "Enabled"].map((option) => (
            <div key={option} className="flex items-center mb-2">
              <input
                type="radio"
                id={option}
                name="browserChange"
                value={option}
                checked={browserChange === option}
                onChange={(e) => setBrowserChange(e.target.value)}
                className="mr-2"
              />
              <label htmlFor={option} className="text-white">
                {option}
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#04CB94] text-white py-2 rounded-lg hover:bg-[#04cb93b7] disabled:opacity-50"
        >
          {loading ? "Updating..." : "SET"}
        </button>
      </form>
    </div>
  );
}

export default Security;