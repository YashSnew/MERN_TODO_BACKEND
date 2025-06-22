const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/v1/register').send({
      email: 'test@example.com',
      username: 'testuser',
      password: '123456'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not allow duplicate registration', async () => {
    await request(app).post('/api/v1/register').send({
      email: 'test@example.com',
      username: 'testuser',
      password: '123456'
    });

    const res = await request(app).post('/api/v1/register').send({
      email: 'test@example.com',
      username: 'testuser',
      password: '123456'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Email already registered');
  });

  it('should sign in a user', async () => {
    await request(app).post('/api/v1/register').send({
      email: 'login@example.com',
      username: 'user',
      password: 'pass123'
    });

    const res = await request(app).post('/api/v1/signin').send({
      email: 'login@example.com',
      password: 'pass123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('should not sign in with wrong password', async () => {
    await request(app).post('/api/v1/register').send({
      email: 'wrongpass@example.com',
      username: 'user',
      password: 'correct'
    });

    const res = await request(app).post('/api/v1/signin').send({
      email: 'wrongpass@example.com',
      password: 'incorrect'
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  it('should return 404 for unregistered email', async () => {
    const res = await request(app).post('/api/v1/signin').send({
      email: 'notfound@example.com',
      password: 'irrelevant'
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
