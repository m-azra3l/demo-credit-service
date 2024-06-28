// Import bcrypt functions for password hashing and comparison
import { hashSync, compareSync } from 'bcrypt';

// Import SALT_ROUNDS from the environment configuration
import { SALT_ROUNDS } from '../../config/envConfig';

// Import custom HttpError for error handling
import { HttpError } from '../../errors/httpError';

// Import TokenData and UserInterface for type definitions
import { TokenData } from '../../interfaces/auth.interface';
import { UserInterface } from '../../interfaces/user.interface';

// Import User model for database operations
import { User } from '../../models/user.model';

// Import function to create JWT
import { createJwt } from '../../utils/jwt';

// Import DTOs for sign-up and sign-in
import { SignUpDto, SignInDto } from '../../dtos/auth.dto';

// Import service to check karma blacklist
import { checkKarmaBlacklist } from '../../services/karma.services';

class AuthRepo {
    // Method to handle user sign-up
    public async signup(userData: SignUpDto): Promise<UserInterface> {
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

        // Insert new user and hash the password
        const user: UserInterface = await User
            .query()
            .insertAndFetch({
                ...userData,
                password: hashSync(userData.password, Number(SALT_ROUNDS))
            });
        
        return user; // Return the newly created user
    }

    // Method to handle user login
    public async signin(userData: SignInDto): Promise<{ token: TokenData; user: UserInterface }> {
        // Validate input data
        if (!userData) throw new HttpError('Please provide required information', 400);

        // Find the user by email
        const user: UserInterface | undefined = await User
            .query()
            .select()
            .from('users')
            .where({ email: userData.email, deleted: false })
            .first();

        // Validate user and password
        if (!user || !user.password || !compareSync(userData.password, user.password)) {
            throw new HttpError('Invalid credentials', 409);
        }

        // Create a JWT for the user
        const token = await createJwt(user);

        return { token, user }; // Return the token and user data
    }
}

export default AuthRepo;
