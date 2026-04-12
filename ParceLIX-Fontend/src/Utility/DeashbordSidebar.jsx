import React from "react";
import { LuChevronsLeft, LuChevronsRight, LuLayoutDashboard  } from "react-icons/lu";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { FaClipboardList, FaTruck } from "react-icons/fa";
import { Link } from "react-router";

const DeashbordSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);


  return (
    <div className="bg-base-100 min-h-screen">
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
          <MenuItem icon={<LuLayoutDashboard />} 
          component={<Link to={"deashbordPart"}></Link>}
          > Deashbord</MenuItem>

          <MenuItem icon={<FaTruck />} component={<Link to={"parcelsend"}></Link>}> Send Parcel </MenuItem>
          <MenuItem icon={<FaClipboardList />} component={<Link to={"parcelDetails"}></Link>}> Parcel Details</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default DeashbordSidebar;
