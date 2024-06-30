import request from 'supertest';
import App from '../app';
import HealthRoute from '../routes/health.route';

// Initialize the app with the HealthRoute
const app = new App([new HealthRoute()]);

// Test suite for HealthController
describe('Health Controller Test', () => {
  // Test for the base health route
  describe('GET /', () => {
    it('should return 200 and healthy message', async () => {
      const response = await request(app.getApp()).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('<h1>Healthy🎉🎊</h1>');
    });
  });

  // Test for the /health route
  describe('GET /health', () => {
    it('should return 200 and healthy message', async () => {
      const response = await request(app.getApp()).get('/health');
      expect(response.status).toBe(200);
      expect(response.text).toBe('<h1>Healthy🎉🎊</h1>');
    });
  });
});
