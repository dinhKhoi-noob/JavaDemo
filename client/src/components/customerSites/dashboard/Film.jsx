import React, { useContext } from 'react';
import {CartContext} from '../../../contexts/CartContext';
import * as Type from '../../../constants/type'

const Film = ({film}) => {
    const {dispatch} = useContext(CartContext);

    const onAddToCart = () =>
        dispatch({
            type:Type.CHANGE_CART_VALUE,
            payload:{
                film,
                quantity:1                
            }
        });

    const {name,description,genre,language,price,director,releaseDate,range,time,poster} = film;
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-sm-4 col-lg-4 col-md-4 col-xs-4 mt-3 mb-3">
                    <img src={poster} style={{maxWidth: '100%',maxHeight: '100%'}}>
                    </img>
                </div>
                <div className="col-sm-8 col-lg-8 col-md-8 col-xs-8 mt-3 mb-3">
                    <div class="card border-warning">
                      <div class="card-body">
                        <div class="row">
                            <div class="col-sm-8 col-lg-8 col-md-8 col-xs-8 mt-3">
                                <h4 class="card-title">{name}</h4>
                            </div>
                            <div class="col-sm-4 col-lg-4 col-md-4 col-xs-4 mt-3">
                                <button type="button" class="btn btn-outline-warning" onClick={onAddToCart}>Buy a ticket</button>
                            </div>
                        </div>
                        <p class="card-text mt-2">Director: {director}</p>
                        <p class="card-text mt-2">Genre: {genre}</p>
                        <p class="card-text mt-2">Release Date: {releaseDate}</p>
                        <p class="card-text mt-2">Time: {time} minutes</p>
                        <p class="card-text mt-2">Price: ${price}</p>
                        <p class="card-text mt-2">Language: {language}</p>
                        <p class="card-text mt-2">Rate: {range}</p>
                        <div>Main content: {description}</div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Film;