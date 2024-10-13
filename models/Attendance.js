const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for individual student attendance
const studentSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for the attendance session
const attendanceSchema = new Schema({
  className: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets the current date
  },
  professor: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  attendanceCode: {
    type: String,
    required: true,
    unique: true,
  },
  expiryTime: {
    type: Date,
    required: true, // Set the expiry time when the attendance is created
  },
  students: [studentSchema], // Embed the student attendance details here
});

// Export the model for use in other parts of the application
module.exports = mongoose.model('Attendance', attendanceSchema);
