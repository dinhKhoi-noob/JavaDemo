import React,{useContext,useEffect} from 'react';
import * as Type from '../../../constants/type'
import {CartContext} from '../../../contexts/CartContext'
import CartItem from './CartItem';

const CartList = () => {

    const {displayCheckout,setDisplayCheckout,cartState:{cart},dispatch} = useContext(CartContext);

    useEffect(()=>{
        dispatch({
            type:Type.GET_CART_ITEMS
        });
    },[]);

    let total = 0;

    cart.forEach(item=>{
        total += item.price*item.quantity
    })

    const body = cart.map((item,index)=><CartItem film={item} key = {index}/>);
    const cartListStyle = !displayCheckout ? "col-lg-12 col-sm-12 col-md-12 col-xs-12 mt-3" : "col-lg-8 col-md-8 col-xs-8 col-sm-8 mt-3"; 
    return (
        <div className={cartListStyle}>
            <div className="row">
                <h4 className="col-lg-8 col-sm-8 col-md-8 col-xs-8 mt-3">
                   Your Cart 
                </h4>
                <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 mt-3">
                    <button type="button" class="btn btn-outline-success" onClick={()=>setDisplayCheckout(true)} style={{float:'right'}}>
                        Checkout
                    </button>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="text-center col-lg-5 col-sm-5 col-md-5 col-xs-5 mt-2 pr-0 pl-0">
                            <strong>Name</strong>
                        </div>
                        <div className="text-center col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-2 pr-0 pl-0">
                            <strong>Price</strong>
                        </div>
                        <div className="text-center col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-2 pr-0 pl-0">
                            <strong>Quantity</strong>
                        </div>
                        <div className="text-center col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-2 pr-0 pl-0">
                            <strong>Total</strong>
                        </div>
                        <div className="text-center col-lg-1 col-sm-1 col-md-1 col-xs-1 mt-1 pr-0 pl-0">
                        </div>
                    </div>
                    {body}
                    <hr/>
                    <div className="text-right">
                        <strong>Total Amount: {total}$</strong><p></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList;