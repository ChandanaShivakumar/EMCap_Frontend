import * as React from 'react';
import { useEffect, useState } from 'react';


export default function TrainingPage() {
    
  //Setting user trainings
  const [usertraining, setUserTraining] = useState([])
  useEffect(() => {
      getUserTraining();
  }, [])

  const edata = localStorage.getItem("id")
  const [order, setOrder] = useState("DSC")
  const [projects, setProjects] = useState([])

  //Fetching the user trainings
  function getUserTraining() {
      fetch(`http://127.0.0.1:8000/api/emptrainings/${edata}/`).then((result) => {
          result.json().then((resp) => {
              //console.log("result",resp)
              setUserTraining(resp)


          })
      })
  }
  const empTrainings = usertraining;
  console.log("training", usertraining)

  //latest training first using the sort func
  const sorting1 = (col) => {

      if (order === "DSC") {
          const sorted = [...usertraining].sort((a, b) =>
              a[col] < b[col] ? 1 : -1
          );
          setUserTraining(sorted);
          setOrder("DSC")
      }
  };

  return (
    <div>
        {/*Training details section */}
        <br />
            <h5 style={{ textAlign: 'center' }}> Training  Details</h5>

            <br />
            <center>
                <div className="card" style={{ width: '61rem' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Training name</th>
                                <th>Details</th>

                                <th onClick={() => sorting1("startdate")} style={{ cursor: 'pointer' }}>
                                    Start date
                                    <span className="material-symbols-outlined" style={{ float: 'left', fontSize: 18, marginTop: 5 }}>
                                        filter_list
                                    </span>
                                </th>
                                <th>End date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {empTrainings.map((item) => {
                                return (
                                    <>
                                        <tr>

                                            <td>{item.name}</td>
                                            <td>{item.details}</td>
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
            <br /><br />

    </div>
  );
}