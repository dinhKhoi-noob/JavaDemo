import React,{useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const StaffSheet = ({staff}) => {
    const {deleteStaff} = useContext(AuthContext);
    const grid = `col-lg-3 col-md-3 col-xs-3 col-sm-3 mt-3`;
    const {username,firstName,lastName,id} = staff;
    
    const onDeleteStaff = async() =>{
        confirmAlert({
            title:"Confirm to delete staff",
            message: "Are you really want to delete this staff ?",
            buttons:[
                {
                    label: "Yes",
                    onClick:async()=>{
                        await deleteStaff(id);
                    }
                },
                {
                    label: "No",
                    onClick:()=>{
                        return;
                    }
                }
            ]
        })
    }

    return (
        <>
            <div className={grid}>
            {username}
            </div>
            <div className={grid}>
            {firstName}
            </div>
            <div className={grid}>
            {lastName}
            </div>
            <div className={grid}>
                <button type="button" class="btn btn-danger" style={{float: 'right'}} onClick={onDeleteStaff}>Delete</button>
            </div>
        </>
    );
};

export default StaffSheet;