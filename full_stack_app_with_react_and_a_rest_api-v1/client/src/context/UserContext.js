import { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom';

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState([]);

  const navigate = useNavigate();

  
//Sign-in by passing the emailAddress and password to the api
const userSignIn = (emailAddress, password) => {
  fetch('http://localhost:5000/api/users', {
      method: "GET",
      headers: {
          "Content-Type": "application/json; charset=utf-8", 
          "Authorization": 'Basic ' + btoa(`${emailAddress}:${password}`)
      }
  })
  .then(res => {
      if(res.status === 401) {
          return navigate('/error');
      } else {
          navigate('/');
          return res.json();
      }
  })
  .then(data => {
      if(data.message) {
          setMessage(data.message);
      } else {
          //Set data for current user in global state
          setUser(data.user);
          setUser(prevState => ({...prevState, password: password}));
      };
  })
  .catch((error) => {
      console.log('Error:', error);
  });
}

const userSignOut = (user) => {
  setUser(null);
  navigate('/');
}


  return (
    <UserContext.Provider value={{
      user,
      actions: {
        userSignIn: userSignIn,
        userSignOut: userSignOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;