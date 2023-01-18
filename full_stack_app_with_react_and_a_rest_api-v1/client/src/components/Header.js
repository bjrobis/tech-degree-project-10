import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
let authUser = null;

    return(
      <header>
        <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            <nav>
              {authUser ? (
                <React.Fragment>
                    <ul className="header--signedin">
                        <li>Welcome, {authUser.name}!</li>
                        <li><Link to="/signout">Sign Out</Link></li>
                    </ul>
                </React.Fragment>
              ) : (
                <React.Fragment>
                     <ul className="header--signedout">
                        <li><Link className="header--signedout" to="/signup">Sign Up</Link></li>
                        <li><Link className="header--signedout" to="/signin">Sign In</Link></li>
                    </ul>
                </React.Fragment>
              )}
            </nav>
          </div>
        </header>
      
    );
  };

export default Header;