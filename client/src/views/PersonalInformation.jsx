import React,{useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext'

const PersonalInformation = () => {
    const {authState:{user}} = useContext();
    return (
        <div className="container">
            <div class="card bg-dark text-white">
              <div class="card-img-overlay">
                <h4 class="card-title">Your Profile</h4>
                <hr/>
                <p class="card-text">Name: </p>                
              </div>
            </div>
        </div>
    );
};

export default PersonalInformation;