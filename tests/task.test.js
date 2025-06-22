const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const List = require('../models/list');

describe('Task API', () => {
  let user;
  let task;

  beforeEach(async () => {
    await User.deleteMany();
    await List.deleteMany();

    user = await User.create({
      email: 'test@example.com',
      username: 'tester',
      password: 'hashedpassword'
    });

    task = await List.create({
      title: 'Sample Task',
      body: 'Do something important',
      user: [user._id]
    });

    user.list.push(task._id);
    await user.save();
  });

  it('should add a task', async () => {
    const res = await request(app)
      .post('/api/v2/addTask')
      .send({ title: 'New Task', body: 'Details here', email: user.email });

    expect(res.statusCode).toBe(201);
    expect(res.body.list).toHaveProperty('title', 'New Task');
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/v2/updateTask/${task._id}`)
      .send({ title: 'Updated Task', body: 'Updated details' });

    expect(res.statusCode).toBe(200);
    expect(res.body.list).toHaveProperty('title', 'Updated Task');
  });

  it('should get all tasks', async () => {
    const res = await request(app).get(`/api/v2/getTasks/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.list.length).toBeGreaterThan(0);
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/v2/deleteTask/${task._id}`)
      .send({ email: user.email });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });
});
