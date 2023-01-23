import React, {useContext} from "react";
import UserContext from '../context/UserContext';

const UserSignOut = () => {
    let user = useContext(UserContext);
    let {actions} = useContext(UserContext);

    actions.userSignOut(user);

};

export default UserSignOut;