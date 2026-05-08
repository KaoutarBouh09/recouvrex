package com.recouvrex.process.repository;


import com.recouvrex.process.model.Case;
import com.recouvrex.process.model.Reglement;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReglementRepository extends JpaRepository<Reglement, Long> {

    @Query(value = "DELETE FROM reglement r WHERE r.due_date_id = :id", nativeQuery = true)
      int deleteByDueDateId(@Param("id") Long id);

}
