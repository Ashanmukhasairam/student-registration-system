import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Courses = ({ initialCourses }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    rating: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetch('/api/courses') // assuming you're using Vite proxy
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Error loading courses:', err));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isEditing) {
      // PUT request to update
      await fetch(`http://localhost:8000/api/courses/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      setCourses(prev =>
        prev.map(course =>
          course.id === editId ? { ...course, ...formData, id: editId } : course
        )
      );
  
      setIsEditing(false);
      setEditId(null);
    } else {
      // POST request to add
      const response = await fetch("http://localhost:8000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newCourse = await response.json();
      setCourses((prev) => [...prev, newCourse]);
    }
  
    setFormData({ name: '', description: '', image: '', rating: '' });
    setIsModalOpen(false);
  };
  

  const handleEdit = (course) => {
    setFormData(course);
    setIsEditing(true);
    setEditId(course.id);
    setIsModalOpen(true); // Open modal for editing
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/courses/${id}`, {
      method: "DELETE"
    });
    setCourses(prev => prev.filter(course => course.id !== id));
  };
  
  

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Courses</h2>
        <button
          onClick={() => {
            setFormData({ name: '', description: '', image: '', rating: '' });
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Course Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating"
                className="border p-2 rounded"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-fit"
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/courses/${course.id}`)}
            className="cursor-pointer bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transitio"
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
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
