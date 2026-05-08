package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.DueDate;
import com.recouvrex.process.model.Reglement;
import com.recouvrex.process.model.enums.DueDateStatusEnum;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import com.recouvrex.process.repository.DueDateRepository;
import com.recouvrex.process.repository.ReglementRepository;
import com.recouvrex.process.service.DueDateService;
import com.recouvrex.process.service.ReglementService;
import com.recouvrex.process.utils.IdentificationTool;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DueDateServiceImpl implements DueDateService {

    @Autowired
    DueDateRepository dueDateRepository;

    @Autowired
    ReglementService reglementService;

    @Override
    public DueDate save(DueDate dueDate) {
        return dueDateRepository.save(dueDate);
    }

    @Override
    public DueDate createDueDate(DueDate dueDate) {
        dueDate.setDueDateId(IdentificationTool.generateDueDateId());
        DueDate _dueDate = dueDateRepository.save(dueDate);
        reglementService.createReglement(_dueDate);
        return dueDate;
    }

    @Override
    public List<DueDate> findDueDateByCaseId(Long caseId) {
        return dueDateRepository.findDueDateByCaseId(caseId);
    }

    @Override
    public List<DueDate> findDueDateByCreditId(Long creditId) {
        return dueDateRepository.findDueDateByCreditId(creditId);
    }

    public DueDate updateDueDate(DueDate updatedDueDate) {
        // Find the existing entity from the database
        DueDate existingDueDate = dueDateRepository.findById(updatedDueDate.getId())
                .orElseThrow(() -> new EntityNotFoundException("DueDate not found with id: " + updatedDueDate.getId()));
        // Use BeanUtils to copy properties from updatedDueDate to existingDueDate
        BeanUtils.copyProperties(updatedDueDate, existingDueDate, "id", "dueDateId", "_case", "credit");

        // Save the updated entity back to the database
        return dueDateRepository.save(existingDueDate);
    }

    @Override
    /*
     * public void deleteDueDate(Long id) {
     * reglementRepository.deleteByDueDateId(id);
     * dueDateRepository.deleteDueDateById(id);
     * }
     */

    public void deleteDueDate(Long id) {
        try {
            reglementService.deleteReglementByDueDateId(id);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        dueDateRepository.deleteById(id);

    }

    @Override
    public DueDate findDueDateByCaseIdAndDueDateId(String dueDateId, Long caseId) {
        return dueDateRepository.findDueDateByCaseIdAndDueDateId(dueDateId, caseId);
    }

    @Override
    public DueDate findDueDateById(Long dueDateId) {
        return dueDateRepository.findById(dueDateId).orElseThrow();
    }

    @Override
    public DueDate updateExpectedPaymentDateDue(Long dueDateId, LocalDate expectedPaymentDate) {
          DueDate existingDueDate =  dueDateRepository.findById(dueDateId).orElseThrow();
           existingDueDate.setExpectedPaymentDate(expectedPaymentDate);
           existingDueDate.setDueDateStatus(DueDateStatusEnum.EN_ATTENTE);

          return  dueDateRepository.save(existingDueDate);
    }

    @Override
    @Transactional
    public List<DueDate> createMultipleDueDates(List<DueDate> dueDates) {
        return dueDateRepository.saveAll(dueDates);
    }
    
}
