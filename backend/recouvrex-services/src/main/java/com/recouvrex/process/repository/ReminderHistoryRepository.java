package com.recouvrex.process.repository;

import com.recouvrex.process.model.ReminderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReminderHistoryRepository extends JpaRepository<ReminderHistory, Long> {

    List<ReminderHistory> findByInstallmentIdOrderBySentAtDesc(Long installmentId);

    List<ReminderHistory> findByInstallment_Agreement_Case1_ThirdParty_IdOrderBySentAtDesc(Long thirdPartyId);
    
    List<ReminderHistory> findByInstallment_Agreement_Case1Id(Long caseId);
}