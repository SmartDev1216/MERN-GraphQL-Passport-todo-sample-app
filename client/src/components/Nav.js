import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/signup" className="mr-4">
            SignUp
          </Link>
          <Link to="/signin" className="mr-4">
            SignIn
          </Link>
          <Link to="/todo">TodoList</Link>
        </div>
        {/* Add additional content if needed */}
      </div>
    </nav>
  );
}
