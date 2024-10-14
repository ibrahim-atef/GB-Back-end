const Rating = require('../models/Rating');
const Movie = require('../models/Movie');
const Series = require('../models/Series');
const TvShow = require('../models/TvShow');

// POST /rate
const submitRating = async (req, res) => {
    try {
        const { contentId, contentType, rating } = req.body;
        const userId = req.user.id; 

        // Find and update or create the rating
        const newRating = await Rating.findOneAndUpdate(
            { user: userId, contentId },
            { rating, contentType },
            { upsert: true, new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Rating submitted successfully', rating: newRating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { submitRating };
