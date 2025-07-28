import React from "react";
import { Outlet } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// This component is for regular logged-in users
export const ProtectedAppRoutes: React.FC = () => {
  return (
    <AuthGuard>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </AuthGuard>
  );
};

// This component is for admin users
export const ProtectedAdminRoutes: React.FC = () => {
  return (
    <AuthGuard adminOnly={true}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AuthGuard>
  );
};
