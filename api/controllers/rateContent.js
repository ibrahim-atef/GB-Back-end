const Movie = require("../models/Movie");
const TvShow = require("../models/TvShow");
const series = require("../models/Sereis");

const getTopRated=async(req,res)=>{
    try {
        const ratingQuery = {rate : {$gte : 4, $lt : 5}};
        const [topRatedMovies, topRatedTvShows, topRatedSeries] = await Promise.all([
            Movie.find(ratingQuery).sort({rate : -1}).lean().limit(5),
            TvShow.find(ratingQuery).sort({rate : -1}).lean().limit(5),
            series.find(ratingQuery).sort({rate : -1}).lean().limit(5)
        ])
        res.status(200).json({topRatedMovies, topRatedTvShows, topRatedSeries});

}catch(err){
    res.status(500).json({message : err.message});
}
}


module.exports = { getTopRated };
