import axios from "axios";
import { components } from "@/utils/generated-schema";

export const registerUser = async (
  loginRequest: components["schemas"]["RegisterRequest"],
): Promise<components["schemas"]["AuthenticationResponse"]> => {
  try {
    const response = await axios.post(
      `/api/api/v1/auth/register`,
      loginRequest,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
