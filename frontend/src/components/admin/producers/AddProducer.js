import React, {Fragment, useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { useDispatch,  useSelector} from 'react-redux';
import {newProducer, clearErrors} from '../../../redux/actions/producerActions';
import { NEW_PRODUCER_RESET } from '../../../redux/constants/producerConstants'

import { useHistory} from "react-router-dom";

const AddProducer = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    
    const alert = useAlert();
    //useDispatch
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newProducer);

    
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/producer');
            alert.success('Producer created successfully');
            dispatch({ type: NEW_PRODUCER_RESET })
        }

    }, [dispatch, alert, error, success, history])
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProducer(formData));
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
            <h1>Add Producer</h1>

            <Form className="form-group" onSubmit={submitHandler} encType='multipart/form-data'>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={ name } placeholder="" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={ email }  placeholder="" onChange={(e) => setEmail(e.target.value)}/>
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
                                        {/* <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label> */}
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="90" height="100" />
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
export default AddProducer;