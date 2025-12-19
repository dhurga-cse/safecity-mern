import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyReports from "./pages/MyReports";
import ReportCrime from "./pages/ReportCrime";
import PoliceDashboard from "./pages/PoliceDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },

      {
        path: "/myreports",
        element: (
          <ProtectedRoute allowedRole="citizen">
            <MyReports />
          </ProtectedRoute>
        ),
      },
      {
        path: "/report/:repid",
        element: (
          <ProtectedRoute allowedRole="citizen">
            <ReportCrime />
          </ProtectedRoute>
        ),
      },

      {
        path: "/police",
        element: (
          <ProtectedRoute allowedRole="police">
            <PoliceDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <h1>Page not found. Please check your URL</h1> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
