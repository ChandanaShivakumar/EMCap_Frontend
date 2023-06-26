import React, { useEffect, useState, useRef } from 'react';
import '../css/Headcount.css';
import Chart from 'chart.js/auto';
import XLSX from 'xlsx';

export default function HeadCountReportPage() {
    const [userData, setUserData] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedEgo, setSelectedEgo] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

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

    // Count objects with different "ego" values and respective projects
    const egoCounts = {};
    let totalCount = 0;

    userData.forEach((user) => {
        const ego = user.ego;
        const overallStatus = user.billability.toLowerCase();
        const userName = user.name;
        const userManager = user.people_manager;
        const userId = user.local_employee_id;
        const clientName = user.client_group_name;
        const userProject = user.project_name;

        if (egoCounts.hasOwnProperty(ego)) {
            egoCounts[ego].count += 1;
            totalCount += 1;
            if (!egoCounts[ego].overallStatuses.includes(overallStatus)) {
                egoCounts[ego].overallStatuses.push(overallStatus);
            }
            if (overallStatus === 'allocated') {
                if (!egoCounts[ego].projects.hasOwnProperty(clientName)) {
                    egoCounts[ego].projects[clientName] = [];
                }
                egoCounts[ego].projects[clientName].push({ userName, userManager: user.people_manager, userId: user.local_employee_id, userProject }); // Store the user name and location in the respective project
            }
        } else {
            egoCounts[ego] = {
                count: 1,
                overallStatuses: [overallStatus],
                projects: {
                    [clientName]: [{ userName, userManager: user.people_manager, userId: user.local_employee_id, userProject }], // Initialize an array with the user name and location for the respective project
                },
            };
            totalCount += 1;
        }
    });

    // Get unique status names
    const statusNames = Array.from(
        new Set(userData.map((user) => user.billability.toLowerCase()))
    );

    const tableRef = useRef(null);
    const chartRef = useRef(null);

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setSelectedUsers(egoCounts[selectedEgo]?.projects[project] || []);
    };

    const handleEgoSelect = (ego) => {
        setSelectedEgo(ego);
        setSelectedProject('');
        setSelectedUsers([]);
    };

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Generate bar chart
        const ctx = chartRef.current.getContext('2d');
        const data = [];
        const labels = Object.keys(egoCounts[selectedEgo]?.projects || {});
        labels.forEach((project) => {
            const count = egoCounts[selectedEgo]?.projects[project]?.length || 0;
            data.push(count);
        });

        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Allocated Resources',
                        data: data,
                        backgroundColor: '#2E8A99',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 0,
                    },
                },

            },
        });

        setChartInstance(newChartInstance);
    }, [selectedEgo]);

    const handleExportExcel = () => {
        const table = tableRef.current;

        const headerRow = table.querySelector('thead tr');
        const headerCells = Array.from(headerRow.getElementsByTagName('th'));
        const columnNames = headerCells.map((cell) => cell.innerText);

        const rows = Array.from(table.getElementsByTagName('tr'));
        const data = rows.map((row) => {
            const cells = Array.from(row.getElementsByTagName('td'));
            return cells.map((cell) => cell.innerText);
        });

        const worksheetData = [columnNames, ...data];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'users');
        XLSX.writeFile(workbook, 'ego_wise_detailed_head_count_report.xlsx');
    };

    return (
        <div>
            <center>
                <table className="table table-striped" cellPadding={5} cellSpacing={5}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#DDE6ED' }}>
                                <select value={selectedEgo} onChange={(e) => handleEgoSelect(e.target.value)}>
                                    <option value="">EGO</option>
                                    {Object.keys(egoCounts).map((ego) => (
                                        <option key={ego} value={ego}>
                                            {ego}
                                        </option>
                                    ))}
                                </select>
                            </th>
                            <th style={{ backgroundColor: '#DDE6ED' }}>
                                <select
                                    value={selectedProject}
                                    onChange={(e) => handleProjectSelect(e.target.value)}
                                >
                                    <option value="">Client Group</option>
                                    {Object.keys(egoCounts[selectedEgo]?.projects || {}).map((project) => (
                                        <option key={project} value={project}>
                                            {project}
                                        </option>
                                    ))}
                                </select>
                            </th>
                        </tr>
                    </thead>

                </table>
                <canvas id="chart" ref={chartRef}></canvas>
            </center>

            <center style={{ marginTop: '10px' }}>
                <hr />
                <button className="btn btn-sm" style={{ float: 'right', backgroundColor: '#bfbfbf' }}>
                    Export excel
                </button>
                <br />
                <br/>
                {selectedUsers.length > 0 && (
                    <div>
                        <center><h5>Allocated Resources - {selectedUsers.length}</h5></center>
                        <table style={{ border: '1px solid black' }} cellPadding={10} ref={tableRef}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED'}}>#</th>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED' }}>EGO</th>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED' }}>Client</th>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED' }}>Project</th>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED' }}>Emp Id</th>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED' }}>Name</th>
                                    <th style={{ border: '1px solid black', backgroundColor: '#DDE6ED' }}>People Manager</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                        <td style={{ border: '1px solid black' }}>{selectedEgo}</td>
                                        <td style={{ border: '1px solid black' }}>{selectedProject}</td>
                                        <td style={{ border: '1px solid black' }}>{user.userProject}</td>
                                        <td style={{ border: '1px solid black' }}>{user.userId}</td>
                                        <td style={{ border: '1px solid black' }}>{user.userName}</td>
                                        <td style={{ border: '1px solid black' }}>{user.userManager}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </center>
        </div>
    );
}