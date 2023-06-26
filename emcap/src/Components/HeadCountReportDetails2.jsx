import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

export default function HeadCountReportPage() {
  const [userData, setUserData] = useState([]);
  const [selectedEgo, setSelectedEgo] = useState('');

  function getUsers() {
    fetch('https://emcapg.azurewebsites.net/api/employees/').then((result) => {
      result.json().then((resp) => {
        setUserData(resp);
      });
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Count objects with different "ego" values
  const egoCounts = {};
  let totalCount = 0;

  userData.forEach((user) => {
    const ego = user.ego;
    const overallStatus = user.billability.toLowerCase();
    if (egoCounts.hasOwnProperty(ego)) {
      egoCounts[ego].count += 1;
      totalCount += 1;
      if (!egoCounts[ego].overallStatuses.includes(overallStatus)) {
        egoCounts[ego].overallStatuses.push(overallStatus);
      }
    } else {
      egoCounts[ego] = {
        count: 1,
        overallStatuses: [overallStatus],
      };
      totalCount += 1;
    }
  });

  // Get unique status names
  const statusNames = Array.from(
    new Set(userData.map((user) => user.billability.toLowerCase()))
  );

  const tableRef = useRef(null);

  const handleEgoSelect = (ego) => {
    setSelectedEgo(ego);
  };

  // Calculate counts for pie chart
  const allocatedCount = userData.filter(
    (user) => user.ego === selectedEgo && user.billability.toLowerCase() === 'allocated'
  ).length;
  const benchCount = userData.filter(
    (user) => user.ego === selectedEgo && user.billability.toLowerCase() === 'bench'
  ).length;
  const nonrmCount = userData.filter(
    (user) => user.ego === selectedEgo && user.billability.toLowerCase() === 'non rm'
  ).length;
  const allocatedinternalCount = userData.filter(
    (user) => user.ego === selectedEgo && user.billability.toLowerCase() === 'allocated - internal'
  ).length;
  const llmlCount = userData.filter(
    (user) => user.ego === selectedEgo && user.billability.toLowerCase() === 'll/ml/vacation'
  ).length;

  // Create data for the pie chart
  const pieChartData = {
    labels: [
      `Allocated - ${allocatedCount} (${((allocatedCount / totalCount) * 100).toFixed(2)}%)`,
    `Bench - ${benchCount} (${((benchCount / totalCount) * 100).toFixed(2)}%)`,
    `LL/ML/Vacation - ${llmlCount} (${((llmlCount / totalCount) * 100).toFixed(2)}%)`,
    `Non rm - ${nonrmCount} (${((nonrmCount / totalCount) * 100).toFixed(2)}%)`,
    `Allocated-internal - ${allocatedinternalCount} (${((allocatedinternalCount / totalCount) * 100).toFixed(2)}%)`
  ],
    datasets: [
      {
        data: [allocatedCount, benchCount, llmlCount, nonrmCount, allocatedinternalCount],
        backgroundColor: ['#2E8A99', '#ECE5C7', '#4F709C', '#CDC2AE', '#967E76'],
        borderWidth: 0,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'right',
      labels: {
        fontSize: 16,
      },
    },
  };

  return (
    <div>
      <Card style={{ width: '15rem', height: '11rem' }}>
        <Card.Header>
          <Dropdown onSelect={handleEgoSelect}>
            <Dropdown.Toggle variant="light" id="dropdown-ego" style={{ color: '#3366cc' }}>
              EGO WISE HCR
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">EGO</Dropdown.Item>
              {Object.keys(egoCounts).map((ego) => (
                <Dropdown.Item key={ego} eventKey={ego}>
                  {ego}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          {selectedEgo && (
            <>
              <h6>{selectedEgo}</h6>
              <h2>{egoCounts[selectedEgo]?.count}</h2>
              <p>% of Total: {((egoCounts[selectedEgo]?.count / totalCount) * 100).toFixed(2)}</p>
            </>
          )}
        </Card.Body>
      </Card>
      <br />

      {selectedEgo && (
        <center>
          <div style={{ width: '300px',height: '300px' }}>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} />
          </div>
        </center>
      )}
    </div>
  );
}
