package com.recouvrex.process.dto;

import com.recouvrex.process.model.enums.AgreementStatusTypesEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentPlanResponseDTO {
    
    private Long agreementId;
    private String agreementCode;
    private LocalDate agreementDate;
    private AgreementStatusTypesEnum status;
    
    private BigDecimal totalAmount;
    private BigDecimal monthlyPaymentAmount;
    private BigDecimal interestAmount;
    private BigDecimal totalAmountWithInterest;
    
    private Integer numberOfInstallments;
    private LocalDate firstPaymentDate;
    
    private String initiatorName;
    private String validatorName;
    
    private String pdfFilePath;
    
    private List<InstallmentDTO> installments;
}