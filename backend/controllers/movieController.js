const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getAllMovies = async (req, res) => {
    try {
        const { genre, search } = req.query;
        let query = { isActive: true };

        // Filter by genre if provided
        if (genre) {
            query.genre = genre;
        }

        // Search functionality
        if (search) {
            query.$text = { $search: search };
        }

        const movies = await Movie.find(query).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        // Increment views
        movie.views += 1;
        await movie.save();

        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create movie (Admin only)
// @route   POST /api/admin/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
    try {
        const movieData = {
            ...req.body,
            createdBy: req.user._id
        };

        const movie = await Movie.create(movieData);

        res.status(201).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update movie (Admin only)
// @route   PUT /api/admin/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete movie (Admin only)
// @route   DELETE /api/admin/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {},
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all movies (Admin - includes inactive)
// @route   GET /api/admin/movies
// @access  Private/Admin
exports.getAllMoviesAdmin = async (req, res) => {
    try {
        const { page = 1, limit = 20, genre, search, isActive } = req.query;

        let query = {};

        if (genre) query.genre = genre;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (search) query.$text = { $search: search };

        const movies = await Movie.find(query)
            .sort('-createdAt')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('createdBy', 'name email');

        const count = await Movie.countDocuments(query);

        res.status(200).json({
            success: true,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
