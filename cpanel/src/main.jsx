import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// const Structure = lazy(() => import("./dashboard/Structure"));
// const Dashboard = lazy(() => import("./dashboard/Dashboard"));
import Structure from './Structure';
import Dashboard from "./Dashboard";
const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Structure />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <RouterProvider router={router}>
        </RouterProvider>
  </React.StrictMode>
);