import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSignIn = (props) => {

  let navigate = useNavigate();
    
  const handleCancel = (event) => {
      event.preventDefault();
      navigate('/');
    } 

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    
    return(
    <React.Fragment>
        <div className="form--centered">
            <h2>Sign In</h2>
                
            <form>
                <label for="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                <label for="password">Password</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
        </div>

    </React.Fragment>
    );
    };

    export default UserSignIn;

    
    
