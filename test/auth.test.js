const request = require('supertest');
const jwt = require('jsonwebtoken'); // Fix: Import jwt
const bcrypt = require('bcryptjs'); // Fix: Import bcrypt
const app = require('../app'); // Import the Express app
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a user and send a verification email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
    });
  
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Registration successful. Please verify your email.');
  
    const user = await User.findOne({ email: 'testuser@example.com' });
    expect(user).toBeDefined();
  
    const allUsers = await User.find({});
    if (allUsers.length === 1) {
      expect(user.emailVerified).toBe(true); // First user
      expect(user.status).toBe('active'); // First user
    } else {
      expect(user.emailVerified).toBe(false); // Subsequent users
      expect(user.status).toBe('pending'); // Subsequent users
    }
  });
  
  it('should verify the user email successfully', async () => {
    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'hashedpassword',
      emailVerified: false,
      status: 'pending',
    });
    await user.save();

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const res = await request(app).get(`/api/auth/verify-email/${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Email verified successfully');

    const updatedUser = await User.findOne({ email: 'testuser@example.com' });
    expect(updatedUser.emailVerified).toBe(true);
  });

  it('should allow login for verified and approved users', async () => {
    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: await bcrypt.hash('Password123', 10), // Fix: Use bcrypt.hash
      emailVerified: true,
      status: 'active',
    });
    await user.save();

    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'Password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
    expect(res.body.token).toBeDefined();
  });
});
