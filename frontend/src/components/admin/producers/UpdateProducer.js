import React, {Fragment} from 'react'
import {Form, Button} from 'react-bootstrap';
import {useEffect, useState} from "react";
import { useDispatch,  useSelector} from 'react-redux';
import {updateProducer, fetchProducerDetails, clearErrors} from '../../../redux/actions/producerActions';
import { UPDATE_PRODUCER_RESET } from '../../../redux/constants/producerConstants'
import { useAlert } from 'react-alert';

import { useHistory, useParams} from "react-router-dom";

const UpdateProducer = () => {
    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const history = useHistory();
    const alert = useAlert();
    //useDispatch
    const dispatch = useDispatch();
    

    const {error, producer } = useSelector(state => state.producerDetails)
    const { error: updateError, isUpdated } = useSelector(state => state.producer);

    let { producerId } =  useParams();

    useEffect(() => {
        if (producer && producer._id !== producerId) {
            dispatch(fetchProducerDetails(producerId));
        } else {
            setName(producer.name);
            setEmail(producer.email);
            setOldImages(producer.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
        
            dispatch(clearErrors())
        }


        if (isUpdated) {
            history.push('/admin/producer');
            alert.success('Producer updated successfully');
            dispatch({ type: UPDATE_PRODUCER_RESET })
        }


    }, [dispatch, alert, history, error, isUpdated, updateError, producer, producerId])
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProducer(producerId, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

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
            <h1>Edit Producer</h1>

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

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="100" height="100" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="100" height="100" />
                                    ))}
            </Form.Group>

            {/* Add Genre Button  */}
            <Button variant="danger" type="submit" className="right" >
                Submit
            </Button>
            </Form> 
        </div>
        </Fragment>
        
    );
}
export default UpdateProducer;