import React, {Fragment,useEffect} from 'react'
import {MDBDataTableV5 } from 'mdbreact'

// Import React Icons and images
import { Button} from 'react-bootstrap';
import{FaPencilAlt, FaTrash} from 'react-icons/fa';
import { useAlert } from 'react-alert';

import Loader from '../../layout/Loader'

import { useDispatch, useSelector } from 'react-redux';

//Router Link
import {Link, useHistory} from "react-router-dom";

// Import Redux Action 
import { getAdminMovies, deleteMovie,clearErrors } from '../../../redux/actions/movieActions';
import {DELETE_MOVIE_RESET} from '../../../redux/constants/movieConstants';

const MovieList = () => {

    const history = useHistory();
    const alert = useAlert();

    //useDispatch
    const dispatch = useDispatch();

    //useSelector
    const { loading, error, movies } = useSelector(state => state.movies);
    const { error: deleteError, isDeleted } = useSelector(state => state.movie)
    

    //useEffect
    useEffect(() => {
        
        dispatch(getAdminMovies());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Movie deleted successfully');
            history.push('/admin/movie');
            dispatch({ type: DELETE_MOVIE_RESET })
        }
        
    },[ dispatch, alert, error, deleteError, isDeleted, history]);
    
    

    const setMovies = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Movie title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Plot',
                    field: 'plot',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Genre',
                    field: 'genre',
                    sort: 'asc'
                },
                {
                    label: 'Reviews',
                    field: 'reviews',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        const deleteHandler = (id) => {
            dispatch(deleteMovie(id))
        }
    

        movies.forEach(movie => {
            data.rows.push({
                id: movie._id,
                title:movie.title,
                plot: movie.plot,
                rating: 
                <Fragment>
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(movie.ratings / 5) * 100}%` }}></div>({movie.numOfReviews} Reviews)
                        </div>
                </Fragment>,
                genre: movie.genre,
                reviews:
                <Fragment>
                    <Link to={`/admin/reviews/movie/${movie._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-comments"></i>
                    </Link>
                </Fragment>,
                actions: 
                <Fragment>
                    <Button variant="danger" onClick={() => deleteHandler(movie._id)}>
                        <FaTrash/>
                    </Button>
                    <Link to={`/admin/edit/movie/${movie._id}`} className="decor-none block">
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    </Link>
                </Fragment>
            })
        })

        return data;
    }

    
    return ( 
        <Fragment>
            <div className="content content-wrapper">
            <h1>Movies</h1>
            <div className="actions">
            <Link to="/admin/new/movie" className="decor-none"> <Button variant="dark" className="form-link ">+ ADD</Button></Link>

            </div>
            {loading ? <Loader /> : (

                
                <MDBDataTableV5 
                hover 
                entriesOptions={[5, 10, 15, 25]} 
                entries={10} 
                pagesAmount={4}
                data={setMovies()} 
                className='table'
                container-sm="true"/>
            )}
            </div>
        </Fragment>
    
    );
}

export default MovieList;