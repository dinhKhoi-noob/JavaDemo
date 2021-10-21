import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import Navbar from '../components/layouts/Navbar';

const AdminRoute = ({component:Component,...rest}) => {
    const role = localStorage.getItem('role');
    const body = <Route {...rest} render={props=>role==='admin'?
    <>
        <Navbar/>
        <Component {...rest} {...props}/>
    </>
    :
    <Redirect to="/"/>}
    />
    return (
        <>
            {body}   
        </>
    );
};

export default AdminRoute;