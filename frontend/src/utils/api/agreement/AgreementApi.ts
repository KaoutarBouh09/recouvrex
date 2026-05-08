import instance from "src/config/axiosConfig";
import { Agreement } from "src/models/Agreement";
import { AgreementStatusTypesEnum } from "src/models/enums/agreementEnums/AgreementStatusTypesEnum";

export async function createNewAgreement(agreement: Agreement) {
    console.log("agreement from createnew: ", agreement);
    try {
      // Make the POST request
      const response = await instance.post(`/api/agreement/`, agreement);
      console.log(response.data);
    } catch (error) {
      // Handle errors here if needed
      throw new Error(`Failed to insert agreement data: ${error}`);
    }
  }
  export async function getAgreements(managerId:number|undefined , caseId:any,agreementStatus:any){
    console.log("😆agreement statys : ",agreementStatus)
          try {
            if(agreementStatus==null&&caseId!=null){
              const response = await instance.get(`/api/agreement/getAgreements?managerId=${managerId}&caseId=${caseId}`)
              console.log("🟢 Get agreements 1 : ",response.data )
              return response
            }else if(agreementStatus==null && caseId==null){
              const response = await instance.get(`/api/agreement/getAgreements?managerId=${managerId}`)
              console.log("🟢 Get agreements 2 : ",response.data )
              return response
            }else{
              const response = await instance.get(`/api/agreement/getAgreements?managerId=${managerId}&caseId=${caseId}&agreementStatus=${agreementStatus}`)
              console.log("🟢 Get agreements 3 : ",response.data )
              return response
            }
       
          } catch (error) {
             console.log( "🚨",error)
          }

  }

  export async function updateAgreement(agreement: Agreement) {
    console.log("agreement from update: ", agreement);
    try {
      // Make the PUT request
      const response = await instance.put(
        `/api/agreement/updateAgreement`,
        agreement
      );
      console.log(response.data);
      return response;
    } catch (error) {
      // Handle errors here if needed
      throw new Error(`Failed to update agreement: ${error}`);
    }
  }