import React from "react";
import {
  Truck,
  PackageCheck,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
} from "lucide-react";
import Container from "../../Utility/Container";
import Headline from "../../Utility/Headline";

const Services = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours across major cities with fast and reliable service.",
      highlight: false,
      icon: "🚗",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery ensuring fast reach within 48–72 hours.",
      highlight: true,
      icon: "🚛",
    },
    {
      title: "Fulfillment Solution",
      desc: "Inventory management, order processing, packaging, and after-sales support.",
      highlight: false,
      icon: "♻️",
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere with guaranteed safety of your product.",
      highlight: false,
      icon: "💵",
    },
    {
      title: "Corporate Service / Contract Logistics",
      desc: "Customized logistics solutions including warehouse and inventory management.",
      highlight: false,
      icon: "🏢",
    },
    {
      title: "Parcel Return",
      desc: "Reverse logistics facility to return or exchange products easily.",
      highlight: false,
      icon: "📦",
    },
  ];
  return (
    <section className="bg-[#03373D] py-20 transition-colors">
      <Container className="  text-center">
        <Headline
          title="Our Services"
          subtitle="Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time."
          titleClass="text-white"
          subtitleClass="text-white  md:w-200 m-auto"
        ></Headline>

        <div className="grid md:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <div
              key={index}
              className={`rounded-2xl  p-8 text-center shadow-lg transition transform hover:-translate-y-1 ${
                service.highlight
                  ? "bg-gradient-to-tl from-[#08aafb] to-[#ae0cff] text-white"
                  : "bg-base-100  hover:bg-gradient-to-tl from-[#08aafb] to-[#ae0cff] hover:text-white transform transition-all duration-300"
              }`}
            >
              <div className="w-15 h-15 mx-auto text-2xl mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                {service?.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-sm opacity-80">{service.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
