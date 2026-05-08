import instance from "src/config/axiosConfig";
import { Case, Credit, DueDate } from "src/content/supply/supplyModels";
import { ThirdParty } from "src/models/ThirdParty";

export async function createMultipleThirdParties(thirdParties: ThirdParty[]) {
  try {
    const response = await instance.post(`/api/thirdparty/multiple`, thirdParties);
    console.log("response.data from createMultipleThirdParties");
    console.log(response.data);
    return response.data; // Optionally return the created third parties
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to insert third parties: ${error}`);
  }
}

export async function createMultipleCases(cases: Case[]) {
  try {
    const response = await instance.post(`/api/case/multiple`, cases);
    console.log("response.data from createMultipleCases");
    console.log(response.data);
    return response.data; // Optionally return the created cases
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to insert cases: ${error}`);
  }
}

export async function createMultipleCredits(credits: Credit[]) {
  try {
    const response = await instance.post(`/api/credit/multiple`, credits);
    console.log("response.data from createMultipleCredits");
    console.log(response.data);
    return response.data; // Optionally return the created credits
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to insert credits: ${error}`);
  }
}

export async function createMultipleDueDates(dueDates: DueDate[]) {
  try {
    const response = await instance.post(`/api/dueDate/multiple`, dueDates);
    console.log("response.data from createMultipleDueDates");
    console.log(response.data);
    return response.data; // Optionally return the created due dates
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to insert due dates: ${error}`);
  }
}
