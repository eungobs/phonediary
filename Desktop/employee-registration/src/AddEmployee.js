import React from 'react';
import './AddEmployee.css';

function AddEmployee({ navigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your save employee logic here
    alert('Employee added successfully');
    navigate('active-employees');
  };

  return (
    <div className="add-employee">
      <h2>Add a New Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full name" required />
        <input type="text" placeholder="Position" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Mobile number" required />
        <input type="text" placeholder="Address" required />
        <input type="text" placeholder="Gender" required />
        <input type="text" placeholder="ID (SAP Number)" required />
        <input type="text" placeholder="Employee number" required />
        <input type="date" placeholder="Start date" required />
        <input type="text" placeholder="Marital status" required />
        <input type="text" placeholder="Next of kin" required />
        <input type="text" placeholder="Next of kin contact" required />
        <button type="submit">Save</button>
      </form>
      <button onClick={() => navigate('active-employees')}>Back</button>
    </div>
  );
}

export default AddEmployee;
