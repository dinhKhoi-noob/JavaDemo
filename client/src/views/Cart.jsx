import React from 'react';
import CartList from '../components/customerSites/cart/CartList';
import CheckoutSite from '../components/customerSites/cart/CheckoutSite';
import Navbar from '../components/layouts/Navbar'

const Cart = () => {
    return (
        <>
            <Navbar/>
            <div class="container">
                <div class="row">
                    <CartList/>
                    <CheckoutSite/>
                </div>
            </div>
        </>
    );
};

export default Cart;