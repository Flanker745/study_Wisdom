import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center h-screen justify-center bg-neutral-200 dark:bg-gray-900 dark:text-gray-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4">Oops! Page not found.</p>
        <Link
          tp="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
