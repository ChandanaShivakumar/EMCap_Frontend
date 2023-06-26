import * as React from 'react';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Rating from '@mui/material/Rating';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function FeedbackPage() {

    const edata = localStorage.getItem("id");
    const mngr = JSON.parse(localStorage.getItem("manager"));
    const [modal, setmodal] = useState(false);
    const [modal5, setmodal5] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState();
    const [managerName, setManagerName] = useState(mngr.name);
    const [manager_id, setManager_id] = useState(mngr.id);
    const [fresher_id, setFresher_id] = useState(edata);
    const [averageRating, setAverageRating] = useState(0);
    const [userfeedback, setUserFeedback] = useState([])
    useEffect(() => {
        getUserFeedback();
    }, [])


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

    let fileInput = null;

    const handleFileInputChange = (event) => {
        fileInput = event.target.files[0];
    };


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

    return (
        <div>
            {/*Feedback details section */}
            <br />
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
                                // getManager(item.manager_id)


                                return (
                                    <>
                                        <tr>

                                            <td>{item.manager_name}</td>
                                            <td>{item.feedback}</td>
                                            <td><Rating name="read-only" value={item.rating} readOnly /></td>

                                            <td>

                                                <a href={"http://localhost:8000" + item.file} download>

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
    );
}