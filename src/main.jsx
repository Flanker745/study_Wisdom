import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Loading";
import { DarkModeProvider } from "./components/Context/DarkMode";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/404Page";
import Mentor from "./pages/Mentor/Mentor";
import Notes from "./pages/Notes/Notes";
import Aichat from "./pages/AiChat/Aichat";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";

// Lazy load the components
const Home = lazy(() => import("./components/Home"));

// const Mentor = lazy(() => import("./pages/Mentor/Mentor"));
// const Notes = lazy(() => import("./pages/Notes/Notes"));
// const Aichat = lazy(() => import("./pages/AiChat/Aichat"));
// const Profile = lazy(() => import("./pages/Profile/Profile"));
// const Login = lazy(() => import("./pages/Login/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout component as the wrapper
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Mentor />,
          },
          {
            path: "/notes",
            element: <Notes />,
          },
          {
            path: "/aiChat",
            element: <Aichat />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path:"/login",
            element:<Login/>
          }
        ],
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
