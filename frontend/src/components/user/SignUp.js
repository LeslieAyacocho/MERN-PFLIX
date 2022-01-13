import {Form, Button} from 'react-bootstrap';
import  React, {useEffect, useState, Fragment } from "react";
import { useDispatch ,useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import {Link, useHistory} from "react-router-dom";
import { register, clearErrors } from '../../redux/actions/userActions';

const SignUp= () => {

    const history = useHistory();

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        role:"admin"
    });


    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    },  [dispatch, alert, isAuthenticated, error, history])
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', user.name);
        formData.set('email', user.email);
        formData.set('password', user.password);
        formData.set('role', user.role);


        dispatch(register(formData));
    }

    return ( 
        <Fragment>
            <div className="content content-wrapper">
            <h1>Sign Up</h1>
            <Form className="form-group auth" onSubmit={submitHandler} encType='application/json'>
            
            <Form.Group className="mb-3 ">
            <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" value={ user.name } onChange={(e) => setUser({...user, name: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="" value={ user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select id="role_field" value={ user.role }  placeholder="" onChange={(e) => setUser({...user, role: e.target.value})}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                </Form.Select>
            </Form.Group>
            <Link to="/login" className=" mt-3 ">Login</Link>
            
            <Button variant="danger" type="submit" className="right"  disabled={loading ? true : false} >
                Submit
            </Button>
            </Form> 

            
        </div>
        </Fragment>
    );
}

export default SignUp;