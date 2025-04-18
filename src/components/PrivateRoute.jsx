// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
