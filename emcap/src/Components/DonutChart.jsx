import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DonutChart = ({ onChartClick }) => {
  const chartRefs = {
    ego: useRef(null),
    udaan_status: useRef(null),
    billability: useRef(null),
    vertical_segment: useRef(null),
  };
  const [employeeData, setEmployeeData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get('https://emcapg.azurewebsites.net/api/employees/')
      .then(response => {
        const data = response.data;

        // Initialize status counts for each column
        const statusCounts = {
          ego: {},
          udaan_status: {},
          billability: {},
          vertical_segment: {},
        };

        // Count the number of employees with each status for each column
        data.forEach(employee => {
          Object.keys(statusCounts).forEach(column => {
            const columnStatus = employee[column];
            if (columnStatus in statusCounts[column]) {
              statusCounts[column][columnStatus]++;
            } else {
              statusCounts[column][columnStatus] = 1;
            }
          });
        });

        // Create a chart for each column
        // Create a chart for each column
        Object.entries(statusCounts).forEach(([column, counts]) => {
            const chartRef = chartRefs[column].current.getContext('2d');
            const chart = new Chart(chartRef, {
            type: 'doughnut',
            data: {
                labels: Object.keys(counts),
                datasets: [{
                label: 'Count',
                data: Object.values(counts),
                backgroundColor: [
                    '#6096B4',
                    '#93BFCF',
                    '#BDCDD6',
                    '#4BC0C0',
                    '#EEE9DA',
                ],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                datalabels: {
                    display: true,
                    color: '#fff',
                    formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex];
                    },
                },
                },
            },
            });
        });
  
      })
      .catch(error => {
        console.log(error);
            });
  }, []);

  useEffect(() => {
    const charts = Chart.instances;
    if (charts.length > 0 && location.pathname === '/') {
      charts.forEach(chart => chart.destroy());
    }
  }, [location.pathname]);
    
    return (
    <div className="row">
        <div className="col-lg-3 col-md-6">
            <div className="card card-chart">
                <div className="card-header">
                 <canvas ref={chartRefs.ego} />
                </div>
                <div className="card-body">
                    <h4 className="card-title">EGO</h4>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6">
            <div className="card card-chart">
                 <div className="card-header">
                    <canvas ref={chartRefs.udaan_status} />
                </div>
                <div className="card-body">
                    <h4 className="card-title">Udaan</h4>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6">
            <div className="card card-chart">
                <div className="card-header">
                    <canvas ref={chartRefs.billability} />
                </div>
                <div className="card-body">
                    <h4 className="card-title">Billability</h4>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6">
            <div className="card card-chart">
                <div className="card-header">
                    <canvas ref={chartRefs.vertical_segment} />
                </div>
                <div className="card-body">
                    <h4 className="card-title">Vertical Segment</h4>
                </div>
            </div>
        </div>
    </div>
    );
    };
    
    export default DonutChart;
