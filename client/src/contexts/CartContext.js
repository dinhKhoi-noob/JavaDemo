import React,{createContext,useReducer, useState} from 'react';
import {apiUrl} from '../constants/url'
import axios from 'axios';
import * as Type from '../constants/type'
import {CartReducer} from '../reducers/CartReducer'

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [cartState,dispatch] = useReducer(CartReducer,{
        cart:[],
        invoice:null
    });
    const[displayCheckout,setDisplayCheckout] = useState(false);

    const addNewInvoice = async data => {
        try 
        {
            const response = await axios.post(`${apiUrl}/api/cart/create`,data);
            dispatch({
                type:Type.ADD_NEW_INVOICE,
                payload:response.data
            })
            console.log(cartState.invoice);
        } 
        catch (error) 
        {
            console.log(error);            
        }
    }

    const cartContextValue = {
        cartState,
        displayCheckout,
        setDisplayCheckout,
        dispatch,
        addNewInvoice
    };
    
    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;