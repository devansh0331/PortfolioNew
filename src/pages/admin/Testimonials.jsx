// src/pages/AdminTestimonials.js
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'approved', 'pending'

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const testimonialsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(testimonialsData);
      } catch (error) {
        toast.error("Error fetching testimonials");
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, "testimonials", id), {
        approved: true,
      });
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial.id === id
            ? { ...testimonial, approved: true }
            : testimonial
        )
      );
      toast.success("Testimonial approved successfully");
    } catch (error) {
      toast.error("Error approving testimonial");
      console.error("Error approving testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      await deleteDoc(doc(db, "testimonials", id));
      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== id)
      );
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error("Error deleting testimonial");
      console.error("Error deleting testimonial:", error);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filter === "all") return true;
    if (filter === "approved") return testimonial.approved;
    if (filter === "pending") return !testimonial.approved;
    return true;
  });

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading testimonials...</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Testimonials</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all"
                ? "bg-contrast text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-md ${
              filter === "approved"
                ? "bg-contrast text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${
              filter === "pending"
                ? "bg-contrast text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTestimonials.length === 0 ? (
          <div className="text-white text-center py-8">
            No testimonials found
          </div>
        ) : (
          filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-secondary rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  {testimonial.role && (
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  )}
                  <p className="text-gray-300 mt-2 italic">
                    "{testimonial.feedback}"
                  </p>
                  <div className="mt-2 text-sm text-gray-400">
                    {testimonial.email && <p>Email: {testimonial.email}</p>}
                    {testimonial.linkedin && (
                      <p>
                        LinkedIn:{" "}
                        <a
                          href={testimonial.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-contrast hover:underline"
                        >
                          View Profile
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!testimonial.approved && (
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Submitted on:{" "}
                {new Date(testimonial.createdAt?.toDate()).toLocaleString()}
                {testimonial.approved && (
                  <span className="ml-2 text-green-400">✓ Approved</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Testimonials;
