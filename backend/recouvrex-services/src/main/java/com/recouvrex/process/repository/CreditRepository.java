package com.recouvrex.process.repository;

import com.recouvrex.process.model.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface CreditRepository extends JpaRepository<Credit, Long>, JpaSpecificationExecutor<Credit> {

    // 1️⃣ Récupérer le dernier ID de crédit
    @Query(value = "SELECT id FROM credit ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Long getLastCreditId();

    // 2️⃣ Récupérer tous les crédits d'un tiers
    @Query("SELECT c FROM Credit c WHERE c.thirdParty.id = :thirdPartyId")
    List<Credit> getCredits(@Param("thirdPartyId") Long thirdPartyId);

    // 3️⃣ Récupérer tous les crédits impayés et pour lesquels la relance n'a pas été envoyée
    List<Credit> findByUnpaidAmountGreaterThanAndReminderSentFalse(BigDecimal amount);

    // 4️⃣ Option : méthode par défaut pour obtenir tous les crédits en retard
    default List<Credit> findCreditsEnRetard() {
        return findByUnpaidAmountGreaterThanAndReminderSentFalse(BigDecimal.ZERO);
    }

}
