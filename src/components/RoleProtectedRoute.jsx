import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, loading } = useContext(AuthContext);

  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) {
        setRoleLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(
          doc(db, "users", currentUser.uid)
        );

        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }

      setRoleLoading(false);
    };

    fetchUserRole();
  }, [currentUser]);

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Loading...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== allowedRole) {
    if (userRole === "landlord") {
      return <Navigate to="/landlord-dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleProtectedRoute;