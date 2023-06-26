import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import "../css/Register.css"
import Header from "./Header";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make the HTTP POST request to the backend
    fetch("https://emcapg.azurewebsites.net/api/users/forgot-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),

    }).then((response) => {
      if (response.ok) {
        toast.success("Password reset link sent successfully!");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error("Failed to send password reset link.");
      }
    })
      .catch((error) => {
        console.error("Error occurred while sending password reset link:", error);
        toast.error("An error occurred while sending password reset link.");
      });
  };

  return (
    <div className="background1">
      <Header />
      <br />
      <div className="offset-lg-4 col-lg-5">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card" style={{ width: "400px" }}>
            <div className="card-header">
              <h2>Get password reset link!</h2>
            </div>
            <div className="card-body">
              <ToastContainer />
              <div className="col-lg-10">
                <div className="form-group">
                  <label>Email<span className="errmsg">*</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                </div>
              </div>
              <br />
              <div className="card-footer">
                <button type="submit" className="btn btn-success">Send</button>&nbsp;
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}




export default ForgotPassword