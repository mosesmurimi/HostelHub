import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  // Wait for Firebase to determine authentication status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  // User is not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in
  return children;
};

export default ProtectedRoute;
