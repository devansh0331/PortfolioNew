import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    features: "",
    githubUrl: "",
    liveUrl: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        toast.error("Error fetching projects");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format features as array
    const formattedData = {
      ...formData,
      features: formData.features
        .split("\n")
        .filter((item) => item.trim() !== ""),
    };

    try {
      if (editId) {
        // Update existing project
        await updateDoc(doc(db, "projects", editId), formattedData);
        setProjects(
          projects.map((proj) =>
            proj.id === editId ? { ...proj, ...formattedData } : proj
          )
        );
        toast.success("Project updated successfully");
      } else {
        // Add new project
        const docRef = await addDoc(collection(db, "projects"), {
          ...formattedData,
          createdAt: new Date(),
        });
        setProjects([...projects, { id: docRef.id, ...formattedData }]);
        toast.success("Project added successfully");
      }

      resetForm();
    } catch (error) {
      toast.error("Error saving project");
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      features: project.features.join("\n"),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      category: project.category || "",
    });
    setEditId(project.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((proj) => proj.id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Error deleting project");
      console.error("Error deleting project:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      features: "",
      githubUrl: "",
      liveUrl: "",
      category: "",
    });
    setEditId(null);
    setIsFormOpen(false);
  };

  if (loading) {
    return (
      <div className="text-white text-center py-8">Loading projects...</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-contrast text-white rounded-md hover:bg-blue-600 transition"
        >
          Add New Project
        </button>
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => resetForm()}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="bg-secondary rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {editId ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Technologies (comma separated) *
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                      placeholder="React, Node.js, MongoDB"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Features (one per line) *
                    </label>
                    <textarea
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                      placeholder="Feature 1\nFeature 2\nFeature 3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                        placeholder="https://github.com/yourusername/project"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Live URL
                      </label>
                      <input
                        type="url"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                        placeholder="https://yourproject.example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-md text-white"
                      placeholder="Web Development, Blockchain, etc."
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-contrast text-white rounded-md hover:bg-blue-600 transition"
                    >
                      {editId ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No projects found. Add your first project!
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-secondary rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold text-contrast bg-contrast/10 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-2">{project.description}</p>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Technologies:
                    </h4>
                    <p className="text-gray-300">{project.technologies}</p>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Features:
                    </h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 mt-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-contrast hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-contrast hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
