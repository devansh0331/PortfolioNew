import React from "react";
import about from "../assets/about.jpeg";

const About = () => {
  return (
    <div
      id="about"
      className="min-h-screen flex items-center justify-center bg-primary py-12"
    >
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wrapper with secondary color */}
        <div className="bg-secondary rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Half - Tagline, Description, and Download Button */}
            <div className="text-center md:text-left">
              <h1 className="text-6xl text-white font-bold mb-4">
                Hello <span className="text-contrast">World</span> !
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                I'm a passionate developer and designer, dedicated to creating
                meaningful and impactful solutions. With a love for coding and
                problem-solving, I strive to make the world a better place
                through technology.
              </p>
              {/* Download Resume Button */}
              <a
                href="/path/to/your-resume.pdf" // Update with the correct path to your resume
                download="YourName_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-contrast text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path d="M12 0l-11 6v12l11 6 11-6v-12l-11-6zm-9 7.813l8 4.375v8.625l-8-4.375v-8.625zm10 13v-8.625l8-4.375v8.625l-8 4.375z" />
                </svg>
                Download Resume
              </a>
            </div>

            {/* Right Half - Picture */}
            <div className="flex justify-center md:justify-end">
              <img
                src={about} // Update the path to your image
                alt="Your Name"
                className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md" // Smaller image size
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
