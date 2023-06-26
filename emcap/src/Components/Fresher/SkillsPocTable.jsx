import * as React from 'react';
import { useEffect, useState } from 'react';

export default function SkillPocPage() {

  
  const edata = localStorage.getItem("id")
  
  //Setting user poc
  const [userpoc, setUserPoc] = useState([])
    useEffect(() => {
        getUserPoc();
    }, [])

    //Fetching the user pocs
    function getUserPoc() {
        fetch(`http://127.0.0.1:8000/api/emppocs/${edata}/`).then((result) => {
            result.json().then((resp) => {
                console.log("result", resp)
                setUserPoc(resp)
            })
        })
    }

    const empPocs = userpoc;

   //Setting user skill
   const [userskill, setUserSkill] = useState([])
   useEffect(() => {
       getUserSkill();
   }, [])

   //Fetching the user skill
   function getUserSkill() {
       fetch(`http://127.0.0.1:8000/api/empskills/${edata}/`).then((result) => {
           result.json().then((resp) => {
               console.log("RRresult1", resp)
               setUserSkill(resp)
           })
       })
   }

   const empSkills = userskill;


  return (
    <div>
      {/*POC details section */}
      <br />
      <h5 style={{ textAlign: 'center' }}> POC  Details</h5>

      <br />
      <center>
        <div className="card" style={{ width: '41rem' }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>POC name</th>
                <th>Details</th>

              </tr>
            </thead>
            <tbody>
              {empPocs.map((item) => {

                return (
                  <>
                    <tr>
                      <td>{item.poc_name}</td>
                      <td>{item.poc_details}</td>

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


       {/*Skill details section */}
       <br />
       <h5 style={{ textAlign: 'center' }}> Skill  Details</h5>

<br />
<center>
    <div className="card" style={{ width: '41rem' }}>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Skill name</th>
                    <th>Details</th>

                </tr>
            </thead>
            <tbody>
                {empSkills.map((item) => {

                    return (
                        <>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.details}</td>

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