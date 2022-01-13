import React, {Fragment, useEffect, useState} from 'react'
import Loader from '../../layout/Loader'

// Import React Dependencies 
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination'
//Router
import { useAlert } from 'react-alert'
import {useParams} from "react-router-dom";
import CardMovie from './CardMovie'
import DatePicker from 'react-datepicker'
import ISODate from 'isodate'
// Import Redux Action 
import { getMovies} from '../../../redux/actions/movieActions';

const Movie = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState(0)
    const [startDate, setStartDate] = useState(ISODate(new Date(Date.now()).toISOString()));

    const [endDate, setEndDate] = useState(ISODate(new Date("2023/01/01").toISOString()));
    // console.log(endDate.toISOString());
    const genres = [
                'Action',
                'Romance',
                'Sci-Fi',
                'Survival',
                'Fantasy',
                'Historical'
                ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, movies, error, moviesCount, resPerPage, filteredMoviesCount } = useSelector(state => state.movies)

    const {keyword}= useParams()
    
    
    useEffect(() => {
        console.log(keyword);
        if (error) {
            return alert.error(error)
        }

        dispatch(getMovies(keyword, currentPage, genre, rating, startDate.toISOString(), endDate.toISOString()))


    }, [dispatch, alert, error, keyword, currentPage, genre, rating,startDate,endDate])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = moviesCount;
    if (keyword) {
        count = filteredMoviesCount
    }

    return ( 
        <Fragment>
            
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="content content-wrapper">
                    <h1>Movies</h1>
                    <section id="movies" className="container-fluid">
                        <div className="row">

                            {keyword ? (
                                <Fragment>

                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                    StartDate:
                                    <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(ISODate(new Date(date).toISOString()))}
                                    selectsStart
                                    startDate={new Date(startDate)}
                                    endDate={new Date(endDate)}
                                    />
                                    EndDate:
                                    <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(ISODate(new Date(date).toISOString()))}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={new Date(endDate)}
                                    minDate={new Date(startDate)}
                                    />
                                    </div>


                                    <div className="px-5">

                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Categories
                                            </h4>

                                            <ul className="pl-0">
                                                {genres.map(genre => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={genre}
                                                        onClick={() => setGenre(genre)}
                                                    >
                                                        {genre}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <hr className="my-3" />

                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Ratings
                                            </h4>

                                            <ul className="pl-0">
                                                {[5, 4, 3, 2, 1,0].map(star => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={star}
                                                        onClick={() => setRating(star)}
                                                    >
                                                        <div className="rating-outer">
                                                            <div className="rating-inner"
                                                                style={{
                                                                    width: `${star * 20}%`
                                                                }}
                                                            >
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {movies && movies.map(movie => (
                                                <CardMovie key={movie._id} movie={movie} col={3} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                movies && movies.map(movie => (
                                        <CardMovie key={movie._id} movie={movie} col={3} />
                                    ))
                                )}

                        </div>

                    </section>
                    {resPerPage < count && (
                        <div className="d-flex justify-content-center">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={moviesCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </div>
                </Fragment>
            )}
        
        </Fragment>
        
    );
}

export default Movie;