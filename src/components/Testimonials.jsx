import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, Tech Innovations",
      feedback:
        "Devansh is an exceptional developer with a deep understanding of blockchain technology. His work on our project was top-notch!",
      linkedin: "https://www.linkedin.com/in/johndoe", // Replace with actual LinkedIn URL
    },
    {
      name: "Jane Smith",
      role: "CTO, Quantum Solutions",
      feedback:
        "Working with Devansh was a pleasure. His expertise in quantum cryptography helped us build a secure communication system.",
      linkedin: "https://www.linkedin.com/in/janesmith", // Replace with actual LinkedIn URL
    },
    {
      name: "Alice Johnson",
      role: "Lead Developer, WebWorks",
      feedback:
        "Devansh's skills in web development are unmatched. He delivered a scalable and responsive web application for our team.",
      linkedin: "https://www.linkedin.com/in/alicejohnson", // Replace with actual LinkedIn URL
    },
    {
      name: "Bob Brown",
      role: "Founder, AI Labs",
      feedback:
        "Devansh's knowledge of machine learning is impressive. He helped us implement cutting-edge AI solutions.",
      linkedin: "https://www.linkedin.com/in/bobbrown", // Replace with actual LinkedIn URL
    },
    {
      name: "Charlie Davis",
      role: "Product Manager, FinTech Inc.",
      feedback:
        "Devansh is a great collaborator. His attention to detail and problem-solving skills are exceptional.",
      linkedin: "https://www.linkedin.com/in/charliedavis", // Replace with actual LinkedIn URL
    },
  ];

  // State to manage the current index of the testimonial
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }
    }, 3000); // Change testimonial every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  // Function to get the visible testimonials
  const getVisibleTestimonials = () => {
    const visibleTestimonials = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleTestimonials.push(testimonials[index]);
    }
    return visibleTestimonials;
  };

  // Function to navigate left
  const handleLeftClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Function to navigate right
  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div
      id="testimonials"
      className="min-h-screen flex items-center justify-center bg-primary py-12"
    >
      {/* Container with 3/4 width for large devices */}
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Testimonials</h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Testimonial Cards */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence initial={false}>
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }} // Slide in from the right
                  animate={{ opacity: 1, x: 0 }} // Stay in place
                  exit={{ opacity: 0, x: -100 }} // Slide out to the left
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-full " // Added padding to prevent cutting
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                    {/* Content */}
                    <div className="p-6 text-center h-96 flex flex-col justify-between">
                      <p className="text-gray-300 text-lg italic">
                        “{testimonial.feedback}”
                      </p>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          <a
                            href={testimonial.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-contrast transition duration-300"
                          >
                            {testimonial.name}
                          </a>
                        </h2>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handleLeftClick}
            className="px-6 py-2 bg-contrast text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            &larr; Previous
          </button>
          <button
            onClick={handleRightClick}
            className="px-6 py-2 bg-contrast text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
