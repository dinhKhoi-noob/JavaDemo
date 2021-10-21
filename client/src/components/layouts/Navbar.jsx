import React,{useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const Navbar = () => {
    let body;
    const {logoutUser,authState:{user},loadUser} = useContext(AuthContext);
    useEffect(()=>{
        if(localStorage.getItem("id"))
            loadUser()
        }
    );
    const role = localStorage.getItem("role");
    const onDisplaySavingsWallet = () =>{
        confirmAlert({
            title:"Your wallet",
            message:`You have total $${user.savingsWallet}`,
            buttons:[
                {
                    label:"Ok",
                    onClick:()=>{
                        return;
                    }
                }
            ]
        })
    }
    const onLogout = () => {
        confirmAlert({
            title:"Ready for logout",
            message:"Do you really want to logout ?",
            buttons:[
                {
                    label:"Yes",
                    onClick:()=>{
                        logoutUser();
                    }
                },
                {
                    label:"No",
                    onClick:()=>{
                        return;
                    }
                }
            ]
        })
    }
    if(role === "admin")
        body = <>
            <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Manage</Link>
                <div class="dropdown-menu" aria-labelledby="dropdownId">
                    <Link class="dropdown-item" to="/ad-staff">Staff</Link>
                    <Link class="dropdown-item" to="/ad-film">Film</Link>
                </div>
            </li>&nbsp;&nbsp;&nbsp;
            <li class="nav-item">
                <Link to="/cart">
                    <button type="button" class="btn btn-outline-success">Cart</button>
                </Link>&nbsp;
            </li>
            <li class="nav-item">
                <button type="button" class="btn btn-outline-primary" onClick={onLogout}>Logout</button>
            </li>
        </>
    else if(role === "staff")
    {
        body = <>
            <li class="nav-item">
                <Link to="/staff-film">
                    <button type="button" class="btn btn-outline-success">Manage Film</button>
                </Link>&nbsp;
            </li>
            <li class="nav-item">
                <button type="button" class="btn btn-outline-primary" onClick={onLogout}>Logout</button>
            </li>
        </>
    }
    else if(role === "customer")
    {
        body = <>
            <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Manage</Link>
                <div class="dropdown-menu" aria-labelledby="dropdownId">
                    <Link class="dropdown-item" onClick = {onLogout}>
                        Logout
                    </Link>
                    <div class="dropdown-item" onClick={onDisplaySavingsWallet}>
                        Your account                            
                    </div>
                </div>
            </li>
            <li class="nav-item">
                <Link to="/cart">
                    <button type="button" class="btn btn-primary">Cart</button>
                </Link>
            </li>
        </>
    }
    else
    {   
        body = <>
            <li class="nav-item">
                <Link to="/cart">
                    <button type="button" class="btn btn-outline-success">Cart</button>
                </Link>&nbsp;
            </li>
            <li class="nav-item">
                <Link to = "/login">
                    <button type="button" class="btn btn-outline-primary">Login</button>
                </Link>
            </li>
        </>

    }
    return (
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0 col">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-md-9 col-xs-9 col-sm-9 mt-2 mb-2">
                            <div class="row">
                                <li class="nav-item active">
                                    <Link class="nav-link" to="/">Home</Link>
                                </li>
                                <li class="nav-item">
                                </li>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-xs-3 col-sm-3 mt-2 pl-0 pr-0">
                            <div class="row">
                                {body}
                            </div>
                        </div>
                    </div>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;