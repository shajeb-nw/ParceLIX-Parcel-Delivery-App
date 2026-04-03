import React, { useContext } from "react";
import Logo from "../../Utility/Logo";
import { Link, NavLink } from "react-router";
import Container from "../../Utility/Container";
import Theme from "../../Utility/Theme";
import AppSidebar from "../../Utility/AppSidebar";
import { AuthContext } from "../../useContext/FormContext/AuthContext";
import ProfileDropdown from "../../Utility/ProfileDropdown";
import { FadeLoader } from "react-spinners";


const Header = () => {
  const {user,loading}=useContext(AuthContext)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
  ];

  return (
    <header className="bg-base-100 shadow z-500">
      <Container className=" py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link> <Logo></Logo></Link>

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
          {loading?  
           <FadeLoader width={2} color="#ae0cff" height={12} margin={-3} />
           :
          user?
          <ProfileDropdown></ProfileDropdown>:

          <Link to={"login"} className="background-color text-white  px-4 py-2 rounded-lg">
            <span>Sign Up</span>
          </Link>
          }
           
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
