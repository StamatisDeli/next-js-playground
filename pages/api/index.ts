import axios from "axios";
import useSWR from "swr";
import { UserType } from "../../types";

/**
 * https://reqres.in/api/users
 */
export const usersUrl = "'https://jsonplaceholder.typicode.com/posts";
export const MOCK_API_URL =
  "https://627ec72cb75a25d3f3bd0acb.mockapi.io/api/users";

export const R_M_URL = "https://rickandmortyapi.com/api/character";

export const axiosFetcher = async (url: string) => {
  const { data } = await axios.get(url);

  return data;
};

export const createUser = async (url: string, userData: Partial<UserType>) => {
  const { data } = await axios.post(url, userData);

  return data;
};

export function useGetUsers() {
  const { data, error, isLoading } = useSWR(MOCK_API_URL, axiosFetcher);

  return {
    users: data,
    isLoading,
    error,
  };
}

export function useGetRnMCharacters() {
  const { data, error, isLoading } = useSWR(R_M_URL, axiosFetcher);

  return {
    characters: data?.results,
    isLoading,
    error,
  };
}
