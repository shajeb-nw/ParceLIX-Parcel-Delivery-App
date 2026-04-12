import React, { useState, useRef, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../useContext/FormContext/AuthContext";
import { Link } from "react-router";

export default function ProfileDropdown() {
  const { user,logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Profile Image */}
      <img
        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown Card */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-base-200 shadow-2xs border-2 border-blue-100 rounded-2xl p-4 z-50 animate-in fade-in zoom-in">
          {/* Close Button */}
          <div className="flex justify-end">
            <FaTimes
              className="cursor-pointer text-gray-500 hover:text-red-200"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center text-center">
            <img src={user?.photoURL} className="w-16 h-16 rounded-full mb-2" />
            <h3 className="font-semibold text-color">{user?.displayName}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Actions */}
          <div className="mt-4 space-y-2">
            <Link to={"/deashbord"} className="w-full background-color flex text-center items-center justify-center text-white py-2 rounded-lg ">
             <span> Dashboard</span>
            </Link>
            <button onClick={()=>logoutUser()} className="w-full border py-2 rounded-lg hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
