import express from "express";
import fs from "fs";
import { writeFileSync } from "fs";
const app = express();
app.use(express.json());

const PORT = 3000;

function readData() {
    try {
        let data = fs.readFileSync("./db.json", "utf-8");
        let parsedData = JSON.parse(data);
        return parsedData;
    }
    catch (err) {
        console.log("Error while reading file",err);
    }
}

function writeData(data) {
    let stringifiedData = JSON.stringify(data, null, 2);
    writeFileSync("./db.json", stringifiedData);
}

// Get Students 

app.get("/students", (req, res) => {
    let studentsData = readData();
    if (!studentsData)
        return res.status(500).json({ message: "Data Unavailable" })
    else {
        res.json({
            message: "Students list",
            students: studentsData.students
        })
    }
})


// Create Student 

app.post("/students", (req, res) => {
    let studentsData = readData();
    if (!studentsData)
        return res.status(500).json({ message: "Data Unavailable" })
    let students = studentsData.students;
    const {name,course,year} = req.body || {};
    if (!name|| !course|| year === undefined) {
        return res.status(400).json({ message: "All fields required for POST" })
    }
    else {
        let newStudent = {
            id: Date.now(),
            name: req.body.name,
            course: req.body.course,
            year: req.body.year
        }

        students.push(newStudent);
        writeData(studentsData);
        res.status(201).json({ message: "Added new Student", students: studentsData.students });
    }
})

// Update Student

app.put("/students/:id", (req, res) => {
    const studentsData = readData();
    if (!studentsData) {
        return res.status(500).json({ message: "Data source unavailable" });
    }

    const id = Number(req.params.id);
    const student = studentsData.students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, course, year } = req.body || {};

    if (!name || !course || year === undefined) {
        return res.status(400).json({ message: "All fields required for PUT" });
    }

    student.name = name;
    student.course = course;
    student.year = Number(year);

    writeData(studentsData);

    res.json({
        message: "Student updated",
        students:studentsData.students
    });
});

// Delete student

app.delete("/students/:id", (req, res) => {
    const studentData = readData();

    if (!studentData) {
        return res.status(500).json({ message: "Data Unavailable" });
    }

    const id = Number(req.params.id);
    const originalLength = studentData.students.length;

    studentData.students = studentData.students.filter(
        s => s.id !== id
    );

    if (originalLength === studentData.students.length) {
        return res.status(404).json({ message: "Student not found for deletion" });
    }

    writeData(studentData);

    res.json({
        message: "Student deleted",
        students: studentData.students
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})