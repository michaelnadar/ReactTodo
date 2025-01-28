import axios from "axios";
import { ToDoList } from "../types/todo";
import { hostName } from "./AuthService";
import { authHeader } from "../helpers/authHeader";



export const CreateTodo = async (todo:ToDoList)=>{
    try {
        console.log(todo)
        const response = await axios.post(`${hostName}/api/Todo`, todo, {
          headers: authHeader(),
        });
        return response;  // Return response data
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Failed to create ToDo");
        } else {
          throw new Error("An unexpected error occurred");
        }
      }
}

export const GetTodo = async ()=>{
  try {
     
      const response = await axios.get(`${hostName}/api/Todo/todolists`, {
        headers: authHeader(),
      });
      return response;  // Return response data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch ToDo");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
}

export const UpdateTodo = async (todo:ToDoList)=>{
  try {

      const response = await axios.put(`${hostName}/api/Todo/${todo.id}`, todo,{
        headers: authHeader(),
      });
      return response;  // Return response data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to Update ToDo");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
}


export const DeleteTodo = async (id:number)=>{
  try {

      const response = await axios.delete(`${hostName}/api/Todo/delete/${id}`,{
        headers: authHeader(),
      });
      return response;  // Return response data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to delete ToDo");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
}





  