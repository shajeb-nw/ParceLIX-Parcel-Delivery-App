import React, { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  FaHome,
  FaCalendarAlt,
  FaShoppingCart,
  FaFileAlt,
  FaCog,
  FaTruck,
} from "react-icons/fa";
import Logo from "./Logo";
import { NavLink } from "react-router";
import Hamburger from "hamburger-react";
import { PiMapPinAreaLight } from "react-icons/pi";

const AppSidebar = () => {
  const [toggled, setToggled] = useState(false);

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

        <Menu>
          <p className="px-4 mt-4 text-xs text-gray-400 uppercase">Main</p>

          <MenuItem
            icon={<FaHome />}
            component={
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active-link border border-white"
                    : "border border-white"
                }
              />
            }
          >
            Home
          </MenuItem>

          <MenuItem icon={<PiMapPinAreaLight />} component={<NavLink to={"/coverage"}/>}>
            Coverage
          </MenuItem>

          <MenuItem icon={<FaTruck />} component={<NavLink to={"/parcelsend"}/>}>
           Parcel Send
          </MenuItem>

          <MenuItem icon={<FaShoppingCart />} component={<NavLink />}>
            Orders
          </MenuItem>

          {/* Pages */}
          <p className="px-4 mt-4 text-xs text-gray-400 uppercase">Pages</p>

          <MenuItem icon={<FaFileAlt />} component={<NavLink />}>
            Documentation
          </MenuItem>

          <MenuItem icon={<FaCog />} component={<NavLink />}>
            Settings
          </MenuItem>
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

export default AppSidebar;
