const express = require('express');
const session = require('express-session');
const professorRouter = require('./routes/professor');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.Session_secret,
  resave: false,
  saveUninitialized: false,
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Register routes
app.use('/api/professor', professorRouter);

module.exports = app;
