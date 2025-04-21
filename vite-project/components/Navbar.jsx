import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white text-gray-800 shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold mb-2 md:mb-0">
        <Link to="/">BETACOURSES</Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search courses..."
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      

      {/* Navigation Links */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-2 md:mb-0">
        <Link to="/course-types" className="hover:text-blue-600">
          Course Types
        </Link>
        <Link to="/courses" className="hover:text-blue-600">
          Courses
        </Link>
      </div>

      {/* Search Bar */}
      
    </nav>
  );
};

export default Navbar;
