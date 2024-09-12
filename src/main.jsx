import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Loading";
import { DarkModeProvider } from "./components/Context/DarkMode";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/404Page";

// Lazy load the components
const Home = lazy(() => import("./components/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout component as the wrapper
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // Add more routes here as needed
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <DarkModeProvider>
        <RouterProvider router={router}>
          <ScrollToTop>{/* Your application components */}</ScrollToTop>
        </RouterProvider>
      </DarkModeProvider>
    </Suspense>
  </React.StrictMode>
);
