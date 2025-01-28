import axios from "axios";
import { Credentials } from "../types/todo";

export const hostName = "http://localhost:5045";

export const RegisterService = async ({ username, password }: Credentials) => {
    try {
      const result = await axios.post(`${hostName}/api/Auth/register`, {
        username,
        password,
      });
     return result;
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        throw new Error(error?.response?.data || "Network Err");
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };


  export const LoginService = async ({ username, password }: Credentials) => {
    try {
      const result = await axios.post(`${hostName}/api/Auth/login`, {
        username,
        password,
      });
     return result;
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        throw new Error(error?.response?.data || "Network Err");
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };