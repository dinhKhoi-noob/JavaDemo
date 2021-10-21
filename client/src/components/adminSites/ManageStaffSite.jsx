import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import StaffSheet from './StaffSheet';
import AddNewStaffModal from './AddNewStaffModal';

const ManageStaffSite = () => {
    const {loadStaffs,authState:{staffs},setDisplayingAddStaffModal} = useContext(AuthContext);
    
    useEffect(()=>{
        loadStaffs()
    },[staffs]);

    const body = staffs.map(staff=><StaffSheet staff={staff}/>)
    const grid = `col-lg-3 col-md-3 col-xs-3 col-sm-3 mt-3`;
    return (
        <>
            <AddNewStaffModal/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 mt-3">
                        <h4>Manage Staff Site</h4>
                    </div>
                    <div className={grid}>
                        <button type="button" class="btn btn-outline-warning" onClick={()=>setDisplayingAddStaffModal(true)} style={{float: 'right'}}>Add new Staff</button>
                    </div>
                    <div className={grid}>
                        <strong>Username</strong>
                    </div>
                    <div className={grid}>
                        <strong>First Name</strong>
                    </div>
                    <div className={grid}>
                        <strong>Last Name</strong>
                    </div>
                    <div className={grid}>
                    </div>
                    {body}
                </div>
            </div>
        </>
    );
};

export default ManageStaffSite;