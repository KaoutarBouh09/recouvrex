import  { AxiosError } from "axios";
import { getAuthUser } from "src/auth/authUser";
import instance from "src/config/axiosConfig";
import { Task } from "src/models/task";

export async function getTasksByCaseId(caseId: number): Promise<Task[]> {
  try {
    // Make the GET request
    const response = await instance.get<Task[]>(`/api/task/${caseId}`);
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export const createNewTask = async (
  caseId: number,
  newTaskData: Task
): Promise<Task | null> => {
  try {
    const response = await instance.post<Task>(
      `/api/Task?caseId=${caseId}`,
      newTaskData
    );
    console.log("fetched tasked .....");
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating new task:", error);
    return null;
  }
};

export const updateTask = async (
  taskId: number,
  taskToUpdate: Task
): Promise<Task | null> => {
  try {
    const response = await instance.put<Task>(
      `/api/task/${taskId}`,
      taskToUpdate
    );
    console.log("updated task .....");
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task with id :",taskId, error);
    return null;
  }
};

export const deleteTasks = async (ids: readonly number[]) => {
  try {
    console.log("tasks ids to delete", ids);
    const response = await instance.delete(`/api/tasks`, { data: ids });
    console.log(`Tasks deleted successfully: Status ${response.status}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
      );
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", axiosError.message);
    }
  }

};

export async function getTasksByUserId(): Promise<Task[]> {
  try {
    // Make the GET request
    const response = await instance.get<Task[]>(`/api/task/newTasks?userId=${getAuthUser()?.id}`);
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
