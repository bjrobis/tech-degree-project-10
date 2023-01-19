import React, {useState} from 'react';
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const UserSignUp = (props) => {

  let navigate = useNavigate();
    
  const handleCancel = (event) => {
      event.preventDefault();
      navigate('/');
    } 
    
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');




   return(
    <React.Fragment>
        <div className="form--centered">
            <h2>Sign Up</h2>    
            <form>
                <label for="firstName">First Name</label>
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} />
                <label for="lastName">Last Name</label>
                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName} />
                <label for="emailAddress">Email Address</label>
                <input 
                    id="email" 
                    name="emailAddress" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <label for="password">Password</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} />
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>

    </React.Fragment>
    
    );
};

export default UserSignUp;
