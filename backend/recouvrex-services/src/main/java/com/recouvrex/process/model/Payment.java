package com.recouvrex.process.model;

import com.recouvrex.process.model.enums.PaymentChannelEnum;
import com.recouvrex.process.model.enums.PaymentMethodEnum;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public class Payment extends BaseEntity{

   private String paymentId;

    @Enumerated(EnumType.STRING)
    private PaymentMethodEnum paymentMethod; // methode du paiement

    @Enumerated(EnumType.STRING)
    private PaymentChannelEnum paymentChannel; // canal du paiement

    private LocalDateTime openingDate;
    private LocalDateTime modificationDate;

}
