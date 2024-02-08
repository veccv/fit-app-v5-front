import axios from "axios";
import { components } from "@/utils/generated-schema";

const registerUser = async (
  loginRequest: components["schemas"]["RegisterRequest"],
) => {
  try {
    const response = await axios.post(
      `/api/api/v1/auth/register`,
      loginRequest,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
