import React from "react";
import Container from "../../Utility/Container";
import { BookCheck, Handbag, TruckElectric } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiCarProfile } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdMyLocation } from "react-icons/md";
import Headline from "../../Utility/Headline";

const HowWork = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <PiCarProfile />,
    },
    {
      title: "We Pick It Up",
      desc: "Our rider picks up your parcel right from your doorstep, saving you time and effort.",
      icon: <CiDeliveryTruck />,
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <TbTruckDelivery />,
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <MdMyLocation />,
    },
  ];
  return (
    <section className=" py-10 transition-colors">
      <Container className=" text-center">

        <Headline center={true} title="How It Work"
          subtitle=" Simple steps to deliver your parcel quickly and safely"
          div={""}
        >
             
        </Headline>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-base-100 text-center  p-6 rounded-2xl"
            >
              <div className="text-4xl mb-4  flex  justify-center">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowWork;
