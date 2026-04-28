import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaFileAlt,
  FaCog,
  FaTruck,
  FaClipboardList,
  FaCreditCard,
} from "react-icons/fa";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import Hamburger from "hamburger-react";
import { PiMapPinAreaLight } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";

const DeashBordHeaderSidebar = () => {
  const [toggled, setToggled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navLinks = [
    { name: "Dashboard", path: "/deashbord", icon: <LuLayoutDashboard /> },
    { name: "Send Parcel", path: "parcelsend", icon: <FaTruck /> },
    {
      name: "Parcel Details",
      path: "parcelDetails",
      icon: <FaClipboardList />,
    },
    {
      name: "Payment History",
      path: "paymentHistory",
      icon: <FaCreditCard />,
    },
  ];
  return (
    <div className="flex">
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="md"
        backgroundColor="transparent" // এটা থাকতে পারে, কিন্তু CSS‑এ উপরের রুল থাকলে বাধ্যতামূলক না
        style={{ background: "black", color: "white" }}
      >
        <div className="py-5">
          <Logo />
        </div>

        <Menu className="mt-10">
          {navLinks.map((link, index) => {
            const isActive = activeIndex === index;
            return (
              <MenuItem
                key={index}
                icon={link.icon}
                component={<Link to={link.path} />}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300  cursor-pointer
        ${
          isActive
            ? "bg-blue-100 text-blue-600  border-blue-600 font-semibold"
            : " hover:bg-gray-100 hover:text-blue-500"
        }`}
              >
                {link.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Sidebar>

      <main className="">
        <Hamburger
          toggled={toggled}
          toggle={setToggled}
          easing="ease-in"
          size={24}
        />
      </main>
    </div>
  );
};

export default DeashBordHeaderSidebar;
