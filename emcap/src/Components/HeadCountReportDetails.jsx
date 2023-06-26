import React from 'react';
import HeadCountReportDetails2 from './HeadCountReportDetails2';
import HeadCountReportDetails1 from './HeadCountReportDetails1';
import TotalHeadCountReport from './TotalHeadCountReport';

const HeadCountReportDetails = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);

    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <div>
      <center>
      <div>
        <TotalHeadCountReport/>
        </div>
        <br />
        <br />

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1}}>
                  {isLoaded && (
                    <React.Fragment>
                      <HeadCountReportDetails2 />
                    </React.Fragment>
                  )}
          </div>
          
          <div style={{ flex: 1}}>

            <div className="card" style={{ width: '800px', height: '500px', overflow: 'auto'}}>
              <div className="card-header" style={{color: '#3366cc'}}>
                EGO WISE CLIENT GROUP AND RESPECTIVE EMPLOYEE STATISTICS
                <br/>
                <p style={{ color: 'red', float: 'right' }}>*filter the EGO to visit the client groups</p>
              </div>
              <div className="card-body">
                <center>
                  {isLoaded && (
                    <React.Fragment>
                      <HeadCountReportDetails1 />
                    </React.Fragment>
                  )}
                </center>
              </div>
            </div>
            
          </div>
        </div>
        </center>
    </div>
  );
};

export default HeadCountReportDetails;
