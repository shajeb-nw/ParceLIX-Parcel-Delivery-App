import React, {useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxious from "../../Hooks/useAxious";

const PaymentSuccess = () => {
    const [getParams]=useSearchParams()
    const axiousInstance=useAxious()
    const fullParams=getParams.get("session_id")
    useEffect(()=>{
      if(fullParams){
        axiousInstance.patch(`/payment?session_id=${fullParams}`)
      }
    },[fullParams,axiousInstance])
    
    
  return (
    <div className="w-full flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mt-2 text-sm">
          Your parcel payment has been completed successfully.
        </p>

        {/* BUTTON */}
        <Link to="/dashboard">
          <button className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;