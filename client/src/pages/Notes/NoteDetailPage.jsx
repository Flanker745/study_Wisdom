import React, { useContext, useEffect, useState } from "react";
import { FaTag, FaCheckCircle } from "react-icons/fa"; // Price and verified icons
import { FiBookOpen } from "react-icons/fi"; // Note type icon
import { BiCategoryAlt } from "react-icons/bi"; // Category icon
import sampleCover from "./../../assets/book1.jpg"; // Placeholder image
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../components/Context/UserContext";

const NoteDetailPage = () => {
  const { id } = useParams();
  const { api, token, userData } = useContext(UserContext);

  // State to manage the currently displayed image
  const [notes, setNotes] = useState([]);

  const [currentImage, setCurrentImage] = useState(notes.coverImage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      let response = await fetch(`${api}/viewNotes/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (data.res) {
        setNotes(data.res);
        setCurrentImage(data.res.coverImage)
      } else {
        setError("Error fetching mentors");
      }
    } catch (err) {
      setError("An error occurred while fetching Notes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10">
        <div className="container mx-auto p-4">
          {/* Image Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Main Product Image */}
            <div className="flex flex-col space-y-4">
              <img
                src={currentImage}
                alt={notes.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-4 gap-2">
                            {notes.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`thumbnail-${index}`}
                                    className="w-full h-24 object-cover rounded-lg border border-gray-300 shadow-sm hover:shadow-lg transition cursor-pointer"
                                    onClick={() => setCurrentImage(image)} // Change current image on click
                                />
                            ))}
                        </div>
            </div>

            {/* Right: Note Information */}
            <div className="flex flex-col justify-between">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {notes.title}
              </h2>

              {notes.verified && (
                <div className="flex items-center space-x-2 text-green-500 my-2">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg font-medium">Verified</span>
                </div>
              )}

              <p className="text-xl text-gray-700 dark:text-gray-400">
                {notes.subject}
              </p>

              <div className="my-4 space-y-2">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <BiCategoryAlt className="text-xl text-blue-500" />
                  <p className="text-lg">Category: {notes.category}</p>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <FiBookOpen className="text-xl text-green-500" />
                  <p className="text-lg">Type: {notes.type}</p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-lg mt-4 leading-relaxed">
                {notes.description}
              </p>

              {/* Price and Add to Cart */}
              <div className="flex flex-col mt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-red-500 p-3 rounded-full">
                    <FaTag className="text-white text-lg" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    ₹{notes.price}
                  </p>
                </div>

                <button className="mt-6 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Related Notes */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Related Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Example of Related Notes */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <img
                  src={sampleCover}
                  alt="related-note-1"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  12th Class Physics Notes
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mt-2">₹300</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
                  View Details
                </button>
              </div>
              {/* You can map over related notes here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteDetailPage;
