import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Add this line

const AdminDashboard = () => {
  const [profile, setProfile] = useState({ empType: '', empId: '', dept: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/admin/profile`, { withCredentials: true });
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
      await axios.post('/auth/admin/profile', profile, { withCredentials: true });
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed');
    }
  };

  return loading ? <p className="center-text">Loading...</p> : (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <form onSubmit={handleUpdate} className="form">
        <input className="input" name="empType" value={profile.empType} onChange={handleChange} placeholder="Employee Type" />
        <input className="input" name="empId" value={profile.empId} onChange={handleChange} placeholder="Employee ID" />
        <input className="input" name="dept" value={profile.dept} onChange={handleChange} placeholder="Department" />
        <input className="input" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
        <input className="input" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
        <button className="btn">Update</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
