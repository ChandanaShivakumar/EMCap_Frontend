import React, { useRef } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Header from './Header'
import Pagination from 'react-paginate';
import '../css/Paginate.css';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
//Displaying the manager data
const Manager = () => {

    const manager = JSON.parse(localStorage.getItem('manager'));
    const user = JSON.parse(localStorage.getItem('user'));

    const baseUrl = "https://emcapg.azurewebsites.net"
    const addedUrl = manager.image
    const mainURL = baseUrl + addedUrl

    const token = localStorage.getItem('token');


    const [data, setData] = useState([])
    useEffect(() => {
        getManagers();
    }, [])


    const [searchTerm, setSearchTerm] = useState({
        id: '',
        name: '',
        localgrade: '',
        psg: '',
        ego: '',
        people_manager: '',
        billability: '',
        city: '',

        // Add more search fields for other columns
    });
    const [userdata, setUserData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            [name]: value,
        }));
    };
    const handleExportToExcel = () => {
        const worksheet = utils.json_to_sheet(filteredData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Employees');
        const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'employee_data.xlsx');
    };

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 50;



    //Initializing the data
    const [name, setName] = useState("");
    const [employee_id, setEmpid] = useState("");
    const [image, setPhoto] = useState("");
    const [userId, setUserId] = useState(null);
    const [inputt, setInput] = useState("");


    //Fetching the manager data
    function getManagers() {

        setData(manager)
        setName(manager.name)
        setEmpid(manager.employee_id)
        setUserId(manager.user)
        setPhoto(manager.image)

    }

    //Modal popup
    const [modal, setmodal] = useState(false)

    //Populating the data
    function selectUser() {
        let item = data;
        setName(item.name)
        setEmpid(item.employee_id);
        setUserId(item.id)
        setPhoto(item.image);
    }

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    //Fetching the Employee data
    function getUsers() {
        fetch("https://emcapg.azurewebsites.net/api/employees/").then((result) => {
            result.json().then((resp) => {

                setUserData(resp)
                setName(resp[0].name)
                setEmpid(resp[0].empid)
                setUserId(resp[0].userId)
                setPhoto(resp[0].photo)
            })
        })
    }

    //Validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';

        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
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

        }
        return isproceed;
    }

    //Updating the data
    const handlesubmit = async (e) => {
        e.preventDefault();
        let regobj = { name, employee_id, image, user };
        if (IsValidate()) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("employee_id", employee_id);
            formData.append("image", image);

            try {
                // send a PUT request to the API using fetch or axios (replace API_ENDPOINT with the actual URL)
                const response = await fetch(`https://emcapg.azurewebsites.net/api/manager/${manager.id}/`, {
                    method: "PUT",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`, // replace token with the actual JWT token
                    },
                });

                if (response.ok) {
                    // if the response is successful, display a success message
                    const managerRes = await axios.get(`https://emcapg.azurewebsites.net/api/manager/user/${user.id}/`);

                    localStorage.removeItem('manager');
                    localStorage.setItem('manager', JSON.stringify(managerRes.data));

                    toast.success("Employee details updated successfully.");
                } else {
                    // if the response is not successful, display an error message
                    toast.error("Failed to update employee details.");
                }
            } catch (error) {
                // if an error occurs during the API call, display an error message
                toast.error("Failed to update employee details.");
                console.error(error);
            }
        }
    }

    // const [userdata, setUserData] = useState([])

    const filteredData = userdata.filter((item) => {
        return (

            (item.local_employee_id.toLowerCase().includes(searchTerm.id.toLowerCase())) &&
            (item.name?.toLowerCase() || '').includes(searchTerm.name.toLowerCase()) &&
            (item.local_grade?.toLowerCase() || '').includes(searchTerm.localgrade.toLowerCase()) &&
            (item.skill_group?.toLowerCase() || '').includes(searchTerm.psg.toLowerCase()) &&
            (item.billability?.toLowerCase() || '').includes(searchTerm.billability.toLowerCase()) &&
            (item.ego?.toLowerCase() || '').includes(searchTerm.ego.toLowerCase()) &&
            (item.people_manager?.toLowerCase() || '').includes(searchTerm.people_manager.toLowerCase()) &&
            (item.city?.toLowerCase() || '').includes(searchTerm.city.toLowerCase())
            // Add more conditions for other columns
        );
    });

    const pageCount = Math.ceil(filteredData.length / usersPerPage);

    const tableRef = useRef(null);

    //Code
    return (
        <div className="container1" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">
            <Header /> 
            {/* Background image */}

            <div style={{ backgroundImage: `url(${require('../images/img4.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <br />



                {/* Profile card */}
                <div className="card" style={{ width: '17rem', marginBottom: -180, marginLeft: 70, alignSelf: 'center' }}>
                    {/* Edit button */}
                    {

                        <>
                            <br />
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setmodal(true); selectUser() }} style={{ width: 18, height: 18, position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </>


                    }

                    {/* Profile photo */}
                    <img src={mainURL} alt="pp" key="{item.photo}" className="userpp"></img>




                    {/* Manager profile details */}
                    <br /> <br /><br />
                    <div style={{ alignSelf: 'center', marginBottom: 20 }}>
                        {

                            <>


                                <h5 key="{item.name}" className="card-title" style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: 20 }}>
                                    <b>{manager.name}</b>
                                </h5>

                                <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                        badge
                                    </span>&nbsp;
                                    {user.id}
                                </h6>
                                <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>
                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18 }}>
                                        Email
                                    </span>&nbsp;
                                    {user.email}
                                </h6>
                                <h6 className="card-text" style={{ fontWeight: 'lighter', fontSize: 15 }}>

                                    {user.role_id === 2 ? 'Manager' : ''}
                                </h6>
                            </>
                        }
                    </div>

                </div>
                <br />
            </div>

            {/* Adjustments Required */}
            <br /><br /><br /><br /><br />
            <Link to="/movedfreshers" className="btn btn-primary" style={{ float: 'right' }}>
                Moved Freshers
            </Link><br />
            <br />

            {/* Search Component */}
            <h5 style={{ textAlign: 'center' }}>Employee Data</h5>
            <hr />

            {/* Download button */}
            <div className="row">
                <button className="btn btn-primary" onClick={handleExportToExcel}>Export to Excel</button>
            </div>


            <br /><br />
            <nav>
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <button class="page-link" disabled={pageNumber === 0} onClick={() => setPageNumber(pageNumber - 1)}>
                            Previous
                        </button>
                    </li>
                    {[...Array(pageCount)].map((_, index) => (
                        <li key={index} class={`page-item ${pageNumber === index ? 'active' : ''}`}>
                            <button class="page-link" onClick={() => setPageNumber(index)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li class="page-item">
                        <button

                            class="page-link"
                            disabled={pageNumber === pageCount - 1}
                            onClick={() => setPageNumber(pageNumber + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
            <p>Search by :</p>
            <table >
                <thead>
                    <tr>
                        <th><input type="number" name="id"
                            value={searchTerm.id}
                            onChange={handleInputChange}
                            placeholder="Emp Id" style={{ width: '83px' }}
                        />
                        </th>
                        <th>
                            <input type="text" name="name"
                                value={searchTerm.name}
                                onChange={handleInputChange}
                                placeholder="Name" style={{ width: '285px' }}
                            />
                        </th>
                        <th>
                            <input type="text" name="localgrade"
                                value={searchTerm.localgrade}
                                onChange={handleInputChange}
                                placeholder="Designation" style={{ width: '104px' }}
                            />
                        </th>
                        <br />
                        <th>
                            <input type="text" name="psg"
                                value={searchTerm.psg}
                                onChange={handleInputChange}
                                placeholder="Skill" style={{ width: '322px' }}
                            />
                        </th>
                        <th>
                            <input type="text" name="people_manager"
                                value={searchTerm.people_manager}
                                onChange={handleInputChange}
                                placeholder="People Manager" style={{ width: '115px' }}
                            />
                        </th>
                        <th>
                            <input type="text" name="ego"
                                value={searchTerm.ego}
                                onChange={handleInputChange}
                                placeholder="EGO" style={{ width: '115px' }}
                            />
                        </th>
                        <th>
                            <input type="text" name="city"
                                value={searchTerm.city}
                                onChange={handleInputChange}
                                placeholder="City" style={{ width: '86px' }}
                            />
                        </th>
                        <th>
                            <input type="text" name="billability"
                                value={searchTerm.billability}
                                onChange={handleInputChange}
                                placeholder="Billability" style={{ width: '85px' }}
                            />
                        </th>

                    </tr>
                </thead>
            </table>
            <table className="table table-striped" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Empid</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Primary Skill</th>
                        <th>People Manager</th>
                        <th>EGO</th>
                        <th>Location</th>
                        <th>Billability</th>
                        <th>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData
                            .slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage)
                            .map((item) => (


                                <tr key={item.id}>
                                    <td>{item.local_employee_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.local_grade}</td>
                                    <td>{item.skill_group}</td>
                                    <td>{item.people_manager}</td>
                                    <td>{item.ego}</td>
                                    <td>{item.city}</td>
                                    <td>{item.billability}</td>
                                    <td>
                                        <button class="btn btn-light" onClick={() => {
                                            localStorage.setItem('id', item.local_employee_id);
                                            window.location.href = `/empdetails`;
                                        }}>
                                            <span
                                                className="material-symbols-outlined"
                                                style={{ float: 'left', fontSize: 18 }}
                                            >
                                                info
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data found</td>
                        </tr>
                    )}
                </tbody>

            </table>


            {/*Modal data */}
            <Modal size='me' isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                    Update your Profile
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
                                <input type="number" name="employee_id" readOnly value={user.id} onChange={(e) => { setEmpid(e.target.value) }} className="form-control" id="colFormLabel" />
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

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <input hidden type="text" name="image" value={image} onChange={(e) => { setPhoto(e.target.value) }} className="form-control" id="fileexample" />
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

export default Manager
