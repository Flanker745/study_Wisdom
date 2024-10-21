import React, { Suspense, createContext, lazy, useReducer } from "react";
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
import MentorDetails from "./pages/Mentor/MentorDetails";
import Chat from "./pages/chat/Chat";
import NoteDetailPage from "./pages/Notes/NoteDetailPage";
import SignUp from "./pages/Login/SignUp";
import { UserProvider } from "./components/Context/UserContext";
import { initialState, reducer } from "./reducer/UserReducer";
import AddMentor from "./pages/Mentor/AddMentor";
import AddNotes from "./pages/Notes/AddNotes";
import { SearchProvider } from "./components/Context/SearchContext";
import ForgetPassword from "./pages/Login/ForgetPass";

// Lazy load the Home component
const Home = lazy(() => import("./components/Home"));

export const LoginContext = createContext();

// Move the useReducer hook inside a functional component
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
              path: "mentor/:id",
              element: <MentorDetails />,
            },
            {
              path: "/notes",
              element: <Notes />,
            },
            {
              path: "notes/:id",
              element: <NoteDetailPage />,
            },
            {
              path: "/aiChat",
              element: <Aichat />,
            },
            {
              path: "/chat/:id",
              element: <Chat />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/signUp",
              element: <SignUp />,
            },
            {
              path: "/addMentor",
              element: <AddMentor />,
            },
            {
              path: "/addNotes",
              element: <AddNotes />,
            },
            {
              path:"/forgetPass",
              element: <ForgetPassword/>
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

  return (
    <Suspense fallback={<Loading />}>
      <LoginContext.Provider value={{ state, dispatch }}>
        <DarkModeProvider>
          <UserProvider>
            <SearchProvider>
              <RouterProvider router={router}>
                <ScrollToTop>{/* Your application components */}</ScrollToTop>
              </RouterProvider>
            </SearchProvider>
          </UserProvider>
        </DarkModeProvider>
      </LoginContext.Provider>
    </Suspense>
  );
}

// Render the App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
