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
import { fetchAdminActors, deleteActor, clearErrors } from '../../../redux/actions/actorActions';
import {DELETE_ACTOR_RESET} from '../../../redux/constants/actorConstants';

const ActorList = () => {

    const history = useHistory();
    const alert = useAlert();

    //useDispatch
    const dispatch = useDispatch();

    //useSelector
    const { loading, error, actors } = useSelector(state => state.actors);
    const { error: deleteError, isDeleted } = useSelector(state => state.actor);
    

    //useEffect
    useEffect(() => {
        
        dispatch(fetchAdminActors());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Actor deleted successfully');
            history.push('/admin/actor');
            dispatch({ type: DELETE_ACTOR_RESET })
        }
        
    },[ dispatch, alert, error, deleteError, isDeleted, history,]);
    
    

    const setActors = () => {
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
                    label: 'Biography',
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

        const deleteHandler = (id) => {
            dispatch(deleteActor(id))
        }
    

        actors.forEach(actor => {
            data.rows.push({
                id: actor._id,
                name: actor.name,
                email: actor.bio,
                actions: 
                <Fragment>
                    <Button variant="danger" onClick={() => deleteHandler(actor._id)}>
                        <FaTrash/>
                    </Button>
                    <Link to={`/admin/edit/actor/${actor._id}`} className="decor-none block">
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
            <h1>Actors</h1>
            <div className="actions">
            <Link to="/admin/new/actor" className="decor-none"> <Button variant="dark" className="form-link ">+ ADD</Button></Link>

            </div>
            {loading ? <Loader /> : (

                
                <MDBDataTableV5 
                hover 
                entriesOptions={[5, 10, 15, 25]} 
                entries={10} 
                pagesAmount={4}
                data={setActors()} 
                className='table'
                container-sm="true"/>
            )}
            </div>
        </Fragment>
    
    );
}

export default ActorList;