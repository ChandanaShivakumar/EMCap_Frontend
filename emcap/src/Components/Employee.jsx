import React from 'react'
import "../css/Employee.css"
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Header from './Header'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        getUserProject();
    }, [])

    useEffect(() => {
        getUserProfile();
    }, [])



    const [order, setOrder] = useState("DSC");


    //Initializing the data
    const [empid, setEmpid] = useState("");
    const [segmentemployee, setSegmentEmployee] = useState("");
    const [skillgroup, setSkillGroup] = useState("");
    const [vertical_segment, setVerticalSegment] = useState("");



    /// Employee Profile card
    const [profile, setProfile] = useState([])
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
    const [account, setAccount] = useState("");
    const [bu, setBu] = useState("");
    const [udaan_status, setUdaanStatus] = useState("");
    const [ego, setEgo] = useState("");
    const [udaan_batch, setUdaanBatch] = useState("");
    const [resignation_status, setResignationStatus] = useState("");
    const [non_deployable, setNonDeployable] = useState("");
    const [created_at, setCreatedAt] = useState("");
    const [updated_at,setUpdatedAt] = useState("");


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
                setAccount(resp.account)
                setBu(resp.bu)
                setEgo(resp.ego)
                setUdaanStatus(resp.udaan_status)
                setSegmentEmployee(resp.segmentemployee)
                setSkillGroup(resp.setSkillGroup)
                setUdaanBatch(resp.udaan_batch)
                setUdaanStatus(resp.udaan_status)
                setResignationStatus(resp.resignation_status)
                setCreatedAt(resp.created_at)
                setUpdatedAt(resp.updated_at)
                setVerticalSegment(resp.vertical_segment)


            })
        })
    }

    //Modal popup
    const [modal, setmodal] = useState(false)
    const [profileprimarykey, setProfileprimarykey] = useState("")


    //Fetching userprofiles
    function getUserProfile() {
        fetch(`https://emcapg.azurewebsites.net/api/empprofiles/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setProfile(resp);

                setPhone_number(resp.phone_number)
                setLocation(resp.location)
                setDesignation(resp.designation)
                setProfileprimarykey(resp.id)
                const baseUrl = "https://emcapg.azurewebsites.net"

                const addedUrl = (resp.image)
                const mainURL = baseUrl + addedUrl
                console.log(mainURL)
                setImage(mainURL)
            })
        })
    }

    const [projects, setProjects] = useState([])
    //Fetching the user projects
    function getUserProject() {
        fetch(`https://emcapg.azurewebsites.net/api/empprojects/${edata}/`).then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
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

    //Tenure calculation
    const current = new Date();
    const currentdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    var date1 = new Date(currentdate);
    var date2 = new Date(joining_date_dhr);
    var jd = new Date(joining_date_dhr).toLocaleDateString();

    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    var tenure = (Difference_In_Days / 360).toFixed(1)

    //Modal popup for add and edit
    const [modal1, setmodal1] = useState(false)
    const [modal2, setmodal2] = useState(false)
    const [modal3, setmodal3] = useState(false)
    const [modal4, setmodal4] = useState(false)

    //Edit Modal Popup
    const [editmodal1, seteditmodal1] = useState(false)
    const [editmodal2, seteditmodal2] = useState(false)
    const [editmodal3, seteditmodal3] = useState(false)
    const [editmodal4, seteditmodal4] = useState(false)

    //Setting user trainings
    const [usertraining, setUserTraining] = useState([])
    useEffect(() => {
        getUserTraining();
    }, [])

    //Fetching the user trainings
    function getUserTraining() {
        fetch(`https://emcapg.azurewebsites.net/api/emptrainings/${edata}/`).then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setUserTraining(resp)


            })
        })
    }
    const empTrainings = usertraining;
    console.log("training", usertraining)

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

    //Validation for training
    const IsValidate1 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';


        if (training_name === null || training_name === '') {
            isproceed = false;
            errormessage += ' Training Name';
        }
        if (training_details === null || training_details === '') {
            isproceed = false;
            errormessage += ' details';
        }
        if (train_start_date === null || train_start_date === '') {
            isproceed = false;
            errormessage += ' Start Date';
        }
        if (train_end_date === null || train_end_date === '') {
            isproceed = false;
            errormessage += ' End Date';
        }
        if (train_start_date >= train_end_date) {
            isproceed = false;
            errormessage += 'End Date. Note - Start date should be before end date!'
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {

        }
        return isproceed;
    }


    const [training_name, setTraining_name] = useState("")
    const [train_start_date, setTrain_start_date] = useState("")
    const [train_end_date, setTrain_end_date] = useState("")
    const [training_id, setTraining_id] = useState("")
    const [train_employee_id, setTrain_employee_id] = useState(localStorage.getItem("id"))
    const [training_details, setTraining_details] = useState("")

    //Assigning the training
    const handlesubmit1 = (e) => {
        e.preventDefault();

        let employee_id = train_employee_id
        let start_date = train_start_date
        let end_date = train_end_date
        let name = training_name
        let details = training_details
        let regobj = { employee_id, start_date, end_date, name, details };
        if (IsValidate1()) {
            fetch("https://emcapg.azurewebsites.net/api/trainings/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Training added  Successful')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);
                getUserTraining();

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Populate training
    function selectTraining(id) {
        const item = usertraining.find(training => training.id === id);
        console.log(item)
        setTraining_name(item.name)
        setTrain_employee_id(item.employee_id);
        setTraining_id(item.id)
        setTrain_start_date(item.start_date);
        setTrain_end_date(item.end_date);
        setTraining_details(item.details);
    }

    //Edit Training
    const handleeditsubmit1 = (e) => {
        e.preventDefault();
        let employee_id = train_employee_id
        let start_date = train_start_date
        let end_date = train_end_date
        let name = training_name
        let details = training_details
        let regobj = { employee_id, start_date, end_date, name, details };
        if (IsValidate1()) {
            fetch(`https://emcapg.azurewebsites.net/api/trainings/${training_id}/`, {
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

    //Delete Training
    function deleteTraining(id) {
        fetch(`https://emcapg.azurewebsites.net/api/trainings/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
            })
            alert("Training with id " + id + " is deleted")
                getUserTraining();
        })
    }


    //Setting user pocs
    const [userpoc, setUserPoc] = useState([])
    useEffect(() => {
        getUserPoc();
    }, [])

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

    //Validation for poc
    const IsValidate2 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (pocName === null || pocName === '') {
            isproceed = false;
            errormessage += ' POC Name';
        }
        if (pocDetails === null || pocDetails === '') {
            isproceed = false;
            errormessage += ' Details';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {

        }
        return isproceed;
    }
    const [pocName, setPocName] = useState("")
    const [pocDetails, setPocDetails] = useState("")
    const [empIdPoc, setEmpIdPoc] = useState(localStorage.getItem("id"))
    const [pocId, setPocId] = useState()

    //Assigning the poc
    const handlesubmit2 = (e) => {
        e.preventDefault();
        let poc_name = pocName
        let poc_details = pocDetails
        let employee_id = empIdPoc
        let regobj = { poc_name, poc_details, employee_id };

        if (IsValidate2()) {
            fetch("https://emcapg.azurewebsites.net/api/pocs/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('POC Added successful')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);
                getUserPoc();

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Populate poc
    function selectPoc(id) {
        let item = userpoc.find(poc => poc.id === id)
        setPocName(item.poc_name)
        setEmpIdPoc(item.employee_id);
        setPocId(item.id);
        setPocDetails(item.poc_details);
    }

    //Edit POC
    const handleeditsubmit2 = (e) => {
        e.preventDefault();
        let poc_name = pocName
        let poc_details = pocDetails
        let employee_id = empIdPoc
        let regobj = { poc_name, poc_details, employee_id };
        if (IsValidate2()) {
            fetch(`https://emcapg.azurewebsites.net/api/pocs/${pocId}/`, {
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

    //Deleting the poc
    function deletePoc(id) {
        fetch(`https://emcapg.azurewebsites.net/api/pocs/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
            })
            alert("POC with id " + id + " is deleted")
            getUserPoc();
        })
    }

    //Setting user skill
    const [userskill, setUserSkill] = useState([])
    useEffect(() => {
        getUserSkill();
    }, [])

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

    //Validation for skill
    const IsValidate9 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (skillName === null || skillName === '') {
            isproceed = false;
            errormessage += ' Skill Name';
        }
        if (skillDetails === null || skillDetails === '') {
            isproceed = false;
            errormessage += ' Details';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {

        }
        return isproceed;
    }


    const [skillName, setSkillName] = useState("")
    const [skillDetails, setSkillDetails] = useState("")
    const [skillId, setSkillId] = useState("")
    const [emp_id_skill, setEmp_id_skill] = useState(localStorage.getItem("id"))
    //Adding the skill
    const handlesubmit3 = (e) => {
        e.preventDefault();
        let name = skillName
        let details = skillDetails
        let emp_id = emp_id_skill
        let regobj = { emp_id, name, details };
        if (IsValidate9()) {
            fetch("https://emcapg.azurewebsites.net/api/skils/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Skill Added successful')
                res.json().then((resp) => {
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);
                getUserSkill();
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Populate skill
    function selectSkill(id) {
        let item = userskill.find(skill => skill.id === id);
        setSkillName(item.name)
        setEmp_id_skill(item.emp_id);
        setSkillId(item.id);
        setSkillDetails(item.details);
    }

    //Edit Skill
    const handleeditsubmit3 = (e) => {
        e.preventDefault();
        let name = skillName
        let details = skillDetails
        let emp_id = emp_id_skill
        let regobj = { emp_id, name, details };
        if (IsValidate9()) {
            fetch(`https://emcapg.azurewebsites.net/api/skils/${skillId}/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUserSkill();
                })
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Deleting the skill
    function deleteSkill(id) {
        fetch(`https://emcapg.azurewebsites.net/api/skils/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
            })
            alert("Skill with id " + id + " is deleted")
            getUserSkill();
        })
    }

    //Validation for project
    const IsValidate4 = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';


        if (project_name === null || project_name === '') {
            isproceed = false;
            errormessage += ' Project Name';
        }
        if (project_manager_name === null || project_manager_name === '') {
            isproceed = false;
            errormessage += ' Project Manager';
        }
        if (projce_start_date === null || projce_start_date === '') {
            isproceed = false;
            errormessage += ' Start Date';
        }
        if (project_end_date === null || project_end_date === '') {
            isproceed = false;
            errormessage += ' End Date';
        }
        
        if (projce_start_date >= project_end_date) {
            isproceed = false;
            errormessage += 'End Date. Note - Start date should be before end date!'
            
          }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {

        }
        return isproceed;
    }

    const [project_name, setProject_name] = useState("")
    const [projce_start_date, setProject_start_date] = useState("")
    const [project_manager_name, setProject_manager_name] = useState("")
    const [project_end_date, setProject_end_date] = useState("")
    const [project_id, setProject_id] = useState("")
    const [pro_employee_id, setPro_employee_id] = useState(localStorage.getItem("id"))


    //Assigning the project
    const handlesubmit4 = (e) => {
        e.preventDefault();
        let employee = pro_employee_id
        let start_date = projce_start_date
        let end_date = project_end_date
        let manager_name = project_manager_name
        let name = project_name
        let regobj = { employee, start_date, end_date, name, manager_name };
        if (IsValidate4()) {
            fetch("https://emcapg.azurewebsites.net/api/projects/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Adding successful')
                res.json().then((resp) => {
                    setProject_id(resp.id)
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);
                getUserProject();
            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Populate project
    function selectProject(id) {
        let item = projects.find(pro => pro.id === id)
        setProject_name(item.name)
        setPro_employee_id(item.employee);
        setProject_id(item.id)
        setProject_start_date(item.start_date);
        setProject_end_date(item.end_date);
        setProject_manager_name(item.manager_name);
    }

    //Edit Project
    const handleeditsubmit4 = (e) => {
        e.preventDefault();
        let employee = pro_employee_id
        let start_date = projce_start_date
        let end_date = project_end_date
        let manager_name = project_manager_name
        let name = project_name
        let regobj = { employee, start_date, end_date, name, manager_name };
        if (IsValidate4()) {
            fetch(`https://emcapg.azurewebsites.net/api/empproject/${project_id}/`, {
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

    //Delete Project
    function deleteProject(id) {
        fetch(`https://emcapg.azurewebsites.net/api/empproject/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
            })
            alert("Project with id " + id + " is deleted")
                getUserProject();
        })
    }

    //Validation for profile
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (phone_number === null || phone_number === '') {
            isproceed = false;
            errormessage += ' Contact';
        }
        if (location === null || location === '') {
            isproceed = false;
            errormessage += ' Location';
        }
        if (image === null || image === '' || image === undefined) {
            isproceed = false;
            errormessage += ' Image';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            // if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            // } else {
            //     isproceed = false;
            //     toast('Please enter a valid name')
            // }
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{4,4}$/.test(phone_number)) {

            } else {
                isproceed = false;
                toast('Please enter a valid contact number')
            }
            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(location)) {

            } else {
                isproceed = false;
                toast('Please enter a valid location')
            }
        }
        return isproceed;
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    //Edit profile
    const handlesubmit = (e) => {
        e.preventDefault();
        let employee = edata;
        let regobj = {
            employee, phone_number, location, designation, image
        };
        if (IsValidate()) {
            const formData = new FormData();
            formData.append("employee", edata);
            formData.append("location", location);
            formData.append("phone_number", phone_number)
            formData.append("designation", designation)
            formData.append("image", image);

            fetch(`https://emcapg.azurewebsites.net/api/profiles/${profileprimarykey}/`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }

            }).then((res) => {
                toast.success('Update successful')
                res.json().then((resp) => {
                    getUserProfile()
                })
                setTimeout(() => {
                    setmodal(false)
                }, 5000);

            }).catch((err) => {
                toast('Failed :' + err.message);
            });
        }
    }

    //Fetching userfeedbacks
    function getUserFeedback() {
        fetch(`https://emcapg.azurewebsites.net/api/empfeedbacks/${edata}`).then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp
                setUserFeedback(resp)
                calculateAverageRating(resp);
            })
        })
    }

    const [averageRating, setAverageRating] = useState(0);

    function calculateAverageRating(feedbackData) {
        const ratings = feedbackData.map((feedback) => feedback.rating);
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        const average = sum / ratings.length;
        const averageOneDecimal = average.toFixed(1); // Round to one decimal place
        setAverageRating(parseFloat(averageOneDecimal));
    }

    //Code
    return (
        <div className="container1" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">
            {/* background image */}
            <Header />
            <div style={{ backgroundImage: `url(${require('../images/img2.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br /><br /><br />

                {/* profile card */}
                <div className="card" style={{ width: '17rem', marginBottom: -250, marginLeft: 70, alignSelf: 'center' }}>
                    {/* Edit button */}

                    <br />
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setmodal(true); }} style={{ width: 18, height: 18, marginLeft: '240px', cursor: 'pointer' }} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>

                    <img src={image} alt="pp" key="{item.photo}" className="userpp"></img>


                    {/* Employee profile details */}
                    <br /> <br /><br />
                    <div style={{ alignSelf: 'center', marginBottom: 20 }}>

                        <>
                            <h5 key="{emp.name}" className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
                                <b>{emp.name}</b>
                            </h5>

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
                                Experience: {tenure} Years
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
                <div className="card" style={{ width: '14rem', marginLeft: 450, height: '100px' }}>
                    <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                        Primary Skill
                    </div>

                    <>
                        <p className="card-text" style={{ marginLeft: 10, color: 'green' }} key="{item.skill}">
                            <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, color: 'green', marginTop: 4 }}>
                                priority
                            </span>&nbsp;
                            {emp.skill_group}
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
            <br /><br /><br /><br /><br />

            {/*Feedback details section */}
            <h5 style={{ textAlign: 'center' }}> Time for feedback!</h5>
            <br />
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
            <button className="btn btn-success btn-sm" style={{ float: 'right', alignContent: 'center', cursor: 'pointer', marginRight: 200 }} onClick={() => { setmodal4(true); }}>
                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                    add
                </span>&nbsp;
            </button>
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
                                <th>Actions</th>
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
                                            <td>
                                                <button className="btn btn-light btn-sm" onClick={() => { seteditmodal4(true); selectProject(item.id) }}>
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
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/*Training details section */}
            <h5 style={{ textAlign: 'center' }}> Training  Details</h5>
            <button className="btn btn-success btn-sm" style={{ float: 'right', alignContent: 'center', cursor: 'pointer', marginRight: 200 }} onClick={() => { setmodal1(true); }}>
                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                    add
                </span>&nbsp;
            </button>
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
                                <th>Actions</th>
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
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/*POC details section */}
            <h5 style={{ textAlign: 'center' }}> POC  Details</h5>
            <button className="btn btn-success btn-sm" style={{ float: 'right', alignContent: 'center', cursor: 'pointer', marginRight: 200 }} onClick={() => { setmodal2(true); }}>
                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                    add
                </span>&nbsp;
            </button>
            <br /><br />
            <center>
                <div className="card" style={{ width: '61rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>POC name</th>
                                <th>Details</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empPocs.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.poc_name}</td>
                                            <td>{item.poc_details}</td>
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
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </center>
            <br /><br />


            {/* Skill details section */}
            <h5 style={{ textAlign: 'center' }}> Skill  Details</h5>
            <button className="btn btn-success btn-sm" style={{ float: 'right', alignContent: 'center', cursor: 'pointer', marginRight: 200 }} onClick={() => { setmodal3(true); }}>
                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                    add
                </span>&nbsp;
            </button>
            <br /><br />
            <center>
                <div className="card" style={{ width: '61rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Skill name</th>
                                <th>Details</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empSkills.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.details}</td>
                                            <td>
                                                <button className="btn btn-light btn-sm" onClick={() => { seteditmodal3(true); selectSkill(item.id) }}>
                                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                        edit
                                                    </span>
                                                </button>&nbsp;
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteSkill(item.id)}>
                                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                                        delete
                                                    </span>
                                                </button>
                                            </td>
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
                            </>
                        </div>

                        <div className="form-group col" style={{ marginLeft: 30, marginTop: 20, textAlign: 'justify' }}>
                            <>
                                <p>People Manager : {people_manager}</p>
                                <p>Base Location : {city}</p>
                                <p>Skill Group : {primary_skill_group}</p>
                                <p>Vertical Segment : {vertical_segment}</p>
                                <p>EGO : {ego}</p>
                            </>
                        </div>
                    </div>
                </div>
            </center>

            <br /><br />

            {/*Modal for profile */}
            <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                    Update Profile
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit}>
                        <ToastContainer />
                        <div>
                            <Link to={'/changepassword'}>Change Password</Link>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input disabled type="number" name="empid" value={edata} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Designation</label>
                            <div className="col-sm-9">
                                <input disabled type="text" name="designation" value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="form-control" id="colFormLabel" />
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
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Contact</label>
                            <div className="col-sm-9">
                                <input type="number" name="phone_number" value={phone_number} onChange={(e) => { setPhone_number(e.target.value) }} className="form-control" id="colFormLabel" />
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
                            <label htmlFor="exampleFormControlFile1" className="col-sm-3 col-form-label">Profile Photo</label>
                            <div className="col-sm-9">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="form-control"
                                    id="file1"
                                />
                            </div>
                        </div>
                        <br />
                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for Training */}
            <Modal size='me' isOpen={modal1} toggle={() => setmodal1(!modal1)}>
                <ModalHeader toggle={() => setmodal1(!modal1)}>
                    Add Training
                </ModalHeader>
                {/* aaa */}
                <ModalBody>
                    <form onSubmit={handlesubmit1}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Training Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="training_name" onChange={(e) => { setTraining_name(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Details</label>
                            <div className="col-sm-9">
                                <input type="text" name="training_details" onChange={(e) => { setTraining_details(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date"
                                    name="train_start_date" onChange={(e) => { setTrain_start_date(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="train_end_date"
                                    onChange={(e) => { setTrain_end_date(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Edit Modal for Training */}
            <Modal size='me' isOpen={editmodal1} toggle={() => seteditmodal1(!editmodal1)}>
                <ModalHeader toggle={() => seteditmodal1(!editmodal1)}>
                    Edit Training
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit1}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Training Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="training_name" value={training_name} onChange={(e) => { setTraining_name(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Trianing Details</label>
                            <div className="col-sm-9">
                                <input type="text" name="training_details" value={training_details} onChange={(e) => { setTraining_details(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="train_start_date" value={train_start_date} onChange={(e) => { setTrain_start_date(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="train_end_date" value={train_end_date} onChange={(e) => { setTrain_end_date(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for POC */}
            <Modal size='me' isOpen={modal2} toggle={() => setmodal2(!modal2)}>
                <ModalHeader toggle={() => setmodal2(!modal2)}>
                    Add POC
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit2}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">POC Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="pocName" onChange={(e) => { setPocName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Details</label>
                            <div className="col-sm-9">
                                <input type="text" name="pocDetails" onChange={(e) => { setPocDetails(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
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
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">POC Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="pocName" value={pocName} onChange={(e) => { setPocName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Details</label>
                            <div className="col-sm-9">
                                <input type="text" name="pocDetails" value={pocDetails} onChange={(e) => { setPocDetails(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for Skill */}
            <Modal size='me' isOpen={modal3} toggle={() => setmodal3(!modal3)}>
                <ModalHeader toggle={() => setmodal3(!modal3)}>
                    Add Skill
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit3}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Skill Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="skillName" onChange={(e) => { setSkillName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Details</label>
                            <div className="col-sm-9">
                                <input type="text" name="skillDetails" onChange={(e) => { setSkillDetails(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Edit Modal for POC */}
            <Modal size='me' isOpen={editmodal3} toggle={() => seteditmodal3(!editmodal3)}>
                <ModalHeader toggle={() => seteditmodal3(!editmodal3)}>
                    Update Skill
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit3}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Skill Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="skillName" value={skillName} onChange={(e) => { setSkillName(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Details</label>
                            <div className="col-sm-9">
                                <input type="text" name="skillDetails" value={skillDetails} onChange={(e) => { setSkillDetails(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Modal for Project */}
            <Modal size='me' isOpen={modal4} toggle={() => setmodal4(!modal4)}>
                <ModalHeader toggle={() => setmodal4(!modal4)}>
                    Add Project
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit4}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Employee Id</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    name="pro_employee_id"
                                    value={edata}
                                    readOnly
                                    onChange={(e) => { setPro_employee_id(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Name</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    name="project_name"
                                    onChange={(e) => { setProject_name(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Manager</label>
                            <div className="col-sm-9">
                                <input type="text"
                                    name="project_manager_name"
                                    onChange={(e) => { setProject_manager_name(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date"
                                    name="projce_start_date" onChange={(e) => { setProject_start_date(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="end_date"
                                    onChange={(e) => { setProject_end_date(e.target.value) }}
                                    className="form-control"
                                    id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* Edit Modal for Project */}
            <Modal size='me' isOpen={editmodal4} toggle={() => seteditmodal4(!editmodal4)}>
                <ModalHeader toggle={() => seteditmodal4(!editmodal4)}>
                    Update Project
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleeditsubmit4}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="project_name" value={project_name} onChange={(e) => { setProject_name(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Project Manager</label>
                            <div className="col-sm-9">
                                <input type="text" name="project_manager_name" value={project_manager_name} onChange={(e) => { setProject_manager_name(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Start Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="start_date" value={projce_start_date} onChange={(e) => { setProject_start_date(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">End Date</label>
                            <div className="col-sm-9">
                                <input type="date" name="pend_date" value={project_end_date} onChange={(e) => { setProject_end_date(e.target.value) }} className="form-control" id="colFormLabel" />
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

export default Employee
