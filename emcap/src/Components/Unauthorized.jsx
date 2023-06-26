import React from 'react'
import {Link} from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div>
      <center>
      <div style={{ backgroundImage: `url(${require('../images/img10.jpg')})`, backgroundRepeat: 'no-repeat', backgroundSize: '200px 200px', marginLeft: '535px'}}>
                <br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        <h1>Oops!</h1>
        <div style={{backgroundColor: 'grey'}}>
            <br />
            <h3>Access Denied - Forbidden</h3>
            <h6>You do not have the required permission to perform the selected operation</h6>
            <br />
            <h6>Please try navigating using the option below</h6>
            <br />
        </div>
        <br />
        <Link to="/" className="btn btn-dark">
                Home
            </Link>   
      </center>
    </div>
  )
}

export default Unauthorized
