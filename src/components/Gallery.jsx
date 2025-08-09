import React, { useState } from "react";
import { motion } from "framer-motion";
import v1 from "../assets/v1.jpg";
import h1 from "../assets/h1.jpeg";
import v2 from "../assets/v2.jpeg";
import v3 from "../assets/v3.jpeg";
import v5 from "../assets/v5.jpeg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const GalleryItems = [
    { id: 1, image: v1, className: "md:col-span-2 md:row-span-2" },
    { id: 2, image: h1, className: "md:col-span-1 md:row-span-1" },
    { id: 3, image: v2, className: "md:col-span-1 md:row-span-2" },
    { id: 4, image: v3, className: "md:col-span-1 md:row-span-1" },
    { id: 5, image: v5, className: "md:col-span-1 md:row-span-1" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div id="gallery" className="h-screen lg:w-3/4 w-5/6 bg-primary flex flex-col">
      {/* Title Section */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-3xl font-bold text-white">Gallery</h1>
        <div className="w-20 h-1 bg-contrast mx-auto mt-2"></div>
      </div>

      {/* Bento Grid Container */}
      <div className="flex-1  pb-8 overflow-hidden">
        <div className="h-full max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 h-full gap-2">
            {GalleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`${item.className} overflow-hidden rounded-lg bg-black`}
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-2"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.img
              src={selectedImage}
              alt=""
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;