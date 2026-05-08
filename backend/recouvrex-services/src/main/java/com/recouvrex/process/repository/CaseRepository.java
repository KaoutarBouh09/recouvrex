package com.recouvrex.process.repository;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.enums.StatusEnum;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CaseRepository extends JpaRepository<Case, Long>, JpaSpecificationExecutor<Case> {

	List<Case> findByCaseId(String caseId);

	@Query("SELECT c from Case c WHERE c.status = :status")
	List<Case> findByStatus(@Param("status") StatusEnum status);

	@Query(value = "SELECT * FROM collect_case c WHERE LOWER(c.case_id) LIKE LOWER(CONCAT('%', :caseId,'%')) AND (c.status_id) = :statusId AND (c.procedure_id) = :procedureId", nativeQuery = true)
	List<Case> findByCaseIdContainingAndStatusAndProcedure(String caseId, Long statusId, Long procedureId);

	@Query(value = "SELECT * FROM collect_case c WHERE c.user_id = :userId", nativeQuery = true)
	List<Case> findByUserId(@Param("userId") Long userId);

	@Query(value = "SELECT count(c) FROM Case c WHERE c.assignedAgent.id = :userId OR c.assignedAgent.manager.id=:userId")
	Long numberOfCasesForUser(@Param("userId") Long userId);

	List<Case> findAllByOrderByIdDesc();

	@Query("SELECT SUM(c.totalAmount) FROM Case c WHERE c.status.status = :status AND ( c.assignedAgent.id = :userId OR c.assignedAgent.manager.id = :userId)")
	Long caseAmountTotalByStatus(@Param("status") String status, @Param("userId") Long userId);



}
