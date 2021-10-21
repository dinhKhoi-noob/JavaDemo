import React,{createContext,useReducer, useState} from 'react';
import {AuthReducer} from '../reducers/AuthReducer';
import {apiUrl} from '../constants/url';
import * as Type from '../constants/type';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const history = useHistory();
    const [displayingAddStaffModal,setDisplayingAddStaffModal] = useState(false);
    const [authState,dispatch] = useReducer(AuthReducer,{
        user:null,
        isAuthenticated:false,
        staffs:[]
    });

    const loadUser = async() =>
    {
        try 
        {
            const id = localStorage.getItem("id");
            const response = await axios.get(`${apiUrl}/api/auth/${id}`);
            if(response.status === 200)
            {
                dispatch({
                    type: Type.LOAD_USER_SUCCESSFULLY,
                    payload:{
                        user: response.data,
                        isAuthenticated:true
                    }
                })
            }
        } 
        catch (error) 
        {
            console.log(error);                     
        }
    }

    const loadStaffs = async() => {
        try 
        {
            const response = await axios.get(`${apiUrl}/api/auth/staff`);
            if(response.status === 200)
                dispatch({
                    type:Type.LOAD_STAFF,
                    payload:response.data
                });
        }
        catch (error) 
        {
            console.error(error);
        }
    }

    const addStaff = async(data) =>{
        try 
        {
            const response = await axios.post(`${apiUrl}/api/auth/register`,data);
            if(response.status === 200)
            {
                confirmAlert({
                    title:"Adding staff",
                    message:"Adding new staff successfully",
                    buttons:[{
                        label:"OK",
                        onClick:()=>{
                            return;
                        }
                    }]
                })
            }
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    const registerUser = async(data) => {
        try 
        {
            const response = await axios.post(`${apiUrl}/api/auth/register`,data);
            if(response.status === 200)
            {
                localStorage.setItem("role",response.data.role);
                localStorage.setItem("id",response.data.id);
                await loadUser();
                history.push('/');
                return {data:response.data,message:"Successfully"}
            }
        } 
        catch (error) 
        {
            console.error(error);
        }
    }
    
    const logoutUser = () => {
        dispatch({
            type:Type.LOGOUT
        });
        localStorage.clear();
    }
    
    const loginUser = async(data) =>
    {
        try 
        {
            const response = await axios.post(`${apiUrl}/api/auth/login`,data);
            if(response.status === 200)
            {
                localStorage.setItem("role",response.data.role);
                localStorage.setItem("id",response.data.id);
                await loadUser();
                if(localStorage.getItem("role") !== "admin" && localStorage.getItem("role") != "staff")
                    history.push('/');
                if(localStorage.getItem("role") === "admin")
                    history.push('/ad-film')
                if(localStorage.getItem("role") === "staff")
                    history.push('/staff-film');
                return {data:response.data,message:"Login Successfully"}
            }    
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    const deleteStaff = async(id) =>{
        try 
        {
            const response = await axios.delete(`${apiUrl}/api/auth/delete/${id}`);
            if(response.status === 200)
            {
                confirmAlert({
                    title:"Delete staff",
                    message:"This staff has been deleted",
                    buttons:[{
                        label:"OK",
                        onClick:()=>{
                            return;
                        }
                    }]
                })
            }
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    const authContextData = {
        authState,
        registerUser,
        loginUser,
        loadUser,
        dispatch,
        logoutUser,
        loadStaffs,
        displayingAddStaffModal,
        setDisplayingAddStaffModal,
        addStaff,
        deleteStaff
    };

    return (
        <AuthContext.Provider value = {authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;