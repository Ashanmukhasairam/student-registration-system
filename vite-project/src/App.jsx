import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseOfferings from '../components/courseOfferings/CourseOfferings';
import CourseTypes from '../components/courseTypes/CourseTypes';
import Courses from '../components/courses/Courses';
import CourseDetail from '../components/courseDetail/CourseDetail';

const App = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Maths Basics",
      type: "Individual",
      description: "A basic Maths course for beginners.",
      rating: 4.5,
      image: "https://via.placeholder.com/400x200"
    },
    {
      id: 2,
      name: "Painting",
      type: "Group",
      description: "Collaborative Painting learning.",
      rating: 4.2,
      image: "https://via.placeholder.com/400x200"
    },
    {
      id: 3,
      name: "Computer Special",
      type: "Special",
      description: "Advanced Computer course with cultural lessons.",
      rating: 4.8,
      image: "https://via.placeholder.com/400x200"
    },
    {
      id: 4,
      name: "Spoken English",
      type: "Group",
      description: "Improve your spoken English with peers.",
      rating: 4.0,
      image: "https://www.fastinfoclass.com/new-assets/images/seo-spe/Spoken-English.jpg"
    }
  ]);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CourseOfferings courses={courses} />} />
            <Route path="/courses/:id" element={<CourseDetail initialCourses={courses} />} />
            <Route path="/course-types" element={<CourseTypes />} />
            <Route path="/courses" element={<Courses initialCourses={courses} />
} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
