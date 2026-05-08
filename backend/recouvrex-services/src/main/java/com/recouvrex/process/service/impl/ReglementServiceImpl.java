package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.DueDate;
import com.recouvrex.process.model.Reglement;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import com.recouvrex.process.repository.ReglementRepository;
import com.recouvrex.process.service.ReglementService;
import com.recouvrex.process.utils.IdentificationTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ReglementServiceImpl implements ReglementService {
    @Autowired
    ReglementRepository reglementRepository;
    @Override
    public Reglement save(Reglement reglement) {
        return reglementRepository.save(reglement);
    }

    @Override
    public Reglement createReglement(DueDate dueDate) {
        Reglement reglement = new Reglement();
        reglement.setReglementId(IdentificationTool.generateReglementId());
        reglement.setPaymentAmount(calculatePaymentAmount(dueDate));
        reglement.setReglementDate(dueDate.getPaymentDueDate());
        reglement.setPaymentStatus(PaymentStatusEnum.EN_ATTENTE);
        reglement.setDueDate(dueDate);
        return reglementRepository.save(reglement);

    }

    @Override
    public BigDecimal calculatePaymentAmount(DueDate dueDate) {
      return  dueDate.getPrincipalAmount()
              .add(dueDate.getInsuranceAmount())
              .add(dueDate.getInterestAmount())
              .add(dueDate.getLatePaymentCharge());

    }

    @Override
    public void deleteReglementByDueDateId(Long id) {
        System.out.println("im inside regservimpl delete id :"+id);
          reglementRepository.deleteByDueDateId(id);

    }


}
