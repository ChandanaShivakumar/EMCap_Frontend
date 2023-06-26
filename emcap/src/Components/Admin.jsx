import React from 'react'
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
// import { FaSearch } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import "../css/Admin.css"

//Displaying the manager data
const Admin = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getManagers();
    }, [])

    const [userdata, setUserData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])

    const [userproject, setUserProject] = useState([])
    useEffect(() => {
        getUserProject();
    }, [])

    const [usertraining, setUserTraining] = useState([])
    useEffect(() => {
        getUserTraining();
    }, [])

    const [userpoc, setUserPoc] = useState([])
    useEffect(() => {
        getUserPoc();
    }, [])

    //Initializing the empid
    const [empid, setEmpid] = useState("");
    const [id, setUserId] = useState(null);
    //Initializing for Manager
    const [designation, setDesignation] = useState("");
    const [photo, setPhoto] = useState("");
    //Initializing for Employee
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [primaryskill, setPrimarySkill] = useState("");
    const [doj, setDoj] = useState("");
    const [localgrade, setLocalGrade] = useState("");

    //Initializing for Project
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [name, setName] = useState("");
    const [manager_name, setManagerName] = useState("");

    //Initializing for Training
    const [trainer_name, setTrainerName] = useState("");

    //Initializing for poc
    const [guide_name, setGuideName] = useState("");

    //Fetching the Employee data
    function getUsers() {
        fetch("https://emcapg.azurewebsites.net/api/employees/").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserData(resp)
                //setName(resp[0].name)
                // setEmpid(resp[0].empid)
                // setUserId(resp[0].userId)
                // setPhoto(resp[0].photo)
            })
        })
    }

    //Fetching the manager data
    function getManagers() {
        fetch("https://emcapg.azurewebsites.net/manager").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setData(resp)
            })
        })
    }

    //Fetching the user projects
    function getUserProject() {
        fetch("https://emcapg.azurewebsites.net/project").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserProject(resp)
            })
        })
    }

    //Fetching the user trainings
    function getUserTraining() {
        fetch("https://emcapg.azurewebsites.net/training").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserTraining(resp)
            })
        })
    }

    //Fetching the user pocs
    function getUserPoc() {
        fetch("https://emcapg.azurewebsites.net/poc").then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserPoc(resp)
            })
        })
    }


    //myFunctions for service button toggles
    const myFunction1 = () => {
        document.getElementById("myTable1").classList.toggle("hidden");
        document.getElementById("bt2").classList.toggle("disabled");
        document.getElementById("bt3").classList.toggle("disabled");
        document.getElementById("bt4").classList.toggle("disabled");
        document.getElementById("bt5").classList.toggle("disabled");
    };

    const myFunction2 = () => {
        document.getElementById("myTable2").classList.toggle("hidden");
        document.getElementById("bt1").classList.toggle("disabled");
        document.getElementById("bt3").classList.toggle("disabled");
        document.getElementById("bt4").classList.toggle("disabled");
        document.getElementById("bt5").classList.toggle("disabled");
    };

    const myFunction3 = () => {
        document.getElementById("myTable3").classList.toggle("hidden");
        document.getElementById("bt1").classList.toggle("disabled");
        document.getElementById("bt2").classList.toggle("disabled");
        document.getElementById("bt4").classList.toggle("disabled");
        document.getElementById("bt5").classList.toggle("disabled");
    };

    const myFunction4 = () => {
        document.getElementById("myTable4").classList.toggle("hidden");
        document.getElementById("bt1").classList.toggle("disabled");
        document.getElementById("bt2").classList.toggle("disabled");
        document.getElementById("bt3").classList.toggle("disabled");
        document.getElementById("bt5").classList.toggle("disabled");
    };

    const myFunction5 = () => {
        document.getElementById("myTable5").classList.toggle("hidden");
        document.getElementById("bt1").classList.toggle("disabled");
        document.getElementById("bt2").classList.toggle("disabled");
        document.getElementById("bt3").classList.toggle("disabled");
        document.getElementById("bt4").classList.toggle("disabled");
    };


    //Add Modal Popup
    const [modal, setmodal] = useState(false)
    const [modal1, setmodal1] = useState(false)
    const [modal2, setmodal2] = useState(false)
    const [modal3, setmodal3] = useState(false)
    const [modal4, setmodal4] = useState(false)

     //Edit Modal Popup
     const [editmodal, seteditmodal] = useState(false)
     const [editmodal1, seteditmodal1] = useState(false)
     const [editmodal2, seteditmodal2] = useState(false)
     const [editmodal3, seteditmodal3] = useState(false)
     const [editmodal4, seteditmodal4] = useState(false)

    //Converting image to base64 format
    const converttobase64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result.toString());
        };

        reader.readAsDataURL(file);
        console.log(reader)
    };

    //Validation for Employee
    const IsValidate4 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (empid === null || empid === '') {
            isproceed = false;
            errormessage += ' Empid';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Full Name';
        }
        if (localgrade === null || localgrade === '') {
            isproceed = false;
            errormessage += ' Local Grade';
        }
        if (designation === null || designation === '') {
            isproceed = false;
            errormessage += ' Designation';
        }
        if (doj === null || doj === '') {
            isproceed = false;
            errormessage += ' Date of Joining';
        }
        if (primaryskill === null || primaryskill === '') {
            isproceed = false;
            errormessage += ' Primary Skill';
        }
        if (location === null || location === '') {
            isproceed = false;
            errormessage += ' Location';
        }
        if (phone === null || phone === '') {
            isproceed = false;
            errormessage += ' Contact';
        }
        if (photo === null || photo === '') {
            isproceed = false;
            errormessage += ' Photo';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{2}$/.test(empid)) {

            } else {
                isproceed = false;
                toast('Please enter a valid empid')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid Full name')
            }
            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(localgrade)) {

            } else {
                isproceed = false;
                toast('Please enter a valid local grade')
            }
            if (/^[\w\-\s]+$/.test(designation)) {

            } else {
                isproceed = false;
                toast('Please enter a valid designation')
            }
            if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(primaryskill)) {

            } else {
                isproceed = false;
                toast('Please enter a valid primary skill')
            }
            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(location)) {

            } else {
                isproceed = false;
                toast('Please enter a valid location')
            }
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{4,4}$/.test(phone)) {

            } else {
                isproceed = false;
                toast('Please enter a valid contact number')
            }
        }
        return isproceed;
    }

    //Adding the Employee
    const handlesubmit4 = (e) => {
        e.preventDefault();
        let regobj = {
            name, designation, doj, empid, primaryskill, location, phone, photo, localgrade
        };
        if (IsValidate4()) {
            //console.log(regobj);

            fetch(`https://emcapg.azurewebsites.net/employee`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Added Successfully')
                res.json().then((resp) => {
                    getUsers()
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Validation for manager
    const IsValidate3 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (empid === null || empid === '') {
            isproceed = false;
            errormessage += ' Empid';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Manager Name';
        }
        if (designation === null || designation === '') {
            isproceed = false;
            errormessage += ' Designation';
        }
        if (photo === null || photo === '') {
            isproceed = false;
            errormessage += ' Photo';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{2}$/.test(empid)) {

            } else {
                isproceed = false;
                toast('Please enter a valid empid')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid manager name')
            }

            if (/^[\w\-\s]+$/.test(designation)) {

            } else {
                isproceed = false;
                toast('Please enter a valid designation')
            }

        }
        return isproceed;
    }

    //Adding the manager
    const handlesubmit3 = (e) => {
        e.preventDefault();
        let regobj = { name, empid, designation, photo };
        if (IsValidate3()) {
            //console.log(regobj);

            fetch("https://emcapg.azurewebsites.net/manager", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Added successfully')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Validation for project
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (empid === null || empid === '') {
            isproceed = false;
            errormessage += ' Empid';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Project Name';
        }
        if (manager_name === null || manager_name === '') {
            isproceed = false;
            errormessage += ' Project Manager';
        }
        if (start_date === null || start_date === '') {
            isproceed = false;
            errormessage += ' Start Date';
        }
        if (end_date === null || end_date === '') {
            isproceed = false;
            errormessage += ' End Date';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{2}$/.test(empid)) {

            } else {
                isproceed = false;
                toast('Please enter a valid empid')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid project name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(manager_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid project manager')
            }

        }
        return isproceed;
    }

    //Assigning the project
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { empid, start_date, end_date, name, manager_name };
        if (IsValidate()) {
            //console.log(regobj);

            fetch("https://emcapg.azurewebsites.net/project", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Assigning successful')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Validation for training
    const IsValidate1 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (empid === null || empid === '') {
            isproceed = false;
            errormessage += ' Empid';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Training Name';
        }
        if (trainer_name === null || trainer_name === '') {
            isproceed = false;
            errormessage += ' Trainer';
        }
        if (start_date === null || start_date === '') {
            isproceed = false;
            errormessage += ' Start Date';
        }
        if (end_date === null || end_date === '') {
            isproceed = false;
            errormessage += ' End Date';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{2}$/.test(empid)) {

            } else {
                isproceed = false;
                toast('Please enter a valid empid')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid training name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(trainer_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid trainer')
            }

        }
        return isproceed;
    }

    //Assigning the training
    const handlesubmit1 = (e) => {
        e.preventDefault();
        let regobj = { empid, start_date, end_date, name, trainer_name };
        if (IsValidate1()) {
            //console.log(regobj);

            fetch("https://emcapg.azurewebsites.net/training", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Assigning successful')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Validation for poc
    const IsValidate2 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (empid === null || empid === '') {
            isproceed = false;
            errormessage += ' Empid';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' POC Name';
        }
        if (guide_name === null || guide_name === '') {
            isproceed = false;
            errormessage += ' Guide';
        }
        if (start_date === null || start_date === '') {
            isproceed = false;
            errormessage += ' Start Date';
        }
        if (end_date === null || end_date === '') {
            isproceed = false;
            errormessage += ' End Date';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{2}$/.test(empid)) {

            } else {
                isproceed = false;
                toast('Please enter a valid empid')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid poc name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(guide_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid guide')
            }

        }
        return isproceed;
    }

    //Assigning the poc
    const handlesubmit2 = (e) => {
        e.preventDefault();
        let regobj = { empid, start_date, end_date, name, guide_name };
        if (IsValidate2()) {
            //console.log(regobj);

            fetch("https://emcapg.azurewebsites.net/poc", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Assigning successful')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Delete Employee
    function deleteEmployee(id)
    {
        fetch(`https://emcapg.azurewebsites.net/employee/${id}`, {
            method: 'DELETE',
    }).then((result) =>{
        result.json().then((resp)=>{
            alert("Employee with id "+id+" is deleted")
            getUsers();
        })
    })
    }

    //Delete Manager
    function deleteManager(id)
    {
        fetch(`https://emcapg.azurewebsites.net/manager/${id}`, {
            method: 'DELETE',
    }).then((result) =>{
        result.json().then((resp)=>{
            alert("Manager with id "+id+" is deleted")
            getManagers();
        })
    })
    }

    //Delete Project
    function deleteProject(id)
    {
        fetch(`https://emcapg.azurewebsites.net/project/${id}`, {
            method: 'DELETE',
    }).then((result) =>{
        result.json().then((resp)=>{
            alert("Project with id "+id+" is deleted")
            getUserProject();
        })
    })
    }

    //Delete Training
    function deleteTraining(id)
    {
        fetch(`https://emcapg.azurewebsites.net/training/${id}`, {
            method: 'DELETE',
    }).then((result) =>{
        result.json().then((resp)=>{
            alert("Training with id "+id+" is deleted")
            getUserTraining();
        })
    })
    }

    //Delete POC
    function deletePoc(id)
    {
        fetch(`https://emcapg.azurewebsites.net/poc/${id}`, {
            method: 'DELETE',
    }).then((result) =>{
        result.json().then((resp)=>{
            alert("POC with id "+id+" is deleted")
            getUserPoc();
        })
    })
    }

    //Populate employee
    function selectEmployee(id) {
        let item = userdata[id - 1];
        setName(item.name)
        setEmpid(item.empid);
        setUserId(item.id)
        setPhoto(item.photo);
        setDesignation(item.designation);
        setLocation(item.location);
        setPhone(item.phone);
        setPrimarySkill(item.primaryskill);
        setDoj(item.doj);
        setLocalGrade(item.localgrade);
    }

    //Populate manager
    function selectManager(id) {
        let item = data[id - 1];
        setName(item.name)
        setEmpid(item.empid);
        setUserId(item.id)
        setPhoto(item.photo);
        setDesignation(item.designation);
    }
    
    //Populate project
    function selectProject(id) {
        let item = userproject[id - 1];
        setName(item.name)
        setEmpid(item.empid);
        setUserId(item.id)
        setStartDate(item.start_date);
        setEndDate(item.end_date);
        setManagerName(item.manager_name);
    }

     //Populate training
     function selectTraining(id) {
        let item = usertraining[id - 1];
        setName(item.name)
        setEmpid(item.empid);
        setUserId(item.id)
        setStartDate(item.start_date);
        setEndDate(item.end_date);
        setTrainerName(item.trainer_name);
    }

    //Populate poc
    function selectPoc(id) {
        let item = userpoc[id - 1];
        setName(item.name)
        setEmpid(item.empid);
        setUserId(item.id)
        setStartDate(item.start_date);
        setEndDate(item.end_date);
        setGuideName(item.guide_name);
    }
       

    //Edit Employee
    const handleeditsubmit4 = (e) => {
        e.preventDefault();
        let regobj = {            
             name, designation, doj, empid, primaryskill, location, phone, photo, localgrade
        };
        if (IsValidate4()) {
            //console.log(regobj);

            fetch(`https://emcapg.azurewebsites.net/employee/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUsers()
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Edit Manager
     const handleeditsubmit3 = (e) => {
        e.preventDefault();
        let regobj = { name, empid, designation, photo };
        if (IsValidate3()) {
            //console.log(regobj);

            fetch(`https://emcapg.azurewebsites.net/manager/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getManagers()
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Edit Project
     const handleeditsubmit = (e) => {
        e.preventDefault();
        let regobj = { empid, start_date, end_date, name, manager_name };
        if (IsValidate()) {
            //console.log(regobj);

            fetch(`https://emcapg.azurewebsites.net/project/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUserProject()
                })
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Edit Training
    const handleeditsubmit1 = (e) => {
        e.preventDefault();
        let regobj = { empid, start_date, end_date, name, trainer_name };
        if (IsValidate1()) {
            //console.log(regobj);

            fetch(`https://emcapg.azurewebsites.net/training/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUserTraining()
                })
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Edit POC
    const handleeditsubmit2 = (e) => {
        e.preventDefault();
        let regobj = { empid, start_date, end_date, name, guide_name };
        if (IsValidate2()) {
            //console.log(regobj);

            fetch(`https://emcapg.azurewebsites.net/poc/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUserPoc();
                })
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Code
    return (
        <div className="container5" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">

            {/* Background image */}
            <img src={require('../images/img1.png')} alt="cg logo" style={{ width: 300, height: 70, marginLeft: 400 }}></img>
            <div style={{ backgroundImage: `url(${require('../images/img5.webp')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            </div>

            {/*Services offered for Admin*/}
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className="btn btn-dark" onClick={() => myFunction1()} id="bt1">Employee</button>&nbsp;
                <button className="btn btn-dark" onClick={() => myFunction2()} id="bt2">Manager</button>&nbsp;
                <button className="btn btn-dark" onClick={() => myFunction3()} id="bt3">Project</button>&nbsp;
                <button className="btn btn-dark" onClick={() => myFunction4()} id="bt4">Training</button>&nbsp;
                <button className="btn btn-dark" onClick={() => myFunction5()} id="bt5">POC</button>&nbsp;
            </div>



            {/* Adjustments Required */}
            <br /><br />



            {/* Table-1 Employee */}
            <div className="hidden" id="myTable1">
                <h5 style={{ textAlign: 'center' }}>Employee Data</h5>
                <hr />
                <button className="btn btn-success btn-sm" style={{ float: 'right' }} onClick={() => { setmodal4(true); }}>
                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                        add
                    </span>
                </button>
                <br /><br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empid</th>
                            <th>Name</th>
                            <th>Local Grade</th>
                            <th>Designation</th>
                            <th>Primary Skill</th>
                            <th>Location</th>
                            <th>Phone</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userdata.map((item) => (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.empid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.localgrade}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.primaryskill}</td>
                                    <td>{item.location}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button className="btn btn-light btn-sm" onClick={() => { seteditmodal4(true); selectEmployee(item.id) }}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                edit
                                            </span>
                                        </button>&nbsp;
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(item.id)}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table-2 Manager */}
            <div className="hidden" id="myTable2">
                <h5 style={{ textAlign: 'center' }}>Manager Data</h5>
                <hr />
                <button className="btn btn-success btn-sm" style={{ float: 'right' }} onClick={() => { setmodal3(true); }}>
                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                        add
                    </span>
                </button>
                <br /><br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empid</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.empid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.designation}</td>
                                    <td>
                                        <button className="btn btn-light btn-sm" onClick={() => { seteditmodal3(true); selectManager(item.id) }}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                edit
                                            </span>
                                        </button>&nbsp;
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteManager(item.id)}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table-3 Project */}
            <div className="hidden" id="myTable3">
                <h5 style={{ textAlign: 'center' }}>Assign Project</h5>
                <hr />
                <button className="btn btn-success btn-sm" style={{ float: 'right' }} onClick={() => { setmodal(true); }}>
                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                        add
                    </span>
                </button>
                <br /><br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empid</th>
                            <th>Project Name</th>
                            <th>Project Manager</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userproject.map((item) => (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.empid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.manager_name}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.end_date}</td>
                                    <td>
                                        <button className="btn btn-light btn-sm" onClick={() => { seteditmodal(true); selectProject(item.id) }}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                edit
                                            </span>
                                        </button>&nbsp;
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteProject(item.id)}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table-4 Training */}
            <div className="hidden" id="myTable4">
                <h5 style={{ textAlign: 'center' }}>Assign Training</h5>
                <hr />
                <button className="btn btn-success btn-sm" style={{ float: 'right' }} onClick={() => { setmodal1(true); }}>
                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                        add
                    </span>
                </button>
                <br /><br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empid</th>
                            <th>Training Name</th>
                            <th>Trainer</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usertraining.map((item) => (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.empid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.trainer_name}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.end_date}</td>
                                    <td>
                                        <button className="btn btn-light btn-sm" onClick={() => { seteditmodal1(true); selectTraining(item.id) }}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                edit
                                            </span>
                                        </button>&nbsp;
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteTraining(item.id)}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table-5 Poc */}
            <div className="hidden" id="myTable5">
                <h5 style={{ textAlign: 'center' }}>Assign POC</h5>
                <hr />
                <button className="btn btn-success btn-sm" style={{ float: 'right' }} onClick={() => { setmodal2(true); }}>
                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                        add
                    </span>
                </button>
                <br /><br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empid</th>
                            <th>POC Name</th>
                            <th>Guide</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userpoc.map((item) => (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.empid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.guide_name}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.end_date}</td>
                                    <td>
                                        <button className="btn btn-light btn-sm" onClick={() => { seteditmodal2(true); selectPoc(item.id) }}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                edit
                                            </span>
                                        </button>&nbsp;
                                        <button className="btn btn-danger btn-sm" onClick={() => deletePoc(item.id)}>
                                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Modal for Employee */}
            <Modal size='me' isOpen={modal4} toggle={() => setmodal4(!modal4)}>
                <ModalHeader toggle={() => setmodal4(!modal4)}>
                    Add Employee
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit4}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Local Grade</label>
                            <div className="col-sm-9">
                                <input type="text" name="localgrade" value={localgrade} onChange={(e) => { setLocalGrade(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Designation</label>
                            <div className="col-sm-9">
                                <input type="text" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">DOJ</label>
                            <div className="col-sm-9">
                                <input type="date" name="doj" value={doj} onChange={(e) => { setDoj(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Primary Skill</label>
                            <div className="col-sm-9">
                                <input type="text" name="primaryskill" value={primaryskill} onChange={(e) => { setPrimarySkill(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Location</label>
                            <div className="col-sm-9">
                                <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Contact</label>
                            <div className="col-sm-9">
                                <input type="number" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="exampleFormControlFile1" className="col-sm-3 col-form-label">Profile Photo</label>
                            <div className="col-sm-9">
                                <input type="file" onChange={e => converttobase64(e)} className="form-control" id="file1" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <input hidden type="text" name="photo" value={photo} onChange={(e) => { setPhoto(e.target.value) }} className="form-control" id="fileexample" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for Manager */}
            <Modal size='me' isOpen={modal3} toggle={() => setmodal3(!modal3)}>
                <ModalHeader toggle={() => setmodal3(!modal3)}>
                    Add Manager
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit3}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Designation</label>
                            <div className="col-sm-9">
                                <input type="text" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="exampleFormControlFile1" className="col-sm-3 col-form-label">Profile Photo</label>
                            <div className="col-sm-9">
                                <input type="file" onChange={e => converttobase64(e)} className="form-control" id="file1" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <input hidden type="text" name="photo" value={photo} onChange={(e) => { setPhoto(e.target.value) }} className="form-control" id="fileexample" />
                            </div>
                        </div>


                        <br />
                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for Project */}
            <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                    Assign Project
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        {/* 
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Status</label>
                            <div className="col-sm-9">
                                <input type="number" name="status" value={status} onChange={(e) => { setStatus(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br /> */}

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Manager</label>
                            <div className="col-sm-9">
                                <input type="text" name="manager_name" onChange={(e) => { setManagerName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date" onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Assign</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for Training */}
            <Modal size='me' isOpen={modal1} toggle={() => setmodal1(!modal1)}>
                <ModalHeader toggle={() => setmodal1(!modal)}>
                    Assign Training
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit1}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        {/* 
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Status</label>
                            <div className="col-sm-9">
                                <input type="number" name="status" value={status} onChange={(e) => { setStatus(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br /> */}

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Training Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Trainer</label>
                            <div className="col-sm-9">
                                <input type="text" name="trainer_name" onChange={(e) => { setTrainerName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date" onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Assign</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for POC */}
            <Modal size='me' isOpen={modal2} toggle={() => setmodal2(!modal2)}>
                <ModalHeader toggle={() => setmodal2(!modal)}>
                    Assign POC
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit2}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        {/* 
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Status</label>
                            <div className="col-sm-9">
                                <input type="number" name="status" value={status} onChange={(e) => { setStatus(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br /> */}

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">POC Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Guide</label>
                            <div className="col-sm-9">
                                <input type="text" name="guide_name" onChange={(e) => { setGuideName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date" onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Assign</button>
                    </form>
                </ModalBody>
            </Modal>



             {/* Edit Modal for Employee */}
             <Modal size='me' isOpen={editmodal4} toggle={() => seteditmodal4(!editmodal4)}>
                <ModalHeader toggle={() => seteditmodal4(!editmodal4)}>
                    Update Employee
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit4}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Local Grade</label>
                            <div className="col-sm-9">
                                <input type="text" name="localgrade" value={localgrade} onChange={(e) => { setLocalGrade(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Designation</label>
                            <div className="col-sm-9">
                                <input type="text" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">DOJ</label>
                            <div className="col-sm-9">
                                <input type="date" name="doj" value={doj} onChange={(e) => { setDoj(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Primary Skill</label>
                            <div className="col-sm-9">
                                <input type="text" name="primaryskill" value={primaryskill} onChange={(e) => { setPrimarySkill(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Location</label>
                            <div className="col-sm-9">
                                <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Contact</label>
                            <div className="col-sm-9">
                                <input type="number" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="exampleFormControlFile1" className="col-sm-3 col-form-label">Profile Photo</label>
                            <div className="col-sm-9">
                                <input type="file" onChange={e => converttobase64(e)} className="form-control" id="file1" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <input hidden type="text" name="photo" value={photo} onChange={(e) => { setPhoto(e.target.value) }} className="form-control" id="fileexample" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Edit Modal for Manager */}
            <Modal size='me' isOpen={editmodal3} toggle={() => seteditmodal3(!editmodal3)}>
                <ModalHeader toggle={() => seteditmodal3(!editmodal3)}>
                    Update Manager
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit3}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Designation</label>
                            <div className="col-sm-9">
                                <input type="text" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="exampleFormControlFile1" className="col-sm-3 col-form-label">Profile Photo</label>
                            <div className="col-sm-9">
                                <input type="file" onChange={e => converttobase64(e)} className="form-control" id="file1" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <input hidden type="text" name="photo" value={photo} onChange={(e) => { setPhoto(e.target.value) }} className="form-control" id="fileexample" />
                            </div>
                        </div>


                        <br />
                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>
            
            {/* Edit Modal for Project */}
            <Modal size='me' isOpen={editmodal} toggle={() => seteditmodal(!editmodal)}>
                <ModalHeader toggle={() => seteditmodal(!editmodal)}>
                    Update Project
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Manager</label>
                            <div className="col-sm-9">
                                <input type="text" name="manager_name" value={manager_name} onChange={(e) => { setManagerName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" value={start_date} onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date" value={end_date} onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Edit Modal for Training */}
            <Modal size='me' isOpen={editmodal1} toggle={() => seteditmodal1(!editmodal1)}>
                <ModalHeader toggle={() => seteditmodal1(!editmodal1)}>
                    Assign Training
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit1}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                       
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Training Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Trainer</label>
                            <div className="col-sm-9">
                                <input type="text" name="trainer_name" value={trainer_name} onChange={(e) => { setTrainerName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" value={start_date} onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date" value={end_date} onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Edit Modal for POC */}
            <Modal size='me' isOpen={editmodal2} toggle={() => seteditmodal2(!editmodal2)}>
                <ModalHeader toggle={() => seteditmodal2(!editmodal2)}>
                    Update POC
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit2}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">POC Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Guide</label>
                            <div className="col-sm-9">
                                <input type="text" name="guide_name" value={guide_name} onChange={(e) => { setGuideName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" value={start_date} onChange={(e) => { setStartDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date" value={end_date} onChange={(e) => { setEndDate(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

        </div>
    )
}

export default Admin
