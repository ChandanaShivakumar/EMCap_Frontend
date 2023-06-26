import React, { useEffect, useState } from 'react';
import '../css/Headcount.css';

export default function HeadCountReportPage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch('https://emcapg.azurewebsites.net/api/employees/')
      .then((result) => result.json())
      .then((resp) => {
        setUserData(resp);
        console.log(resp);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  const totalCount = userData.length;

  const statusNames = Array.from(
    new Set(userData.map((user) => user.billability.toLowerCase()))
  );

  return (
    <div>
      <center>
        <div className="card" style={{ width: '13rem', height: '8rem' }}>
          <div className="card-header" style={{ color: '#3366cc' }}>
            TOTAL HEAD COUNT
          </div>

          <div className="card-body">
            <h3>{totalCount}</h3>
            <p>Total % - 100%</p>
          </div>
        </div>

        <br />
        <div className="card-container">
          {statusNames.map((status, index) => {
            const count = userData.filter((user) => user.billability.toLowerCase() === status).length;
            const percentage = ((count / totalCount) * 100).toFixed(2);

            let backgroundColor = '#cfc8b8';
            if (status === 'allocated') backgroundColor = '#2E8A99';
            else if (status === 'bench') backgroundColor = '#ECE5C7';
            else if (status === 'non rm') backgroundColor = '#CDC2AE';
            else if (status === 'll/ml/vacation') backgroundColor = '#4F709C';
            else if (status === 'allocated - internal') backgroundColor = '#967E76';

            return (
              <div key={index} className="card" style={{ backgroundColor, width: '12rem', height: '8rem' }}>
                <div className="card-body">
                  <h6 className="card-title">{status}</h6>
                  <h2>{count}</h2>
                  <p>% of Total : {percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </center>
    </div>
  );
}
