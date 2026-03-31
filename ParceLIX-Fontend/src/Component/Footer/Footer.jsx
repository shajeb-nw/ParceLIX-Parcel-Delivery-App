import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Container from "../../Utility/Container";
import Logo from "../../Utility/Logo";

const Footer = () => {
  return (
    <footer className=" bg-base-100">
      {/* Top Section */}
      <Container className="py-4 mt-8  grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start">
          <Logo></Logo>
          <p className="text-sm mt-4">
            Fast, secure and reliable parcel delivery service across the
            country.
          </p>

          <div className="flex gap-4 mt-6">
            <FaFacebook className="cursor-pointer " />
            <BsTwitter className="cursor-pointer " />
            <BsInstagram className="cursor-pointer" />
            <FaLinkedinIn className="cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div>
          <h2 className="font-semibold text-xl mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm ">
            <li>Home</li>
            <li>Send Parcel</li>
            <li>Tracking</li>
            <li>Pricing</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h1 className="font-semibold text-xl  mb-4">Contact</h1>
          <div className="space-y-3 text-sm ">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Cumilla, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +880 1603-128668
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> shajebnw@gmail.com
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold text-xl mb-4">Subscribe</h2>
          <p className="text-sm  mb-3">Get latest delivery updates</p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-md bg-base-200 text-gray-400 outline-none"
            />
            <button className=" text-white cursor-pointer px-4 rounded-r-md background-color">
             <span> Join</span>
            </button>
          </div>
        </div>
      </Container>
      <div className="border-t border-t-black/15  text-center py-4">
        <p className="text-[15px] font-semibold text-gray-500">
          © 2026 ParceLIX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
