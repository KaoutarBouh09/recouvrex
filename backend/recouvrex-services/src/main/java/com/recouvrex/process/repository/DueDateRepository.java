package com.recouvrex.process.repository;


import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.DueDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DueDateRepository  extends JpaRepository<DueDate, Long> {

    @Query(value = "SELECT * FROM due_date d WHERE d.case_id = :caseId", nativeQuery = true)
    List<DueDate> findDueDateByCaseId(Long caseId);
    @Query(value = "SELECT * FROM due_date d WHERE d.credit_id = :creditId", nativeQuery = true)
    List<DueDate> findDueDateByCreditId(Long creditId);



    @Query(value = "DELETE  FROM due_date d WHERE d.id = :id", nativeQuery = true)
     int deleteDueDateById(Long id);

    @Query(value = "SELECT * FROM due_date d WHERE d.case_id = :caseId AND d.due_date_id=:dueDateId", nativeQuery = true)
    DueDate findDueDateByCaseIdAndDueDateId(String dueDateId,Long caseId);

}
