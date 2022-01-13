import {Form, Button} from 'react-bootstrap';
import React, {useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from "react-router-dom";
import { useAlert } from 'react-alert'
import { login, clearErrors } from '../../redux/actions/userActions';

const Login= () => {

    const history = useHistory();
    const alert = useAlert();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const { isAuthenticated, error,  user} = useSelector(state => state.auth);

    //useDispatch
    const dispatch = useDispatch();

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (isAuthenticated) {

            if(user.role === "admin"){
                history.push('/')
            }else{
            history.push(redirect) 
            }
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history, redirect,user])
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password));
    }

    return ( 
        <Fragment>
            <div className="content content-wrapper">
            <h1>Login</h1>
            <Form className="form-group auth" onSubmit={submitHandler} encType='application/json'>
            
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" value={ email}  onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value={password}  onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Link to="/signup" className=" mt-3">Sign Up</Link>
            <Button variant="danger" type="submit" className="right" >
                Submit
            </Button>
            </Form> 

           
        </div>
        </Fragment>
        
    );
}

export default Login;