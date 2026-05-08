import { Case } from "src/models/case";
import { MFilters } from "src/models/mfilters";
import instance from "src/config/axiosConfig";
import { getAuthUser, isAdmin } from "src/auth/authUser";

export async function getFilteredCases(
  caseId: string,
  status: string,
  procedure: string
): Promise<Case[]> {
  try {
    // Make the GET request
    const response = await instance.get<Case[]>(
      `/api/case/filter/${caseId}/status/${status}/procedure/${procedure}`
    );
    console.log(response.data);
    //setCases(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function getFilteredCasesByUser(): Promise<Case[]> {
  try {
    // Make the GET requestr
    let response;
    if (isAdmin()) {
      // this means that the user has the profile id of the idministrator
      response = await instance.get<Case[]>(`/api/case/all/orderByIdDesc`);
    } else {
      response = await instance.get<Case[]>(
        `/api/case/filterOne/?userConnectedId=${getAuthUser()?.id}`
      );
      console.log("🟡🟡getAauthuse.Id : ",getAuthUser()?.id)
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function getFilteredCasesByStatusId(
  statusId: number
): Promise<Case[]> {
  try {
    let response;
    // Make the GET request
    if (isAdmin()) {
      response = await instance.get<Case[]>(
        `/api/case/filterOneArgForAdmin/?statusId=${statusId}`
      );
    } else {
      response = await instance.get<Case[]>(
        `/api/case/filterOne/?userConnectedId=${
          getAuthUser()?.id
        }&statusId=${statusId}`
      );
    }
    console.log(
      "filterd cases by user connected id and status id : ",
      statusId
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function getFilteredCasesByKeyWord(
  keyword: string,
  statusId: number | string
): Promise<Case[]> {
  try {
    if (statusId == 0) {
      statusId = "";
    }

    let response;
    // Make the GET request
    if (isAdmin()) {
      response = await instance.get<Case[]>(
        `/api/case/filterOneArgForAdmin/?searchText=${keyword.trim()}&statusId=${statusId}`
      );
    } else {
      response = await instance.get<Case[]>(
        `/api/case/filterOne/?userConnectedId=${
          getAuthUser()?.id
        }&searchText=${keyword.trim()}&statusId=${statusId}`
      );
    }

    console.log("filterd cases searching key word : ", keyword);
    console.log("----searchCasesByKeyWord");
    console.log(response.data);
    console.log("--------------------");
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    console.log(`filterd cases searching key word : "${keyword.trim()}"`);

    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function getCasesByMultiFilters(
  filters: MFilters
): Promise<Case[]> {
  try {
    let response;
    // Make the GET request
    if (isAdmin()) {
      response = await instance.get<Case[]>(
        // `/api/case/filter/?userConnectedId=${userId}&caseId=${filters.caseId}&status=${filters.status}&firstnameThird=${filters.firstnameThird}&lastnameThird=${filters.lastnameThird}&firstnameUser=${filters.firstnameUser}&lastnameUser=${filters.lastnameUser}&contractId=${filters.contractId}`
        `/api/case/filterForAdmin/?caseId=${
          filters.caseId
        }&status=${filters.status}&firstnameThird=${
          filters.firstnameThird
        }&lastnameThird=${filters.lastnameThird}&firstnameUser=${
          filters.firstnameUser
        }&lastnameUser=${filters.lastnameUser}&userStatus=${filters.statusUser}`
      );
    }else{
      response = await instance.get<Case[]>(
        `/api/case/filter/?userConnectedId=${getAuthUser()?.id}&caseId=${
          filters.caseId
        }&status=${filters.status}&firstnameThird=${
          filters.firstnameThird
        }&lastnameThird=${filters.lastnameThird}&firstnameUser=${
          filters.firstnameUser
        }&lastnameUser=${filters.lastnameUser}&userStatus=${filters.statusUser}`
      );

    }
    

    console.log("filterd cases by many filters ", filters);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

// filter cases by caseId
export async function getFilteredCasesByCaseId(
  // userId: number,
  caseId: string
): Promise<Case[]> {
  try {
    // Make the GET request
    const response = await instance.get<Case[]>(
      `/api/case/filter/?userConnectedId=${getAuthUser()?.id}&caseId=${caseId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function updateCaseUserId(casesId, userIdSelected) {
  console.log("casesId from update: ", casesId);
  try {
    // Make the PUT request
    const response = await instance.put(
      `/api/case/updateCaseUserId?cases=${casesId}&userId=${userIdSelected}`
    );
    console.log(response.data);
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to update thirdparty: ${error}`);
  }
}

export async function GetNumberOfCasesForUser(): Promise<number> {
  try {
    // Make the GET request
    console.log("🟡🟡auth id user : ", getAuthUser()?.id);
    const response = await instance.get(`/api/case/count/${getAuthUser()?.id}`);
    console.log("number of cases : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function caseAmountTotalByStatus(status: string): Promise<number> {
  try {
    // Make the GET request
    const response = await instance.get(
      `/api/case/caseAmountTotalByStatus?status=${status}&userId=${
        getAuthUser()?.id
      }`
    );
    console.log("caseAmountTotalByStatus : ", response.data);
    return response.data;
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
