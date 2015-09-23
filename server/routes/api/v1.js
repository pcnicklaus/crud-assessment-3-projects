var express = require('express');
var router = express.Router();

var Project = require('../../models/project');

// get all projects
router.get('/projects', function (req, res, next) {
  Project.find(function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json(data);
    }
  });
});

// get one project
router.get('/project/:id', function (req, res, next) {
  Project.findById(req.params.id, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json (data);
    }
  });
});

// post one exercise
router.post('/projects', function (req, res, next) {
  var newProject = new Project ({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
  });
  newProject.save(function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'SAVED': data});
    }
  });
});

// put / update one exercise
router.put('/project/:id', function (req, res, next) {
  Project.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'UPDATED': data});
    }
  });
});

// delete one exercise
router.delete('/project/:id', function (req, res, next) {
  Project.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'DELETED': data});
    }
  });
});

module.exports = router;
