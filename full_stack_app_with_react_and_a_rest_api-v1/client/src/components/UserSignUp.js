import React, {useState, useContext} from 'react';
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';



const UserSignUp = () => {

  let navigate = useNavigate();
  const { actions } = useContext(UserContext);
    
  const handleCancel = (event) => {
      event.preventDefault();
      navigate('/');
    } 
    
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const [valErrors, setValErrors ] = useState([]);

    
    const signUp = async () => {
        await fetch('http://localhost:5000/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName, 
                emailAddress: email, 
                password: password
            })
        })
        .then(res => {
            if (res.status === 201) {
                actions.userSignIn(email, password);
                return [];
              } else if (res.status === 400) {
                //will return validation errors 
                return res.json().then(data => {
                  return data.errors
                });
              } else {
                throw new Error('Error: There was an issue processing this request with the server');
              }
        })
        .then(errors =>(errors ? setValErrors(errors) : console.log('')))
        .catch((err) => {
            console.log('Error signing up', err) 
        }); 
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        setValErrors([]);
        if (firstName === '' || firstName === null) {
            setValErrors(prevState => ([...prevState, 'First Name is Required']));
        }
        if (lastName === '' || lastName === null) {
            setValErrors(prevState => ([...prevState,'Last Name is Required']));
        }
        if (email === '' || email === null) {
            setValErrors(prevState => ([...prevState,'E-mail is Required']));
        }
        if (password === '' || password === null) {
            setValErrors(prevState => ([...prevState,'A password is Required']));
        }
        signUp();
    }




   return(
    <React.Fragment>
        <div className="form--centered">
            <h2>Sign Up</h2> 
            {valErrors.length !== 0 ? (
              <div className='validation--errors'>
                        <h3>Validation Errors</h3>
                        <ul>
                            {valErrors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
              </div>
              ): null }
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
