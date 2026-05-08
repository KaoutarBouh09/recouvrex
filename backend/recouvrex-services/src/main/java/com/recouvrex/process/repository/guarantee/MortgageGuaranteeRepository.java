package com.recouvrex.process.repository.guarantee;


import com.recouvrex.process.model.guarantee.MortgageGuarantee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MortgageGuaranteeRepository extends JpaRepository<MortgageGuarantee, Long> {
    List<MortgageGuarantee> findByCreditId(Long creditId);

}
