const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);
let Track = require('../models/Track');

const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.route('/').get((req, res) => {
  Track.find()
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json('Error: ' + err));

  // res.json({message: "You are trying to see a list of movies"});
});

router.route("/:id").get((req, res) => {
  const trackId = req.params.id;

  Track.findById(trackId)
    .then(result => {
      if (!result) {
        return res.setMaxListeners(404).json({
          message: "Track not found with id " + trackId
        });
      }
      res.json(result);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Track not found with id " + trackId
        });
      }
      return res.status(500).json({
        message: "Error retrieving track with id " + trackId
      });
    });
});


router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const track = req.body;
  if (token) {

    if (!track.track_name) {
      return res.status(400).json({
        message: "Track name can not be empty!"
      });
    }

    const newTrack = new Track(track);

    newTrack.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({ success: false, message: 'Unauthorized gamer boi' });
  }
});

router.route("/:id").put((req, res) => {
  const trackId = req.params.id;
  const newTrack = req.body;

  if (!newTrack.track_name) {
    return res.status(400).json({
      message: "Track name cant be empty"
    });
  }

  Track.findByIdAndUpdate(trackId, newTrack, { new: true })
    .then(track => {
      if (!track) {
        return res.status(404).json({
          message: "Track not found with id " + trackId
        });
      }
      res.json(track);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          message: "Track not found with Id" + trackId
        });
      }
      return res.status(500).json({
        message: "Error updating track with id " + trackId
      });
    });
  // res.json(data);

});

router.route("/:id").delete((req, res) => {
  const trackId = req.params.id;

  Track.findByIdAndRemove(trackId)
    .then(track => {
      if (!track) {
        return res.status(404).json({
          message: "Track not found with id " + trackId
        });
      }
      res.json({ message: "Track deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).json({
          message: "Track not found with id " + trackId
        });
      }
      return res.status(500).send({
        message: "Could not delete track with id " + trackId
      });
    });

  // res.json(data);
});


module.exports = router;