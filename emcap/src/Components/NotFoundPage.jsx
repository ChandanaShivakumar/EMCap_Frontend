import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div style={{ marginTop: '100px' }}>
            <center>
                <h1>Uh-Oh...</h1>
                <h6>The page you are looking for may have been moved, deleted or possibly never existed</h6>
                <div style={{ backgroundImage: `url(${require('../images/img9.png')})`, backgroundRepeat: 'no-repeat', backgroundSize: '800px 300px', marginLeft: '230px' }}>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                <Link to="/" className="btn btn-dark">
                    Home
                </Link>
            </center>
        </div>
    )
}

export default NotFoundPage
