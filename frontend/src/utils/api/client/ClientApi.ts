import { ThirdParty } from "src/models/ThirdParty";
import { ThirdPartyFiltres } from "src/models/ThirdPartyFiltres";
import instance from "src/config/axiosConfig";
import { getAuthUser } from "src/auth/authUser";

export async function createNewClient(thirdParty: ThirdParty) {
  console.log("thirdparty from createnew: ", thirdParty);
  try {
    // Make the POST request
    const response = await instance.post(`/api/thirdparty/`, thirdParty);
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to insert thirdparty data: ${error}`);
  }
}

export async function getAllClientsByUserId() {
  console.log("dueDate from allcleint: ", getAuthUser()?.id);
  try {
    // Make the GET request
    const response = await instance.get(
      `/api/thirdparty/getAllThirdParty?userId=${getAuthUser()?.id}`
    );
    console.log("thirdparties : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch thirdparties: ${error}`);
  }
}

export async function updateClient(thirdParty: ThirdParty) {
  console.log("thirdparty from update: ", thirdParty);
  try {
    // Make the PUT request
    const response = await instance.put(
      `/api/thirdparty/updateThirdParty`,
      thirdParty
    );
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to update thirdparty: ${error}`);
  }
}

export async function getThirdPartyByMultiFilters(
  filters: ThirdPartyFiltres
): Promise<ThirdParty[]> {
  try {
    // Make the GET request
    const response = await instance.get<ThirdParty[]>(
      `/api/thirdparty/filter/?userConnectedId=${getAuthUser()?.id}&thirdPartyId=${filters.thirdPartyId}&clientType=${filters.clientType}&firstnameThird=${filters.firstnameThird}&lastnameThird=${filters.lastnameThird}&personalEmail=${filters.personalEmail}&professionalEmail=${filters.professionalEmail}&companyName=${filters.companyName}`
    );

    console.log("filterd thirdparty by many filters ", filters);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function filterThirdPartyUsingOneArg(
  searchKeyWord: string
): Promise<ThirdParty[]> {
  try {
    // Make the GET request
    const response = await instance.get<ThirdParty[]>(
      `/api/thirdparty/filter/oneArg?userConnectedId=${getAuthUser()?.id}&searchKeyWord=${searchKeyWord}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}



export async function sendEmailToClient(to:string, subject:string, body:string) {
  try {
    // Make the POST request with data object
    const response = await instance.post(`/api/notification/sendEmail?to=${to}&subject=${subject}&body=${body}`
    );
    console.log("Email: ", response.data);
    //return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to send email: ${error}`);
  }
}

export async function countNbrThirdPartyByUser() {
  console.log("userId dash :  ", getAuthUser()?.id);
  try {
    // Make the GET request
    const response = await instance.get(
      `/api/thirdparty/countNbrThirdParty?userId=${getAuthUser()?.id}`
    );
    console.log("nbr thirdparties : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch nbr thirdparties: ${error}`);
  }
}
