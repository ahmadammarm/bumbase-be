const mongoose = require('mongoose');

const mongodbConnectionUri = process.env.MONGODB_URI

const mongodbConnect = async () => {
  try {
    await mongoose.connect(mongodbConnectionUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongodbConnect;
