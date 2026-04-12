import React, { useContext } from "react";
import { Bell, Search, User } from "lucide-react";
import { AuthContext } from "../../useContext/FormContext/AuthContext";
import Logo from "../../Utility/Logo";
import { Link } from "react-router";

export default function DashboardHeader() {
    const {user}=useContext(AuthContext)

    
  return (
    <header className="w-full bg-base-100 shadow-sm border-b border-b-black/5 px-6 py-2 flex items-center justify-between">
      {/* Left Section */}
      <Link to={"/"} className="flex items-center gap-4">
       <Logo ></Logo>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <img src={user?.photoURL} className="rounded-full"  alt="" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium ">{user?.displayName}</p>
            <p className="text-xs text-gray-500 text-center">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
