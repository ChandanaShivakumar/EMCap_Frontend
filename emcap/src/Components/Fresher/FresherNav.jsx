import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExcelDataPage from './ExcelData';
import FeedbackPage from './FeedbackTable';
import NewFreshersPage from './NewFresherPage';
import ProjectsPage from './Projects';
import SkillPocPage from './SkillsPocTable';
import TrainingTable from './TrainingTable'

export default function FresherHeader() {
    const [selectedSection, setSelectedSection] = useState('donut');

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const renderContent = () => {
        switch (selectedSection) {
            case 'Profile':
                return <NewFreshersPage />;
            case 'Excel':
                return <ExcelDataPage />;
            case 'Feedback':
                return <FeedbackPage />;
            case 'Project':
                return <ProjectsPage />;
            case 'Skill':
                return <SkillPocPage />;
            case 'Training':
                return <TrainingTable />;
            default:
                return <NewFreshersPage />;
        }
    };


    return (
        <>
            <div className="d-flex flex-column" id="wrapper" style={{ width: "100%", height: 'calc(108vh - 45px)', backgroundColor: '#e6f9ff' }}>
                <header className="header bg-dark">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Link to="/manager" className="btn btn1" style={{ border: 'none' }}>
                            Back
                        </Link>

                        <ul className="header-links d-flex" style={{ listStyleType: 'none' }}>
                            <li className={`header-link ${selectedSection === 'Profile' ? 'active' : ''}`}>
                                <button className="btn btn1" onClick={() => handleSectionChange('Profile')}>
                                    Profile
                                </button>
                            </li>
                            <li className={`header-link ${selectedSection === 'Excel' ? 'active' : ''}`}>
                                <button className="btn btn1" onClick={() => handleSectionChange('Excel')}>
                                    Excel Data
                                </button>
                            </li>
                            <li className={`header-link ${selectedSection === 'Feedback' ? 'active' : ''}`}>
                                <button className="btn btn1" onClick={() => handleSectionChange('Feedback')}>
                                    Feedbacks
                                </button>
                            </li>
                            <li className={`header-link ${selectedSection === 'Project' ? 'active' : ''}`}>
                                <button className="btn btn1" onClick={() => handleSectionChange('Project')}>
                                    Projects
                                </button>
                            </li>
                            <li className={`header-link ${selectedSection === 'Skill' ? 'active' : ''}`}>
                                <button className="btn btn1" onClick={() => handleSectionChange('Skill')}>
                                    Skill/Poc
                                </button>
                            </li>
                            <li className={`header-link ${selectedSection === 'Training' ? 'active' : ''}`}>
                                <button className="btn btn1" onClick={() => handleSectionChange('Training')}>
                                    Training
                                </button>
                            </li>
                        </ul>
                    </div>
                </header>

                <div>
                    <div className="">{renderContent()}</div>
                </div>
            </div>
        </>
    )
}

