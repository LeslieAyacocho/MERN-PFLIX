const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures')
var mongoose = require('mongoose');
// var Actor = mongoose.model('actors')
const Actor = require('../model/Actor')
const cloudinary = require('cloudinary')

exports.create = catchAsyncErrors(async(req,res,next) => {
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    console.log(req.body.images)
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'actors'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks


    const actor = await Actor.create(req.body);

    res.status(201).json({
        success: true,
        actor
    })
})

// Get all movies (Admin)  =>   /api/admin/movies
exports.getAdminActors = catchAsyncErrors(async (req, res, next) => {

    const actors = await Actor.find();

    res.status(200).json({
        success: true,
        actors
    })

})

exports.get = catchAsyncErrors(async (req,res,next) => {
    
    const actorsCount = await Actor.countDocuments();
    const apiFeatures = new APIFeatures(Actor.find(), req.query).search2().filter()
    
    let Actors_query = await apiFeatures.query;

    res.status(200).json({
        success: true,
        actorsCount,
        actors :Actors_query,
        filteredActorsCount: Actors_query.length,
    })
})

exports.find = catchAsyncErrors(async(req,res,next) => {
    const actor = await Actor.findById(req.params.id);
    console.log(Actor);

    if(!Actor) {
        return next(new ErrorHandler('Actor not found',404));
    }
    
    res.status(200).json({
        success: true,
        actor
    })
})

exports.update = catchAsyncErrors(async(req,res,next) => {
    let actor = await Actor.findById(req.params.id);
    if(!Actor) {
        return next(new ErrorHandler('Actor not found',404));
    }

    
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the actor
        for (let i = 0; i < actor.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(actor.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'actors'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }
    actor = await Actor.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindandModify:false
    })

    res.status(200).json({
        success:true,
        actor
    })
})

exports.delete = catchAsyncErrors(async(req,res,next) =>{
    const actor = await Actor.findById(req.params.id);

    if(!actor) {
    return next(new ErrorHandler('Actor not found',404));
    }

    await Actor.deleteOne();
    res.status(200).json({
    success: true,
    message: 'Actor deleted'
    })
})

// Create new review   =>   /api/review
exports.createActorReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, actorID } = req.body;
    const filter = new Filter();
    const filtereComment = filter.clean(comment)
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        filtereComment
    }

    const actor = await Actor.findById(actorID);

    const isReviewed = actor.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        actor.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = filtereComment;
                review.rating = rating;
            }
        })

    } else {
        actor.reviews.push(review);
        actor.numOfReviews = actor.reviews.length
    }

    actor.ratings = actor.reviews.reduce((acc, item) => item.rating + acc, 0) / actor.reviews.length

    await actor.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get actor Reviews   =>   /api/reviews
exports.getActorReviews = catchAsyncErrors(async (req, res, next) => {
    const actor = await Actor.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: actor.reviews
    })
})

// Delete actor Review   =>   /api/reviews
exports.deleteActorReview = catchAsyncErrors(async (req, res, next) => {

    const actor = await Actor.findById(req.query.actorId);

    console.log(actor);

    const reviews = actor.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = actor.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await actor.findByIdAndUpdate(req.query.actorId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
