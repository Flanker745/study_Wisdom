import React, { createContext, useState, useEffect, useContext } from "react";
import cookie from "react-cookies";
import { LoginContext } from "../../main";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const api = "http://localhost:5500"; // Your API base URL
  const [login, setLogin] = useState(false); // Manage login state
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const token = cookie.load("authToken");
  const { state: loginState } = useContext(LoginContext); // Access state from LoginContext

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true before making the request
      setError(null); // Reset any previous errors

      try {
        const id = loginState; // Assuming the id is in the LoginContext state
        const response = await fetch(`${api}/profile/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.res); // Store user data
      } catch (error) {
        setError(error.message); // Capture and set error
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    };

    if (loginState && token) {
      fetchUserData();
    }
  }, [loginState, token]); // Re-fetch data when loginState or token changes

  return (
    <UserContext.Provider
      value={{
        api,
        login,
        setLogin,
        token,
        userData,
        loading, // Provide loading state
        error, // Provide error state
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
