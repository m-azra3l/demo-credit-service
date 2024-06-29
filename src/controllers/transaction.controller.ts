// Import necessary modules and types from 'express'
import { NextFunction, Response } from 'express';

// Import the TransactionRepo class to interact with the transaction data
import TransactionRepo from '../data/repositories/transaction.repo';

// Import the RequestWithUser interface to type the request object
import { RequestWithUser } from '../interfaces/auth.interface';

// Import the AccountDto to type the account data object
import { AccountDto } from '../dtos/account.dto';

// Import DTOs for funding wallet, transferring funds, and withdrawing funds
import { 
    FundWalletDto, 
    TransferDto, 
    WithdrawDto 
} from '../dtos/transaction.dto';

// Import the UserTransactionInterface to type the user transaction object
import { UserTransactionInterface } from '../interfaces/userTransaction.interface';

// Define the TransactionController class to handle transaction-related requests
class TransactionController {
    // Create an instance of the TransactionRepo to interact with the data layer
    public trxRepo = new TransactionRepo();

    // Method to handle funding a wallet
    public fundWallet = async (
        req: RequestWithUser,        // Request object with user data
        res: Response,               // Response object
        next: NextFunction           // Next middleware function
    ): Promise<void> => {
        try { 
            // Extract payload from the request body
            const payload: FundWalletDto = req.body;

            // Fund wallet using Transaction Repo
            const user: AccountDto = await this.trxRepo.fundWallet(req.user, payload); 

            res.status(200).json({
                status: 'success',
                message: 'Successful',
                data: user
            });
        } catch (error) {
            next(error); // Pass any errors to the next middleware (error handler)
        }
    };

    // Method to handle withdrawing funds
    public withdrawFunds = async (
        req: RequestWithUser,        // Request object with user data
        res: Response,               // Response object
        next: NextFunction           // Next middleware function
    ): Promise<void> => {
        try {
            // Extract payload from the request body
            const payload: WithdrawDto = req.body; 

            // Withdraw funds using Transaction Repo
            const user: AccountDto = await this.trxRepo.withdrawFunds(req.user, payload); 

            res.status(200).json({ 
                status: 'success', 
                message: 'Successful', 
                data: user 
            });
        } catch (error) {
            next(error); // Pass any errors to the next middleware (error handler)
        }
    };

    // Method to handle transferring funds
    public transferFunds = async (
        req: RequestWithUser,        // Request object with user data
        res: Response,               // Response object
        next: NextFunction           // Next middleware function
    ): Promise<void> => {
        try {
            // Extract payload from the request body
            const payload: TransferDto = req.body; 

            // Transfer funds using Transaction Repo
            const user: AccountDto = await this.trxRepo.transferFunds(req.user, payload); 

            res.status(200).json({ 
                status: 'success', 
                message: 'Successful', 
                data: user 
            });
        } catch (error) {
            next(error); // Pass any errors to the next middleware (error handler)
        }
    };

    // Method to get user transactions
    public getTransactions = async (
        req: RequestWithUser,        // Request object with user data
        res: Response,               // Response object
        next: NextFunction           // Next middleware function
    ): Promise<void> => {
        try {
            // Get transactions using Transaction Repo
            const transactions: UserTransactionInterface[] = await this.trxRepo.getTransactions(req.user);

            res.status(200).json({ 
                status: 'success', 
                message: 'Successful', 
                data: transactions 
            });
        } catch (error) {
            next(error); // Pass any errors to the next middleware (error handler)
        }
    };
}

// Export the TransactionController class as the default export
export default TransactionController;