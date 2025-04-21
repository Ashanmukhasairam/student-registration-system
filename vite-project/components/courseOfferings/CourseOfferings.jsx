import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseOfferings = ({ courses }) => {
  const courseTypes = ["Individual", "Group", "Special"];
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredCourses =
    selectedTypes.length === 0
      ? courses
      : courses.filter((course) => selectedTypes.includes(course.type));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 sticky top-0">
        <h2 className="text-lg font-semibold mb-4">Filter by Course Type</h2>
        {courseTypes.map((type) => (
          <label key={type} className="block mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
            {type}
          </label>
        ))}
        <Link to="/courses" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          View All Courses
        </Link>
      </div>

      {/* Course Cards */}
      <div className="w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 no-underline text-gray-800"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-4">{course.name}</h3>
            <p className="text-gray-500 mt-2">{course.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-yellow-500">⭐ {course.rating}</span>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                Enroll
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseOfferings;
