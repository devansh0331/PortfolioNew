import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QuoteSection = () => {
  // State to manage user input
  const [username, setUsername] = useState("");
  const [userQuote, setUserQuote] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [quotes, setQuotes] = useState([
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      author: "Franklin D. Roosevelt",
      linkedin: "",
    },
    {
      text: "Research is creating new knowledge.",
      author: "Neil Armstrong",
      linkedin: "",
    },
  ]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Function to handle user quote submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && userQuote) {
      setQuotes([...quotes, { text: userQuote, author: username, linkedin }]);
      setUsername("");
      setUserQuote("");
      setLinkedin("");
    }
  };

  // Automatically cycle through quotes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Reduced delay to 3 seconds
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="w-full py-16 md:py-20 lg:py-24 bg-primary flex items-center justify-center">
      {/* Container with 3/4 width and secondary background */}
      <div className="w-11/12 lg:w-3/4 bg-secondary rounded-lg shadow-lg p-8  flex flex-col md:flex-row gap-8">
        {/* Left Side: Display One Quote at a Time */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className=" text-center lg:text-left space-y-4"
            >
              <p className=" text-white text-2xl md:text-3xl lg:text-4xl italic">
                "{quotes[currentQuoteIndex].text}"
              </p>
              <p className="text-contrast text-lg md:text-xl font-semibold">
                – {quotes[currentQuoteIndex].author}{" "}
                {quotes[currentQuoteIndex].linkedin && (
                  <a
                    href={quotes[currentQuoteIndex].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    (LinkedIn)
                  </a>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: User Input Form */}
        <div className=" text-center lg:text-left w-full md:w-1/2">
          <h2 className="text-white text-2xl md:text-3xl font-bold  pb-2">
            Something on your mind?
          </h2>
          <div className="w-20 h-1 bg-contrast mx-auto lg:mx-0 mb-6"></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-primary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-contrast"
              required
            />
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="Your LinkedIn Profile URL (optional)"
              className="w-full px-4 py-2 rounded-lg bg-primary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-contrast"
            />
            <textarea
              value={userQuote}
              onChange={(e) => setUserQuote(e.target.value)}
              placeholder="Share your quote, experience, or advice..."
              className="w-full px-4 py-2 rounded-lg bg-primary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-contrast"
              rows="4"
              required
            />
            <button
              type="submit"
              className="w-full lg:w-1/4 bg-contrast text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
