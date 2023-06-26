import * as React from 'react';
import { useEffect, useState } from 'react';
import Header from '../Header';
import moment from 'moment';
import { ReactComponent as GithubLogo } from './icons8.svg';
import { ReactComponent as TeamsLogo } from './icons9.svg';
import { ReactComponent as MailLogo } from './icons10.svg';
import FresherHeader from './FresherNav';
import "./Fresher.css"
import * as microsoftTeams from "@microsoft/teams-js";
import Rating from '@mui/material/Rating';



export default function NewFreshersPage() {

    const edata = localStorage.getItem("id")
    const [data, setData] = useState([])

    useEffect(() => {
        getUsers();
    }, [])

    const emp = data;

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
    const experience = moment(joining_date).fromNow(true);
    const [averageRating, setAverageRating] = useState(0);

    const [userfeedback, setUserFeedback] = useState([])

    useEffect(() => {
        getUserFeedback();
    }, [])

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

    useEffect(() => {
        getUserProfile();
    }, [])

    //Employee Profile card
    const [profile, setProfile] = useState([])
    const [id, setId,] = useState("");
    const [employee, setEmployee] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [location, setLocation] = useState("");
    const [designation, setDesignation] = useState("");
    const [image, setImage] = useState("");
    const [photo, setPhoto] = useState("");

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

    //Fetching user profiles
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
                //console.log(mainURL)
                setImage(mainURL)
                //setImage(resp.image)
            })
        })
    }

    //Fetching the data
    async function getUsers() {
        await fetch(`http://127.0.0.1:8000/api/employee/${edata}/`).then((result) => {
            result.json().then((resp) => {
                setData(resp)
                setLocal_employee_id(resp.local_employee_id)
                setGlobal_group_id(resp.setGlobal_group_id)
                setName(resp.name)
                setImage(image)
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
                //response is {"local_employee_id":"46269486","global_group_id":"46269486.0","name":"Mainuddin Md (mmainudd)","local_grade":"A5","people_manager":"Sangwan Anuradha (ansangwa)","joining_date":"2022-09-06 00:00:00","city":"nan","primary_skill_group":"(T) Web Development Technologies","final_skillset":"Front end","overall_status":"LML training","upgraded_skill":"nan","lml":"nan","training_spoc":"LML Vaishali Kasture","training_account":"nan","training_skill":"Angular","start_date":"2023-03-16 00:00:00","training_end_date":"2023-04-18 00:00:00","before_training_rating":null,"rating_till_date":null,"remarks":"nan","confidence_of_placement":"nan","status":"Bench","account":" ","bu":"SOI-1","ego":"Anjali","udaan":"No"}
            })
        })
    }

    // handle the contact button 
    const handleButtonClick = () => {
        const mailto = 'mailto:chirag.awasthi@capgemini.com?subject=Need to talk&body=Hi Chirag';
        window.location.href = mailto;
    };

    const navigateToPersonPage = (email) => {
        const deepLink = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
        window.open(deepLink);
    };


    const handleNavigateClick = () => {
        const email = 'chandana.s-gowda@capgemini.com';
        navigateToPersonPage(email);
    };



    return (
        <div className='main'>
            <div  style={{ width: "100%", height: 'calc(100vh - 45px)', display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* left div  */}
                <div className="font-link" style={{ width: "50%", height: "100%", marginLeft: "3%", display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column' }}>
                    <h4>Hi,</h4>
                    <h4>
                        I am <span style={{ color: 'blue' }}>{name}</span>
                    </h4>

                    <h4 style={{ maxwidth: "100%" }}>My Skills are : <span style={{ color: 'blue' }}>{primary_skill_group}</span> </h4>
                    <h4>Developer with  <span style={{ color: 'blue' }}>{experience}</span></h4>
                    <h4>of Experience.</h4>

                    <br/>
                    <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                        <Rating name="read-only" value={averageRating} readOnly />
                        {averageRating}
                    </h6>

                    {/* <button style={{ backgroundColor: 'white', color: 'black', padding: '10px', borderRadius: '20px', border: 'none', width: '35%', boxShadow: '-10px 5px 5px black', marginTop: '20px' }} onClick={handleButtonClick}>Send Email</button> */}
                    <br />
                    <div className="row">
                        <div className="col">
                            <h4><a onClick={handleButtonClick}><MailLogo style={{ width: '25px', height: '25px' }} /></a> </h4>
                        </div>

                        <div className="col" style={{ marginLeft: "-500px" }}>
                            <h4><a onClick={handleNavigateClick}><TeamsLogo style={{ width: '25px', height: '25px' }} /></a> </h4>
                        </div>

                        <div className="col" style={{ marginLeft: "-500px" }}>
                            <h4><a href="https://github.com/yourusername" target="_blank"><GithubLogo style={{ width: '25px', height: '25px' }} /></a> </h4>
                        </div>
                    </div>

                </div>

                {/* right div */}
                <div style={{ width: "50%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={image} alt="p" key="{item.photo}" className="userphoto"></img>
                </div>

            </div>
        </div>
    );
}
