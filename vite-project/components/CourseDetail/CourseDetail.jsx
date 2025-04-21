// CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetail = ({initialCourses}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data; in a real app, fetch this from an API or context
 

  const [courses, setCourses] = useState(initialCourses);
  const [course, setCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === parseInt(id));
    if (foundCourse) {
      setCourse(foundCourse);
      setEditedCourse(foundCourse);
    }
  }, [id, courses]);

  const handleDelete = () => {
    const updatedCourses = courses.filter((c) => c.id !== parseInt(id));
    setCourses(updatedCourses);
    navigate('/');
  };

  const handleUpdate = () => {
    const updatedCourses = courses.map((c) =>
      c.id === parseInt(id) ? editedCourse : c
    );
    setCourses(updatedCourses);
    setCourse(editedCourse);
    setIsEditing(false);
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="p-6">
      {isEditing ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
          <input
            type="text"
            value={editedCourse.name}
            onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            value={editedCourse.description}
            onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            value={editedCourse.rating}
            onChange={(e) => setEditedCourse({ ...editedCourse, rating: parseFloat(e.target.value) })}
            className="border p-2 mb-2 w-full"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 mr-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2">Cancel</button>
        </div>
      ) : (
        <div>
          <img src={course.image} alt="" />
          <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
          <p className="mb-2">{course.description}</p>
          <p className="mb-2">Rating: {course.rating}</p>
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 mr-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">Delete</button>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
