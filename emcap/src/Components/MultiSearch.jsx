import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Pagination from 'react-paginate';
import '../css/Paginate.css';
import { saveAs } from 'file-saver';
import { utils, write} from 'xlsx';
//Displaying the MultiSearch data
const MultiSearch = () => {
    const [userdata, setUserData] = useState([])
    const [searchTerm, setSearchTerm] = useState({
        id: '',
        name: '',
        localgrade: '',
        psg: '',
        billability: '',
        booking_type: '',
        ego: '',
        city: '',

        // Add more search fields for other columns
      });
    useEffect(() => {
        getUsers();
    }, [])

    function getUsers() {
        fetch("https://emcapg.azurewebsites.net/api/employees/").then((result) => {
            result.json().then((resp) => {

                setUserData(resp)
                
            })
        })
    }
    
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
            (item.billability?.toLowerCase() || '').includes(searchTerm.billability.toLowerCase()) &&
            (item.booking_type?.toLowerCase() || '').includes(searchTerm.booking_type.toLowerCase()) &&
            (item.ego?.toLowerCase() || '').includes(searchTerm.ego.toLowerCase()) &&
            (item.city?.toLowerCase() || '').includes(searchTerm.city.toLowerCase())
        );
    });

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
    const pageCount = Math.ceil(filteredData.length / usersPerPage);
    //Code
    return (
        <div className="container12" style={{ backgroundColor: '#e6f5ff' }} key="{item.id}">
            <div className="col" mb-3>
                <button className="btn btn-primary" onClick={handleExportToExcel}>Export to Excel</button>
            </div>
            <br />
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
                            placeholder="Emp Id" style={{width:'83px'}}
                            />
                        </th>
                        <th>
                            <input type="text" name="name"
                            value={searchTerm.name}
                            onChange={handleInputChange}
                            placeholder="Name" style={{width:'285px'}}
                            />
                        </th>
                        <th>
                            <input type="text" name="localgrade"
                            value={searchTerm.localgrade}
                            onChange={handleInputChange}
                            placeholder="Designation" style={{width:'104px'}}
                            />
                        </th>
                        <br/>
                        <th>
                            <input type="text" name="psg"
                            value={searchTerm.psg}
                            onChange={handleInputChange}
                            placeholder="Skill" style={{width:'322px'}}
                            />
                        </th>
                        <th>
                            <input type="text" name="ego" 
                            value={searchTerm.ego}
                            onChange={handleInputChange}
                            placeholder="EGO" style={{width:'115px'}}
                            />
                        </th>
                        <th>
                            <input type="text" name="city"
                            value={searchTerm.city}
                            onChange={handleInputChange}
                            placeholder="City" style={{width:'86px'}}
                            />
                        </th>
                        <th>
                            <input type="text" name="billability" 
                            value={searchTerm.billability}
                            onChange={handleInputChange}
                            placeholder="Billability" style={{width:'85px'}}
                            />
                        </th>
                        <th>
                            <input type="text" name="booking_type" 
                            value={searchTerm.booking_type}
                            onChange={handleInputChange}
                            placeholder="Status" style={{width:'93px'}}
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
                        <th>EGO</th>
                        <th>Location</th>
                        <th>Billability</th>
                        <th>Current Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData
                            .slice(pageNumber * usersPerPage, (pageNumber + 1) * usersPerPage)
                            .map((item) => (


                                <tr key={item.id} style={{justifyContent: 'space-evenly'}}>
                                    <td style={{width:'80px'}}>{item.local_employee_id}</td>
                                    <td style={{width:'200px'}}>{item.name}</td>
                                    <td style={{width:'50px'}}>{item.local_grade}</td>
                                    <td style={{width:'300px'}}>{item.skill_group}</td>
                                    <td style={{width:'50px'}}>{item.ego}</td>
                                    <td style={{width:'150px'}}>{item.city}</td>
                                    <td style={{width:'100px'}}>{item.billability}</td>
                                    <td style={{width:'50px'}}>{item.booking_type}</td>

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
        </div>
    )
}

export default MultiSearch
