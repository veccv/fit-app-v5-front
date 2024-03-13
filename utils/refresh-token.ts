import axios from "axios";
import { components } from "@/utils/generated-schema";

export const RefreshToken = async (
  token: components["schemas"]["AuthenticationResponse"],
): Promise<components["schemas"]["AuthenticationResponse"]> => {
  try {
    const response = await axios.get("/api/api/v1/auth/refresh", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
