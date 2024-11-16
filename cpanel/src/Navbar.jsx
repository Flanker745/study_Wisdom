import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGoal } from "react-icons/go";
import { CgWebsite } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";

function Navbar() {
  const [selected, setSelected] = useState("");
  const [ sidebarToggle, setSidebarToggle ] = useState(true);

  const handleMenuClick = (menu) => {
    setSelected(menu);
  };

  return (
    <>
      <aside
        className={`absolute min-w-[250px] left-0 top-0 z-[9999] text-white bg-[rgb(28_36_52)] flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarToggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link
            onClick={() => {
              setSidebarToggle(false);
            }}
            className="rounded-full overflow-hidden m-auto mt-3"
            to="/"
          >
            <img src="/src/assets/logo/logo.png" width={180} alt="Logo" />
          </Link>
          <button
            className="block lg:hidden"
            
          >
            <FaArrowLeft />
          </button>
        </div>
        {/* SIDEBAR HEADER */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            <ul className="mb-6 flex flex-col gap-5">
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    selected === "home" ? "bg-graydark dark:bg-meta-4" : ""
                  }`}
                  to="/"
                  onClick={() => handleMenuClick("home")}
                >
                  <CgWebsite className="text-[22px]" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    selected === "dashboard" ? "bg-graydark dark:bg-meta-4" : ""
                  }`}
                  to="/"
                  onClick={() => handleMenuClick("dashboard")}
                >
                  <LuLayoutDashboard className="text-[22px]" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    selected === "students" ? "bg-graydark dark:bg-meta-4" : ""
                  }`}
                  to="/dashboard/viewStudent"
                  onClick={() => handleMenuClick("students")}
                >
                  <PiStudentFill className="text-[25px]" />
                  Students
                </Link>
              </li>
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    selected === "notes" ? "bg-graydark dark:bg-meta-4" : ""
                  }`}
                  to="/dashboard/viewNotes"
                  onClick={() => handleMenuClick("notes")}
                >
                  <GrNotes className="text-[20px]" />
                  Notes
                </Link>
              </li>
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    selected === "modules" ? "bg-graydark dark:bg-meta-4" : ""
                  }`}
                  to="/dashboard/viewModules"
                  onClick={() => handleMenuClick("modules")}
                >
                  <VscFileSubmodule className="text-[20px]" />
                  Modules
                </Link>
              </li>
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    selected === "dpp" ? "bg-graydark dark:bg-meta-4" : ""
                  }`}
                  to="/dashboard/viewDpp"
                  onClick={() => handleMenuClick("dpp")}
                >
                  <GoGoal className="text-[20px]" />
                  Dpp
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
