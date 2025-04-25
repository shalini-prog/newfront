import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FarmerDashboard.css'; // Import the CSS

const FarmerDashboard = () => {
  const [profile, setProfile] = useState({ name: '', zone: '', area: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/farmer/profile`, {
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
      await axios.post('/auth/farmer/profile', profile, { withCredentials: true });
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed');
    }
  };

  return loading ? (
    <p className="center-text">Loading...</p>
  ) : (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Farmer Dashboard</h2>
      <form onSubmit={handleUpdate} className="form">
        <input className="input" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
        <input className="input" name="zone" value={profile.zone} onChange={handleChange} placeholder="Zone" />
        <input className="input" name="area" value={profile.area} onChange={handleChange} placeholder="Area" />
        <button className="btn">Update</button>
      </form>
    </div>
  );
};

export default FarmerDashboard;
