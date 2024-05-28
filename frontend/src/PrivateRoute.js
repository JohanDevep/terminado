import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ redirectTo, children }) => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;