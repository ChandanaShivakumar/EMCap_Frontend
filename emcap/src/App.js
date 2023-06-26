import './App.css';
import React, { useState } from "react";
import Employee from './Components/Employee';
import Manager from './Components/Manager';
import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import { useEffect } from "react";
import Home from './Components/HomePage/Home';
import Admin from './Components/Admin';
import Login from './Components/LoginPage/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import ProfileForm from './Components/ProfileForm'
import Uploadmanagerdata from './Components/UploadManager/Uploadmanagerdata'
import UploadExcelPage from './Components/UploadExcel';
import EmployeeProfileforManagerView from './Components/EmployeeProfileforManagerView '
import UpdateExcel from './Components/UpdateExcel';
import ChangePassword from './Components/ChangePassword';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Unauthorized from './Components/Unauthorized';
import MovedFreshers from './Components/MovedFreshers';
import NotFoundPage from './Components/NotFoundPage'




function App() {
  const [routes, setRoutes] = useState([]);
  const loggedIn = localStorage.getItem('token');
  const roleId = localStorage.getItem('role_id');

  useEffect(() => {


    if (loggedIn != null) {
      if (roleId === '2') {
        setRoutes([
          { element: <Home />, path: "/" },
          { element: <Home />, path: "/register" },
          { element: <Home />, path: "/login" },
          { element: <Unauthorized />, path: "/employee" },
          { element: <Manager />, path: "/manager" },
          { element: <Admin />, path: "/admin" },
          { element: <Dashboard />, path: "/dashboard" },
          { element: <Unauthorized />, path: "/profileform" },
          { element: <Uploadmanagerdata />, path: "/managerform" },
          { element: <UploadExcelPage />, path: "/uploadexcel" },
          { element: <UpdateExcel />, path: "/updateexcel" },
          { element: <EmployeeProfileforManagerView />, path: "/empdetails" },
          { element: <ChangePassword />, path: "/changepassword" },
          { element: <ResetPassword />, path: "/reset/:uid/:token" },
          { element: <ForgotPassword />, path: "/forgotpassword" },
          { element: <MovedFreshers />, path: "/movedfreshers" },
          { element: <NotFoundPage />, path: "/*"}
        ]);
      }
      if (roleId === '3') {
        setRoutes([
          { element: <Home />, path: "/" },
          { element: <Home />, path: "/register" },
          { element: <Home />, path: "/login" },
          { element: <Employee />, path: "/employee" },
          { element: <Unauthorized />, path: "/manager" },
          { element: <Unauthorized />, path: "/admin" },
          { element: <Unauthorized />, path: "/dashboard" },
          { element: <ProfileForm />, path: "/profileform" },
          { element: <Unauthorized />, path: "/managerform" },
          { element: <Unauthorized />, path: "/uploadexcel" },
          { element: <Unauthorized />, path: "/updateexcel" },
          { element: <Unauthorized />, path: "/empdetails" },
          { element: <ChangePassword />, path: "/changepassword" },
          { element: <ResetPassword />, path: "/reset/:uid/:token" },
          { element: <ForgotPassword />, path: "/forgotpassword" },
          { element: <Unauthorized />, path: "/movedfreshers" },
          { element: <NotFoundPage />, path: "/*"}
        ]);
      }

    } else {
      setRoutes([
        { element: <Login />, path: "/login" },
        { element: <Register />, path: "/register" },
        { element: <Home />, path: "/" },
        { element: <Navigate to="/login" />, path: "/employee" },
        { element: <Navigate to="/login" />, path: "/manager" },
        { element: <Navigate to="/login" />, path: "/admin" },
        { element: <Navigate to="/login" />, path: "/dashboard" },
        { element: <Navigate to="/login" />, path: "/profileform" },
        { element: <Navigate to="/login" />, path: "/managerform" },
        { element: <Navigate to="/login" />, path: "/uploadexcel" },
        { element: <Navigate to="/login" />, path: "/empdetails" },
        { element: <Navigate to="/login" />, path: "/editprofile" },
        { element: <ChangePassword />, path: "/changepassword" },
        { element: <ResetPassword />, path: "/reset/:uid/:token" },
        { element: <ForgotPassword />, path: "/forgotpassword" },
        { element: <NotFoundPage />, path: "/*"}
      ]);
    }
  }, [loggedIn]);
  return (
    <>
      <Router>

        <Routes>
          {/* <Route exact path="/" Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/employee" Component={Employee} />
          <Route path="/manager" Component={Manager} />
          <Route path="/admin" Component={Admin} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/profileform" Component={ProfileForm} />
          <Route path="/managerform" Component={Uploadmanagerdata} />
          <Route path="/uploadexcel" Component={UploadExcelPage} />
          <Route path="/empdetails" Component={EmployeeProfileforManagerView } />
          <Route path="/editprofile" Component={Profile } /> */}
          {routes.map((route) => (
            <Route
              key={route.path.replace("/", "")}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;


