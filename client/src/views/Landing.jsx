import React from 'react';
import Login from '../components/authentication/Login'
import Register from '../components/authentication/Register'
import {Redirect} from 'react-router-dom'

const Landing = ({authRoute}) => {
    const role = localStorage.getItem("role");
    let body;

    if(!role)
        body = (
            <>
                {authRoute === 'login' && <Login />}
                {authRoute === 'register' && <Register />}
            </>
        )
    else if(role === "admin")
        return <Redirect to="/ad-film"/>
    else if(role === "staff")
        return <Redirect to="/staff-film"/>
    else
        return <Redirect to="/"/>
    return (
        <>
          {body}
        </>
    );
};

export default Landing;