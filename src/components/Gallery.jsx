import React from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  // Sample Gallery data (replace with your own images or content)
  const GalleryItems = [
    {
      id: 1,
      image: "/src/assets/v1.jpg", // Update with correct path
      title: "Project 1",
      description:
        "A blockchain-based platform for peer-to-peer solar energy trading.",
      className: "md:col-span-2 md:row-span-2", // Medium vertical frame
    },
    {
      id: 2,
      image: "/src/assets/h1.jpeg", // Update with correct path
      title: "Project 2",
      description:
        "Enhancing security protocols for unmanned aerial vehicles (UAVs).",
      className: "md:col-span-1 md:row-span-1", // Small square frame
    },
    {
      id: 3,
      image: "/src/assets/v2.jpeg", // Update with correct path
      title: "Project 3",
      description: "Developing advanced security measures for UAVs.",
      className: "md:col-span-1 md:row-span-2", // Small square frame
    },
    {
      id: 4,
      image: "/src/assets/v3.jpeg", // Update with correct path
      title: "Project 4",
      description: "Creating a decentralized platform for energy trading.",
      className: "md:col-span-1 md:row-span-1 ", // Medium vertical frame
    },
    {
      id: 5,
      image: "/src/assets/v5.jpeg", // Placeholder image
      title: "Project 5",
      description:
        "Implementing encryption protocols for secure communication.",
      className: "md:col-span-1 md:row-span-1", // Small square frame
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start slightly below and invisible
    visible: { opacity: 1, y: 0 }, // Move up and fade in
  };

  return (
    <div
      id="gallery"
      className="h-screen flex items-center justify-center bg-primary py-12"
    >
      {/* Container with 3/4 width for large devices */}
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-20rem)]">
          {GalleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }} // Trigger when 50% of the item is in view
              transition={{ delay: index * 0.2, duration: 0.5 }} // Staggered delay
              className={`${item.className} bg-secondary rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Image */}
              <div className="h-full w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
