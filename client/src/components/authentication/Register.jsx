import React,{useState,useContext} from 'react';
import SlidePictures from '../layouts/SlidePictures'
import {Link} from 'react-router-dom'
import arrowLeftCircle from '../../assets/icons/arrow-left-circle-fill.svg'
import {AuthContext} from '../../contexts/AuthContext'
import cryptoRandomString from 'crypto-random-string';

const Register = () => {
    const [registerState,setRegisterState] = useState({
        id:"",
        username:"",
        password:"",
        confirmPassword:"",
        firstName:"",
        lastName:"",
        role:"customer"
    })
    const {registerUser} = useContext(AuthContext);

    const onTyping = (event) => {
        setRegisterState({...registerState,[event.target.name]:event.target.value});
    }

    const onSubmitForm = async(event) => {
        event.preventDefault();
        const randomId = cryptoRandomString({length:15});
        registerState.id = randomId;
        delete registerState.confirmPassword;
        await registerUser(registerState);
        // history.push('/');
    }

    return (
        <section class="login-block">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 login-sec">
                        <h2 class="text-center">Register</h2>
                        <form class="login-form" onSubmit={onSubmitForm}>
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-uppercase">First Name</label>
                                <input type="text" onChange={onTyping} name="firstName" class="form-control" placeholder="Ex: Donald"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-uppercase">Family Name</label>
                                <input type="text" onChange={onTyping} name="lastName" class="form-control" placeholder="Ex: Trump"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                                <input type="text" onChange={onTyping} name="username" class="form-control" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                                <input type="password" onChange={onTyping} name="password" class="form-control" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" class="text-uppercase">Confirm Password</label>
                                <input type="password" onChange={onTyping} name="confirmPassword" class="form-control" placeholder="Confirm Password"/>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 col-lg-8 col-md-8 col-xs-8">Already have an account? Go back 
                                    <Link to="/login">
                                        <img src={arrowLeftCircle}/>
                                    </Link>
                                </div>
                                <div class="col-sm-4 col-lg-4 col-md-4 col-xs-4">
                                    <label class="form-check-label">
                                    </label>
                                    <button type="submit" class="btn btn-login float-right">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <SlidePictures/>
                </div>
            </div>
        </section>
    );
};

export default Register;