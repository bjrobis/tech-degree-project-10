import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './context/UserContext';


const PrivateRoute = ({ children }) => {
    const {user} = useContext(UserContext);
    if (!user) {
      // user is not authenticated
      return <Navigate to="/signin" />;
    }
    return children;
  };

export default PrivateRoute;