import React, {useState, useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import UserProvider from '../context/UserContext';

const UserSignIn = () => {
    let navigate = useNavigate();
    
  const handleCancel = (event) => {
      event.preventDefault();
      navigate('/');
    }

    const {actions} = useContext(UserProvider);
    


    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
      e.preventDefault();
      actions.userSignIn(emailAddress, password);
    }


     
    return(
    <React.Fragment>
        <div className="form--centered">
            <h2>Sign In</h2>
                
            <form onSubmit={handleSubmit}>
                <label for="emailAddress">Email Address</label>
                <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email" 
                    value={emailAddress} 
                    onChange={(e) => setEmailAddress(e.target.value)}/>
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

    
    
