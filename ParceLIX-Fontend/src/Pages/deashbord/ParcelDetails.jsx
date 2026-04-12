import React, { useEffect, useState } from "react";
import useAxious from "../../Hooks/useAxious";
import { FaPhone, FaMapMarkerAlt, FaBox, FaUser, FaEnvelope } from "react-icons/fa";

const ParcelDetails = () => {
  const axiousInstance = useAxious();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const result = await axiousInstance.get("/parcel");
        setData(result?.data?.data || result?.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchParcels();
  }, []);

  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

        {data?.map((p) => (
          <div
            key={p._id}
            className="bg-base-100 rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden"
          >

            {/* HEADER */}
            <div className="bg-gradient-to-r from-[#08aafb] to-[#ae0cff] text-white p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <FaBox /> {p.parcelName}
                </h2>

                <span className="text-xs px-3 py-1 bg-white/20 rounded-full">
                  {p.parcelType}
                </span>
              </div>

              <p className="text-xs opacity-80 mt-1">
                Parcel ID: {p._id.slice(-6)}
              </p>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-5">

              {/* 🔥 EXTRA INFO ROW */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                <p><span className="font-semibold">Email:</span> {p.senderEmail}</p>
                <p><span className="font-semibold">Receiver Email:</span> {p.reciverEmail}</p>
                <p><span className="font-semibold">Sender Division:</span> {p.senderDivition}</p>
                <p><span className="font-semibold">Receiver Division:</span> {p.reciverDiviton}</p>
              </div>

              {/* Sender & Receiver GRID */}
              <div className="grid grid-cols-2 gap-4">

                {/* Sender */}
                <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FaUser /> Sender
                  </p>

                  <p className="font-semibold text-gray-800">{p.senderName}</p>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaPhone /> {p.senderPhone}
                  </p>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt /> {p.senderDistrict}
                  </p>
                </div>

                {/* Receiver */}
                <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FaUser /> Receiver
                  </p>

                  <p className="font-semibold text-gray-800">{p.receiverName}</p>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaPhone /> {p.receiverPhone}
                  </p>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt /> {p.receiverDistrict}
                  </p>
                </div>

              </div>

              {/* COST + WEIGHT + STATUS */}
              <div className="flex justify-between items-center border-t pt-4">

                <div>
                  <p className="text-xs text-gray-400">Cost</p>
                  <p className="text-green-600 font-bold text-lg">
                    ৳ {p.parcelCost}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Weight</p>
                  <p className="font-semibold text-gray-700">
                    {p.weight} kg
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                    Pending
                  </span>
                </div>

              </div>

              {/* INSTRUCTIONS */}
              <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">Pickup:</span>{" "}
                  {p.pickupInstruction}
                </p>
                <p>
                  <span className="font-semibold">Delivery:</span>{" "}
                  {p.deliveryInstruction}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ParcelDetails;