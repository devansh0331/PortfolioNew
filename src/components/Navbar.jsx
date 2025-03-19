import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position

  // Track scroll direction
  const prevScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Adjust progress bar based on scroll direction
  const adjustedScaleX = useTransform(scaleX, (value) => {
    return scrollDirection === "down" ? value : 1 - value;
  });

  // Update scroll direction and navbar background color
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scroll direction
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("up");
      }
      prevScrollY.current = currentScrollY;

      // Update navbar background color
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-contrast origin-left z-50"
        style={{ scaleX: adjustedScaleX }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full lg:w-3/4 shadow-md z-40 transition-colors duration-300 ${
          isScrolled ? "bg-secondary" : "bg-primary"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Name */}
            <div className="text-xl font-bold text-white">Devansh.S</div>

            {/* Right Side - Links */}
            <div className="hidden md:flex space-x-6">
              {[
                "About",
                "Experience",
                "Research",
                "Gallery",
                // "Testimonial",
                "Contact",
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-contrast transition duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div
              className={`md:hidden ${
                isScrolled ? "bg-secondary" : "bg-primary"
              }`}
            >
              <div className="flex flex-col space-y-4 px-4 pb-4">
                {[
                  "About",
                  "Experience",
                  "Research",
                  "Gallery",
                  // "Testimonial",
                  "Contact",
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="text-white hover:text-contrast transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
