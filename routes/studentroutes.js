const express = require("express");
const router = express.Router();

const students = require("../data/students");

// 1. GET all students
router.get("/", (req, res) => {
    res.status(200).json(students);
});

// 2. GET student by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find((student) => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

// 3. POST - Add new student
router.post("/", (req, res) => {
    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name,
        age,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});

// 4. PUT - Update student
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find((student) => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    student.name = name;
    student.age = age;
    student.course = course;
    student.email = email;

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});

// 5. DELETE - Delete student
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

module.exports = router;