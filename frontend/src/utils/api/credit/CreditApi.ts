import instance from "src/config/axiosConfig";
import { Credit } from "src/models/Credit";

export async function createNewCredit(credit: Credit) {
  console.log("Credit from createnew: ", credit);
  try {
    // Make the POST request
    const response = await instance.post(`/api/credit/`, credit);
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to insert credit data: ${error}`);
  }
}

export async function getAllCreditsByThirdPartyId(thirdPartyId: number) {
  console.log("credits from creditsby: ", thirdPartyId);
  try {
    // Make the GET request
    const response = await instance.get(
      `/api/credit/getCredits?thirdPartyId=${thirdPartyId}`
    );
    console.log("credits : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch credits: ${error}`);
  }
}

export async function updateCredit(credit: Credit) {
  console.log("thirdparty from update: ", credit);
  try {
    // Make the PUT request
    const response = await instance.put(`/api/credit/updateCredit`, credit);
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to update thirdparty: ${error}`);
  }
}
