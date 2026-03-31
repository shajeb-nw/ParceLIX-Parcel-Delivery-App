import React from "react";
import { Truck, PackageCheck, MapPin } from "lucide-react";
import Container from "../../Utility/Container";
import hero from "../../assets/hero.png";
import { Typewriter } from "react-simple-typewriter";
export default function Hero() {
  return (
    <section className="relative bg-base-100   overflow-hidden transition-colors duration-300">
      <Container className="relative  py-15 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="animate-fadeIn">
          <h1 className="text-3xl md:text-5xl mr-2 mt-3  font-bold leading-tight">
            We Make Sure Your <span className="text-color">Parcel Arrives</span> On Time
            <div className="capitalize">
              <Typewriter
                cursor
                cursorBlinking
                delaySpeed={1000}
                deleteSpeed={25}
                loop={0}
                typeSpeed={75}
                words={[
                  "– no delays.",
                  "– just fast delivery.",
                  "– no fuss.",
                ]}
              />
            </div>
          </h1>

          <p className="mt-4 text-lg">
            Send packages anywhere with real-time tracking, secure handling, and
            lightning-fast delivery.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="px-6 py-3 background-color text-white font-semibold rounded-xl shadow-lg hover:scale-105  transition duration-300">
              <span> Send Parcel</span>
            </button>

            <button className="px-6 py-3 border border-gray-300  rounded-xl hover:bg-gray-100 hover:scale-105 transition duration-300">
              Track Order
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck />
              <p className="text-sm">Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <PackageCheck />
              <p className="text-sm">Secure Package</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin />
              <p className="text-sm">Live Tracking</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex w-full h-120    justify-center animate-fadeIn delay-200">
          <img
            src={hero}
            alt="delivery"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </Container>

      {/* SIMPLE CSS ANIMATION */}
      <style  jsx="true">{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
