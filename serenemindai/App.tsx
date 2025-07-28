import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

// Import your new wrapper components
import {
  ProtectedAppRoutes,
  ProtectedAdminRoutes,
} from "./components/auth/ProtectedRoutes";

// Import all your pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import ChatPage from "./pages/ChatPage";
import JournalPage from "./pages/JournalPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ResourcesPage from "./pages/ResourcesPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import ContentManagementPage from "./pages/admin/ContentManagementPage";
import UserDetailsPage from "./pages/admin/UserDetailsPage";
import FlaggedContentPage from "./pages/admin/FlaggedContentPage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          {/* --- Group 1: Public Routes --- */}
          {/* These are completely unprotected. */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* --- Group 2: Protected User Routes --- */}
          {/* The wrapper handles auth and layout. The children are the actual pages. */}
          <Route element={<ProtectedAppRoutes />}>
            <Route path="/app" element={<Navigate to="/app/chat" replace />} />
            <Route path="/app/chat" element={<ChatPage />} />
            <Route path="/app/journal" element={<JournalPage />} />
            <Route path="/app/analytics" element={<AnalyticsPage />} />
            <Route path="/app/resources" element={<ResourcesPage />} />
          </Route>

          {/* --- Group 3: Protected Admin Routes --- */}
          {/* This wrapper handles admin auth and layout. */}
          <Route element={<ProtectedAdminRoutes />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route
              path="/admin/users/:userEmail"
              element={<UserDetailsPage />}
            />
            <Route path="/admin/content" element={<ContentManagementPage />} />
            <Route path="/admin/flags" element={<FlaggedContentPage />} />
          </Route>

          {/* --- Group 4: The Catch-All Error Route --- */}
          {/* This is at the end and is not protected by any guard. */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
