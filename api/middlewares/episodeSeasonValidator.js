const Season = require("../models/Season");
const TVShow = require("../models/TvShow");
const Series = require("../models/Series");

const validateSeasonId = async (req, res, next) => {
    const { seasonId } = req.body;

    try {
        const season = await Season.findById(seasonId);
        if (!season) {
            return res.status(404).json({ message: "Season ID not found" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const validateSeriesId = async (req, res, next) => {
    const { seriesId } = req.body;

    try {
        const series = await Series.findById(seriesId);
    
        if (!series) {
            return res.status(404).json({ message: "Series ID not found" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const validateTvShowId = async (req, res, next) => {
    const { tvShowId } = req.body;

    try{
        const tvShow = await TVShow.findById(tvShowId);
        if (!tvShow) {
            return res.status(404).json({message: "TvShow ID not found"});
        }
        next();
        }catch(error){
            return res.status(500).json({message: error.message});
        }

    
};

module.exports = { validateSeasonId, validateSeriesId, validateTvShowId };
