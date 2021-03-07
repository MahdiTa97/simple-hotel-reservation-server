import { useQuery } from "react-query";
import client from "../utils/api-client";

export default function useHotels() {
  return useQuery("hotels", async () => {
    const { responseData } = await client.get(`/gethotels`);
    return responseData;
  });
}
