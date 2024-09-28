import React, { useEffect, useState } from "react";
import { FaBook, FaTag, FaCheckCircle } from "react-icons/fa"; // For book, price, and verified icons
import { FiBookOpen } from "react-icons/fi"; // For note type
import { BiCategoryAlt } from "react-icons/bi"; // For category (e.g., JEE, 12th Class)
import { useNavigate } from "react-router-dom"; // For navigation
import sampleCover from "./../../assets/book1.jpg"; // Placeholder image
import sampleCover2 from "./../../assets/book2.jpg"; // Placeholder image

import sampleCover3 from "./../../assets/book3.jpg"; // Placeholder image

import sampleCover4 from "./../../assets/book4.jpg"; // Placeholder image


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); // useNavigate for routing

  useEffect(() => {
    // Sample data for testing, replace with API call later
    setNotes([
      {
        id: 1,
        title: "JEE Mathematics Module",
        category: "JEE",
        subject: "Mathematics",
        price: 500,
        type: "Module",
        description:
          "Comprehensive JEE Mathematics module covering calculus, algebra, trigonometry, and more. Perfect for students preparing for competitive exams.",
        verified: true,
        coverImage: sampleCover,
        images: [sampleCover, sampleCover2, sampleCover3, sampleCover4],
      },
      {
        id: 2,
        title: "12th Class Physics Notes",
        category: "12th Class",
        subject: "Physics",
        price: 300,
        type: "Notes",
        description:
          "Detailed notes for 12th Class Physics, covering chapters such as electromagnetism, thermodynamics, and optics.",
        verified: false,
        coverImage: sampleCover,
        images: [sampleCover, sampleCover2, sampleCover3, sampleCover4],
      },
      {
        id: 3,
        title: "JEE Chemistry Module",
        category: "JEE",
        subject: "Chemistry",
        price: 450,
        type: "Module",
        description:
          "High-quality Chemistry module for JEE preparation. Includes organic, inorganic, and physical chemistry topics.",
        verified: true,
        coverImage: sampleCover,
        images: [sampleCover, sampleCover2, sampleCover3, sampleCover4],
      },
    ]);
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const handleNoteClick = (noteDetails) => {
    // Navigate to the detail page of the note
    navigate(`/notes/${noteDetails.id}` , { state: { noteDetails } });

  };

  return (
    <div className="py-10 bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 w-[90%] m-auto sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-950 rounded-2xl p-6 flex flex-col sm:flex-row transition-transform duration-300 shadow-md dark:shadow-gray-950 hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => handleNoteClick(note)} // Trigger navigation on click
          >
            {/* Left Side: Note Cover Image */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={note.coverImage}
                  alt={note.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover border-4 border-blue-300 shadow-lg"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {note.title}
                  </h2>
                  {note.verified && (
                    <div className="flex items-center text-green-500 space-x-1">
                      <FaCheckCircle className="text-lg" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Subject: {note.subject}
              </p>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 mb-1">
                <BiCategoryAlt className="text-blue-500 text-xl" />
                <p className="text-lg">Category: {note.category}</p>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 mb-1">
                <FiBookOpen className="text-green-500 text-xl" />
                <p className="text-lg">Type: {note.type}</p>
              </div>

              {/* Description Section */}
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                {truncateText(note.description, 30)} {/* Truncates after 30 words */}
              </p>
            </div>

            {/* Right Side: Price Icon */}
            <div className="flex sm:flex-col justify-between sm:justify-center items-center space-y-4 sm:space-y-6 sm:pl-6 mt-4 sm:mt-0">
              <div className="flex flex-col items-center mt-4">
                <div className="rounded-full border-4 border-red-500 p-2 glow-on-hover hover:shadow-lg">
                  <FaTag className="text-red-500 text-lg" />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-2">
                  ₹{note.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
