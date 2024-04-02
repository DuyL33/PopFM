// songSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true }, 
}, { collection: 'songs' });


module.exports = mongoose.model('Song', songSchema);
