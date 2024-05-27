import { isAuthenticated } from "@/lib/utils";
import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
};