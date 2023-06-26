import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Header from './Header';

const ProfileForm = ({ onSubmit }) => {
  const [employee, setEmployee] = useState(localStorage.getItem("id"));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [designation, setDesignation] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('employee', employee);
    formData.append('phone_number', phoneNumber);
    formData.append('location', location);
    formData.append('designation', designation);
    formData.append('image', image);

    try {
      const response = await fetch(`https://emcapg.azurewebsites.net/api/profiles/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Profile created successfully!');
        window.location.href = '/employee';
      } else {
        console.error('Error creating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }


  };

  return (
    <div>
    <Header/>
    <div className="container1" style={{ backgroundColor: '#e6f5ff' }}>
        {/* background image */}
        
        <center><img src={require('../images/img1.png')} alt="cg logo" style={{ width: 300, height: 70 }}></img></center>
        <div style={{ backgroundImage: `url(${require('../images/img6.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <br /><br /><br />
          <br />
          <center>
          <h2>Create Profile</h2>
          </center>
          <br />
          <br /><br /><br />
          </div>
          < br />
        <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
          <Form.Group>
            <Form.Label>Employee:</Form.Label>
            <Form.Control
              type="text"
              value={employee}
              onChange={(event) => setEmployee(event.target.value)}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone number:</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Office Location:</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Designation:</Form.Label>
            <Form.Control
              type="text"
              value={designation}
              onChange={(event) => setDesignation(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Form.Group>
          <br />
          <Button type="submit" variant="primary" >Submit</Button>
        </Form>
      </div>
      </div>
    </div>
  );
};

export default ProfileForm;
