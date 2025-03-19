import React, { useState } from "react";
import { motion } from "framer-motion";

const Research = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [query, setQuery] = useState({
    name: "",
    email: "",
    designation: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showQuerySection, setShowQuerySection] = useState(false);

  // Card data
  const projects = [
    {
      title: "Solar Energy Trading System",
      description:
        "A blockchain-based platform for peer-to-peer solar energy trading.",
      image: "/src/assets/logo.png", // Updated image path
      details: `This project focuses on creating a decentralized platform where users can trade solar energy efficiently using blockchain technology. 
      
      The platform aims to reduce energy costs, promote renewable energy usage, and provide a transparent and secure way for energy transactions. 
      
      By leveraging smart contracts, users can automate energy trading, ensuring fairness and efficiency in the process.`,
      institution: "BIT Durg, India",
    },
    {
      title: "UAV Security",
      description:
        "Enhancing security protocols for unmanned aerial vehicles (UAVs).",
      image: "/src/assets/drone.jpeg", // Updated image path
      details: `This project involves developing advanced security measures for UAVs to prevent unauthorized access and ensure safe operations in sensitive environments. 
      
      The focus is on implementing encryption protocols, secure communication channels, and real-time monitoring systems. 
      
      These measures aim to protect UAVs from cyber threats and physical tampering, ensuring their safe and reliable operation.`,
      institution: "BIT Durg, India",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start slightly below and invisible
    visible: { opacity: 1, y: 0 }, // Move up and fade in
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!query.name) newErrors.name = "Name is required.";
    if (!query.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!query.designation) newErrors.designation = "Designation is required.";
    if (!query.company) newErrors.company = "Company/Institute is required.";
    if (!query.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  // Handle query submission
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      alert(
        `Query submitted successfully!\n\n${JSON.stringify(query, null, 2)}`
      );
      setQuery({
        name: "",
        email: "",
        designation: "",
        company: "",
        message: "",
      });
      setErrors({});
      setShowQuerySection(false); // Switch back to details section after submission
    }
  };

  // Reset dialog state on close
  const handleCloseDialog = () => {
    setSelectedProject(null);
    setShowQuerySection(false); // Reset to details section on close
  };

  return (
    <div
      id="research"
      className="min-h-screen flex items-center justify-center bg-primary py-12"
    >
      {/* Container with 3/4 width for large devices */}
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Research and Development
          </h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }} // Trigger when 50% of the item is in view
              transition={{ delay: index * 0.2, duration: 0.5 }} // Staggered delay
              className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-500">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dialog for Project Details */}
        {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-secondary rounded-lg shadow-lg w-full max-w-2xl p-8 relative"
            >
              {/* Close 'X' Button */}
              <button
                onClick={handleCloseDialog}
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

              {/* Image */}
              <div className="h-64 overflow-hidden mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Details Section (Default) */}
              {!showQuerySection && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold">Institution:</span>{" "}
                    {selectedProject.institution}
                  </p>
                  <p className="text-gray-300 whitespace-pre-line mb-6">
                    {selectedProject.details}
                  </p>
                  <button
                    onClick={() => setShowQuerySection(true)}
                    className="text-contrast hover:text-blue-600 transition duration-300"
                  >
                    Ask a Query
                  </button>
                </div>
              )}

              {/* Query Section (Conditional) */}
              {showQuerySection && (
                <form onSubmit={handleQuerySubmit} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={query.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={query.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="designation"
                        value={query.designation}
                        onChange={handleInputChange}
                        placeholder="Designation"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                      {errors.designation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.designation}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="company"
                        value={query.company}
                        onChange={handleInputChange}
                        placeholder="Company/Institute"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <textarea
                      name="message"
                      value={query.message}
                      onChange={handleInputChange}
                      placeholder="Your query or message..."
                      className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      rows="3"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <button
                      type="button"
                      onClick={() => setShowQuerySection(false)}
                      className="text-contrast hover:text-blue-600 transition duration-300"
                    >
                      Return to Details
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-contrast text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Submit Query
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
