const express = require('express');
const route = express.Router();
const actorController = require('../controller/actorController')
const producerController = require('../controller/producerController');
const userController = require('../controller/userController');
const movieController = require('../controller/movieController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

//API

//Movie
route.get('/api/movies', movieController.get)
route.get('/api/movie/:id',  movieController.find)
route.get('/api/admin/movies', isAuthenticatedUser,authorizeRoles('admin'), movieController.getAdminMovies)
route.post('/api/new/movie', movieController.create)
route.put('/api/update/movie/:id', isAuthenticatedUser,authorizeRoles('admin'), movieController.update)
route.delete('/api/delete/movie/:id', isAuthenticatedUser,authorizeRoles('admin'),  movieController.delete)
route.put('/api/new/review',  movieController.createMovieReview)
route.get('/api/reviews',  movieController.getMovieReviews)
route.get('/api/delete/review',  movieController.getMovieReviews)

//Actor
route.get('/api/actors', actorController.get)
route.get('/api/actor/:id',  actorController.find)
route.get('/api/admin/actors', isAuthenticatedUser,authorizeRoles('admin'),   actorController.getAdminActors)
route.post('/api/new/actor',isAuthenticatedUser,authorizeRoles('admin'),  actorController.create)
route.put('/api/update/actor/:id', isAuthenticatedUser,authorizeRoles('admin'),  actorController.update)
route.delete('/api/delete/actor/:id',  isAuthenticatedUser,authorizeRoles('admin'), actorController.delete)
route.put('/api/new/review/actor',  actorController.createActorReview)
route.get('/api/reviews/actor',  actorController.getActorReviews)
route.delete('/api/delete/review/actor',  actorController.deleteActorReview)


//Producer
route.get('/api/producers', producerController.get)
route.get('/api/producer/:id', producerController.find)
route.get('/api/admin/producers', isAuthenticatedUser,authorizeRoles('admin'), producerController.getAdminProducers)
route.post('/api/new/producer', isAuthenticatedUser,authorizeRoles('admin'), producerController.create)
route.put('/api/update/producer/:id', isAuthenticatedUser,authorizeRoles('admin'), producerController.update)
route.delete('/api/delete/producer/:id', isAuthenticatedUser,authorizeRoles('admin'), producerController.delete)



//Authentication
route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/logout', userController.logout)
route.get('/me', userController.getUserProfile)
route.get('/admin/user/:id', userController.getUserDetails)
module.exports = route