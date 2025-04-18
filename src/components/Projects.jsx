import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import project1 from "../assets/drone.jpeg"; // Replace with your project images
import project2 from "../assets/drone.jpeg";
import project3 from "../assets/drone.jpeg";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaReact, FaNodeJs, FaEthereum } from "react-icons/fa";
import { SiSolidity, SiTailwindcss, SiFirebase } from "react-icons/si";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Projects data
  const projects = [
    {
      title: "Decentralized Solar Energy Trading Platform",
      description:
        "A peer-to-peer energy trading platform using blockchain technology to enable direct transactions between solar energy producers and consumers.",
      image: project1,
      technologies: [
        { name: "React", icon: <FaReact className="text-blue-400" /> },
        { name: "Solidity", icon: <SiSolidity className="text-gray-300" /> },
        { name: "Ethereum", icon: <FaEthereum className="text-purple-400" /> },
      ],
      features: [
        "Smart contracts for secure energy transactions",
        "Real-time energy tracking dashboard",
        "Token-based payment system",
        "70% more secure than traditional systems",
      ],
      githubUrl: "https://github.com/yourusername/solar-trading",
      liveUrl: "https://solartrading.example.com",
      category: "Blockchain",
    },
    {
      title: "Quantum-Secure UAV Communication",
      description:
        "Implementation of post-quantum cryptography for secure drone communication systems with optimized power consumption.",
      image: project2,
      technologies: [
        { name: "Python", icon: <span className="text-yellow-400">Py</span> },
        {
          name: "Raspberry Pi",
          icon: <span className="text-red-400">RPi</span>,
        },
        { name: "NIST PQC", icon: <span className="text-green-400">PQC</span> },
      ],
      features: [
        "Quantum-resistant encryption",
        "40% reduction in power consumption",
        "Real-time command encryption",
        "Tested on Raspberry Pi cluster",
      ],
      githubUrl: "https://github.com/yourusername/quantum-uav",
      liveUrl: null, // No live demo available
      category: "Quantum Cryptography",
    },
    {
      title: "AI-Powered Financial Dashboard",
      description:
        "Interactive dashboard with machine learning predictions for stock market trends and portfolio optimization.",
      image: project3,
      technologies: [
        { name: "React", icon: <FaReact className="text-blue-400" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
        {
          name: "TensorFlow",
          icon: <span className="text-orange-400">TF</span>,
        },
      ],
      features: [
        "Real-time market data visualization",
        "ML-based trend prediction",
        "Portfolio risk assessment",
        "85% prediction accuracy",
      ],
      githubUrl: "https://github.com/yourusername/finance-dashboard",
      liveUrl: "https://finance.example.com",
      category: "Machine Learning",
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Filter projects by category
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div
      id="projects"
      className="min-h-screen flex items-center justify-center bg-primary "
    >
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-contrast text-white"
                  : "bg-secondary text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-secondary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Tag */}
                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-contrast bg-contrast/10 rounded-full">
                  {project.category}
                </span>

                {/* Title and Description */}
                <h2 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-300 mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 px-2 py-1 bg-primary rounded-md text-xs"
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-contrast hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                        title="View on GitHub"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                        title="View Live Demo"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-secondary rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>

                {/* Project Image */}
                <div className="h-64 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project Content */}
                <div className="p-8">
                  {/* Title and Category */}
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                    <span className="px-3 py-1 text-sm font-semibold text-contrast bg-contrast/10 rounded-full">
                      {selectedProject.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-contrast mr-2">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 bg-primary rounded-md"
                        >
                          {tech.icon}
                          <span className="text-gray-300">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        <FiGithub />
                        View Code
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-contrast text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        <FiExternalLink />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
