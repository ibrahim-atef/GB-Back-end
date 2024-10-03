const Movie = require('../models/Movie');
const TvShow = require('../models/TvShow');
const TvSeries = require('../models/Series');

// Map the content type string to the respective model
const contentTypesMap = {
    Movie: Movie,
    TvShow: TvShow,
    TvSeries: TvSeries
};

// Controller to handle rating logic
const rateContent = async (req, res) => {
    const contentId = req.body.id;
    const newRating = req.body.rating;  // Rating value (1-5 stars)
    const contentType = req.body.contentType;  // Movie, TvShow, or TvSeries
    const seasonId = req.body.seasonId;  // Optional: for rating a season
    const episodeId = req.body.episodeId;  // Optional: for rating an episode

    // Validate the rating value (1 to 5 stars)
    if (newRating < 1 || newRating > 5) {
        return res.status(400).json({ message: "Rating should be between 1 and 5" });
    }

    // Check if the contentType is valid
    if (!contentTypesMap[contentType]) {
        return res.status(400).json({ message: "Invalid content type" });
    }

    try {
        const ContentModel = contentTypesMap[contentType];
        // Find content by ID
        const content = await ContentModel.findById(contentId);
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Check if we are rating a season or episode
        let target = content;
        if (seasonId) {
            const season = content.seasons.find(s => s.id === seasonId);
            if (!season) return res.status(404).json({ message: "Season not found" });
            target = season;

            if (episodeId) {
                const episode = season.episodes.find(e => e.id === episodeId);
                if (!episode) return res.status(404).json({ message: "Episode not found" });
                target = episode;
            }
        }

        // Update the votes array: newRating-1 gives the index (0 for 1-star, 1 for 2-stars, etc.)
        const voteIndex = newRating - 1;
        target.votes[voteIndex] += 1;

        // Recalculate the total number of votes and the new average rating
        const totalVotes = target.votes.reduce((acc, val) => acc + val, 0);  // Sum of all votes
        const totalPoints = target.votes.reduce((acc, val, idx) => acc + (val * (idx + 1)), 0);  // Weighted sum of votes (e.g., 1-star votes * 1, 2-star votes * 2, etc.)
        const newAverageRating = totalVotes === 0 ? 0 : (totalPoints / totalVotes).toFixed(1);  // Calculate new average rating

        // Update the rating and save the content
        target.rating = newAverageRating;
        await content.save();

        return res.status(200).json({
            message: "Rating submitted successfully",
            averageRating: target.rating,
            totalVotes: totalVotes
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
// Controller to get top-rated content
const getTopRated = async (req, res) => {
    try {
        const ratingQuery = { rating: { $gte: 1 } };  // Top-rated content is 4 stars or higher
        const [topRatedMovies, topRatedTvShows, topRatedSeries] = await Promise.all([
            Movie.find(ratingQuery).sort({ rating: -1 }).lean().limit(5),
            TvShow.find(ratingQuery).sort({ rating: -1 }).lean().limit(5),
            TvSeries.find(ratingQuery).sort({ rating: -1 }).lean().limit(5)
        ]);

        res.status(200).json({ topRatedMovies, topRatedTvShows, topRatedSeries });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    rateContent,
    getTopRated
};
