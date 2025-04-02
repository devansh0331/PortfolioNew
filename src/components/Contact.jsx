import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore functions
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
    projectTitle: "",
    tech: "",
    projectDetail: "",
    meetingPurpose: "",
    meetingDate: "",
    technicalRequirement: "",
    projectProposal: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, projectProposal: e.target.files[0] });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.purpose) newErrors.purpose = "Purpose is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill out all required fields correctly.");
    } else {
      try {
        // Add form data to Firestore
        const docRef = await addDoc(collection(db, "contacts"), {
          name: formData.name,
          email: formData.email,
          purpose: formData.purpose,
          message: formData.message,
          projectTitle: formData.projectTitle,
          tech: formData.tech,
          projectDetail: formData.projectDetail,
          meetingPurpose: formData.meetingPurpose,
          meetingDate: formData.meetingDate,
          technicalRequirement: formData.technicalRequirement,
          projectProposal: formData.projectProposal
            ? formData.projectProposal.name
            : null,
          timestamp: new Date(),
        });

        console.log("Document written with ID: ", docRef.id);

        // Show success toast
        toast.success("Thank you for reaching out! I'll get back to you soon.");

        // Reset form and show success message
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            purpose: "",
            message: "",
            projectTitle: "",
            tech: "",
            projectDetail: "",
            meetingPurpose: "",
            meetingDate: "",
            technicalRequirement: "",
            projectProposal: null,
          });
          setErrors({});
        }, 3000); // Reset form after 3 seconds
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div
      id="contact"
      className="min-h-screen flex items-center justify-center bg-primary py-12"
    >
      {/* Container with 3/4 width for large devices */}
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Me</h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        {/* Contact Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-lg shadow-lg p-8 flex flex-col lg:flex-row gap-8"
        >
          {/* Left Section */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Let's <span className="text-contrast">Connect</span> !
            </h2>
            <p className="text-gray-300 text-lg mb-4">
              Feel free to reach out for collaborations, freelance
              opportunities, or just a friendly chat. I'm always open to
              discussing new projects and ideas.
            </p>
            {/* <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            /> */}
            <div className="flex space-x-4">
              {/* LinkedIn SVG Icon */}
              <a
                href="https://linkedin.com"
                className="text-gray-300 hover:text-contrast transition duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub SVG Icon */}
              <a
                href="https://github.com"
                className="text-gray-300 hover:text-contrast transition duration-300"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Email SVG Icon */}
              <a
                href="mailto:work.devanshs@gmail.com"
                className="text-gray-300 hover:text-contrast transition duration-300"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2">
            {isSubmitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Thank you for reaching out! 🚀
                </h2>
                <p className="text-gray-300">
                  I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Purpose Field */}
                <div>
                  <label
                    htmlFor="purpose"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Purpose
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                  >
                    <option value="">Select Purpose</option>
                    <option value="Book a Meeting">📅 Book a Meeting</option>
                    <option value="Freelance">🤝 Freelance</option>
                    <option value="General Inquiry">📩 General Inquiry</option>
                    <option value="Project Consultation">
                      🛠️ Project Consultation
                    </option>
                    {/* <option value="Hire">Hire</option> */}
                  </select>
                  {errors.purpose && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.purpose}
                    </p>
                  )}
                </div>

                {/* Conditional Fields Based on Purpose */}
                {formData.purpose === "Project Consultation" && (
                  <>
                    <div>
                      <label
                        htmlFor="projectTitle"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Project Title
                      </label>
                      <input
                        type="text"
                        id="projectTitle"
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleInputChange}
                        placeholder="Enter project title"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tech"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Tech
                      </label>
                      <select
                        id="tech"
                        name="tech"
                        value={formData.tech}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      >
                        <option value="">Select Tech</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="MERN Stack">MERN Stack</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="projectDetail"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Project Detail
                      </label>
                      <textarea
                        id="projectDetail"
                        name="projectDetail"
                        value={formData.projectDetail}
                        onChange={handleInputChange}
                        placeholder="Enter project details"
                        rows="4"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                    </div>
                  </>
                )}

                {formData.purpose === "Book a Meeting" && (
                  <>
                    <div>
                      <label
                        htmlFor="meetingPurpose"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Purpose of Meeting
                      </label>
                      <textarea
                        id="meetingPurpose"
                        name="meetingPurpose"
                        value={formData.meetingPurpose}
                        onChange={handleInputChange}
                        placeholder="Enter purpose of meeting"
                        rows="4"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="meetingDate"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Meeting Date
                      </label>
                      <input
                        type="date"
                        id="meetingDate"
                        name="meetingDate"
                        value={formData.meetingDate}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                    </div>
                  </>
                )}

                {formData.purpose === "Freelance" && (
                  <>
                    <div>
                      <label
                        htmlFor="technicalRequirement"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Technical Requirement
                      </label>
                      <input
                        type="text"
                        id="technicalRequirement"
                        name="technicalRequirement"
                        value={formData.technicalRequirement}
                        onChange={handleInputChange}
                        placeholder="Enter technical requirements"
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="projectProposal"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Project Proposal (PDF)
                      </label>
                      <input
                        type="file"
                        id="projectProposal"
                        name="projectProposal"
                        onChange={handleFileChange}
                        className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                        accept=".pdf"
                      />
                    </div>
                  </>
                )}

                {formData.purpose === "General Inquiry" && (
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message"
                      rows="4"
                      className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-contrast text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
