import React, { useContext } from "react";
import { AuthContext } from "../useContext/FormContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import { FadeLoader } from "react-spinners";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <FadeLoader color="#ae0cff"></FadeLoader>
      </div>
    );
  }
  if (user) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
