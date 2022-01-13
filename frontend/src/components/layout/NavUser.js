import React, {Fragment} from 'react'
import { Link } from 'react-router-dom' 

const NavUser = () => {
    return ( 
        <Fragment>
            <Link to="/movies">Movies</Link>
            <Link to="/actors">Actors</Link>
            <Link to="/producer">Producer</Link>
        </Fragment>
        
    );
}

export default NavUser;