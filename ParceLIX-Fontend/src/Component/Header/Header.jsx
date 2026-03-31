import React from "react";
import Logo from "../../Utility/Logo";
import { NavLink } from "react-router";
import Container from "../../Utility/Container";
import Theme from "../../Utility/Theme";
import AppSidebar from "../../Utility/AppSidebar";




const Header = () => {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Send Parcel", path: "/send" },
    { name: "Tracking", path: "/tracking" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <header className="bg-base-100 shadow z-500">
      <Container className=" py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Logo></Logo>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="font-medium"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center ">
          <button className="background-color text-white  px-4 py-2 rounded-lg">
            <span>Sign Up</span>
          </button>
          <div className="hidden max-md:flex">
          <AppSidebar></AppSidebar>
          </div>
          {/* <Theme></Theme> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
