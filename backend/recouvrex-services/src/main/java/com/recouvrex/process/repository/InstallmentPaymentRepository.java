package com.recouvrex.process.repository;

import com.recouvrex.process.model.InstallmentPayment;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InstallmentPaymentRepository extends JpaRepository<InstallmentPayment, Long> {

    // Toutes les échéances d'un accord
    List<InstallmentPayment> findByAgreementIdOrderByInstallmentNumber(Long agreementId);

    // Échéances impayées
    List<InstallmentPayment> findByStatusAndDueDateBefore(PaymentStatusEnum status, LocalDate date);

    // Échéances dont le rappel doit être envoyé (3 jours avant)
    @Query("SELECT ip FROM InstallmentPayment ip WHERE ip.status = 'PENDING' AND ip.reminderSent = false AND ip.dueDate <= :date")
    List<InstallmentPayment> findInstallmentsNeedingReminder(LocalDate date);

    // Prochaine échéance d'un accord
    InstallmentPayment findFirstByAgreementIdAndStatusOrderByDueDateAsc(Long agreementId, PaymentStatusEnum status);

    @Query("SELECT i FROM InstallmentPayment i " +
         "WHERE i.agreement.initiator.id = :userId " +
         "AND i.status = 'EN_ATTENTE' " +
         "AND i.dueDate BETWEEN :today AND :limitDate " +
         "ORDER BY i.dueDate ASC")
    List<InstallmentPayment> findUpcomingInstallmentsByUser(
         @Param("userId") Long userId,
         @Param("today") LocalDate today,
         @Param("limitDate") LocalDate limitDate
    );

    @Query("SELECT i FROM InstallmentPayment i " +
         "WHERE i.status = 'EN_ATTENTE' " +
         "AND i.reminderSent = false " +
         "AND i.dueDate BETWEEN :today AND :limitDate " +
         "ORDER BY i.dueDate ASC")
    List<InstallmentPayment> findUpcomingInstallmentsForReminder(
         @Param("today") LocalDate today,
         @Param("limitDate") LocalDate limitDate
    );

    List<InstallmentPayment> findByAgreementCase1Id(Long caseId);

    // ── NOUVEAU : Échéances en retard pour déclenchement chatbot ──
    // ── NOUVEAU : Échéances en retard pour déclenchement chatbot ──
    @Query("SELECT i FROM InstallmentPayment i " +
         "WHERE i.status = 'EN_ATTENTE' " +
         "AND i.dueDate <= :limitDate")
     List<InstallmentPayment> findOverdueInstallmentsForChatbot(
         @Param("limitDate") LocalDate limitDate
  );
    void deleteByAgreementId(Long agreementId);
}