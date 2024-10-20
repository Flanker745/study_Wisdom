import React from "react";
import banner from "/src/assets/banner/banner.svg";
function Hero() {
  return (
    <div className="bg-neutral-200 blocke flex-wrap pb-9 duration-300 items-center justify-center dark:bg-gray-900 dark:text-gray-200 p-2 flex ">
      <div className="md:w-[35%] w-[80%] sm:w-[50%] ">
        <img className="w-full h-full" src={banner} alt="banner" />
      </div>
      <div className="md:w-[65%] w-[90%] text-sm sm:text-lg xl:text-2xl space-y-5 ">
        <p>
          Ready to take your studies and career to the next level? We’re here to
          connect you with top mentors who provide the guidance you need to
          succeed. From expert advice to career tips, our mentors are here to
          help you shine. Plus, effortlessly buy and sell notes to keep your
          study game strong.
        </p>
        <h5>
          <span className="text-purple-900 font-semibold">Learn, Share, Succeed </span>—unlock your full potential with us!
        </h5>
      </div>
    </div>
  );
}

export default Hero;
