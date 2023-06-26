import React, { useState } from 'react';
import Header from './Header';
import ProgressBarChart from './ProgressBar';
import DonutChart from './DonutChart';
import EmployeeData from './FresherSearch';
import MultiSearch from './MultiSearch';
import BasicExampleDataGrid from './DataGrid';
import HeadCountReportPage from './HeadCountReportDetails';
import { useNavigate } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../css/Dashboard.css"


const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('donut');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedSection) {
      case 'donut':
        return <DonutChart />;
      case 'headcount':
        return <HeadCountReportPage />;
      case 'empdata':
        return <EmployeeData />;
      case 'multisearch':
        return <MultiSearch />;
      case 'datagrid':
        return <BasicExampleDataGrid />;
      default:
        return <DonutChart />;
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex" id="wrapper">
        <SideNav className="sidenav"
          onSelect={(selected) => {
            handleSectionChange(selected);
          }}
        >
          <Toggle />
          <Nav defaultSelected={selectedSection}>
            <NavItem eventKey="donut">
              <NavIcon>
                <span class="material-symbols-outlined" style={{ fontSize: '2em', marginTop: '10px' }}>
                  pie_chart
                </span>
              </NavIcon>
              <NavText>
                Donut Chart
              </NavText>
            </NavItem>
            <NavItem eventKey="headcount">
              <NavIcon>
                <span class="material-symbols-outlined" style={{ fontSize: '2em', marginTop: '10px' }}>
                  summarize
                </span>
              </NavIcon>
              <NavText>
                Head Count Report
              </NavText>
            </NavItem>
            <NavItem eventKey="empdata">
              <NavIcon>
                <span class="material-symbols-outlined" style={{ fontSize: '2em', marginTop: '10px' }}>
                  manage_search
                </span>
              </NavIcon>
              <NavText>
                Search Filter
              </NavText>
            </NavItem>
            {/* <NavItem eventKey="multisearch">
              <NavIcon>
                <i className="fa fa-fw fa-filter" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Multiple Filters
              </NavText>
            </NavItem> */}
            <NavItem eventKey="datagrid">
              <NavIcon>
                <span class="material-symbols-outlined" style={{ fontSize: '2em', marginTop: '10px' }}>
                  grid_view
                </span>
              </NavIcon>
              <NavText>
                Grid
              </NavText>
            </NavItem>
          </Nav>
        </SideNav>

        <div id="page-content-wrapper" style={{ overflow: 'auto', height: 'calc(100vh - 70px)', width: '100%', marginLeft: '5%' }}>
        <div style={{ backgroundImage: `url(${require('../images/img7.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <br /><br />
          <center>
            <h3 className="mt-4" style={{color: 'white'}}>FRESHER STATISTICS</h3>
          </center>
          <br /><br />
          </div>
          <hr />
          <div className="container-fluid" style={{ backgroundColor: '#e6f5ff' }}>
            <br />
            <div>{renderContent()}</div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
