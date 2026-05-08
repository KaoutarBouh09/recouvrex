package com.recouvrex.process.repository;

import com.recouvrex.process.model.Profile;
import com.recouvrex.process.model.Status;
import com.recouvrex.process.utils.CountCasesStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatusRepository extends JpaRepository <Status, Long> {


 /*   @Query("SELECT s.status, COUNT(c) FROM Case c JOIN c.status s WHERE c.user.id = :userId GROUP BY s.status")
    List<CountCasesStatus> findStatusCounts(@Param("userId") Long userId);*/
 /*   @Query("SELECT NEW com.recouvrex.process.utils.CountCasesStatus(s.status, COUNT(c)) " +
            "FROM Case c JOIN c.status s " +
            "WHERE c.assignedAgent.id = :userId " +
            "GROUP BY s.status")*/
 @Query("SELECT NEW com.recouvrex.process.utils.CountCasesStatus(c.status.id, s.status, COUNT(c)) " +
         "FROM Case c JOIN c.status s " +
         "WHERE (c.assignedAgent.id = :userId OR c.assignedAgent.manager.id = :userId) " +
         "GROUP BY c.status.id, s.status")
 List<CountCasesStatus> findStatusCounts(@Param("userId") Long userId);

 @Query("SELECT NEW com.recouvrex.process.utils.CountCasesStatus(c.status.id, s.status, COUNT(c)) " +
         "FROM Case c JOIN c.status s " +
         "GROUP BY c.status.id, s.status")
 List<CountCasesStatus> findStatusCountsAll();


}
