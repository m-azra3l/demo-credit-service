import axios from "axios";
import { 
    ADJUTOR_BASE_URL, 
    ADJUTOR_SECRET_KEY 
} from "../config/envConfig";
import { HttpError } from "../errors/httpError";

export const checkKarmaBlacklist = async (identity: string) => {
  try {
    const response = await axios.get(
      `${ADJUTOR_BASE_URL}/${identity}`,

      {headers: {
        Authorization: `Bearer ${ADJUTOR_SECRET_KEY}`,
      },}
    );

    if (
      response.data.status === "success" &&
      response.data.message &&
      response.data.data
    ) {
      return response.data.message === 'Successful';
    }

    return false;
  } catch (error: any) {
    return new HttpError(error.message, 500);
  }
};
