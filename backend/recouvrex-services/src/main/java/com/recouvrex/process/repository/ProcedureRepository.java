package com.recouvrex.process.repository;

import com.recouvrex.process.model.Procedure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcedureRepository extends JpaRepository <Procedure, Long> {

	
}