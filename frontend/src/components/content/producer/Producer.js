import React, {Fragment, useEffect, useState} from 'react'


import Loader from '../../layout/Loader'

// Import React Dependencies 
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination'
//Router
import { useAlert } from 'react-alert'
import {useParams} from "react-router-dom";
import CardProducers from './CardProducers'

// Import Redux Action 
import { fetchProducers} from '../../../redux/actions/producerActions';

const Producer = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, producers, error, producersCount, resPerPage, filteredProducersCount } = useSelector(state => state.producers)

    const keyword = useParams()

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(fetchProducers(keyword, currentPage));


    }, [dispatch, alert, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = producersCount;
    if (keyword) {
        count = filteredProducersCount
    }


    return ( 
        <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
            <div className="content content-wrapper">
            <h1>Producers</h1>
            <section id="producers" className="container-fluid">
                    <div className="row" >

                        {keyword ? (
                            <Fragment>
                            <div className="col-6 col-md-9">
                                    <div className="row">
                                        {producers && producers.map(producer => (
                                            <CardProducers key={producer._id} producer={producer} col={3} />
                                        ))}
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            producers && producers.map(producer => (
                                    <CardProducers key={producer._id} producer={producer} col={3} />
                                ))
                            )}
                    </div>
                </section>

                {resPerPage <= count && (
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={producersCount}
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

export default Producer;