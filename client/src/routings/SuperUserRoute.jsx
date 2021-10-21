import React from 'react';
import {Redirect, Route} from 'react-router-dom'
import Navbar from '../components/layouts/Navbar';

const SuperUserRoute = ({component:Component, ...rest}) => {
    const role = localStorage.getItem('role');
    const body = <Route {...rest} render={
        props => role === 'staff'?
        <>
            <Navbar/>
            <Component {...rest} {...props}/>
        </>
        :
        <Redirect to="/"/>
    }/>
    return (
        <>
            {body}   
        </>
    );
};

export default SuperUserRoute;