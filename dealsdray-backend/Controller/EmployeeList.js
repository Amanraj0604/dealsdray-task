const asyncHandler = require("express-async-handler");
const EmpList = require("../Models/EmpList");
const { verifyTokenAndAuthorization } = require("../Controller/verifyToken");

// Validation function
const validateInputs = (name, email, phone, img) => {
    const nameRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const imgRegex = /^.+\.(jpg|png)$/;

    return {
        name: nameRegex.test(name),
        email: emailRegex.test(email),
        phone: phoneRegex.test(phone),
        image: imgRegex.test(img),
    };
};

// Create employee details
const EmployeeDetails = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, designation, gender, course, img } = req.body;

        const validationResults = validateInputs(name, email, phone, img);
        if (!validationResults.name || !validationResults.email || !validationResults.phone || !validationResults.image) {
            return res.status(400).json({
                message: "Invalid input(s)",
                validationErrors: validationResults,
            });
        }

        const existingEmployee = await EmpList.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json("Employee already exists");
        }

        const newEmployee = new EmpList({
            
            name,
            email,
            phone,
            designation,
            gender,
            course,
            img,
        });

        await newEmployee.save();
        res.status(200).json("Employee added successfully");
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update employee details
const updateEmployeeDetails = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, designation, gender, course, img } = req.body;
        
        const { id } = req.params; 
        const employee = await EmpList.findOne({ _id: id });
        if (!employee) {
            return res.status(404).json("Employee not found");
        }

        const validationResults = validateInputs(name, email, phone, img);
        if (!validationResults.name || !validationResults.email || !validationResults.phone || !validationResults.image) {
            return res.status(400).json({
                message: "Invalid input(s)",
                validationErrors: validationResults,
            });
        }

        // Update employee details
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.designation = designation || employee.designation;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;
        employee.img = img || employee.img;

        await employee.save();
        res.status(200).json("Employee updated successfully");
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete employee
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        const employee = await EmpList.findOne({ _id: id });
        if (!employee) {
            return res.status(404).json("Employee not found");
        }

        // Delete the employee
        await employee.deleteOne();
        res.status(200).json("Employee deleted successfully");
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await EmpList.find(); // No filter applied to get all employees
        if (employees.length === 0) {
            return res.status(404).json("No employees found");
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = { EmployeeDetails, updateEmployeeDetails, deleteEmployee,getAllEmployees};
