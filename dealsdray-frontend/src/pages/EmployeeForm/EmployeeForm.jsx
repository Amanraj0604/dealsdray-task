import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Register/Vendor.css";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    courses: [],
    otherCourse: "",
    image: null,
  });
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Retrieve user ID and token from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser._id); // Assuming `_id` is the field containing the user ID
    }

    if (storedToken) {
      setToken(storedToken); // Assuming the token is stored as a plain string
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        courses: checked
          ? [...prevState.courses, value]
          : prevState.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userId || !token) {
    setResponseMessage("Error: Missing user ID or token.");
    return;
  }

  setUploading(true);

  try {
    let uploadedImageUrl = "";
    if (formData.image) {
      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", "upload");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dfdmhagar/image/upload",
        imageData
      );
      uploadedImageUrl = uploadResponse.data.secure_url;
    }

    // Prepare data for API
    const postData = {
      name: formData.name,
      email: formData.email,
      phone: formData.mobileNo,
      designation: formData.designation,
      gender: formData.gender,
      course: formData.courses.includes("Other")
        ? formData.otherCourse
        : formData.courses.join(", "),
      img: uploadedImageUrl,
    };

    console.log("Sending data:", postData);

    // Post data to API
    const apiResponse = await axios.post(
      `http://localhost:3000/api/dealsdray/addemployee/${userId}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setResponseMessage(`Success: ${apiResponse.data.message}`);
  } catch (error) {
    console.error("Error submitting form:", error.response?.data || error);
    setResponseMessage(
      `Error: Unable to add employee. ${error.response?.data?.message || ""}`
    );
  } finally {
    setUploading(false);
  }
};
  return (
    <div className="register-container">
      <div className="image-container">
        <img
          src="https://visiblegain.in/influencer/rb_18823.png"
          alt="Employee Form"
        />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Employee Form</h2>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No:</label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Designation */}
          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Project Manager">Project Manager</option>
              <option value="QA Tester">QA Tester</option>
            </select>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === "Male"}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === "Female"}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
                checked={formData.gender === "Other"}
                required
              />
              Other
            </label>
          </div>

          {/* Courses */}
          <div className="form-group">
            <label>Courses:</label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="MCA"
                onChange={handleChange}
                checked={formData.courses.includes("MCA")}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="BCA"
                onChange={handleChange}
                checked={formData.courses.includes("BCA")}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="BTech"
                onChange={handleChange}
                checked={formData.courses.includes("BTech")}
              />
              BTech
            </label>
            <label>
              <input
                type="checkbox"
                name="courses"
                value="Other"
                onChange={handleChange}
                checked={formData.courses.includes("Other")}
              />
              Other
            </label>
            {formData.courses.includes("Other") && (
              <input
                type="text"
                name="otherCourse"
                value={formData.otherCourse}
                onChange={handleChange}
                placeholder="Specify Other Course"
                required
              />
            )}
          </div>

          {/* Profile Image */}
          <div className="form-group">
            <label htmlFor="image">Profile Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>

          <button className="but-sec" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </form>

        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default EmployeeForm;
