package com.recouvrex.process.model;

import com.recouvrex.process.model.enums.ValidationActionEnum;
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
@Table(name = "agreement_validation")
public class AgreementValidation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "agreement_id", nullable = false)
    private Agreement agreement;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Qui a fait l'action

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ValidationActionEnum action; // SUBMITTED, APPROVED, REJECTED, CANCELLED

    @Column(columnDefinition = "TEXT")
    private String comment; // Commentaire de validation/rejet

    @Column(nullable = false)
    private LocalDateTime actionDate = LocalDateTime.now();
}