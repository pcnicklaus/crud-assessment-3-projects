process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-Http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Project = require('../server/models/project');

var should = chai.should();
chai.use(chaiHttp);

describe('Projects', function () {

  Project.collection.drop();

  beforeEach(function(done) {
    var newProject = new Project ({
      name: 'Something',
      description: 'A description',
      tags: ['tag'],
      group: true,
      group_members: ['Honkey']
    });
    newProject.save(function (err, data) {
      done();
    });
  });
  afterEach(function(done) {
    Project.collection.drop();
    done();
  });

  it('should list ALL Projects on /api/v1/projects GET', function(done) {
    chai.request(server)
      .get('/api/v1/projects')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('tags');
        res.body[0].should.have.property('group');
        res.body[0].should.have.property('group_members');
        res.body[0].name.should.equal('Something');
        res.body[0].description.should.equal('A description');
        res.body[0].group.should.equal(true);
        // res.body[0].group_members.should.equal(['Honkey']);
        done();
      });
  });

  it('should list a SINGLE project on /api/v1/project/<id> GET', function(done) {
    var newProject = new Project({
      name: "one",
      description: "two"
    });
    newProject.save(function (err, data) {
      chai.request(server)
        .get('/api/v1/project/' + data.id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.name.should.equal('one');
          res.body.description.should.equal('two');
          done();
        });
    });

  });

  it('should add a SINGLE exercise on /api/exercises POST', function(done) {
    chai.request(server)
      .post('/api/v1/projects')
      .send({'name': 'Honkey', 'description': 'Magoo'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SAVED');
        res.body.SAVED.should.be.a('object');
        res.body.SAVED.should.have.property('name');
        res.body.SAVED.should.have.property('description');
        res.body.SAVED.should.have.property('_id');
        res.body.SAVED.name.should.equal('Honkey');
        res.body.SAVED.description.should.equal('Magoo');
        done();
      });
  });

  it('should update a SINGLE project on /api/v1/project/<id> PUT', function(done) {
    chai.request(server)
      .get('/api/v1/projects')
      .end(function (err, res) {
        chai.request(server)
          .put('/api/v1/project/' + res.body[0]._id)
          .send({'name': 'HonkeyMagoo'})
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('UPDATED');
            res.body.UPDATED.should.be.a('object');
            res.body.UPDATED.should.have.property('name');
            res.body.UPDATED.should.have.property('_id');
            // res.body.UPDATED.name.should.equal('HonkeyMagoo');
            done();
          });
      });
  });
 it('should delete a SINGLE project on /api/v1/project/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/v1/projects')
    .end(function (err, res) {
      chai.request(server)
        .delete('/api/v1/project/' + res.body[0]._id)
        .end( function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('DELETED');
          res.body.DELETED.should.be.a('object');
          res.body.DELETED.should.have.property('name');
          res.body.DELETED.should.have.property('description');
          res.body.DELETED.should.have.property('_id');
          res.body.DELETED.name.should.equal('Something');
          res.body.DELETED.description.should.equal('A description');
          done();
        });
    });

  });

});
