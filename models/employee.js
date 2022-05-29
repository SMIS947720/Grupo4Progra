const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    hiredate: String,
    jobid: String,
    salary: String,
    commission: String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;