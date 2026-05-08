import instance from "src/config/axiosConfig";
import { DueDate } from "src/models/DueDate";
export async function createNewDueDate(dueDate: DueDate) {
  console.log("dueDate from createNewDueDate: ", dueDate);
  try {
    // Make the POST request
    const response = await instance.post(`/api/dueDate/`, dueDate);
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function getDueDatesByCaseId(id: number) {
  console.log("dueDate from createNewDueDate: ", id);
  try {
    // Make the POST request
    const response = await instance.get(
      `/api/dueDate/getDueDates?caseId=${id}`
    );
    console.log("DueDates : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch dueDatesByCaseId: ${error}`);
  }
}
export async function deleteDueDateById(id: number) {
  console.log("dueDate from delete: ", id);
  try {
    // Make the POST request
    const response = await instance.delete(`/api/dueDate/deleteDueDate/${id}`);
    console.log("DueDates : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to delete dueDate : ${error}`);
  }
}
export async function updateDueDate(dueDate: DueDate) {
  console.log("dueDate from createNewDueDate: ", dueDate);
  try {
    // Make the POST request
    const response = await instance.put(`/api/dueDate/updateDueDate`, dueDate);
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(` Failed to update dueDate: ${error}`);
  }
}

export async function getDueDatesByCaseIdAndDueDateId(
  caseId: number,
  dueDateId: string
) {
  console.log("dueDate from createNewDueDate: ", caseId);
  try {
    // Make the POST request
    const response = await instance.get(
      `/api/dueDate/getDueDateInfo?caseId=${caseId}&dueDateId=${dueDateId}`
    );
    console.log("DueDate : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch dueDatesByCaseIdAndDueDateId: ${error}`);
  }
}


export async function getDueDatesByCreditId(creditId: number) {
  console.log("dueDate by creditid from createNewDueDate: ", creditId);
  try {
    // Make the POST request
    const response = await instance.get(
      `/api/dueDate/getDueDatesByCredit?creditId=${creditId}`
    );
    console.log("DueDates : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch dueDatesByCreditId: ${error}`);
  }
}

export async function getDueDateById(duaDateId: number) {
  console.log("dueDate by id from createNewDueDate: ", duaDateId);
  try {
    // Make the POST request
    const response = await instance.get(
      `/api/dueDate/getDueDateById?dueDateId=${duaDateId}`
    );
    console.log("DueDate : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch dueDatesByID: ${error}`);
  }
}


export async function updateExpectedPaymentDate(dueDateId:number,paymentDate:string) {
  try {
    // Make the POST request
    const response = await instance.put(`/api/dueDate/updateExpectedPaymentDate?dueDateId=${dueDateId}&expectedPaymentDate=${paymentDate}`);
   // console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to update dueDatePaymentDate: ${error}`);
  }
}
