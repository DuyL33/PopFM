// playlistSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  time_slot: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
