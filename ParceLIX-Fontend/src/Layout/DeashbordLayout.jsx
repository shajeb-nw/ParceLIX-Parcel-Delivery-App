import React from "react";
import DashboardHeader from "../Component/Header/DashboardHeader";
import Footer from "../Component/Footer/Footer";
import DeashbordSidebar from "../Utility/DeashbordSidebar";
import { Outlet } from "react-router";
import Theme from "../Utility/Theme";

const DeashbordLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader></DashboardHeader>
      <div className=" flex-1">
       <div className="flex flex-row">
           <DeashbordSidebar></DeashbordSidebar>
        <Outlet></Outlet>
       </div>
      </div>
      <Footer></Footer>

      <div className="fixed text-white bottom-2.5 p-2 rounded-md right-2.5 bg-gradient-to-r from-[#08aafb] to-[#ae0cff]">
        <Theme></Theme>
      </div>
    </div>
  );
};

export default DeashbordLayout;
