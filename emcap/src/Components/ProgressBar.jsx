import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProgressBarChart = () => {
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://emcapg.azurewebsites.net/api/employees/');
        const data = response.data;
        
        console.log(response.data)
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

  const renderProgressBars = (data) => {

    if (!data) {
        return null; // or return some default value or message
    }

    const keys = Object.keys(data);
    console.log(keys);
    return keys.map((key) => (
      <div key={key} className="col-md-4">
        <h6>{key}</h6>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(Object.keys(data).length ? data[key] / Object.keys(data).length : 0) * 100}%` }}
            aria-valuenow={(Object.keys(data).length ? data[key] / Object.keys(data).length : 0) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {data[key]}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      {employeeData ? (
        <>
        <div className="carousel-container" style={{ height: "400px", width: "1000px" }}>
            <div id="carouselExampleControls" className="carousel slide h-100" data-bs-ride="carousel">
                <div className="carousel-inner h-100 ">
                <div className="carousel-item active h-100 ">
                    <div className="card shadow-sm mb-2 bg-gradient-warning">
                    <div className="card-body " style={{ height: "300px", width: "1000px" }}>
                        <h5 className="card-title"><u>Status</u></h5>
                        <div className="row">{renderProgressBars(employeeData.billability)}</div>
                    </div>
                    </div>
                </div>
                <div className="carousel-item h-100 w-100">
                    <div className="card shadow-sm mb-3">
                    <div className="card-body w-100" style={{ height: "300px", width: "1000px" }}>
                        <h5 className="card-title"><u>EGO</u></h5>
                        <div className="row">{renderProgressBars(employeeData.ego)}</div>
                    </div>
                    </div>
                </div>
                <div className="carousel-item h-100 w-100">
                    <div className="card shadow-sm mb-3">
                    <div className="card-body w-100 " style={{ height: "300px", width: "1000px" }}>
                        <h5 className="card-title"><u>Udaan</u></h5>
                        <div className="row">{renderProgressBars(employeeData.udaan_status)}</div>
                    </div>
                    </div>
                </div>
                <div className="carousel-item h-100 w-100">
                    <div className="card shadow-sm mb-3">
                    <div className="card-body w-100" style={{ height: "300px", width: "1000px" }}>
                        <h5 className="card-title"><u>Vertical Segment</u></h5>
                        <div className="row">{renderProgressBars(employeeData.vertical_segment)}</div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="carousel-control-bottom">
                <button className="carousel-control-prev d-flex btn-primary" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next d-flex btn-primary" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
            </div>


        </>
      ) : (
        <p>Loading employee data...</p>
      )}
    </div>
        );
};

export default ProgressBarChart;
