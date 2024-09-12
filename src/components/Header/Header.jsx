import { FaMoon, FaSun } from "react-icons/fa";
import { DarkModeContext } from "../Context/DarkMode";
import React, { useEffect, useState, useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/src/assets/logo/logo.png";
// import cookie from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
// import { UserContext } from "../components/UserContext";
import { IoNotifications } from "react-icons/io5";

function Header() {
  const nav = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  // const {
  //   user,
  //   existUser,
  //   exitUserId,
  //   setExistUser,
  //   setUser,
  //   setExitUserId,
  //   initialLoading,
  // } = useContext(UserContext);
  // let role;
  // if (user) {
  //   role = user.role;
  // }

  // const handelLogout = () => {
  //   cookie.remove("token", { path: "/" });
  //   cookie.remove("id", { path: "/" });
  //   setExistUser(null);
  //   setExitUserId(null);
  //   setUser(null);
  //   nav("/");
  //   window.location.reload(); // Force a page reload to ensure state is reset
  // };

  const [showNev, setNev] = useState(false);
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
  if (1 === 2) {
    return (
      <header className="fixed w-full z-10 bg-white border-b">
        <div className="flex items-center justify-center h-16">
          <span>Loading...</span>
        </div>
      </header>
    );
  }
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
          } fixed p-1 text-[20px] sm:p-3 lg:p-4 rounded-full sm:text-[25px] lg:text-[30px] bg-red-500 dark:bg-blue-500 bottom-10 sm:bottom-20 text-white right-2 sm:right-6 lg:right-10 transition-colors duration-300 ease-in-out`}
        >
          <MdKeyboardDoubleArrowUp />
        </a>
        <nav
          className={`flex ${
            scrolled ? "fixed top-0" : "top-[3%]"
          } bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out w-full flex-wrap justify-between z-[999999] sm:flex-nowrap items-center border-b dark:border-gray-700 py-4`}
        >
          <div className="w-[60px] sm:w-[120px] ps-4">
            <img className=" transition-all duration-300" src={logo} alt="" />
          </div>
          <div
            onClick={() => {
              setNev(!showNev);
            }}
            className="block lg:hidden order-2 pe-4 text-[30px] sm:text-[35px] text-gray-800 dark:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <IoMenu />
          </div>
          <div className="sm:w-[55%] w-[45%] lg:w-[28%]">
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
            className={`${
              showNev ? "end-0" : "end-[-100%] lg:end-0"
            } duration-300 absolute w-[80%] md:w-[47%] lg:bg-white lg:dark:bg-gray-900 bg-gray-200 dark:bg-gray-950   lg:bg-inherit h-screen lg:h-fit top-full lg:relative transition-all ease-in-out`}
          >
            <ul className="flex flex-col gap-[60px] mt-9 lg:mt-0 lg:gap-0  lg:flex-row w-full text-[18px] items-center justify-around dark:text-gray-200 transition-colors duration-300 ease-in-out">
              <li className="group relative">
                <Link to="/">Option 1</Link>
                <div className="absolute  bg-red-500 w-0 duration-200 group-hover:w-full py-[1px]"></div>
              </li>
              <li className="group relative">
                <Link to="/">Option 2</Link>
                <div className="absolute  bg-red-500 w-0 duration-200 group-hover:w-full py-[1px]"></div>
              </li>
              <li className="group relative">
                <Link to="/">Option 3</Link>
                <div className="absolute  bg-red-500 w-0 duration-200 group-hover:w-full py-[1px]"></div>
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
            </ul>
          </div>
          <div className="w-fit lg:pe-5 flex items-center gap-3 justify-center">
            <button className="bg-blue-500 dark:bg-green-500 flex text-sm sm:text-xs lg:text-base text-white sm:px-3 p-2 sm:py-2 rounded transition-colors duration-300 ease-in-out">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </nav>
      </header>
      <div className="h-[55px] sm:h-0 sm:pt-[63px] lg:hidden none"></div>
    </>
  );
}
export default Header;
