import React from 'react';
import './ActiveEmployees.css';

const employees = [
  { id: 1, name: 'Mpilo Mnaka', position: 'Manager', imageUrl: 'https://img.freepik.com/free-photo/black-man-happy-expression_155003-10043.jpg?t=st=1721423659~exp=1721427259~hmac=529dde7c3e1da8e51c3cf608ea8a9b02fe7748adc012d07e3cd28017918ce24e&w=360', refNumber: 'EMP001' },
  { id: 2, name: 'Jane Smith', position: 'Sales Representative', imageUrl: 'https://img.freepik.com/free-photo/confident-african-businesswoman-smiling-closeup-portrait-jobs-career-campaign_53876-129412.jpg?t=st=1721469104~exp=1721472704~hmac=1e91cf0c317b712211de3472bdc9631675fe836bbb9c3b39db04316827f1f9be&w=826', refNumber: 'EMP002' },
  { id: 3, name: 'Amelia Johnson', position: 'Technician', imageUrl: 'https://as1.ftcdn.net/v2/jpg/02/99/03/56/1000_F_299035676_iRQZfxrwzPFdRVRhCGAwyByXBlgNktpI.jpg', refNumber: 'EMP003' },
  { id: 4, name: 'Tomas Dali', position: 'Cashier', imageUrl: 'https://img.freepik.com/free-photo/happy-young-african-american-man-smiling-cheerfully-showing-his-perfect-straight-white-teeth-posing-isolated_273609-431.jpg?t=st=1721469704~exp=1721473304~hmac=343928711927a3ce0222d98511d48b60b3f2ba51f83dd93df9dfa5a322be8101&w=826', refNumber: 'EMP004' },
  { id: 5, name: 'Michael Brown', position: 'Electrician', imageUrl: 'https://img.freepik.com/free-photo/close-up-shot-handsome-african-student-with-beard-dressed-denim-shirt-smiling-happily-showing-his-white-teeth-having-joyful-contented-look_273609-1853.jpg?t=st=1721469803~exp=1721473403~hmac=4bdcd63b8e02e13e4e2b155fb9f5414ad0cbcda1bc547e798239bdfa1a60f9d5&w=826', refNumber: 'EMP005' },
  { id: 6, name: 'Linda Witsona', position: 'Customer Service', imageUrl: 'https://img.freepik.com/free-photo/smiling-african-american-man-looking_74855-5149.jpg?t=st=1721470078~exp=1721473678~hmac=dae0b367238a43a3022a9252999200561548e3b52f5bd8bf517de8a2c84c2a40&w=360', refNumber: 'EMP006' },
  { id: 7, name: 'David Leetso', position: 'Stock Manager', imageUrl: 'https://img.freepik.com/free-photo/portrait-person-daily-life-new-york-city_23-2150820008.jpg?t=st=1721472166~exp=1721475766~hmac=7ce7d064c214a9f6e973d8706389c9304aee53119403f34a09d8ab1255ab6b28&w=360', refNumber: 'EMP007' },
  { id: 8, name: 'Andrew Majola', position: 'Accountant', imageUrl: 'https://img.freepik.com/free-photo/close-up-smiley-man-with-glasses_23-2149009406.jpg?t=st=1721468609~exp=1721472209~hmac=0bfa066a7f85a349ffe793e22f631e401428e5c13b96860084514cdcb74737a0&w=826', refNumber: 'EMP008' },
  { id: 9, name: 'James Mohammad', position: 'Security', imageUrl: 'https://img.freepik.com/free-photo/happy-african-american-young-man-colorful-shirt-wearing-glasses-looking-camera-smiling-cheerfully_141793-108881.jpg?t=st=1721472783~exp=1721476383~hmac=7eba14da01a978b63c4d225527c06472452219e274e9545e99c8ec147473012c&w=826', refNumber: 'EMP009' },
  { id: 10, name: 'Patricia Nukeri', position: 'Cleaner', imageUrl: 'https://img.freepik.com/free-photo/young-african-american-woman-isolated-yellow-studio-background-facial-expression-beautiful-female-half-length-portrait-concept-human-emotions-facial-expression-standing-crossing-hands_155003-25191.jpg?t=st=1721472348~exp=1721475948~hmac=5b2a80f9423b51c51458bdd5d6980f13f2c75ab40c5a3675bfecad2bc3260e55&w=826', refNumber: 'EMP010' },
];

function ActiveEmployees({ navigate }) {
  return (
    <div className="active-employees">
      <header>
        <button onClick={() => navigate('add-employee')}>Add</button>
        <button onClick={() => navigate('edit-profile')}>Edit</button>
        <button onClick={() => alert('Delete functionality')}>Delete</button>
        <button onClick={() => navigate('personnel')}>Personnel</button>
      </header>
      <h2>Active Employees</h2>
      <div className="employee-list">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <img src={employee.imageUrl} alt={`${employee.name}`} />
            <h3>{employee.name}</h3>
            <p>{employee.position}</p>
            <p>Ref Number: {employee.refNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveEmployees;
