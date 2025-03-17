import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    toast.error("You Must be Logged In")
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;