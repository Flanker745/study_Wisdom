// Home.js
import React, { useContext } from "react";
import Header from "./Header/Header";
import Hero from "./Hero";
import FAQ from "./FAQ";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <Header />
        <Hero />
        <Outlet />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default Home;
