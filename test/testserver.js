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

});
