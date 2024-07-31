import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, TextField, Avatar, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

// Styled components with responsive design considerations
const ProfileContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  margin: '0 auto',
  '@media (max-width: 600px)': {
    padding: '16px',
    maxWidth: '100%',
  },
  '@media (max-width: 400px)': {
    padding: '12px',
  },
});

const ProfileImageContainer = styled('div')({
  position: 'relative',
  marginBottom: '24px',
});

const ProfileImage = styled(Avatar)({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '5px solid #1976d2',
  '@media (max-width: 600px)': {
    width: '100px',
    height: '100px',
  },
  '@media (max-width: 400px)': {
    width: '80px',
    height: '80px',
  },
});

const ProfileImageInput = styled('input')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

const SaveButton = styled(Button)({
  marginTop: '16px',
  width: '100%',
});

const BackButton = styled(Button)({
  alignSelf: 'flex-start',
  marginBottom: '16px',
});

const Loader = styled('div')({
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'center',
  '& > div': {
    width: '10px',
    height: '10px',
    margin: '0 2px',
    borderRadius: '50%',
    backgroundColor: 'green',
    animation: 'loader-animation 0.6s infinite alternate',
  },
  '@keyframes loader-animation': {
    '0%': { opacity: 0.2 },
    '100%': { opacity: 1 },
  },
  '& > div:nth-of-type(2)': {
    animationDelay: '0.2s',
  },
  '& > div:nth-of-type(3)': {
    animationDelay: '0.4s',
  },
});

function Profile() {
  const navigate = useNavigate();
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
    profileImage: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // Fetch user data from the server
      axios.get('http://localhost:3000/users/1')
        .then(response => setUserData(response.data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    axios.put(`http://localhost:3000/users/${userData.id}`, userData)
      .then(() => {
        setLoading(false);
        alert('Profile updated successfully!');
      })
      .catch(error => {
        setLoading(false);
        console.error('Error saving profile data:', error);
      });
  };

  const handleBackClick = () => {
    navigate('/todo-list');
  };

  return (
    <ProfileContainer>
      <BackButton onClick={handleBackClick} variant="contained" color="secondary">
        Back
      </BackButton>
      <ProfileImageContainer>
        <ProfileImage
          src={userData.profileImage || 'default-profile.png'}
          alt="Profile"
        />
        <ProfileImageInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ProfileImageContainer>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Surname"
              name="surname"
              value={userData.surname}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={userData.dob}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Country"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Occupation"
              name="occupation"
              value={userData.occupation}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Interests"
              name="interests"
              value={userData.interests}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <SaveButton onClick={handleSave} variant="contained" color="primary">
        {loading ? (
          <Loader>
            <div></div>
            <div></div>
            <div></div>
          </Loader>
        ) : (
          'Save'
        )}
      </SaveButton>
    </ProfileContainer>
  );
}

export default Profile;



