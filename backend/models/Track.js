const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: String
});

const TrackSchema = new mongoose.Schema({
  track_id: {
    type: String,
    required: true,
    unique: true
  },
  track_name: {
    type: String,
    required: true
  },
  track_length: {
    type: String,
    required: true
  },
  artist: {
      type: String,
      required: true
  },
  explicit: {
      type: Boolean,
      required: true
  },
  genre: {
    type: [GenreSchema],
    required: true
  }
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
