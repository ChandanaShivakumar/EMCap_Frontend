import { Link } from 'react-router-dom';
import './Home.css'
import Right from "./right.png"
import Pointer from "./pointer.png"
import Header from "../Header"
const Home = () => {
    
	return (
        <div className='main'>
        <Header/>
		<div className="container mt-5">
            
			<div className='left'>
                <h1>SHOW YOUR SKILLS AND <br/>FIND THE BEST PROJECT <br/>FOR YOU.<img src={Pointer} alt="pointer" ></img></h1>
                <p>Update skills and get the reviews from your manager as well as your trainers to get yourself verified as a good developer.</p>
                <div>
                    <Link to="/register">
                        <button className='Buttons'>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button className='Buttons1'>Login</button>
                    </Link>
                </div>
            </div>
            <div className='right'>
                <img src={Right} alt="statistic pic"></img>
            </div>
		</div>
        </div>
	);
};

export default Home;