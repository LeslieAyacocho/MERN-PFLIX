import React from 'react'
//Router Link
import {Link} from "react-router-dom";
import {Card} from 'react-bootstrap';

const CardMovie = ({ movie, col }) => {

    return ( 
       
            <Card style={{ width: '15rem' }} className="card" key={movie._id}>
                    <Link to={`/movie/${movie._id}`} className="decor-none"> 
                    <Card.Img variant="top" src={ movie.images[0].url } />
                    <Card.Body className="card-body">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text >
                        {/* {movie.plot} */}
                        <h5>{movie.createdAt}</h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(movie.ratings / 5) * 100}%` }}></div>
                            </div>
                            ({movie.numOfReviews} Reviews)
                        </div>
                    </Card.Text>
    
                    </Card.Body>
                    </Link>
                </Card>
        
    );
}

export default CardMovie;