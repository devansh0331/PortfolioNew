import React, { useState } from "react";
import { motion } from "framer-motion";
import iitbhilai from "../assets/iitbhilai.png";
import iiith from "../assets/iiith.jpeg";

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Experience data
  const experiences = [
    {
      institute: "Indian Institute of Technology (IIT) Bhilai",
      role: "Project Intern",
      duration: "July 2024 - Present",
      projectTitle:
        "Design and Implementation of a P2P Solar Energy Trading Platform",
      outcome: [
        "Develop a decentralized finance (DeFi) application and design the software architecture for a Solar Energy Trading Project.",
        "Built smart contracts using Solidity to facilitate secure energy and financial transactions between producers and consumers, potentially reducing successful attacks by 70% compared to traditional systems.",
        "Program test and development scripts using Hardhat, ensuring code reliability and functionality.",
      ],
      location: "Hybrid",
      logo: iitbhilai, // Updated logo path
    },
    {
      institute:
        "International Institute of Information Technology (IIIT) Hyderabad",
      role: "Research Intern",
      duration: "Jan 2025 - Present",
      projectTitle: "UAVs Security",
      outcome: [
        "Analyzed command transmission delays in multiple quantum cryptographic schemes.",
        "Implemented NIST-standardized Post-Quantum Cryptography for secure UAV communication.",
        "Optimized power consumption through Task Scheduling on Raspberry Pi.",
      ],
      location: "Hybrid",
      logo: iiith, // Updated logo path
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start slightly below and invisible
    visible: { opacity: 1, y: 0 }, // Move up and fade in
  };

  // Scroll to Research section
  const scrollToResearch = () => {
    const researchSection = document.getElementById("research");
    if (researchSection) {
      researchSection.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedExperience(null); // Close the dialog
  };

  return (
    <div
      id="experience"
      className="min-h-screen flex items-center justify-center bg-primary py-12"
    >
      {/* Container with 3/4 width for large devices */}
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Experience</h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }} // Trigger when 50% of the item is in view
              transition={{ delay: index * 0.2, duration: 0.5 }} // Staggered delay
              className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedExperience(experience)}
            >
              {/* Card Content */}
              <div className="flex justify-between items-center">
                {/* Left Side - Role, Institute, and Duration */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-contrast mb-2">
                    {experience.role}
                  </h2>
                  <p className="text-gray-300">{experience.institute}</p>
                  <p className="text-gray-300 text-sm mt-2">
                    {experience.duration}
                  </p>
                </div>

                {/* Right Side - Logo */}
                <div className="h-full overflow-hidden flex items-center justify-center">
                  <img
                    src={experience.logo}
                    alt={experience.institute}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dialog for Experience Details */}
        {selectedExperience && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-secondary rounded-lg shadow-lg w-full max-w-2xl p-8 relative"
            >
              {/* Close 'X' Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 text-gray-500"
                >
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                </svg>
              </button>

              {/* Institute Logo */}
              <div className="h-32 overflow-hidden flex items-center justify-center bg-white p-4 mb-6">
                <img
                  src={selectedExperience.logo}
                  alt={selectedExperience.institute}
                  className="h-full object-contain"
                />
              </div>

              {/* Title and Details */}
              <h2 className="text-2xl font-bold text-contrast mb-4">
                {selectedExperience.institute}
              </h2>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Role:</span>{" "}
                {selectedExperience.role}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Duration:</span>{" "}
                {selectedExperience.duration}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {selectedExperience.location}
              </p>
              <p className="text-gray-300 mb-4">
                <span className="font-semibold">
                  Project Title / Area of Research:
                </span>{" "}
                {selectedExperience.projectTitle}
              </p>
              <div className="text-gray-300">
                <span className="font-semibold">Outcome:</span>
                <ul className="list-disc list-inside mt-2">
                  {selectedExperience.outcome.map((point, index) => (
                    <li key={index} className="mb-2">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* "See Research Work" Button */}
              <button
                onClick={scrollToResearch}
                className="mt-6 text-contrast hover:text-blue-600 transition duration-300"
              >
                See Research Work
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
