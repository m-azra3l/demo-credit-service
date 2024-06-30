import request from 'supertest'; // Import supertest for HTTP assertions
import App from '../app'; // Import the App class
import AuthRoute from '../routes/auth.route'; // Import AuthRoute for authentication routes

// Mock environment variables
process.env.SALT_ROUNDS = '10';
process.env.AUTH_SECRET = 'test-secret';
process.env.TOKEN_EXPIRATION = '1h';

// Mocking AuthRepo methods
jest.mock('../data/repositories/auth.repo', () => {
  return jest.fn().mockImplementation(() => {
    return {
      signup: jest.fn().mockImplementation(async (userData) => {
        // Simulate existing user error
        if (userData.email === 'existing@example.com') {
          throw { message: 'User with email existing@example.com already exists', status: 400 };
        // Simulate blacklisted user error
        } else if (userData.email === 'blacklisted@example.com') {
          throw { message: 'User with email blacklisted@example.com is blacklisted', status: 403 };
        } else {
          return Promise.resolve();
        }
      }),
      signin: jest.fn().mockImplementation(async (userData) => {
        // Simulate invalid credentials error
        if (userData.email === 'notfound@example.com') {
          throw { message: 'Invalid credentials', status: 400 };
        // Simulate wallet not found error
        } else if (userData.email === 'walletnotfound@example.com') {
          throw { message: 'Wallet not found', status: 404 };
        } else {
          return {
            user: {
              id: 1,
              name: 'Test User',
              accountNumber: '1234567890',
              email: userData.email,
              balance: 100,
              loan: 0,
              available: 100
            },
            token: 'test-jwt-token'
          };
        }
      })
    };
  });
});

// Create a new instance of the App with AuthRoute
const app = new App([new AuthRoute()]).getApp();

describe('AuthController', () => {
  // Tests for the sign-up endpoint
  describe('[POST] /auth/sign-up', () => {
    it('should successfully sign up a user', async () => {
      const response = await request(app)
        .post('/auth/sign-up')
        .send({ email: 'newuser@example.com', password: 'password123', name: 'New User' })
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successful');
    });

    it('should fail to sign up an existing user', async () => {
      const response = await request(app)
        .post('/auth/sign-up')
        .send({ email: 'existing@example.com', password: 'password123', name: 'Existing User' })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with email existing@example.com already exists');
    });

    it('should fail to sign up a blacklisted user', async () => {
      const response = await request(app)
        .post('/auth/sign-up')
        .send({ email: 'blacklisted@example.com', password: 'password123', name: 'Blacklisted User' })
        .expect(403);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with email blacklisted@example.com is blacklisted');
    });
  });

  // Tests for the sign-in endpoint
  describe('[POST] /auth/sign-in', () => {
    it('should successfully sign in a user', async () => {
      const response = await request(app)
        .post('/auth/sign-in')
        .send({ email: 'newuser@example.com', password: 'password123' })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successful');
      expect(response.body.data.user.email).toBe('newuser@example.com');
      expect(response.body.data.token).toBe('test-jwt-token');
    });

    it('should fail to sign in a non-existent user', async () => {
      const response = await request(app)
        .post('/auth/sign-in')
        .send({ email: 'notfound@example.com', password: 'password123' })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should fail to sign in a user without a wallet', async () => {
      const response = await request(app)
        .post('/auth/sign-in')
        .send({ email: 'walletnotfound@example.com', password: 'password123' })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Wallet not found');
    });
  });
});