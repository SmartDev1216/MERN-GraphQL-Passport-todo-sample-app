import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import Logout from "./Logout";

export default function Nav() {
  const {isAuthenticated} = useAuth()
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center">
        
        <div className="w-3/4">
        {isAuthenticated ? (
            <div className="w-full flex justify-between">
            <div>
              <Link to="/" className="mr-4">
                Home
              </Link>
              <Link to="/todo" className="mr-4">
                TodoList
              </Link>
              </div>
              <Logout/>
            </div>
          ) : (
            <>
              <Link to="/signin" className="mr-4">
                SignIn
              </Link>
              <Link to="/signup">SignUp</Link>
            </>
          )}
        </div>
        {/* Add additional content if needed */}
      </div>
    </nav>
  );
}
