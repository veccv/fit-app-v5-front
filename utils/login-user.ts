import axios from "axios";
import { components } from "@/utils/generated-schema";

export const loginUser = async (
  loginRequest: components["schemas"]["AuthenticationRequest"],
): Promise<components["schemas"]["AuthenticationResponse"]> => {
  try {
    const response = await axios.post(
      `/api/api/v1/auth/authenticate`,
      loginRequest,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
