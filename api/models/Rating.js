const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: { type: Schema.Types.ObjectId, required: true }, // Movie, Series Episode, or TV Show Episode ID
    contentType: { type: String, enum: ['Movie', 'Series', 'TvShow'], required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
}, { timestamps: true });

RatingSchema.index({ user: 1, contentId: 1 }, { unique: true }); // Ensure a user can only rate once per content

module.exports = mongoose.model('Rating', RatingSchema);
