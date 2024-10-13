const Attendance = require('../models/Attendance');
const calculateDistance = require('../utils/calculateDistance');
const AppError = require('../utils/appError'); // Assuming you're using custom error handling like AppError
const express = require('express');
const router = express.Router();
// GET route to display attendance form if session is valid
router.get('/attendance/:code', async (req, res, next) => {
  // Your code here
});

// POST route to handle attendance submission
router.post('/attendance/submit', async (req, res) => {
  const { attendanceId, studentId, studentName, latitude, longitude } =
    req.body;
  const ipAddress = req.clientIp; // request-ip middleware will provide the client's IP

  // Find the attendance session
  const attendance = await Attendance.findById(attendanceId);

  // Check if the session is still active and not expired
  if (!attendance || attendance.expiryTime < Date.now()) {
    return res.send('Attendance session is no longer active.');
  }

  // Check for duplicates by student ID or IP address
  const existingEntry = attendance.students.find(
    (s) => s.studentId === studentId || s.ipAddress === ipAddress,
  );

  if (existingEntry) {
    return res.send('You have already submitted your attendance.');
  }

  // Validate proximity using the calculateDistance function
  const distance = calculateDistance(
    attendance.latitude,
    attendance.longitude,
    latitude,
    longitude,
  );

  // If the student is not within the required 10 meters, reject their attendance submission
  if (distance > 10) {
    return res.send(
      'You are not within the required range to submit attendance.',
    );
  }

  // Add the student's attendance details to the attendance session
  attendance.students.push({
    studentId,
    studentName,
    ipAddress,
    latitude,
    longitude,
  });

  // Save the updated attendance session with the new student's data
  await attendance.save();

  res.send('Attendance submitted successfully.');
});
module.exports = router;

