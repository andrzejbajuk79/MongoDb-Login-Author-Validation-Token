const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
  min: 6,
 },
 email: {
  type: String,
  required: true,
  min: 46,
 },
 password: {
  type: String,
  required: true,
  min: 1024,
 },
 date: {
  type: String,
  default: Date.now,
 },
});

module.exports = mongoose.model('User', userSchema);
