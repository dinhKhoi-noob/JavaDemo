import React,{useContext,useEffect} from 'react';
import UploadingFilmModal from '../components/adminSites/UploadingFilmModal';
import {FilmContext} from '../contexts/FilmContext'
import Film from '../components/customerSites/dashboard/Film'
import Navbar from '../components/layouts/Navbar';

const Dashboard = () => {

    const {filmState:{films},loadFilms} = useContext(FilmContext);
    useEffect(()=>{
        loadFilms();
    },[films]);
    
    const filmsBody = films.map(film=><Film film={film}/>)

    return (
        <div>
            <Navbar/>
            {filmsBody}
            <UploadingFilmModal/>
        </div>
    )
}
export default Dashboard;