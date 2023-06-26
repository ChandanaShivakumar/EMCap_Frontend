import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import "../css/Register.css"
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


const ChangePassword = () => {

  const password = localStorage.getItem('password');
  const token = localStorage.getItem('token')
const [old_password, oldpasswordchange] = useState("");
const [new_password, newpasswordchange] = useState("");
const [confirm_password, confirmpasswordchange] = useState("");

const navigate = useNavigate();

const IsValidate = () => {
  let isproceed = true;
  let errormessage = 'Please enter the value in ';
  
  if (old_password === null || old_password === '') {
    isproceed = false;
    errormessage += ' Old password';
  }
  if (new_password === null || new_password === '') {
    isproceed = false;
    errormessage += ' New password';
  }
  if (confirm_password === null || confirm_password === '') {
    isproceed = false;
    errormessage += ' Confirm password';
  }


  if (!isproceed) 
  {
    toast.error(errormessage)
  } 
  else {
   
     if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(new_password)){

     } else{
       isproceed = false;
       toast('Password should have - Minimum 8 characters (at least 1 letter, 1 number and 1 special character)')
     }

     if(new_password === confirm_password){

     }
     else{
      isproceed = false;
     toast('Password does not match');
     }
     
     if(old_password === password){

     }
     else{
      isproceed = false;
     toast('Old Password incorrect');
     }
  }
  return isproceed;
}


const handlesubmit = (e) => {
  e.preventDefault();
  let regobj = { old_password, new_password, confirm_password};
  if (IsValidate()) {
    //console.log(regobj);
    
    fetch("https://emcapg.azurewebsites.net/api/users/change-password/", {
        method: "POST",
        headers: { 'content-type': 'application/json' , 
        Authorization: `Bearer ${token}`},
        body: JSON.stringify(regobj)
      }).then((res) => {
        toast.success('Password change successful')
        setTimeout(() => {
          navigate(-1);
     }, 2000);
       
      }).catch((err) => {
        toast('Failed :' + err.message);
      });
  }
}

  return (
    <div className="background1">
      <Header/>
      <br/>
      <div className="offset-lg-4 col-lg-5">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card" style={{width:"400px"}}>
            <div className="card-header">
              <h2>Change password</h2>
            </div>
            <div className="card-body">
            <ToastContainer />
                <div className="col-lg-10">
                  <div className="form-group">
                    <label>Old Password <span className="errmsg">*</span></label>
                    <input type="password" value={old_password} onChange={e => oldpasswordchange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="form-group">
                    <label>New Password <span className="errmsg">*</span></label>
                    <input type="password" value={new_password} onChange={e => newpasswordchange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="form-group">
                    <label>Confirm Password <span className="errmsg">*</span></label>
                    <input type="password" value={confirm_password} onChange={e => confirmpasswordchange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
              </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-success">Confirm</button>&nbsp;
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
