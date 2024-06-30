// Import necessary modules for testing
import request from 'supertest';
import App from '../app';
import TransactionRoute from '../routes/transaction.route';

// Mock environment variables
process.env.SALT_ROUNDS = '10';
process.env.AUTH_SECRET = 'test-secret';
process.env.TOKEN_EXPIRATION = '1h';

// Mocking TransactionRepo methods
jest.mock('../data/repositories/transaction.repo', () => {
  return jest.fn().mockImplementation(() => {
    return {
      fundWallet: jest.fn().mockImplementation(async (userInfo, payload) => {
        if (userInfo.email === 'notfound@example.com') {
          throw { message: 'User with account number not found', status: 404 };
        } else {
          return {
            id: 1,
            name: 'Test User',
            accountNumber: '1234567890',
            email: userInfo.email,
            balance: 100 + payload.amount,
            loan: 0,
            available: 100 + payload.amount
          };
        }
      }),
      withdrawFunds: jest.fn().mockImplementation(async (userInfo, payload) => {
        if (userInfo.email === 'notfound@example.com') {
          throw { message: 'User with account number not found', status: 404 };
        } else if (userInfo.email === 'insufficientfunds@example.com') {
          throw { message: 'Insufficient funds!\n You do not have available funds to perform this operation', status: 400 };
        } else {
          return {
            id: 1,
            name: 'Test User',
            accountNumber: '1234567890',
            email: userInfo.email,
            balance: 100 - payload.amount,
            loan: 0,
            available: 100 - payload.amount
          };
        }
      }),
      transferFunds: jest.fn().mockImplementation(async (userInfo, payload) => {
        if (userInfo.email === 'notfound@example.com') {
          throw { message: 'User with account number not found', status: 404 };
        } else if (userInfo.email === 'insufficientfunds@example.com') {
          throw { message: 'Insufficient funds! You do not have available funds to perform this operation', status: 400 };
        } else {
          return {
            id: 1,
            name: 'Test User',
            accountNumber: '1234567890',
            email: userInfo.email,
            balance: 100 - payload.amount,
            loan: 0,
            available: 100 - payload.amount
          };
        }
      }),
      getTransactions: jest.fn().mockImplementation(async (userInfo) => {
        if (userInfo.email === 'notfound@example.com') {
          throw { message: 'User with account number not found', status: 404 };
        } else {
          return [{
            id: 1,
            amount: "100.00",
            userId: 1,
            type: "fund",
            status: "pending",
            direction: "credit",
            createdAt: "2024-06-29T16:32:49.000Z",
            updatedAt: "2024-06-29T16:32:49.000Z",
            deleted: 0,
            destination: {
              id: 2,
              name: "Jane Doe",
              account_number: "9678758461",
              email: "jane.doe@example.com",
              createdAt: "2024-06-29T16:32:38.000Z",
              updatedAt: "2024-06-29T16:32:38.000Z",
              deleted: 0
            },
            source: {
              id: 3,
              name: "Jim Beam",
              account_number: "9678758477",
              email: "jim.beam@example.com",
              createdAt: "2024-06-29T16:32:38.000Z",
              updatedAt: "2024-06-29T16:32:38.000Z",
              deleted: 0
            }
          }];
        }
      })
    };
  });
});

// Create a new instance of the App with TransactionRoute
const app = new App([new TransactionRoute()]).getApp();

describe('TransactionController', () => {
  describe('[POST] /transaction/fund', () => {
    it('should successfully fund a wallet', async () => {
      const response = await request(app)
        .post('/transaction/fund')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ amount: 100 })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successful');
      expect(response.body.data.balance).toBe(200);
    });

    it('should fail to fund a wallet for a non-existent user', async () => {
      const response = await request(app)
        .post('/transaction/fund')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ email: 'notfound@example.com', amount: 100 })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with account number not found');
    });
  });

  describe('[POST] /transaction/withdraw', () => {
    it('should successfully withdraw funds', async () => {
      const response = await request(app)
        .post('/transaction/withdraw')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ amount: 50 })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successful');
      expect(response.body.data.balance).toBe(50);
    });

    it('should fail to withdraw funds for a non-existent user', async () => {
      const response = await request(app)
        .post('/transaction/withdraw')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ email: 'notfound@example.com', amount: 100 })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with account number not found');
    });

    it('should fail to withdraw funds due to insufficient balance', async () => {
      const response = await request(app)
        .post('/transaction/withdraw')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ email: 'insufficientfunds@example.com', amount: 150 })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Insufficient funds!\n You do not have available funds to perform this operation');
    });
  });

  describe('[POST] /transaction/transfer', () => {
    it('should successfully transfer funds', async () => {
      const response = await request(app)
        .post('/transaction/transfer')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ accountNumber: '9876543210', amount: 50 })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successful');
      expect(response.body.data.balance).toBe(50);
    });

    it('should fail to transfer funds for a non-existent user', async () => {
      const response = await request(app)
        .post('/transaction/transfer')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ email: 'notfound@example.com', accountNumber: '9876543210', amount: 100 })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with account number not found');
    });

    it('should fail to transfer funds due to insufficient balance', async () => {
      const response = await request(app)
        .post('/transaction/transfer')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ email: 'insufficientfunds@example.com', accountNumber: '9876543210', amount: 150 })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Insufficient funds! You do not have available funds to perform this operation');
    });
  });

  describe('[GET] /transaction/transactions', () => {
    it('should successfully get user transactions', async () => {
      const response = await request(app)
        .get('/transaction/transactions')
        .set('Authorization', 'Bearer test-jwt-token')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Successful');
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should fail to get transactions for a non-existent user', async () => {
      const response = await request(app)
        .get('/transaction/transactions')
        .set('Authorization', 'Bearer test-jwt-token')
        .send({ email: 'notfound@example.com' })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('User with account number not found');
    });
  });
});
