// server/controllers/courseController.js
const Course = require("./../models/course");

exports.getCourses = (req, res) => {
  res.json(Course.getCourses());
};

exports.createCourse = (req, res) => {
  const newCourse = Course.addCourse(req.body);
  res.status(201).json(newCourse);
};

exports.updateCourse = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = Course.updateCourse(id, req.body);
  res.json(updated);
};

exports.deleteCourse = (req, res) => {
  const id = parseInt(req.params.id);
  Course.deleteCourse(id);
  res.status(204).send();
};
