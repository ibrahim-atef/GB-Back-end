const mongoose = require("mongoose");
const Category = require("../models/Category");
const Series = require("../models/Series");
const Season = require("../models/Season");
const Episode = require("../models/Episode");
const TvShow = require("../models/TvShow");
const Movie = require("../models/Movie");
const MoviePart = require("../models/MoviePart");
const dotenv = require("dotenv");
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function seedDatabase() {
    try {
        // Clear existing data
        await Promise.all([
            Category.deleteMany({}),
            Series.deleteMany({}),
            Season.deleteMany({}),
            Episode.deleteMany({}),
            TvShow.deleteMany({}),
            Movie.deleteMany({}),
            MoviePart.deleteMany({})
        ]);

        // Categories
        const categories = await Category.insertMany([
            { name: "Action" },
            { name: "Comedy" },
            { name: "Drama" },
            { name: "Thriller" },
            { name: "Science Fiction" }
        ]);

        // Movies with parts
        const movies = await Movie.insertMany([
            {
                name: "Movie One",
                overview: "An action-packed adventure.",
                poster_path: "url_to_movie_poster_1",
                poster_Title: "url_to_movie_title_poster_1",
                imgSm: "url_to_small_image_1",
                backdrop_path: "url_to_backdrop_image_1",
                first_air_date: new Date(),
                trailer: "url_to_trailer_1",
                language: ["English"],
                releaseYear: "2023",
                genre: [categories[0]._id],
                createdBy: 1,
                updatedBy: 1
            },
            // More movies here
        ]);

        // Adding parts to movies
        const movieParts = await MoviePart.insertMany([
            {
                movieId: movies[0]._id,
                releaseYear: "2024",
                movieTitle: "Movie One - Part Two",
                movieDesc: "The sequel of Movie One.",
                moviePoster: "url_to_movie_poster_2",
                videoUrl: "url_to_video_2",
            },
            // More movie parts here
        ]);

        // TV Shows
        const tvShows = await TvShow.insertMany([
            {
                title: "Comedy Show",
                desc: "A hilarious comedy show.",
                img: "url_to_tv_show_poster_1",
                imgTitle: "url_to_tv_show_title_poster_1",
                imgSm: "url_to_small_image_1",
                trailer: "url_to_trailer_1",
                language: ["English"],
                releaseYear: "2021",
                genre: [categories[1]._id],
                createdBy: 2,
                updatedBy: 2
            },
            // More TV shows here
        ]);

        // Seasons and episodes for TV Shows
        const seasons = await Promise.all(tvShows.map(async (show, index) => {
            const season = await Season.create({
                tvShowId: show._id,
                seasonTitle: `Season ${index + 1}`,
                seasonDesc: "A new season.",
                seasonPoster: "url_to_season_poster",
                releaseYear: "2022",
            });

            // Episodes for each season
            const episodes = await Episode.insertMany([
                {
                    seasonId: season._id,
                    episodeNumber: 1,
                    episodeTitle: "Episode 1",
                    episodeDesc: "The first episode.",
                    time: "45min",
                    episodeImage: "url_to_episode_image_1",
                    videoUrl: "url_to_video_1",
                },
                // More episodes here
            ]);

            // Attach episodes to season
            season.episodes = episodes.map(ep => ep._id);
            await season.save();

            return season;
        }));

        // Series with seasons and episodes
        const series = await Series.insertMany([
            {
                title: "Sci-Fi Series",
                desc: "A thrilling science fiction adventure.",
                img: "url_to_series_poster_1",
                imgTitle: "url_to_series_title_poster_1",
                imgSm: "url_to_small_image_1",
                trailer: "url_to_trailer_1",
                language: ["English"],
                avgRuntime: "50min",
                releaseYear: "2020",
                genre: [categories[4]._id],
                createdBy: 3,
                updatedBy: 3
            },
            // More series here
        ]);

        // Seasons and episodes for Series
        await Promise.all(series.map(async (serie, index) => {
            const season = await Season.create({
                seriesId: serie._id,
                seasonTitle: `Season ${index + 1}`,
                seasonDesc: "An exciting new season.",
                seasonPoster: "url_to_series_season_poster",
                releaseYear: "2023",
            });

            // Episodes for each season
            const episodes = await Episode.insertMany([
                {
                    seasonId: season._id,
                    episodeNumber: 1,
                    episodeTitle: "Episode 1",
                    episodeDesc: "The first episode.",
                    time: "60min",
                    episodeImage: "url_to_episode_image",
                    videoUrl: "url_to_video",
                },
                // More episodes here
            ]);

            // Attach episodes to season
            season.episodes = episodes.map(ep => ep._id);
            await season.save();

            return season;
        }));

        console.log("Data injected successfully.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding the database:", error);
        mongoose.connection.close();
    }
}

seedDatabase();
