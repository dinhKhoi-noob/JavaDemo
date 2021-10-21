import React,{useContext,useEffect,useState} from 'react';
import {CartContext} from '../../../contexts/CartContext';
import {GET_CART_ITEMS} from '../../../constants/type'
import cryptoRandomString from 'crypto-random-string';
import {useHistory} from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const CheckoutSite = () => {
    const history = useHistory();
    const {dispatch,displayCheckout,setDisplayCheckout,addNewInvoice,cartState:{cart}} = useContext(CartContext);
    const [invoice,setInvoice] = useState({
        id:'',
        date:'',
        items:[],
        totalAmount:0,
        name:'',
        bankId:'',
        address:'',
        phone:''
    });
    const {name,bankId,address,phone} = invoice;

    useEffect(()=>{
        dispatch({
            type:GET_CART_ITEMS
        });
    },[])

    const resetFields = () => {
        setInvoice({id:'',items:[],name:'',date:'',bankId:'',address:'',phone:'',totalAmount:0});
    }

    const closeCheckoutTab = () => {
        resetFields();
        setDisplayCheckout(false);
    }

    const onTyping = event => {
        setInvoice({...invoice,[event.target.name]:event.target.value});
    }

    const onSubmitHandler = async(event) => {
        event.preventDefault();
        if(!localStorage.getItem("id"))
        {
            confirmAlert({
                title:"Redirect to login",
                message:"It seems like you have not logged in, become our member ship will bring you a lot benefits. Go back to the login page?",
                buttons:[
                    {
                        label : "Yes",
                        onClick:()=>history.push("/login")
                    },
                    {
                        label : "No",
                        onClick:()=>{
                            if(!name || !address || !phone || !bankId)
                                confirmAlert({
                                    Title:"Blank field",
                                    message:"Please enter all fields",
                                    buttons:[
                                        {
                                            label:"OK",
                                            onClick:()=>{
                                                resetFields();
                                            }
                                        }
                                    ]
                                })
                            else
                            {
                                confirmAlert({
                                    title:"Ready for purchase",
                                    message:"Please check carefully all of your information before purchasing, if it's done, click Ok to purchase",
                                    buttons:[
                                        {
                                            label:"Ok",
                                            onClick:async()=>{
                                                invoice.items = cart;
                                                cart.forEach((item) =>
                                                    invoice.totalAmount += item.quantity*item.price
                                                )
                                                invoice.id = cryptoRandomString({length:16});
                                                invoice.date = new Date().getDate().toLocaleString();
                                                await addNewInvoice(invoice);
                                                localStorage.removeItem('cart');
                                                closeCheckoutTab();
                                            }
                                        },
                                        {
                                            label:"Cancel",
                                            onClick:()=>{}
                                        }
                                    ]
                                })
                            }
                        }   
                    }
                ]
            })
        }
        else
        {
            if(!name || !bankId || !address || !phone)
                    confirmAlert({
                        title:"Blank field",
                        message:"Please enter all fields before purchasing !",
                        buttons:[
                            {
                                label:"Ok",
                                onClick:()=>{
                                    return;
                                }
                            }
                        ]
                    })
                else{
                    confirmAlert({
                        title:"Ready for purchase",
                        message:"Please check carefully all of your information before purchasing, if it's done, click Ok to purchase",
                        buttons:[
                            {
                                label:"Ok",
                                onClick:async()=>{
                                    invoice.items = cart;
                                    cart.forEach((item) =>
                                        invoice.totalAmount += item.quantity*item.price
                                    )
                                    invoice.id = cryptoRandomString({length:16});
                                    invoice.date = new Date().getDate().toLocaleString();
                                    invoice.userId = localStorage.getItem("id");
                                    await addNewInvoice(invoice);
                                    localStorage.removeItem('cart');
                                    closeCheckoutTab();
                                }
                            },
                            {
                                label:"Cancel",
                                onClick:()=>{
                                    return;
                                }
                            }
                        ]
                    })
                }
        }
    }
    const hidden = displayCheckout? 1 : 0;
    return (
        <div className="col-lg-4 col-xs-4 col-md-4 col-sm-4 mt-3" style={{opacity: hidden}}>
            <div class="container">
                <form>
                    <div class="form-group">
                        <label for="name" class="col-sm-1-12 col-form-label">Name: </label>
                        <div class="col-sm-1-12">
                            <input type="text" class="form-control" name="name" id="name" placeholder="Full Name" value={name} onChange={onTyping}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="address" class="col-sm-1-12 col-form-label">Address: </label>
                        <div class="col-sm-1-12">
                            <input type="text" class="form-control" name="address" id="address" placeholder="Address" value={address} onChange={onTyping}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="phone" class="col-sm-1-12 col-form-label">Phone: </label>
                        <div class="col-sm-1-12">
                            <input type="text" class="form-control" name="phone" id="phone" placeholder="Phone" value={phone} onChange={onTyping}/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="zipCode" class="col-sm-1-12 col-form-label">Bank Account Number: </label>
                        <div class="col-sm-1-12">
                            <input type="text" class="form-control" name="bankId" id="bankId" placeholder="Bank Account Number" value={bankId} onChange={onTyping}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                            <button type="submit" class="btn btn-outline-success" onClick={onSubmitHandler}>OK</button>&nbsp;
                            <button type="button" class="btn btn-outline-warning" onClick={resetFields}>Clear</button>&nbsp;
                            <button type="button" class="btn btn-outline-danger" onClick={closeCheckoutTab}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutSite;