package com.recouvrex.process.service;

import com.recouvrex.process.model.Agreement;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;

import java.util.List;

public interface AgreementService {

    Agreement create(Agreement agreement);
    List<Agreement> getAgreements(Long managerId, Long caseId,AgreementStatusTypesEnum agreementStatus);

    Agreement updateAgreement(Agreement agreement);
}
