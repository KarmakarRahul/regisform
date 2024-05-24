import React, { useState } from "react";
import "./regis.css";
import axios from 'axios';

const Regis = () =>  {
  //state for recording registration detail
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register',formData)
    .then(result => console.log(result))
    .catch(err => console.log(err))
    // Add logic to handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <div className="form-container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Register Now!</h2>
          <div className="content">
            <div className="input-box">
              <label htmlFor="firstName">
                First Name <span className="symbol">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="lastName">
                Last Name <span className="symbol">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="email">
                Email <span className="symbol">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="phoneNumber">
                Phone Number <span className="symbol">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="checkInDate">
                Check-in Date <span className="symbol">*</span>
              </label>
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="checkOutDate">
                Check-out Date <span className="symbol">*</span>
              </label>
              <input
                type="date"
                id="checkOutDate"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="button-container">
              <button type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Regis;
