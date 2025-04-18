import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TestimonialForm from "./pages/TestimonialForm";
import Home from "./pages/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Testimonials from "./pages/admin/Testimonials";
import Contacts from "./pages/admin/Contacts";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./components/AdminLayout";
import Projects from "./pages/admin/Projects";

function App() {
  return (
    <div className="bg-off">
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testimonial-form" element={<TestimonialForm />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="projects" element={<Projects />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>

        <Footer />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
