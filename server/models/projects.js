var mongoose = require('mongoose');
var Schema = mongoose.schema;

var Project = new Schema ({
  name: String,
  description: String,
  tags: [String],
  group: Boolean,
  group_members: [String]
});

module.exports = mongoose.model('projects', Project);
