const mongoose = require('mongoose')
const validator = require('validator');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const producerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter actor name'],
        trim: true,
        maxLength: [100, 'actor name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    movies: [
        {
            movie: {
                type: mongoose.Schema.ObjectId,
                ref: 'Movie',
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.models.Producer || mongoose.model('producer', producerSchema);