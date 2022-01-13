var Producer = require('../model/producer');
const cloudinary = require('cloudinary');

const APIFeatures = require('../utils/apiFeatures')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


// create and save new producer
exports.create= catchAsyncErrors(async(req,res,next) => {
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
            folder: 'producers'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    const producer = await Producer.create(req.body);
    res.status(201).json({
        success:true,
        producer 
    })
})

//retrieve and return all producers/ retrive and return a single producer
exports.get = catchAsyncErrors(async (req,res,next) => {
    
    const producersCount = await Producer.countDocuments();
    const apiFeatures = new APIFeatures(Producer.find(), req.query).search2().filter()
    
    let producers_query = await apiFeatures.query;

    res.status(200).json({
        success: true,
        producersCount,
        producers :producers_query,
        filteredProducersCount: producers_query.length,
        
    })
})

exports.find = catchAsyncErrors(async(req,res,next) => {
    const producer = await Producer.findById(req.params.id);
    console.log(Producer);

    if(!Producer) {
        return next(new ErrorHandler('Producer not found',404));
    }
    
    res.status(200).json({
        success: true,
        producer
    })
})

//Update a new identified by producer id
exports.update = catchAsyncErrors(async(req,res,next) => {
    let producer = await Producer.findById(req.params.id);
    if(!producer) {
        return next(new ErrorHandler('Producer not found',404));
    }

    
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the producer
        for (let i = 0; i < producer.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(producer.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'producers'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }


    producer = await Producer.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindandModify:false
    })

    res.status(200).json({
        success:true,
        producer
    })
})

//Delete a producer with specified producer
exports.delete = catchAsyncErrors(async(req,res,next) =>{
    const producer = await Producer.findById(req.params.id);

    if(!producer) {
    return next(new ErrorHandler('Producer not found',404));
    }

    await Producer.deleteOne();
        res.status(200).json({
        success: true,
        message: 'Producer deleted'
    })
})

exports.getAdminProducers = catchAsyncErrors(async (req, res, next) => {

    const producers = await Producer.find();

    res.status(200).json({
        success: true,
        producers
    })

})