import { apiInstance } from "@/shared/api/apiAxios";
import useSWR from "swr";

const fetcher = (url: string) => apiInstance.get(url).then((res) => res.data);

export default function useUser() {
  const { data, mutate, error, isLoading } = useSWR("/books?_quantity=2", fetcher);

  return {
    isLoading,
    error,
    user: data,
    mutate,
  };
}
