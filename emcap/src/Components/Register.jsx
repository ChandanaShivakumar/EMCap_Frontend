import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import "../css/Register.css"
import Header from "./Header";
const Register = () => {
  const [email, emailchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [password2, password2change] = useState("");
  const [emp_id, employeechange] = useState("");
  const [role_id, rolechange] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';
    
    if (name === null || name === '') {
      isproceed = false;
      errormessage += ' Fullname';
    }
    if (role_id === null || role_id === '') {
      isproceed = false;
      errormessage += ' role_id';
    }
    if (emp_id === null || emp_id === '') {
      isproceed = false;
      errormessage += ' Employee ID';
    }
    if (password === null || password === '') {
      isproceed = false;
      errormessage += ' Password';
    }
    if (password2 === null || password2 === '') {
      isproceed = false;
      errormessage += ' Password2';
    }
    if (email === null || email === '') {
      isproceed = false;
      errormessage += ' Email';
    }


    if (!isproceed) 
    {
      toast.error(errormessage)
    } 
    else {
      if (/^[a-zA-Z0-9--.]+@capgemini.com$/.test(email)) {

      } else {
        isproceed = false;
        toast('Please enter the valid email')
      }
       if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){

       } else{
         isproceed = false;
         toast('Password should have - Minimum 8 characters (at least 1 letter, 1 number and 1 special character)')
       }

       if(password2 === password){


       }
       else{
        isproceed = false;
       
       toast('Password does not match');
       
       
       }
       
    }
    return isproceed;
  }


  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { email, name, password, password2, role_id , emp_id};
    if (IsValidate()) {
      //console.log(regobj);
      fetch("https://emcapg.azurewebsites.net/api/users/register/", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regobj)
      }).then((res) => {
        toast.success('Registration successful')
        setTimeout(() => {
          navigate('/login');
     }, 2000);
       
      }).catch((err) => {
        toast('Failed :' + err.message);
      });
    }
  }
  return (
    <div className="background1">
      <Header/>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
            <ToastContainer />
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email <span className="errmsg">*</span></label>
                    <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name <span className="errmsg">*</span></label>
                    <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password <span className="errmsg">*</span></label>
                    <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
                  </div>
                </div>
                
                
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Confirm Passowrd <span className="errmsg"></span></label>
                    <input value={password2} onChange={e => password2change(e.target.value)} type="password" className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Employee Id <span className="errmsg">*</span></label>
                    <input value={emp_id} onChange={e => employeechange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                      <label htmlFor='role_id'>Role:</label>
                      <select id='role_id' name='role_id' onChange={e => rolechange(e.target.value)}  className="form-control">
                      <option value='' selected></option>
                        <option value='2'>Manager</option>
                        <option value='3'>Fresher</option>
                      </select>
                  </div>
                </div>

              </div>
              

            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Register</button>&nbsp;
              <Link to={'/login'} className="btn btn-danger">Close</Link>
            </div>
          </div>
        </form>
      </div>


    </div>
  );
}

export default Register;