import React from "react";
import { IoSearch } from "react-icons/io5";
import QR from "../../assets/Qrcode 1.png";
import playstore from "../../assets/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.png";
import appstore from "../../assets/AppStore.png";
import { FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import logo from "/src/assets/logo/footerLogo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="">
        <footer className="bg-neutral-200  dark:bg-gray-900 pb-[80px] lg:pb-0 dark:text-gray-200 ">
          <div className="flex flex-wrap justify-around sm:pt-[70px] pb-5">
            <div className="space-y-5 w-[90%] sm:w-[40%] lg:mt-0 mt-9 lg:w-fit">
              <div className=" text-[35px]  font-semibold">
                <div className=" w-[120px]">
                  <img className="rounded-lg" src={logo} alt="" />
                </div>
              </div>
              <div className=" text-[25px]  ">
                <h1>Subscribe</h1>
              </div>
              <span className="text-[18px]">Get 10% off your first order</span>
              <form action="">
                <div className="bg-neutral-300 dark:bg-gray-950 dark:text-gray-200 border-2 w-[70%] sm:w-fit flex items-center pe-4 sm:pe-7 rounded-lg">
                  <div>
                    <input
                      placeholder="Enter Your email"
                      className="bg-inherit w-full ps-3 py-1 sm:py-2 focus:outline-none border-0 "
                      type="text"
                    />
                  </div>
                  <div className="text-[25px]">
                    <IoSearch />
                  </div>
                </div>
              </form>
            </div>
            <div className="space-y-5 w-[90%] sm:w-[40%] lg:mt-0 mt-9 lg:w-fit">
              <div className=" text-[25px]  font-semibold">
                <h1>Support</h1>
              </div>
              <div className=" text-[18px]  ">
                <span>84, Kamla Nehru Nagar</span>
                <span>Jodhpur Rajasthan.</span>
              </div>
              <h5 className="text-[18px]">studywisdom01@gmail.com</h5>
              <h5 className="text-[18px]">+91 7014336812</h5>
              <h5 className="text-[18px]">+91 9983546212</h5>
              <h5 className="text-[18px]">+91 7014944745</h5>
            </div>
            <div className="space-y-5 w-[90%] sm:w-[40%] lg:mt-0 mt-9 lg:w-fit">
              <div className=" text-[25px]  font-semibold">
                <h1>Quick Links</h1>
              </div>
              <div>
                <ul className="space-y-4 text-[18px]">
                  <li className="hover:underline">Privacy Policy</li>
                  <li className="hover:underline">Terms Of Use</li>
                  <li className="hover:underline">FAQ</li>
                  <li className="hover:underline">Contact</li>
                </ul>
              </div>
            </div>
            <div className="space-y-5 w-[90%] sm:w-[40%] lg:mt-0 mt-9 lg:w-fit">
              <div className=" text-[25px]  font-semibold">
                <h1>Download App</h1>
              </div>
              <div>
                <p className="text-[14px]">Save $3 with App New User Only</p>
                <div className="flex gap-2 mt-2">
                  <div>
                    <img src={QR} alt="" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <img src={playstore} alt="" />
                    <img src={appstore} alt="" />
                  </div>
                </div>
                <div className="flex text-[22px] gap-9  mt-5">
                  <FaFacebookF className="hover:text-blue-500" />
                  <SlSocialTwitter className="hover:text-blue-500" />
                  <FaInstagram className="hover:text-red-300" />
                  <FaLinkedinIn className="hover:text-blue-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center border-t pt-4 border-gray-600  mt-2 text-xs sm:text-sm pb-3 flex flex-wrap sm:gap-8 gap-3 justify-center">
            <p>© 2024 StudyWisdom. All Rights Reserved.</p>
            <span className="sm:block hidden">|</span>
            <p>
              Designed and Developed by{" "}
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:pradeepnain745@gmail.com";
                }}
                className="text-blue-500 font-semibold hover:underline"
              >
                Pradeep Nain
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
