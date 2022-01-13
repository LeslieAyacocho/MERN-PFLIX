import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 

const NavAdmin = () => {
    return ( 
        <Fragment>
            <Link to="/admin/movie">Movies</Link>
            <Link to="/admin/actor">Actors</Link>
            <Link to="/admin/producer">Producer</Link>
        </Fragment>
        
    );
}

export default NavAdmin;