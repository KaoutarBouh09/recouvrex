package com.recouvrex.process.repository;

import com.recouvrex.process.model.ThirdParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThirdPartyRepository extends JpaRepository<ThirdParty, Long>, JpaSpecificationExecutor<ThirdParty> {

    // 1️⃣ Récupérer tous les tiers d'un utilisateur spécifique
    @Query(value = "SELECT * FROM thirdparty p WHERE p.user_id = :userId", nativeQuery = true)
    List<ThirdParty> getAllThirdPartyByUserId(@Param("userId") Long userId);

    // 2️⃣ Récupérer le dernier ID ajouté dans thirdparty
    @Query(value = "SELECT id FROM thirdparty ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Long getLastThirdPartyId();

    // 3️⃣ Compter le nombre de tiers gérés par un utilisateur ou son manager
    @Query("SELECT COUNT(t) FROM ThirdParty t WHERE t.user.id = :userId OR t.user.manager.id = :userId")
    Long countNbrThirdPartyByUser(@Param("userId") Long userId);

    // 4️⃣ Option : récupérer tous les tiers avec email et téléphone pour envoi de relance
    @Query("SELECT t FROM ThirdParty t WHERE t.personalEmail IS NOT NULL OR t.businessEmail IS NOT NULL")
    List<ThirdParty> findAllWithContactInfo();
}
