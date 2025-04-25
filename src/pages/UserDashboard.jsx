import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Import the CSS file

const UserDashboard = () => {
  const [profile, setProfile] = useState({ phone: '', name: '', dob: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/user/profile`, profile, {
        withCredentials: true,
      });
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed');
    }
  };

  return loading ? (
    <p className="center-text">Loading...</p>
  ) : (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>
      <form onSubmit={handleUpdate} className="form">
        <input
          className="input"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="input"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          className="input"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <button className="btn">Update</button>
      </form>
    </div>
  );
};

export default UserDashboard;
