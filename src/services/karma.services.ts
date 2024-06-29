// Import axios for making HTTP requests
import axios from "axios";

// Import environment variables for the base URL and secret key
import { 
    ADJUTOR_BASE_URL,  // Base URL for the Adjutor service
    ADJUTOR_SECRET_KEY // Secret key for authenticating with the Adjutor service
} from "../config/envConfig";

// Import custom HttpError for error handling
import { HttpError } from "../errors/httpError";

// Function to check if a user is blacklisted based on their identity
export const checkKarmaBlacklist = async (identity: string) => {
  try {
    // Make a GET request to the Adjutor service with the provided identity
    const response = await axios.get(
      `${ADJUTOR_BASE_URL}/${identity}`,
      {
        headers: {
          Authorization: `Bearer ${ADJUTOR_SECRET_KEY}`, // Include the secret key in the authorization header
        },
      }
    );

    // Check if the response indicates a successful status and contains the necessary data
    if (
      response.data.status === "success" &&
      response.data.message &&
      response.data.data
    ) {
      // Return true if the response message is 'Successful'
      return response.data.message === 'Successful';
    }

    // Return false if the response does not meet the success criteria
    return false;
  } catch (error: any) {
    // Return a new HttpError with the error message and a 500 status code
    return new HttpError(error.message, 500);
  }
};