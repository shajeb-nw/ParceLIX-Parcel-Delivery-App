import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxious from "../../Hooks/useAxious";
import { AuthContext } from "../../useContext/FormContext/AuthContext";
import { FaCreditCard } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const PaymentHistory = () => {
  const axiousInstance = useAxious();
  const { user } = useContext(AuthContext);

  const { data = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiousInstance.get(
        `/payment?email=${user?.email}`
      );
      return result?.data;
    },
  });

if (isLoading) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      <p className="mt-3 text-gray-500">Loading payment history...</p>
      </div>
    </div>
  );
}
  return (
    <div className="p-4 md:p-8 w-full min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">💳 Payment History</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-base-100 shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <FaCreditCard />
                Payment
              </div>
              <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-600">
                {item.paymentStatus}
              </span>
            </div>

            {/* Amount */}
            <h3 className="text-2xl font-bold mb-2">
              ৳ {item.amount}
            </h3>

            {/* Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium">Tracking:</span>{" "}
                {item.trackingId}
              </p>
              <p>
                <span className="font-medium">Transaction:</span>{" "}
                {item.transactionId.slice(0, 12)}...
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {item.customerEmail}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
              <MdOutlineDateRange />
              {new Date(item.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <FaCreditCard className="text-5xl text-gray-300 mb-4" />
      <h2 className="text-xl font-semibold text-gray-600">
        No Payment Found
      </h2>
      <p className="text-gray-400 mt-2">
        You haven’t made any payments yet
      </p>
    </div>
      )}
    </div>
  );
};

export default PaymentHistory;