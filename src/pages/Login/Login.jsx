import React from "react";
import { IoSettingsSharp } from "react-icons/io5";

function Login() {
  return (
    <div className="h-[50vh] w-full flex items-center justify-center bg-neutral-200 dark:bg-gray-900 dark:text-gray-200">
      <div className="space-y-9">
        <div className="text-[70px] md:text-[150px] w-fit m-auto flex">
          <IoSettingsSharp className=" animate-spin-slow dark:text-gray-200 text-gray-400" />
          <div className="rotate-16 text-[60px] md:text-[130px] ms-[-15px] md:ms-[-28px] md:mt-[-25px]  mt-[-10px]">
            <IoSettingsSharp className=" text-yellow-500  animate-spin-slow-reverse" />
          </div>
        </div>
        <div className="px-3 text-center space-y-5 sm:text-xl">
          <h5 className="text-[24px] font-semibold text-purple-900 sm:text-5xl">
            Login is under maintenance
          </h5>
          <p>We're working hard to improve the user experience. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
