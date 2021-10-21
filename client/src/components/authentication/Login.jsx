import React,{useState,useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import SlidePictures from '../layouts/SlidePictures'
import {Link} from 'react-router-dom'

const Login = () => {
    const [loginState,setLoginState] = useState({
        username:"",
        password:"",
    });
    const {loginUser} = useContext(AuthContext);
    
    const onTyping = (event) =>
    {
        setLoginState({...loginState,[event.target.name]:event.target.value});
    }

    const onSubmitForm = async(event) =>
    {
        event.preventDefault();
        await loginUser(loginState);
    }

    return (
        <section class="login-block">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 login-sec">
                        <h2 class="text-center">Login Now</h2>
                        <form class="login-form" onSubmit = {onSubmitForm}>
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                                <input type="text" name="username" onChange={onTyping} class="form-control" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                                <input type="password" name="password" onChange={onTyping} class="form-control" placeholder="Password"/>
                            </div>
                            <div class="form-check">
                                <Link to="/register">
                                    <button type="button" class="float-right btn btn-outline-primary">Register</button>
                                </Link>
                                <button type="submit" class="btn btn-login float-right">Submit</button>
                            </div>
                        </form>
                    </div>
                    <SlidePictures/>
                </div>
            </div>
        </section>
    );
};

export default Login;