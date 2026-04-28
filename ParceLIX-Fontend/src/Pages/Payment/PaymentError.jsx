import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";

const PaymentError = () => {
  return (
    <div className="w-full flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <FaTimesCircle className="text-red-500 text-6xl" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-red-600">
          Payment Failed ❌
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mt-2 text-sm">
          Something went wrong or you cancelled the payment.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-3 justify-center">
          
          <Link to="/dashboard">
            <button className="px-5 py-2 rounded-xl bg-base-200 hover:bg-base-300 transition">
              Back to Dashboard
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:scale-105 transition">
              Try Again
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PaymentError;