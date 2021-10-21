import React,{useState,useContext, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { confirmAlert } from 'react-confirm-alert';
import {UploadFileContext} from '../../contexts/UploadFileContext'
import {FilmContext} from '../../contexts/FilmContext'
import 'react-confirm-alert/src/react-confirm-alert.css';

const EditFilmModal = () => {
    const {displayingEditFilmModal,setDisplayingEditFilmModal,filmState:{film},editFilm} = useContext(FilmContext);

    const [newFilm,setNewFilm] = useState(film);
    useEffect(()=>setNewFilm(film),[film]);
    
    const formData = new FormData();
    const {fileUploading,setFileUploading,uploadImage} = useContext(UploadFileContext);
    
    let data = {
        name:newFilm?newFilm.name:"",
        price:newFilm?newFilm.price:0,
        description:newFilm?newFilm.description:"",
        time:newFilm?newFilm.time:0,
        genre:newFilm?newFilm.genre:"",
        releaseDate:newFilm?newFilm.releaseDate:"",
        language:newFilm?newFilm.language:"",
        range:newFilm?newFilm.range:"",
        director:newFilm?newFilm.director:""
    }

    const {price,name,description,time,genre,releaseDate,language,range,director} = data;
    const resetFields = () =>{
        setNewFilm({name:"",price:0,description:"",time:0,genre:"",releaseDate:"",language:"",range:"",poster:"",director:""})
        setFileUploading("");
    }

    const onSelectedFile =(event) => {
        setFileUploading(event.target.files[0]);
    }

    const onChangeHandler = (event) => {
        setNewFilm({...newFilm,[event.target.name]:event.target.value});
    }

    const closeDialog = () => {
        resetFields();
        setDisplayingEditFilmModal(false);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        setDisplayingEditFilmModal(false);
        confirmAlert({
            title:"Confirm to change",
            message:"Do you really want to change it ?",
            buttons:[
                {
                    label: "Yes",
                    onClick:async()=>{
                        let data;
                        if(!fileUploading || fileUploading === "")
                        {
                            data = {
                                name,
                                price,
                                description,
                                time,
                                genre,
                                releaseDate,
                                language,
                                range,
                                director,
                                poster:newFilm?newFilm.poster:""
                            };
                        }
                        else
                        {
                            formData.append("file",fileUploading);
                            const img = await uploadImage(formData);
                                data = {
                                name,
                                price,
                                description,
                                time,
                                genre,
                                releaseDate,
                                language,
                                range,
                                director,
                                poster:`http://localhost:6039/files/${img.fileName}`
                            }
                        }
                        await editFilm(film.id,data);
                        resetFields();
                    }
                },
                {
                    label: "No",
                    onClick:()=>{
                        resetFields();              
                    }
                }
            ]
        })
    }
    return (
        <Modal show={displayingEditFilmModal} onHide = {closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Film
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmitForm}>
                <Modal.Body>
                    <Form.Group>
                        <span>Title</span>
                        <Form.Control
                        type="text"
                        placeholder="Title"
                        name="name"
                        value={name}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Director</span>
                        <Form.Control
                        type="text"
                        placeholder="Director"
                        name="director"
                        value={director}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Genre</span>
                        <Form.Control
                        type="text"
                        placeholder="Genre"
                        name="genre"
                        value={genre}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Description</span>
                        <textarea 
                        rows="3"
                        cols="48"
                        name="description"
                        value={description}
                        onChange={onChangeHandler}
                        placeholder="Description"
                        />
                    </Form.Group>
                    <Form.Group>
                        <span>Release Date</span>
                        <Form.Control
                        type="text"
                        placeholder="Release Date"
                        name="releaseDate"
                        value={releaseDate}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Language</span>
                        <Form.Control
                        type="text"
                        placeholder="Language"
                        name="language"
                        value={language}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Time</span>
                        <Form.Control
                        type="number"
                        placeholder="Time"
                        name="time"
                        value={time}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Price</span>
                        <Form.Control
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Add Poster</span>
                        <Form.Control
                        type="file"
                        accept="img/*"
                        name="poster"
                        id = "poster"
                        onChange={onSelectedFile}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <span>Range</span>
                        <Form.Control
                        type="text"
                        placeholder="Range"
                        name="range"
                        value={range}
                        onChange={onChangeHandler}
                        >
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-outline-warning" onClick={closeDialog}>Cancel</button>
                    <button type="submit" class="btn btn-outline-primary">Save</button>
                </Modal.Footer>
            </Form>
        </Modal>   
    );
};

export default EditFilmModal;