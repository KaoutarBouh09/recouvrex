package com.recouvrex.process.repository;

import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.Task;
import com.recouvrex.process.model.enums.StatusEnum;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

public interface TaskRepository extends JpaRepository <Task, Long> {

	@Query(value = "SELECT * FROM task t WHERE  t.case_id = :caseId", nativeQuery = true)
	List<Task> findByCaseId(Long caseId);

	@Query(value = "SELECT * FROM task t WHERE  t.case_id = :caseId AND t.user_id = :userId", nativeQuery = true)
	List<Task> findByCaseIdAndUserId(Long caseId, Long userId);

    @Query(value = "SELECT t FROM Task t WHERE t.owner.id = :userId AND t.isNew ="+true)
    List<Task> findNewTasksByUserId(Long userId);



    // Check if all IDs exist in the database
    @Query(value = "SELECT COUNT(t.id) FROM Task t WHERE t.id IN :ids")
    int countByIds(List<Long> ids);

    // Method to delete tasks by a list of IDs
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Task t WHERE t.id IN :ids")
    void deleteAllByIdInBatch(List<Long> ids);
}
