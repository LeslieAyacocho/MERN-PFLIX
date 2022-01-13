import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { producersReducer, newProducerReducer, producerReducer, producerDetailsReducer} from "./reducers/producerReducers";
import { actorsReducer, newActorReducer, actorReducer, actorDetailsReducer, newActorReviewReducer, getActorReviewsReducer, delActorReviewReducer}  from "./reducers/actorReducers";
import { MoviesReducer, newMovieReducer, MovieReducer, MovieDetailsReducer, newMovieReviewReducer, getMovieReviewsReducer, delMovieReviewReducer} from './reducers/movieReducers'
import { authReducer, userDetailsReducer } from './reducers/userReducer'


import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // movie crud and reviews
	movies: MoviesReducer,
    movieDetails: MovieDetailsReducer,
    movie: MovieReducer,
    newMovie: newMovieReducer,
    newMovieR: newMovieReviewReducer,
    getMovieReviews: getMovieReviewsReducer,
    delMovieReview: delMovieReviewReducer,
    //actor
    actors: actorsReducer,
    actor: actorReducer,
    actorDetails: actorDetailsReducer,
    newActor:newActorReducer,
    newActorReview: newActorReviewReducer,
    getActorReviews: getActorReviewsReducer,
    delActorReview: delActorReviewReducer,

    //producer
    producers: producersReducer,
    producer: producerReducer,
    producerDetails: producerDetailsReducer,
    newProducer: newProducerReducer,
    //auth
    auth: authReducer,
    userDetails: userDetailsReducer,
})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;