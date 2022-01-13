import React, {Fragment, useEffect,} from 'react'
import { Link, useHistory, Route } from 'react-router-dom' 
import { Nav, Navbar, Container,NavDropdown} from 'react-bootstrap';
import { MdLocalMovies } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { logout} from '../../redux/actions/userActions'
import { useAlert } from 'react-alert'
import Search from './Search'
import NavAdmin from './NavAdmin';
import NavUser from './NavUser';
import 'react-datepicker/dist/react-datepicker.css';

const Header = () => {    
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user} = useSelector(state => state.auth)
    

    useEffect(() => {
    console.log(user)


    }, [user])

    const logoutHandler = () => {
        dispatch(logout());
        history.push('/')
        alert.success('Logged out successfully.')
        
    }



    return ( 
        <Fragment>
            <div className="header">
            <Navbar collapseOnSelect expand="lg" className='user-nav'>
            <Container>
            <Navbar.Brand ><Link to="/" className="nav-brand"><MdLocalMovies className="icons"/>PFLIX</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                {user && user.role === 'admin' ? <NavAdmin /> : (
                    <NavUser />
                )}
            
                </Nav>

                
                {user && user.role === 'admin' ? null : <Route render={({history}) => <Search history={history} />} />}
                {/* <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button className="search">Search</Button>
                </Form> */}
                { user?._id ? setProfile() :  <Link to="/login">Login</Link> }
                
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
            
        </Fragment >
    );
}
export default Header;