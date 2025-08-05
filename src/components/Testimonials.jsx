import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase"; // Adjust path as needed

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from Firebase
  useEffect(() => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "testimonials"),
        where("approved", "==", true)
        // Removed orderBy to avoid index requirement
        // If you need sorting, create the index as explained above
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const testimonialsData = [];
          querySnapshot.forEach((doc) => {
            testimonialsData.push({ id: doc.id, ...doc.data() });
          });
          // Sort locally if needed (less efficient but works without index)
          testimonialsData.sort(
            (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
          );
          setTestimonials(testimonialsData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching testimonials: ", err);
          setError("Failed to load testimonials. Please try again later.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up query: ", err);
      setError("Failed to initialize testimonials query.");
      setLoading(false);
    }
  }, []);

  // Function to handle automatic sliding
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }
    }, 3000); // Change testimonial every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  // Function to get the visible testimonials
  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];

    const visibleTestimonials = [];
    const count = Math.min(3, testimonials.length); // Show up to 3 testimonials

    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleTestimonials.push(testimonials[index]);
    }
    return visibleTestimonials;
  };

  // Function to navigate left
  const handleLeftClick = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Function to navigate right
  const handleRightClick = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white">No testimonials available yet.</div>
      </div>
    );
  }

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
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                    {/* Content */}
                    <div className="p-6 text-center h-96 flex flex-col justify-between">
                      <p className="text-gray-300 text-base  italic">
                        “{testimonial.feedback}”
                      </p>
                      <div>
                        <h2 className="text-xl font-bold text-white mb-2">
                          {testimonial.linkedin ? (
                            <a
                              href={testimonial.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-contrast transition duration-300"
                            >
                              {testimonial.name}
                            </a>
                          ) : (
                            testimonial.name
                          )}
                        </h2>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        {testimonials.length > 1 && (
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
        )}
      </div>
    </div>
  );
};

export default Testimonials;
