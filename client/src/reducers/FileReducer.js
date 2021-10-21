import * as Type from '../constants/type';

export const FileReducer = (state,action) =>{
    const {type,payload} = action;
    switch(type)
    {
        case Type.UPLOAD_FILE_SUCCESS:
            console.log(payload);
            return {...state,fileUploading:payload}
        case Type.UPLOAD_FILE_FAILED:
            return {...state,fileUploading:""}
        default:
            return state;
    }
}