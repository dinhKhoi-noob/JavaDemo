import React,{useContext,useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {AuthContext} from '../../contexts/AuthContext'
import Form from 'react-bootstrap/Form'
import cryptoRandomString from 'crypto-random-string';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const AddNewStaffModal = () => {
    const {displayingAddStaffModal,addStaff,setDisplayingAddStaffModal} = useContext(AuthContext);
    const [staffState,setStaffState] = useState({
        username:"",
        password:"",
        firstName:"",
        lastName:"",
    });
    const {username,password,firstName,lastName} = staffState;

    const resetFields = () =>{
        setStaffState({username: "", password: "", firstName: "", lastName:""});
    }
    const closeDialog = () =>{
        resetFields();
        setDisplayingAddStaffModal(false);
    }
    const onChangeHandler = (event) => {
        setStaffState({...staffState,[event.target.name]:event.target.value});
    }
    const onSubmitHandler = async event => {
        event.preventDefault();
        const id = cryptoRandomString({length:16});
        staffState.id = id;
        setDisplayingAddStaffModal(false);
        confirmAlert({
            title:"Add new staff",
            message:"Adding new staff with these information ?",
            buttons:[
                {
                    label:"Yes",
                    onClick:async()=>{
                        staffState.role="staff";
                        await addStaff(staffState);
                        resetFields();
                    }
                },
                {
                    label:"No",
                    onClick:()=>{
                        resetFields();
                        return;
                    }
                }
            ]
        })
    }
    return (
        <Modal onHide={closeDialog} show={displayingAddStaffModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Staff</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmitHandler}>
                <Modal.Body>
                    <Form.Group>
                        <span>First Name</span>
                        <Form.Control
                         type="text"
                         placeholder="First Name"
                         name="firstName"
                         value={firstName}
                         onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <span>Last Name</span>
                        <Form.Control
                         type="text"
                         placeholder="Last Name"
                         name="lastName"
                         value={lastName}
                         onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <span>Username</span>
                        <Form.Control
                         type="text"
                         placeholder="Username"
                         name="username"
                         value={username}
                         onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <span>Password</span>
                        <Form.Control
                         type="password"
                         placeholder="Password"
                         name="password"
                         value={password}
                         onChange={onChangeHandler}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-outline-warning" onClick={closeDialog}>Cancel</button>
                    <button type="submit" class="btn btn-outline-primary">Save</button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddNewStaffModal;