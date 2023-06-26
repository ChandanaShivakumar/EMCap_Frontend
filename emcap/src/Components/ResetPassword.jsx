import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import "../css/Register.css"
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


const ResetPassword = () => {

const {token, uid} = useParams();


console.log(token)
console.log(uid);

const [password, passwordchange] = useState("");
const [password2, password2change] = useState("");

const navigate = useNavigate();

const IsValidate = () => {
  let isproceed = true;
  let errormessage = 'Please enter the value in ';
  
  if (password === null || password === '') {
    isproceed = false;
    errormessage += ' New password';
  }
  if (password2 === null || password2 === '') {
    isproceed = false;
    errormessage += ' Confirm password';
  }
 
  if (!isproceed) 
  {
    toast.error(errormessage)
  } 
  else {
   
     if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){

     } else{
       isproceed = false;
       toast('Password should have - Minimum 8 characters (at least 1 letter, 1 number and 1 special character)')
     }

     if(password === password2){

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
  let regobj = { password,password2};
  if (IsValidate()) {
    fetch(`https://emcapg.azurewebsites.net/api/users/reset-password/${uid}/${token}/`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regobj)
      }).then((res) => {
        toast.success('Password changed successfully')
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
      <br/>
      <div className="offset-lg-4 col-lg-5">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card" style={{width:"400px"}}>
            <div className="card-header">
              <h2>Reset password</h2>
            </div>
            <div className="card-body">
            <ToastContainer />
                <div className="col-lg-10">
                  <div className="form-group">
                    <label>New Password <span className="errmsg">*</span></label>
                    <input type="password" value={password} onChange={e => passwordchange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="form-group">
                    <label>Confirm Password <span className="errmsg">*</span></label>
                    <input type="password" value={password2} onChange={e => password2change(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-success">Reset</button>&nbsp;
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
