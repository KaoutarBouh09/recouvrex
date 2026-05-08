package com.recouvrex.process.repository;

import com.recouvrex.process.model.AgreementValidation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgreementValidationRepository extends JpaRepository<AgreementValidation, Long> {
    
    List<AgreementValidation> findByAgreementIdOrderByActionDateDesc(Long agreementId);
}