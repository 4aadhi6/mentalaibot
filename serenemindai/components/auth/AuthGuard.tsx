// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// // Interface to define the types for the component's props
// interface AuthGuardProps {
//   children: React.ReactNode;
//   adminOnly?: boolean;
// }

// const AuthGuard: React.FC<AuthGuardProps> = ({
//   children,
//   adminOnly = false,
// }) => {
//   const location = useLocation();
//   const isAuthenticated = !!localStorage.getItem("authToken");
//   const isAdminAuthenticated = !!localStorage.getItem("adminAuthToken");

//   if (adminOnly) {
//     if (!isAdminAuthenticated) {
//       // Redirect non-admins to the login page
//       return <Navigate to="/login" state={{ from: location }} replace />;
//     }
//     // If admin is authenticated, render the protected content
//     return <>{children}</>;
//   }

//   if (!isAuthenticated) {
//     // Redirect non-authenticated users to the login page
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If user is authenticated, render the protected content
//   return <>{children}</>;
// };

// export default AuthGuard;
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  adminOnly = false,
}) => {
  const location = useLocation();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const isAuthenticated = !!user?.token;
  const isAdmin = !!user?.isAdmin;

  if (adminOnly) {
    if (!isAuthenticated || !isAdmin) {
      // Redirect non-admins or non-authenticated users to the main login page
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // If admin is authenticated, render the protected content
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    // Redirect non-authenticated users to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
};

export default AuthGuard;
