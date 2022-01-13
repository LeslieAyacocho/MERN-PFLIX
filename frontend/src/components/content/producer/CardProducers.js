import React from 'react'
//Router Link
import {Link} from "react-router-dom";
import {Card} from 'react-bootstrap';

const CardProducers = ({ producer, col }) => {

    return ( 
       
            <Card style={{ width: '15rem' }} className="card" key={producer._id}>
                    <Link to={`/producer/${producer._id}`} className="decor-none"> 
                    <Card.Img variant="top" src={ producer.images[0].url } />
                    <Card.Body className="card-body">
                    <Card.Title>{producer.name}</Card.Title>
                    <Card.Text >
                        {producer.email}
                    </Card.Text>
    
                    </Card.Body>
                    </Link>
                </Card>
        
    
    );
}

export default CardProducers;