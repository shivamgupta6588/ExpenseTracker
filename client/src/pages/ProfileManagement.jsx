import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileManagement = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      await axios.post(`/api/users/update-user/${currentUser._id}`, formData);
      console.log('User updated successfully');
      dispatch(updateUserSuccess(formData));
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      dispatch(updateUserFailure(error));
      toast.error('Error updating user');
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile Management</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue ={currentUser.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue ={currentUser.email}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password:</label>
          <div className="relative flex">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-1"
              onClick={handlePasswordToggle}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;
