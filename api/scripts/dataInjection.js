const mongoose = require("mongoose");
require("dotenv").config();

const { faker } = require("@faker-js/faker");
const Movie = require("../models/Movie");
const Series = require("../models/Series");
const TvShow = require("../models/TvShow");
const Category = require("../models/Category");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    insertDummyCategories();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Insert dummy categories
async function insertDummyCategories() {
  try {
    const categories = [];
    for (let i = 0; i < 10; i++) {
      categories.push({
        name: faker.lorem.word(),
      });
    }
    await Category.insertMany(categories);
    console.log("Categories inserted successfully");

    // After inserting categories, proceed to insert movies, series, and TV shows
    const insertedCategories = await Category.find(); // Fetch the inserted categories
    await insertDummyMovies(insertedCategories);
    await insertDummySeries(insertedCategories);
    await insertDummyTvShows(insertedCategories);
  } catch (error) {
    console.error("Error inserting categories:", error);
  }
}

// Insert dummy movies
async function insertDummyMovies(categories) {
  try {
    const movies = [];
    for (let i = 0; i < 10; i++) {
      const randomCategories = faker.helpers.arrayElements(categories, {
        max: 2, // Choose 1 or 2 random categories
      });
      movies.push({
        name: faker.lorem.sentence(),
        overview: faker.lorem.sentence(),
        poster_path: faker.image.url(),
        poster_Title: faker.image.url(),
        imgSm: faker.image.url(),
        backdrop_path: faker.image.url(),
        first_air_date: faker.date.past(),
        trailer: faker.internet.url(),
        language: [faker.word.noun(), faker.word.noun()],
        releaseYear: faker.date.past().getFullYear().toString(),
        votes: Array(5).fill().map(() => faker.number.int(10)),
        rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
        genre: randomCategories.map((cat) => cat._id), // Use ObjectId of categories
        createdBy: 1,
        updatedBy: 1,
      });
    }
    await Movie.insertMany(movies);
    console.log("Movies inserted successfully");
  } catch (error) {
    console.error("Error inserting movies:", error);
  }
}

// Insert dummy series
async function insertDummySeries(categories) {
  try {
    const series = [];
    for (let i = 0; i < 10; i++) {
      const randomCategories = faker.helpers.arrayElements(categories, {
        max: 2, // Choose 1 or 2 random categories
      });
      series.push({
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentence(),
        img: faker.image.url(),
        imgTitle: faker.image.url(),
        imgSm: faker.image.url(),
        trailer: faker.internet.url(),
        language: [faker.word.noun(), faker.word.noun()],
        avgRuntime: `${faker.number.int({ min: 20, max: 60 })} min`,
        releaseYear: faker.date.past().getFullYear().toString(),
        rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
        votes: Array(5).fill().map(() => faker.number.int(10)),
        genre: randomCategories.map((cat) => cat._id),
        seasons: [],
        createdBy: 1,
        updatedBy: 1,
      });
    }
    await Series.insertMany(series);
    console.log("Series inserted successfully");
  } catch (error) {
    console.error("Error inserting series:", error);
  }
}

// Insert dummy TV shows
async function insertDummyTvShows(categories) {
  try {
    const tvShows = [];
    for (let i = 0; i < 10; i++) {
      const randomCategories = faker.helpers.arrayElements(categories, {
        max: 2, // Choose 1 or 2 random categories
      });
      tvShows.push({
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentence(),
        img: faker.image.url(),
        imgTitle: faker.image.url(),
        imgSm: faker.image.url(),
        trailer: faker.internet.url(),
        language: [faker.word.noun(), faker.word.noun()],
        releaseYear: faker.date.past().getFullYear().toString(),
        rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
        votes: Array(5).fill().map(() => faker.number.int(10)),
        genre: randomCategories.map((cat) => cat._id),
        avgRuntime: `${faker.number.int({ min: 20, max: 60 })} min`,
        seasons: [],
        createdBy: 1,
        updatedBy: 1,
      });
    }
    await TvShow.insertMany(tvShows);
    console.log("TV shows inserted successfully");
  } catch (error) {
    console.error("Error inserting TV shows:", error);
  }
}
