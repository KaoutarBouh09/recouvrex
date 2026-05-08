package com.recouvrex.process.repository.guarantee;

import com.recouvrex.process.model.guarantee.RealEstateGuarantee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RealEstateGuaranteeRepository extends JpaRepository<RealEstateGuarantee, Long> {
    List<RealEstateGuarantee> findByCreditId(Long creditId);


}
