import React,{useContext, useEffect} from 'react';
import {FilmContext} from '../../contexts/FilmContext'
import FilmSheet from './FilmSheet';
import UploadingFilmModal from './UploadingFilmModal'
import EditFilmModal from './EditFilmModal'

const AdminDashboard = () => {
    const {filmState:{filmsManagement},loadFilmsForManage,setDisplayingFilmModal} = useContext(FilmContext);

    useEffect(()=>{
        loadFilmsForManage();
    },[filmsManagement])

    const filmList = filmsManagement.map((film,index)=>{
        return <FilmSheet film={film} key={index}/>
    })

    return (
        <>
            <UploadingFilmModal/>
            <EditFilmModal/>
            <div class="container">
                <div class="row">
                    <div className = "col-lg-9 col-sm-9 con-md-9 col-xs-9 mt-3">
                        <h4>Manage your film list</h4>
                    </div>
                    <div className="col-lg-3 col-sm-3 col-md-3 col-xs-3 mt-3">
                        <button type="button" onClick={()=>setDisplayingFilmModal(true)} style={{float: 'right'}} class="btn btn-outline-warning">Add new Film</button>
                    </div>
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 mt-3">
                        <strong>Film Name</strong>
                    </div>
                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-3">
                        <strong>Total Sold out</strong>
                    </div>
                    <div className="col-lg-2 col-sm-2 col-md-2 col-xs-2 mt-3">
                        <strong>Amount</strong>
                    </div>
                    <div className="col-lg-4 col-sm-4 col-md-4 col-xs-4 mt-3">
                    </div>
                    <hr/>
                    {filmList}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;