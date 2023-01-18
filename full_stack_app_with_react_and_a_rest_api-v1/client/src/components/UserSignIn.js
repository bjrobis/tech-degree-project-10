import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignIn = (props) => {
    
//     // State
//   const username = useRef(null);
//   const password = useRef(null);

//   const navigate = useNavigate();

//   // Event Handlers
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     actions.signIn(username.current.value, password.current.value);
//     navigate("/");
//   }

//   const handleCancel = (event) => {
//     event.preventDefault();
//     navigate('/');
//   }
    
    return(
        <span></span>
    // <React.Fragment>
    //     <div className="form--centered">
    //         <h2>Sign In</h2>
                
    //         <form onSubmit={handleSubmit}>
    //             <label for="emailAddress">Email Address</label>
    //             <input 
    //                 id="username" 
    //                 name="emailAddress" 
    //                 type="email" 
    //                 value="" 
    //                 ref={username}/>
    //             <label for="password">Password</label>
    //             <input 
    //                 id="password" 
    //                 name="password" 
    //                 type="password" 
    //                 value="" 
    //                 ref={password} />
    //             <button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick={handleCancel}>Cancel</button>
    //         </form>
    //         <p>Don't have a user account? Click here to <Link to="/UserSignUp">sign up</Link>!</p>
                
    //     </div>

    // </React.Fragment>
    );
};
export default UserSignIn;
