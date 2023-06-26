import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './Login.css'
import { ToastContainer, toast } from "react-toastify";
import Header from '../Header';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [backenderror, setBackenderror]=useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   if (validate()) {
    try {
      const res = await axios.post(
        'https://emcapg.azurewebsites.net/api/users/login/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      console.log('Response:', res);
      const { token, user} = res.data;

      localStorage.setItem('password', formData.password);
      localStorage.setItem('token', token.access);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('id', user.id);
      localStorage.setItem('role_id', user.role_id)
      
      const roleId = user.role_id;
      if (roleId === 2) {
        
        const managerRes = await axios.get(`https://emcapg.azurewebsites.net/api/manager/user/${user.id}`);
        console.log('Manager Response:', managerRes);
         window.location.href = '/manager';
          console.log(managerRes.data)
          
          localStorage.setItem('manager', JSON.stringify(managerRes.data));
        

      } else if (roleId === 3) {
        const profile = await fetch(`https://emcapg.azurewebsites.net/api/empprofiles/${user.id}/`);
        if (!profile.ok) {
          window.location.href = '/profileform'; 
        } 
        
        else if(profile.ok) {
          try {
            const employee = await axios.get(`https://emcapg.azurewebsites.net/api/employee/${user.id}`);
            localStorage.setItem('employee', JSON.stringify(employee.data));
            window.location.href = '/employee';
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        alert('Unknown role ID!');
      }
    } catch (err) {
      console.error('Error:', err);
      console.error('Error Response:', err.response);
      setBackenderror(err.response.data.error);
      // alert(err.response.data.error);
    }
   }
  };

  const validate = () => {
    let result = true;
        if (formData.email === '' || formData.emailemail === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        else if (formData.password === '' || formData.password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

  return (
    
      
    <div className="row1">
    <Header/>
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '10px' }}>
            <div className=''><h2 style={{color: 'red'}}>{backenderror}</h2></div>
                <form onSubmit={handleSubmit} className="container1">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <ToastContainer />
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor='email'>Email: <span className="errmsg">*</span></label>
                                    <input
                                      type='email'
                                      id='email'
                                      name='email'
                                      value={formData.email}
                                      onChange={handleChange}
                                      className="form-control"
                                    />
                                    {formErrors.email && <p>{formErrors.email}</p>}
                            </div>
                            <div className="form-group">
                            <label htmlFor='password'>Password: <span className="errmsg">*</span></label>
                                    <input
                                      type='password'
                                      id='password'
                                      name='password'
                                      value={formData.password}
                                      onChange={handleChange}
                                      className="form-control"
                                    />
                                    {formErrors.password && <p>{formErrors.password}</p>}
                                    <Link to={'/forgotpassword'} style={{float:'right'}}>Forgot Password?</Link>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>&nbsp;
                            <Link className="btn btn-success" to={'/register'}>New User</Link>                        </div>
                    </div>
                </form>
                
                
            </div>
        </div>
        
  );
};

export default Login;

