import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Hero from "./Hero";
import FAQ from "./FAQ";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Home() {
  const location = useLocation();

  // Check if the current path is the mentor details page
  const isMentorDetailsPage =
    location.pathname.startsWith("/mentor/") ||
    location.pathname.includes("/notes/") ||
    location.pathname.startsWith("/profile");
  const chatPage = location.pathname.startsWith("/chat/");
  const profilePage = location.pathname.startsWith("/profile");

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        {!chatPage && (
          <>
            <Header />
            {!isMentorDetailsPage && <Hero />}
          </>
        )}
        <Outlet />
        {!chatPage && (
          <>
            {!profilePage && (
              <>
                <FAQ /> 
                <Footer />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
