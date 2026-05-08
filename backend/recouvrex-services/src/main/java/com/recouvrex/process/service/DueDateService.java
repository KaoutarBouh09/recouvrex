package com.recouvrex.process.service;

import com.recouvrex.process.model.DueDate;

import java.time.LocalDate;
import java.util.List;

public interface DueDateService {

      DueDate save(DueDate dueDate);

      DueDate createDueDate(DueDate dueDate);

      List<DueDate> findDueDateByCaseId(Long caseId);

      List<DueDate> findDueDateByCreditId(Long creditId);

      DueDate updateDueDate(DueDate dueDate);

      void deleteDueDate(Long id);

      DueDate findDueDateByCaseIdAndDueDateId(String dueDateId, Long caseId);

      DueDate findDueDateById(Long dueDateId);

      DueDate updateExpectedPaymentDateDue(Long dueDateId, LocalDate expectedPaymentDate);

      List<DueDate> createMultipleDueDates(List<DueDate> dueDates);

}
