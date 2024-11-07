import React, { useState, useContext } from "react";
import { UserContext } from "../../components/Context/UserContext";
import { FaImage, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddNotes = () => {
  const { api, token, userData } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    category: "",
    price: 0,
    subject: "", // Replaced "type" with "subject"
    description: "",
    coverImage: null,
    images: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, userId: userData._id || "" });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, file],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    let newErrors = {};

    if (step === 1 && !formData.title) newErrors.title = "Title is required.";
    if (step === 2 && !formData.category)
      newErrors.category = "Category is required.";
    if (step === 3 && formData.price <= 0)
      newErrors.price = "Price must be greater than zero.";
    if (step === 4 && !formData.subject)
      newErrors.subject = "Subject is required.";
    if (step === 5 && !formData.description)
      newErrors.description = "Description is required.";
    if (step === 6 && !formData.coverImage)
      newErrors.coverImage = "Cover image is required.";
    if (step === 7 && formData.images.length === 0)
      newErrors.images = "At least one additional image is required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((image) => {
          formDataToSubmit.append("images", image);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${api}/addNote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSubmit,
      });
      let data = await response.json();
      if (!data.status) {
        throw new Error("Failed to add notes");
      }
      nav(`/notes/${data.note._id}`)
      
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="w-full h-screen dark:text-gray-200 max-w-lg mx-auto p-4">
      <h2 className="text-2xl m-auto text-center font-bold mb-4">Add Notes</h2>
      <input type="hidden" name="userId" value={formData.userId} />

      {step === 1 && (
        <>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
              errors.title ? "border-red-500" : ""
            }`}
            placeholder="Enter note title"
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
              errors.category ? "border-red-500" : ""
            }`}
            placeholder="Enter note category"
          />
          {errors.category && (
            <div className="text-red-500">{errors.category}</div>
          )}
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <label className="block mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
              errors.price ? "border-red-500" : ""
            }`}
            placeholder="Enter note price"
          />
          {errors.price && <div className="text-red-500">{errors.price}</div>}
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <label className="block mb-2">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
              errors.subject ? "border-red-500" : ""
            }`}
            placeholder="Enter note subject"
          />
          {errors.subject && (
            <div className="text-red-500">{errors.subject}</div>
          )}
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 5 && (
        <>
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Enter note description"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <label className="block mb-2">Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.files[0] })
            }
            className={`mb-4 ${errors.coverImage ? "border-red-500" : ""}`}
          />

          {formData.coverImage && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(formData.coverImage)}
                alt="Cover Preview"
                className="w-full h-32 object-cover rounded mb-2"
              />
            </div>
          )}
          {errors.coverImage && (
            <div className="text-red-500">{errors.coverImage}</div>
          )}
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <label className="block mb-2">Additional Images:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`mb-4 ${errors.images ? "border-red-500" : ""}`}
          />
          {formData.images.length > 0 && (
            <div className="mb-4">
              <h4 className="font-bold">Selected Images:</h4>
              <ul>
                {formData.images.map((image, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <span>{image.name}</span>
                    <button
                      onClick={() => removeImage(index)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-16 h-16 object-cover rounded ml-2"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {errors.images && <div className="text-red-500">{errors.images}</div>}
          <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </>
      )}

      {errors.submit && <div className="text-red-500">{errors.submit}</div>}
    </div>
  );
};

export default AddNotes;
