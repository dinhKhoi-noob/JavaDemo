import * as Type from '../constants/type'

export const CartReducer = (state, action) => {
    state.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];
    const {type,payload} = action;
    switch (type) {
        case Type.CHANGE_CART_VALUE:
            const index = state.cart.findIndex(i=>i.id === payload.film.id);
            if(index !== -1)
            {
                console.log(payload.quantity);
                state.cart[index].quantity = state.cart[index].quantity+(payload.quantity);
                if(state.cart[index].quantity <= 0)
                    state.cart.splice(index,1);
                localStorage.setItem('cart', JSON.stringify(state.cart));
                return {...state};
            }
            else
                if(payload.quantity >= 1)
                {
                    const newItem = {
                        quantity:1,
                        name:payload.film.name,
                        id: payload.film.id,
                        price:payload.film.price,
                        poster:payload.film.poster
                    }
                    state.cart.push(newItem);
                    localStorage.setItem('cart',JSON.stringify(state.cart));
                    return {...state};
                }
        case Type.GET_CART_ITEMS:
            return {...state}
        case Type.DELETE_CART_ITEM:
            const idx = state.cart.findIndex(item=> item.id === payload.film.id);
            if(idx !== -1)
            {
                state.cart.splice(idx,1);
                if(state.cart.length > 0)
                {
                    localStorage.setItem('cart', JSON.stringify(state.cart));
                }
                else
                    localStorage.removeItem('cart');
            }
            return {...state};
        case Type.ADD_NEW_INVOICE:
            state.cart = [];
            state.invoice = payload;
            return {...state};
        default:
            return state;
    }
};