import React from 'react';
import { Link } from 'react-router-dom';

const Courses = (props) => {
let [authUser, setAuthUser] = useRef([]);


    return(
        <div className="wrap header--flex">
        <h1 className="header--logo"><a href="index.html">Courses</a></h1>
            <nav>
              {authUser ? (
                <React.Fragment>
                    <ul className="header--signedin">
                        <li>Welcome, {authUser.name}!</li>
                        <li><Link to="/UserSignOut">Sign Out</Link></li>
                    </ul>
                </React.Fragment>
              ) : (
                <React.Fragment>
                     <ul className="header--signedout">
                        <li><Link className="header--signedout" to="/UserSignUp">Sign Up</Link></li>
                        <li><Link className="header--signedout" to="/UserSignIn">Sign In</Link></li>
                    </ul>
                </React.Fragment>
              )}
            </nav>
          </div>
      
    );
  };

export default Courses;