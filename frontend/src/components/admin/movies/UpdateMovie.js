import React, {Fragment, useEffect, useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { useDispatch,  useSelector} from 'react-redux';
import {updateMovie, getMovieDetails, clearErrors} from '../../../redux/actions/movieActions';
import { UPDATE_MOVIE_RESET } from '../../../redux/constants/movieConstants'

// import { fetchAdminActors } from '../../../redux/actions/actorActions'
// import { fetchAdminProducers } from '../../../redux/actions/producerActions'



import { useHistory, useParams} from "react-router-dom";

const UpdateMovie = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [plot, setPlot] = useState('');
    // const [actors_here, setActor] = useState('');
    // const [producers_here, setProducer] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    
    const alert = useAlert();
    //useDispatch
    const dispatch = useDispatch();

    
    const { error, movie } = useSelector(state => state.movieDetails)
    const {  error: updateError, isUpdated } = useSelector(state => state.movie);
    // const { loading, actors } = useSelector(state => state.actors);
    // const { producers } = useSelector(state => state.producers);

    const {movieId} = useParams();

    
    useEffect(() => {
        // dispatch(fetchAdminActors())
        // dispatch(fetchAdminProducers())

        if (movie && movie._id !== movieId) {
            dispatch(getMovieDetails(movieId));
        } else {
            setTitle(movie.title);
            setGenre(movie.genre);
            setPlot(movie.plot);
            setOldImages(movie.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {

            history.push('/admin/movie');
            alert.success('Movie updated successfully');
            dispatch({ type: UPDATE_MOVIE_RESET })

        }

    }, [dispatch, alert, error, isUpdated, history, updateError, movie, movieId])
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('plot', plot);
        formData.set('genre', genre);
        // formData.set('actors', actors_here);
        // formData.set('producers', producers_here);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateMovie(movieId,formData));
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
            <h1>Add Movie</h1>

            <Form className="form-group" onSubmit={submitHandler} encType='multipart/form-data'>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={ title } placeholder="" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Plot</Form.Label>
                <Form.Control as="textarea" value={ plot }  placeholder="" onChange={(e) => setPlot(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Select id="genre_field" value={ genre }  placeholder="" onChange={(e) => setGenre(e.target.value)}>
                                    <option value="Action">Action</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Survival">Survival</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Historical">Historical</option>
                </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3">
                <Form.Label>Actors</Form.Label>
                <Form.Select id="actor_field" value={ actors_here }  placeholder="" onChange={(e) => setActor(e.target.value)}>
                <option key="default1" value="- SELECT - ACTOR - "></option>
                { actors && actors.map((actor) => (
                    <option key={actor._id} value={actor._id}>{actor.name}</option>
                ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Producers</Form.Label>
                <Form.Select id="select" value={ producers_here }  placeholder="" onChange={(e) => setProducer(e.target.value)}>
                <option key="default1" value="- SELECT - PRODUCER - "></option>
                { producers && producers.map((producer) => (
                    <option key={producer._id} value={producer._id}>{producer.name}</option>
                ))}
                </Form.Select>
            </Form.Group> */}
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

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
            </Form.Group>

            {/* Add Genre Button  */}
            <Button variant="danger" type="submit" className="right"  >
                Submit
            </Button>
            </Form> 
        </div>
        </Fragment>
    );
}
export default UpdateMovie;