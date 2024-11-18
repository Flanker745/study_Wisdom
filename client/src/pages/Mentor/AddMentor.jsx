import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/Context/UserContext";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const MentorSignUp = () => {
  const [step, setStep] = useState(1);
  const { api, token, userData, loading } = useContext(UserContext);
  const nav = useNavigate();
  const location = useLocation();
  const type = location.state?.type;
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    experience: "",
    location: "",
    helpWith: "",
    type:type,
    field: "",
    about: "",
    price: { videoCall: "", call: "", chat: "" },
    qualification: "",
    availabilityDays: [],
    availabilityTime: { start: "", end: "" },
    whatsappNumber: "",
  });

  // State for errors on each field
  const [errors, setErrors] = useState({
    name: "",
    experience: "",
    location: "",
    helpWith: "",
    field: "",
    about: "",
    qualification: "",
    whatsappNumber: "",
    availabilityTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "videoCall" || name === "call" || name === "chat") {
      setFormData((prevData) => ({
        ...prevData,
        price: { ...prevData.price, [name]: value },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear the corresponding error when user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleDayChange = (day) => {
    setFormData((prevData) => {
      const availabilityDays = prevData.availabilityDays.includes(day)
        ? prevData.availabilityDays.filter((d) => d !== day)
        : [...prevData.availabilityDays, day];
      return { ...prevData, availabilityDays };
    });
  };

  useEffect(() => {
    if (!loading && userData) {
      setFormData((prevData) => ({
        ...prevData,
        userId: userData._id || "",
        name: userData.firstName + " " + userData.lastName,
      }));
    }
  }, [userData, loading , type]);
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      type: type || prevData.type, // Preserve existing value if `type` is undefined
    }));
  }, [type]);
  

  const nextStep = () => {
    const {
      name,
      experience,
      location,
      qualification,
      helpWith,
      field,
      about,
      whatsappNumber,
      availabilityDays,
      availabilityTime,
    } = formData;
    let newErrors = {};

    if (step === 1 && !name) newErrors.name = "Name is required.";
    if (step === 2 && !experience)
      newErrors.experience = "Experience is required.";
    if (step === 4 && !location) newErrors.location = "Location is required.";
    if (
      step === 5 &&
      (!formData.price.videoCall ||
        !formData.price.call ||
        !formData.price.chat)
    ) {
      newErrors.price = "All price fields are required.";
    }
    if (step === 6 && !qualification)
      newErrors.qualification = "Qualification is required.";
    if (step === 7 && !field)
      newErrors.field = "field is required.";
    if (step === 3 && !about)
      newErrors.about = "about is required.";
    if (step === 8 && !helpWith)
      newErrors.helpWith = "helpWith is required.";
    if (step === 9 && availabilityDays.length === 0)
      newErrors.availabilityDays = "Select at least one availability day.";
    if (step === 9 && (!availabilityTime.start || !availabilityTime.end))
      newErrors.availabilityTime = "Start and end time are required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    const { name, experience, location, qualification, whatsappNumber } =
      formData;
    let newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!experience) newErrors.experience = "Experience is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!qualification) newErrors.qualification = "Qualification is required.";
    if (!whatsappNumber)
      newErrors.whatsappNumber = "WhatsApp number is required.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(`${api}/addMentor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add mentor");
      }
      nav("/")

    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    }
  };

  return (
    <div className="w-full h-screen dark:text-gray-200 max-w-lg mx-auto p-4">
      <h2 className="text-2xl m-auto text-center font-bold mb-4">
        {type} Sign Up
      </h2>
      <input type="hidden" name="userId" value={formData.userId} />
      <input type="hidden" name="type" value={formData.type} />
      <div className="w-full h-full flex items-center justify-center">
        {step === 1 && (
          <div>
            <label className=" mb-2 flex items-center">
              <FaUser className="mr-2" /> Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className="text-red-500 absolute">{errors.name}</div>
            )}

            <button
              onClick={nextStep}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2">Experience (Years):</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className={`w-full border p-2 dark:bg-gray-900 focus:outline-none rounded mb-4 ${
                errors.experience ? "border-red-500" : ""
              }`}
            >
              <option value="">Select your experience</option>
              <option value="0-1">0-1 Years</option>
              <option value="2-3">2-3 Years</option>
              <option value="4-5">4-5 Years</option>
              <option value="6+">6+ Years</option>
            </select>
            {errors.experience && (
              <div className="text-red-500 absolute">{errors.experience}</div>
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
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-2">About:</label>
            <textarea type="text"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.about ? "border-red-500" : ""
              }`}
              placeholder="Enter your about"></textarea>
            {errors.about && (
              <div className="text-red-500 absolute">
                {errors.about}
              </div>
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
          </div>
        )}
        {step === 4 && (
          <div>
            <label className=" mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Location:
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.location ? "border-red-500" : ""
              }`}
              placeholder="Enter your location"
            />
            {errors.location && (
              <div className="text-red-500 absolute">{errors.location}</div>
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
          </div>
        )}

        {step === 5 && (
          <div>
            <label className="block mb-2">Price:</label>
            <div className="flex mb-4">
              <input
                type="number"
                name="videoCall"
                value={formData.price.videoCall}
                onChange={handleInputChange}
                placeholder="Video Call Price"
                className={`border bg-transparent focus:outline-none   p-2 rounded w-1/3 mr-2 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              <input
                type="number"
                name="call"
                value={formData.price.call}
                onChange={handleInputChange}
                placeholder="Call Price"
                className={`border bg-transparent focus:outline-none  p-2 rounded w-1/3 mr-2 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              <input
                type="number"
                name="chat"
                value={formData.price.chat}
                onChange={handleInputChange}
                placeholder="Chat Price"
                className={`border bg-transparent focus:outline-none  p-2 rounded w-1/3 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.price && (
              <div className="text-red-500 absolute">{errors.price}</div>
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
          </div>
        )}

        {step === 6 && (
          <div>
            <label className="block mb-2">Qualification:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.qualification ? "border-red-500" : ""
              }`}
              placeholder="Enter your qualification"
            />
            {errors.qualification && (
              <div className="text-red-500 absolute">
                {errors.qualification}
              </div>
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
          </div>
        )}

        {step === 7 && (
          <div>
            <label className="block mb-2">Field:</label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.field ? "border-red-500" : ""
              }`}
              placeholder="Enter your field"
            />
            {errors.field && (
              <div className="text-red-500 absolute">{errors.field}</div>
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
          </div>
        )}
        {step === 8 && (
          <div>
            <label className="block mb-2">you can help with :</label>
            <textarea
              type="text"
              name="helpWith"
              value={formData.helpWith}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.helpWith ? "border-red-500" : ""
              }`}
              placeholder="Enter your helpWith">
              </textarea>
            {errors.helpWith && (
              <div className="text-red-500 absolute">{errors.helpWith}</div>
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
          </div>
        )}

        {step === 9 && (
          <div>
            <div className="mb-4">
              <h4 className="font-bold mb-2">Select Availability Days:</h4>
              <div className="flex">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <label key={day} className="mr-4">
                    <input
                      type="checkbox"
                      checked={formData.availabilityDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
              {errors.availabilityDays && (
                <div className="text-red-500 absolute">
                  {errors.availabilityDays}
                </div>
              )}
            </div>

            {formData.availabilityDays.length > 0 && (
              <div>
                <label className="block mb-2">Availability Time:</label>
                <div className="flex mb-4">
                  <input
                    type="time"
                    name="start"
                    value={formData.availabilityTime.start}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availabilityTime: {
                          ...formData.availabilityTime,
                          start: e.target.value,
                        },
                      })
                    }
                    className={`border p-2 rounded w-1/2 mr-2 ${
                      errors.availabilityTime ? "border-red-500" : ""
                    }`}
                  />
                  <input
                    type="time"
                    name="end"
                    value={formData.availabilityTime.end}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availabilityTime: {
                          ...formData.availabilityTime,
                          end: e.target.value,
                        },
                      })
                    }
                    className={`border p-2 rounded w-1/2 ${
                      errors.availabilityTime ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.availabilityTime && (
                  <div className="text-red-500 absolute">
                    {errors.availabilityTime}
                  </div>
                )}
              </div>
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
          </div>
        )}

        {step === 10 && (
          <div>
            <label className="block mb-2">WhatsApp Number:</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              className={`w-full border p-2 bg-transparent focus:outline-none rounded mb-4 ${
                errors.whatsappNumber ? "border-red-500" : ""
              }`}
              placeholder="Enter your WhatsApp number"
            />
            {errors.whatsappNumber && (
              <div className="text-red-500 absolute">
                {errors.whatsappNumber}
              </div>
            )}

            <button onClick={prevStep} className="bg-gray-300 p-2 rounded mr-2">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSignUp;
