import React from "react";
import {
  FaPhone,
  FaVideo,
  FaComment,
  FaCheckCircle,
  FaStar,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { FiBriefcase } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import dp from "./../../assets/dp/profile-pic (4).png";
import { useLocation, useNavigate } from "react-router-dom";

const MentorDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { mentor } = location.state;
  const handleCallClick = () => {
    window.location.href = `tel:${mentor.whatsappNumber}`;
  };

  const handleVideoCallClick = () => {
    // window.open(`https://wa.me/${mentor.phone}?video=true`, "_blank");
    window.open(`https://wa.me/${mentor.whatsappNumber}?video=true`, "_blank");
  };

  const handleChatClick = (mentor) => {
    // Redirect to chat box
    window.location.href = `https://wa.me/${mentor.whatsappNumber}?text=Hi! I'd like to schedule a chat.`;
    // navigate(`/chat/${mentor.id}`, { state: { mentor } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-950 shadow-lg rounded-xl p-8">
        {/* Mentor Information Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={mentor.userId.dp || dp}
            alt={mentor.dppName}
            className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {mentor.dppName}
          </h2>
          {mentor.verified && (
            <span className="text-green-500 flex items-center space-x-2">
              <FaCheckCircle />
              <span>Verified</span>
            </span>
          )}
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {mentor.about}
          </p>
        </div>

        {/* Mentor Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Expertise */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Expertise
            </h3>
            <div className="flex items-center mt-2 text-gray-500 dark:text-gray-300">
              <IoRocketOutline className="text-pink-500 text-2xl mr-2" />
              <span>{mentor.experience}</span>
            </div>
          </div>

          {/* Field */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Field
            </h3>
            <div className="flex items-center mt-2 text-gray-500 dark:text-gray-300">
              <FiBriefcase className="text-purple-600 text-2xl mr-2" />
              <span>{mentor.field}</span>
            </div>
          </div>

          {/* Location */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Location
            </h3>
            <div className="flex items-center mt-2 text-gray-500 dark:text-gray-300">
              <BiMap className="text-blue-500 text-2xl mr-2" />
              <span>{mentor.location}</span>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Experience
            </h3>
            <div className="flex items-center mt-2 text-gray-500 dark:text-gray-300">
              <FiBriefcase className="text-purple-600 text-2xl mr-2" />
              <span>{mentor.experience} years</span>
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Qualifications
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              {mentor.qualification}
            </p>
          </div>

          {/* Rating */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Rating
            </h3>
            <div className="flex items-center mt-2 text-yellow-500">
              <FaStar className="text-2xl mr-2" />
              <span>{4.5} / 5</span>
            </div>
          </div>

          {/* Availability */}
          {/* Availability */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Availability
            </h3>

            {/* Display Days */}
            <div className="flex items-center mt-2 text-green-500">
              <FaCalendarCheck className="text-2xl mr-2" />
              <span>{mentor.availabilityDays.join(", ")}</span>
            </div>

            {/* Display Time */}
            <div className="flex items-center mt-2 text-green-500">
              <FaClock className="text-2xl mr-2" />
              <span>{`${mentor.availabilityTime.start} - ${mentor.availabilityTime.end}`}</span>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Call Button */}
          <div
            onClick={handleCallClick}
            className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900 p-4 rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300 shadow-md"
          >
            <FaPhone className="text-blue-500 dark:text-blue-400 text-3xl" />
            <p className="text-lg font-semibold mt-2">${mentor.price.call}</p>
            <p className="text-gray-500 dark:text-gray-300">Call</p>
          </div>

          {/* Video Call Button */}
          <div
            onClick={handleVideoCallClick}
            className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900 p-4 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-300 shadow-md"
          >
            <FaVideo className="text-green-500 dark:text-green-400 text-3xl" />
            <p className="text-lg font-semibold mt-2">
              ${mentor.price.videoCall}
            </p>
            <p className="text-gray-500 dark:text-gray-300">Video Call</p>
          </div>

          {/* Chat Button */}
          <div
            onClick={handleChatClick}
            className="flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900 p-4 rounded-lg hover:bg-purple-500 hover:text-white cursor-pointer transition-all duration-300 shadow-md"
          >
            <FaComment className="text-purple-500 dark:text-purple-400 text-3xl" />
            <p className="text-lg font-semibold mt-2">${mentor.price.chat}</p>
            <p className="text-gray-500 dark:text-gray-300">Chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
