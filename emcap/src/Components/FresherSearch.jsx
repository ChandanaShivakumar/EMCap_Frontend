import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';



const EmployeeData = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [inputt, setInput] = useState("");
  const [filteredDataa, setFilteredDataa] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://emcapg.azurewebsites.net/api/employees/');
        const data = response.data;
        const statusData = data.reduce((acc, cur) => {
          const billability = cur.billability || 'Unknown';
          const ego = cur.ego || 'Unknown';
          const udaan_status = cur.udaan_status || 'Unknown';
          const localGrade = cur.local_grade || 'Unknown';
          const vertical_segment = cur.vertical_segment || 'Unknown';
          acc.billability[billability] = (acc.billability[billability] || 0) + 1;
          acc.ego[ego] = (acc.ego[ego] || 0) + 1;
          acc.udaan_status[udaan_status] = (acc.udaan_status[udaan_status] || 0) + 1;
          acc.localGrade[localGrade] = (acc.localGrade[localGrade] || 0) + 1;
          acc.vertical_segment[vertical_segment] = (acc.vertical_segment[vertical_segment] || 0) + 1;
          return acc;
        }, { billability: {}, ego: {}, udaan_status: {}, localGrade: {}, vertical_segment: {} });
        setEmployeeData(statusData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleExportToExcel = () => {
    const worksheet = utils.json_to_sheet(filteredDataaa);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Employees');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, 'employee_data.xlsx');
  };

  const handleClick = async (category, value) => {
    try {
      const response = await axios.get('https://emcapg.azurewebsites.net/api/employees/');
      const data = response.data;

      const flattenedData = data.flat();
      const filteredData = flattenedData.reduce((acc, obj) => {
        if (obj[category] === value) {
          acc.push(obj);
        }
        return acc;
      }, []);

      const tableRows = filteredData.map(obj => {
        return (
          <tr key={obj.id}>
            <td>{obj.name}</td>
            <td>{obj.skill_group}</td>
            <td>{obj.vertical_segment}</td>
            <td>{obj.local_employee_id}</td>
            <td>{obj.local_grade}</td>
            <td>{obj.ego}</td>
            <td>{obj.city}</td>
            <td>{obj.billability}</td>
          </tr>
        );
      });
      setFilteredDataa(filteredData);
      setTableRows(tableRows);
      setShowTable(true);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredDataaa = Array.isArray(filteredDataa)
    ? filteredDataa.filter(
      item =>
        item.name.toLowerCase().includes(inputt.toLowerCase()) ||
        item.skill_group.toLowerCase().includes(inputt.toLowerCase()) ||
        item.local_employee_id.toLowerCase().includes(inputt.toLowerCase()) ||
        item.city.toLowerCase().includes(inputt) ||
        item.local_grade.toLowerCase().includes(inputt) ||
        item.ego.toLowerCase().includes(inputt) ||
        item.vertical_segment.toLowerCase().includes(inputt) ||
        item.billability.toLowerCase().includes(inputt)
    )
    : [];


  const handleBackClick = () => {
    setShowTable(false); 
  };

  const renderProgressBars = (data, category) => {

    if (!data) {
      return null; 
    }

    const keys = Object.keys(data);
    return keys.map((key) => (

      <div key={key} className="col-md-3 ">

        <button type="button" className="btn btn-light" style={{ height: '100px', width: "150px", margin: "5px" }} onClick={() => handleClick(category, key)}>
          <h6>{key}</h6>
          <div aria-valuenow={(data[key] / keys.length) * 100}> {data[key]} </div>
        </button>

      </div>
    ));
  };

  const renderTable = () => { // new function to render table
    return (
      <div>
        <div className="col" mb-3>
        <button className="btn btn-primary mb-3" onClick={handleBackClick}>Back</button>
        
          <button className="btn btn-primary" style={{float: 'right'}} onClick={handleExportToExcel}>Export to Excel</button>
          <br />
        </div>
        <input type="search" value={inputt} onChange={(e) => setInput(e.target.value)} id="form1" className="form-control" placeholder="Search Employee" />
        <div className="container mt-5">
          <table className="table table-striped" >
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Local Grade</th>
                <th>Primary Skill Group</th>
                <th>EGO</th>
                <th>Vertical Segment</th>
                <th>City</th>
                <th>Billability</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {filteredDataa.length > 0 ? (
                filteredDataa
                  .filter((item) => {
                    return (inputt.toLowerCase() === '')
                      ? item
                      : (item.name.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.skill_group.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.local_employee_id.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.city.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.local_grade.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.ego.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.vertical_segment.toLowerCase().includes(inputt.toLowerCase()) ||
                        item.billability.toLowerCase().includes(inputt.toLowerCase()));
                  })
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.local_employee_id}</td>
                      <td>{item.name}</td>
                      <td>{item.local_grade}</td>
                      <td>{item.skill_group}</td>
                      <td>{item.ego}</td>
                      <td>{item.vertical_segment}</td>
                      <td>{item.city}</td>
                      <td>{item.billability}</td>
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
      </div>
    );
  };

  const renderContent = () => {
    if (showTable) {
      return renderTable();
    } else {
      return (
        <div>
          {employeeData ? (
            <>
              <div>
                <div>
                  <div>
                    <div>
                      <div className="card-container">
                        <div className="m-3">
                          <div className="card" style={{ width: '12rem', height: '39rem' }}>
                            <div className="card-header" style={{ color: '#3366cc' }}>
                              BILLABILITY
                            </div>
                            <div className="card-body"style={{backgroundColor: '#19376D'}}>
                              <h3>{renderProgressBars(employeeData.billability, 'billability')}</h3>
                            </div>
                          </div>

                        </div>
                        <div className="m-3">
                          <div className="card" style={{ width: '12rem', height: '39rem' }}>
                            <div className="card-header" style={{ color: '#3366cc' }}>
                              EGO
                            </div>
                            <div className="card-body" style={{backgroundColor: '#394867'}}>
                              <h3>{renderProgressBars(employeeData.ego, 'ego')}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="m-3">
                          <div className="card" style={{ width: '12rem', height: '39rem' }}>
                            <div className="card-header" style={{ color: '#3366cc' }}>
                              UDAAN
                            </div>
                            <div className="card-body" style={{backgroundColor: '#8294C4'}}>
                              <h3>{renderProgressBars(employeeData.udaan_status, 'udaan_status')}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="m-3">
                          <div className="card" style={{ width: '12rem', height: '39rem' }}>
                            <div className="card-header" style={{ color: '#3366cc' }}>
                              LOCAL GRADE
                            </div>
                            <div className="card-body" style={{backgroundColor: '#ACB1D6'}}>
                              <h3>{renderProgressBars(employeeData.localGrade, 'local_grade')}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="m-3">
                          <div className="card" style={{ width: '12.5rem', height: '39rem' }}>
                            <div className="card-header" style={{ color: '#3366cc' }}>
                              VERTICAL SEGMENT
                            </div>
                            <div className="card-body" style={{backgroundColor: '#DBDFEA'}}>
                              <h3>{renderProgressBars(employeeData.vertical_segment, 'vertical_segment')}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      );
    }
  };

  return <>{renderContent()}</>;
};

export default EmployeeData;


























































// account
// :
// " "
// before_training_rating
// :
// null
// bu
// :
// "SOI-1"
// city
// :
// "Gurgaon"
// confidence_of_placement
// :
// "nan"
// ego
// :
// "Anjali"
// global_group_id
// :
// "46278944.0"
// joining_date
// :
// "2022-10-06 00:00:00"
// lml
// :
// "nan"
// local_employee_id
// :
// "46278944"
// local_grade
// :
// "A4"
// name
// :
// "-- Shivani (s418)"
// people_manager
// :
// "Nijampurkar Anand (anijampu)"
// primary_skill_group
// :
// "Java, React JS and Spring Boot"
// rating_till_date
// :
// null
// remarks
// :
// "Working in Image processing POC(Machine learning)"
// start_date
// :
// "nan"
// status
// :
// "Shadow"
// training_account
// :
// "nan"
// training_end_date
// :
// "nan"
// training_skill
// :
// "nan"
// training_spoc
// :
// "nan"
// udaan_status
// :
// "Yes"
// upgraded_skill
// :
// "nan"