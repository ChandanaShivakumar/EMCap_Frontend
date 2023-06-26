import React from 'react'
import Header from './Header';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';


const MovedFreshers = () => {
    const [userdata, setUserData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])

    function getUsers() {
        fetch("https://emcapg.azurewebsites.net/api/rmemployees/").then((result) => {
            result.json().then((resp) => {

                setUserData(resp)

            })
        })
    }

    const handleExportToExcel = () => {
        const worksheet = utils.json_to_sheet(filteredData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Employees');
        const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'moved_freshers_data.xlsx');
    };

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 50;

    const [searchTerm, setSearchTerm] = useState({
        id: '',
        name: '',
        localgrade: '',
        psg: '',
        ego: '',
        people_manager: '',
        city: '',

        // Add more search fields for other columns
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            [name]: value,
        }));
    };

    const filteredData = userdata.filter((item) => {
        return (

            (item.local_employee_id.toLowerCase().includes(searchTerm.id.toLowerCase())) &&
            (item.name?.toLowerCase() || '').includes(searchTerm.name.toLowerCase()) &&
            (item.local_grade?.toLowerCase() || '').includes(searchTerm.localgrade.toLowerCase()) &&
            (item.skill_group?.toLowerCase() || '').includes(searchTerm.psg.toLowerCase()) &&
            (item.ego?.toLowerCase() || '').includes(searchTerm.ego.toLowerCase()) &&
            (item.people_manager?.toLowerCase() || '').includes(searchTerm.people_manager.toLowerCase())
        );
    });

    const pageCount = Math.ceil(filteredData.length / usersPerPage);


    return (
        <div style={{ backgroundColor: '#e6f5ff' }}>
            <Header />
            <Link to="/manager" className="btn btn-primary" style={{ marginLeft: '10px', marginTop: '10px' }}>
                Back
            </Link><br />
            <h5 style={{ textAlign: 'center' }}>Freshers moved out of SPE</h5>
            <hr />
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
                    </tr>
                </thead>
            </table>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Empid</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Primary Skill</th>
                        <th>People Manager</th>
                        <th>EGO</th>
                        <th>Status</th>
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
                                    <td>Moved out of SPE</td>
                                    {/* <td>
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
                                    </td> */}
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data found</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default MovedFreshers
