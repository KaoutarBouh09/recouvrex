package com.recouvrex.process.repository;

import com.recouvrex.process.model.Agreement;
import com.recouvrex.process.model.Credit;
import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface   AgreementRepository extends JpaRepository<Agreement, Long> {


    @Query("SELECT a FROM Agreement a WHERE (a.validator.id = :managerId OR a.initiator.id = :managerId)"+
            " AND (:caseId IS NULL OR a.case1.id = :caseId)"+
            " AND (:agreementStatus IS NULL OR a.agreementStatus = :agreementStatus)")
    List<Agreement> getAgreements(@Param("managerId") Long managerId,
                                  @Param("caseId") Long caseId,
                                  @Param("agreementStatus") AgreementStatusTypesEnum agreementStatus);
    // Tous les accords d'un cas
    List<Agreement> findByCase1Id(Long caseId);
    
    // Accords par statut
    List<Agreement> findByAgreementStatus(AgreementStatusTypesEnum status);
    
    // Accords créés par un agent
    List<Agreement> findByInitiatorId(Long initiatorId);
    
    // Accords en attente de validation
    @Query("SELECT a FROM Agreement a WHERE a.agreementStatus = 'EN_ATTENTE' AND a.initiator.manager.id = :managerId")
    List<Agreement> findPendingAgreementsByManager(@Param("managerId") Long managerId);
    
    // Accords validés par un responsable
    List<Agreement> findByValidatorId(Long validatorId);
    
    // Accords actifs (validated)
    List<Agreement> findByAgreementStatusAndCase1ThirdPartyId(AgreementStatusTypesEnum status, Long thirdPartyId);

}
