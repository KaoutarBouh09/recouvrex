package com.recouvrex.process.service;


import com.recouvrex.process.model.DueDate;
import com.recouvrex.process.model.Reglement;

import java.math.BigDecimal;

public interface ReglementService {

    Reglement save(Reglement reglement);
    Reglement createReglement(DueDate dueDate);
     BigDecimal calculatePaymentAmount(DueDate dueDate);
      void deleteReglementByDueDateId(Long id);
}
