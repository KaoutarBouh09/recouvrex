package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.Credit;
import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.repository.CreditRepository;
import com.recouvrex.process.service.CreditService;
import com.recouvrex.process.utils.IdentificationTool;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CreditServiceImpl implements CreditService {

    @Autowired
    CreditRepository creditRepository;

    @Override
    public Credit createCredit(Credit credit) {
        Long lastId = creditRepository.getLastCreditId();
        if (lastId == null) {
            lastId = 0L;
        }
        credit.setCreditId(IdentificationTool.generateCreditId(lastId));
        return creditRepository.save(credit);
    }

    @Override
    public List<Credit> getCredits(Long userId) {
        return creditRepository.getCredits(userId);
    }

    @Override
    public Credit updateCredit(Credit credit) {
        // Find the existing entity from the database
        Credit existingCredit = creditRepository.findById(credit.getId())
                .orElseThrow(() -> new EntityNotFoundException("credit not found with id: " + credit.getId()));
        // Use BeanUtils to copy properties from thirdParty to existingthirdParty
        BeanUtils.copyProperties(credit, existingCredit, "id", "creditId");
        // Save the updated entity back to the database

        return creditRepository.save(existingCredit);
    }

    @Override
    @Transactional
    public List<Credit> createMultipleCredits(List<Credit> credits) {
        return creditRepository.saveAll(credits);
    }

}
