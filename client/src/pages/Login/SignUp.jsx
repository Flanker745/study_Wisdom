import React, { useContext, useState } from "react";
import { IoMail, IoPerson } from "react-icons/io5";
import Cropper from "react-easy-crop";
import getCroppedImg from "../Profile/getCroppedImg";
import { IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
import { FaCamera } from "react-icons/fa"; // Camera icon for profile pic

import dp from "./../../assets/avatars/1.png";
import { UserContext } from "../../components/Context/UserContext";
import { TfiControlShuffle } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const nav = useNavigate();
  const { api } = useContext(UserContext);
  const [step, setStep] = useState(1); // For handling steps
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [recivedOtp, setRecivedOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  // Error states for validation
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [DP , setDp] = useState("")

  // Profile picture states
  const [isEditingPic, setIsEditingPic] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [profilePic, setProfilePic] = useState(dp);

  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility state
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep = async () => {
    let isValid = true;
  
    if (step === 1) {
      isValid = false;
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      } else {
        setEmailError("");
        if (!otpSent) {
           // Set loading state when sending OTP
           setLoadingOtp(true);
           const result = await handleGenerateOtp(email);
           setLoadingOtp(false); // Reset loading state
          if (result) {
            isValid = true;
            setOtpSent(true);
          } else {
            isValid = false;
          }
        } else {
          isValid = true;  // If OTP was already sent previously
        }
      }
    } else if (step === 2) {
      if (!otp) {
        setOtpError("Please enter OTP!");
        isValid = false;
      } else {
        
        setOtpError("");
        if(otp==recivedOtp){
          isValid = true;
        }
        else{
          isValid = false;

        setOtpError("Please enter correct OTP!");
        }
      }
    } else if (step === 3) {
      if (!firstName || !lastName) {
        setNameError("Please enter both first and last names");
        isValid = false;
      } else {
        setNameError("");
      }
  
      if (!gender) {
        setGenderError("Please select a gender");
        isValid = false;
      } else {
        setGenderError("");
      }
    }else if (step === 4) {
      if (!DP) {
        setDp("Please select image!");
        isValid = false;
      } else {
        setDp("");
      }
    } else if (step === 5) {
      if (!password) {
        setPasswordError("Please enter a password");
        isValid = false;
      } else if (password.length < 6) {
        setPasswordError("Password should be at least 6 characters");
        isValid = false;
      } else {
        setPasswordError("");
      }
  
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }
    }
  
    return isValid;
  };
  
  const handleGenerateOtp = async (email) => {
    let responce = await fetch(`${api}/getOTP`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email}),
    });
    responce = await responce.json();
    if (responce.status) {
      setOtpSent(true);
      setRecivedOtp(responce.otp)
      return true;
    } else {
      setEmailError(responce.msg);

    }
    return false;
  };

  const handleNextStep = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setStep(step + 1);  // Only move to the next step if the validation is successful
    }
  };
  
  const handleEditPic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsEditingPic(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
    setProfilePic(croppedImage);
    setIsEditingPic(false);
  };

  // Animation classes based on step
  const getAnimationClass = (currentStep) => {
    if (currentStep === step) return "translate-x-0 opacity-100";
    if (currentStep < step) return "-translate-x-full opacity-0"; // Swipe left (for previous steps)
    if (currentStep > step) return "translate-x-full opacity-0"; // Swipe right (for future steps)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateStep();
    const form = e.target;
    const formData = new FormData(form); // Using FormData for file upload
  
    if (isValid) {
      let response = await fetch(`${api}/registerUser`, {
        method: "POST",
        body: formData,  // Don't stringify form data
      });
      response = await response.json();
      if (response.status) {
        nav("/login");
      } else {
        alert(response.msg);
      }
    }
  };
  

  return (
    <div className="flex h-[80vh] sm:h-[70vh] justify-center items-center bg-neutral-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="relative w-[90%] sm:w-1/2 lg:w-1/4 p-4 border bg-white dark:bg-gray-950 border-gray-900 dark:border-gray-200 rounded-lg overflow-hidden">
        <div className="relative h-auto">
          <form action="" onSubmit={handleSubmit}>
          {/* Step 1 - Email */}
          <div
            className={`${
              step == 1 ? "" : "absolute"
            }  w-full transition-transform transform duration-300 ease-in-out ${getAnimationClass(
              1
            )}`}
          >
            <h4 className="text-2xl text-center pb-3">Sign Up</h4>
            <div className="flex items-center border-b border-gray-900 dark:border-gray-200 py-2">
              <IoMail className="mr-2" />
              <input
                type="email"
                name="email"
                className="w-full bg-transparent focus:outline-none text-[18px] px-3 py-2"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <button type="button"
              onClick={handleNextStep}
              className={`mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded ${loadingOtp ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loadingOtp} // Disable the button when loading
            >
              {loadingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          {/* Step 2 - OTP */}
          <div
            className={`${
              step == 2 ? "" : "absolute"
            }  w-full transition-transform transform duration-300 ease-in-out ${getAnimationClass(
              2
            )}`}
          >
            <h4 className="text-2xl text-center pb-3">Enter OTP</h4>
            <div className="flex items-center border-b border-gray-900 dark:border-gray-200 py-2">
              <IoMail className="mr-2" />
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none text-[18px] px-3 py-2"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

            <div className="flex gap-9">
            <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 3 - Personal Details */}
          <div
            className={`${
              step == 3 ? "" : "absolute"
            }  w-full transition-transform transform duration-300 ease-in-out ${getAnimationClass(
              3
            )}`}
          >
            <h4 className="text-2xl text-center pb-3">Personal Details</h4>
            <div className="flex items-center border-b border-gray-900 dark:border-gray-200 py-2">
              <IoPerson className="mr-2" />
              <input
                type="text"
                name="firstName"
                
                className="w-full bg-transparent focus:outline-none text-[18px] px-3 py-2"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex items-center border-b border-gray-900 dark:border-gray-200 py-2">
              <IoPerson className="mr-2" />
              <input
                type="text"
                name="lastName"
                className="w-full bg-transparent focus:outline-none text-[18px] px-3 py-2"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            <select name="gender"
              className="w-full bg-white dark:bg-gray-950 focus:outline-none border-b border-gray-900 dark:border-gray-200 py-2 my-3 text-[18px]"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {genderError && (
              <p className="text-red-500 text-sm">{genderError}</p>
            )}

            <div className="flex gap-9">
              <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handlePrevStep}
              >
                Back
              </button>

              <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 4 - Profile Picture */}
          <div
            className={`${
              step == 4 ? "" : "absolute"
            } w-full transition-transform transform duration-300 ease-in-out ${getAnimationClass(
              4
            )}`}
          >
            <h4 className="text-2xl text-center pb-3">
              Upload Profile Picture
            </h4>
            {/* Full-Screen Cropping Modal */}

            <div className="flex justify-center mt-8">
              <div className="relative w-[100px] h-[100px]">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover shadow-lg"
                />
                <button type="button"
                  className="absolute bottom-2 right-2 p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                  onClick={() => document.getElementById("fileInput").click()}
                  title="Change Profile Picture"
                >
                  <FaCamera />
                </button>
                <input
                  id="fileInput"
                  name="dp"
                  type="file"
                  accept="image/*"
                  onChange={handleEditPic}
                  className="hidden"
                />
              </div>
            </div>
            {DP && <p className="text-red-500 text-sm">{DP}</p>}
            <div className="flex gap-9">
              <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handlePrevStep}
              >
                Back
              </button>

              <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 5 - Password */}
          <div
            className={`${
              step == 5 ? "" : "absolute"
            } w-full transition-transform transform duration-300 ease-in-out ${getAnimationClass(
              5
            )}`}
          >
            <h4 className="text-2xl text-center pb-3">Set Password</h4>

            {/* Password Field */}
            <div className="flex items-center border-b border-gray-900 dark:border-gray-200 py-2">
              <IoLockClosed className="mr-2" />
              <input
                type={showPassword ? "text" : "password"} // Toggle between password and text
                className="w-full bg-transparent focus:outline-none text-[18px] px-3 py-2"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />} {/* Toggle icon */}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            {/* Confirm Password Field */}
            <div className="flex items-center border-b border-gray-900 dark:border-gray-200 py-2">
              <IoLockClosed className="mr-2" />
              <input
                type={showPassword ? "text" : "password"} // Toggle between password and text
                className="w-full bg-transparent focus:outline-none text-[18px] px-3 py-2"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />} {/* Toggle icon */}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
            <div className="flex gap-9">
              <button type="button"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
                onClick={handlePrevStep}
              >
                Back
              </button>

              <button type="submit"
                className="bg-blue-800 text-white w-full py-3 rounded-lg my-3"
              >
                Register
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
      {isEditingPic && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-full h-full md:w-3/4 md:h-3/4 bg-gray-900">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="absolute bottom-24 md:bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setIsEditingPic(false)}
              >
                Cancel
              </button>
              <button type="button"
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
