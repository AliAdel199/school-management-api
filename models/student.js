const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
  pidInstallment: Number,
  remainingInstallment: Number,
  date: String,
  installmentCode: String,
  studentClass: String,
});

const gradeSchema = new mongoose.Schema({
  subject: String,
  grade: Number,
});

const studentSchema = new mongoose.Schema({
  name: String,
  birthdate: String,
  gender: String,
  studentToken: String,
  schoolName: String,
  location: String,
  stage: String,
  studentClass: String,
  totalInstallments: Number,
  remainingInstallment: Number,
  phoneNumber1: String,
  phoneNumber2: String,
  installmentsList: [installmentSchema],
  hasBrother: String,
  status: String,
  grade: [gradeSchema],
  educationalLevel: String,
  dateJoined: String,
  discount: Number,
  email: String,
  password: String,
  nots: String,
});

module.exports = mongoose.model('Student', studentSchema);
