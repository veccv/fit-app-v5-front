import axios, { AxiosError } from "axios";
import { components } from "@/utils/generated-schema";

export const UpdateData = async <T>(
  requestType: "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: any,
): Promise<T | undefined> => {
  const localUserToken = window.localStorage.getItem("userToken");
  const userToken = JSON.parse(
    localUserToken!,
  ) as components["schemas"]["AuthenticationResponse"];

  try {
    if (requestType === "POST") {
      const response = await axios.post(endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.token,
        },
      });
      return response.data;
    } else if (requestType === "PUT") {
      const response = await axios.put(endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.token,
        },
      });
      return response.data;
    } else if (requestType === "DELETE") {
      const response = await axios.delete(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.token,
        },
      });
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(`Błąd serwera: ${axiosError.response.status}`);
        console.log(
          `Dane: ${JSON.stringify(axiosError.response.data, null, 2)}`,
        );
        console.log(
          `Nagłówki: ${JSON.stringify(axiosError.response.headers, null, 2)}`,
        );
      } else if (axiosError.request) {
        console.log("Brak odpowiedzi od serwera");
      } else {
        console.log(`Błąd podczas konfiguracji żądania: ${axiosError.message}`);
      }
    } else {
      console.log(`Inny błąd: ${error}`);
    }
  }
};
