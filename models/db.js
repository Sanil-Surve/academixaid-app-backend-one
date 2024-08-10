const mongoose = require("mongoose");

mongoose.set('strictQuery', 'true');

const url = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

connectToDatabase();