import axios from "axios";
import { components } from "@/utils/generated-schema";

export const RefreshToken = async (
  token: components["schemas"]["AuthenticationResponse"],
): Promise<components["schemas"]["AuthenticationResponse"] | undefined> => {
  try {
    const response = await axios.get("/api/api/v1/auth/refresh", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    return response.data;
  } catch (error) {
    window.localStorage.removeItem("userToken");
    window.localStorage.removeItem("tokenGetTime");
    console.error(error);
    window.location.href = "/";
  }
};
