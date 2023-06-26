import React from 'react'
import "../css/Employee.css"
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AutoComplete, Rate } from 'antd'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Header from './Header'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
//Displaying the data
const Employee = () => {
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
    //const [name, setName] = useState("");
    //const [designation, setDesignation] = useState("");
    const [doj, setDoj] = useState("");
    const [empid, setEmpid] = useState("");
    const empnum = empid;
    const [skill, setSkill] = useState("");
    const [primaryskill, setPrimarySkill] = useState("");
    const [training, setTraining] = useState("");
    //const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState("");
    const [userId, setUserId] = useState(null);
    const [localgrade, setLocalGrade] = useState("");
    const [peoplemanager, setPeopleManager] = useState("");

    const [bookingtype, setBookingType] = useState("");
    const [client, setClient] = useState("");
    const [baselocation, setBaseLocation] = useState("");
    const [segmentemployee, setSegmentEmployee] = useState("");
    const [elmapping, setELMapping] = useState("");
    const [skillgroup, setSkillGroup] = useState("");
    const [finalgrade, setFinalGrade] = useState("");
    // const [ego, setEGO] = useState("");
    // const [status, setStatus] = useState("");

    /// Employee Profile card
    const [profile, setProfile] = useState([])
    const [id, setId,] = useState("");
    const [employee, setEmployee,] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [location, setLocation] = useState("");
    const [designation, setDesignation] = useState("");
    const [image, setImage] = useState("");

    //Project employee done by 

    //Initializing for Project
    const [pstart_date, setPstartDate] = useState("");
    const [pend_date, setPendDate] = useState("");
    const [Pname, setPname] = useState("");
    const [manager_name, setManagerName] = useState("");




    const [review, setReview] = useState("");
    const [reviewer, setReviewerName] = useState("");
    const [reviewerdesignation, setReviewerDesignation] = useState("");
    const [reviewerphoto, setReviewerPhoto] = useState("");
    const [rating, setRating] = useState();
    const [managername, setManagerNameFeedback] = useState();
    const [feedbacktimestamp, setFeedbackTimeStamp] = useState(Date().toLocaleString());

    const [code, setCode] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [assignmentname, setAssignmentName] = useState("");
    const [projectmanager, setProjectManager] = useState("");
    const [assignmenttype, setAssignmentType] = useState("");

    const edata = localStorage.getItem("id")




    const [local_employee_id, setLocal_employee_id] = useState("");
    const [global_group_id, setGlobal_group_id] = useState("");
    const [name, setName] = useState("");
    const [local_grade, setLocal_grade] = useState("");
    const [people_manager, setPeople_manager] = useState("");
    const [joining_date, setJoining_date] = useState("");
    const [city, setCity] = useState("");
    const [primary_skill_group, setPrimary_skill_group] = useState("");
    const [upgraded_skill, setUpgraded_skill] = useState("");
    const [lml, setLml] = useState("");
    const [training_spoc, setTraining_spoc] = useState("");
    const [training_account, setTraining_account] = useState("");
    const [training_skill, setTraining_skill] = useState("");
    const [start_date, setStart_date] = useState("");
    const [training_end_date, setTraining_end_date] = useState("");
    const [before_training_rating, setBefore_training_rating] = useState("");
    const [rating_till_date, setRating_till_date] = useState("");
    const [remarks, setRemarks] = useState("");
    const [confidence_of_placement, setConfidence_of_placement] = useState("");
    const [status, setStatus] = useState("");
    const [account, setAccount] = useState("");
    const [bu, setBu] = useState("");
    const [udaan, setUdaan] = useState("");
    const [ego, setEgo] = useState("");
    const [averageRating, setAverageRating] = useState(0);
    //Fetching the data
    function getUsers() {
        fetch(`http://127.0.0.1:8000/api/employee/${edata}/`).then((result) => {
            result.json().then((resp) => {

                setData(resp)
                setLocal_employee_id(resp.local_employee_id)
                setGlobal_group_id(resp.setGlobal_group_id)
                setName(resp.name)
                setLocal_grade(resp.local_grade)
                setPeople_manager(resp.people_manager)
                setJoining_date(resp.joining_date)
                setCity(resp.city)
                setPrimary_skill_group(resp.primary_skill_group)
                setUpgraded_skill(resp.upgraded_skill)
                setLml(resp.lml)
                setTraining_spoc(resp.training_spoc)
                setTraining_account(resp.training_account)
                setTraining_skill(resp.training_skill)
                setStart_date(resp.start_date)
                setTraining_end_date(resp.training_end_date)
                setBefore_training_rating(resp.before_training_rating)
                setRating_till_date(resp.rating_till_date)
                setRemarks(resp.rating)
                setConfidence_of_placement(resp.confidence_of_placement)
                setStatus(resp.status)
                setAccount(resp.account)
                setBu(resp.bu)
                setEgo(resp.ego)
                setUdaan(resp.udaan)

                // alert(resp.name)
            })
        })
    }
    // alert(data);
    //capturing value of status and converting it to string
    //const stat = status.toString();

    //Modal popup
    const [modal, setmodal] = useState(false)

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

    //Fetching userprofiles
    function getUserProfile() {
        fetch(`http://127.0.0.1:8000/api/empprofiles/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setProfile(resp);
                setId(resp.employee);
                setEmployee(resp.id)
                setPhone_number(resp.phone_number)
                setLocation(resp.location)
                setDesignation(resp.designation)
                const baseUrl = "http://127.0.0.1:8000"

                const addedUrl = (resp.image)
                const mainURL = baseUrl + addedUrl
                console.log(mainURL)
                setImage(mainURL)
                //setImage(resp.image)
            })
        })
    }

    const [Mname, setMname] = useState([])
    useEffect(() => {
        getManager(id);
    }, [])
    function getManager(id) {
        fetch(`http://127.0.0.1:8000/api/manager/${id}`).then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp)
                setMname(resp.name)
                setManager_id(resp.id)
            })
        })
    }

    // const mngr = localStorage.getItem("manager")
    // JSON.stringify(mngr);
    // console.log(mngr.id);

    const [manager_id, setManager_id] = useState()
    const [fresher_id, setFresher_id] = useState(edata)
    const [reply, setReply] = useState("")
    const [feedback, setFeedback] = useState("")
    const [created_at, setCreatedAt] = useState("");
    const [file, setFile] = useState("")


    //Fetching userfeedbacks
    function getUserFeedback() {
        fetch(`http://127.0.0.1:8000/api/empfeedbacks/${edata}`).then((result) => {
            result.json().then((resp) => {
                //console.log("result",resp
                setUserFeedback(resp)
                calculateAverageRating(resp);
            })
        })
    }
    function calculateAverageRating(feedbackData) {
        const ratings = feedbackData.map((feedback) => feedback.rating);
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        const average = sum / ratings.length;
        const averageOneDecimal = average.toFixed(1); // Round to one decimal place
        setAverageRating(parseFloat(averageOneDecimal));
      }

    const [projects, setProjects] = useState([])
    //Fetching the user projects
    function getUserProject() {
        fetch(`http://127.0.0.1:8000/api/empprojects/${edata}/`).then((result) => {
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
    const dojdate = doj
    var date2 = new Date(joining_date)
    var jd = new Date(joining_date).toLocaleDateString();

    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    var tenure = (Difference_In_Days / 360).toFixed(1)

    //Validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (doj === null || doj === '') {
            isproceed = false;
            errormessage += ' Date of Birth';
        }
        if (primaryskill === null || primaryskill === '') {
            isproceed = false;
            errormessage += ' Skill';
        }
        if (skill === null || skill === '') {
            isproceed = false;
            errormessage += ' Skill';
        }
        if (training === null || training === '') {
            isproceed = false;
            errormessage += ' Training';
        }
        if (phone === null || phone === '') {
            isproceed = false;
            errormessage += ' Contact';
        }
        if (location === null || location === '') {
            isproceed = false;
            errormessage += ' Location';
        }

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid name')
            }
            //   if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(doj)) {

            //   } else {
            //     isproceed = false;
            //     toast('Please enter a valid date of birth')
            //   }
            if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(primaryskill)) {

            } else {
                isproceed = false;
                toast('Please enter a valid primary skill')
            }
            if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(skill)) {

            } else {
                isproceed = false;
                toast('Please enter a valid skill')
            }
            if (/^(([',. -][a-zA-Z ])?[a-zA-Z]*)+[0-9]*$/.test(training)) {

            } else {
                isproceed = false;
                toast('Please enter a valid training')
            }
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{4,4}$/.test(phone)) {

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

    //Updating the data
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = {
            name, designation, doj, empid, skill, primaryskill, training, location, phone, photo,
            localgrade, peoplemanager, startdate, enddate, bookingtype,
            client, baselocation, segmentemployee, elmapping, skillgroup, finalgrade,
            ego, status, review, reviewer, reviewerdesignation, reviewerphoto, feedbacktimestamp,
            rating, code, assignmenttype, assignmentname, projectmanager
        };
        if (IsValidate()) {
            //console.log(regobj);

            fetch(` http://127.0.0.1:8000/employee/${userId}`, {
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





    //New code(for add, update delete skills, traings, poc and projects)

    //Modal popup for add and edit
    const [modal1, setmodal1] = useState(false)
    const [modal2, setmodal2] = useState(false)
    const [modal3, setmodal3] = useState(false)
    const [modal4, setmodal4] = useState(false)
    const [modal5, setmodal5] = useState(false)

    //Edit Modal Popup
    const [editmodal1, seteditmodal1] = useState(false)
    const [editmodal2, seteditmodal2] = useState(false)
    const [editmodal3, seteditmodal3] = useState(false)
    const [editmodal4, seteditmodal4] = useState(false)

    //Initializing fields
    const [details, setDetails] = useState("");

    //Setting user trainings
    const [usertraining, setUserTraining] = useState([])
    useEffect(() => {
        getUserTraining();
    }, [])

    //Fetching the user trainings
    function getUserTraining() {
        fetch(`http://127.0.0.1:8000/api/emptrainings/${edata}/`).then((result) => {
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


    //aaaa
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

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {


            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(training_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid training name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(training_details)) {

            } else {
                isproceed = false;
                toast('Please enter a valid Details')
            }

        }
        return isproceed;
    }
    //bbb
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
            //console.log(regobj);

            fetch("http://127.0.0.1:8000/api/trainings/", {
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
        alert(item.employee_id)
    }
    //bbbb
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
            //console.log(regobj);

            fetch(`http://127.0.0.1:8000/api/trainings/${training_id}/`, {
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
        fetch(`http://127.0.0.1:8000/api/trainings/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
                alert("Training with id " + id + " is deleted")
                getUserTraining();
            })
        })
    }


    //Setting user pocs
    const [userpoc, setUserPoc] = useState([])
    useEffect(() => {
        getUserPoc();
    }, [])

    //Fetching the user pocs
    function getUserPoc() {
        fetch(`http://127.0.0.1:8000/api/emppocs/${edata}/`).then((result) => {
            result.json().then((resp) => {
                console.log("result", resp)
                setUserPoc(resp)
            })
        })
    }

    const empPocs = userpoc;
    console.log("poc", userpoc)

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


            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(pocName)) {

            } else {
                isproceed = false;
                toast('Please enter a valid poc name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(pocDetails)) {

            } else {
                isproceed = false;
                toast('Please enter a valid guide')
            }

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
            //console.log(regobj);

            fetch("http://127.0.0.1:8000/api/pocs/", {
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
            //console.log(regobj);

            fetch(`http://127.0.0.1:8000/api/pocs/${pocId}/`, {
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
        fetch(`http://127.0.0.1:8000/api/pocs/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
                alert("POC with id " + id + " is deleted")
                getUserPoc();
            })
        })
    }

    const IsValidate3 = () => {
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


            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(pocName)) {

            } else {
                isproceed = false;
                toast('Please enter a valid poc name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(pocDetails)) {

            } else {
                isproceed = false;
                toast('Please enter a valid guide')
            }

        }
        return isproceed;
    }

    //Setting user skill
    const [userskill, setUserSkill] = useState([])
    useEffect(() => {
        getUserSkill();
    }, [])

    //Fetching the user skill
    function getUserSkill() {
        fetch(`http://127.0.0.1:8000/api/empskills/${edata}/`).then((result) => {
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


            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(skillName)) {

            } else {
                isproceed = false;
                toast('Please enter a valid poc name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(skillName)) {

            } else {
                isproceed = false;
                toast('Please enter a valid guide')
            }

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
            //console.log(regobj);

            fetch("http://127.0.0.1:8000/api/skils/", {
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

    //xxxx

    //Edit Skill
    const handleeditsubmit3 = (e) => {
        e.preventDefault();
        let name = skillName
        let details = skillDetails
        let emp_id = emp_id_skill
        let regobj = { emp_id, name, details };


        if (IsValidate9()) {
            //console.log(regobj);

            fetch(`http://127.0.0.1:8000/api/skils/${skillId}/`, {
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
        fetch(`http://127.0.0.1:8000/api/skils/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
                alert("POC with id " + id + " is deleted")
                getUserPoc();
            })
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

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {
            if (/^[(]?[0-9]{3}[)]?[0-9]{3}[0-9]{2}$/.test(pro_employee_id)) {

            } else {
                isproceed = false;
                toast('Please enter a valid empid')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(project_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid project name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(project_manager_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid project manager')
            }

        }
        return isproceed;
    }

    const IsValidate5 = () => {
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

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {


            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(project_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid project name')
            }

            if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(project_manager_name)) {

            } else {
                isproceed = false;
                toast('Please enter a valid project manager')
            }

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
            //console.log(regobj);

            fetch("http://127.0.0.1:8000/api/projects/", {
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

        if (IsValidate5()) {
            //console.log(regobj);

            fetch(`http://127.0.0.1:8000/api/empproject/${project_id}/`, {
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

    //getmanager
    async function getmanager(id) {
        try {
            const result = await fetch(`http://localhost:8000/api/manager/${id}/`, {
                method: 'GET',
            });
            const resp = await result.json();
            console.log("name of manager", resp.name);
            return resp.name;
        } catch (error) {
            throw error;
        }
    }

    //Delete Project
    function deleteProject(id) {
        fetch(`http://localhost:8000/api/empproject/${id}/`, {
            method: 'DELETE',
        }).then((result) => {
            result.json().then((resp) => {
                if (resp.status === 204)
                    alert("Project with id " + id + " is deleted")
                getUserProject();
                console.log(resp)
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
        

        if (!isproceed) {
            toast.error(errormessage)
        }
        else {


        }
        return isproceed;
    }
    // Retrieve the string from LocalStorage
    const jsonString = localStorage.getItem('manager');
    // Parse the string into a JSON object
    const jsonObject = JSON.parse(jsonString);
    const mgid = jsonObject.id;
    let fileInput = null; // Reference to the file input element
    // Function to handle file input change event
    const handleFileInputChange = (event) => {
    fileInput = event.target.files[0]; // Get the selected file
    };
    //Assigning the feedback
    //Assigning the feedback

    const handlesubmit5 = (e) => {

        e.preventDefault();
        // Create a new FormData object
        const formdata = new FormData();
        // Append form fields to the FormData object
        formdata.append('fresher_id', edata);
        formdata.append('manager_id', mgid);
        formdata.append('feedback', feedback);
        formdata.append('rating', rating);
        // formdata.append('created_at', created_at);
        
                
        // Append the file to the FormData object
        formdata.append('file', fileInput);
         if (IsValidate6()) {
            fetch('http://127.0.0.1:8000/api/feedback/', {
            method: 'POST',
            body: formdata
            })
            .then((res) => {
            toast.success('Feedback given successfully');
            setTimeout(() => {
            setmodal(false);
            }, 5000);
            })
            .catch((err) => {
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






    //Code
    return (
        <div className="container1" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">
            {/* background image */}
            <Header />
            {/* <center><img src={require('../images/img1.png')} alt="cg logo" style={{ width: 300, height: 70 }}></img></center> */}
            <div style={{ backgroundImage: `url(${require('../images/img2.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br /><br /><br />

                {/* profile card */}
                <div className="card" style={{ width: '17rem', marginBottom: -250, marginLeft: 70, alignSelf: 'center' }}>
                    {/* Edit button */}
                    {
                        // data.map((item) => (
                        <>
                            
                        </>
                        // ))
                    }
                    <img src={image} alt="pp" key="{item.photo}" className="userpp"></img>


                    {/* Employee profile details */}
                    <br /> <br /><br />
                    <div style={{ alignSelf: 'center', marginBottom: 20 }}>

                        <>
                            <h5 key="{emp.name}" className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
                                <b>{emp.name}</b>
                            </h5>

                            {/* Status of the employee (1-Project, 2-Shadow, 3-Training, 4-Bench) */}


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
                                {tenure}y
                            </h6>
                            <h6 key="{item.location}" className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                    location_on
                                </span>&nbsp;
                                {city}
                            </h6>
                            <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                            <Rating name="read-only" value={averageRating} readOnly />
                                {averageRating}
                            </h6>

                        </>
                    </div>
                </div>


                {/* <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 23, height: 23, marginLeft: 185, cursor: 'pointer', zindex:-1, position:'relative' }} fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg> */}
                <br />
            </div>
            <div style={{  display: 'flex', marginTop: '10px' }}>
            {/* Primary Skills card */}
            <br />
            <div className="card" style={{ width: '14rem', marginLeft: 450, height: '100px' }}>
                <div className="card-header" style={{ backgroundColor: '#f0f0f5' }}>
                    Primary Skill
                    {/* <span className="material-symbols-outlined" style={{ float: 'right', fontSize: 18, marginTop: 2, cursor: 'pointer' }}>
                        edit
                    </span>&nbsp; */}
                </div>

                <>
                    <p className="card-text" style={{ marginLeft: 10, color: 'green' }} key="{item.skill}">
                        <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, color: 'green', marginTop: 4 }}>
                            priority
                        </span>&nbsp;
                        {emp.training_skill}
                    </p>
                </>
            </div>
            <div className="card" style={{ marginLeft: '10px', width: '30rem'}}>
                {/*Skill details section */}
                <h5 className="card-header" style={{ backgroundColor: '#f0f0f5', padding: '5px' }}> Skill  Details</h5>
                <center>
                    <div className="" style={{  }}>
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
                                    return (null)
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
                    <h4 style={{color: 'yellow',backgroundColor: 'black', padding: '4px' }}>Overall Rating: {averageRating}</h4>
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
                                getManager(item.manager_id)
                                

                                return (
                                    <>
                                        <tr>

                                            <td>{Mname}</td>
                                            <td>{item.feedback}</td>
                                            <td><Rating name="read-only" value={item.rating} readOnly /></td>

                                            <td>
                                            
                                                <a href={"http://localhost:8000" + item.file } download>
                                                    
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
                                return (null)
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
                                return (null)
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
                                return (null)
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
                                return (null)
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
                                return (null)
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
                                <p>DOJ : {emp.joining_date}</p>
                                <p>Local Grade : {local_grade}</p>
                                <p>People Manager : {people_manager}</p>
                                <p>Primary Skill : {primary_skill_group}</p>
                                <p>Udaan Status : {udaan}</p>
                            </>


                        </div>

                        <div className="form-group col" style={{ marginLeft: 30, marginTop: 20, textAlign: 'justify' }}>

                            <>
                                <p>LML : {lml}</p>
                                <p>Base Location : {emp.city}</p>
                                <p>Segment Employee CT : {emp.name}</p>
                                <p>Account : {account}</p>
                                <p>Skill Group : {emp.name}</p>
                                <p>BU : {bu}</p>
                                <p>EGO : {emp.ego}</p>
                            </>

                        </div>
                    </div>
                </div>
            </center>

            <br /><br />

            {/*Modal data */}
            <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                    Update your Profile
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Empid</label>
                            <div className="col-sm-9">
                                <input disabled type="number" name="empid" value={empid} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
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
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Skill</label>
                            <div className="col-sm-9">
                                <input type="text" name="skill" value={skill} onChange={(e) => { setSkill(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Trainings/POC</label>
                            <div className="col-sm-9">
                                <input type="text" name="training" value={training} onChange={(e) => { setTraining(e.target.value) }} className="form-control" id="colFormLabel" />
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
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Location</label>
                            <div className="col-sm-9">
                                <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} className="form-control" id="colFormLabel" />
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

                            <input type="file" id="fileInput" onChange={handleFileInputChange} />

                            </div>
                        </div>

                        {/* <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Feedback Created at</label>
                            <div className="col-sm-9">
                                <input type="text"
                                name="created_at" 
                                value = {created_at}
                                readOnly
                                onChange={(e) => { setCreatedAt(e.target.value) }} 
                                className="form-control"
                                 id="colFormLabel" />
                            </div>
                        </div> */}

                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Add</button>
                    </form>
                </ModalBody>
            </Modal>

        </div>
    )
}

export default Employee
