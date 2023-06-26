import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Header from '../Header';

const ManagerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
  
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const inputValue = type === 'file' ? files[0] : value;
    setFormData((prevState) => ({ ...prevState, [name]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id: user_id } = user;
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      
      formDataToSend.append('image', formData.image);
      formDataToSend.append('user', user_id);
      const res = await axios.post(
        'https://emcapg.azurewebsites.net/api/managers/',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Response:', res);
      if(res.status === 201){
        window.location.href = "/login/";
      }
    } catch (err) {
      console.error('Error:', err);
      console.error('Error Response:', err.response);
      setFormErrors(err.response.data);
    }
  };

  return (
    <div>
    <Header/>
    <div className="container1" style={{ backgroundColor: '#e6f5ff' }}>
        {/* background image */}
        
        <center><img src={require('./img1.png')} alt="cg logo" style={{ width: 300, height: 70 }}></img></center>
        <div style={{ backgroundImage: `url(${require('./img6.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
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
            <Form.Label>Manager Name:</Form.Label>
            <Form.Control
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label>Manager Name:</Form.Label>
            <Form.Control
              type='file'
              id='image'
              name='image'
              accept='image/*'
              onChange={handleChange}
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

export default ManagerForm;


