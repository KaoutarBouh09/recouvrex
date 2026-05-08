// thirdparty already done

//DueDate
const facture = [
  {
    id: 0,
    dueDateId: "string",
    paymentDueDate: "2024-05-13",
    dueDateStatus: "string",
    principalAmount: 0,
    interestAmount: 0,
    insuranceAmount: 0,
    ancillaryCharge: 0,
    remainingPrincipalBalance: 0,
    startDate: "2024-05-13T20:06:58.589Z",
    modificationDate: "2024-05-13T20:06:58.589Z",
    totalInstallmentAmount: 0,
    latePaymentCharge: 0,
    unpaidPrincipalAmount: 0,
    accruedInterest: 0,
    unpaidInsurancePrenium: 0,
    unpaidAncillaryCharges: 0,
    get_case: {
      id: 0,
    },
    credit: {
      id: 0,
    },
  },
];

// ===========================
const factureworked = [
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
]


// -----------------------------
const credit = [
  {
    id: 0,
    creditId: "string",
    creditType: "string",
    nominalAmount: 0,
    cumulativeDisbursement: 0,
    setupDate: "string",
    firstInstallmentDate: "string",
    nominalRate: 0,
    rateNature: "string",
    installmentCount: 0,
    deferredType: "string",
    restructured: true,
    restructuringCount: 0,
    creditStatus: "string",
    constantInstallmentAmount: 0,
    unpaidAmount: 0,
    insuranceAmount: 0,
    triggeredInstallmentNumber: 0,
    openingDate: "string",
    modificationDate: "string",
    lastStatusDate: "string",
    cumulativeRedemptionAmount: 0,
    lastRedemptionDate: "2024-05-13",
    agency: "string",
    manager: "string",
    contract: {
      id: 0,  
    },
    thirdParty: {
      id: 0,
    },
  },
];
// ---------
const Cases[]=[
    {
      "id": 0,
      "caseId": "string",
      "status": {
        "id": 0,
      },
      "procedure": {
        "id": 0,
      },
      "thirdParty": {
        "id": 0,  
      },
      "assignedAgent": {
        "id": 0,
      },
      "startDate": "2024-05-13",
      "principalAmount": 0,
      "interestAmount": 0,
      "penaltyAmount": 0,
      "totalAmount": 0,
      "commissionAmount": 0,
      "insuranceSettlementAmount": 0,
      "contributor": {
        "id": 0
      }
    }
  ]


 const casesWorked[]=[
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
]
// ---------------------------

// this worked for credites
  const creditWorked[]=[
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
  ]
  