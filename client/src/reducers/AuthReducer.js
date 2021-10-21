import * as Type from '../constants/type'

export const AuthReducer = (state,action) => {
    const {type,payload} = action;
    switch (type){
        case Type.LOAD_USER_SUCCESSFULLY:
            state.user = payload.user;
            state.isAuthenticated = true;
            return {...state};
        case Type.LOGOUT:
            return {...state,user:null,isAuthenticated:false};
        case Type.LOAD_STAFF:
            return {...state,staffs:payload};
        default:
            return state;
    }
};