import * as Type from '../constants/type'

export const filmReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type)
    {
        case Type.GET_ALL_FILM_SUCCESSFULLY:
            return {...state,films:payload};
        case Type.GET_ALL_FILM_FAILED:
            return {...state,films:[]};
        case Type.LOAD_FILMS_SUCCESSFULLY:
            return {...state,filmsManagement:payload};
        case Type.EDIT_FILM:
            const newFilms = state.films.map(film=>
                film.id === payload.id ? payload : film
                )
            return {...state,films:newFilms};
        case Type.DELETE_FILM:
            const listFilms = state.films.filter(film=>
                film.id !== payload
                )
            state.films = listFilms;
            return {...state};
        case Type.GET_SINGLE_FILM:
            console.log(payload);
            return {...state,film:payload};
        default:
            return state;
    }
}