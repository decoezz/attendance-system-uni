const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config(); // Load environment variables

console.log('Database URL:', process.env.DATABASE);

process.on('uncaughtException', (err) => {
  console.log('Shutting down due to an uncaught exception... 💣');
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Shutting down due to an unhandled rejection... 💣');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
