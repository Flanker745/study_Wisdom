import React, { useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import cookie from "react-cookies";

import {
  IoPencilSharp,
  IoPerson,
  IoMail,
  IoMaleFemale,
  IoLockClosed,
  IoCall,
} from "react-icons/io5"; // Updated icons
import { FaCamera } from "react-icons/fa"; // Camera icon for profile pic
import dp from "./../../assets/dp/profile-pic (4).png";
import getCroppedImg from "./getCroppedImg"; // Utility function to crop image
import { LoginContext } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/Context/UserContext";

function Profile() {
  const { state, dispatch } = useContext(LoginContext);
  const { api, token, userData, loading, error } = useContext(UserContext);
  const id = state;
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [oldPassNot, setoldPassNot] = useState(false);
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    const newErrors = {};
    const conformed = {};

    if (!passwordRegex.test(userInfo.newPassword)) {
      newErrors.newPassword =
        "Password must be 6-16 characters and include letters, numbers, and special characters.";
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
   

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      let response = await fetch(`${api}/changepass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,           
          Authorization: `Bearer ${token}`,
      },
        body: JSON.stringify({
          id: id,
          oldpass: userInfo.oldPassword,
          newPass: userInfo.newPassword,
        }),
      });

      response = await response.json();
      if(!response.status){
        setoldPassNot(response.msg)

      }
      if (response.status) {
        setUserInfo({
          ...userInfo,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsChangingPassword(false);

      }
    }
  };

  useEffect(() => {
    if (userData) {
      setProfilePic(userData.dp);
    }
  }, [userData]);

  const [isEditingPic, setIsEditingPic] = useState(false);
  const [profilePic, setProfilePic] = useState(dp);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState();
  const [userNo] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Change Password Fields

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
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

  const changeProfilePic = (path)=>{
    console.log(path)
  }

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
    setProfilePic(croppedImage);
    changeProfilePic(croppedImage);
    setIsEditingPic(false);
  };

  const logout = () => {
    dispatch({ type: "USER", payload: false });

    // Remove cookies with the correct path
    cookie.remove("user", { path: "/" });
    cookie.remove("authToken", { path: "/" });

    navigate("/");
  };

  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="min-h-screen w-full bg-neutral-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200 p-6">
      <h1 className="border-b border-gray-700 pb-4 text-4xl font-bold text-center">
        Profile
      </h1>

      {/* Profile Pic Section */}
      <div className="flex justify-center mt-8">
        <div className="relative w-[150px] h-[150px]">
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full w-full h-full object-cover shadow-lg"
          />
          <button
            className="absolute bottom-2 right-2 p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
            onClick={() => document.getElementById("fileInput").click()}
            title="Change Profile Picture"
          >
            <FaCamera />
          </button>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleEditPic}
            className="hidden"
          />
        </div>
      </div>

      {/* User Details Section */}
      <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-20">
        {/* Name */}
        <div className="flex items-center mb-6">
          <IoPerson className="text-2xl text-blue-500 mr-4" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 capitalize dark:text-gray-400">
              Name
            </p>
            <div className="flex items-center">
              <span className="text-lg font-semibold">
                {userData.firstName} {userData.lastName}
              </span>
              <button
                className="ml-3 text-gray-500 hover:text-blue-500"
                onClick={() => {
                  const newName = prompt("Enter your name:", name);
                  if (newName) setName(newName);
                }}
                title="Edit Name"
              >
                <IoPencilSharp />
              </button>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center mb-6">
          <IoMaleFemale className="text-2xl text-pink-500 mr-4" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
            <div className="flex items-center">
              <span className="text-lg capitalize font-semibold">
                {userData.gender}
              </span>
              <button
                className="ml-3 text-gray-500 hover:text-blue-500"
                onClick={() => {
                  const newGender = prompt(
                    "Enter your gender (Male/Female/Other):",
                    gender
                  );
                  if (newGender) setGender(newGender);
                }}
                title="Edit Gender"
              >
                <IoPencilSharp />
              </button>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center mb-6">
          <IoMail className="text-2xl text-green-500 mr-4" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <span className="text-lg font-semibold">{userData.email}</span>
          </div>
        </div>

        {/* User Number */}
        <div className="flex items-center mb-6">
          <IoCall className="text-2xl text-purple-500 mr-4" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">User No.</p>
            <span className="text-lg font-semibold">{userNo}</span>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mt-8 ">
          {!isChangingPassword ? (
            <button
              className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => setIsChangingPassword(true)}
            >
              <IoLockClosed className="mr-2" />
              Change Password
            </button>
          ) : (
            <div className="mt-6">
              <div className="mb-4">
                <label
                  className="block text-sm text-gray-600 dark:text-gray-300 mb-1"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={userInfo.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
                {oldPassNot && (
                  <p className="text-red-500 text-sm">{oldPassNot}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm text-gray-600 dark:text-gray-300 mb-1"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={userInfo.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm text-gray-600 dark:text-gray-300 mb-1"
                  htmlFor="confirmPassword"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
                  onClick={handleChangePassword}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* list as mentor */}
        <div className="flex gap-9">
          {!userData.mentor && (
            <Link
              to={"/addMentor"}
              className="flex mt-7  items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              <IoLockClosed className="mr-2" />
              List as mentor
            </Link>
          )}
          {!userData.notes && (
            <Link
              to={"/addNotes"}
              className="flex mt-7  items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              <IoLockClosed className="mr-2" />
              Add notes
            </Link>
          )}
        </div>

        {/* logout */}
        <button
          className="flex mt-7  items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={logout}
        >
          <IoLockClosed className="mr-2" />
          Logout
        </button>
      </div>

      {/* Full-Screen Cropping Modal */}
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
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={() => setIsEditingPic(false)}
              >
                Cancel
              </button>
              <button
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
}

export default Profile;
