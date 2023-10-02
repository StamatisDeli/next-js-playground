import axios from "axios";
import useSWR from "swr";
import { UserType } from "../../types";

/**
 * https://reqres.in/api/users
 */
export const usersUrl = "https://jsonplaceholder.typicode.com/posts";
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

export function useGetRobot(id: number) {
  const { data, error, isLoading } = useSWR(`/api/robot/${id}`, axiosFetcher);

  return {
    robot: data,
    isLoading,
    error,
  };
}
export function useGetRobots() {
  const { data, error, isLoading } = useSWR("/api/robot/", axiosFetcher);

  return {
    robots: data,
    isLoading,
    error,
  };
}
export const fetchRobot = async (id: any) => {
  const { data } = await axios.get(`/api/robot/${id}`);

  return data;
};
export const createRobot = async (robotData: Partial<UserType>) => {
  const { data } = await axios.post("/api/robot/", robotData);

  return data;
};
export const deleteRobot = async (id: number) => {
  const { data } = await axios.delete(`/api/robot/${id}`);

  return data;
};
