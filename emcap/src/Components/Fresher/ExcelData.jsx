import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import { stripBasename } from '@remix-run/router';

export default function ExcelDataPage() {

  const [data, setData] = useState([])
  useEffect(() => {
    getUsers();
  }, [])
  const emp = data;

  const edata = localStorage.getItem("id");

  const [name, setName] = useState("");
  const [local_employee_id, setLocal_employee_id] = useState("");
  const [global_group_id, setGlobal_group_id] = useState("");
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
  const [segmentemployee, setSegmentEmployee] = useState("");
  const [skillgroup, setSkillGroup] = useState("");
  const [bu, setBu] = useState("");
  const [udaan, setUdaan] = useState("");
  const [ego, setEgo] = useState("");
  const [modal, setmodal] = useState(false);
  const [userId, setUserId] = useState(null);



  //Fetching the data
  function getUsers() {
    fetch(`http://127.0.0.1:8000/api/employee/${edata}/`).then((result) => {
      result.json().then((resp) => {

        setData(resp)
        setLocal_employee_id(resp.local_employee_id)
        setGlobal_group_id(resp.setGlobal_group_id)
        setLocal_grade(resp.local_grade)
        setPeople_manager(resp.people_manager)
        setName(resp.name)
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
      })
    })
  }


 //Validation
 const IsValidate = () => {
  let isproceed = true;
  let errormessage = 'Please enter the value in ';

//   if (people_manager === null || people_manager === '') {
//       isproceed = false;
//       errormessage += ' Fullname';
//   }
 

  if (!isproceed) {
      toast.error(errormessage)
  }
  else {
    //   if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(people_manager)) {

    //   } else {
    //       isproceed = false;
    //       toast('Please enter a valid name')
    //   }
      
  }
  return isproceed;
}

  //Updating the data
  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { local_employee_id,global_group_id, local_grade, people_manager, 
      primary_skill_group, lml, account, bu, udaan, ego, name };

    if (IsValidate()) {
        fetch(`http://127.0.0.1:8000/api/employee/${edata}/`, {
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
        }).catch((err) => {
            toast('Failed :' + err.message);
        });
    }
}
  return (
    <div>
      {/*More details section */}
      <br />
      <h5 style={{ textAlign: 'center' }}>Additional Employee Details</h5>
      <br />

      {/* Edit button */}
      <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setmodal(true); }} style={{ width: 18, height: 18, float: 'right', marginRight: '100px', cursor: 'pointer' }} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
      </svg>
      <br/>

      <center>
        <div className="card" style={{ width: '61rem', backgroundColor: '#f0f0f5' }}>
          <div className="form-group row">
            <div className="form-group col" style={{ marginLeft: 40, marginTop: 20, textAlign: 'justify' }}>
              <>
                <p>LID : {local_employee_id}</p>
                <p>GID : {global_group_id}</p>
                <p>DOJ : {joining_date}</p>
                <p>Local Grade : {local_grade}</p>
                <p>People Manager : {people_manager}</p>
                <p>Primary Skill : {primary_skill_group}</p>
                <p>Udaan Status : {udaan}</p>
              </>
            </div>

            <div className="form-group col" style={{ marginLeft: 30, marginTop: 20, textAlign: 'justify' }}>
              <>
                <p>LML : {lml}</p>
                <p>Base Location : {city}</p>
                <p>Segment Employee CT : {segmentemployee}</p>
                <p>Account : {account}</p>
                <p>Skill Group : {skillgroup}</p>
                <p>BU : {bu}</p>
                <p>EGO : {ego}</p>
              </>

            </div>
          </div>
        </div>
      </center>
      <br /><br />

       {/*Modal data */}
       <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                    Update Excel Data
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handlesubmit}>
                        <ToastContainer />
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">LID</label>
                            <div className="col-sm-9">
                                <input type="text" name="local_employee_id" value={local_employee_id} onChange={(e) => { setLocal_employee_id(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">GID</label>
                            <div className="col-sm-9">
                                <input type="text" name="global_group_id" value={global_group_id} onChange={(e) => { setGlobal_group_id(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">DOJ</label>
                            <div className="col-sm-9">
                                <input type="text" name="doj" value={joining_date} onChange={(e) => { setJoining_date(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Local Grade</label>
                            <div className="col-sm-9">
                                <input type="text" name="local_grade" value={local_grade} onChange={(e) => { setLocal_grade(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">People Manager</label>
                            <div className="col-sm-9">
                                <input type="text" name="people_manager" value={people_manager} onChange={(e) => { setPeople_manager(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Primary Skill</label>
                            <div className="col-sm-9">
                                <input type="text" name="primary_skill_group" value={primary_skill_group} onChange={(e) => { setPrimary_skill_group(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Udaan Status</label>
                            <div className="col-sm-9">
                                <input type="text" name="udaan" value={udaan} onChange={(e) => { setUdaan(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">LML</label>
                            <div className="col-sm-9">
                                <input type="text" name="lml" value={lml} onChange={(e) => { setLml(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Base Location</label>
                            <div className="col-sm-9">
                                <input type="text" name="city" value={city} onChange={(e) => { setCity(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Segment Employee CT</label>
                            <div className="col-sm-9">
                                <input type="text" name="segmentemployee" value={segmentemployee} onChange={(e) => { setSegmentEmployee(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Account</label>
                            <div className="col-sm-9">
                                <input type="text" name="account" value={account} onChange={(e) => { setAccount(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">Skill Group</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" value={skillgroup} onChange={(e) => { setSkillGroup(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">BU</label>
                            <div className="col-sm-9">
                                <input type="text" name="bu" value={bu} onChange={(e) => { setBu(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-3 col-form-label">EGO</label>
                            <div className="col-sm-9">
                                <input type="text" name="ego" value={ego} onChange={(e) => { setEgo(e.target.value) }} className="form-control" id="colFormLabel" />
                            </div>
                        </div>
                        <br />


                        <br />

                        <button className='btn btn-success' type="submit" style={{ marginLeft: 388 }}>Update</button>
                    </form>
                </ModalBody>
            </Modal>
    </div>
  );
}