package com.recouvrex.process.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.recouvrex.process.model.enums.PaymentStatusEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="reglement")
public class Reglement extends BaseEntity{


    private String reglementId; // Identifiant du règlement

    private LocalDate reglementDate; // Date du règlement

    @Enumerated(EnumType.STRING)
    private PaymentStatusEnum paymentStatus; // Statut du règlement

    private LocalDateTime openingDate; // Date d'ouverture , Date system

    private LocalDateTime modificationDate; // Date de modification , automatic

    private BigDecimal paymentAmount; // Montant du règlement

    @ManyToOne
     @JoinColumn(name = "due_date_id",referencedColumnName = "id")
 //   @JsonBackReference
     private DueDate dueDate;

    @PrePersist
    protected void onCreate() {
        openingDate = LocalDateTime.now();
        modificationDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modificationDate = LocalDateTime.now();
    }

}
