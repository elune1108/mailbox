import React, {useState} from 'react';
import {Button, Popover, Avatar} from 'antd';


export default function UserGreeting(props) {

    const [logoutVisible, setLogoutVisible] = useState(false);

    const handleLogoutVisibleChange = logoutVisible => {
        setLogoutVisible(logoutVisible);
    };

    const logout = () => {
        setLogoutVisible(false);
        props.handleLogoutClick()
    };

    const logoutDialog = (<Popover
        content={<Button type="link" onClick={logout}>Log Out</Button>}
        trigger="click"
        visible={logoutVisible}
        onVisibleChange={handleLogoutVisibleChange}
    >
        <Avatar>{props.username && props.username.charAt(0).toUpperCase()}</Avatar>
    </Popover>)


    return logoutDialog
}