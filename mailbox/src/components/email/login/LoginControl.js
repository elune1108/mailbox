import React, {useState} from 'react';
import UserGreeting from "./UserGreeting";
import LoginForm from "./LoginForm";
import Cookies from 'js-cookie';

export default function LoginControl(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("username"));
    const [username, setUsername] = useState(Cookies.get("username"));

    const handleLoginClick = (username) => {
        setIsLoggedIn(true);
        console.log("login : " + username)
        setUsername(username)
        Cookies.set("username", username)
        props.onUsernameChange(username)
    }

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setUsername(null)
        Cookies.remove("username")
        props.onUsernameChange(null)
    }


    if (isLoggedIn) {
        return <UserGreeting handleLogoutClick={handleLogoutClick} username={username}/>;
    }
    return <LoginForm handleLoginClick={handleLoginClick}/>;
}