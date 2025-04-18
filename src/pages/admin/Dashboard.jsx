// src/pages/AdminDashboard.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    testimonials: 0,
    contacts: 0,
    pendingTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get testimonials count
        const testimonialsSnapshot = await getDocs(
          collection(db, "testimonials")
        );
        const contactsSnapshot = await getDocs(collection(db, "contacts"));

        const pendingTestimonials = testimonialsSnapshot.docs.filter(
          (doc) => !doc.data().approved
        ).length;

        setStats({
          testimonials: testimonialsSnapshot.size,
          contacts: contactsSnapshot.size,
          pendingTestimonials,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading dashboard...</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6"
    >
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Testimonials"
          value={stats.testimonials}
          icon="💬"
        />
        <StatCard
          title="Pending Testimonials"
          value={stats.pendingTestimonials}
          icon="⏳"
          highlight
        />
        <StatCard
          title="Contact Submissions"
          value={stats.contacts}
          icon="📩"
        />
      </div>

      <div className="bg-secondary rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-contrast text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Review Pending Testimonials
          </button>
          <button className="bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
            View Recent Contacts
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
