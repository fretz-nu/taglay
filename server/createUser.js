require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createFirstUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'admin@taglay.com' });
    if (existingUser) {
      console.log('User already exists!');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create user
    const user = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@taglay.com',
      password: hashedPassword,
      type: 'admin',
      isActive: true
    });

    console.log('User created successfully!');
    console.log('Email: admin@taglay.com');
    console.log('Password: admin123');
    console.log('Please change your password after first login.');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
};

createFirstUser();
