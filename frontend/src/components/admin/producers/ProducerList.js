import React, {Fragment} from 'react'
import {MDBDataTableV5 } from 'mdbreact'

// Import React Icons and images
import { Button} from 'react-bootstrap';
import{FaPencilAlt, FaTrash} from 'react-icons/fa';
import { useAlert } from 'react-alert';

import Loader from '../../layout/Loader'

// Import React Dependencies 
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

//Router Link
import {Link, useHistory} from "react-router-dom";

// Import Redux Action 
import { fetchAdminProducers, deleteProducer, clearErrors } from '../../../redux/actions/producerActions';
import {DELETE_PRODUCER_RESET} from '../../../redux/constants/producerConstants';

const ProducerList = () => {

    const history = useHistory();
    const alert = useAlert();

    //useDispatch
    const dispatch = useDispatch();

    //useSelector
    const { loading, error, producers } = useSelector(state => state.producers);
    const { error: deleteError, isDeleted } = useSelector(state => state.producer);
    

    //useEffect
    useEffect(() => {
        
        dispatch(fetchAdminProducers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Producer deleted successfully');
            history.push('/admin/producer');
            dispatch({ type: DELETE_PRODUCER_RESET })
        }
        
    },[ dispatch, alert, error, deleteError, isDeleted, history,]);
    
    

    const setProducers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        const deleteProducerHandler = (id) => {
            dispatch(deleteProducer(id))
        }
    

        producers.forEach(producer => {
            data.rows.push({
                id: producer._id,
                name: producer.name,
                email: producer.email,
                actions: 
                <Fragment>
                    <Button variant="danger" onClick={() => deleteProducerHandler(producer._id)}>
                        <FaTrash/>
                    </Button>
                    <Link to={`/admin/edit/producer/${producer._id}`} className="decor-none block">
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
            <h1>Producers</h1>
            <div className="actions">
            <Link to="/admin/new/producer" className="decor-none"> <Button variant="dark" className="form-link ">+ ADD</Button></Link>

            </div>
            {loading ? <Loader /> : (

                
                <MDBDataTableV5 
                hover 
                entriesOptions={[5, 10, 15, 25]} 
                entries={10} 
                pagesAmount={4}
                data={setProducers()} 
                className='table'
                container-sm="true"/>
            )}
            </div>
        </Fragment>
    
    );
}

export default ProducerList;