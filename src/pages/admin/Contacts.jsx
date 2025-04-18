// src/pages/AdminContacts.js
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        }));
        // Sort by most recent first
        contactsData.sort((a, b) => b.timestamp - a.timestamp);
        setContacts(contactsData);
      } catch (error) {
        toast.error("Error fetching contacts");
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await deleteDoc(doc(db, "contacts", id));
      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error("Error deleting contact");
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading contacts...</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6"
    >
      <h1 className="text-2xl font-bold text-white mb-6">
        Manage Contact Submissions
      </h1>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-white text-center py-8">
            No contact submissions found
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="bg-secondary rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {contact.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{contact.email}</p>
                  <p className="text-contrast mt-1">{contact.purpose}</p>

                  {contact.message && (
                    <p className="text-gray-300 mt-2">"{contact.message}"</p>
                  )}

                  {contact.projectTitle && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-300">
                        Project Details:
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Title: {contact.projectTitle}
                      </p>
                      {contact.tech && (
                        <p className="text-gray-400 text-sm">
                          Tech: {contact.tech}
                        </p>
                      )}
                      {contact.projectDetail && (
                        <p className="text-gray-400 text-sm mt-1">
                          {contact.projectDetail}
                        </p>
                      )}
                    </div>
                  )}

                  {contact.meetingPurpose && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-300">
                        Meeting Request:
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Purpose: {contact.meetingPurpose}
                      </p>
                      {contact.meetingDate && (
                        <p className="text-gray-400 text-sm">
                          Date:{" "}
                          {new Date(contact.meetingDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Submitted on: {contact.timestamp?.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Contacts;
