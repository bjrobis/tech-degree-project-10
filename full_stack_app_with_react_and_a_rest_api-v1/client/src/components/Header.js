import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
   
    
    
    return(
    <React.Fragment>
    <head>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="index.html">Courses</a></h1>
            <nav>
                <ul className="header--signedin">
                    <li>Welcome, Joe Smith!</li>
                    <li><a href="sign-out.html">Sign Out</a></li>
                </ul>
            </nav>
        </div>
    </head>

    </React.Fragment>
    );
};
export default Header;