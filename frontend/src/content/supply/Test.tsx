import { Button } from "@mui/material";
import { ThirdParty } from "src/models/ThirdParty";
import { Case, Credit, DueDate } from "./supplyModels";
import { createMultipleCases, createMultipleCredits, createMultipleDueDates, createMultipleThirdParties } from "src/utils/api/supplyApi";

const Test: React.FC = () => {
 
  async function insertManyThirdpartiesTest() {
    // Create an array of ThirdParty objects
    const thirdParties: ThirdParty[] =[
      {
        "id": 0,
        "thirdPartyId": "string",
        "tiersType": "CUSTOMER_PP",
        "title": "string",
        "lastName": "string",
        "firstName": "string",
        "companyName": "string",
        "birthDate": "2024-05-13",
        "nationality": "string",
        "countryOfResidence": "string",
        "businessSector": "string",
        "legalForm": "string",
        "occupation": "string",
        "personalEmail": "string",
        "businessEmail": "string",
        "privatePhone": "string",
        "businessPhone": "string",
        "landLinePhone": "string",
        "faxNumber": "string",
        "commercialRegister": "string",
        "supportingDocumentType": "CIN",
        "supportingDocumentNumber": "string",
        "supportingDocumentExpirationDate": "2024-05-13",
        "maritalStatus": "string",
        "user": {
          "id": 5
       
        }
      },
    {
        "id": 0,
        "thirdPartyId": "string",
        "tiersType": "CUSTOMER_PP",
        "title": "string",
        "lastName": "string",
        "firstName": "string",
        "companyName": "string",
        "birthDate": "2024-05-13",
        "nationality": "string",
        "countryOfResidence": "string",
        "businessSector": "string",
        "legalForm": "string",
        "occupation": "string",
        "personalEmail": "string",
        "businessEmail": "string",
        "privatePhone": "string",
        "businessPhone": "string",
        "landLinePhone": "string",
        "faxNumber": "string",
        "commercialRegister": "string",
        "supportingDocumentType": "CIN",
        "supportingDocumentNumber": "string",
        "supportingDocumentExpirationDate": "2024-05-13",
        "maritalStatus": "string",
        "user": {
          "id": 5
       
        }
      },
    {
        "id": 0,
        "thirdPartyId": "string",
        "tiersType": "CUSTOMER_PP",
        "title": "string",
        "lastName": "string",
        "firstName": "string",
        "companyName": "string",
        "birthDate": "2024-05-13",
        "nationality": "string",
        "countryOfResidence": "string",
        "businessSector": "string",
        "legalForm": "string",
        "occupation": "string",
        "personalEmail": "string",
        "businessEmail": "string",
        "privatePhone": "string",
        "businessPhone": "string",
        "landLinePhone": "string",
        "faxNumber": "string",
        "commercialRegister": "string",
        "supportingDocumentType": "CIN",
        "supportingDocumentNumber": "string",
        "supportingDocumentExpirationDate": "2024-05-13",
        "maritalStatus": "string",
        "user": {
          "id": 1
       
        }
      }
    ]

    console.log("🚀 ~ insertManyThirdpartiesTest ~ thirdParties:", thirdParties)

    // Call the function to insert multiple third parties
    try {
      const createdThirdParties = await createMultipleThirdParties(
        thirdParties
      );
      console.log("Created third parties 💛💚:", createdThirdParties);
    } catch (error) {
      console.error("Failed to create third parties:", error);
    }
  }
  // 
  async function insertManyCreditsTest() {

    const credits: Credit[] =[
      {
        "id": 0,
        "creditId": "CRD001",
        "creditType": "Personal Loan",
        "nominalAmount": 10000,
        "cumulativeDisbursement": 8000,
        "setupDate": "2023-07-15",
        "firstInstallmentDate": "2023-08-01",
        "nominalRate": 5.5,
        "rateNature": "Fixed",
        "installmentCount": 12,
        "deferredType": "None",
        "restructured": true,
        "restructuringCount": 1,
        "creditStatus": "Active",
        "constantInstallmentAmount": 900,
        "unpaidAmount": 300,
        "insuranceAmount": 50,
        "triggeredInstallmentNumber": 5,
        "openingDate": "2023-07-01",
        "modificationDate": "2024-04-20",
        "lastStatusDate": "2024-05-10",
        "cumulativeRedemptionAmount": 2000,
        "lastRedemptionDate": "2024-05-13",
        "agency": "ABC Bank",
        "manager": "John Doe",
        "contract": {
          "id": 1
        },
        "thirdParty": {
          "id": 5
        }
      },
      {
        "id": 0,
        "creditId": "CRD002",
        "creditType": "Mortgage",
        "nominalAmount": 200000,
        "cumulativeDisbursement": 180000,
        "setupDate": "2022-12-01",
        "firstInstallmentDate": "2023-01-01",
        "nominalRate": 4.25,
        "rateNature": "Variable",
        "installmentCount": 360,
        "deferredType": "Interest-only",
        "restructured": false,
        "restructuringCount": 0,
        "creditStatus": "Active",
        "constantInstallmentAmount": 0,
        "unpaidAmount": 0,
        "insuranceAmount": 100,
        "triggeredInstallmentNumber": 0,
        "openingDate": "2022-11-01",
        "modificationDate": "2023-07-10",
        "lastStatusDate": "2024-05-10",
        "cumulativeRedemptionAmount": 50000,
        "lastRedemptionDate": "2024-05-13",
        "agency": "XYZ Mortgage",
        "manager": "Jane Smith",
        "contract": {
          "id": 1
        },
        "thirdParty": {
          "id": 1
        }
      }
    ];

    console.log("🚀 ~ insertManyThirdpartiesTest ~ credits:", credits)

    // Call the function to insert multiple credits
    try {
      const createdCredits = await createMultipleCredits(
        credits
      );
      console.log("Created credits 💛💚:", createdCredits);
    } catch (error) {
      console.error("Failed to create credits:", error);
    }
  }
  // 
  async function insertManyDueDatesTest() {

    const dueDates: DueDate[] =[
      {
        "id": 0,
        "dueDateId": "DUE001",
        "paymentDueDate": "2024-05-13",
        "dueDateStatus": "Pending",
        "principalAmount": 1000,
        "interestAmount": 50,
        "insuranceAmount": 20,
        "ancillaryCharge": 10,
        "remainingPrincipalBalance": 9000,
        "startDate": "2024-05-13T20:06:58.589Z",
        "modificationDate": "2024-05-13T20:06:58.589Z",
        "totalInstallmentAmount": 1080,
        "latePaymentCharge": 0,
        "unpaidPrincipalAmount": 0,
        "accruedInterest": 0,
        "unpaidInsurancePrenium": 0,
        "unpaidAncillaryCharges": 0,
        "get_case": {
          "id": 70
        
        },
        "credit": {
          "id": 1
     
        }
      },
    {
        "id": 0,
        "dueDateId": "DUE001",
        "paymentDueDate": "2024-05-13",
        "dueDateStatus": "Pending",
        "principalAmount": 1000,
        "interestAmount": 50,
        "insuranceAmount": 20,
        "ancillaryCharge": 10,
        "remainingPrincipalBalance": 9000,
        "startDate": "2024-05-13T20:06:58.589Z",
        "modificationDate": "2024-05-13T20:06:58.589Z",
        "totalInstallmentAmount": 1080,
        "latePaymentCharge": 0,
        "unpaidPrincipalAmount": 0,
        "accruedInterest": 0,
        "unpaidInsurancePrenium": 0,
        "unpaidAncillaryCharges": 0,
        "get_case": {
          "id": 70
        
        },
        "credit": {
          "id": 1
     
        }
      }
    ];

    console.log("🚀 ~ insertManyThirdpartiesTest ~ thirdParties:", dueDates)

    // Call the function to insert multiple third parties
    try {
      const createdDueDates = await createMultipleDueDates(
        dueDates
      );
      console.log("Created dueDates 💛💚:", createdDueDates);
    } catch (error) {
      console.error("Failed to create dueDates:", error);
    }
  }
  // 
  async function insertManyCasesTest() {

    const cases: Case[] =[
      {
        "id": 0,
        "caseId": "CASE0011",
        "status": {
          "id": 1
        
        },
        "procedure": {
          "id": 1
        
        },
        "thirdParty": {
          "id": 1
        },
        "assignedAgent": {
          "id":1 
        
        },
        "startDate": "2024-05-13",
        "principalAmount": 5000,
        "interestAmount": 200,
        "penaltyAmount": 50,
        "totalAmount": 5250,
        "commissionAmount": 300,
        "insuranceSettlementAmount": 0,
        "contributor": {
          "id": 1
        }
      },
    {
        "id": 0,
        "caseId": "CASE0011",
        "status": {
          "id": 1
        
        },
        "procedure": {
          "id": 1
        
        },
        "thirdParty": {
          "id": 1
        },
        "assignedAgent": {
          "id":1 
        
        },
        "startDate": "2024-05-13",
        "principalAmount": 5000,
        "interestAmount": 200,
        "penaltyAmount": 50,
        "totalAmount": 5250,
        "commissionAmount": 300,
        "insuranceSettlementAmount": 0,
        "contributor": {
          "id": 1
        }
      }
    ];

    console.log("🚀 ~ insertManyCasesTest ~ Cases:", cases)

    // Call the function to insert multiple third parties
    try {
      const createdCases = await createMultipleCases(
        cases
      );
      console.log("Created cases 💛💚:", createdCases);
    } catch (error) {
      console.error("Failed to create cases:", error);
    }
  }

  return (
    <div>
      <Button
        onClick={() => {
          insertManyThirdpartiesTest();
        }}
      >
        InsertManyThirdpartiesTest
      </Button>
      <Button
        onClick={() => {
          insertManyCreditsTest();
        }}
      >
        InsertManyCreditsTest
      </Button>
      <Button
        onClick={() => {
          insertManyDueDatesTest();
        }}
      >
        insertManyDueDatesTest
      </Button>
      <Button
        onClick={() => {
          insertManyCasesTest();
        }}
      >
        insertManyCasesTest
      </Button>
    
    </div>
  );
};

export default Test;
