// Import the necessary modules and types from 'express'
import { Router } from 'express';

// Import the Routes interface for type definition
import { Routes } from '../interfaces/route.interface';

// Import DTOs for funding wallet, transferring funds, and withdrawing funds
import { FundWalletDto, TransferDto, WithdrawDto } from '../dtos/transaction.dto';

// Import the authentication middleware to protect routes
import authMiddleware from '../middlewares/auth.middleware';

// Import the validation middleware to validate request data
import validationMiddleware from '../middlewares/validation.middleware';

// Import the TransactionController to handle transaction-related requests
import TransactionController from '../controllers/transaction.controller';

// Define the TransactionRoute class to set up transaction-related routes
class TransactionRoute implements Routes {
  public path = '/transaction/'; // Base path for transaction routes
  public router = Router(); // Express Router instance
  public trxController = new TransactionController(); // Instance of TransactionController to handle requests

  constructor() {
    this.initializeRoutes(); // Initialize the routes when an instance is created
  };

  // Private method to initialize the routes
  private initializeRoutes() {
    // Route to get transactions for the authenticated user
    this.router.get(
        `${this.path}transactions`, 
        authMiddleware, // Protect the route with authentication middleware
        this.trxController.getTransactions // Handle the request with getTransactions method
    );

    // Route to fund a wallet for the authenticated user
    this.router.post(
        `${this.path}fund`, 
        authMiddleware, // Protect the route with authentication middleware
        validationMiddleware(FundWalletDto, 'body'), // Validate the request body against FundWalletDto
        this.trxController.fundWallet // Handle the request with fundWallet method
    );

    // Route to transfer funds for the authenticated user
    this.router.post(
        `${this.path}transfer`, 
        authMiddleware, // Protect the route with authentication middleware
        validationMiddleware(TransferDto, 'body'), // Validate the request body against TransferDto
        this.trxController.transferFunds // Handle the request with transferFunds method
    );

    // Route to withdraw funds for the authenticated user
    this.router.post(
        `${this.path}withdraw`, 
        authMiddleware, // Protect the route with authentication middleware
        validationMiddleware(WithdrawDto, 'body'), // Validate the request body against WithdrawDto
        this.trxController.withdrawFunds // Handle the request with withdrawFunds method
    );
  };
};

// Export the TransactionRoute class as the default export
export default TransactionRoute;