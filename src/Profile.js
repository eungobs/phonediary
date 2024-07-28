import React, { useState, useEffect } from 'react';
import { getProfileData, upsertProfileData, initDatabase } from './database';
import './styles.css';

function Profile({ navigate }) {
  const [userData, setUserData] = useState({
    id: 1,
    name: '',
    surname: '',
    gender: '',
    dob: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    interests: '',
    profileImage: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = await initDatabase();
        const data = await getProfileData(db);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const updatedData = { ...userData, profileImage: reader.result };
        setUserData(updatedData);
        try {
          const db = await initDatabase();
          await upsertProfileData(db, updatedData);
        } catch (error) {
          console.error('Error updating profile data:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const db = await initDatabase();
      await upsertProfileData(db, userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleBackClick = () => {
    navigate('todo-list');
  };

  return (
    <div className="profile-container">
      <button onClick={handleBackClick} className="back-button">Back</button>
      <div className="profile-image-container">
        <img
          src={userData.profileImage || 'default-profile.png'}
          alt="Profile"
          className="profile-image"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="profile-image-input"
        />
      </div>
      <div className="profile-fields">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
        />
        <label>Surname</label>
        <input
          type="text"
          name="surname"
          value={userData.surname}
          onChange={handleInputChange}
        />
        <label>Gender</label>
        <input
          type="text"
          name="gender"
          value={userData.gender}
          onChange={handleInputChange}
        />
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={userData.dob}
          onChange={handleInputChange}
        />
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleInputChange}
        />
        <label>Occupation</label>
        <input
          type="text"
          name="occupation"
          value={userData.occupation}
          onChange={handleInputChange}
        />
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <label>Interests</label>
        <input
          type="text"
          name="interests"
          value={userData.interests}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSave} className="save-button">Save</button>
    </div>
  );
}

export default Profile;

