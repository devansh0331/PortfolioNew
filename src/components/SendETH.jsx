import React, { useState } from "react";

const SendETH = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Prevent invalid characters (non-numeric or negative values)
    if (/^\d*\.?\d*$/.test(value)) {
      const ethAmount = parseFloat(value);

      // Validate maximum value (0.003 ETH)
      if (ethAmount > 0.003) {
        setError("Amount cannot exceed 0.003 ETH.");
        setAmount("0.003"); // Set to max allowed value
      } else {
        setAmount(value);
        setError(""); // Clear error on valid input
      }
    }
  };

  const handleSendETH = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to send ETH.");
      return;
    }

    // Validate input
    const ethAmount = parseFloat(amount);
    if (isNaN(ethAmount) || ethAmount <= 0) {
      setError("Please enter a valid positive ETH amount.");
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const fromAddress = accounts[0];

      // Get user's balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [fromAddress, "latest"],
      });
      const userBalance = parseFloat((parseInt(balance, 16) / 1e18).toFixed(5)); // Convert wei to ETH

      if (userBalance < ethAmount) {
        setError("Insufficient balance. Please enter a smaller amount.");
        return;
      }

      // Convert ETH amount to wei (1 ETH = 1e18 wei)
      const weiAmount = (ethAmount * 1e18).toString(16);

      // Send ETH transaction
      const transactionParameters = {
        from: fromAddress,
        to: "YOUR_ETH_ADDRESS", // Replace with your ETH address
        value: `0x${weiAmount}`, // Amount in wei (hex format)
      };

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      alert("Thank you for your support! 🚀");
      setAmount(""); // Clear input after successful transaction
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error sending ETH:", error);
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="w-full bg-primary flex items-center justify-center py-12 ">
      <div className="w-11/12 rounded-md  bg-secondary lg:w-3/4 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-thin text-white mb-4">
          Found me Interesting so far?{" "}
          <span className="text-contrast">Send Me ETH</span> !
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-md">
            <input
              type="text" // Use text type to remove up/down arrows
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter ETH amount (max 0.003 ETH)"
              className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast appearance-none" // Remove arrows
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          <button
            onClick={handleSendETH}
            className="px-6 py-2 bg-contrast text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send ETH via MetaMask
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendETH;
