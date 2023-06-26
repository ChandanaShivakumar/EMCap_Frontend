import React from 'react'
import "../css/Employee.css"
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Header from './Header'
import Rating from '@mui/material/Rating';
import { ReactComponent as TeamsLogo } from '../images/icons9.svg';
import { ReactComponent as MailLogo } from '../images/icons10.svg';



//Displaying the data
const Employee = () => {

    /*eslint-disable*/

    const [data, setData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])
    const emp = data;

    const [userfeedback, setUserFeedback] = useState([])
    useEffect(() => {
        getUserFeedback();
    }, [])

    const [projects, setProjects] = useState([])
    useEffect(() => {
        getUserProject();
    }, [])

    const [usertraining, setUserTraining] = useState([]);
    useEffect(() => {
        getUserTraining();
    }, [])

    const [profile, setProfile] = useState([]);
    useEffect(() => {
        getUserProfile();
    }, [])

    const [userpoc, setUserPoc] = useState([])
    useEffect(() => {
        getUserPoc();
    }, [])

    const [userskill, setUserSkill] = useState([])
    useEffect(() => {
        getUserSkill();
    }, [])


    //Initializing the data
    const [id, setId,] = useState("");
    const [employee, setEmployee,] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [location, setLocation] = useState("");
    const [designation, setDesignation] = useState("");
    const [image, setImage] = useState("");

    const edata = localStorage.getItem("id")

    const [local_employee_id, setLocal_employee_id] = useState("");
    const [global_group_id, setGlobal_group_id] = useState("");
    const [name, setName] = useState("");
    const [local_grade, setLocal_grade] = useState("");
    const [people_manager, setPeople_manager] = useState("");
    const [joining_date_dhr, setJoining_date] = useState("");
    const [city, setCity] = useState("");
    const [primary_skill_group, setPrimary_skill_group] = useState("");
    const [lml, setLml] = useState("");
    const [start_date, setStart_date] = useState("");
    const [account, setAccount] = useState("");
    const [vertical_segment, setVerticalSegment] = useState("");
    const [email_id, setEmailId] = useState("");
    const [ego, setEgo] = useState("");
    const [averageRating, setAverageRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [order, setOrder] = useState("DSC");
    const [segmentemployee, setSegmentEmployee] = useState("");
    const [skillgroup, setSkillGroup] = useState("");
    const [udaan_status, setUdaanStatus] = useState("");
    const [udaan_batch, setUdaanBatch] = useState("");
    const [resignation_status, setResignationStatus] = useState("");
    const [non_deployable, setNonDeployable] = useState("");
    const [created_at, setCreatedAt] = useState("");
    const [updated_at, setUpdatedAt] = useState("");

    //Fetching the data
    function getUsers() {
        fetch(`https://emcapg.azurewebsites.net/api/employee/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setData(resp)
                setLocal_employee_id(resp.local_employee_id)
                setGlobal_group_id(resp.global_group_id)
                setName(resp.name)
                setLocal_grade(resp.local_grade)
                setPeople_manager(resp.people_manager)
                setJoining_date(resp.joining_date_dhr)
                setCity(resp.city)
                setPrimary_skill_group(resp.skill_group)
                setLml(resp.lml)
                setStart_date(resp.start_date)
                setAccount(resp.account)
                setVerticalSegment(resp.vertical_segment)
                setEmailId(resp.email_id)
                setEgo(resp.ego)
                setUdaanBatch(resp.udaan_batch)
                setUdaanStatus(resp.udaan_status)
                setResignationStatus(resp.resignation_status)
                setCreatedAt(resp.created_at)
                setUpdatedAt(resp.updated_at)
            })
        })
    }

    //Fetching userprofiles
    function getUserProfile() {
        fetch(`https://emcapg.azurewebsites.net/api/empprofiles/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setProfile(resp);
                setId(resp.employee);
                setEmployee(resp.id)
                setPhone_number(resp.phone_number)
                setLocation(resp.location)
                setDesignation(resp.designation)
                const baseUrl = "https://emcapg.azurewebsites.net"

                const addedUrl = (resp.image)
                const mainURL = baseUrl + addedUrl
                console.log(mainURL)
                setImage(mainURL)
            })
        })
    }

    const mngr = JSON.parse(localStorage.getItem("manager"));
    const [managerName, setManagerName] = useState(mngr.name);
    const [manager_id, setManager_id] = useState(mngr.id)
    const [fresher_id, setFresher_id] = useState(edata)
    const [feedback, setFeedback] = useState("")

    //Average star rating
    function calculateAverageRating(feedbackData) {
        const ratings = feedbackData.map((feedback) => feedback.rating);
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        const average = sum / ratings.length;
        const averageOneDecimal = average.toFixed(1); // Round to one decimal place
        setAverageRating(parseFloat(averageOneDecimal));
    }

    //Tenure calculation
    const current = new Date();
    const currentdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    var date1 = new Date(currentdate);
    var date2 = new Date(joining_date_dhr)
    var jd = new Date(joining_date_dhr).toLocaleDateString();
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    var tenure = (Difference_In_Days / 360).toFixed(1)

    //Fetching the user projects
    function getUserProject() {
        fetch(`https://emcapg.azurewebsites.net/api/empprojects/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setProjects(resp)
            })
        })
    }
    const empProjects = projects;
    //latest project first using the sort func
    const sorting = (col) => {

        if (order === "DSC") {
            const sorted = [...projects].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setProjects(sorted);
            setOrder("DSC")
        }
    };

    //Fetching the user trainings
    function getUserTraining() {
        fetch(`https://emcapg.azurewebsites.net/api/emptrainings/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setUserTraining(resp)
            })
        })
    }
    const empTrainings = usertraining;
    //latest training first using the sort func
    const sorting1 = (col) => {

        if (order === "DSC") {
            const sorted = [...usertraining].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setUserTraining(sorted);
            setOrder("DSC")
        }
    };

    //Fetching the user pocs
    function getUserPoc() {
        fetch(`https://emcapg.azurewebsites.net/api/emppocs/${edata}/`).then((result) => {
            result.json().then((resp) => {
                console.log("result", resp)
                setUserPoc(resp)
            })
        })
    }
    const empPocs = userpoc;

    //Fetching the user skill
    function getUserSkill() {
        fetch(`https://emcapg.azurewebsites.net/api/empskills/${edata}/`).then((result) => {
            result.json().then((resp) => {
                console.log("RRresult1", resp)
                setUserSkill(resp)
            })
        })
    }
    const empSkills = userskill;

    //modal for feedback
    const [modal5, setmodal5] = useState(false)

    //Fetching userfeedbacks
    function getUserFeedback() {
        fetch(`https://emcapg.azurewebsites.net/api/empfeedbacks/${edata}`).then((result) => {
            result.json().then((resp) => {
                setUserFeedback(resp)
                calculateAverageRating(resp);
            })
        })
    }

    //Validation for feedback
    const IsValidate6 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (feedback === null || feedback === '') {
            isproceed = false;
            errormessage += ' Feedback';
        }
        if (rating === null || rating === '' || rating === undefined) {
            isproceed = false;
            errormessage += ' rating';
        }
        if (fileInput === null || fileInput === '' || fileInput === undefined) {
            isproceed = false;
            errormessage += 'detailed feedback report';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {

        }
        return isproceed;
    }

    // Reference to the file input element
    let fileInput = null;
    // Function to handle file input change event
    const handleFileInputChange = (event) => {
        // Get the selected file
        fileInput = event.target.files[0];
    };

    //Assigning the feedback
    const handlesubmit5 = (e) => {
        e.preventDefault();
        // Create a new FormData object
        const formdata = new FormData();
        // Append form fields to the FormData object
        formdata.append('fresher_id', edata);
        formdata.append('manager_id', manager_id);
        formdata.append('manager_name', managerName);
        formdata.append('feedback', feedback);
        formdata.append('rating', rating);
        // Append the file to the FormData object
        formdata.append('file', fileInput);
        if (IsValidate6()) {
            fetch('https://emcapg.azurewebsites.net/api/feedback/', {
                method: 'POST',
                body: formdata
            }).then((res) => {
                toast.success('Feedback given successfully');
                setTimeout(() => {
                    setmodal5(false);
                }, 5000);
                getUserFeedback();
            }).catch((err) => {
                toast('Failed: ' + err.message);
            });
        }
    };


    const StarRating = ({ averageRating }) => {
        const getStarIcons = () => {
            const stars = [];
            const fullStars = Math.floor(averageRating);
            const halfStar = averageRating - fullStars >= 0.5;
            for (let i = 0; i < fullStars; i++) {
                stars.push(<span key={i} className="material-symbols-outlined">star</span>);
            }
            if (halfStar) {
                stars.push(<span key="half" className="material-symbols-outlined">star_half</span>);
            }
            return stars;
        };
        return (
            <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                {getStarIcons()}
            </h6>
        );
    };

    const navigateToPersonPage = (email) => {
        const deepLink = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
        window.open(deepLink);
    };


    const handleNavigateClick = () => {
        const email = email_id;
        navigateToPersonPage(email);
    };

    const handleButtonClick = () => {
        const emailid = email_id;
        const mailto = `mailto:${emailid}?`;
        try {
            window.location.href = mailto;
        } catch (error) {
            console.error('Error opening email client:', error);
        }
    };

    return (
        <div className="container1" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">
            {/* background image */}
            <Header />
            <div style={{ backgroundImage: `url(${require('../images/img2.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br /><br /><br />
                {/* profile card */}
                <div className="card" style={{ width: '17rem', marginBottom: -250, marginLeft: 70, alignSelf: 'center' }}>
                    <img src={image} alt="pp" key="{item.photo}" className="userpp"></img>

                    {/* Employee profile details */}
                    <br /> <br /><br />
                    <div style={{ alignSelf: 'center', marginBottom: 20 }}>
                        <>
                            <h5 key="{emp.name}" className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
                                <b>{emp.name}</b>
                            </h5>

                            <center>
                            <h6 style={{cursor: 'pointer' }}>
                                <a onClick={handleNavigateClick} style={{ color: '#505AC9' }}>
                                    <TeamsLogo style={{ width: '25px', height: '25px' }} /></a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                <a onClick={handleButtonClick}>
                                    <MailLogo style={{ width: '20px', height: '25px', color: 'grey' }} /></a>
                            </h6>
                            </center>

                            <h6 key="{item.designation}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                    integration_instructions
                                </span>&nbsp;
                                {designation}
                            </h6>

                            <h6 key="{item.phone}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                    call
                                </span>&nbsp;
                                {phone_number}
                            </h6>

                            <h6 key="{item.empid}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                    badge
                                </span>&nbsp;
                                {local_employee_id}
                            </h6>

                            <h6 key="{item.doj}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                    calendar_month
                                </span>&nbsp;
                                {jd}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg>
                                Experience : {tenure} Years
                            </h6>
                            <h6 key="{item.location}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                    location_on
                                </span>&nbsp;
                                {location}
                            </h6>

                            <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <Rating name="read-only" value={averageRating} readOnly />
                                {averageRating}
                            </h6>
                        </>
                    </div>
                </div>
                <br />

            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                {/* Primary Skills card */}
                <br />
                <div className="card" style={{ width: '14rem', marginLeft: 400, height: '100px' }}>
                    <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                        Primary Skill
                    </div>

                    <>
                        <p className="card-text" style={{ marginLeft: 10, color: 'green' }} key="{item.skill}">
                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, color: 'green', marginTop: 4 }}>
                                priority
                            </span>&nbsp;
                            {primary_skill_group}
                        </p>
                    </>
                </div>

                <div className="card" style={{ marginLeft: '10px', width: '30rem' }}>
                    {/*Skill details section */}
                    <h5 className="card-header" style={{ backgroundColor: '#f0f0f5', padding: '5px' }}> Skill  Details</h5>
                    <center>
                        <div className="" style={{}}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Skill name</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empSkills.map((item) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.details}</td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
            </div>
            <br />

            {/* Adjustments Required */}
            <br /><br /><br /><br /><br /><br />

            {/*Feedback details section */}
            <h5 style={{ textAlign: 'center' }}> Time for feedback!</h5>
            <button className="btn btn-success btn-sm" style={{ float: 'right', alignContent: 'center', cursor: 'pointer', marginRight: 200 }} onClick={() => { setmodal5(true); }}>
                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                    add
                </span>&nbsp;
            </button>
            <br /><br />
            <center>
                <div className="card" style={{ width: '51rem' }}>
                    <h4 style={{ color: 'yellow', backgroundColor: 'black', padding: '4px' }}>Overall Rating: {averageRating}</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Manager Name</th>
                                <th>Feedback</th>
                                <th>Rating</th>
                                <th>File</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userfeedback.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.manager_name}</td>
                                            <td>{item.feedback}</td>
                                            <td><Rating name="read-only" value={item.rating} readOnly /></td>
                                            <td>
                                                <a href={"https://emcapg.azurewebsites.net" + item.file} download>

                                                    <button className="btn btn-light btn-sm" >
                                                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                            download
                                                        </span>
                                                    </button>
                                                </a>
                                            </td>
                                            <td>{new Date(item.created_at).toLocaleString()}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/*Project details section */}
            <h5 style={{ textAlign: 'center' }}> Project  Details</h5>
            <br /><br />
            <center>
                <div className="card" style={{ width: '61rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Project name with code</th>
                                <th>Manager Name</th>
                                <th onClick={() => sorting("startdate")} style={{ cursor: 'pointer' }}>
                                    Start date
                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, marginTop: 5 }}>
                                        filter_list
                                    </span>
                                </th>
                                <th>End date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empProjects.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.manager_name}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                        </tr>
                                    </>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/*Training details section */}
            <h5 style={{ textAlign: 'center' }}> Training  Details</h5>
            <br /><br />
            <center>
                <div className="card" style={{ width: '61rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Training name</th>
                                <th>Details</th>
                                <th onClick={() => sorting1("startdate")} style={{ cursor: 'pointer' }}>
                                    Start date
                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, marginTop: 5 }}>
                                        filter_list
                                    </span>
                                </th>
                                <th>End date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empTrainings.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.details}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/*POC details section */}
            <h5 style={{ textAlign: 'center' }}> POC  Details</h5>
            <br /><br />
            <center>
                <div className="card" style={{ width: '41rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>POC name</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empPocs.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.poc_name}</td>
                                            <td>{item.poc_details}</td>

                                        </tr>
                                    </>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/*Skill details section */}
            <h5 style={{ textAlign: 'center' }}> Skill  Details</h5>
            <br /><br />
            <center>
                <div className="card" style={{ width: '41rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Skill name</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empSkills.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.details}</td>
                                        </tr>
                                    </>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />



            {/*More details section */}
            <h5 style={{ textAlign: 'center' }}>Additional Employee Details</h5>
            <br />
            <center>
                <div className="card" style={{ width: '61rem', backgroundColor: '#f0f0f5' }}>
                    <div className="form-group row">
                        <div className="form-group col" style={{ marginLeft: 40, marginTop: 20, textAlign: 'justify' }}>
                            <>
                                <p>LID : {local_employee_id}</p>
                                <p>GID : {global_group_id}</p>
                                <p>DOJ : {jd}</p>
                                <p>Local Grade : {local_grade}</p>
                                <p>Primary Skill : {primary_skill_group}</p>
                                <p>People Manager : {people_manager}</p>
                                <p>Base Location : {city}</p>

                            </>
                        </div>
                        <div className="form-group col" style={{ marginLeft: 30, marginTop: 20, textAlign: 'justify' }}>
                            <>
                                <p>Udaan Batch : {udaan_batch}</p>
                                <p>Udaan Status : {udaan_status}</p>
                                <p>Skill Group : {primary_skill_group}</p>
                                <p>Vertical Segment : {vertical_segment}</p>
                                <p>EGO : {ego}</p>
                            </>
                        </div>
                    </div>
                </div>
            </center>
            <br /><br />






            {/* Modal for Feedback */}
            <Modal size='me' isOpen={modal5} toggle={() => setmodal5(!modal5)}>
                <ModalHeader toggle={() => setmodal5(!modal5)}>
                    Add Feedback
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit5}>
                        <ToastContainer />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Employee Id</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    name="employee_id"
                                    value={fresher_id}
                                    readOnly
                                    onChange={(e) => { setFresher_id(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Manager Id</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    name="manager_id"
                                    value={manager_id}
                                    readOnly
                                    onChange={(e) => { setManager_id(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Manager Name</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    name="managerName"
                                    value={managerName}
                                    readOnly
                                    onChange={(e) => { setManagerName(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Feedback</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    name="feedback"
                                    onChange={(e) => { setFeedback(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Rating</label>
                            <div className="col-sm-9">
                                <input type="number"
                                    name="rating"
                                    onChange={(e) => { setRating(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Detailed feedback report</label>
                            <div className="col-sm-9">

                                <input type="file" name="fileInput" id="fileInput" onChange={handleFileInputChange} />

                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

        </div>
    )
}

export default Employee
