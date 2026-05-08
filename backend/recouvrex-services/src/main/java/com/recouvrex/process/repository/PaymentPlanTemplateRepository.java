package com.recouvrex.process.repository;

import com.recouvrex.process.model.PaymentPlanTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentPlanTemplateRepository extends JpaRepository<PaymentPlanTemplate, Long> {
    
    List<PaymentPlanTemplate> findByIsActiveTrue();
    
    Optional<PaymentPlanTemplate> findByTemplateNameAndIsActiveTrue(String templateName);
}