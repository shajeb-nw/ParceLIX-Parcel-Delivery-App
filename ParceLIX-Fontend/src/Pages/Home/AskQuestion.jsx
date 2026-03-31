import React, { useState } from "react";
import { FaQuestionCircle, FaPaperPlane } from "react-icons/fa";

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Usually within 1–3 days depending on the location.",
  },
  {
    q: "Can I track my parcel?",
    a: "Yes, you can track your parcel in real-time using our tracking system.",
  },
  {
    q: "Is my parcel safe?",
    a: "We ensure 100% secure and safe delivery with proper handling.",
  },
];

const AskQuestion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#0b0f1a] text-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">

        {/* Left: FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <FaQuestionCircle /> Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl p-4 cursor-pointer bg-white/5"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold">{item.q}</h3>

                {openIndex === index && (
                  <p className="text-gray-400 mt-2">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Ask Question Form */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ask Your Question
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700 outline-none"
            />

            <textarea
              rows="4"
              placeholder="Write your question..."
              className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
            >
              <FaPaperPlane /> Send Question
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AskQuestion;