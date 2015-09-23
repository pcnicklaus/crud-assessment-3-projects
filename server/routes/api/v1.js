var express = require('express');
var router = express.Router();

var Exercise = require('../../models/projects');

// get all exercise
router.get('/exercises', function (req, res, next) {
  Exercise.find(function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json(data);
    }
  });
});

// get one exercise
router.get('/exercise/:id', function (req, res, next) {
  Exercise.findById(req.paramas.id, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json (data);
    }
  });
});

// post one exercise
router.post('/exercises', function (req, res, next) {
  var newExercise = new Exercise ({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
  });
  newExercise.save(function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'SAVED': err});
    }
  });
});

// put / update one exercise
router.put('/exercise/:id', function (err, res, next) {
  Exercise.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'UPDATED': data});
    }
  });
});

// delete one exercise
router.delete('/exercise/:id', function (err, res, next) {
  Exercise.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'DELETED': data});
    }
  });
});

module.exports = router;
