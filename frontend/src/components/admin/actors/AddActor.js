import React, {Fragment, useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { useDispatch,  useSelector} from 'react-redux';
import {newActor, clearErrors} from '../../../redux/actions/actorActions';
import { NEW_ACTOR_RESET } from '../../../redux/constants/actorConstants'

import { useHistory} from "react-router-dom";

const AddActor = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    
    const alert = useAlert();
    //useDispatch
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newActor);

    
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/actor');
            alert.success('Actor created successfully');
            dispatch({ type: NEW_ACTOR_RESET })
        }

    }, [dispatch, alert, error, success, history])
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('bio', bio);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newActor(formData));
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (  
        <Fragment>
            <div className="content content-wrapper">
            <h1>Add Actors</h1>

            <Form className="form-group" onSubmit={submitHandler} encType='multipart/form-data'>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={ name } placeholder="" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Biography</Form.Label>
                <Form.Control as="textarea" value={ bio }  placeholder="" onChange={(e) => setBio(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
            </Form.Group>

            {/* Add Genre Button  */}
            <Button variant="danger" type="submit" className="right"  disabled={loading ? true : false} >
                Submit
            </Button>
            </Form> 
        </div>
        </Fragment>
    );
}
export default AddActor;