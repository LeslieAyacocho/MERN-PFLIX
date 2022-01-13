import React from 'react'
//Router Link
import {Link} from "react-router-dom";
import {Card} from 'react-bootstrap';

const CardActors = ({ actor, col }) => {

    return ( 
       
            <Card style={{ width: '15rem' }} className="card" key={actor._id}>
                    <Link to={`/actor/${actor._id}`} className="decor-none"> 
                    <Card.Img variant="top" src={ actor.images[0].url } />
                    <Card.Body className="card-body">
                    <Card.Title>{actor.name}</Card.Title>
                    <Card.Text >
                        {actor.bio}
                    </Card.Text>
    
                    </Card.Body>
                    </Link>
                </Card>
    
        
    );
}

export default CardActors;