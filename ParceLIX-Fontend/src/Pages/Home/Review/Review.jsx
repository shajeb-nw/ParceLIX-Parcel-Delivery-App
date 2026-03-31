import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Headline from "../../../Utility/Headline";

const reviews = [
  {
    id: 1,
    name: "Awlad Hossain",
    role: "Small Business Owner",
    text: "Amazing service! My parcel arrived on time without any hassle.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rasel Ahmed",
    role: "Online Seller",
    text: "Very reliable delivery service. Highly recommended!",
    rating: 4,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Customer",
    text: "Fast and safe delivery. I always use this service.",
    rating: 5,
  },
];

const Review = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        
          <Headline
          title=" What Our Customers Say"
          div={""}
          subtitle="Trusted by thousands of users across the country"
          className={"text-center"}
          >

          </Headline>
      

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-base-200 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <FaQuoteLeft className="text-2xl text-blue-400 mb-4" />

              <p className=" mb-6">
                {review.text}
              </p>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* User Info */}
              <div>
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <p className="text-sm text-gray-400">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;