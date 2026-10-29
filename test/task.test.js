const request = require('supertest');
const app = require('../src/app');
const taskController = require('../src/controllers/taskController');

describe('Smart Task Microservice API Tests', () => {
  beforeEach(() => {
    taskController.resetStore();
  });

  test('GET /health - Should return probe status UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('service', 'smart-task-microservice');
  });

  test('GET /api/v1/tasks - Should fetch all initial tasks', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toEqual(2);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/tasks/:id - Should fetch task by valid ID', async () => {
    const res = await request(app).get('/api/v1/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toEqual(1);
    expect(res.body.data.title).toEqual('Design Microservice Architecture');
  });

  test('GET /api/v1/tasks/:id - Should return 404 for invalid ID', async () => {
    const res = await request(app).get('/api/v1/tasks/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/v1/tasks - Should create a new task successfully', async () => {
    const newTaskPayload = {
      title: 'Implement Automated Unit Tests',
      description: 'Write Jest test cases for microservice controller',
      priority: 'HIGH'
    };

    const res = await request(app)
      .post('/api/v1/tasks')
      .send(newTaskPayload);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.title).toEqual('Implement Automated Unit Tests');
    expect(res.body.data.status).toEqual('PENDING');
  });

  test('POST /api/v1/tasks - Should return 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ description: 'No title provided' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  test('PUT /api/v1/tasks/:id - Should update an existing task', async () => {
    const updatePayload = {
      status: 'COMPLETED',
      priority: 'MEDIUM'
    };

    const res = await request(app)
      .put('/api/v1/tasks/2')
      .send(updatePayload);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toEqual('COMPLETED');
    expect(res.body.data.priority).toEqual('MEDIUM');
  });

  test('DELETE /api/v1/tasks/:id - Should delete a task by ID', async () => {
    const res = await request(app).delete('/api/v1/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);

    const fetchRes = await request(app).get('/api/v1/tasks/1');
    expect(fetchRes.statusCode).toEqual(404);
  });
});
