import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosPersonAdd } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import './EmployeeList.css';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [user, setUser] = useState(null);
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [editEmployee, setEditEmployee] = useState({});
    const itemsPerPage = 5;
    let u_id = null;

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            u_id = user._id;
        }
    }, [user]);

    // Fetch employee data from API
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const token = user ? localStorage.getItem('token') : '';
                const response = await fetch(`http://localhost:3000/api/dealsdray/employees/${u_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setEmployeeData(data);
            } catch (err) {
                console.error('Error fetching employee data:', err);
            }
        };

        if (user && u_id) {
            fetchEmployeeData();
        }
    }, [user, u_id]);

    const startIndex = currentPage * itemsPerPage;
    const currentItems = Array.isArray(employeeData)
        ? employeeData.slice(startIndex, startIndex + itemsPerPage)
        : [];

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleViewDetails = (employee) => {
        setSelectedEmployee(employee);
        setPopupVisible(true);
    };

    const handleDelete = async () => {
        if (selectedEmployee) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(
                    `http://localhost:3000/api/dealsdray/deleteemployee/${selectedEmployee._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    setEmployeeData((prevData) =>
                        prevData.filter((employee) => employee._id !== selectedEmployee._id)
                    );
                    setDeletePopupVisible(false);
                    setSelectedEmployee(null);
                } else {
                    console.error('Failed to delete employee');
                }
            } catch (err) {
                console.error('Error deleting employee:', err);
            }
        }
    };

    const handleEdit = (employee) => {
        setEditEmployee(employee);
        setEditPopupVisible(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/dealsdray/updateemployee/${editEmployee._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editEmployee),
            });

            if (response.ok) {
                setEmployeeData((prevData) =>
                    prevData.map((employee) =>
                        employee._id === editEmployee._id ? editEmployee : employee
                    )
                );
                setEditPopupVisible(false);
            } else {
                console.error('Failed to update employee');
            }
        } catch (err) {
            console.error('Error updating employee:', err);
        }
    };

    return (
        <>
            <div className="employee-top">
                <h3>Total Count: {employeeData.length}</h3>
                <Link to={'/addemployee'}>
                    <span>
                        <IoIosPersonAdd /> <p className="tooltip">Add Employee</p>
                    </span>
                </Link>
            </div>
            <div className="employee-container">
                <h2 className="employee-heading">Employee List</h2>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>
                                    <img
                                        src={employee.img}
                                        alt={`${employee.name}'s Profile`}
                                        className="employee-image"
                                    />
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.course}</td>
                                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                                <td className="employee-actions">
                                    <FaEye
                                        title="View"
                                        className="action-icon"
                                        onClick={() => handleViewDetails(employee)}
                                    />
                                    <FaEdit
                                        title="Edit"
                                        className="action-icon"
                                        onClick={() => handleEdit(employee)}
                                    />
                                    <FaTrash
                                        title="Delete"
                                        className="action-icon"
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setDeletePopupVisible(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={Math.ceil(employeeData.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
                        {/* Popup for Viewing Employee Details */}
                        {isPopupVisible && selectedEmployee && (
                <div className="popup-overlay" onClick={() => setPopupVisible(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setPopupVisible(false)}>X</button>
                        <h3>{selectedEmployee.name}'s Details</h3>
                        <img
                            src={selectedEmployee.img}
                            alt=""
                            className="popup-profile-image"
                        />
                        <p><strong>Employee ID:</strong> {selectedEmployee._id}</p>
                        <p><strong>Name:</strong> {selectedEmployee.name}</p>
                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                        <p><strong>Phone No:</strong> {selectedEmployee.phone}</p>
                        <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
                        <p><strong>Gender:</strong> {selectedEmployee.gender}</p>
                        <p><strong>Course:</strong> {selectedEmployee.course}</p>
                        <p><strong>Created Date:</strong> {new Date(selectedEmployee.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            )}


            {/* Delete Confirmation Popup */}
            {isDeletePopupVisible && selectedEmployee && (
                <div className="popup-overlay" onClick={() => setDeletePopupVisible(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Are you sure you want to delete <h2>{selectedEmployee.name}?</h2></h3>
                        <button onClick={handleDelete} style={{padding:'10px', marginLeft:'10px',fontSize:"15px",background:'red',color:'white',border:'none',cursor:'pointer'}}>Yes</button>
                        <button onClick={() => setDeletePopupVisible(false)} style={{padding:'10px', marginLeft:'10px',fontSize:"15px",background:'red',color:'white',border:'none',cursor:'pointer'}}>Cancle</button>
                    </div>
                </div>
            )}
            {/* Edit Popup */}
            {isEditPopupVisible && (
                <div className="popup-overlay" onClick={() => setEditPopupVisible(false)}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setEditPopupVisible(false)}>X</button>
                        <h3>Edit Employee</h3>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editEmployee.name || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={editEmployee.email || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Phone No:
                                <input
                                    type="text"
                                    name="phone"
                                    value={editEmployee.phone || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Designation:
                                <input
                                    type="text"
                                    name="designation"
                                    value={editEmployee.designation || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Gender:
                                <input
                                    type="text"
                                    name="gender"
                                    value={editEmployee.gender || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Course:
                                <input
                                    type="text"
                                    name="course"
                                    value={editEmployee.course || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button type="submit" className="submit-btn">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployeeList;
