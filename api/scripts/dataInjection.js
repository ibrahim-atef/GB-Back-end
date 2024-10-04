const mongoose = require("mongoose");
require('dotenv').config();

const { faker } = require('@faker-js/faker');
const Movie = require('../models/Movie');
const Series = require('../models/Series');
const TvShow = require('../models/TvShow');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    insertDummyMovies();
    insertDummySeries();
    insertDummyTvShows();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function insertDummyMovies() {
  try {
    const movies = [];
    for (let i = 0; i < 10; i++) {
      movies.push({
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentence(),
        img: faker.image.url(), // Updated method
        imgTitle: faker.image.url(), // Updated method
        imgSm: faker.image.url(), // Updated method
        trailer: faker.internet.url(),
        language: [faker.word.noun(), faker.word.noun()], // Updated method
        releaseYear: faker.date.past().getFullYear().toString(),
        votes: [faker.number.int(10), faker.number.int(10), faker.number.int(10), faker.number.int(10), faker.number.int(10)], // Updated method
        rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }), // Updated method
        genre: [faker.word.noun(), faker.word.noun()], // Updated method
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

async function insertDummySeries() {
  try {
    const series = [];
    for (let i = 0; i < 10; i++) {
      series.push({
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentence(),
        img: faker.image.url(), // Updated method
        imgTitle: faker.image.url(), // Updated method
        imgSm: faker.image.url(), // Updated method
        trailer: faker.internet.url(),
        language: [faker.word.noun(), faker.word.noun()], // Updated method
        avgRuntime: `${faker.number.int({ min: 20, max: 60 })} min`, // Updated method
        releaseYear: faker.date.past().getFullYear().toString(),
        rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }), // Updated method
        votes: [faker.number.int(10), faker.number.int(10), faker.number.int(10), faker.number.int(10), faker.number.int(10)], // Updated method
        genre: [faker.word.noun(), faker.word.noun()], // Updated method
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

async function insertDummyTvShows() {
  try {
    const tvShows = [];
    for (let i = 0; i < 10; i++) {
      tvShows.push({
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentence(),
        img: faker.image.url(), // Updated method
        imgTitle: faker.image.url(), // Updated method
        imgSm: faker.image.url(), // Updated method
        trailer: faker.internet.url(),
        language: [faker.word.noun(), faker.word.noun()], // Updated method
        releaseYear: faker.date.past().getFullYear().toString(),
        rating: faker.number.float({ min: 0, max: 10, precision: 0.1 }), // Updated method
        votes: [faker.number.int(10), faker.number.int(10), faker.number.int(10), faker.number.int(10), faker.number.int(10)], // Updated method
        genre: [faker.word.noun(), faker.word.noun()], // Updated method
        avgRuntime: `${faker.number.int({ min: 20, max: 60 })} min`, // Updated method
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
