const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Please provide a genre']
    },
    rating: {
        type: String,
        default: 'N/A'
    },
    year: {
        type: String,
        default: new Date().getFullYear().toString()
    },
    duration: {
        type: String,
        default: 'N/A'
    },
    posterUrl: {
        type: String,
        required: [true, 'Please provide a poster URL']
    },
    backdropUrl: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        required: [true, 'Please provide a video URL']
    },
    trailerUrl: {
        type: String,
        default: ''
    },
    tags: [{
        type: String
    }],
    views: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Index for search functionality
movieSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
