import React, {Fragment, useEffect, useState} from 'react'
import Loader from '../../layout/Loader'

// Import React Dependencies 
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination'
//Router
import { useAlert } from 'react-alert'
import {useParams} from "react-router-dom";
import CardActors from './CardActors'

// Import Redux Action 
import { fetchActors} from '../../../redux/actions/actorActions';

const Actor = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [rating, setRating] = useState(0)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, actors, error, actorsCount, resPerPage, filteredActorsCount } = useSelector(state => state.actors)

    const {keyword} = useParams()

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        console.log(keyword);
        dispatch(fetchActors(keyword, currentPage,rating));


    }, [dispatch, alert, error, keyword, currentPage,rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = actorsCount;
    if (keyword) {
        count = filteredActorsCount
    }

    return ( 
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="content content-wrapper">
                    <h1>Actor</h1>
                    <section id="actors" className="container-fluid">
                        <div className="row">

                            { keyword? (
                                <Fragment>

                                   
                                <div className="col-6 col-md-9">
                                        <div className="row">
                                            {actors && actors.map(actor => (
                                                <CardActors key={actor._id} actor={actor} col={3} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                    actors && actors.map(actor => (
                                        <CardActors key={actor._id} actor={actor} col={3} />
                                    ))
                                )}
                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={actorsCount}
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

export default Actor;