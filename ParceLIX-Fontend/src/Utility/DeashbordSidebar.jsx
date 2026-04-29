import React from "react";
import {
  LuChevronsLeft,
  LuChevronsRight,
  LuLayoutDashboard,
} from "react-icons/lu";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { FaClipboardList, FaCreditCard, FaTruck } from "react-icons/fa";
import { NavLink } from "react-router";

const DeashbordSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

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
    <div className="bg-base-100 min-h-screen h-full">
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          [".ps-sidebar-container"]: {
            backgroundColor: "hsl(var(--b1))",
          },
        }}
        className="min-h-screen"
      >
        <button
          className="sb-button text-2xl absolute right-5 top-3 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <LuChevronsRight /> : <LuChevronsLeft />}
        </button>

        <Menu className="mt-10">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              end={link.path === "/deashbord"}
              className="block"
            >
              {({ isActive }) => (
                <MenuItem
                  icon={link.icon}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100 hover:text-blue-500"
                  }`}
                >
                  {link.name}
                </MenuItem>
              )}
            </NavLink>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default DeashbordSidebar;
