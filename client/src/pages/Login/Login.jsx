import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/Context/UserContext";
import { LoginContext } from "../../main";
import cookie from 'react-cookies'

function Login() {
  const {state  , dispatch} = useContext(LoginContext);
  const { api, setLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset error message
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        dispatch({type:"USER" , payload:data.userData._id})
        // Save the token and user details
        cookie.save("authToken",encodeURIComponent(data.auth) );
        cookie.save("user",encodeURIComponent(data.userData._id ));

        // Redirect to home or dashboard
        navigate("/");
      } else {
        dispatch({type:"USER" , payload:false})
        setError(data.msg);
      }
    } catch (err) {
      dispatch({type:"USER" , payload:false})
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop the loading indicator after request finishes
    }
  };

  return (
    <div className="flex sm:h-[70vh] h-[80vh] lg:h-[70vh] justify-center bg-neutral-200 dark:bg-gray-900 items-center text-gray-900 dark:text-gray-200">
      <div className="lg:w-1/4 sm:w-1/2 w-[90%] p-4 my-9 border border-gray-900 dark:border-gray-200 rounded-lg">
        <h4 className="text-2xl text-center pb-3">Login</h4>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          className="w-full border-b rounded dark:border-gray-200 border-gray-900 bg-transparent my-5 focus:outline-none px-3 py-2 text-[18px]"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border-b rounded dark:border-gray-200 border-gray-900 bg-transparent my-5 focus:outline-none px-3 py-2 text-[18px]"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-800 text-white text-xl font-bold w-full py-3 rounded-lg my-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="my-1">
          Don't have an account?{" "}
          <Link to={"/signUp"} className="text-blue-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
