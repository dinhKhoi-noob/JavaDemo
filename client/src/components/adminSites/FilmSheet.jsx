import React,{useContext} from 'react';
import {FilmContext} from '../../contexts/FilmContext';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const FilmSheet = ({film}) => {
    const {deleteFilm,setDisplayingEditFilmModal,getSingleFilm} = useContext(FilmContext);
    const onDeleteFilm = () =>
    {
        confirmAlert({
            title:"Confirm to delete film",
            message: "Are you really want delete this film ?",
            buttons:[
                {
                    label: "Yes",
                    onClick:async()=>{
                        await deleteFilm(film.id);
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

    const onEditHandler = (id) =>
    {
        getSingleFilm(id);
        setDisplayingEditFilmModal(true);
    }

    return (
        <>
            <hr/>
            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 mt-3">
                {film.name}
            </div>
            <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-3">
                {film.totalSoldOut}
            </div>
            <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-3">
                ${film.amount}
            </div>
            <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 mt-3">
                <div className="row">
                    <div className="col-lg-5 col-sm-5 col-md-5 col-xs-5 mt-3" >
                        <button type="button" class="btn btn-outline-primary" style={{float: 'right'}}>View</button>
                    </div>
                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-3">
                        <button type="button" class="btn btn-outline-warning" onClick={async()=>onEditHandler(film.id)} style={{float: 'right'}}>Edit</button>
                    </div>
                    <div className="col-lg-5 col-sm-5 col-md-5 col-xs-5 mt-3">
                        <button type="button" class="btn btn-outline-danger" onClick={()=>onDeleteFilm()} style={{float: 'right'}}>Remove in Customer view</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilmSheet;