package com.recouvrex.process.model;

import com.recouvrex.process.model.enums.ReminderChannelEnum;
import com.recouvrex.process.model.enums.ReminderStatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "reminder_history")
public class ReminderHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "installment_id", nullable = false)
    private InstallmentPayment installment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReminderChannelEnum channel; // EMAIL ou SMS

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReminderStatusEnum status; // SUCCESS ou FAILED

    @Column(nullable = false)
    private LocalDateTime sentAt;

    private String recipient; // email ou numéro de téléphone

    private String errorMessage; // message d'erreur si FAILED
}