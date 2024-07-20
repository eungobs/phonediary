// src/EditProfile.js
import React from 'react';
import './EditProfile.css';

function EditProfile({ navigate }) {
  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form>
        <input type="text" placeholder="Full names" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Mobile number" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Gender" />
        <input type="text" placeholder="Next of kin" />
        <input type="text" placeholder="Marital status" />
        <button type="submit">Save</button>
      </form>
      <button onClick={() => navigate('active-employees')}>Back</button>
    </div>
  );
}

export default EditProfile;
