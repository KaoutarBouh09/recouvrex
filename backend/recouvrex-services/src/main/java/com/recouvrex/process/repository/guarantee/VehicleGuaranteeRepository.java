package com.recouvrex.process.repository.guarantee;

import com.recouvrex.process.model.guarantee.VehicleGuarantee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleGuaranteeRepository extends JpaRepository<VehicleGuarantee, Long> {
    List<VehicleGuarantee> findByCreditId(Long creditId);

}
