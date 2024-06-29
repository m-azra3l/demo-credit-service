// Import bcrypt functions for password hashing and comparison
import { hashSync, compareSync } from 'bcrypt';

// Import SALT_ROUNDS from the environment configuration
import { SALT_ROUNDS } from '../../config/envConfig';

// Import custom HttpError for error handling
import { HttpError } from '../../errors/httpError';

// Import TokenData,UserInterface and WalletInterface for type definitions
import { TokenData } from '../../interfaces/auth.interface';
import { UserInterface } from '../../interfaces/user.interface';
import { WalletInterface } from '../../interfaces/wallet.interface';

// Import User and Wallet models for database operations
import { User } from '../../models/user.model';
import { Wallet } from '../../models/wallet.model';

// Import function to create JWT
import { createJwt } from '../../utils/jwt';

// Import DTOs for sign-up and sign-in
import { SignUpDto, SignInDto } from '../../dtos/auth.dto';

// Import DTO for account response
import { AccountDto } from '../../dtos/account.dto';

// Import service to check karma blacklist and get user account data
import { checkKarmaBlacklist } from '../../services/karma.services';
import { getAccountData } from '../../services/account.services';

// Repository for authentication 
class AuthRepo {
    // Method to handle user sign-up
    public async signup(userData: SignUpDto): Promise<void> {
        // Validate input data
        if (!userData) throw new HttpError('Please provide required information', 400);

        // Check if the user already exists
        const checkUser: UserInterface | undefined = await User
            .query()
            .select()
            .from('users')
            .where({ email: userData.email, deleted: false })
            .first();
        if (checkUser) throw new HttpError(`User with email ${userData.email} already exists`, 409);

        // Check if the user is blacklisted
        const checkKarma = await checkKarmaBlacklist(userData.email);
        if (checkKarma) throw new HttpError(`User with email ${userData.email} is blacklisted`, 403);

        // Generate account number for the user
        const accountNumber = this.generateAccountNumber();
        // Insert new user and hash the password
        const user: UserInterface = await User
            .query()
            .insert({
                ...userData,
                accountNumber,
                password: hashSync(userData.password, Number(SALT_ROUNDS))
            });

        // If the user creation fails, throw an error
        if (!user) throw new HttpError('Unknown error occured', 500);

        // Create a wallet for the new user
        const wallet: WalletInterface = await Wallet.query().insert({
            userId: user.id,
            balance: 0, // Initialize with a balance of 0
            loan: 0,    // Initialize with a loan of 0
        });

        // If the wallet creation fails, throw an error
        if (!wallet) throw new HttpError('Unknown error occurred', 500);
    };

    // Method to handle user login
    public async signin(userData: SignInDto): Promise<{
        token: TokenData;
        user: AccountDto
    }> {
        // Validate input data
        if (!userData) throw new HttpError('Please provide required information', 400);

        // Find the user by email
        const userInfo: UserInterface | undefined = await User
            .query()
            .select()
            .from('users')
            .where({ email: userData.email, deleted: false })
            .first();

        // Validate user and password
        if (!userInfo || !userInfo.password || !compareSync(userData.password, userInfo.password)) {
            throw new HttpError('Invalid credentials', 409);
        }

        // Find the user's wallet
        const wallet: WalletInterface | undefined = await Wallet
            .query()
            .select()
            .from('wallets')
            .where({ userId: userInfo.id, deleted: false })
            .first();

        // If the wallet is not found, throw an error
        if (!wallet) throw new HttpError('Wallet not found', 404);

        // Create a JWT for the user
        const token = await createJwt(userInfo);

        // Prepare the user data to be returned
        const user = getAccountData(userInfo, wallet);

        return { token, user }; // Return the token and user data
    };


    // Function to generate a unique account number
    private generateAccountNumber(): string {
        const timestamp = Date.now().toString();
        return timestamp.slice(-10); // Get the last 10 digits of the timestamp
    }
};

// Export the AuthRepo class as the default export
export default AuthRepo;
