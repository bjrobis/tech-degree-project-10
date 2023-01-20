import React, {useState} from 'react';
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const UserSignUp = ({userSignIn}) => {

  let navigate = useNavigate();
    
  const handleCancel = (event) => {
      event.preventDefault();
      navigate('/');
    } 
    
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors] = useState([]);

    const handleSignUp = () => {
        fetch('http://localhost:5000/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({firstName, lastName, email, password})
        })
        .then(res => {
            if(res.status  === 201) {
                userSignIn(email, password);
                navigate('/');
            } else if(res.status === 500) {
                alert('There was a server errror');
            } else {
                return res.json();
            }
        })
        .then(data => {
            if(data) {
                setErrors(data.errors);
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    }




   return(
    <React.Fragment>
        <div className="form--centered">
            <h2>Sign Up</h2>    
            <form onSubmit={handleSignUp}>
                <label>First Name
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} />
                </label>
                
                <label>Last Name
                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName} />
                </label>

                <label>Email Address
                <input 
                    id="email" 
                    name="emailAddress" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                </label>

                <label>Password
                <input 
                    id="password" 
                    name="password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} />
                </label>
                
                <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>

    </React.Fragment>
    
    );
};

export default UserSignUp;
