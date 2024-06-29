// Import the 'raw' function from 'objection' for raw SQL queries
import { raw } from 'objection';

// Import the 'Transaction' model
import { Transaction } from '../../models/transaction.model';

// Import the 'User' model
import { User } from '../../models/user.model';

// Import the 'UserTransaction' model
import { UserTransaction } from '../../models/userTransaction.model';

// Import the 'Wallet' model
import { Wallet } from '../../models/wallet.model';

// Import the 'UserInterface' to type the user object
import { UserInterface } from '../../interfaces/user.interface';

// Import the 'UserTransactionInterface' to type the user transaction object
import { UserTransactionInterface } from '../../interfaces/userTransaction.interface';

// Import DTOs for funding wallet, transferring funds, and withdrawing funds
import { 
    FundWalletDto, 
    TransferDto, 
    WithdrawDto 
} from '../../dtos/transaction.dto';

// Import the 'AccountDto' to type the account data object
import { AccountDto } from '../../dtos/account.dto';

// Import custom 'HttpError' class for error handling
import { HttpError } from '../../errors/httpError';

// Import the 'getAccountData' function to prepare account data
import { getAccountData } from '../../services/account.services';

// Repository for transactions
class TransactionRepo {

    // Method to fund a user's wallet
    public async fundWallet(userInfo: UserInterface | undefined, payload: FundWalletDto): Promise<AccountDto> {
        // Check if userInfo is defined, throw an error if not
        if(!userInfo) throw new HttpError('Missing user info in request!', 500);
        const trx = await Wallet.startTransaction(); // Start a transaction
        try {
            // Get the user's wallet using the account number
            const { wallet } = await this.getUserWallet(userInfo.accountNumber);

            // Insert a new transaction record
            const transaction: UserTransaction = await UserTransaction.query(trx).insertAndFetch({
                userId: userInfo.id,
                direction: 'credit',
                type: 'fund',
                status: 'pending',
                amount: +payload.amount,
            });

            // Update the wallet balance
            const updatedWallet = await wallet.$query(trx).patchAndFetch({
                balance: raw('balance + :amount', { amount: +payload.amount })
            });

            // Update the transaction status to 'success'
            await transaction.$query(trx).patchAndFetch({ status: 'success' });

            await trx.commit(); // Commit the transaction

            // Prepare the account data to be returned
            const user = getAccountData(userInfo, updatedWallet)

            return user; // Return the user with updated wallet
        }
        catch (error: any) {
            await trx.rollback(); // Rollback the transaction in case of error
            throw new HttpError(error.message, 500); // Throw an HttpError with a 500 status code
        }
    };

    // Method to withdraw funds from wallet
    public async withdrawFunds(userInfo: UserInterface | undefined, payload: WithdrawDto): Promise<AccountDto> {
        // Check if userInfo is defined, throw an error if not
        if(!userInfo) throw new HttpError('Missing user info in request!', 500);
        const trx = await Wallet.startTransaction(); // Start a transaction
        try {
            // Get the user's wallet using the account number
            const { wallet } = await this.getUserWallet(userInfo.accountNumber);

            // Insert a new transaction record
            const transaction: UserTransaction = await UserTransaction.query(trx).insertAndFetch({
                userId: userInfo.id,
                direction: 'debit',
                type: 'withdraw',
                status: 'pending',
                amount: +payload.amount,
            });

            // Calculate available balance
            const availableBalance = wallet.balance - wallet.loan;

            // Check if available balance is sufficient for withdrawal
            if (availableBalance < +payload.amount) {
                // Update the transaction status to 'failed'
                await transaction.$query(trx).patchAndFetch({ status: 'failed' });
                await trx.commit();
                throw new HttpError('Insufficient funds!\n You do not have available funds to perform this operation', 400);
            }

            // Update the wallet balance
            const updatedWallet = await wallet
                .$query(trx)
                .patchAndFetch({ balance: raw('balance - :amount', { amount: +payload.amount }) });

            // Update the transaction status to 'success'
            await transaction.$query(trx).patchAndFetch({ status: 'success' });

            await trx.commit(); // Commit the transaction

            // Prepare the account data to be returned
            const account = getAccountData(userInfo, updatedWallet);

            return account; // Return the updated account data
        }
        catch (error: any) {
            await trx.rollback(); // Rollback the transaction in case of error
            throw new HttpError(error.message, 500); // Throw an HttpError with a 400 status code
        }
    };

    // Method to transfer funds between users
    public async transferFunds(userInfo: UserInterface | undefined, payload: TransferDto): Promise<AccountDto> {
        // Check if userInfo is defined, throw an error if not
        if(!userInfo) throw new HttpError('Missing user info in request!', 500);
        const trx = await Wallet.startTransaction(); // Start a transaction
        try {
            // Check if the transfer is to the same account
            if (payload.accountNumber === userInfo.accountNumber)
                throw new HttpError('You cannot transfer to yourself', 400);

            // Get recipient's user and wallet
            const { user: receipient, wallet: receipientWallet } = await this.getUserWallet(payload.accountNumber);

            // Get sender's wallet
            const { wallet } = await this.getUserWallet(userInfo.accountNumber);

            // Insert the sender's transaction record
            const transaction: UserTransaction = await UserTransaction.query(trx).insertAndFetch({
                userId: userInfo.id,
                direction: 'debit',
                type: 'transfer',
                status: 'pending',
                amount: +payload.amount,
            });

            // Insert the recipient's transaction record
            const receipientTransaction: UserTransaction = await UserTransaction.query(trx).insertAndFetch({
                userId: receipient.id,
                direction: 'credit',
                type: 'transfer',
                status: 'pending',
                amount: +payload.amount,
            });

            // Calculate available balance
            const availableBalance = wallet.balance - wallet.loan;

            // Check if available balance is sufficient for transfer
            if (availableBalance < +payload.amount) {
                // Update the transaction status to 'failed'
                await transaction.$query(trx).patchAndFetch({ status: 'failed' });
                await trx.commit();
                throw new HttpError('Insufficient funds! You do not have available funds to perform this operation', 400);
            }

            // Update the sender's wallet balance
            const updatedWallet = await wallet
                .$query(trx)
                .patchAndFetch({ balance: raw('balance - :amount', { amount: +payload.amount }) });

            // Update the recipient's wallet balance
            await receipientWallet.$query(trx).patchAndFetch({ balance: raw('balance + :amount', { amount: +payload.amount }) });

            // Update the transaction statuses to 'success'
            await transaction.$query(trx).patchAndFetch({ status: 'success' });
            await receipientTransaction.$query(trx).patchAndFetch({ status: 'success' });

            // Insert the transaction mapping
            await Transaction.query(trx).insertAndFetch({ sourceTransactionId: transaction.id, destinationTransactionId: receipientTransaction.id });

            await trx.commit(); // Commit the transaction

            // Prepare the account data to be returned
            const account = getAccountData(userInfo, updatedWallet);

            return account; // Return the updated account data
        }
        catch (error: any) {
            await trx.rollback(); // Rollback the transaction in case of error
            throw new HttpError(error.message, 500); // Throw an HttpError with a 500 status code
        }
    };

    // Method to get transactions for a user
    public async getTransactions(userInfo: UserInterface | undefined): Promise<UserTransactionInterface[]> {
        // Check if userInfo is defined, throw an error if not
        if(!userInfo) throw new HttpError('Missing user info in request!', 500);
        // Fetch transactions for the given user ID that are not marked as deleted
        const transactions: UserTransactionInterface[] = await UserTransaction.query()
            .where({ userId: userInfo.id, deleted: false })
            .withGraphFetched({
                transactionSource: { destination: { user: true } }, // Fetch related transaction source data, including destination and user
                transactionDestination: { source: { user: true } }, // Fetch related transaction destination data, including source and user
            });

        // Return the fetched transactions
        return transactions;
    };

    // Private method to get a user's wallet and the associated user by account number
    private async getUserWallet(accountNumber: string): Promise<{ user: User, wallet: Wallet }> {
        // Query the user the account number and ensure the user is not marked as deleted
        const user: User | undefined = await User
            .query()
            .findOne({ accountNumber: accountNumber, deleted: false });

        // If the user is not found, throw an error
        if (!user) {
            throw new HttpError(`Recipient user with account number ${accountNumber} not found`, 404);
        }
        // Query the wallet associated with the user using the user's id and ensure it is not marked as deleted
        const wallet: Wallet | undefined = await Wallet
            .query()
            .findOne({ userId: user.id, deleted: false });

        // If the wallet is not found, throw an error
        if (!wallet) {
            throw new HttpError(`Recipient wallet with account number ${accountNumber} not found`, 404);
        }

        // Return the wallet and user
        return { user, wallet };
    };
};

// Export the TransactionRepo class as the default export
export default TransactionRepo;
