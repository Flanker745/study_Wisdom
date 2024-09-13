import { FaMoon, FaSun } from "react-icons/fa";
import { DarkModeContext } from "../Context/DarkMode";
import React, { useEffect, useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/src/assets/logo/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { AiFillHome } from "react-icons/ai";
import { BiSolidBookBookmark } from "react-icons/bi";
import dp from "./../../assets/dp/profile-pic (4).png";
import { IoLogoBuffer } from "react-icons/io";
import { MdLogin } from "react-icons/md";

function Header() {
  const nav = useNavigate();
  const location = useLocation(); // Get the current route path
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [login, setLogin] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to check if the current route matches the path
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        id="top"
        className={`${
          scrolled ? "" : "lg:relative fixed"
        } duration-300 w-full z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-all ease-in-out`}
      >
        <a
          href="#top"
          className={`${
            scrolled ? "visible" : "invisible"
          } fixed p-1 text-[20px] sm:p-3 lg:p-4 rounded-full sm:text-[25px] lg:text-[30px] bg-red-500 dark:bg-blue-500 bottom-20 sm:bottom-20 text-white right-2 sm:right-6 lg:right-10 transition-colors duration-300 ease-in-out`}
        >
          <MdKeyboardDoubleArrowUp />
        </a>
        <nav
          className={`flex ${
            scrolled ? "fixed top-0" : "top-[3%]"
          } bg-white dark:bg-gray-900 pe-3 transition-colors duration-300 gap-9  ease-in-out w-full  justify-between z-[999999] sm:flex-nowrap items-center border-b dark:border-gray-700 py-4`}
        >
          <div className="w-[180px] sm:w-[220px] ps-4">
            <img className=" transition-all duration-300" src={logo} alt="" />
          </div>
          <div className=" w-full lg:w-[28%]">
            <div className="bg-neutral-100 dark:bg-gray-950 w-full flex items-center justify-between pe-4 sm:pe-7 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
              <input
                placeholder="Search...."
                className="bg-neutral-100 dark:bg-gray-950 dark:text-gray-200 w-full ps-3 py-2 sm:py-3 focus:outline-none border-0 transition-colors duration-300 ease-in-out"
                type="text"
              />
              <div className="text-[20px] sm:text-[25px] dark:text-gray-700">
                <IoSearch />
              </div>
            </div>
          </div>
          <div
            className={` duration-300  hidden lg:block w-[47%] bg-white dark:bg-gray-900  transition-all ease-in-out`}
          >
            <ul className="flex  text-[18px] font-semibold  items-center justify-around dark:text-gray-200 transition-colors duration-300 ease-in-out">
              <li
                className={`group relative ${
                  isActive("/") ? "text-purple-900" : ""
                }`}
              >
                <Link to="/">Home</Link>
                <div className="absolute  bg-purple-900 w-0 duration-200 group-hover:w-full py-[1px]"></div>
              </li>
              <li
                className={`group relative ${
                  isActive("/notes") ? "text-purple-900" : ""
                }`}
              >
                <Link to="/notes">Notes</Link>
                <div className="absolute  bg-purple-900 w-0 duration-200 group-hover:w-full py-[1px]"></div>
              </li>
              <li
                className={`group relative ${
                  isActive("/aiChat") ? "text-purple-900" : ""
                }`}
              >
                <Link to="/aiChat">AI Chat</Link>
                <div className="absolute  bg-purple-900 w-0 duration-200 group-hover:w-full py-[1px]"></div>
              </li>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  className="hidden"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <label
                  htmlFor="checkbox"
                  className="bg-gray-800 w-14 h-6 rounded-full relative p-1 cursor-pointer flex items-center justify-between transition-colors duration-300 ease-in-out"
                >
                  <FaMoon className="text-yellow-400" />
                  <FaSun className="text-yellow-500" />
                  <span
                    className="bg-white w-5 h-5 absolute left-1 rounded-full transition-transform duration-200"
                    style={{
                      transform: isDarkMode
                        ? "translateX(28px)"
                        : "translateX(0)",
                    }}
                  />
                </label>
              </div>
              {login ? (
                <li
                  className={`group relative ${
                    isActive("/profile") ? "text-purple-900" : ""
                  }`}
                >
                  <Link to="/profile">
                    <div className="w-[42px] h-[42px] m-auto rounded-full  overflow-hidden">
                      <img src={dp} alt="" />
                    </div>
                  </Link>
                </li>
              ) : (
                <div className="w-fit pe-5 flex items-center gap-3 justify-center">
                  <button className="bg-blue-500 dark:bg-green-500 flex  text-white px-3 py-2 rounded transition-colors duration-300 ease-in-out">
                    <Link to="/login">Login</Link>
                  </button>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <nav className=" fixed w-full bg-white dark:bg-gray-950 dark:text-gray-500 lg:hidden block z-[9999] bottom-0">
        <ul className="flex justify-between text-center   font-extrabold text-xs items-center px-4 py-3">
          <li
            className={`${isActive("/") ? "text-purple-900" : ""} duration-300`}
          >
            <Link to="/">
              <AiFillHome className="text-[25px] m-auto " />
              <p>Home</p>
            </Link>
          </li>
          <li
            className={`${
              isActive("/notes") ? "text-purple-900" : ""
            } duration-300`}
          >
            <Link to="/notes">
              <BiSolidBookBookmark className="text-[25px] m-auto " />
              <p>Notes</p>
            </Link>
          </li>
          <li
            className={`${
              isActive("/aiChat") ? "text-purple-900" : ""
            } duration-300`}
          >
            <Link to="/aiChat">
              <div className="bg-gray-200 mb-[2px]  rounded-full">
                <div className="p-[7px]">AI</div>
              </div>
            </Link>
            <p>Chat</p>
          </li>
          <div>
            <input
              type="checkbox"
              id="checkbox"
              className="hidden"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <label
              htmlFor="checkbox"
              className="bg-gray-800 w-14 h-6 mb-[3px] rounded-full relative p-1 cursor-pointer flex items-center justify-between transition-colors duration-300 ease-in-out"
            >
              <FaMoon className="text-yellow-400" />
              <FaSun className="text-yellow-500" />
              <span
                className="bg-white w-5 h-5 absolute left-1 rounded-full transition-transform duration-200"
                style={{
                  transform: isDarkMode ? "translateX(28px)" : "translateX(0)",
                }}
              />
            </label>
            <p>Theme</p>
          </div>
          {login ? (
            <li
              className={`${
                isActive("/profile") ? "text-purple-900" : ""
              } duration-300`}
            >
              <Link to="/profile">
                <div className="w-[32px] h-[32px] m-auto mb-[1px] rounded-full  overflow-hidden">
                  <img src={dp} alt="" />
                </div>
                <p>Profile</p>
              </Link>
            </li>
          ) : (
            <li
              className={`${
                isActive("/login") ? "text-purple-900" : ""
              } duration-300`}
            >
              <Link to="/login">
                <MdLogin className="text-[28px] m-auto " />
                <p>Login</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="h-[55px] sm:h-0 sm:pt-[63px] lg:hidden none"></div>
    </>
  );
}

export default Header;
