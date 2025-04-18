import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Devansh Shrivastava</h3>
            <p className="text-gray-300">
              A final-year student at BIT Durg, passionate about technology and
              innovation. Let's connect and create something amazing together!
            </p>
            <a href="" className="text-contrast">
              Get resume
            </a>{" "}
            !
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              Quick <span className="text-contrast">Links</span>
            </h3>
            {/* <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-contrast transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#research"
                  className="text-gray-300 hover:text-contrast transition duration-300"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-gray-300 hover:text-contrast transition duration-300"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-300 hover:text-contrast transition duration-300"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-contrast transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul> */}
          </div>

          {/* Email Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              Get in <span className="text-contrast">Touch</span> !
            </h3>
            <p className="text-gray-300">
              Feel free to reach out for collaborations, opportunities, or just
              a friendly chat!
            </p>
            <a
              href="mailto:work.devanshs@gmail.com"
              className="text-contrast  transition duration-300"
            >
              work.devanshs@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Devansh Shrivastava. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
