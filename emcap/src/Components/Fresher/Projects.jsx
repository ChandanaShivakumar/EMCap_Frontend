import * as React from 'react';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {

    useEffect(() => {
        getUserProject();
    }, [])

  const edata = localStorage.getItem("id")
  const [order, setOrder] = useState("DSC")
  const [projects, setProjects] = useState([])

  //Fetching the user projects
  function getUserProject() {
      fetch(`http://127.0.0.1:8000/api/empprojects/${edata}/`).then((result) => {
          result.json().then((resp) => {
              //console.log("result",resp)
              setProjects(resp)

          })
      })
  }
  const empProjects = projects;
  //latest project first using the sort func
  const sorting = (col) => {

      if (order === "DSC") {
          const sorted = [...projects].sort((a, b) =>
              a[col] < b[col] ? 1 : -1
          );
          setProjects(sorted);
          setOrder("DSC")
      }
  };
  return (
    <div>
        {/*Project details section */}
        <br />
            <h5 style={{ textAlign: 'center' }}> Project  Details</h5>

            <br />
            <center>
                <div className="card" style={{ width: '61rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>

                                <th>Project name with code</th>
                                <th>Manager Name</th>

                                <th onClick={() => sorting("startdate")} style={{ cursor: 'pointer' }}>
                                    Start date
                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, marginTop: 5 }}>
                                        filter_list
                                    </span>
                                </th>
                                <th>End date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {empProjects.map((item) => {

                                return (
                                    <>
                                        <tr>

                                            <td>{item.name}</td>
                                            <td>{item.manager_name}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>

                                        </tr>
                                    </>
                                )
                                return (null)
                            })}

                        </tbody>
                    </table>
                </div>
            </center>
            <br/><br/>
    </div>
  );
}
