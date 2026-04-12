import React, { useContext } from "react";
import { AuthContext } from "../useContext/FormContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location=useLocation()
  if (loading) return <h2>Loading...</h2>;
  if (user) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
