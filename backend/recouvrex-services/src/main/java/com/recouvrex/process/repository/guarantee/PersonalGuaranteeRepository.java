package com.recouvrex.process.repository.guarantee;

import com.recouvrex.process.model.guarantee.PersonalGuarantee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalGuaranteeRepository extends JpaRepository<PersonalGuarantee, Long> {
    List<PersonalGuarantee> findByCreditId(Long creditId);

}
