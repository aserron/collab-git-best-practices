const request = require('supertest');
const app = require('../index');

describe('Health Check Endpoint', () => {
  it('should return 200 OK with status and timestamp', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
  });
}); 