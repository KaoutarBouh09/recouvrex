package com.recouvrex.process.repository.guarantee;

import com.recouvrex.process.model.guarantee.BusinessFundGuarantee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessFundGuaranteeRepository extends JpaRepository<BusinessFundGuarantee, Long> {
    List<BusinessFundGuarantee> findByCreditId(Long creditId);

}
