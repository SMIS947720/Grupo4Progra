const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
    projectname: String,
    projectstart: String,
    projectend: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;