import React,{createContext,useState} from 'react'
import {apiUrl} from '../constants/url'
import axios from 'axios'

export const UploadFileContext = createContext();

const UploadFileContextProvider = ({children}) => {
    const [fileUploading,setFileUploading] = useState("");

    const uploadImage = async(file) => {
        try 
        {
            const response = await axios.put(`${apiUrl}/files`,file);
            return response.data;
        } 
        catch (error) 
        {
        
            return null;
        }
    }

    const UploadFileContextData = {
        fileUploading,
        setFileUploading,
        uploadImage
    };
    return(
        <UploadFileContext.Provider value = {UploadFileContextData}>
            {children}
        </UploadFileContext.Provider>
    )
}

export default UploadFileContextProvider;