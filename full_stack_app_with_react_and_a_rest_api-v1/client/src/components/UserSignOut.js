import React, {useContext} from "react";
import UserContext from '../context/UserContext';

const UserSignOut = () => {
    const user = useContext(UserContext);
    const {actions} = useContext(UserContext);

    actions.userSignOut(user);

};

export default UserSignOut;