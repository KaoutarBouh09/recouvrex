export interface MFilters {
    caseId: string,
    status: string,
    firstnameThird: string,
    lastnameThird: string,
    firstnameUser: string,
    lastnameUser: string,
    contractId: string,
    // ADD STATUS USER ACTIVE/INACTIVE
    statusUser?:string
} 