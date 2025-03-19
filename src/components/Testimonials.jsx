import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      designation: "CEO, Tech Innovations",
      message:
        "Working with you has been an absolute pleasure. Your expertise and dedication are unmatched!",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "CTO, Future Solutions",
      message:
        "Your ability to deliver results that exceed expectations is truly remarkable. Highly recommend your services!",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      id: 3,
      name: "Alice Johnson",
      designation: "Founder, Creative Minds",
      message:
        "Your professionalism and talent are evident in every project. You always deliver on time and within budget.",
      linkedin: "https://www.linkedin.com/in/alicejohnson",
    },
    {
      id: 4,
      name: "Bob Brown",
      designation: "Product Manager, Innovate Inc.",
      message:
        "Your innovative approach and attention to detail are second to none. It's a joy to work with you!",
      linkedin: "https://www.linkedin.com/in/bobbrown",
    },
    {
      id: 5,
      name: "Charlie Davis",
      designation: "Lead Developer, CodeCraft",
      message:
        "Your technical skills and problem-solving abilities are outstanding. You always deliver top-notch solutions.",
      linkedin: "https://www.linkedin.com/in/charliedavis",
    },
    {
      id: 6,
      name: "Eva Green",
      designation: "UX Designer, PixelPerfect",
      message:
        "Your creativity and ability to understand user needs are truly impressive. You make every project a success.",
      linkedin: "https://www.linkedin.com/in/evagreen",
    },
    {
      id: 7,
      name: "Frank White",
      designation: "Marketing Head, BrandBoost",
      message:
        "You have a unique ability to understand our needs and deliver beyond expectations. Truly a pleasure to work with!",
      linkedin: "https://www.linkedin.com/in/frankwhite",
    },
    {
      id: 8,
      name: "Grace Lee",
      designation: "Data Scientist, DataMinds",
      message:
        "Your analytical approach and technical expertise are outstanding. You bring immense value to every project.",
      linkedin: "https://www.linkedin.com/in/gracelee",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-swipe testimonials
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Swipe every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  // Handle click on left or right testimonial
  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  // Get the indices for the left, center, and right testimonials
  const getTestimonialIndices = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    return [prevIndex, currentIndex, nextIndex];
  };

  const [prevIndex, centerIndex, nextIndex] = getTestimonialIndices();

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

        {/* Testimonial Carousel */}
        <div
          className="relative flex items-center justify-center h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Testimonial */}
          <motion.div
            key={prevIndex}
            initial={{ opacity: 0.5, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 0.7, scale: 0.9, x: "-80%" }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 w-1/4 cursor-pointer"
            onClick={() => handleClick(prevIndex)}
          >
            <div className="bg-secondary rounded-lg shadow-lg p-6">
              <p className="text-gray-300 italic">
                "{testimonials[prevIndex].message}"
              </p>
              <div className="mt-4">
                <a
                  href={testimonials[prevIndex].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:underline"
                >
                  {testimonials[prevIndex].name}
                </a>
                <p className="text-gray-400 text-sm">
                  {testimonials[prevIndex].designation}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center Testimonial */}
          <motion.div
            key={centerIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 z-10"
          >
            <div className="bg-secondary rounded-lg shadow-lg p-6">
              <p className="text-gray-300 italic">
                "{testimonials[centerIndex].message}"
              </p>
              <div className="mt-4">
                <a
                  href={testimonials[centerIndex].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:underline"
                >
                  {testimonials[centerIndex].name}
                </a>
                <p className="text-gray-400 text-sm">
                  {testimonials[centerIndex].designation}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Testimonial */}
          <motion.div
            key={nextIndex}
            initial={{ opacity: 0.5, scale: 0.8, x: "50%" }}
            animate={{ opacity: 0.7, scale: 0.9, x: "80%" }}
            transition={{ duration: 0.5 }}
            className="absolute right-0 w-1/4 cursor-pointer"
            onClick={() => handleClick(nextIndex)}
          >
            <div className="bg-secondary rounded-lg shadow-lg p-6">
              <p className="text-gray-300 italic">
                "{testimonials[nextIndex].message}"
              </p>
              <div className="mt-4">
                <a
                  href={testimonials[nextIndex].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:underline"
                >
                  {testimonials[nextIndex].name}
                </a>
                <p className="text-gray-400 text-sm">
                  {testimonials[nextIndex].designation}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
