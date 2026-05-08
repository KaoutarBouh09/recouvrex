import { getAuthUser, isAdmin } from "src/auth/authUser";
import instance from "src/config/axiosConfig";

export async function getStatuses() {
  try {
    let response;
    // Make the GET request
    if (isAdmin()) {
      response = await instance.get(`/api/Status/countStatus`);
    }else{
      response = await instance.get(`/api/Status/countStatus/${getAuthUser()?.id}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return []; // Return an empty array in case of error
  }
}
