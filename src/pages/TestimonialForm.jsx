import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: "",
    linkedin: "",
    email: "",
    approved: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name should be less than 50 characters";
    }

    if (formData.role && formData.role.length > 50) {
      newErrors.role = "Role should be less than 50 characters";
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else {
      const wordCount = formData.feedback.trim().split(/\s+/).length;
      if (wordCount > 50) {
        newErrors.feedback = "Feedback should be 50 words or less";
      }
    }

    if (
      formData.linkedin &&
      !formData.linkedin.match(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
      )
    ) {
      newErrors.linkedin = "Please enter a valid LinkedIn profile URL";
    }

    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast.success(
        "Thank you for your testimonial! It will be reviewed soon."
      );
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          role: "",
          feedback: "",
          linkedin: "",
          email: "",
          approved: false,
        });
      }, 3000);
    } catch (err) {
      console.error("Error adding testimonial: ", err);
      toast.error("Failed to submit testimonial. Please try again.");
    }
  };

  const wordCount =
    formData.feedback.trim() === ""
      ? 0
      : formData.feedback.trim().split(/\s+/).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary py-12">
      <div className="w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Share Your Experience with <span className="text-contrast">Me</span>
          </h1>
          <div className="w-20 h-1 bg-contrast mx-auto"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-lg shadow-lg p-8 flex flex-col lg:flex-row gap-8"
        >
          {/* Left Section - Information */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your <span className="text-contrast">Feedback</span> Matters!
            </h2>
            <p className="text-gray-300 text-lg mb-4">
              Share your experience working with me. Your testimonial will help
              others understand the value I can provide.
            </p>
            <div className="flex space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-300"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-300"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-300"
              >
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
              </svg>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:w-1/2">
            {isSubmitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Thank you for your testimonial! 🙏
                </h2>
                <p className="text-gray-300">
                  Your feedback will be reviewed and may appear on my website.
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                    placeholder="Your full name"
                  />
                  <div className="flex justify-between mt-1">
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                    {/* <p className="text-xs text-gray-400 text-right">
                      {formData.name.length}/50
                    </p> */}
                  </div>
                </div>

                {/* Role Field */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Your Position/Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                    placeholder="Your current position"
                  />
                  <div className="flex justify-between mt-1">
                    {errors.role && (
                      <p className="text-red-500 text-sm">{errors.role}</p>
                    )}
                    <p className="text-xs text-gray-400 text-right">
                      {formData.role.length}/50
                    </p>
                  </div>
                </div>

                {/* Contact Info Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* LinkedIn Field */}
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="block text-sm font-medium text-gray-300"
                    >
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                    {errors.linkedin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.linkedin}
                      </p>
                    )}
                  </div>
                </div>

                {/* Feedback Field */}
                <div>
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Your Testimonial *
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="4"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-primary text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-contrast"
                    placeholder="Share your experience working with me..."
                  ></textarea>
                  <div className="flex justify-between mt-1">
                    {errors.feedback && (
                      <p className="text-red-500 text-sm">{errors.feedback}</p>
                    )}
                    <p
                      className={`text-xs ${
                        wordCount > 50 ? "text-red-400" : "text-gray-400"
                      } text-right`}
                    >
                      {wordCount}/50 words
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  * Required fields. Your testimonial will be reviewed before
                  appearing on the website.
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-contrast text-white rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
                  >
                    Submit Testimonial
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

export default TestimonialForm;
