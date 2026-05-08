import { AgreementStatusTypesEnum } from "./enums/agreementEnums/AgreementStatusTypesEnum";
import { AgreementTypesEnum } from "./enums/agreementEnums/AgreementTypesEnum";

export interface Agreement {
    id:number
    agreementId: string;
    agreementDate: string;
    agreementStatus: AgreementStatusTypesEnum | string;
    agreementType: AgreementTypesEnum | string;
    agreementStartDate: string;
    agreementValidityDate?: string;
    initiator: any; // Assuming User is another interface representing the initiator
    validator: any; // Assuming User is another interface representing the validator
    agreementDescription: string;
    case1:any
    dueDates:any[]
}
