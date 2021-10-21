import React, { useContext } from 'react';
import {DELETE_CART_ITEM,CHANGE_CART_VALUE} from '../../../constants/type'
import {CartContext} from '../../../contexts/CartContext'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const CartItem = ({film}) => {
    const {name,quantity,price,poster} = film;
    const {dispatch} = useContext(CartContext);
    const total = price*quantity;

    const onIncreasing = () => {
        dispatch({
            type : CHANGE_CART_VALUE,
            payload:{
                film,
                quantity:1
            }
        });
    }

    const onDecreasing = () => {
        dispatch({
            type : CHANGE_CART_VALUE,
            payload:{
                film,
                quantity:-1
            }
        })
    }

    const onDeleteItem = () => {
        confirmAlert({
            title:"Confirm for remove",
            message: "Remove this item from your cart ?",
            buttons:[
                {
                    label: "Remove",
                    onClick: () =>{
                        dispatch({
                            type: DELETE_CART_ITEM,
                            payload:{
                                film
                            }
                        })
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
    
    return (
        <>
            <hr/>
            <div className="row">
                <div className="col-lg-5 col-sm-5 col-md-5 col-xs-5 mt-2">
                    <div className="row">
                        <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4">
                            <img src={poster} style={{maxWidth:'85%',maxHeight:'85%'}}/>
                        </div>
                        <div className="col-lg-8 col-sm-8 col-md-8 col-xs-8 text-left">
                            {name}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-2 text-center">
                    ${price}
                </div>
                <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-2 text-left">
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6 text-center">
                            <input type="number" style={{width:"100%"}} name="quantity" value={quantity}/>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
                            <div>
                                <i class="fa fa-plus-circle" aria-hidden="true" onClick={onIncreasing} style={{cursor: "pointer"}}></i>
                            </div>
                            <div>
                                <i class="fa fa-minus-circle" aria-hidden="true" onClick={onDecreasing} style={{cursor: "pointer"}}></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-2 text-center">
                    ${total}
                </div>
                <div className="col-lg-1 col-sm-1 col-xs-1 col-xs-1 mt-2">
                    <button type="button" style={{float:"right"}} class="btn btn-outline-danger" onClick={onDeleteItem}>Remove</button>
                </div>
            </div>
        </>
    );
};

export default CartItem;