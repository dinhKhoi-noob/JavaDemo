import React,{createContext,useReducer, useState} from 'react';
import * as Type from '../constants/type'
import { filmReducer } from '../reducers/FilmReducer';
import {apiUrl} from '../constants/url'
import axios from 'axios';

export const FilmContext = createContext();

const FilmContextProvider = ({children}) => {
    const [filmState,dispatch] = useReducer(filmReducer,{
        films : [],
        filmsManagement:[],
        film:''
    });

    const [displayingFilmModal,setDisplayingFilmModal] = useState(false);
    const [displayingEditFilmModal,setDisplayingEditFilmModal] = useState(false);
    
    const loadFilms = async() => {
        try 
        {
            const response = await axios.get(`${apiUrl}/api/film/all`);
            if(response.status === 200)
            {
                dispatch({
                    type:Type.GET_ALL_FILM_SUCCESSFULLY,
                    payload: response.data
                })
                return {message:"Successfully",data:response.data};
            }
        } 
        catch (error) 
        {
            dispatch({
                type:Type.GET_ALL_FILM_FAILED
            })
        }
    }

    const deleteFilm = async(id) => {
        try 
        {
            const response = await axios.delete(`${apiUrl}/api/film/${id}`);
            if(response.status === 200)
            {
                dispatch({
                    type:Type.DELETE_FILM,
                    payload: id
                })
                return {message:"Deleting Successfully",data:response.data}
            }
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    const loadFilmsForManage = async() =>{
        try 
        {
            const response = await axios.get(`${apiUrl}/api/film/manage`);
            if(response.status === 200)
            {
                dispatch({
                    type:Type.LOAD_FILMS_SUCCESSFULLY,
                    payload: response.data
                })
                return {message:"Successfully",data:response.data}
            }    
        } 
        catch (error) 
        {
            console.log(error);
        }        
    }

    const editFilm = async(id,data) => {
        try 
        {
            const response = await axios.put(`${apiUrl}/api/film/${id}`,data);
            if(response.status === 200)
            {
                dispatch({
                    type:Type.EDIT_FILM,
                    payload:response.data
                })
                return {message:"Editing Successfully",data:response.data}
            }
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    const uploadNewFilm = async(data) => {
        try 
        {
            const response = await axios.post(`${apiUrl}/api/film/create`,data);
            if(response.status === 200)
            {
                dispatch({
                    type: Type.UPLOAD_FILM_SUCCESSFULLY,
                    payload: response.data
                });
                return {message:"Successfully",data:response.data};
            }
            else
                dispatch({
                    type: Type.UPLOAD_FILM_FAILED
                });
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    const getSingleFilm = id => {
        const film = filmState.films.find(film=>id===film.id);
        dispatch({
            type: Type.GET_SINGLE_FILM,
            payload:film
        })
        return film;
    }

    const filmContextData = {
        filmState,
        dispatch,
        loadFilms,
        uploadNewFilm,
        displayingFilmModal,
        setDisplayingFilmModal,
        loadFilmsForManage,
        deleteFilm,
        editFilm,
        getSingleFilm,
        displayingEditFilmModal,
        setDisplayingEditFilmModal
    };

    return (
        <FilmContext.Provider value = {filmContextData}>
            {children}
        </FilmContext.Provider>
    );
};

export default FilmContextProvider;