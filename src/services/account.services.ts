// Import the AccountDto interface to define the shape of the account data
import { AccountDto } from "../dtos/account.dto";

// Import the UserInterface to type the user object
import { UserInterface } from "../interfaces/user.interface";

// Import the WalletInterface to type the wallet object
import { WalletInterface } from "../interfaces/wallet.interface";

// Function to prepare and return the account data
export const getAccountData = (userInfo: UserInterface, wallet: WalletInterface): AccountDto => {
    return {
        id: userInfo.id,                        // User ID
        name: userInfo.name,                    // User name
        accountNumber: userInfo.accountNumber,  // User account number
        email: userInfo.email,                  // User email
        balance: wallet.balance,                // Wallet balance
        loan: wallet.loan,                      // Wallet loan
        available: wallet.balance - wallet.loan // Available balance (balance minus loan)
    };
};
