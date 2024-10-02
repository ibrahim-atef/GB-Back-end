const Movie = require('../models/Movie');
const TvShow = require('../models/TvShow');
const TvSeries = require('../models/Sereis');

// Map the content type string to the respective model
const contentTypesMap = {
    Movie: Movie,
    TvShow: TvShow,
    TvSeries: TvSeries
};

// Controller to handle rating logic
const rateContent = async (req, res) => {
    const contentId = req.params.id;
    const newRating = req.body.rating;
    const contentType = req.body.contentType;

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

        // Calculate the new average rating
        const newVotesCount = content.votesCount + 1;
        const newAverageRating = ((content.averageRating * content.votesCount) + newRating) / newVotesCount;

        // Update the content with new votesCount and averageRating
        content.votesCount = newVotesCount;
        content.averageRating = newAverageRating;

        // Save updated content
        await content.save();

        return res.status(200).json({
            message: "Rating submitted successfully",
            averageRating: content.averageRating,
            votesCount: content.votesCount
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    rateContent
};
