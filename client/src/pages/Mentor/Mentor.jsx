import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaVideo,
  FaComment,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { FiBriefcase } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import dp from "./../../assets/dp/profile-pic (4).png";
import { UserContext } from "../../components/Context/UserContext";
import { SearchContext } from "../../components/Context/SearchContext";

const Mentor = () => {
  const { searchInput } = useContext(SearchContext);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { api, token } = useContext(UserContext);

  const handleCallClick = (mentor) => {
    window.location.href = `tel:${mentor.whatsappNumber}`;
  };

  const handleVideoCallClick = (mentor) => {
    window.location.href = `https://wa.me/${mentor.whatsappNumber}?text=Hi! I'd like to schedule a video call.`;
  };

  const handleChatClick = (mentor) => {
    window.location.href = `https://wa.me/${mentor.whatsappNumber}?text=Hi! I'd like to schedule a chat.`;
  };

  const handleProductClick = (mentor) => {
    navigate(`/mentor/${mentor}`, { state: { mentor } });
  };

  const truncateText = (text = "", wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const fetchMentors = async () => {
    setLoading(true);
    try {
      let response = await fetch(`${api}/viewMentor`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (data.res) {
        setMentors(data.res);
        setError("");
      } else {
        throw new Error("No mentors found");
      }
    } catch (err) {
      setError("An error occurred while fetching mentors");
    } finally {
      setLoading(false);
    }
  };

  const searchMentors = async (query) => {
    setLoading(true);
    try {
      let url = `${api}/searchMentor?search=${encodeURIComponent(query)}`;
      let response = await fetch(url, {
        method: "GET",
      });
      let data = await response.json();
      if (data.res) {
        setMentors(data.res);
        setError("");
      } else {
        throw new Error("No results found for your search");
      }
    } catch (err) {
      setError("An error occurred while searching mentors");
    } finally {
      setLoading(false);
    }
  };
const Homepage =  location.pathname.startsWith("/");
  useEffect(() => {
    if (searchInput || Homepage) {
      searchMentors(searchInput);
    } else {
      fetchMentors();
    }
  }, [searchInput]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-10 bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 w-[90%] m-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            onClick={() => handleProductClick(mentor)}
            className="bg-white dark:bg-gray-950 rounded-2xl p-6 flex flex-col sm:flex-row transition-transform duration-300 shadow-md dark:shadow-gray-950 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            {/* Mentor Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={mentor.userId.dp || dp}
                  alt={mentor.userId.firstName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-purple-300 shadow-lg"
                />
                <div>
                  <h2 className="text-xl  sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {mentor.name}
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
                {truncateText(mentor.about, 12)}
              </p>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 mb-1">
                <IoRocketOutline className="text-pink-500 text-xl" />
                <p className="text-lg">Expertise: {mentor.experience}</p>
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
                <p className="text-lg font-bold ml-2">{4.5} / 5</p>
              </div>
            </div>

            {/* Pricing and Actions */}
            <div className="flex sm:flex-col justify-between sm:justify-center items-center space-y-4 sm:space-y-6 sm:pl-6 mt-4 sm:mt-0">
              <div className="flex flex-col items-center mt-4">
                <div
                  className="rounded-full border-4 border-blue-500 p-2 glow-on-hover hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCallClick(mentor);
                  }}
                >
                  <FaPhone className="text-blue-500 text-lg" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-2">
                  ${mentor.price.call}
                </p>
              </div>

              <div className="flex flex-col items-center mt-4">
                <div
                  className="rounded-full border-4 border-green-500 p-2 glow-on-hover hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoCallClick(mentor);
                  }}
                >
                  <FaVideo className="text-green-500 text-lg" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-2">
                  ${mentor.price.videoCall}
                </p>
              </div>

              <div className="flex flex-col items-center mt-4">
                <div
                  className="rounded-full border-4 border-purple-500 p-2 glow-on-hover hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChatClick(mentor);
                  }}
                >
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
