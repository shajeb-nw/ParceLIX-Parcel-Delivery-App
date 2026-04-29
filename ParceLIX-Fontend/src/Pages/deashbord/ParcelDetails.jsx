import React, { useContext } from "react";
import useAxious from "../../Hooks/useAxious";
import { FaPhone, FaMapMarkerAlt, FaBox, FaUser } from "react-icons/fa";
import { AuthContext } from "../../useContext/FormContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";
import Swal from "sweetalert2";
import { Link } from "react-router";


const ParcelDetails = () => {
  const axiousInstance = useAxious();
  const { user } = useContext(AuthContext);
 console.log(axiousInstance);
 
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["todos", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiousInstance.get(`/parcel?email=${user?.email}`);
       return Array.isArray(result?.data) ? result?.data : [];
    },
  });

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiousInstance.delete(`/parcel/${id}`);
        Swal.fire("Deleted!", "Parcel has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", error.message);
      }
    }
  };

  // ✅ EDIT FUNCTION
  const handleEdit = (parcel) => {
    console.log("Edit parcel:", parcel);
  };

  // ✅ PAYMENT FUNCTION
  const handlePayment = async (parcel) => {
    try {
      const res = await axiousInstance.post("/payment", parcel);
      window.location.href = res.data.url;
    } catch (error) {
      Swal.fire("Error!", "Payment failed", error.message);
    }
  };

  // ✅ LOADING
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <FadeLoader />
      </div>
    );
  }

  // ✅ EMPTY STATE
  if (!data || data.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-4">
          {/* Animated Box Icon */}
          <div className="text-9xl mb-6 animate-bounce">📦</div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-700 mb-3">
            No Parcels Found!
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm mb-8 max-w-sm">
            You haven't added any parcel yet. Start by adding your first parcel
            and track it easily!
          </p>

          {/* Button */}
          <Link
            to="/dashboard/addParcel"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#08aafb] to-[#ae0cff] text-white font-semibold text-sm shadow-lg hover:scale-105 transition duration-300"
          >
            ➕ Add New Parcel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {data?.map((p) => (
          <div
            key={p._id}
            className="group bg-base-100 rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden"
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
              {/* EXTRA INFO */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-base-200 p-3 rounded-xl">
                <p>
                  <span className="font-semibold">Email:</span> {p.senderEmail}
                </p>
                <p>
                  <span className="font-semibold">Receiver Email:</span>{" "}
                  {p.reciverEmail}
                </p>
                <p>
                  <span className="font-semibold">Sender Division:</span>{" "}
                  {p.senderDivition}
                </p>
                <p>
                  <span className="font-semibold">Receiver Division:</span>{" "}
                  {p.reciverDiviton}
                </p>
              </div>

              {/* SENDER & RECEIVER */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-200 p-3 rounded-xl space-y-1">
                  <p className="text-xs flex items-center gap-1">
                    <FaUser /> Sender
                  </p>
                  <p className="font-semibold">{p.senderName}</p>
                  <p className="text-xs flex items-center gap-1">
                    <FaPhone /> {p.senderPhone}
                  </p>
                  <p className="text-xs flex items-center gap-1">
                    <FaMapMarkerAlt /> {p.senderDistrict}
                  </p>
                </div>

                <div className="bg-base-200 p-3 rounded-xl space-y-1">
                  <p className="text-xs flex items-center gap-1">
                    <FaUser /> Receiver
                  </p>
                  <p className="font-semibold">{p.receiverName}</p>
                  <p className="text-xs flex items-center gap-1">
                    <FaPhone /> {p.receiverPhone}
                  </p>
                  <p className="text-xs flex items-center gap-1">
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
                  <p className="font-semibold">{p.weight} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      p.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {p.paymentStatus === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between items-center mt-4 gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-4 py-2 text-sm rounded-xl bg-base-200 hover:bg-base-300 transition flex items-center gap-1"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-4 py-2 text-sm rounded-xl bg-red-500 hover:bg-red-600 text-white transition flex items-center gap-1"
                  >
                    🗑 Delete
                  </button>
                </div>

                {p.paymentStatus === "paid" ? (
                  <button className="px-5 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 transition">
                    💳 Paid
                  </button>
                ) : (
                  <button
                    onClick={() => handlePayment(p)}
                    className="px-5 py-2 text-sm rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 transition"
                  >
                    💳 Pay Now
                  </button>
                )}
              </div>

              {/* INSTRUCTIONS */}
              <div className="bg-base-200 p-3 rounded-xl text-xs space-y-1">
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