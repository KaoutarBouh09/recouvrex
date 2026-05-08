package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.Agreement;
import com.recouvrex.process.model.Credit;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import com.recouvrex.process.repository.AgreementRepository;
import com.recouvrex.process.service.AgreementService;
import com.recouvrex.process.utils.IdentificationTool;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AgreementServiceImpl implements AgreementService {
    @Autowired
    AgreementRepository agreementRepository;

    @Override
    public Agreement create(Agreement agreement) {
          agreement.setAgreementId(IdentificationTool.generateAgreementId());
       return agreementRepository.save(agreement);
    }

    @Override
    public List<Agreement> getAgreements(Long managerId,Long caseId,AgreementStatusTypesEnum agreementStatus) {
        return agreementRepository.getAgreements(managerId ,caseId,agreementStatus);
    }

    @Override
    public Agreement updateAgreement(Agreement agreement) {
         Agreement exestingAgreement = agreementRepository.findById(agreement.getId()).orElseThrow();
        BeanUtils.copyProperties(agreement, exestingAgreement, "id","agreementId");
        return agreementRepository.save(exestingAgreement);
    }

}
