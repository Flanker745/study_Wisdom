// Home.js
import React, { useContext } from 'react';
import Header from './Header/Header';
import Hero from './Hero';
import FAQ from './FAQ';
import Footer from './Footer/Footer';

function Home() {

  return (
    <>
      <Header/>
      <Hero/>
      <FAQ/>
      <Footer/>
    </>
  );
}

export default Home;
