const Rating = require('../models/Rating');

// GET /average-rating/:contentId
const getAverageRating = async (req, res) => {
    try {
        const { contentId } = req.params;

        const aggregated = await Rating.aggregate([
            { $match: { contentId: mongoose.Types.ObjectId(contentId) } },
            { $group: { _id: '$contentId', averageRating: { $avg: '$rating' }, totalVotes: { $sum: 1 } } }
        ]);

        if (!aggregated.length) {
            return res.status(404).json({ message: 'No ratings found for this content' });
        }

        res.status(200).json({ averageRating: aggregated[0].averageRating, totalVotes: aggregated[0].totalVotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// GET /series-average-rating/:seriesId
const getSeriesAverageRating = async (req, res) => {
    try {
        const { seriesId } = req.params;

        const aggregated = await Rating.aggregate([
            { $match: { contentId: mongoose.Types.ObjectId(seriesId), contentType: 'Series' } },
            { $group: { _id: '$contentId', averageRating: { $avg: '$rating' }, totalVotes: { $sum: 1 } } }
        ]);

        if (!aggregated.length) {
            return res.status(404).json({ message: 'No ratings found for this series' });
        }

        res.status(200).json({ averageRating: aggregated[0].averageRating, totalVotes: aggregated[0].totalVotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAverageRating, getSeriesAverageRating };
