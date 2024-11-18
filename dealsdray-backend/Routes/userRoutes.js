const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../Controller/verifyToken");
const { loginuser, registerUser } = require("../Controller/UserController");
const { EmployeeDetails, updateEmployeeDetails, deleteEmployee, getAllEmployees } = require("../Controller/EmployeeList");

router.post("/register", registerUser);
router.post("/login", loginuser); 
router.post("/addemployee/:id", verifyTokenAndAuthorization, EmployeeDetails); 
router.put("/updateemployee/:id", updateEmployeeDetails); 
router.delete("/deleteemployee/:id", deleteEmployee); 
router.get("/employees/:id",verifyTokenAndAuthorization, getAllEmployees); 

module.exports = router;
