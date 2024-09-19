import React, { useEffect, useState } from "react";
import { FaPhone, FaVideo, FaComment, FaCheckCircle, FaStar } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5"; // For expertise
import { FiBriefcase } from "react-icons/fi"; // For field
import { BiMap } from "react-icons/bi"; // For location
import dp from "./../../assets/dp/profile-pic (4).png";

const Mentor = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Sample data used here for testing, replace with API call
    setMentors([
      {
        id: 1,
        dppName: "John Doe",
        expertise: "Mathematics",
        field: "Education",
        about:
          "Experienced mentor in high school and college-level mathematics.",
        rating: 4.8,
        location: "New York, USA",
        price: {
          videoCall: 50,
          call: 30,
          chat: 10,
        },
        verified: true,
        profileImage: dp,
      },
      {
        id: 2,
        dppName: "Jane Smith",
        expertise: "Physics",
        field: "Science",
        about: "PhD in Physics with over 10 years of teaching experience.",
        rating: 4.6,
        location: "London, UK",
        price: {
          videoCall: 60,
          call: 40,
          chat: 20,
        },
        verified: false,
        profileImage: dp,
      },
      {
        id: 3,
        dppName: "Jane Smith",
        expertise: "Physics",
        field: "Science",
        about: "PhD in Physics with over 10 years of teaching experience.",
        rating: 4.6,
        location: "London, UK",
        price: {
          videoCall: 60,
          call: 40,
          chat: 20,
        },
        verified: false,
        profileImage: dp,
      },
      {
        id: 4,
        dppName: "Jane Smith",
        expertise: "Physics",
        field: "Science",
        about: "PhD in Physics with over 10 years of teaching experience.",
        rating: 4.6,
        location: "London, UK",
        price: {
          videoCall: 60,
          call: 40,
          chat: 20,
        },
        verified: false,
        profileImage: dp,
      },
      {
        id: 5,
        dppName: "Jane Smith",
        expertise: "Physics",
        field: "Science",
        about: "PhD in Physics with over 10 years of teaching experience.",
        rating: 4.6,
        location: "London, UK",
        price: {
          videoCall: 60,
          call: 40,
          chat: 20,
        },
        verified: false,
        profileImage: dp,
      },
      {
        id: 6,
        dppName: "Jane Smith",
        expertise: "Physics",
        field: "Science",
        about: "PhD in Physics with over 10 years of teaching experience.",
        rating: 4.6,
        location: "London, UK",
        price: {
          videoCall: 60,
          call: 40,
          chat: 20,
        },
        verified: false,
        profileImage: dp,
      },
      {
        id: 7,
        dppName: "Jane Smith",
        expertise: "Physics",
        field: "Science",
        about: "PhD in Physics with over 10 years of teaching experience.",
        rating: 4.6,
        location: "London, UK",
        price: {
          videoCall: 60,
          call: 40,
          chat: 20,
        },
        verified: false,
        profileImage: dp,
      },
    ]);
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <div className="py-10 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 w-[90%] m-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white dark:bg-gray-950 rounded-2xl p-6 flex flex-col sm:flex-row transition-transform duration-300 shadow-md dark:shadow-gray-950 hover:scale-105 hover:shadow-lg"
          >
            {/* Left Side Mentor Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={mentor.profileImage}
                  alt={mentor.dppName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-purple-300 shadow-lg"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {mentor.dppName}
                  </h2>
                  {mentor.verified && (
                    <div className="flex items-center text-green-500 space-x-1">
                      <FaCheckCircle className="text-lg" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {truncateText(mentor.about, 20)}
              </p>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 mb-1">
                <IoRocketOutline className="text-pink-500 text-xl" />
                <p className="text-lg">Expertise: {mentor.expertise}</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 mb-1">
                <FiBriefcase className="text-purple-600 text-xl" />
                <p className="text-lg">Field: {mentor.field}</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 mb-2">
                <BiMap className="text-blue-500 text-xl" />
                <p className="text-lg">Location: {mentor.location}</p>
              </div>

              <div className="flex items-center text-yellow-500 mb-4">
                <FaStar className="text-xl" />
                <p className="text-lg font-bold ml-2">{mentor.rating} / 5</p>
              </div>
            </div>

            {/* Right Side Pricing Icons */}
            <div className="flex sm:flex-col justify-between  sm:justify-center items-center space-y-4 sm:space-y-6 sm:pl-6 mt-4 sm:mt-0">
              <div className="flex flex-col items-center mt-4 ">
                <div className="rounded-full border-4 border-blue-500 p-2 glow-on-hover  hover:shadow-lg">
                  <FaPhone className="text-blue-500 text-lg" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-2">
                  ${mentor.price.call}
                </p>
              </div>

              <div className="flex flex-col items-center mt-4 ">
                <div className="rounded-full border-4 border-green-500 p-2 glow-on-hover  hover:shadow-lg">
                  <FaVideo className="text-green-500 text-lg" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-2">
                  ${mentor.price.videoCall}
                </p>
              </div>

              <div className="flex flex-col items-center mt-4 ">
                <div className="rounded-full border-4 border-purple-500 p-2 glow-on-hover  hover:shadow-lg">
                  <FaComment className="text-purple-500 text-lg" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-2">
                  ${mentor.price.chat}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentor;
