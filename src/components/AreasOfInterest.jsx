import React from "react";
import { motion } from "framer-motion";

const AreasOfInterest = () => {
  // Areas of Interest data
  const areas = [
    {
      title: "Blockchain",
      description:
        "Exploring decentralized systems, smart contracts, and blockchain-based solutions for real-world problems.",
      icon: "🔗", // Optional: Replace with an image or icon
    },
    {
      title: "Quantum Cryptography",
      description:
        "Investigating the intersection of quantum computing and cryptography to build secure communication systems.",
      icon: "🔒", // Optional: Replace with an image or icon
    },
    // {
    //   title: "Machine Learning",
    //   description:
    //     "Building intelligent systems using machine learning algorithms for data analysis, predictions, and automation.",
    //   icon: "🤖", // Optional: Replace with an image or icon
    // },
    {
      title: "Web Development",
      description:
        "Creating modern, responsive, and scalable web applications using MERN stack, Firebase, and Tailwind CSS.",
      icon: "🌐", // Optional: Replace with an image or icon
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start slightly below and invisible
    visible: { opacity: 1, y: 0 }, // Move up and fade in
  };

  return (
    <div
      id="areas-of-interest"
      className="min-h-screen flex items-center justify-center bg-primary py-12"
    >
      {/* Container with 3/4 width for large devices */}
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Areas of Interest
          </h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }} // Trigger when 50% of the item is in view
              transition={{ delay: index * 0.2, duration: 0.5 }} // Staggered delay
              className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon or Image */}
              <div className="p-6 text-4xl text-center text-contrast">
                {area.icon}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {area.title}
                </h2>
                <p className="text-gray-300">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreasOfInterest;
